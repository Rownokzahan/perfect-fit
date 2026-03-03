"use server";

import { connectToDatabase } from "@/lib/db";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import CartModel from "@/models/CartModel";
import WishlistModel from "@/models/WishlistModel";
import { Id } from "@/types";
import { updateTag } from "next/cache";

/**
 * Moves an item from Cart to Wishlist.
 * @param productId - The ID of the product to move.
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

    // 1. Add to Wishlist first (using $addToSet to avoid duplicates)
    // We use findOneAndUpdate with upsert to handle cases where the wishlist doesn't exist yet
    const wishlistUpdate = await WishlistModel.findOneAndUpdate(
      { ownerId },
      {
        $setOnInsert: { ownerId, userType },
        $addToSet: {
          items: { productId: productId },
        },
      },
      { upsert: true, new: true },
    );

    if (!wishlistUpdate) {
      throw new Error("Failed to update wishlist");
    }

    // 2. Remove from Cart
    // This pulls the item from the items array where the productId matches
    await CartModel.findOneAndUpdate(
      { ownerId },
      {
        $pull: { items: { productId: productId } },
      },
      { new: true },
    );

    // 3. Clear Cache / Revalidate
    // Revalidate the tags so the UI reflects the changes immediately
    updateTag(`cart-${ownerId}`);
    updateTag(`wishlist-${ownerId}`);

    return { success: true, message: "Item moved to wishlist" };
  } catch (error) {
    console.error("Move to wishlist failed:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "Failed to move item",
    };
  }
};
