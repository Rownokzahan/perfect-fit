import { Schema } from "mongoose";

export const cartItemSchema = new Schema(
  {
    productType: {
      type: String,
      enum: ["customDress", "product"],
      required: [true, "Customization type is required"],
    },

    product: {
      type: {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },
        slugSnapshot: {
          type: String,
          required: [true, "Product slug snapshot is required"],
        },
        nameSnapshot: {
          type: String,
          required: [true, "Product name snapshot is required"],
        },
        imageSnapshot: {
          type: String,
          required: [true, "Product image snapshot is required"],
        },
        priceSnapshot: {
          type: Number,
          required: [true, "Product price snapshot is required"],
          min: [0, "Product price cannot be negative"],
        },
      },
      required: [
        function (this: { productType?: string }) {
          return this.productType === "product";
        },
        "Product info is required for product type 'product'",
      ],
      _id: false,
    },

    customizations: {
      type: {
        // Base customization fields
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

        // Measurements
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

        // Request notes
        request: {
          type: String,
          default: "",
        },
      },
      required: [true, "Customizations are required"],
      _id: false,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 1,
      min: [1, "Quantity must be at least 1"],
    },
  },
  {
    timestamps: true,
  },
);
