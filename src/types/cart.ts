import { Id } from ".";

interface CartItemBase {
  _id: Id;
  customizations: {
    bodiceType: string;
    sleeveType: string;
    skirtType: string;
    fabric: string;
  };
  measurements: {
    length: number;
    sleeveLength: number;
    chest: number;
    waist: number;
  };
  request: string;
  quantity: number;
  totalPrice: number;
}

export interface CartItemWithProduct extends CartItemBase {
  product: {
    _id: Id;
    nameSnapshot: string;
    priceSnapshot: number;
    imageSnapshot: string;
  };
  isCustomDress: false;
}

export interface CartItemWithCustomDress extends CartItemBase {
  customDress: {
    name: string;
    price: number;
  };
  isCustomDress: true;
}

export type CartItemType = CartItemWithProduct | CartItemWithCustomDress;
