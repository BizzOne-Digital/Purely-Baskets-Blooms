import mongoose, { Schema, type Model } from "mongoose";
import type { ICollection } from "@/types";

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

const CollectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String },
    image: ProductImageSchema,
    isRiwaaz: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CollectionSchema.index({ isActive: 1, order: 1 });

const Collection: Model<ICollection> =
  mongoose.models.Collection ||
  mongoose.model<ICollection>("Collection", CollectionSchema);

export default Collection;
