import type { IProduct } from "@/types";

type DemoProduct = Omit<IProduct, "_id" | "category" | "collection"> & {
  _id: string;
  category?: string;
  collection?: string;
};

/** Product photos (slug → path under public/products). */
const LOCAL_PRODUCT_IMAGES: Record<string, string> = {
  "roses-are-red": "/products/roses-are-red.jpg",
  "luxury-rose-box": "/products/luxury-rose-box.jpg",
  "romance-me": "/products/romance-me.jpg",
  "crimson-ivory-embrace": "/products/crimson-ivory-embrace.jpg",
  "blushing-romance": "/products/blushing-romance.jpg",
  "sweetheart-indulgence-heart-box": "/products/sweetheart-indulgence-heart-box.jpg",
  "azure-elegance": "/products/azure-elegance.jpg",
  "eclipse-of-thorns-bouquet": "/products/eclipse-of-thorns-bouquet.jpg",
  "crimson-embrace": "/products/crimson-embrace.jpg",
  "sweet-and-blooms": "/products/sweet-and-blooms.jpg",
  "the-signature-rose-box": "/products/the-signature-rose-box.jpg",
  "pink-whisper": "/products/pink-whisper.jpg",
  "forever-yours": "/products/forever-yours.jpg",
  "petal-keepsake-rose-box": "/products/petal-keepsake-rose-box.jpg",
  "pure-elegance-lily-bouquet": "/products/pure-elegance-lily-bouquet.jpg",
  "spring-harmony": "/products/spring-harmony.jpg",
  "golden-radiance": "/products/golden-radiance.jpg",
  "lily-luxe": "/products/lily-luxe.jpg",
  "radiant-tulip-symphony": "/products/radiant-tulip-symphony.jpg",
  "bangle-flower-bouquet": "/products/bangle-flower-bouquet.jpg",
  "petals-of-affection": "/products/petals-of-affection.jpg",
  "elegant-harmony": "/products/elegant-harmony.jpg",
  "pink-lily-haven": "/products/pink-lily-haven.jpg",
};

const PLACEHOLDER_DETAIL =
  "A beautiful arrangement from our collection. Contact us for seasonal bloom availability and delivery details.";

type CatalogRow = {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  basePrice: number;
  occasionTags: string[];
  isFeatured?: boolean;
  isRiwaaz?: boolean;
};

