"use server";

import { connectToDatabase } from "@/lib/db";
import {
  createGuestInfo,
  getUserOrGuestInfo,
} from "@/lib/utils/userOrGuestInfo";
import CartModel from "@/models/CartModel";
import { CartItemWithCustomDress, CartItemWithProduct } from "@/types/cart";
import { Error } from "mongoose";
import { updateTag } from "next/cache";

export type AddToCartPayload =
  | Omit<CartItemWithProduct, "_id">
  | Omit<CartItemWithCustomDress, "_id">;

export const addToCart = async (cartItem: AddToCartPayload) => {
  let ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    ownerInfo = await createGuestInfo();
  }

  const { ownerId, userType } = ownerInfo;

  try {
    await connectToDatabase();

    await CartModel.findOneAndUpdate(
      { ownerId },
      {
        $setOnInsert: { ownerId, userType },
        $push: {
          items: cartItem,
        },
      },
      { upsert: true, runValidators: true },
    );

    updateTag(`cart-${ownerId}`);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const message = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
      return { error: true, message };
    }

    console.error("Item add to cart failed:", error);
    return { error: true, message: "Failed to add item on cart" };
  }
};
