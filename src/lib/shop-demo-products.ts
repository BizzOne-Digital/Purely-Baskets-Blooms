import type { IProduct } from "@/types";

type DemoProduct = Omit<IProduct, "_id" | "category" | "collection"> & {
  _id: string;
  category?: string;
  collection?: string;
};

const LOCAL_PRODUCT_IMAGES: Record<string, string> = {
  "your-love-story": "/products/blush-garden.jpg",
  "blush-garden": "/products/blush-garden.jpg",
  "birthday-blooms": "/products/the-berry-edit.jpg",
  "the-berry-edit": "/products/the-berry-edit.jpg",
  "sympathy-comfort": "/products/sympathy-comfort.jpg",
  "corporate-welcome-basket": "/products/corporate-welcome-basket.jpg",
  "special-occasion-florals": "/products/champagne-rose-box.jpg",
  "champagne-rose-box": "/products/champagne-rose-box.jpg",
  "ivory-elegance": "/products/ivory-elegance.jpg",
  "golden-hour-basket": "/products/golden-hour-basket.jpg",
  "ritual-bloom-tray": "/products/ritual-bloom-tray.jpg",
  "roka-shagun-tray": "/products/roka-shagun-tray.jpg",
  "mehndi-celebration-tray": "/products/mehndi-celebration-tray.jpg",
  "wedding-gifting-tray": "/products/wedding-gifting-tray.jpg",
  "heritage-bloom-tray": "/products/heritage-bloom-tray.jpg",
};

export function applyLocalProductImages<
  T extends { slug: string; name: string; mainImage?: { url: string; alt?: string } },
>(products: T[]): T[] {
  return products.map((product) => {
    const localUrl = LOCAL_PRODUCT_IMAGES[product.slug];
    if (!localUrl) return product;
    return {
      ...product,
      mainImage: {
        ...product.mainImage,
        url: localUrl,
        alt: product.mainImage?.alt ?? product.name,
      },
    };
  });
}

