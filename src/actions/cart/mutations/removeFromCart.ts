"use server";

import { connectToDatabase } from "@/lib/db";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";
import { Error } from "mongoose";
import { updateTag } from "next/cache";

export const removeFromCart = async (cartItemId: string) => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return { error: true, message: "User session not found" };
  }

  const { ownerId } = ownerInfo;

  try {
    await connectToDatabase();

    await UserStoreModel.findOneAndUpdate(
      { ownerId },
      {
        $pull: {
          cartItems: { _id: cartItemId },
        },
      },
      { runValidators: true },
    );

    updateTag(`cart-${ownerId}`);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const message = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
      return { error: true, message };
    }

    console.error("Item removal from cart failed:", error);
    return { error: true, message: "Failed to remove item from cart" };
  }
};
