/**
 * Seed shop products from website catalog.
 *
 * Usage: npm run seed-products
 * Requires: MONGODB_URI and seed-defaults run first
 *
 * Removes published products whose slugs are not in the current catalog.
 */

import './load-env';

import { connectDB } from '../src/lib/mongodb';
import { Product, Category } from '../src/models';
import { DEMO_SHOP_PRODUCTS, WEBSITE_CATALOG_SLUGS } from '../src/lib/shop-demo-products';

async function seedProducts() {
  try {
    await connectDB();

    let created = 0;
    let updated = 0;

    const category =
      (await Category.findOne({ slug: 'floral-arrangements' })) ??
      (await Category.findOne({ isActive: true }).sort({ order: 1 }));

    if (!category) {
      console.error('No category found. Run npm run seed-defaults first.');
      process.exit(1);
    }

    for (const item of DEMO_SHOP_PRODUCTS) {
      const payload = {
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription ?? `<p>${item.shortDescription}</p>`,
        category: category._id,
        collection: undefined as undefined,
        occasionTags: item.occasionTags,
        mainImage: item.mainImage,
        gallery: [],
        priceType: item.priceType,
        basePrice: item.basePrice,
        isFeatured: item.isFeatured ?? false,
        isBestseller: item.isBestseller ?? false,
        isRiwaaz: false,
        availability: item.availability,
        status: 'published' as const,
        leadTime: '24–48 hours advance notice recommended',
        careInstructions:
          'Keep in cool water away from direct sunlight. Trim stems every 2 days.',
      };

      const existing = await Product.findOne({ slug: item.slug });
      if (existing) {
        await Product.updateOne({ slug: item.slug }, { $set: payload });
        updated++;
        console.log(`Updated: ${item.name}`);
      } else {
        await Product.create(payload);
        created++;
        console.log(`Created: ${item.name}`);
      }
    }

    const removed = await Product.deleteMany({
      slug: { $nin: WEBSITE_CATALOG_SLUGS },
    });
    console.log(`Removed ${removed.deletedCount} product(s) not in the current catalog.`);

    console.log(`\nDone. Created ${created}, updated ${updated} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed products failed:', error);
    process.exit(1);
  }
}

seedProducts();