/** Catalog aligned with purelybasketsandblooms.com categories and copy */
export const DEMO_SHOP_PRODUCTS: DemoProduct[] = [
  {
    _id: "demo-your-love-story",
    name: "Your Love Story",
    slug: "your-love-story",
    shortDescription:
      "Your wedding bouquet should be as unique as your love story. Each bouquet can be customized to complement your wedding colours, personal style and overall vision.",
    fullDescription:
      "<p>An elegant all-white bridal bouquet featuring graceful calla lilies, delicate lisianthus and lush seasonal blooms. Accented with flowing pearls and finished with a satin-wrapped handle, this timeless design brings romance, sophistication and a touch of luxury to your wedding day. Every bouquet can be customized to reflect your preferred flowers, colours, size and personal style.</p><p>Because flowers are seasonal, we will work with you to create a beautiful design using the freshest available blooms.</p>",
    occasionTags: ["Weddings", "Anniversaries"],
    mainImage: {
      url: "/products/blush-garden.jpg",
      publicId: "local/your-love-story",
      alt: "Your Love Story custom wedding bouquet",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 150,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    leadTime: "2–4 weeks advance notice recommended",
    isFeatured: true,
    isBestseller: true,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-06-01"),
  },
  {
    _id: "demo-birthday-blooms",
    name: "Birthday Flowers",
    slug: "birthday-blooms",
    shortDescription:
      "Make someone's birthday extra special with our beautiful range of birthday flowers — from classic bouquets to unique arrangements.",
    fullDescription:
      "<p>We have something for everyone. Tell us their favourite colours and flowers and we will create a thoughtful birthday design using the freshest seasonal blooms.</p>",
    occasionTags: ["Birthdays"],
    mainImage: {
      url: "/products/the-berry-edit.jpg",
      publicId: "local/birthday-blooms",
      alt: "Birthday flower arrangement",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 75,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "in_stock",
    leadTime: "24–48 hours advance notice",
    isFeatured: true,
    isBestseller: false,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-sympathy-comfort",
    name: "Sympathy Flowers",
    slug: "sympathy-comfort",
    shortDescription:
      "Express your condolences with sympathy flowers — our florists will work with you to create an arrangement that captures your sentiments.",
    fullDescription:
      "<p>Compassionate, understated designs in soft palettes to honour and comfort. Each piece is crafted with care and can be customized on request.</p>",
    occasionTags: ["Sympathy"],
    mainImage: {
      url: "/products/sympathy-comfort.jpg",
      publicId: "local/sympathy-comfort",
      alt: "Sympathy floral arrangement",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 85,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    leadTime: "24–48 hours advance notice",
    isFeatured: true,
    isBestseller: false,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-corporate-welcome",
    name: "Corporate Flowers",
    slug: "corporate-welcome-basket",
    shortDescription:
      "Make a lasting impression with corporate flowers — perfect for events, conferences, business meetings, and subscription programs.",
    fullDescription:
      "<p>Elevate your workspace or client gifting with refined florals and presentation. Ask about business subscriptions for recurring delivery.</p>",
    occasionTags: ["Corporate"],
    mainImage: {
      url: "/products/corporate-welcome-basket.jpg",
      publicId: "local/corporate-welcome-basket",
      alt: "Corporate floral gift",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 95,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    leadTime: "3–5 business days for subscriptions",
    isFeatured: true,
    isBestseller: false,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-special-occasion",
    name: "Special Occasion Flowers",
    slug: "special-occasion-florals",
    shortDescription:
      "Anniversary, graduation, or just because — bespoke arrangements for life's meaningful moments.",
    fullDescription:
      "<p>Our expert florists will create a bespoke arrangement just for you. Share your vision and we will bring it to life.</p>",
    occasionTags: ["Anniversaries", "Congratulations", "Just Because"],
    mainImage: {
      url: "/products/champagne-rose-box.jpg",
      publicId: "local/special-occasion",
      alt: "Special occasion florals",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 80,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "in_stock",
    isFeatured: false,
    isBestseller: false,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-ritual-bloom-tray",
    name: "Bangle Bouquets & Celebration Trays",
    slug: "ritual-bloom-tray",
    shortDescription:
      "Riwaaz Collection — floral bangle bouquets, sweets trays, potlis, and celebration baskets, fully customized.",
    fullDescription:
      "<p>The Riwaaz Collection honours tradition while embracing a modern, elegant touch. Products include bangle bouquets, sweets trays, potlis, and celebration baskets — tailored to your event, vision, and colours.</p>",
    occasionTags: ["Cultural Celebrations", "Weddings"],
    mainImage: {
      url: "/products/ritual-bloom-tray.jpg",
      publicId: "local/ritual-bloom-tray",
      alt: "Riwaaz celebration tray",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 125,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    leadTime: "2–3 weeks advance notice",
    isFeatured: true,
    isBestseller: false,
    isRiwaaz: true,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-roka-shagun",
    name: "Roka & Shagun Tray",
    slug: "roka-shagun-tray",
    shortDescription: "Meaningful florals for Roka and Shagun ceremonies — customized to your family traditions.",
    fullDescription:
      "<p>In every celebration, flowers symbolize purity, blessings, and new beginnings. We design each tray to feel personal, meaningful, and unforgettable.</p>",
    occasionTags: ["Roka", "Shagun", "Cultural Celebrations"],
    mainImage: {
      url: "/products/roka-shagun-tray.jpg",
      publicId: "local/roka-shagun-tray",
      alt: "Roka Shagun floral tray",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 135,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    isFeatured: false,
    isBestseller: false,
    isRiwaaz: true,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-mehndi",
    name: "Mehndi Celebration Tray",
    slug: "mehndi-celebration-tray",
    shortDescription: "Vibrant florals for mehndi celebrations — colours and styling tailored to your event.",
    fullDescription:
      "<p>Whether it is mehndi, wedding, or a special family celebration, every detail is designed to honour your heritage with elegance.</p>",
    occasionTags: ["Mehndi", "Cultural Celebrations"],
    mainImage: {
      url: "/products/mehndi-celebration-tray.jpg",
      publicId: "local/mehndi-celebration-tray",
      alt: "Mehndi celebration floral tray",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 130,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    isFeatured: false,
    isBestseller: false,
    isRiwaaz: true,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-wedding-gifting",
    name: "Wedding Gifting Tray",
    slug: "wedding-gifting-tray",
    shortDescription: "Luxury wedding gifting presentations from the Riwaaz Collection.",
    fullDescription:
      "<p>Thoughtfully designed trays and baskets for wedding celebrations — reimagined with fresh florals and refined finishing.</p>",
    occasionTags: ["Weddings", "Cultural Celebrations"],
    mainImage: {
      url: "/products/wedding-gifting-tray.jpg",
      publicId: "local/wedding-gifting-tray",
      alt: "Wedding gifting floral tray",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 145,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    isFeatured: false,
    isBestseller: false,
    isRiwaaz: true,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-heritage-bloom",
    name: "Heritage Bloom Tray",
    slug: "heritage-bloom-tray",
    shortDescription: "Celebrate culture and family traditions with a fully customized Riwaaz presentation.",
    fullDescription:
      "<p>Riwaaz means tradition — and every culture, family, and individual has traditions worth celebrating. Let us connect and create it together.</p>",
    occasionTags: ["Cultural Celebrations", "Weddings"],
    mainImage: {
      url: "/products/heritage-bloom-tray.jpg",
      publicId: "local/heritage-bloom-tray",
      alt: "Heritage bloom celebration tray",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 140,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    isFeatured: false,
    isBestseller: false,
    isRiwaaz: true,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export type DemoProductFilters = {
  occasion?: string;
  collection?: string;
  isRiwaaz?: boolean;
  search?: string;
};

function filterDemoProducts(filters: DemoProductFilters = {}): DemoProduct[] {
  let items = [...DEMO_SHOP_PRODUCTS];

  if (filters.isRiwaaz || filters.collection === "riwaaz") {
    items = items.filter((p) => p.isRiwaaz);
  }

  if (filters.occasion && filters.occasion !== "All") {
    items = items.filter((p) => p.occasionTags.includes(filters.occasion!));
  }

  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.occasionTags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return items;
}

export function getDemoShopProducts(filters?: DemoProductFilters & { page?: number; pageSize?: number }): DemoProduct[] {
  const items = filterDemoProducts(filters);
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 12;
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getDemoShopProductsTotal(filters?: DemoProductFilters): number {
  return filterDemoProducts(filters).length;
}

/** Legacy slug redirect support */
export function getDemoProductBySlug(slug: string): DemoProduct | undefined {
  if (slug === "blush-garden") {
    return DEMO_SHOP_PRODUCTS.find((p) => p.slug === "your-love-story");
  }
  return DEMO_SHOP_PRODUCTS.find((p) => p.slug === slug);
}
