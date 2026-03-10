import { Schema } from "mongoose";
import { cartItemSchema } from "./cartItemSchema";

export const orderItemSchema = new Schema({
  ...cartItemSchema.obj,
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  unitPrice: {
    type: Number,
    required: [true, "Unit price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  subtotal: {
    type: Number,
    required: [true, "Subtotal is required"],
  },
});
