import { z } from "zod";
import { imagePathSchema } from "@/lib/image-url";
import { stripHtmlToPlainText } from "@/lib/plain-text";

const plainText = (max?: number) => {
  const base = z.string().transform(stripHtmlToPlainText).pipe(z.string().min(1));
  return max !== undefined ? base.pipe(z.string().max(max)) : base;
};

const optionalPlainText = () =>
  z
    .string()
    .optional()
    .transform((value) => (value ? stripHtmlToPlainText(value) : value));

function emptyNumberToNull(value: unknown) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  if (typeof value === "number" && Number.isNaN(value)) {
    return null;
  }
  return value;
}

const optionalPrice = z.preprocess(
  emptyNumberToNull,
  z.number().min(0).nullable().optional()
);

const optionalDate = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  return value;
}, z.coerce.date().nullable().optional());

export const productImageSchema = z.object({
  url: imagePathSchema,
  publicId: z.string().min(1, "Public ID is required"),
  alt: z.string().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  order: z.number().int().min(0).optional(),
});

export const productOptionSchema = z.object({
  name: z.string().min(1, "Option name is required"),
  values: z.array(z.string().min(1)).min(1, "At least one value is required"),
  required: z.boolean().optional(),
});

export const sizeOptionSchema = z.object({
  label: z.string().min(1, "Size label is required"),
  priceModifier: z.number().default(0),
  description: z.string().optional(),
});

export const colorPaletteOptionSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  hex: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color").optional(),
  imageUrl: z.string().url().optional(),
});

export const productAddOnSchema = z.object({
  name: z.string().min(1, "Add-on name is required"),
  price: z.number().min(0, "Price must be non-negative"),
  description: z.string().optional(),
  maxQuantity: z.number().int().min(1).optional(),
});

export const productBaseSchema = z.object({
    name: z.string().min(1, "Product name is required").max(200),
    slug: z
      .string()
      .min(1)
      .max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
    shortDescription: plainText(300),
    fullDescription: plainText(),
    category: z.string().min(1, "Category is required"),
    collection: z.string().optional(),
    occasionTags: z.array(z.string()).default([]),
    mainImage: productImageSchema,
    gallery: z.array(productImageSchema).default([]),
    priceType: z.enum(["fixed", "starting", "quote"]),
    basePrice: z.preprocess(emptyNumberToNull, z.number().min(0).optional().nullable()),
    compareAtPrice: optionalPrice,
    salePrice: optionalPrice,
    saleStartDate: optionalDate,
    saleEndDate: optionalDate,
    productOptions: z.array(productOptionSchema).default([]),
    sizeOptions: z.array(sizeOptionSchema).default([]),
    colorPaletteOptions: z.array(colorPaletteOptionSchema).default([]),
    addOns: z.array(productAddOnSchema).default([]),
    leadTime: optionalPlainText(),
    careInstructions: optionalPlainText(),
    availability: z.enum(["in_stock", "made_to_order", "out_of_stock"]),
    stockQuantity: z.preprocess(
      emptyNumberToNull,
      z.number().int().min(0).nullable().optional()
    ),
    isFeatured: z.boolean().default(false),
    isBestseller: z.boolean().default(false),
    isRiwaaz: z.boolean().default(false),
    seoTitle: z.string().max(70).optional(),
    seoDescription: z.string().max(160).optional(),
    status: z.enum(["draft", "published"]).default("draft"),
  });

export const productSchema = productBaseSchema
  .refine(
    (data) => {
      if (data.priceType !== "quote" && !data.basePrice) {
        return false;
      }
      return true;
    },
    {
      message: "Base price is required for fixed and starting price products",
      path: ["basePrice"],
    }
  )
  .refine(
    (data) => {
      if (
        data.salePrice != null &&
        data.basePrice != null &&
        data.salePrice >= data.basePrice
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Sale price must be less than base price (leave blank if not on sale)",
      path: ["salePrice"],
    }
  );

export const productUpdateSchema = productBaseSchema
  .partial()
  .refine(
    (data) => {
      if (
        data.salePrice != null &&
        data.basePrice != null &&
        data.salePrice >= data.basePrice
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Sale price must be less than base price (leave blank if not on sale)",
      path: ["salePrice"],
    }
  );

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(100),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().optional(),
  image: productImageSchema.optional(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const collectionSchema = z.object({
  name: z.string().min(1, "Collection name is required").max(100),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().optional(),
  image: productImageSchema.optional(),
  isRiwaaz: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type CollectionInput = z.infer<typeof collectionSchema>;
