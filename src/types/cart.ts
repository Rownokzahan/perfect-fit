import { Id } from ".";
import { CustomizedProduct } from "./product";

export type AddToCartPayload = {
  customizedProduct: CustomizedProduct;
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
};

export type CartItemType = AddToCartPayload & {
  _id: Id;
};
