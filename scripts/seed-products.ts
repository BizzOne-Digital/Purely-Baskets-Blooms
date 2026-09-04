/**
 * Seed sample shop products for development/demo.
 *
 * Usage: npm run seed-products
 * Requires: MONGODB_URI and seed-defaults run first
 */

import { connectDB } from '../src/lib/mongodb';
import { Product, Category, Collection } from '../src/models';

type SeedProduct = {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  occasionTags: string[];
  categorySlug: string;
  collectionSlug?: string;
  imageUrl: string;
  publicId: string;
  priceType: 'fixed' | 'starting' | 'quote';
  basePrice: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isRiwaaz?: boolean;
  availability?: 'in_stock' | 'made_to_order' | 'out_of_stock';
};

const SAMPLE_PRODUCTS: SeedProduct[] = [
  {
    name: 'Blush Garden',
    slug: 'blush-garden',
    shortDescription:
      'A romantic basket of blush roses, peonies and soft eucalyptus with a satin berry ribbon.',
    fullDescription:
      '<p>Our signature blush arrangement pairs garden roses and peonies with airy eucalyptus in a woven keepsake basket — perfect for birthdays, thank-yous and just-because moments.</p>',
    occasionTags: ['Birthdays', 'Anniversaries', 'Just Because'],
    categorySlug: 'birthdays',
    imageUrl: '/products/blush-garden.jpg',
    publicId: 'local/blush-garden',
    priceType: 'starting',
    basePrice: 89,
    isFeatured: true,
    isBestseller: true,
    availability: 'in_stock',
  },
  {
    name: 'The Berry Edit',
    slug: 'the-berry-edit',
    shortDescription:
      'Deep berry tones with roses, ranunculus and orchids in a modern gift box presentation.',
    fullDescription:
      '<p>A bold, editorial arrangement in rich berry and coral hues — designed for statement gifting and milestone celebrations.</p>',
    occasionTags: ['Anniversaries', 'Congratulations'],
    categorySlug: 'anniversaries',
    imageUrl: '/products/the-berry-edit.jpg',
    publicId: 'local/the-berry-edit',
    priceType: 'starting',
    basePrice: 99,
    isFeatured: true,
    availability: 'in_stock',
  },
  {
    name: 'Ivory Elegance',
    slug: 'ivory-elegance',
    shortDescription:
      'Timeless white orchids and lilies in a refined ivory gift box with champagne accents.',
    fullDescription:
      '<p>Understated luxury for weddings, sympathy and formal occasions — crafted to order with your preferred palette.</p>',
    occasionTags: ['Weddings', 'Sympathy', 'Corporate'],
    categorySlug: 'weddings',
    imageUrl: '/products/ivory-elegance.jpg',
    publicId: 'local/ivory-elegance',
    priceType: 'starting',
    basePrice: 92,
    availability: 'made_to_order',
  },
  {
    name: 'Golden Hour Basket',
    slug: 'golden-hour-basket',
    shortDescription:
      'Peach roses, marigold accents and golden ribbon in a classic woven celebration basket.',
    fullDescription:
      '<p>Warm, sunlit tones inspired by golden hour — ideal for housewarmings, congratulations and festive gatherings.</p>',
    occasionTags: ['Congratulations', 'Just Because', 'Cultural Celebrations'],
    categorySlug: 'congratulations',
    imageUrl: '/products/golden-hour-basket.jpg',
    publicId: 'local/golden-hour-basket',
    priceType: 'starting',
    basePrice: 99,
    isFeatured: true,
    availability: 'in_stock',
  },
  {
    name: 'Champagne Rose Box',
    slug: 'champagne-rose-box',
    shortDescription: 'Soft pink roses and champagne ribbon in an elegant keepsake hat box.',
    fullDescription:
      '<p>A polished gift-box presentation with layered roses and delicate foliage — beautifully photographed and gift-ready.</p>',
    occasionTags: ['Birthdays', 'Anniversaries'],
    categorySlug: 'birthdays',
    imageUrl:
      'https://images.unsplash.com/photo-1519378058454-844c8fcbd8fb?auto=format&fit=crop&w=900&q=80',
    publicId: 'unsplash/champagne-rose',
    priceType: 'starting',
    basePrice: 85,
    availability: 'in_stock',
  },
  {
    name: 'Corporate Welcome Basket',
    slug: 'corporate-welcome-basket',
    shortDescription:
      'Premium florals with curated treats for client appreciation and office celebrations.',
    fullDescription:
      '<p>Elevated corporate gifting with customizable branding, florals and artisan treats for teams and clients across the GTA.</p>',
    occasionTags: ['Corporate'],
    categorySlug: 'corporate',
    collectionSlug: 'corporate',
    imageUrl:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80',
    publicId: 'unsplash/corporate-basket',
    priceType: 'starting',
    basePrice: 110,
    isFeatured: true,
    availability: 'made_to_order',
  },
  {
    name: 'Sympathy Comfort',
    slug: 'sympathy-comfort',
    shortDescription: 'Gentle whites and soft greens arranged with care and compassion.',
    fullDescription:
      '<p>A serene, comforting arrangement designed with sensitivity for sympathy and remembrance.</p>',
    occasionTags: ['Sympathy'],
    categorySlug: 'sympathy',
    imageUrl:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80',
    publicId: 'unsplash/sympathy',
    priceType: 'starting',
    basePrice: 78,
    availability: 'in_stock',
  },
  {
    name: 'Ritual Bloom Tray',
    slug: 'ritual-bloom-tray',
    shortDescription:
      'Marigold, rose and ivory florals styled for Roka, Mehndi and cultural celebrations.',
    fullDescription:
      '<p>From The Riwaaz Collection — a customizable floral tray presentation honouring South Asian traditions with modern elegance.</p>',
    occasionTags: ['Weddings', 'Cultural Celebrations'],
    categorySlug: 'cultural-celebrations',
    collectionSlug: 'riwaaz',
    imageUrl:
      'https://images.unsplash.com/photo-1522673607200-1d69b2e2c3b2?auto=format&fit=crop&w=900&q=80',
    publicId: 'unsplash/ritual-bloom',
    priceType: 'starting',
    basePrice: 125,
    isRiwaaz: true,
    isFeatured: true,
    availability: 'made_to_order',
  },
];

