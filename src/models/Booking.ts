import mongoose, { Schema, type Model } from "mongoose";
import type { IBooking } from "@/types";

const BookingInspirationImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String },
  },
  { _id: false }
);

const BookingSchema = new Schema<IBooking>(
  {
    customerName: { type: String, required: true, trim: true },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    customerPhone: { type: String, required: true, trim: true },
    serviceType: {
      type: String,
      enum: [
        "custom_floral",
        "corporate_gifting",
        "floral_subscription",
        "riwaaz_collection",
        "wedding_event",
        "other",
      ],
      required: true,
      index: true,
    },
    occasion: { type: String },
    eventDate: { type: Date },
    eventLocation: { type: String },
    estimatedGuestCount: { type: Number, min: 1 },
    budgetRange: {
      type: String,
      enum: [
        "under_100",
        "100_250",
        "250_500",
        "500_1000",
        "1000_plus",
        "flexible",
      ],
    },
    preferredColors: { type: String },
    floralStyle: { type: String },
    productsOrServices: { type: String },
    inspirationImages: [BookingInspirationImageSchema],
    message: { type: String, required: true, maxlength: 5000 },
    specialRequirements: { type: String, maxlength: 2000 },
    preferredContactMethod: {
      type: String,
      enum: ["email", "phone", "either"],
      default: "email",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "booked", "closed"],
      default: "new",
      index: true,
    },
    adminNotes: { type: String, maxlength: 2000 },
    confirmationEmailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ status: 1, createdAt: -1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
