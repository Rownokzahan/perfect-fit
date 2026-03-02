"use server";

import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/utils/admin";
import { validateId } from "@/lib/utils/validators";
import ProductModel from "@/models/ProductModel";
import { Id } from "@/types";
import { ProductStatus } from "@/types/product";
import { updateTag } from "next/cache";

export const updateProductStatus = requireAdmin(
  async (productId: Id, status: ProductStatus) => {
    // Validate ID
    const validation = validateId(productId, "Product ID");
    if (!validation.valid) {
      return { error: true, message: validation.message };
    }

    try {
      await connectToDatabase();

      const result = await ProductModel.updateOne(
        { _id: productId, status: { $ne: "archived" } },
        { status },
      );

      if (result.matchedCount === 0) {
        return {
          error: true,
          message: "Product not found or already archived",
        };
      }

      updateTag(`product-${productId}`);
      updateTag("products");
    } catch (err) {
      console.error("Failed to update product status", err);
      return { error: true, message: "Could not update product status" };
    }
  },
);
