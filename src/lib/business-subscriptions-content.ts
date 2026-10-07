/** Corporate flower subscriptions — storefront copy */

export const BUSINESS_SUBSCRIPTIONS_INTRO = {
  title: "Corporate Flower Subscriptions",
  lead:
    "Bring fresh beauty to your workplace with a flower subscription from Purely Baskets & Blooms. From welcoming reception areas to boardrooms and client spaces, our seasonal arrangements add warmth and leave a lasting impression.",
  secondary:
    "Choose weekly, biweekly or monthly deliveries, with designs tailored to your space, style and budget. We take care of the flowers so you can enjoy a beautifully refreshed workplace.",
  pricingNote: "Contact us to create a subscription that's right for your business.",
  heroImage: "/pages/corporate/reception-flowers.png",
  heroImageAlt: "Colleagues celebrating with fresh flowers in a corporate office",
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