async function seedProducts() {
  try {
    await connectDB();

    let created = 0;
    let updated = 0;

    for (const item of SAMPLE_PRODUCTS) {
      const category = await Category.findOne({
        $or: [{ slug: item.categorySlug }, { name: new RegExp(item.categorySlug, 'i') }],
      });

      if (!category) {
        console.warn(`Skipping ${item.name}: category ${item.categorySlug} not found`);
        continue;
      }

      let collectionId;
      if (item.collectionSlug) {
        const collection = await Collection.findOne({ slug: item.collectionSlug });
        collectionId = collection?._id;
      }

      const payload = {
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription,
        category: category._id,
        collection: collectionId,
        occasionTags: item.occasionTags,
        mainImage: {
          url: item.imageUrl,
          publicId: item.publicId,
          alt: item.name,
        },
        gallery: [],
        priceType: item.priceType,
        basePrice: item.basePrice,
        isFeatured: item.isFeatured ?? false,
        isBestseller: item.isBestseller ?? false,
        isRiwaaz: item.isRiwaaz ?? false,
        availability: item.availability ?? 'in_stock',
        status: 'published' as const,
        leadTime: '2–3 business days',
        careInstructions: 'Keep in cool water away from direct sunlight. Trim stems every 2 days.',
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

    console.log(`\nDone. Created ${created}, updated ${updated} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed products failed:', error);
    process.exit(1);
  }
}

seedProducts();
