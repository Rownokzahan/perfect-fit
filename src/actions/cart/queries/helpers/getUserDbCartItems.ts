import { connectToDatabase } from "@/lib/db";
import { toPlainObject } from "@/lib/utils/object";
import UserStoreModel from "@/models/UserStoreModel";
import { Id } from "@/types";
import { DBCartItem } from "@/types/cart";
import { cacheLife, cacheTag } from "next/cache";

/**
 * Fetches a user's cart items from the database with caching.
 * - Returns an empty array if none exist or on error.
 * - Items are sorted by creation date.
 */
export const getUserDbCartItems = async (
  ownerId: Id,
): Promise<DBCartItem[]> => {
  "use cache";
  cacheTag(`cart-${ownerId}`);
  cacheLife("minutes");

  try {
    await connectToDatabase();

    // Fetch cart
    const userCart = await UserStoreModel.findOne(
      { ownerId },
      { cartItems: 1 },
    ).lean();

    if (!userCart?.cartItems?.length) {
      return [];
    }

    const cartItems = userCart?.cartItems ?? [];

    // Sort the cartItems by creation date
    cartItems.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return toPlainObject(cartItems) as unknown as DBCartItem[];
  } catch (err) {
    console.error(
      `[getUserCartBase] Failed to fetch cart for user ${ownerId}:`,
      err,
    );
    return [];
  }
};
