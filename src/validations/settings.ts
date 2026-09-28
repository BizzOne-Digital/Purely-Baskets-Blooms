import { z } from "zod";
import { productImageSchema } from "./product";

export const heroContentSchema = z.object({
  eyebrow: z.string().max(200).optional(),
  heading: z.string().max(200).optional(),
  subheading: z.string().max(200).optional(),
  primaryCtaLabel: z.string().max(50).optional(),
  primaryCtaHref: z.string().max(200).optional(),
  secondaryCtaLabel: z.string().max(50).optional(),
  secondaryCtaHref: z.string().max(200).optional(),
  trustLine: z.string().max(300).optional(),
});

export const announcementBarSchema = z.object({
  enabled: z.boolean().default(false),
  message: z.string().max(300).optional(),
  link: z.string().max(500).optional(),
  linkLabel: z.string().max(50).optional(),
});

export const businessHoursSchema = z.object({
  day: z.string().min(1),
  open: z.string().min(1),
  close: z.string().min(1),
  isClosed: z.boolean().optional(),
});

export const footerContentSchema = z.object({
  tagline: z.string().max(200).optional(),
  aboutSnippet: z.string().max(500).optional(),
  copyrightText: z.string().max(200).optional(),
});

export const seoDefaultsSchema = z.object({
  title: z.string().max(70).optional(),
  description: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1).max(100).optional(),
  logo: productImageSchema.optional().nullable(),
  favicon: productImageSchema.optional().nullable(),
  heroContent: heroContentSchema.optional(),
  heroImages: z.array(productImageSchema).optional(),
  contactEmail: z.string().email().optional(),
  phoneNumber: z.string().max(20).optional(),
  phoneVisible: z.boolean().optional(),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  deliveryAreaText: z.string().max(300).optional(),
  announcementBar: announcementBarSchema.optional(),
  businessHours: z.array(businessHoursSchema).optional(),
  taxRate: z.number().min(0).max(1).optional(),
  deliveryCharge: z.number().min(0).optional(),
  minimumOrder: z.number().min(0).optional(),
  stripeEnabled: z.boolean().optional(),
  seoDefaults: seoDefaultsSchema.optional(),
  footerContent: footerContentSchema.optional(),
  privacyPolicy: z.string().optional(),
  termsAndConditions: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().max(100).optional(),
  content: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5).optional(),
  image: productImageSchema.optional(),
  isFeatured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const galleryItemSchema = z.object({
  title: z.string().max(100).optional(),
  caption: z.string().max(500).optional(),
  image: productImageSchema,
  category: z.string().max(50).optional(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type GalleryItemInput = z.infer<typeof galleryItemSchema>;
