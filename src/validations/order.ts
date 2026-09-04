import { z } from "zod";

const cartAddOnSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().int().min(1),
});

const cartItemOptionSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  slug: z.string().min(1),
  name: z.string().min(1),
  imageUrl: z.string().url(),
  priceType: z.enum(["fixed", "starting", "quote"]),
  unitPrice: z.number().min(0),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  selectedSize: z.string().optional(),
  sizePriceModifier: z.number().default(0),
  selectedColor: z.string().optional(),
  selectedOptions: z.array(cartItemOptionSchema).default([]),
  selectedAddOns: z.array(cartAddOnSchema).default([]),
  giftMessage: z.string().max(500).optional(),
  recipientName: z.string().max(100).optional(),
  preferredDeliveryDate: z.string().optional(),
  leadTime: z.string().optional(),
});

export const orderAddressSchema = z.object({
  street: z.string().min(1, "Street address is required").max(200),
  city: z.string().min(1, "City is required").max(100),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      "Invalid Canadian postal code"
    ),
  province: z.string().max(50).default("ON"),
  country: z.string().max(50).default("CA"),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(100),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z
    .string()
    .min(10, "Phone number is required")
    .max(20)
    .regex(/^[\d\s()+-]+$/, "Invalid phone number"),
  recipientName: z.string().max(100).optional(),
  deliveryAddress: orderAddressSchema,
  preferredDeliveryDate: z.coerce.date().optional(),
  occasion: z.string().max(100).optional(),
  giftMessage: z.string().max(500).optional(),
  deliveryInstructions: z.string().max(500).optional(),
  billingAddress: orderAddressSchema.optional(),
  items: z.array(cartItemSchema).min(1, "Cart cannot be empty"),
  couponCode: z.string().max(50).optional(),
  orderNotes: z.string().max(1000).optional(),
  paymentMethod: z.enum(["stripe", "manual", "invoice"]).default("manual"),
});

export const orderStatusUpdateSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum([
    "new",
    "confirmed",
    "in_preparation",
    "ready",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ]),
  internalNotes: z.string().max(2000).optional(),
});

export const paymentStatusUpdateSchema = z.object({
  orderId: z.string().min(1),
  paymentStatus: z.enum([
    "pending",
    "paid",
    "failed",
    "refunded",
    "manual_invoice",
  ]),
});

export const couponValidationSchema = z.object({
  code: z.string().min(1, "Coupon code is required").max(50),
  items: z.array(cartItemSchema).min(1),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>;

export const updateOrderStatusSchema = orderStatusUpdateSchema;
export const updatePaymentStatusSchema = paymentStatusUpdateSchema;
