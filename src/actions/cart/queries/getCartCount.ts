import { connectToDatabase } from "@/lib/db";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import CartModel from "@/models/CartModel";
import { Id } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

const getCachedCartCount = async (ownerId: Id): Promise<number> => {
  "use cache";
  cacheTag(`cart-${ownerId}`);
  cacheLife("minutes");

  try {
    await connectToDatabase();

    const [result] = await CartModel.aggregate([
      { $match: { ownerId } },
      {
        $project: {
          _id: 0,
          count: { $size: { $ifNull: ["$items", []] } },
        },
      },
    ]);

    return result?.count || 0;
  } catch (err) {
    console.error("Failed to fetch cart items count:", err);
    return 0;
  }
};

export const getCartCount = async () => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return 0;
  }

  return getCachedCartCount(ownerInfo.ownerId);
};
