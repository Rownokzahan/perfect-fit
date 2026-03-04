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

// ------------- Customized Product Type -------------

interface CustomizedProductBase {
  bodiceType: string;
  sleeveType: string;
  skirtType: string;
  fabric: string;

  length: number;
  sleeveLength: number;
  chest: number;
  waist: number;

  request: string;
}

interface CustomDressCustomization extends CustomizedProductBase {
  productType: "customDress";
}

interface ProductBasedCustomization extends CustomizedProductBase {
  productType: "product";
  product: {
    productId: Id;
    slugSnapshot: string;
    priceSnapshot: number;
    imageSnapshot: string;
  };
}

export type CustomizedProduct =
  | CustomDressCustomization
  | ProductBasedCustomization;
