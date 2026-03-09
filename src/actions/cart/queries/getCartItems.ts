import { connectToDatabase } from "@/lib/db";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";
import ProductModel from "@/models/ProductModel";
import { CUSTOM_DRESS_UNIT_PRICE } from "@/lib/constants/pricing";
import { Id } from "@/types";
import { CartItemType } from "@/types/cart";
import { cacheLife, cacheTag } from "next/cache";
import { toPlainObject } from "@/lib/utils/object";

export const getUserCartItems = async (
  ownerId: Id,
): Promise<CartItemType[]> => {
  await connectToDatabase();

  // 1. Fetch cart
  const userCart = await UserStoreModel.findOne(
    { ownerId },
    { cartItems: 1 },
  ).lean();

  // Sort the cartItems array
  if (userCart?.cartItems?.length) {
    userCart.cartItems.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }

  if (!userCart?.cartItems?.length) {
    return [];
  }

  const cartItems = userCart.cartItems;

  // 2. Get all product IDs (only from product type items)
  const productIds = cartItems
    .filter((item) => item.productType === "product")
    .map((item) => item.product?.productId)
    .filter(Boolean);

  // 3. Fetch available products (active and not deleted) - check stock and price
  const availableProducts = productIds.length
    ? await ProductModel.find(
        {
          _id: { $in: productIds },
          status: "active",
          deletedAt: null,
        },
        { _id: 1, name: 1, stock: 1, price: 1 },
      ).lean()
    : [];

  const productMap = new Map(
    availableProducts.map((p) => [
      p._id.toString(),
      { name: p.name, stock: p.stock, price: p.price },
    ]),
  );

  // 4. Add availability, stock, and calculated pricing to each item
  const itemsWithAvailability: CartItemType[] = cartItems.flatMap(
    (item): CartItemType | [] => {
      const { _id, productType, customizations, quantity, product } = item;

      const base = {
        _id: _id.toString(),
        customizations,
      };

      if (productType === "customDress") {
        const unitPrice = CUSTOM_DRESS_UNIT_PRICE;

        return {
          ...base,
          productType: "customDress",
          name: "Custom Dress",
          unitPrice,
          subtotal: unitPrice * quantity,
          availability: "available",
          stock: Infinity,
          quantity,
        };
      }

      // productType === "product" && product exists
      if (productType === "product" && product) {
        const productData = productMap.get(product.productId?.toString());
        const stock = productData?.stock ?? 0;
        const qty = Math.min(item.quantity, stock);

        const availability = !productData
          ? "unavailable"
          : productData.stock === 0
            ? "out_of_stock"
            : "available";

        return {
          _id: item._id.toString(),
          productType: "product",
          product: toPlainObject(product),
          name: productData?.name ?? item.product?.nameSnapshot ?? "",
          unitPrice: productData?.price ?? item.product?.priceSnapshot ?? 0,
          subtotal: (productData?.price ?? 0) * item.quantity,
          availability,
          stock,
          quantity: qty,
          customizations: item.customizations,
        };
      }

      return [];
    },
  );

  return itemsWithAvailability;
};

const getCachedCartItems = async (ownerId: Id) => {
  "use cache";
  cacheTag(`cart-${ownerId}`);
  cacheLife("minutes");

  try {
    return await getUserCartItems(ownerId);
  } catch (err) {
    console.error("Failed to fetch cart items:", err);
    return [];
  }
};

export const getCartItems = async () => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return [];
  }

  return getCachedCartItems(ownerInfo.ownerId);
};
