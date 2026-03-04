import { Schema } from "mongoose";

export const cartItemSchema = new Schema(
  {
    customizedProduct: {
      type: {
        productType: {
          type: String,
          enum: ["customDress", "product"],
          required: [true, "Customization type is required"],
        },

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
            imageSnapshot: {
              type: String,
              required: [true, "Product image snapshot is required"],
            },
          },
          _id: false,
        },
      },
      required: [true, "Customized product is required"],
      _id: false,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 1,
      min: [1, "Quantity must be at least 1"],
    },
    unitPrice: {
      type: Number,
      required: [true, "Unit price is required"],
      min: [0, "Unit price cannot be negative"],
    },
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required"],
      min: [0, "Subtotal cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);
