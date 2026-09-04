import type { Types } from "mongoose";

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export type MongoId = Types.ObjectId | string;

export type PriceType = "fixed" | "starting" | "quote";

export type ProductStatus = "draft" | "published";

export type AvailabilityType = "in_stock" | "made_to_order" | "out_of_stock";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "in_preparation"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "manual_invoice";

export type PaymentMethod = "stripe" | "manual" | "invoice";

export type DiscountType = "percentage" | "fixed" | "free_delivery";

export type BookingStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "booked"
  | "closed";

export type ContactInquiryStatus =
  | "new"
  | "read"
  | "replied"
  | "closed";

export type AdminRole = "admin" | "super_admin";

export type PreferredContactMethod = "email" | "phone" | "either";

export type ServiceType =
  | "custom_floral"
  | "corporate_gifting"
  | "floral_subscription"
  | "riwaaz_collection"
  | "wedding_event"
  | "other";

export type BudgetRange =
  | "under_100"
  | "100_250"
  | "250_500"
  | "500_1000"
  | "1000_plus"
  | "flexible";

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export interface ProductImage {
  url: string;
  publicId: string;
  alt?: string;
  width?: number;
  height?: number;
  order?: number;
}

export interface ProductOption {
  name: string;
  values: string[];
  required?: boolean;
}

export interface SizeOption {
  label: string;
  priceModifier: number;
  description?: string;
}

export interface ColorPaletteOption {
  name: string;
  hex?: string;
  imageUrl?: string;
}

export interface ProductAddOn {
  name: string;
  price: number;
  description?: string;
  maxQuantity?: number;
}

