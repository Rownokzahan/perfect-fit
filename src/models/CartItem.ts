import { Schema } from "mongoose";

export const cartItemSchema = new Schema(
  {
    customizations: {
      type: {
        bodiceType: {
          type: String,
          required: [true, "Bodice type is required"],
        },
        sleeveType: {
          type: String,
          required: [true, "Sleeve type is required"],
        },
        skirtType: {
          type: String,
          required: [true, "Skirt type is required"],
        },
        fabric: {
          type: String,
          required: [true, "Fabric is required"],
        },
      },
      required: [true, "Customizations are required"],
      _id: false,
    },
    measurements: {
      type: {
        length: {
          type: Number,
          required: [true, "Length measurement is required"],
        },
        sleeveLength: {
          type: Number,
          required: [true, "Sleeve length measurement is required"],
        },
        chest: {
          type: Number,
          required: [true, "Chest measurement is required"],
        },
        waist: {
          type: Number,
          required: [true, "Waist measurement is required"],
        },
      },
      required: [true, "Measurements are required"],
      _id: false,
    },
    product: {
      type: {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },
        nameSnapshot: {
          type: String,
          required: [true, "Product name snapshot is required"],
        },
        priceSnapshot: {
          type: Number,
          required: [true, "Product price snapshot is required"],
          min: [0, "Price cannot be negative"],
        },
        imageSnapshot: {
          type: String,
          required: [true, "Product image snapshot is required"],
        },
      },
      required: [
        function (this: { isCustomDress: boolean }) {
          return !this.isCustomDress;
        },
        "Product is required when isCustomDress is false",
      ],
      _id: false,
    },
    isCustomDress: {
      type: Boolean,
      required: [true, "Please specify if this is a custom dress"],
    },
    customDress: {
      type: {
        name: {
          type: String,
          required: [true, "Custom dress name is required"],
        },
        price: {
          type: Number,
          required: [true, "Custom dress price is required"],
          min: [0, "Price cannot be negative"],
        },
      },
      required: [
        function (this: { isCustomDress: boolean }) {
          return this.isCustomDress;
        },
        "Custom dress is required when isCustomDress is true",
      ],
      _id: false,
    },
    request: String,
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 1,
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);
