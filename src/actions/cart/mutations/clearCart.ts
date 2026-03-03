"use server";

import { connectToDatabase } from "@/lib/db";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";
import { Error } from "mongoose";
import { updateTag } from "next/cache";

export const clearCart = async () => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return {
      error: true,
      message: "Session expired. Please refresh and try again.",
    };
  }

  const { ownerId } = ownerInfo;

  try {
    await connectToDatabase();

    await UserStoreModel.findOneAndUpdate(
      { ownerId },
      { cartItems: [] },
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

    console.error("Clear cart failed:", error);
    return { error: true, message: "Failed to clear cart" };
  }
};
