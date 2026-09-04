import mongoose, { Schema, type Model } from "mongoose";
import type { IContactInquiry } from "@/types";

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
      index: true,
    },
    adminNotes: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

ContactInquirySchema.index({ createdAt: -1 });

const ContactInquiry: Model<IContactInquiry> =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);

export default ContactInquiry;
