import type { MetadataRoute } from 'next';
import { hasMongoUri } from '@/lib/mongodb';
import { connectDB } from '@/lib/mongodb';
import { getSiteUrl } from '@/lib/site-url';
import { Product } from '@/models';

const SITE_URL = getSiteUrl();

const staticRoutes = [
  '',
  '/shop',
  '/riwaaz',
  '/event-florals',
  '/services',
  '/about',
  '/booking',
  '/contact',
  '/privacy',
  '/terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  if (!hasMongoUri()) {
    return staticEntries;
  }

  try {
    await connectDB();
    const products = await Product.find({ status: 'published' })
      .select('slug updatedAt')
      .lean();

    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${SITE_URL}/shop/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticEntries, ...productEntries];
  } catch {
    return staticEntries;
  }
}
