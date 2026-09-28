import { z } from "zod";

const couponBaseSchema = z.object({
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(30)
    .regex(
      /^[A-Z0-9_-]+$/,
      "Code must be uppercase letters, numbers, hyphens or underscores"
    )
    .transform((val) => val.toUpperCase()),
  description: z.string().max(500).optional(),
  discountType: z.enum(["percentage", "fixed", "free_delivery"]),
  discountValue: z.number().min(0, "Discount value must be non-negative"),
  minimumSpend: z.number().min(0).optional().nullable(),
  maximumDiscount: z.number().min(0).optional().nullable(),
  usageLimit: z.number().int().min(1).optional().nullable(),
  perCustomerLimit: z.number().int().min(1).optional().nullable(),
  applicableProducts: z.array(z.string()).default([]),
  applicableCategories: z.array(z.string()).default([]),
  startDate: z.coerce.date(),
  expiryDate: z.coerce.date(),
  isActive: z.boolean().default(true),
  isPublic: z.boolean().default(false),
  displayOnWebsite: z.boolean().default(false),
});

export const couponSchema = couponBaseSchema
  .refine((data) => data.expiryDate > data.startDate, {
    message: "Expiry date must be after start date",
    path: ["expiryDate"],
  })
  .refine(
    (data) => {
      if (data.discountType === "percentage" && data.discountValue > 100) {
        return false;
      }
      return true;
    },
    {
      message: "Percentage discount cannot exceed 100%",
      path: ["discountValue"],
    }
  );

export const updateCouponSchema = couponBaseSchema.partial();

export const couponCodeSchema = z.object({
  code: z.string().min(1, "Coupon code is required").max(50),
});

export const validateCouponInputSchema = z.object({
  code: z.string().min(1, "Coupon code is required").max(50),
  subtotal: z.number().min(0),
  items: z
    .array(
      z.object({
        productId: z.string(),
        categoryId: z.string().optional(),
      })
    )
    .optional(),
  email: z.string().email().optional(),
});

export type CouponInput = z.infer<typeof couponSchema>;
export type CouponUpdateInput = z.infer<typeof updateCouponSchema>;
