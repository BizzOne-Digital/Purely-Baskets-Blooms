/**
 * Seed default site settings, categories, and collections.
 *
 * Usage: npx tsx scripts/seed-defaults.ts
 */

import { connectDB } from '../src/lib/mongodb';
import { SiteSettings, Category, Collection } from '../src/models';
import { OCCASIONS } from '../src/lib/constants';

async function seedDefaults() {
  try {
    await connectDB();

    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create({
        siteName: 'Purely Baskets & Blooms',
        contactEmail: 'info@purelybasketsandblooms.com',
        phoneNumber: '905-955-7890',
        phoneVisible: false,
        instagramUrl: 'https://instagram.com/purelybasketsandblooms',
        deliveryAreaText: 'GTA and surrounding cities',
        announcementBar: { enabled: false },
        heroContent: {
          eyebrow: 'Bespoke Florals • Meaningful Gifts • Beautiful Celebrations',
          heading: 'Thoughtfully Designed.\nBeautifully Celebrated.',
          subheading:
            'Custom florals, elevated gifting and culturally inspired designs created with care for life\'s most meaningful moments.',
          primaryCtaLabel: 'Shop the Collection',
          primaryCtaHref: '/shop',
          secondaryCtaLabel: 'Create a Custom Order',
          secondaryCtaHref: '/booking',
          trustLine: 'Advance orders • Personalized designs • Delivery across the GTA',
        },
        taxRate: 0.13,
        deliveryCharge: 15,
        minimumOrder: 0,
        stripeEnabled: false,
        seoDefaults: {
          title: 'Purely Baskets & Blooms | Thoughtfully Designed. Beautifully Celebrated.',
          description:
            'Custom florals, elevated gifting and culturally inspired designs for weddings, corporate events, and celebrations across the GTA.',
        },
        footerContent: {
          tagline: 'Thoughtfully designed. Beautifully celebrated.',
          aboutSnippet:
            'Bespoke florals, meaningful gifts, and culturally inspired designs for life\'s most meaningful moments.',
        },
      });
      console.log('Site settings created');
    } else {
      console.log('Site settings already exist');
    }

    for (const occasion of OCCASIONS) {
      const slug = occasion.toLowerCase().replace(/\s+/g, '-');
      await Category.findOneAndUpdate(
        { slug },
        { name: occasion, slug, isActive: true },
        { upsert: true, new: true }
      );
    }
    console.log('Categories seeded');

    const collections = [
      { name: 'The Riwaaz Collection', slug: 'riwaaz', description: 'South Asian inspired floral presentations' },
      { name: 'Everyday Blooms', slug: 'everyday-blooms', description: 'Beautiful arrangements for any occasion' },
      { name: 'Corporate Gifting', slug: 'corporate', description: 'Elevated gifts for business clients' },
    ];

    for (const col of collections) {
      await Collection.findOneAndUpdate({ slug: col.slug }, { ...col, isActive: true }, { upsert: true });
    }
    console.log('Collections seeded');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seedDefaults();
