"use server";

import { connectToDatabase } from "@/lib/db";
import {
  createGuestInfo,
  getUserOrGuestInfo,
} from "@/lib/utils/userOrGuestInfo";
import { validateId } from "@/lib/utils/validators";
import ProductModel from "@/models/ProductModel";
import UserStoreModel from "@/models/UserStoreModel";
import { Error } from "mongoose";
import { updateTag } from "next/cache";
import { AddToCartPayload, Customizations, ProductInfo } from "@/types/cart";

export const addToCart = async (payload: AddToCartPayload) => {
  let ownerInfo = await getUserOrGuestInfo();

  if (!ownerInfo) {
    ownerInfo = await createGuestInfo();
  }

  const { ownerId, userType } = ownerInfo;

  try {
    await connectToDatabase();

    let cartItem: { customizations: Customizations } & ProductInfo;

    if (payload.productType === "product") {
      const { productId } = payload;
      const idValidation = validateId(productId, "Product ID");

      if (!idValidation.valid) {
        return { error: true, message: idValidation.message };
      }

      const product = await ProductModel.findOne({
        _id: productId,
        status: "active",
        deletedAt: null,
      })
        .select("name price slug image")
        .lean();

      if (!product) {
        return { error: true, message: "Product not available" };
      }

      const unitPrice = Number(product.price);

      cartItem = {
        productType: "product",
        product: {
          productId,
          slugSnapshot: product.slug,
          nameSnapshot: product.name,
          priceSnapshot: unitPrice,
          imageSnapshot: product.image,
        },
        customizations: payload.customizations,
      };
    } else {
      cartItem = {
        productType: "customDress",
        customizations: payload.customizations,
      };
    }

    await UserStoreModel.findOneAndUpdate(
      { ownerId },
      {
        $setOnInsert: { ownerId, userType },
        $push: {
          cartItems: cartItem,
        },
      },
      { upsert: true, runValidators: true },
    );

    updateTag(`cart-${ownerId}`);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const message = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
      return { error: true, message };
    }

    console.error("Item add to cart failed:", error);
    return { error: true, message: "Failed to add item on cart" };
  }
};