export interface IProduct {
  _id: MongoId;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: MongoId;
  collection?: MongoId;
  occasionTags: string[];
  mainImage: ProductImage;
  gallery: ProductImage[];
  priceType: PriceType;
  basePrice?: number;
  compareAtPrice?: number;
  salePrice?: number;
  saleStartDate?: Date;
  saleEndDate?: Date;
  productOptions: ProductOption[];
  sizeOptions: SizeOption[];
  colorPaletteOptions: ColorPaletteOption[];
  addOns: ProductAddOn[];
  leadTime?: string;
  careInstructions?: string;
  availability: AvailabilityType;
  stockQuantity?: number;
  isFeatured: boolean;
  isBestseller: boolean;
  isRiwaaz: boolean;
  seoTitle?: string;
  seoDescription?: string;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductDocument = IProduct;

// ---------------------------------------------------------------------------
// Category & Collection
// ---------------------------------------------------------------------------

export interface ICategory {
  _id: MongoId;
  name: string;
  slug: string;
  description?: string;
  image?: ProductImage;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICollection {
  _id: MongoId;
  name: string;
  slug: string;
  description?: string;
  image?: ProductImage;
  isRiwaaz: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Cart (client-side Zustand)
// ---------------------------------------------------------------------------

export interface CartAddOnSelection {
  name: string;
  price: number;
  quantity: number;
}

export interface CartItemOptionSelection {
  name: string;
  value: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string;
  priceType: PriceType;
  unitPrice: number;
  quantity: number;
  selectedSize?: string;
  sizePriceModifier?: number;
  selectedColor?: string;
  selectedOptions: CartItemOptionSelection[];
  selectedAddOns: CartAddOnSelection[];
  giftMessage?: string;
  recipientName?: string;
  preferredDeliveryDate?: string;
  leadTime?: string;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
}

// ---------------------------------------------------------------------------
// Coupon
// ---------------------------------------------------------------------------

export interface ICoupon {
  _id: MongoId;
  code: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  minimumSpend?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  perCustomerLimit?: number;
  applicableProducts: MongoId[];
  applicableCategories: MongoId[];
  startDate: Date;
  expiryDate: Date;
  isActive: boolean;
  isPublic: boolean;
  displayOnWebsite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------

export interface OrderAddress {
  street: string;
  city: string;
  postalCode: string;
  province?: string;
  country?: string;
}

export interface OrderLineItemAddOn {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderLineItem {
  productId: MongoId;
  slug: string;
  name: string;
  imageUrl: string;
  priceType: PriceType;
  unitPrice: number;
  quantity: number;
  selectedSize?: string;
  sizePriceModifier?: number;
  selectedColor?: string;
  selectedOptions: CartItemOptionSelection[];
  selectedAddOns: OrderLineItemAddOn[];
  lineTotal: number;
  giftMessage?: string;
  recipientName?: string;
  preferredDeliveryDate?: Date;
}

export interface OrderPricing {
  subtotal: number;
  discountAmount: number;
  deliveryCharge: number;
  taxAmount: number;
  total: number;
  couponCode?: string;
  couponId?: MongoId;
}

export interface IOrder {
  _id: MongoId;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  recipientName?: string;
  deliveryAddress: OrderAddress;
  preferredDeliveryDate?: Date;
  occasion?: string;
  giftMessage?: string;
  deliveryInstructions?: string;
  billingAddress?: OrderAddress;
  items: OrderLineItem[];
  pricing: OrderPricing;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  orderNotes?: string;
  internalNotes?: string;
  confirmationEmailSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Booking
// ---------------------------------------------------------------------------

export interface BookingInspirationImage {
  url: string;
  publicId: string;
  alt?: string;
}

export interface IBooking {
  _id: MongoId;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: ServiceType;
  occasion?: string;
  eventDate?: Date;
  eventLocation?: string;
  estimatedGuestCount?: number;
  budgetRange?: BudgetRange;
  preferredColors?: string;
  floralStyle?: string;
  productsOrServices?: string;
  inspirationImages: BookingInspirationImage[];
  message: string;
  specialRequirements?: string;
  preferredContactMethod: PreferredContactMethod;
  status: BookingStatus;
  adminNotes?: string;
  confirmationEmailSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Contact & Newsletter
// ---------------------------------------------------------------------------

export interface IContactInquiry {
  _id: MongoId;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: ContactInquiryStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewsletterSubscriber {
  _id: MongoId;
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Testimonial & Gallery
// ---------------------------------------------------------------------------

export interface ITestimonial {
  _id: MongoId;
  name: string;
  role?: string;
  content: string;
  rating?: number;
  image?: ProductImage;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGalleryItem {
  _id: MongoId;
  title?: string;
  caption?: string;
  image: ProductImage;
  category?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Admin User
// ---------------------------------------------------------------------------

export interface IAdminUser {
  _id: MongoId;
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Site Settings
// ---------------------------------------------------------------------------

export interface HeroContent {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  trustLine?: string;
}

export interface AnnouncementBar {
  enabled: boolean;
  message?: string;
  link?: string;
  linkLabel?: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface FooterContent {
  tagline?: string;
  aboutSnippet?: string;
  copyrightText?: string;
}

export interface SeoDefaults {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface ISiteSettings {
  _id: MongoId;
  siteName: string;
  logo?: ProductImage;
  favicon?: ProductImage;
  heroContent: HeroContent;
  heroImages: ProductImage[];
  contactEmail: string;
  phoneNumber?: string;
  phoneVisible: boolean;
  instagramUrl?: string;
  deliveryAreaText?: string;
  announcementBar: AnnouncementBar;
  businessHours: BusinessHours[];
  taxRate: number;
  deliveryCharge: number;
  minimumOrder: number;
  stripeEnabled: boolean;
  seoDefaults: SeoDefaults;
  footerContent: FooterContent;
  privacyPolicy?: string;
  termsAndConditions?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// API / Action response helpers
// ---------------------------------------------------------------------------

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// ---------------------------------------------------------------------------
// Pricing calculation (server-side)
// ---------------------------------------------------------------------------

export interface PricingLineInput {
  productId: string;
  unitPrice: number;
  quantity: number;
  sizePriceModifier?: number;
  selectedAddOns?: CartAddOnSelection[];
}

export interface PricingInput {
  items: PricingLineInput[];
  couponCode?: string;
  deliveryCharge?: number;
  taxRate?: number;
}

export interface PricingResult {
  subtotal: number;
  discountAmount: number;
  deliveryCharge: number;
  taxAmount: number;
  total: number;
  couponApplied: boolean;
  couponCode?: string;
  couponId?: string;
  couponMessage?: string;
  lineTotals: number[];
}