const CATALOG: CatalogRow[] = [
  {
    name: "Bangle Flower Bouquet",
    slug: "bangle-flower-bouquet",
    shortDescription:
      "A ceremonial bangle bouquet with pink roses, marigolds, and baby's breath — wrapped with our signature touch.",
    fullDescription:
      "<p>Traditional bangles nestled in fresh florals, perfect for mehndi, roka, and family celebrations. Fully customizable to your colours and vision.</p>",
    basePrice: 165,
    occasionTags: ["Cultural Celebrations", "Mehndi", "Weddings", "Just Because"],
    isFeatured: true,
    isRiwaaz: true,
  },
  {
    name: "Petals of Affection",
    slug: "petals-of-affection",
    shortDescription:
      "Soft cream roses and blush carnations wrapped in pale pink paper with a gold-trimmed bow.",
    fullDescription:
      "<p>A romantic hand-tied bouquet of cream roses and blush carnations — ideal for anniversaries, birthdays, or simply showing you care.</p>",
    basePrice: 145,
    occasionTags: ["Anniversaries", "Birthdays", "Just Because"],
    isFeatured: true,
  },
  {
    name: "Elegant Harmony",
    slug: "elegant-harmony",
    shortDescription:
      "White orchids, lilies, and peach spray roses in an elegant wrapped bouquet.",
    fullDescription:
      "<p>White orchids and lilies with peach spray roses and greenery — a refined gift for any occasion.</p>",
    basePrice: 180,
    occasionTags: ["Anniversaries", "Congratulations", "Just Because"],
    isFeatured: true,
  },
  {
    name: "Pink Lily Haven",
    slug: "pink-lily-haven",
    shortDescription:
      "Pink spray roses and lily buds in a clear vase with satin ribbon accents.",
    fullDescription:
      "<p>Pink spray roses and lily buds arranged in a clear vase — a fresh celebration of colour and light.</p>",
    basePrice: 140,
    occasionTags: ["Birthdays", "Just Because", "Congratulations"],
    isFeatured: true,
  },
  {
    name: "Roses Are Red",
    slug: "roses-are-red",
    shortDescription: "One dozen red roses arranged in a clear glass vase.",
    fullDescription:
      "<p>One dozen red roses arranged in a clear glass vase — a classic gesture for anniversaries, birthdays, and romantic occasions.</p>",
    basePrice: 130,
    occasionTags: ["Anniversaries", "Birthdays", "Just Because"],
    isFeatured: true,
  },
  {
    name: "Luxury Rose Box",
    slug: "luxury-rose-box",
    shortDescription: PLACEHOLDER_DETAIL,
    basePrice: 140,
    occasionTags: ["Anniversaries", "Just Because"],
  },
  {
    name: "Romance Me",
    slug: "romance-me",
    shortDescription:
      "A hand-tied romantic bouquet of red and pink blooms with seasonal flowers and greenery.",
    fullDescription:
      "<p>Red and pink blooms with seasonal flowers and greenery in a hand-tied romantic bouquet.</p>",
    basePrice: 108.99,
    occasionTags: ["Anniversaries", "Just Because"],
    isFeatured: true,
  },
  {
    name: "Crimson & Ivory Embrace",
    slug: "crimson-ivory-embrace",
    shortDescription:
      "Hand-tied bouquet of red roses and ivory blooms with eucalyptus and seasonal greenery.",
    fullDescription:
      "<p>Red roses and ivory blooms in a hand-tied bouquet, finished with eucalyptus and seasonal greenery.</p>",
    basePrice: 139,
    occasionTags: ["Anniversaries", "Weddings"],
  },
  {
    name: "Blushing Romance",
    slug: "blushing-romance",
    shortDescription: PLACEHOLDER_DETAIL,
    basePrice: 129.99,
    occasionTags: ["Anniversaries", "Birthdays"],
  },
  {
    name: "Sweetheart Indulgence Heart Box",
    slug: "sweetheart-indulgence-heart-box",
    shortDescription: "Pink roses and Ferrero Rocher chocolates in a heart-shaped box.",
    fullDescription:
      "<p>Pink roses paired with Ferrero Rocher chocolates, presented in a heart-shaped gift box.</p>",
    basePrice: 135,
    occasionTags: ["Anniversaries", "Birthdays"],
    isFeatured: true,
  },
  {
    name: "Azure Elegance",
    slug: "azure-elegance",
    shortDescription: PLACEHOLDER_DETAIL,
    basePrice: 160,
    occasionTags: ["Just Because", "Congratulations"],
  },
  {
    name: "Eclipse of Thorns Bouquet",
    slug: "eclipse-of-thorns-bouquet",
    shortDescription: "A large, dramatic bouquet of three dozen black roses.",
    fullDescription:
      "<p>Three dozen black roses in a bold, dramatic bouquet for a striking statement.</p>",
    basePrice: 275,
    occasionTags: ["Just Because", "Congratulations"],
  },
  {
    name: "Crimson Embrace",
    slug: "crimson-embrace",
    shortDescription: PLACEHOLDER_DETAIL,
    basePrice: 175,
    occasionTags: ["Anniversaries"],
  },
  {
    name: "Sweet & Blooms",
    slug: "sweet-and-blooms",
    shortDescription: PLACEHOLDER_DETAIL,
    basePrice: 140,
    occasionTags: ["Birthdays", "Just Because"],
  },
  {
    name: "The Signature Rose Box",
    slug: "the-signature-rose-box",
    shortDescription: "Premium red roses arranged in an elegant round gift box.",
    fullDescription:
      "<p>Premium red roses styled in an elegant round box — perfect for gifting.</p>",
    basePrice: 150,
    occasionTags: ["Anniversaries", "Just Because"],
    isFeatured: true,
  },
  {
    name: "Pink Whisper",
    slug: "pink-whisper",
    shortDescription:
      "Two dozen baby pink roses with greenery in a clear vase. Preferred delivery date confirmed by phone.",
    fullDescription:
      "<p>Two dozen baby pink roses with greenery in a clear vase. Preferred delivery date is confirmed with you by phone when you order.</p>",
    basePrice: 150,
    occasionTags: ["Birthdays", "Anniversaries"],
  },
  {
    name: "Forever Yours",
    slug: "forever-yours",
    shortDescription:
      "One dozen red roses in a wrapped bouquet with greenery and red accents.",
    fullDescription:
      "<p>One dozen red roses in a wrapped bouquet with greenery and red accents.</p>",
    basePrice: 99.99,
    occasionTags: ["Anniversaries", "Just Because"],
    isFeatured: true,
  },
  {
    name: "Petal Keepsake Rose Box",
    slug: "petal-keepsake-rose-box",
    shortDescription: PLACEHOLDER_DETAIL,
    basePrice: 120,
    occasionTags: ["Anniversaries", "Birthdays"],
  },
  {
    name: "Pure Elegance Lily Bouquet",
    slug: "pure-elegance-lily-bouquet",
    shortDescription: "Fresh white lilies and green foliage in a bouquet.",
    fullDescription: "<p>Fresh white lilies with green foliage in an elegant bouquet.</p>",
    basePrice: 90,
    occasionTags: ["Sympathy", "Just Because"],
  },
  {
    name: "Spring Harmony",
    slug: "spring-harmony",
    shortDescription:
      "Hand-tied bouquet of blush tulips, freesias, white blooms, and seasonal greenery.",
    fullDescription:
      "<p>Blush tulips, freesias, white blooms, and seasonal greenery in a hand-tied bouquet.</p>",
    basePrice: 110,
    occasionTags: ["Birthdays", "Just Because"],
  },
  {
    name: "Golden Radiance",
    slug: "golden-radiance",
    shortDescription: "Bright hand-tied bouquet of yellow daffodils.",
    fullDescription: "<p>Yellow daffodils in a bright, cheerful hand-tied bouquet.</p>",
    basePrice: 78,
    occasionTags: ["Birthdays", "Just Because"],
  },
  {
    name: "Lily Luxe",
    slug: "lily-luxe",
    shortDescription: "White lilies and seasonal greenery with a soft ribbon detail.",
    fullDescription:
      "<p>White lilies and seasonal greenery, finished with a soft ribbon detail.</p>",
    basePrice: 98,
    occasionTags: ["Sympathy", "Just Because"],
  },
  {
    name: "Radiant Tulip Symphony",
    slug: "radiant-tulip-symphony",
    shortDescription: "Red, yellow, and pink tulips arranged in a clear glass vase.",
    fullDescription:
      "<p>Red, yellow, and pink tulips arranged in a clear glass vase.</p>",
    basePrice: 78,
    occasionTags: ["Birthdays", "Just Because"],
  },
];

