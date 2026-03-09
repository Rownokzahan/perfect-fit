"use server";

import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import ProductModel from "@/models/ProductModel";
import OrderModel from "@/models/OrderModel";
import UserStoreModel from "@/models/UserStoreModel";
import { DeliveryInfo } from "@/types/order";
import { CartItemType } from "@/types/cart";
import mongoose from "mongoose";
import { updateTag } from "next/cache";
import { Id } from "@/types";
import { getUserCartItems } from "@/actions/cart/queries/getCartItems";

// === TYPES & CONSTANTS ===
class OrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OrderError";
  }
}

type TouchedProduct = {
  id: Id;
  slug: string;
};

// === HELPER FUNCTIONS ===

/**
 * Extract product quantities from cart items, filtering for regular products only
 */
function getProductQuantityMap(cartItems: CartItemType[]) {
  const map = new Map<Id, number>();

  for (const item of cartItems) {
    if (item.productType !== "product") continue;

    const productId = item.product.productId?.toString();
    if (!productId) throw new OrderError("Invalid product in cart");

    map.set(productId, (map.get(productId) ?? 0) + item.quantity);
  }

  return map;
}

/**
 * Fetch and validate product availability
 */
async function fetchProducts(
  productIds: Id[],
  session: mongoose.ClientSession,
) {
  if (!productIds.length) return new Map();

  const products = await ProductModel.find(
    {
      _id: { $in: productIds },
      status: "active",
      deletedAt: null,
    },
    { name: 1, price: 1, slug: 1, image: 1, stock: 1 },
    { session },
  ).lean();

  if (products.length !== productIds.length) {
    throw new OrderError("One or more products are unavailable");
  }

  return new Map(products.map((p) => [p._id.toString(), p]));
}

/**
 * Update product stock in bulk and validate success
 */
async function updateProductStock(
  productQuantityMap: Map<string, number>,
  session: mongoose.ClientSession,
) {
  const operations = Array.from(productQuantityMap.entries()).map(
    ([productId, quantity]) => ({
      updateOne: {
        filter: {
          _id: productId,
          status: "active",
          deletedAt: null,
          stock: { $gte: quantity },
        },
        update: { $inc: { stock: -quantity } },
      },
    }),
  );

  if (!operations.length) return;

  const result = await ProductModel.bulkWrite(operations, { session });

  if (result.modifiedCount !== operations.length) {
    throw new OrderError("One or more products are out of stock");
  }
}

// === MAIN FUNCTION ===

export async function createOrder({
  deliveryInfo,
}: {
  deliveryInfo: DeliveryInfo;
}) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { error: true, message: "Authentication required" };
  }

  await connectToDatabase();
  const session = await mongoose.startSession();
  const touchedProducts: TouchedProduct[] = [];

  try {
    await session.withTransaction(async () => {
      // 1. Fetch cart
      const cartItems = await getUserCartItems(user.id);

      if (cartItems.length === 0) {
        throw new OrderError("Cart is empty");
      }

      // 2. Build product quantity map
      const productQuantityMap = getProductQuantityMap(cartItems);
      const productIds = Array.from(productQuantityMap.keys());

      // 3. Fetch and validate products
      const productMap = await fetchProducts(productIds, session);

      // 4. Update stock atomically
      await updateProductStock(productQuantityMap, session);

      // 5. Track touched products for cache invalidation
      for (const [productId] of productQuantityMap.entries()) {
        const product = productMap.get(productId);
        if (product) {
          touchedProducts.push({ id: productId, slug: product.slug });
        }
      }

      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.subtotal,
        0,
      );

      // 6. Create order
      await OrderModel.create(
        [
          {
            user: user.id,
            deliveryInfo,
            items: cartItems,
            totalPrice,
            paymentMethod: "cash on delivery",
          },
        ],
        { session },
      );

      // 7. Clear cart
      const result = await UserStoreModel.updateOne(
        { ownerId: user.id },
        { $set: { cartItems: [] } },
        { session, runValidators: true },
      );

      if (!result.matchedCount) {
        throw new OrderError("Failed to update cart");
      }
    });

    // 8. Invalidate caches (updateTag for Server Actions - read-your-writes)
    updateTag(`orders-${user.id}`);
    updateTag(`cart-${user.id}`);
    updateTag("products");

    for (const product of touchedProducts) {
      updateTag(`product-${product.id}`);
      updateTag(`product-${product.slug}`);
    }
  } catch (err) {
    if (err instanceof OrderError) {
      return { error: true, message: err.message };
    }

    if (err instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return { error: true, message: messages };
    }

    console.error("[createOrder]", err);
    return { error: true, message: "Something went wrong" };
  } finally {
    await session.endSession();
  }
}
