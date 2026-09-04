import mongoose, { Schema, type Model } from "mongoose";
import type { IOrder } from "@/types";

const OrderAddressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    province: { type: String, default: "ON" },
    country: { type: String, default: "CA" },
  },
  { _id: false }
);

const CartItemOptionSelectionSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const OrderLineItemAddOnSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const OrderLineItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    priceType: {
      type: String,
      enum: ["fixed", "starting", "quote"],
      required: true,
    },
    unitPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    selectedSize: { type: String },
    sizePriceModifier: { type: Number, default: 0 },
    selectedColor: { type: String },
    selectedOptions: [CartItemOptionSelectionSchema],
    selectedAddOns: [OrderLineItemAddOnSchema],
    lineTotal: { type: Number, required: true, min: 0 },
    giftMessage: { type: String },
    recipientName: { type: String },
    preferredDeliveryDate: { type: Date },
  },
  { _id: false }
);

const OrderPricingSchema = new Schema(
  {
    subtotal: { type: Number, required: true, min: 0 },
    discountAmount: { type: Number, default: 0, min: 0 },
    deliveryCharge: { type: Number, default: 0, min: 0 },
    taxAmount: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    couponCode: { type: String },
    couponId: { type: Schema.Types.ObjectId, ref: "Coupon" },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerName: { type: String, required: true, trim: true },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    customerPhone: { type: String, required: true, trim: true },
    recipientName: { type: String, trim: true },
    deliveryAddress: { type: OrderAddressSchema, required: true },
    preferredDeliveryDate: { type: Date },
    occasion: { type: String },
    giftMessage: { type: String, maxlength: 500 },
    deliveryInstructions: { type: String, maxlength: 500 },
    billingAddress: OrderAddressSchema,
    items: { type: [OrderLineItemSchema], required: true, validate: [(v: unknown[]) => v.length > 0, "Order must have at least one item"] },
    pricing: { type: OrderPricingSchema, required: true },
    status: {
      type: String,
      enum: [
        "new",
        "confirmed",
        "in_preparation",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "new",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "manual_invoice"],
      default: "pending",
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "manual", "invoice"],
      default: "manual",
    },
    stripeSessionId: { type: String, index: true },
    stripePaymentIntentId: { type: String },
    orderNotes: { type: String, maxlength: 1000 },
    internalNotes: { type: String, maxlength: 2000 },
    confirmationEmailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ paymentStatus: 1, createdAt: -1 });

const Order: Model<IOrder> =
  mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
