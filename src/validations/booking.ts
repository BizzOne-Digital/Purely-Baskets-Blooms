import { z } from "zod";

export const bookingInspirationImageSchema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
  alt: z.string().optional(),
});

export const bookingSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(100),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z
    .string()
    .min(10, "Phone number is required")
    .max(20)
    .regex(/^[\d\s()+-]+$/, "Invalid phone number"),
  serviceType: z.enum([
    "custom_floral",
    "corporate_gifting",
    "floral_subscription",
    "riwaaz_collection",
    "wedding_event",
    "other",
  ]),
  occasion: z.string().max(100).optional(),
  eventDate: z.coerce.date().optional(),
  eventLocation: z.string().max(200).optional(),
  estimatedGuestCount: z.number().int().min(1).optional(),
  budgetRange: z
    .enum([
      "under_100",
      "100_250",
      "250_500",
      "500_1000",
      "1000_plus",
      "flexible",
    ])
    .optional(),
  preferredColors: z.string().max(500).optional(),
  floralStyle: z.string().max(500).optional(),
  productsOrServices: z.string().max(1000).optional(),
  inspirationImages: z.array(bookingInspirationImageSchema).max(10).default([]),
  message: z.string().min(10, "Please provide more details").max(5000),
  specialRequirements: z.string().max(2000).optional(),
  preferredContactMethod: z
    .enum(["email", "phone", "either"])
    .default("email"),
});

export const bookingStatusUpdateSchema = z.object({
  bookingId: z.string().min(1),
  status: z.enum(["new", "contacted", "quoted", "booked", "closed"]),
  adminNotes: z.string().max(2000).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type BookingStatusUpdateInput = z.infer<typeof bookingStatusUpdateSchema>;

export const updateBookingStatusSchema = bookingStatusUpdateSchema;
