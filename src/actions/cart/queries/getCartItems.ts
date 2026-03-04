import { connectToDatabase } from "@/lib/db";
import { toPlainObject } from "@/lib/utils/object";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";
import { Id } from "@/types";
import { CartItemType } from "@/types/cart";
import { cacheLife, cacheTag } from "next/cache";

const getCachedCartItems = async (ownerId: Id): Promise<CartItemType[]> => {
  "use cache";
  cacheTag(`cart-${ownerId}`);
  cacheLife("minutes");

  try {
    await connectToDatabase();

    const [cart] = await UserStoreModel.aggregate([
      { $match: { ownerId } },
      { $unwind: { path: "$cartItems", preserveNullAndEmptyArrays: true } },
      { $sort: { "cartItems.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          items: { $push: "$cartItems" },
        },
      },
    ]);

    const items = cart?.items || [];
    return toPlainObject(items);
  } catch (err) {
    console.error("Failed to fetch cart items:", err);
    return [];
  }
};

export const getCartItems = async () => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return [];
  }

  return getCachedCartItems(ownerInfo.ownerId);
};
