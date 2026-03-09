"use server";

import { connectToDatabase } from "@/lib/db";
import { getUserOrGuestInfo } from "@/lib/utils/userOrGuestInfo";
import { validateId } from "@/lib/utils/validators";
import UserStoreModel from "@/models/UserStoreModel";
import { Error as MongooseError } from "mongoose";
import { Types } from "mongoose";
import { updateTag } from "next/cache";

export type CartAction = "increase" | "decrease";

export const updateCartItemQuantity = async (
  cartItemId: string,
  action: CartAction,
) => {
  const ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    return { error: true, message: "User not found" };
  }

  const { ownerId } = ownerInfo;

  try {
    await connectToDatabase();

    // Validate cartItemId
    const validation = validateId(cartItemId, "Product ID");
    if (!validation.valid) {
      return { error: true, message: validation.message };
    }

    const cartItemObjectId = new Types.ObjectId(cartItemId);

    // Find the cart item to get current quantity and unit price
    const userStore = await UserStoreModel.findOne({
      ownerId,
      "cartItems._id": cartItemObjectId,
    }).select({
      cartItems: { $elemMatch: { _id: cartItemObjectId } },
    });

    const cartItem = userStore?.cartItems?.[0];

    if (!cartItem) {
      return { error: true, message: "Cart item not found" };
    }

    const newQuantity =
      action === "increase" ? cartItem.quantity + 1 : cartItem.quantity - 1;

    // Validate new quantity
    if (newQuantity < 1) {
      return { error: true, message: "Quantity must be at least 1" };
    }

    // Update the quantity and subtotal
    await UserStoreModel.updateOne(
      {
        ownerId,
        "cartItems._id": cartItemObjectId,
      },
      {
        $set: {
          "cartItems.$.quantity": newQuantity,
        },
      },
      { runValidators: true },
    );

    updateTag(`cart-${ownerId}`);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const message = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
      return { error: true, message };
    }

    console.error("Update cart quantity failed:", error);
    return { error: true, message: "Failed to update cart quantity" };
  }
};
