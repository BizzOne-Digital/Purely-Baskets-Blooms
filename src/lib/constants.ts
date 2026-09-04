import type {
  BookingStatus,
  ContactInquiryStatus,
  OrderStatus,
  PaymentStatus,
  ServiceType,
} from "@/types";

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export const BRAND = {
  name: "Purely Baskets & Blooms",
  shortName: "Purely Baskets & Blooms",
  tagline: "Thoughtfully Designed. Beautifully Celebrated.",
  email: "info@purelybasketsandblooms.com",
  instagram: "@purelybasketsandblooms",
  instagramUrl: "https://instagram.com/purelybasketsandblooms",
  defaultPhone: "905-955-7890",
  deliveryArea: "GTA and surrounding cities",
  orderNumberPrefix: "PBB",
  logoPath: "/logo.png",
  heroBackgroundPath: "/hero-background.jpg",
} as const;

export const BRAND_COLORS = {
  warmIvory: "#FFF9F4",
  softBlush: "#F5D6DC",
  dustyRose: "#D8758F",
  deepBerry: "#7A2048",
  plum: "#481936",
  coral: "#F08A78",
  marigoldGold: "#E8AE43",
  champagne: "#E8CC95",
  botanicalGreen: "#31594B",
  deepInk: "#241920",
} as const;

// ---------------------------------------------------------------------------
// Currency & locale
// ---------------------------------------------------------------------------

export const CURRENCY = {
  code: "CAD",
  locale: "en-CA",
  symbol: "$",
} as const;

export const DEFAULT_TAX_RATE = 0.13;
export const DEFAULT_DELIVERY_CHARGE = 15;
export const DEFAULT_MINIMUM_ORDER = 0;

// ---------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------

export const ORDER_STATUSES: readonly OrderStatus[] = [
  "new",
  "confirmed",
  "in_preparation",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  in_preparation: "In Preparation",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_STATUSES: readonly PaymentStatus[] = [
  "pending",
  "paid",
  "failed",
  "refunded",
  "manual_invoice",
] as const;

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
  refunded: "Refunded",
  manual_invoice: "Manual Invoice",
};

// ---------------------------------------------------------------------------
// Product taxonomy
// ---------------------------------------------------------------------------

export const DEFAULT_CATEGORIES = [
  { name: "Floral Arrangements", slug: "floral-arrangements" },
  { name: "Gift Baskets", slug: "gift-baskets" },
  { name: "Corporate Gifts", slug: "corporate-gifts" },
  { name: "Subscriptions", slug: "subscriptions" },
  { name: "The Riwaaz Collection", slug: "riwaaz-collection" },
  { name: "Event Florals", slug: "event-florals" },
  { name: "Add-Ons", slug: "add-ons" },
] as const;

export const DEFAULT_COLLECTIONS = [
  { name: "Featured", slug: "featured", isRiwaaz: false },
  { name: "Bestsellers", slug: "bestsellers", isRiwaaz: false },
  { name: "The Riwaaz Collection", slug: "riwaaz", isRiwaaz: true },
  { name: "Corporate", slug: "corporate", isRiwaaz: false },
  { name: "Seasonal", slug: "seasonal", isRiwaaz: false },
] as const;

export const OCCASIONS = [
  "Birthdays",
  "Anniversaries",
  "Congratulations",
  "Sympathy",
  "Weddings",
  "Corporate",
  "Cultural Celebrations",
  "Just Because",
  "Roka",
  "Shagun",
  "Mehndi",
  "Engagement",
  "Baby Shower",
  "Graduation",
] as const;

export type Occasion = (typeof OCCASIONS)[number];

export const PRICE_TYPES = [
  { value: "fixed", label: "Fixed Price" },
  { value: "starting", label: "Starting Price" },
  { value: "quote", label: "Request Quote" },
] as const;

export const AVAILABILITY_TYPES = [
  { value: "in_stock", label: "In Stock" },
  { value: "made_to_order", label: "Made to Order" },
  { value: "out_of_stock", label: "Out of Stock" },
] as const;

// ---------------------------------------------------------------------------
// Booking & services
// ---------------------------------------------------------------------------

export const SERVICE_TYPES: { value: ServiceType; label: string }[] = [
  { value: "custom_floral", label: "Custom Floral Arrangements" },
  { value: "corporate_gifting", label: "Corporate Gifting" },
  { value: "floral_subscription", label: "Floral Subscriptions" },
  { value: "riwaaz_collection", label: "The Riwaaz Collection" },
  { value: "wedding_event", label: "Weddings & Special Events" },
  { value: "other", label: "Other" },
];

export const BUDGET_RANGES = [
  { value: "under_100", label: "Under $100" },
  { value: "100_250", label: "$100 – $250" },
  { value: "250_500", label: "$250 – $500" },
  { value: "500_1000", label: "$500 – $1,000" },
  { value: "1000_plus", label: "$1,000+" },
  { value: "flexible", label: "Flexible / Not sure" },
] as const;

export const BOOKING_STATUSES: readonly BookingStatus[] = [
  "new",
  "contacted",
  "quoted",
  "booked",
  "closed",
] as const;

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  booked: "Booked",
  closed: "Closed",
};

export const CONTACT_INQUIRY_STATUSES: readonly ContactInquiryStatus[] = [
  "new",
  "read",
  "replied",
  "closed",
] as const;

export const CONTACT_INQUIRY_STATUS_LABELS: Record<
  ContactInquiryStatus,
  string
> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  closed: "Closed",
};

export const PREFERRED_CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "either", label: "Either" },
] as const;

// ---------------------------------------------------------------------------
// Coupons
// ---------------------------------------------------------------------------

export const DISCOUNT_TYPES = [
  { value: "percentage", label: "Percentage Off" },
  { value: "fixed", label: "Fixed Amount Off" },
  { value: "free_delivery", label: "Free Delivery" },
] as const;

// ---------------------------------------------------------------------------
// Pagination & limits
// ---------------------------------------------------------------------------

export const PAGINATION = {
  defaultPageSize: 12,
  adminPageSize: 20,
  maxPageSize: 100,
} as const;

export const RATE_LIMITS = {
  login: { windowMs: 15 * 60 * 1000, maxRequests: 10 },
  contact: { windowMs: 60 * 60 * 1000, maxRequests: 5 },
  checkout: { windowMs: 60 * 60 * 1000, maxRequests: 10 },
  booking: { windowMs: 60 * 60 * 1000, maxRequests: 5 },
  newsletter: { windowMs: 60 * 60 * 1000, maxRequests: 3 },
  upload: { windowMs: 60 * 60 * 1000, maxRequests: 50 },
} as const;

// ---------------------------------------------------------------------------
// Cloudinary
// ---------------------------------------------------------------------------

export const CLOUDINARY_FOLDERS = {
  products: "pbb/products",
  hero: "pbb/hero",
  gallery: "pbb/gallery",
  bookings: "pbb/bookings",
  settings: "pbb/settings",
  testimonials: "pbb/testimonials",
} as const;

// ---------------------------------------------------------------------------
// Navigation (storefront)
// ---------------------------------------------------------------------------

export const STOREFRONT_NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Riwaaz", href: "/riwaaz", title: "The Riwaaz Collection" },
  { label: "Event Florals", href: "/event-florals" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A–Z" },
  { value: "bestseller", label: "Bestsellers" },
] as const;
