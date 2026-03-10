"use server";

import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import ProductModel from "@/models/ProductModel";
import OrderModel from "@/models/OrderModel";
import UserStoreModel from "@/models/UserStoreModel";
import { DeliveryInfo } from "@/types/order";
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
  quantity: number;
};

/**
 * Update product stock in bulk and validate success
 * Session is automatically available in mongoose.connection.transaction()
 */
const updateProductStock = async (productQuantityMap: Map<string, number>) => {
  if (productQuantityMap.size === 0) return;

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

  const result = await ProductModel.bulkWrite(operations);

  if (result.modifiedCount !== operations.length) {
    throw new OrderError("One or more products are out of stock");
  }
};

// === MAIN FUNCTION ===

export const createOrder = async ({
  deliveryInfo,
}: {
  deliveryInfo: DeliveryInfo;
}) => {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { error: true, message: "Authentication required" };
  }

  const touchedProducts: TouchedProduct[] = [];

  try {
    const orderItems = await getUserCartItems(user.id);

    if (orderItems.length === 0) {
      throw new OrderError("Cart is empty");
    }

    const productQuantityMap = new Map<string, number>();
    let totalPrice = 0;

    // Validate items and build product map BEFORE transaction
    for (const item of orderItems) {
      if (item.availability !== "available") {
        throw new OrderError(`${item.name} is not available`);
      }

      if (item.productType === "product" && item.product?.productId) {
        const productId = item.product.productId.toString();
        productQuantityMap.set(
          productId,
          (productQuantityMap.get(productId) ?? 0) + item.quantity,
        );
        touchedProducts.push({
          id: item.product.productId,
          slug: item.product.slugSnapshot,
          quantity: item.quantity,
        });
      }

      totalPrice += item.subtotal;
    }

    await connectToDatabase();

    // Use Mongoose 9's Connection#transaction()
    // The session is automatically passed to all operations inside the callback
    await mongoose.connection.transaction(async () => {
      // Create order
      await OrderModel.create([
        {
          user: user.id,
          deliveryInfo,
          items: orderItems,
          totalPrice,
          paymentMethod: "cash on delivery",
        },
      ]);

      // Deduct stock
      await updateProductStock(productQuantityMap);

      // Clear cart
      const result = await UserStoreModel.updateOne(
        { ownerId: user.id },
        { $set: { cartItems: [] } },
        { runValidators: true },
      );

      if (!result.matchedCount) {
        throw new OrderError("Failed to update cart");
      }
    });

    // Invalidate caches
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

    if (err instanceof Error && err.name === "ValidationError") {
      return { error: true, message: err.message };
    }

    console.error("[createOrder]", err);
    return { error: true, message: "Something went wrong" };
  }
};
