import { InferSchemaType, Model, model, models, Schema } from "mongoose";
import { cartItemSchema } from "./CartItem";
import { CartItemType } from "@/types/cart";

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    deliveryInfo: {
      type: {
        name: { type: String, required: [true, "Name is required."] },
        email: { type: String, required: [true, "Email is required."] },
        phoneNumber: {
          type: String,
          required: [true, "Phone number is required."],
        },
        deliveryAddress: {
          type: String,
          required: [true, "Delivery address is required."],
        },
      },
      required: [true, "Delivery info is required."],
      _id: false,
    },
    items: {
      type: [cartItemSchema],
      validate: {
        validator: (arr: CartItemType[]) => arr && arr.length > 0,
        message: "At least one cart item is required.",
      },
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
      min: [1, "Total price must be at least 1."],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["cash on delivery", "online"],
        message:
          "Payment method must be either 'cash on delivery' or 'online'.",
      },
      required: [true, "Payment method is required."],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "processing", "delivered"],
        message:
          "Status must be one of: pending, confirmed, processing, or delivered.",
      },
      default: "pending",
    },
  },
  { timestamps: true },
);

type OrderModelType = Model<InferSchemaType<typeof OrderSchema>>;

const OrderModel =
  (models.Order as OrderModelType) || model("Order", OrderSchema);

export default OrderModel;
