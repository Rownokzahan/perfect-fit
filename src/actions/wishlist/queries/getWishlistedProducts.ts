import { connectToDatabase } from "@/lib/db";
import { toPlainObject } from "@/lib/utils/object";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";
import { Id } from "@/types";
import { Product } from "@/types/product";
import { cacheLife, cacheTag } from "next/cache";

const getCachedWishlistedProducts = async (ownerId: Id): Promise<Product[]> => {
  "use cache";
  cacheTag(`wishlist-${ownerId}`);
  cacheLife("minutes");

  try {
    await connectToDatabase();

    const user = await UserStoreModel.findOne({ ownerId })
      .populate("wishlistItems")
      .select("wishlistItems")
      .lean();

    const products = (
      (user?.wishlistItems as unknown as Product[]) || []
    ).reverse();

    return toPlainObject(products);
  } catch (err) {
    console.error("Failed to fetch wishlisted products", err);
    return [];
  }
};

export const getWishlistedProducts = async () => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return [];
  }

  return getCachedWishlistedProducts(ownerInfo.ownerId);
};
