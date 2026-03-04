"use server";

import { connectToDatabase } from "@/lib/db";
import {
  createGuestInfo,
  getUserOrGuestInfo,
} from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";
import { AddToCartPayload } from "@/types/cart";
import { Error } from "mongoose";
import { updateTag } from "next/cache";

export const addToCart = async (cartItem: AddToCartPayload) => {
  let ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    ownerInfo = await createGuestInfo();
  }

  const { ownerId, userType } = ownerInfo;

  try {
    await connectToDatabase();

    await UserStoreModel.findOneAndUpdate(
      { ownerId },
      {
        $setOnInsert: { ownerId, userType },
        $push: {
          cartItems: cartItem,
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
