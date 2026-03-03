import { InferSchemaType, Model, model, models, Schema } from "mongoose";
import { cartItemSchema } from "./CartItem";

const UserStoreSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userType: {
      type: String,
      enum: ["guest", "user"],
      required: true,
    },
    cartItems: {
      type: [cartItemSchema],
      default: [],
    },
    wishlistItems: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
      default: [],
      _id: false,
    },
  },
  { timestamps: true, collection: "user_stores" },
);

type UserStoreType = Model<InferSchemaType<typeof UserStoreSchema>>;

const UserStoreModel =
  (models.UserStore as UserStoreType) || model("UserStore", UserStoreSchema);

export default UserStoreModel;
