import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { BRAND } from "@/lib/constants";
import {
  Product,
  Category,
  Collection,
  Coupon,
  Testimonial,
  GalleryItem,
  SiteSettings,
  Order,
} from "@/models";
import { serialize } from "@/actions/helpers";
import {
  applyLocalProductImages,
  getDemoShopProducts,
  getDemoShopProductsTotal,
  getDemoProductBySlug,
} from "@/lib/shop-demo-products";
import type {
  IProduct,
  ICategory,
  ICollection,
  ICoupon,
  ITestimonial,
  IGalleryItem,
  ISiteSettings,
  IOrder,
  PaginatedResult,
} from "@/types";

export type SerializedProduct = Omit<IProduct, "_id" | "category" | "collection"> & {
  _id: string;
  category?: SerializedCategory | string;
  collection?: SerializedCollection | string;
};

export type SerializedCategory = Omit<ICategory, "_id"> & { _id: string };
export type SerializedCollection = Omit<ICollection, "_id"> & { _id: string };
export type SerializedCoupon = Omit<ICoupon, "_id"> & { _id: string };
export type SerializedTestimonial = Omit<ITestimonial, "_id"> & { _id: string };
export type SerializedGalleryItem = Omit<IGalleryItem, "_id"> & { _id: string };
export type SerializedSiteSettings = Omit<ISiteSettings, "_id"> & { _id: string };
export type SerializedOrder = Omit<IOrder, "_id"> & { _id: string };

export interface ProductFilters {
  category?: string;
  collection?: string;
  occasion?: string;
  search?: string;
  isRiwaaz?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
}

const DEFAULT_SETTINGS: Partial<SerializedSiteSettings> = {
  siteName: BRAND.name,
  contactEmail: BRAND.email,
  phoneVisible: false,
  instagramUrl: BRAND.instagramUrl,
  deliveryAreaText: BRAND.deliveryArea,
  taxRate: 0.13,
  deliveryCharge: 15,
  minimumOrder: 0,
  stripeEnabled: false,
  heroContent: {
    eyebrow: "Custom florals · GTA delivery",
    heading: "Beautiful flowers for every occasion.",
    subheading: "Thoughtful blooms and gifts, made just for you.",
    primaryCtaLabel: "Shop Flowers →",
    primaryCtaHref: "/shop",
    secondaryCtaLabel: "Request a Custom Design",
    secondaryCtaHref: "/booking",
    trustLine: "Advance notice recommended for custom orders",
  },
  announcementBar: { enabled: false },
  footerContent: {
    tagline: BRAND.tagline,
    aboutSnippet:
      "We craft thoughtful floral arrangements and gift baskets that celebrate life's most meaningful moments.",
    copyrightText: `© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.`,
  },
  seoDefaults: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description:
      "Luxury floral arrangements, gift baskets, corporate gifting, and event florals in the GTA. Thoughtfully designed. Beautifully celebrated.",
  },
};

async function withDb<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasMongoUri()) return fallback;
  try {
    await connectDB();
    return await fn();
  } catch (error) {
    console.error("Database query failed:", error);
    return fallback;
  }
}

export async function getPublicSiteSettings(): Promise<SerializedSiteSettings> {
  return withDb(async () => {
    const settings = await SiteSettings.findOne().lean();
    if (!settings) {
      return serialize({ ...DEFAULT_SETTINGS, _id: "default" }) as SerializedSiteSettings;
    }
    return serialize(settings) as SerializedSiteSettings;
  }, serialize({ ...DEFAULT_SETTINGS, _id: "default" }) as SerializedSiteSettings);
}

export async function getPublicCoupons(): Promise<SerializedCoupon[]> {
  return withDb(async () => {
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      isPublic: true,
      displayOnWebsite: true,
      startDate: { $lte: now },
      expiryDate: { $gte: now },
    })
      .sort({ createdAt: -1 })
      .lean();
    return serialize(coupons) as SerializedCoupon[];
  }, []);
}

export async function getActiveCategories(): Promise<SerializedCategory[]> {
  return withDb(async () => {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 }).lean();
    return serialize(categories) as SerializedCategory[];
  }, []);
}

export async function getActiveCollections(): Promise<SerializedCollection[]> {
  return withDb(async () => {
    const collections = await Collection.find({ isActive: true }).sort({ order: 1 }).lean();
    return serialize(collections) as SerializedCollection[];
  }, []);
}

function buildProductSort(sort?: string): Record<string, 1 | -1> {
  switch (sort) {
    case "newest":
      return { createdAt: -1 };
    case "price_asc":
      return { basePrice: 1 };
    case "price_desc":
      return { basePrice: -1 };
    case "name_asc":
      return { name: 1 };
    case "bestseller":
      return { isBestseller: -1, createdAt: -1 };
    case "featured":
    default:
      return { isFeatured: -1, isBestseller: -1, createdAt: -1 };
  }
}

