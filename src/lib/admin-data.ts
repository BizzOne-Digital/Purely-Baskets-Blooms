import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { PAGINATION } from '@/lib/constants';
import {
  Product,
  Order,
  Coupon,
  Booking,
  ContactInquiry,
  Testimonial,
  GalleryItem,
  Category,
  Collection,
} from '@/models';
import { serialize } from '@/actions/helpers';

export async function getDashboardData() {
  await requireAdmin();
  await connectDB();

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    totalProducts,
    publishedProducts,
    totalOrders,
    pendingOrders,
    totalRevenue,
    recentOrders,
    newBookings,
    newInquiries,
    ordersByStatus,
    salesByDay,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ status: 'published' }),
    Order.countDocuments(),
    Order.countDocuments({ status: { $in: ['new', 'confirmed', 'in_preparation'] } }),
    Order.aggregate([
      { $match: { paymentStatus: { $in: ['paid', 'manual_invoice'] } } },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } },
    ]),
    Order.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .lean(),
    Booking.countDocuments({ status: 'new' }),
    ContactInquiry.countDocuments({ status: 'new' }),
    Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          paymentStatus: { $in: ['paid', 'manual_invoice'] },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          revenue: { $sum: '$pricing.total' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return serialize({
    stats: {
      totalProducts,
      publishedProducts,
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue[0]?.total ?? 0,
      newBookings,
      newInquiries,
    },
    recentOrders,
    ordersByStatus: ordersByStatus.map((s: { _id: string; count: number }) => ({
      status: s._id,
      count: s.count,
    })),
    salesByDay: salesByDay.map((s: { _id: string; revenue: number; orders: number }) => ({
      date: s._id,
      revenue: s.revenue,
      orders: s.orders,
    })),
  });
}

export async function getProducts(params?: {
  search?: string;
  status?: string;
  category?: string;
  page?: number;
}) {
  await requireAdmin();
  await connectDB();

  const page = params?.page ?? 1;
  const pageSize = PAGINATION.adminPageSize;
  const filter: Record<string, unknown> = {};

  if (params?.search) {
    filter.$or = [
      { name: { $regex: params.search, $options: 'i' } },
      { slug: { $regex: params.search, $options: 'i' } },
    ];
  }
  if (params?.status) filter.status = params.status;
  if (params?.category) filter.category = params.category;

  const [items, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name')
      .sort({ updatedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean(),
    Product.countDocuments(filter),
  ]);

  return serialize({
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

export async function getOrders(params?: {
  search?: string;
  status?: string;
  paymentStatus?: string;
  page?: number;
}) {
  await requireAdmin();
  await connectDB();

  const page = params?.page ?? 1;
  const pageSize = PAGINATION.adminPageSize;
  const filter: Record<string, unknown> = {};

  if (params?.search) {
    filter.$or = [
      { orderNumber: { $regex: params.search, $options: 'i' } },
      { customerName: { $regex: params.search, $options: 'i' } },
      { customerEmail: { $regex: params.search, $options: 'i' } },
    ];
  }
  if (params?.status) filter.status = params.status;
  if (params?.paymentStatus) filter.paymentStatus = params.paymentStatus;

  const [items, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).lean(),
    Order.countDocuments(filter),
  ]);

  return serialize({ items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
}

export async function getOrder(id: string) {
  await requireAdmin();
  await connectDB();
  const order = await Order.findById(id).lean();
  return order ? serialize(order) : null;
}

export async function getCoupons(params?: { search?: string; page?: number }) {
  await requireAdmin();
  await connectDB();

  const page = params?.page ?? 1;
  const pageSize = PAGINATION.adminPageSize;
  const filter: Record<string, unknown> = {};

  if (params?.search) {
    filter.$or = [
      { code: { $regex: params.search, $options: 'i' } },
      { description: { $regex: params.search, $options: 'i' } },
    ];
  }

  const [items, total] = await Promise.all([
    Coupon.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).lean(),
    Coupon.countDocuments(filter),
  ]);

  return serialize({ items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
}

export async function getCoupon(id: string) {
  await requireAdmin();
  await connectDB();
  const coupon = await Coupon.findById(id).lean();
  return coupon ? serialize(coupon) : null;
}

export async function getBookings(params?: { search?: string; status?: string; page?: number }) {
  await requireAdmin();
  await connectDB();

  const page = params?.page ?? 1;
  const pageSize = PAGINATION.adminPageSize;
  const filter: Record<string, unknown> = {};

  if (params?.search) {
    filter.$or = [
      { customerName: { $regex: params.search, $options: 'i' } },
      { customerEmail: { $regex: params.search, $options: 'i' } },
    ];
  }
  if (params?.status) filter.status = params.status;

  const [items, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).lean(),
    Booking.countDocuments(filter),
  ]);

  return serialize({ items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
}

export async function getInquiries(params?: { search?: string; status?: string; page?: number }) {
  await requireAdmin();
  await connectDB();

  const page = params?.page ?? 1;
  const pageSize = PAGINATION.adminPageSize;
  const filter: Record<string, unknown> = {};

  if (params?.search) {
    filter.$or = [
      { name: { $regex: params.search, $options: 'i' } },
      { email: { $regex: params.search, $options: 'i' } },
      { subject: { $regex: params.search, $options: 'i' } },
    ];
  }
  if (params?.status) filter.status = params.status;

  const [items, total] = await Promise.all([
    ContactInquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).lean(),
    ContactInquiry.countDocuments(filter),
  ]);

  return serialize({ items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
}

export async function getTestimonials() {
  await requireAdmin();
  await connectDB();
  const items = await Testimonial.find().sort({ order: 1 }).lean();
  return serialize(items);
}

export async function getGalleryItems() {
  await requireAdmin();
  await connectDB();
  const items = await GalleryItem.find().sort({ order: 1 }).lean();
  return serialize(items);
}

export async function getCategories() {
  await requireAdmin();
  await connectDB();
  const items = await Category.find().sort({ order: 1 }).lean();
  return serialize(items);
}

export async function getCollections() {
  await requireAdmin();
  await connectDB();
  const items = await Collection.find().sort({ order: 1 }).lean();
  return serialize(items);
}
