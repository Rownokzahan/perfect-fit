"use server";

import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import OrderModel from "@/models/OrderModel";
import UserStoreModel from "@/models/UserStoreModel";
import { DeliveryInfo } from "@/types/order";
import { Error } from "mongoose";
import { updateTag } from "next/cache";

export const createOrder = async ({
  deliveryInfo,
}: {
  deliveryInfo: DeliveryInfo;
}) => {
  const user = await getCurrentUser();
  if (!user) {
    return { error: true, message: "Authentication required." };
  }

  const userId = user.id;

  try {
    await connectToDatabase();

    const userCart = await UserStoreModel.findOne({ ownerId: userId });
    if (!userCart || userCart.cartItems.length === 0) {
      return { error: true, message: "Cart is empty." };
    }

    const totalPrice = userCart.cartItems.reduce(
      (total, item) => total + item.subtotal,
      0,
    );

    await OrderModel.create({
      user: userId,
      deliveryInfo,
      items: userCart.cartItems,
      totalPrice,
      paymentMethod: "cash on delivery",
    });

    const updatedCart = await UserStoreModel.findOneAndUpdate(
      { ownerId: userId },
      { cartItems: [] },
      { runValidators: true },
    );

    if (!updatedCart) {
      return { error: true, message: "Cart not found, update failed." };
    }

    // Invalidate cache
    updateTag(`orders-${userId}`);
    updateTag(`cart-${userId}`);
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return { error: true, message };
    }

    console.error(err);
    return { error: true, message: "Something went wrong." };
  }
};
