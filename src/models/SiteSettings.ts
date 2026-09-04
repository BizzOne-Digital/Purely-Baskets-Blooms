import mongoose, { Schema, type Model } from "mongoose";
import type { ISiteSettings } from "@/types";
import { BRAND, DEFAULT_DELIVERY_CHARGE, DEFAULT_MINIMUM_ORDER, DEFAULT_TAX_RATE } from "@/lib/constants";

const ProductImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String },
    width: { type: Number },
    height: { type: Number },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const HeroContentSchema = new Schema(
  {
    eyebrow: { type: String },
    heading: { type: String },
    subheading: { type: String },
    primaryCtaLabel: { type: String },
    primaryCtaHref: { type: String },
    secondaryCtaLabel: { type: String },
    secondaryCtaHref: { type: String },
    trustLine: { type: String },
  },
  { _id: false }
);

const AnnouncementBarSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    message: { type: String },
    link: { type: String },
    linkLabel: { type: String },
  },
  { _id: false }
);

const BusinessHoursSchema = new Schema(
  {
    day: { type: String, required: true },
    open: { type: String, required: true },
    close: { type: String, required: true },
    isClosed: { type: Boolean, default: false },
  },
  { _id: false }
);

const FooterContentSchema = new Schema(
  {
    tagline: { type: String },
    aboutSnippet: { type: String },
    copyrightText: { type: String },
  },
  { _id: false }
);

const SeoDefaultsSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    ogImage: { type: String },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: { type: String, default: BRAND.name },
    logo: ProductImageSchema,
    favicon: ProductImageSchema,
    heroContent: {
      type: HeroContentSchema,
      default: () => ({
        eyebrow: "Bespoke Florals • Meaningful Gifts • Beautiful Celebrations",
        heading: "Thoughtfully Designed.",
        subheading: "Beautifully Celebrated.",
        primaryCtaLabel: "Shop the Collection",
        primaryCtaHref: "/shop",
        secondaryCtaLabel: "Create a Custom Order",
        secondaryCtaHref: "/booking",
        trustLine: "Advance orders • Personalized designs • Delivery across the GTA",
      }),
    },
    heroImages: [ProductImageSchema],
    contactEmail: { type: String, default: BRAND.email },
    phoneNumber: { type: String, default: BRAND.defaultPhone },
    phoneVisible: { type: Boolean, default: false },
    instagramUrl: { type: String, default: BRAND.instagramUrl },
    deliveryAreaText: { type: String, default: BRAND.deliveryArea },
    announcementBar: {
      type: AnnouncementBarSchema,
      default: () => ({ enabled: false }),
    },
    businessHours: [BusinessHoursSchema],
    taxRate: { type: Number, default: DEFAULT_TAX_RATE, min: 0, max: 1 },
    deliveryCharge: { type: Number, default: DEFAULT_DELIVERY_CHARGE, min: 0 },
    minimumOrder: { type: Number, default: DEFAULT_MINIMUM_ORDER, min: 0 },
    stripeEnabled: { type: Boolean, default: false },
    seoDefaults: { type: SeoDefaultsSchema, default: () => ({}) },
    footerContent: { type: FooterContentSchema, default: () => ({}) },
    privacyPolicy: { type: String },
    termsAndConditions: { type: String },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
