import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import { CUSTOM_DRESS_UNIT_PRICE } from "@/lib/constants/pricing";
import { Id } from "@/types";
import { CartItemType } from "@/types/cart";
import { toPlainObject } from "@/lib/utils/object";
import { getUserDbCartItems } from "./helpers/getUserDbCartItems";
import { getActiveCartProductsMap } from "./helpers/getActiveCartProductsMap";

export const getUserCartItems = async (
  ownerId: Id,
): Promise<CartItemType[]> => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return [];
  }

  const dbCartItems = await getUserDbCartItems(ownerId); // This is cached data

  if (!dbCartItems.length) {
    return [];
  }

  const activeProductMap = await getActiveCartProductsMap(dbCartItems);

  // Merge db cart items with live product data
  const cartItems: CartItemType[] = dbCartItems.flatMap(
    (item): CartItemType | [] => {
      const { _id, productType, customizations, quantity } = item;

      const base = {
        _id: _id.toString(),
        customizations,
      };

      // Custom Dress
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

      // Standard product
      if (productType === "product") {
        const productData = activeProductMap.get(
          item.product.productId?.toString(),
        );
        const stock = productData?.stock ?? 0;
        const qty = Math.min(item.quantity, stock);

        const availability = !productData
          ? "unavailable"
          : productData.stock === 0
            ? "out_of_stock"
            : "available";

        return {
          ...base,
          productType: "product",
          product: toPlainObject(item.product),
          name: productData?.name ?? item.product?.nameSnapshot ?? "",
          unitPrice: productData?.price ?? item.product?.priceSnapshot ?? 0,
          subtotal: (productData?.price ?? 0) * item.quantity,
          availability,
          stock,
          quantity: qty,
        };
      }

      return [];
    },
  );

  return cartItems;
};

export const getCartItems = async () => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return [];
  }

  return getUserCartItems(ownerInfo.ownerId);
};
