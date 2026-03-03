import { connectToDatabase } from "@/lib/db";
import { toPlainObject } from "@/lib/utils/object";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";
import { Id } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

const getCachedWishlistedIds = async (ownerId: Id): Promise<Id[]> => {
  "use cache";
  cacheTag(`wishlist-${ownerId}`);
  cacheLife("minutes");

  try {
    await connectToDatabase();

    const user = await UserStoreModel.findOne({ ownerId })
      .select("wishlistItems")
      .lean();

    return toPlainObject(user?.wishlistItems ?? []);
  } catch (err) {
    console.error("Failed to fetch wishlisted product Ids:", err);
    return [];
  }
};

export const getWishlistedProductIds = async () => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return [];
  }

  return getCachedWishlistedIds(ownerInfo.ownerId);
};
