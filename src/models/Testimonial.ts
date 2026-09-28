import mongoose, { Schema, type Model } from "mongoose";
import type { ITestimonial } from "@/types";

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

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    content: { type: String, required: true, maxlength: 1000 },
    rating: { type: Number, min: 1, max: 5 },
    image: ProductImageSchema,
    isFeatured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

TestimonialSchema.index({ isActive: 1, order: 1 });

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
