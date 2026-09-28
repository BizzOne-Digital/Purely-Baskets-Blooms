export const HOME_HERO_IMAGES = [
  "/home/hero-1.jpg",
  "/home/hero-2.jpg",
  "/home/hero-3.jpg",
  "/home/hero-4.jpg",
] as const;

/** @deprecated Use HOME_HERO_IMAGES */
export const HOME_HERO_IMAGE = HOME_HERO_IMAGES[0];

export const HOME_CATEGORIES = [
  "Birthdays",
  "Anniversaries",
  "Corporate",
  "Weddings",
  "Cultural Celebrations",
  "Just Because",
] as const;

export const HOME_OCCASIONS = [
  { label: "Birthdays", href: "/shop?occasion=Birthdays", image: "/home/occasion-birthdays.jpg" },
  { label: "Anniversaries", href: "/shop?occasion=Anniversaries", image: "/home/occasion-anniversaries.jpg" },
  { label: "Corporate", href: "/shop?occasion=Corporate", image: "/home/occasion-corporate.jpg" },
  { label: "Weddings", href: "/shop?occasion=Weddings", image: "/home/occasion-weddings.jpg" },
  {
    label: "Cultural Celebrations",
    href: "/shop?occasion=Cultural%20Celebrations",
    image: "/home/occasion-cultural.jpg",
  },
  { label: "Just Because", href: "/shop?occasion=Just%20Because", image: "/home/occasion-just-because.jpg" },
] as const;

export const HOME_SERVICES = [
  {
    title: "Custom Florals",
    description: "Bespoke arrangements designed around your story, palette and occasion.",
    href: "/services",
    image: "/home/service-custom-florals.jpg",
    tone: "light" as const,
  },
  {
    title: "Corporate Gifting",
    description: "Elevated gift experiences for clients, teams and milestone celebrations.",
    href: "/services",
    image: "/home/service-corporate.jpg",
    tone: "plum" as const,
  },
  {
    title: "Floral Subscriptions",
    description: "Seasonal blooms delivered on a schedule that suits your home or office.",
    href: "/booking?service=floral_subscription",
    image: "/home/service-subscriptions.jpg",
    tone: "light" as const,
  },
  {
    title: "Weddings & Events",
    description: "Immersive florals for ceremonies, receptions and unforgettable celebrations.",
    href: "/event-florals",
    image: "/home/service-weddings.jpg",
    tone: "plum" as const,
  },
];

export const HOME_GALLERY = [
  "/home/gallery-1.jpg",
  "/home/gallery-2.jpg",
  "/home/gallery-3.jpg",
  "/home/gallery-4.jpg",
  "/home/gallery-5.jpg",
  "/home/gallery-6.jpg",
] as const;

export const HOME_TESTIMONIALS_FALLBACK = [
  {
    quote:
      "The arrangement was absolutely stunning — every detail felt personal and beautifully considered.",
    name: "Priya S.",
    role: "Anniversary Gift",
  },
  {
    quote:
      "Our corporate gifting order was flawless. The presentation elevated the entire client experience.",
    name: "Michael T.",
    role: "Corporate Client",
  },
  {
    quote:
      "The Riwaaz tray for our Roka was breathtaking. It honoured tradition with such modern elegance.",
    name: "Ananya K.",
    role: "Wedding Celebration",
  },
];

export const HOME_PROCESS_STEPS = [
  {
    step: "01",
    title: "Share Your Vision",
    description: "Tell us about the occasion, palette and sentiment you want to express.",
  },
  {
    step: "02",
    title: "We Design Together",
    description: "Our artisans curate florals, gifts and presentation details with you.",
  },
  {
    step: "03",
    title: "Handcrafted With Care",
    description: "Every piece is thoughtfully styled using premium, seasonally sourced blooms.",
  },
  {
    step: "04",
    title: "Delivered Beautifully",
    description: "Finished with care and delivered across the GTA for a memorable reveal.",
  },
];
