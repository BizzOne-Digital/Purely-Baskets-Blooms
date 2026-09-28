import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/storefront";
import { ProductPageContent } from "@/components/shop/ProductPageContent";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const categoryId =
    typeof product.category === "object" && product.category
      ? product.category._id
      : String(product.category);

  const related = await getRelatedProducts(product._id, categoryId);

  return <ProductPageContent product={product} related={related} />;
}
