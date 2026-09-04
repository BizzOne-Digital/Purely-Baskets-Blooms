import type { IProduct } from "@/types";

type DemoProduct = Omit<IProduct, "_id" | "category" | "collection"> & {
  _id: string;
  category?: string;
  collection?: string;
};

const LOCAL_PRODUCT_IMAGES: Record<string, string> = {
  "blush-garden": "/products/blush-garden.jpg",
  "the-berry-edit": "/products/the-berry-edit.jpg",
  "ivory-elegance": "/products/ivory-elegance.jpg",
  "golden-hour-basket": "/products/golden-hour-basket.jpg",
  "champagne-rose-box": "/products/champagne-rose-box.jpg",
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

export const DEMO_SHOP_PRODUCTS: DemoProduct[] = [
  {
    _id: "demo-blush-garden",
    name: "Blush Garden",
    slug: "blush-garden",
    shortDescription:
      "A romantic basket of blush roses, peonies and soft eucalyptus with a satin berry ribbon.",
    fullDescription:
      "<p>Our signature blush arrangement pairs garden roses and peonies with airy eucalyptus in a woven keepsake basket — perfect for birthdays, thank-yous and just-because moments.</p>",
    occasionTags: ["Birthdays", "Anniversaries", "Just Because"],
    mainImage: {
      url: "/products/blush-garden.jpg",
      publicId: "local/blush-garden",
      alt: "Blush Garden floral gift basket",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 89,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "in_stock",
    isFeatured: true,
    isBestseller: true,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-06-01"),
  },
  {
    _id: "demo-the-berry-edit",
    name: "The Berry Edit",
    slug: "the-berry-edit",
    shortDescription:
      "Deep berry tones with roses, ranunculus and orchids in a modern gift box presentation.",
    fullDescription:
      "<p>A bold, editorial arrangement in rich berry and coral hues — designed for statement gifting and milestone celebrations.</p>",
    occasionTags: ["Anniversaries", "Congratulations"],
    mainImage: {
      url: "/products/the-berry-edit.jpg",
      publicId: "local/the-berry-edit",
      alt: "The Berry Edit luxury floral box",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 99,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "in_stock",
    isFeatured: true,
    isBestseller: false,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "demo-ivory-elegance",
    name: "Ivory Elegance",
    slug: "ivory-elegance",
    shortDescription:
      "Timeless white orchids and lilies in a refined ivory gift box with champagne accents.",
    fullDescription:
      "<p>Understated luxury for weddings, sympathy and formal occasions — crafted to order with your preferred palette.</p>",
    occasionTags: ["Weddings", "Sympathy", "Corporate"],
    mainImage: {
      url: "/products/ivory-elegance.jpg",
      publicId: "local/ivory-elegance",
      alt: "Ivory Elegance white floral hat box",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 92,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "made_to_order",
    isFeatured: false,
    isBestseller: false,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date("2025-04-01"),
    updatedAt: new Date("2025-04-01"),
  },
  {
    _id: "demo-golden-hour-basket",
    name: "Golden Hour Basket",
    slug: "golden-hour-basket",
    shortDescription:
      "Peach roses, marigold accents and golden ribbon in a classic woven celebration basket.",
    fullDescription:
      "<p>Warm, sunlit tones inspired by golden hour — ideal for housewarmings, congratulations and festive gatherings.</p>",
    occasionTags: ["Congratulations", "Just Because", "Cultural Celebrations"],
    mainImage: {
      url: "/products/golden-hour-basket.jpg",
      publicId: "local/golden-hour-basket",
      alt: "Golden Hour Basket with peach roses",
    },
    gallery: [],
    priceType: "starting",
    basePrice: 99,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "in_stock",
    isFeatured: true,
    isBestseller: false,
    isRiwaaz: false,
    status: "published",
    createdAt: new Date("2025-05-15"),
    updatedAt: new Date("2025-05-15"),
  },
];

function filterDemoProducts(occasion?: string): DemoProduct[] {
  if (!occasion || occasion === "All") return [...DEMO_SHOP_PRODUCTS];
  return DEMO_SHOP_PRODUCTS.filter((p) => p.occasionTags.includes(occasion));
}

export function getDemoShopProducts(filters?: {
  occasion?: string;
  page?: number;
  pageSize?: number;
}): DemoProduct[] {
  const items = filterDemoProducts(filters?.occasion);
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 12;
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getDemoShopProductsTotal(occasion?: string): number {
  return filterDemoProducts(occasion).length;
}
