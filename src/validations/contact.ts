import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .max(20)
    .regex(/^[\d\s()+-]*$/, "Invalid phone number")
    .optional(),
  subject: z.string().max(200).optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export const contactStatusUpdateSchema = z.object({
  inquiryId: z.string().min(1),
  status: z.enum(["new", "read", "replied", "closed"]),
  adminNotes: z.string().max(2000).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
