import { Id } from ".";

export interface Customizations {
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

export type AddToCartPayload = { customizations: Customizations } & (
  | {
      productType: "customDress";
    }
  | {
      productType: "product";
      productId: Id;
    }
);

export type ProductSnapshot = {
  productId: Id;
  slugSnapshot: string;
  nameSnapshot: string;
  priceSnapshot: number;
  imageSnapshot: string;
};

export type ProductInfo =
  | {
      productType: "product";
      product: ProductSnapshot;
    }
  | {
      productType: "customDress";
    };

export type DBCartItem = {
  _id: Id;
  customizations: Customizations;
  quantity: number;
} & ProductInfo;

export type CartItemAvailability = "available" | "unavailable" | "out_of_stock";

export type CartItemType = DBCartItem & {
  name: string;
  unitPrice: number;
  subtotal: number;
  availability: CartItemAvailability;
  stock: number;
};
