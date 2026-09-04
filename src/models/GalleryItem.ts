import mongoose, { Schema, type Model } from "mongoose";
import type { IGalleryItem } from "@/types";

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

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, trim: true },
    caption: { type: String, maxlength: 500 },
    image: { type: ProductImageSchema, required: true },
    category: { type: String, index: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

GalleryItemSchema.index({ isActive: 1, order: 1 });

const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);

export default GalleryItem;
