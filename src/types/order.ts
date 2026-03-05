import { Id } from ".";
import { CartItemType } from "./cart";

export type OrderStatusType =
  | "pending"
  | "confirmed"
  | "processing"
  | "delivered";

export interface DeliveryInfo {
  name: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
}

export interface Order {
  _id: Id;
  user: Id;
  deliveryInfo: DeliveryInfo;
  items: CartItemType[];
  totalPrice: number;
  createdAt: string;
  status: OrderStatusType;
  paymentMethod: "cash on delivery" | "online";
}
