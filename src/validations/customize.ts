import { z } from "zod";
import { bookingInspirationImageSchema } from "@/validations/booking";
import {
  CUSTOMIZE_MIN_LEAD_DAYS,
  earliestCustomizeEventDate,
  startOfLocalDay,
} from "@/lib/customize-policy";

export const customizeSchema = z
  .object({
    customerName: z.string().min(1, "Name is required").max(100),
    customerEmail: z.string().email("Invalid email address"),
    customerPhone: z
      .string()
      .min(10, "Phone number is required")
      .max(20)
      .regex(/^[\d\s()+-]+$/, "Invalid phone number"),
    occasion: z.string().min(1, "Occasion / event type is required").max(100),
    eventDate: z.coerce.date({ required_error: "Event date is required" }),
    eventLocation: z.string().min(1, "Event location is required").max(200),
    preferredColors: z.string().max(500).optional(),
    floralStyle: z.string().max(500).optional(),
    referenceNotes: z.string().max(2000).optional(),
    inspirationImages: z.array(bookingInspirationImageSchema).max(3),
    message: z
      .string()
      .min(10, "Please describe your vision (at least 10 characters)")
      .max(5000),
    preferredContactMethod: z.enum(["email", "phone", "either"]),
  })
  .superRefine((data, ctx) => {
    const eventDay = startOfLocalDay(data.eventDate);
    const minDay = earliestCustomizeEventDate();

    if (eventDay < minDay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Your event must be at least ${CUSTOMIZE_MIN_LEAD_DAYS} days from today. Choose ${minDay.toLocaleDateString("en-CA")} or later.`,
        path: ["eventDate"],
      });
    }
  });

export type CustomizeInput = z.infer<typeof customizeSchema>;
