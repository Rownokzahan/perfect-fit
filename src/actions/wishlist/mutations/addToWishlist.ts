"use server";

import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { validateId } from "@/lib/utils/validators";
import { updateTag } from "next/cache";
import {
  createGuestInfo,
  getUserOrGuestInfo,
} from "@/lib/utils/userOrGuestInfo";
import UserStoreModel from "@/models/UserStoreModel";

export const addToWishlist = async (productId: string) => {
  const validation = validateId(productId, "Product ID");
  if (!validation.valid) {
    return { error: true, message: validation.message };
  }

  let ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    ownerInfo = await createGuestInfo();
  }

  const { ownerId, userType } = ownerInfo;

  try {
    await connectToDatabase();

    const productObjectId = new Types.ObjectId(productId);

    await UserStoreModel.findOneAndUpdate(
      { ownerId },
      {
        $setOnInsert: { ownerId, userType },
        $addToSet: { wishlistItems: productObjectId },
      },
      { upsert: true },
    );

    updateTag(`wishlist-${ownerId}`);
  } catch (error) {
    console.error("Add to wishlist failed:", error);
    return { error: true, message: "Failed to add on wishlist" };
  }
};
