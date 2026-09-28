import mongoose, { Schema, type Model } from "mongoose";
import type { IProduct } from "@/types";

const ProductImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String },
    width: { type: Number },
    height: { type: Number },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductOptionSchema = new Schema(
  {
    name: { type: String, required: true },
    values: [{ type: String, required: true }],
    required: { type: Boolean, default: false },
  },
  { _id: false }
);

const SizeOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    priceModifier: { type: Number, default: 0 },
    description: { type: String },
  },
  { _id: false }
);

const ColorPaletteOptionSchema = new Schema(
  {
    name: { type: String, required: true },
    hex: { type: String },
    imageUrl: { type: String },
  },
  { _id: false }
);

const ProductAddOnSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    maxQuantity: { type: Number, min: 1 },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
    fullDescription: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      index: true,
    },
    occasionTags: [{ type: String, trim: true, index: true }],
    mainImage: { type: ProductImageSchema, required: true },
    gallery: [ProductImageSchema],
    priceType: {
      type: String,
      enum: ["fixed", "starting", "quote"],
      default: "starting",
      required: true,
    },
    basePrice: { type: Number, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    salePrice: { type: Number, min: 0 },
    saleStartDate: { type: Date },
    saleEndDate: { type: Date },
    productOptions: [ProductOptionSchema],
    sizeOptions: [SizeOptionSchema],
    colorPaletteOptions: [ColorPaletteOptionSchema],
    addOns: [ProductAddOnSchema],
    leadTime: { type: String },
    careInstructions: { type: String },
    availability: {
      type: String,
      enum: ["in_stock", "made_to_order", "out_of_stock"],
      default: "made_to_order",
      index: true,
    },
    stockQuantity: { type: Number, min: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    isBestseller: { type: Boolean, default: false, index: true },
    isRiwaaz: { type: Boolean, default: false, index: true },
    seoTitle: { type: String, maxlength: 70 },
    seoDescription: { type: String, maxlength: 160 },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

ProductSchema.index({ status: 1, isFeatured: 1 });
ProductSchema.index({ status: 1, isBestseller: 1 });
ProductSchema.index({ status: 1, isRiwaaz: 1 });
ProductSchema.index({ basePrice: 1 });
ProductSchema.index({ salePrice: 1, saleStartDate: 1, saleEndDate: 1 });
ProductSchema.index({ name: "text", shortDescription: "text", fullDescription: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
