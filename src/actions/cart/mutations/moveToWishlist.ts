"use server";

import { connectToDatabase } from "@/lib/db";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";
import { Id } from "@/types";
import { updateTag } from "next/cache";

/**
 * Moves an item from Cart to Wishlist.
 * @param productId - The ID of the product to move.
 * @param cartItemId - The ID of the cart item to move.
 */
export const moveToWishlist = async ({
  productId,
  cartItemId,
}: {
  productId: Id;
  cartItemId: Id;
}) => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return { error: true, message: "User session not found" };
  }

  const { ownerId, userType } = ownerInfo;

  try {
    await connectToDatabase();

    const result = await UserStoreModel.updateOne(
      { ownerId },
      {
        $setOnInsert: { ownerId, userType },
        $addToSet: { wishlistItems: productId }, // Add to wishlist
        $pull: { cartItems: { _id: cartItemId } }, // Remove from cart by its unique ID
      },
      { upsert: true },
    );

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return { error: true, message: "Failed to move item" };
    }

    updateTag(`cart-${ownerId}`);
    updateTag(`wishlist-${ownerId}`);
  } catch (error) {
    console.error("Move to wishlist failed:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "Failed to move item",
    };
  }
};
