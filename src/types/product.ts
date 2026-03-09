import { Id } from ".";

const PRODUCT_STATUSES = ["active", "inactive", "archived"] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export const isProductStatus = (value: string): value is ProductStatus => {
  return PRODUCT_STATUSES.includes(value as ProductStatus);
};

export interface Product {
  _id: Id;
  name: string;
  slug: string;
  description?: string;
  image: string;
  price: number;
  stock: number;
  category: Id;
  status: ProductStatus;
}

export interface PaginatedProducts {
  products: Product[];
  pagination: {
    totalItems: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}
