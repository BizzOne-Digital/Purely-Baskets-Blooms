/** Corporate flower subscriptions — storefront copy */

export const BUSINESS_SUBSCRIPTIONS_INTRO = {
  title: "Corporate Floral Subscriptions",
  lead:
    "Bring a fresh touch of elegance to your workplace with Purely Baskets & Blooms. Our corporate floral subscriptions feature seasonal arrangements tailored to your space, style, and budget—creating a warm welcome in reception areas, offices, and boardrooms.",
  secondary:
    "Choose weekly, biweekly, or monthly deliveries to keep your business beautifully refreshed and leave a lasting impression on clients and your team.",
  pricingNote:
    "Contact us to create a floral subscription that works for your business.",
  heroImage: "/pages/corporate/corporate-floral-subscriptions.jpg",
  heroImageAlt:
    "Corporate floral arrangements in a reception area, boardroom, and executive lounge",
} as const;

export const SUBSCRIPTION_BENEFITS = [
  "Fresh flowers delivered weekly, bi-weekly, or monthly",
  "Hand-selected seasonal blooms",
  "FREE delivery in the GTA",
  "Flexible subscription — pause or change anytime",
] as const;

export const SUBSCRIPTION_PLANS = [
  {
    id: "office-fresh",
    title: "Office Fresh",
    frequency: "1 arrangement per month",
    highlight: false,
  },
  {
    id: "client-impression",
    title: "Client Impression",
    frequency: "Bi-weekly — 2 arrangements per month",
    highlight: true,
    showBenefits: true,
  },
  {
    id: "corporate-elegance",
    title: "Corporate Elegance",
    frequency: "4 arrangements per month",
    highlight: false,
  },
] as const;

export const SUBSCRIPTION_SERVICES = [
  {
    id: "corporate-gifting",
    title: "Corporate Gift Giving Solutions",
    bullets: [
      "Elegant floral arrangements for clients, partners, and events",
      "Thoughtful gifts that strengthen professional relationships",
      "Custom designs available upon request",
    ],
  },
  {
    id: "employee-appreciation",
    title: "Employee Appreciation",
    bullets: [
      "Celebrate hard work, achievements, and milestones",
      "Ideal for recognition, gratitude, and special moments",
      "Handcrafted designs created with care",
    ],
  },
] as const;
