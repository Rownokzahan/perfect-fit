import { connectToDatabase } from "@/lib/db";
import ProductModel from "@/models/ProductModel";
import { DBCartItem } from "@/types/cart";

export type CartProductData = {
  name: string;
  stock: number;
  price: number;
};

/**
 * Fetch live active product data map for DB cart items.
 */
export const getActiveCartProductsMap = async (
  dbCartItems: DBCartItem[],
): Promise<Map<string, CartProductData>> => {
  const productMap = new Map<string, CartProductData>();

  if (!dbCartItems.length) {
    return productMap;
  }

  const productIds = dbCartItems
    .filter((item) => item.productType === "product")
    .map((item) => item.product?.productId)
    .filter(Boolean);

  if (!productIds.length) {
    return productMap;
  }

  try {
    await connectToDatabase();

    const activeProducts = await ProductModel.find(
      {
        _id: { $in: productIds },
        status: "active",
      },
      { _id: 1, name: 1, stock: 1, price: 1 },
    ).lean();

    activeProducts.forEach((p) => {
      productMap.set(p._id.toString(), {
        name: p.name,
        stock: p.stock,
        price: p.price,
      });
    });

    return productMap;
  } catch (err) {
    console.error("[getProductsForCart] Failed to fetch products:", err);
    return productMap;
  }
};
