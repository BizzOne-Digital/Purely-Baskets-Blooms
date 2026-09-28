/** Content from https://purelybasketsandblooms.com/business-subcriptions */

export const BUSINESS_SUBSCRIPTIONS_INTRO = {
  title: "Business Subscriptions",
  lead:
    "Enhance your office, impress clients, and build a welcoming environment. Ideal for offices, reception areas, or client gifts.",
  secondary:
    "From classic roses to exotic orchids, we have something for every taste.",
  pricingNote: "Subscription pricing is customized to your floral preferences.",
} as const;

export const SUBSCRIPTION_BENEFITS = [
  "Fresh flowers delivered weekly, bi-weekly, or monthly",
  "Hand-selected seasonal blooms",
  "FREE delivery",
  "Flexible subscription — you can pause or change anytime",
] as const;

export const SUBSCRIPTION_PLANS = [
  {
    id: "office-fresh",
    title: "Office Fresh",
    frequency: "1 arrangement per month",
    image: "/home/service-corporate.jpg",
    highlight: false,
  },
  {
    id: "client-impression",
    title: "Client Impression",
    frequency: "Bi-weekly — 2 arrangements per month",
    image: "/home/occasion-corporate.jpg",
    highlight: true,
    showBenefits: true,
  },
  {
    id: "corporate-elegance",
    title: "Corporate Elegance",
    frequency: "4 arrangements per month",
    image: "/pages/services/02-corporate.jpg",
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
    image: "/products/corporate-welcome-basket.jpg",
  },
  {
    id: "employee-appreciation",
    title: "Employee Appreciation",
    bullets: [
      "Celebrate hard work, achievements, and milestones",
      "Ideal for recognition, gratitude, and special moments",
      "Handcrafted designs created with care",
    ],
    image: "/home/banner-corporate.jpg",
  },
] as const;
