import { InferSchemaType, Model, model, models, Schema } from "mongoose";
import { cartItemSchema } from "./CartItem";

const CartSchema = new Schema(
  {
    ownerId: {
      type: String,
      unique: true,
      required: true,
    },
    userType: {
      type: String,
      enum: ["guest", "user"],
      required: true,
    },
    items: {
      type: [cartItemSchema],
    },
  },
  { timestamps: true },
);

type CartModelType = Model<InferSchemaType<typeof CartSchema>>;

const CartModel = (models.Cart as CartModelType) || model("Cart", CartSchema);

export default CartModel;
