import mongoose, { Schema, type Model } from "mongoose";
import type { ICoupon } from "@/types";

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    description: { type: String },
    discountType: {
      type: String,
      enum: ["percentage", "fixed", "free_delivery"],
      required: true,
    },
    discountValue: { type: Number, required: true, min: 0 },
    minimumSpend: { type: Number, min: 0 },
    maximumDiscount: { type: Number, min: 0 },
    usageLimit: { type: Number, min: 1 },
    usageCount: { type: Number, default: 0, min: 0 },
    perCustomerLimit: { type: Number, min: 1 },
    applicableProducts: [
      { type: Schema.Types.ObjectId, ref: "Product" },
    ],
    applicableCategories: [
      { type: Schema.Types.ObjectId, ref: "Category" },
    ],
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true, index: true },
    isPublic: { type: Boolean, default: false },
    displayOnWebsite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CouponSchema.index({ isActive: 1, isPublic: 1, displayOnWebsite: 1 });
CouponSchema.index({ startDate: 1, expiryDate: 1 });

const Coupon: Model<ICoupon> =
  mongoose.models.Coupon ||
  mongoose.model<ICoupon>("Coupon", CouponSchema);

export default Coupon;
