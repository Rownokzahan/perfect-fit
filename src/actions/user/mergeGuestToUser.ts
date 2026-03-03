"use server";

import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getGuestId, removeGuestId } from "@/lib/utils/guestId";
import UserStoreModel from "@/models/UserStoreModel";
import { revalidateTag, updateTag } from "next/cache";
import { headers } from "next/headers";

/**
 * Synchronizes Guest wishlist and cart items into User account:
 */
export const mergeGuestToUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { error: true, message: "User not logged in" };
  }

  const userId = session.user.id;
  const guestId = await getGuestId();

  if (!guestId) {
    updateTag(`wishlist-${userId}`);
    updateTag(`cart-${userId}`);
    return { error: true, message: "No guest session found" };
  }

  try {
    await connectToDatabase();

    const guestStore = await UserStoreModel.findOne({
      ownerId: guestId,
    }).lean();

    const hasCartItems = (guestStore?.cartItems?.length ?? 0) > 0;
    const hasWishlistItems = (guestStore?.wishlistItems?.length ?? 0) > 0;

    if (!guestStore || (!hasCartItems && !hasWishlistItems)) {
      // If the doc exists but is empty, delete it anyway to keep the DB clean
      if (guestStore) {
        await UserStoreModel.deleteOne({ _id: guestStore._id });
      }

      await removeGuestId();
      return { error: true, message: "Guest store empty, nothing to merge" };
    }

    await UserStoreModel.findOneAndUpdate(
      { ownerId: userId },
      {
        $set: { userType: "user" },
        $addToSet: {
          cartItems: { $each: guestStore.cartItems || [] },
          wishlistItems: { $each: guestStore.wishlistItems || [] },
        },
      },
      { upsert: true }, // Create user store if it doesn't exist yet
    );

    // Cleanup
    await UserStoreModel.deleteOne({ ownerId: guestId });
    await removeGuestId();

    revalidateTag(`wishlist-${guestId}`, "max");
    revalidateTag(`cart-${guestId}`, "max");
    updateTag(`wishlist-${userId}`);
    updateTag(`cart-${userId}`);
  } catch (error) {
    console.error("Merge guest wishlist failed:", error);
    return { error: true, message: "Failed to merge guest wishlist" };
  }
};