function toDemoProduct(row: CatalogRow, index: number): DemoProduct {
  const imagePath = LOCAL_PRODUCT_IMAGES[row.slug] ?? "/products/the-berry-edit.jpg";
  const full =
    row.fullDescription ??
    `<p>${row.shortDescription}</p><p>Every arrangement can be customized — share your vision and we will bring it to life.</p>`;

  return {
    _id: `demo-${row.slug}`,
    name: row.name,
    slug: row.slug,
    shortDescription: row.shortDescription,
    fullDescription: full,
    occasionTags: row.occasionTags,
    mainImage: {
      url: imagePath,
      publicId: `local/${row.slug}`,
      alt: row.name,
    },
    gallery: [],
    priceType: "fixed",
    basePrice: row.basePrice,
    productOptions: [],
    sizeOptions: [],
    colorPaletteOptions: [],
    addOns: [],
    availability: "in_stock",
    isFeatured: row.isFeatured ?? index < 4,
    isBestseller: index < 3,
    isRiwaaz: row.isRiwaaz ?? false,
    status: "published",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };
}

export const DEMO_SHOP_PRODUCTS: DemoProduct[] = CATALOG.map(toDemoProduct);

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

export function getDemoShopProducts(
  filters?: DemoProductFilters & { page?: number; pageSize?: number }
): DemoProduct[] {
  const items = filterDemoProducts(filters);
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 12;
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getDemoShopProductsTotal(filters?: DemoProductFilters): number {
  return filterDemoProducts(filters).length;
}

export function getDemoProductBySlug(slug: string): DemoProduct | undefined {
  return DEMO_SHOP_PRODUCTS.find((p) => p.slug === slug);
}

/** Slugs for MongoDB seed — keep in sync with demo catalog */
export const WEBSITE_CATALOG_SLUGS = CATALOG.map((p) => p.slug);

export { CATALOG as WEBSITE_PRODUCT_CATALOG };