function buildDemoProductResult(
  filters: ProductFilters = {}
): PaginatedResult<SerializedProduct> {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 12;
  const demoFilters = {
    occasion: filters.occasion,
    collection: filters.collection,
    isRiwaaz: filters.isRiwaaz,
    search: filters.search,
    page,
    pageSize,
  };
  const total = getDemoShopProductsTotal(demoFilters);
  const items = applyLocalProductImages(
    getDemoShopProducts(demoFilters) as SerializedProduct[]
  );

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    hasMore: page * pageSize < total,
  };
}

export async function getPublicProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResult<SerializedProduct>> {
  if (!hasMongoUri()) {
    return buildDemoProductResult(filters);
  }

  return withDb(async () => {

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 12;
  const skip = (page - 1) * pageSize;

  const query: Record<string, unknown> = { status: "published" };

  if (filters.isRiwaaz) query.isRiwaaz = true;
  if (filters.isFeatured) query.isFeatured = true;
  if (filters.isBestseller) query.isBestseller = true;
  if (filters.occasion) query.occasionTags = filters.occasion;
  if (filters.search) {
    query.$text = { $search: filters.search };
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.basePrice = {};
    if (filters.minPrice !== undefined) {
      (query.basePrice as Record<string, number>).$gte = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      (query.basePrice as Record<string, number>).$lte = filters.maxPrice;
    }
  }

  if (filters.category) {
    const cat = await Category.findOne({
      $or: [{ slug: filters.category }, { _id: filters.category }],
    }).lean();
    if (cat) query.category = cat._id;
  }

  if (filters.collection) {
    const col = await Collection.findOne({
      $or: [{ slug: filters.collection }, { _id: filters.collection }],
    }).lean();
    if (col) query.collection = col._id;
  }

  const [items, total] = await Promise.all([
    Product.find(query)
      .populate("category", "name slug")
      .populate("collection", "name slug isRiwaaz")
      .sort(buildProductSort(filters.sort))
      .skip(skip)
      .limit(pageSize)
      .lean(),
    Product.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  const serialized = applyLocalProductImages(
    serialize(items) as SerializedProduct[]
  );

  if (serialized.length === 0 && !filters.isRiwaaz && !filters.isFeatured && !filters.isBestseller) {
    return buildDemoProductResult(filters);
  }

  return {
    items: serialized,
    total,
    page,
    pageSize,
    totalPages,
    hasMore: page < totalPages,
  };
  }, buildDemoProductResult(filters));
}

export async function getProductBySlug(slug: string): Promise<SerializedProduct | null> {
  return withDb(async () => {
    const product = await Product.findOne({ slug, status: "published" })
      .populate("category", "name slug")
      .populate("collection", "name slug isRiwaaz")
      .lean();
    if (!product) {
      const demo = getDemoProductBySlug(slug) ?? getDemoShopProducts().find((p) => p.slug === slug);
      return demo ? (applyLocalProductImages([demo as SerializedProduct])[0] ?? null) : null;
    }
    const serialized = applyLocalProductImages([
      serialize(product) as SerializedProduct,
    ]);
    return serialized[0] ?? null;
  }, (() => {
    const demo = getDemoProductBySlug(slug) ?? getDemoShopProducts().find((p) => p.slug === slug);
    if (!demo) return null;
    return applyLocalProductImages([demo as SerializedProduct])[0] ?? null;
  })());
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit = 4
): Promise<SerializedProduct[]> {
  return withDb(async () => {
    const products = await Product.find({
      status: "published",
      _id: { $ne: productId },
      category: categoryId,
    })
      .sort({ isFeatured: -1, isBestseller: -1 })
      .limit(limit)
      .lean();
    return serialize(products) as SerializedProduct[];
  }, []);
}

export async function getFeaturedProducts(limit = 8): Promise<SerializedProduct[]> {
  const result = await getPublicProducts({ isFeatured: true, pageSize: limit });
  if (result.items.length > 0) return result.items;
  const fallback = await getPublicProducts({ pageSize: limit, sort: "bestseller" });
  return fallback.items;
}

export async function getRiwaazProducts(limit = 12): Promise<SerializedProduct[]> {
  const result = await getPublicProducts({ isRiwaaz: true, pageSize: limit });
  return result.items;
}

export async function getFeaturedTestimonials(): Promise<SerializedTestimonial[]> {
  return withDb(async () => {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ isFeatured: -1, order: 1 })
      .limit(6)
      .lean();
    return serialize(testimonials) as SerializedTestimonial[];
  }, []);
}

export async function getGalleryItems(limit = 12): Promise<SerializedGalleryItem[]> {
  return withDb(async () => {
    const items = await GalleryItem.find({ isActive: true }).sort({ order: 1 }).limit(limit).lean();
    return serialize(items) as SerializedGalleryItem[];
  }, []);
}

export async function getOrderByNumber(orderNumber: string): Promise<SerializedOrder | null> {
  return withDb(async () => {
    const order = await Order.findOne({ orderNumber }).lean();
    if (!order) return null;
    return serialize(order) as SerializedOrder;
  }, null);
}

export async function searchProducts(query: string, limit = 8): Promise<SerializedProduct[]> {
  return withDb(async () => {
    if (!query.trim()) return [];
    const products = await Product.find(
      { status: "published", $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(limit)
      .lean();
    return serialize(products) as SerializedProduct[];
  }, []);
}
