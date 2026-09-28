# Purely Baskets & Blooms

A complete, production-ready e-commerce and brand website for **Purely Baskets & Blooms** — bespoke florals, meaningful gifts, and culturally inspired designs for the GTA.

Built with Next.js App Router, TypeScript, Tailwind CSS, MongoDB, and a full admin portal.

## Features

### Storefront
- Editorial homepage with animations (Framer Motion, GSAP, Lenis)
- Full shop with search, filters, sorting, and pagination
- Product detail pages with options, add-ons, and gift messaging
- The Riwaaz Collection and Event Florals pages
- Multi-step booking/custom order form with Cloudinary image uploads
- Cart (Zustand + persistence) and checkout with server-validated pricing
- Optional Stripe Checkout integration
- Contact form, newsletter signup, and SEO (sitemap, robots, structured data)

### Admin Portal (`/admin`)
- Dashboard with revenue charts and order analytics
- Product CRUD with Cloudinary image management
- Order management with status updates and email resend
- Discount/coupon codes with public announcement bar support
- Booking and inquiry management
- Testimonials, gallery, categories, and collections
- Full site settings (hero, contact, tax, delivery, SEO, etc.)

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** NextAuth v5 (credentials)
- **Images:** Cloudinary
- **Email:** Nodemailer (Gmail App Password)
- **Payments:** Stripe (optional)
- **State:** Zustand (cart)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Animation:** Framer Motion, GSAP, Lenis

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Gmail account with App Password enabled

### 1. Clone and Install

```bash
cd purely-baskets-and-blooms
npm install
```

### 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `AUTH_SECRET` | Random secret for NextAuth (generate with `openssl rand -base64 32`) |
| `AUTH_URL` | `http://localhost:3000` for local dev |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password (min 8 chars) |
| `CLOUDINARY_*` | Cloudinary credentials |
| `SMTP_*` | Gmail SMTP settings |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

### 3. MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write access
3. Whitelist your IP (or `0.0.0.0/0` for development)
4. Copy the connection string to `MONGODB_URI`
5. Replace `<password>` and set the database name

### 4. Cloudinary Setup

1. Create an account at [cloudinary.com](https://cloudinary.com)
2. Copy Cloud Name, API Key, and API Secret to `.env.local`
3. Upload folders are created automatically: `products`, `hero`, `gallery`, `bookings`

### 5. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Set `SMTP_USER` to your Gmail address and `SMTP_APP_PASSWORD` to the generated password

### 6. Seed Database

After `MONGODB_URI` is set in `.env.local`:

```bash
npm run seed-defaults   # Site settings, categories, collections
npm run seed-products   # 19 shop products (website catalog)
npm run seed-admin      # Admin login from ADMIN_EMAIL / ADMIN_PASSWORD
```

Or run all three in order:

```bash
npm run seed
```

### 7. Run Development Server

```bash
npm run dev
```

- Storefront: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Optional: Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Set `STRIPE_ENABLED=true` in `.env.local`
3. Add `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. For webhooks locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

When Stripe is disabled, customers submit order requests for manual confirmation.

## Production Deployment (Vercel)

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Set `AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your production domain
5. Deploy

For Stripe webhooks in production, add endpoint: `https://yourdomain.com/api/webhooks/stripe`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run seed-admin` | Seed admin user |

## Project Structure

```
src/
├── app/
│   ├── (storefront)/     # Public pages
│   ├── admin/            # Protected admin portal
│   └── api/              # Route handlers
├── components/
│   ├── admin/            # Admin UI components
│   ├── animations/       # Motion and scroll effects
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, footer, nav
│   ├── shop/             # Product components
│   └── ui/               # Shared UI primitives
├── actions/              # Server actions
├── lib/                  # Utilities, auth, email, pricing
├── models/               # Mongoose models
├── store/                # Zustand cart store
├── types/                # TypeScript types
└── validations/          # Zod schemas
```

## Brand Colors

| Name | Hex |
|------|-----|
| Warm Ivory | `#FFF9F4` |
| Soft Blush | `#F5D6DC` |
| Dusty Rose | `#D8758F` |
| Deep Berry | `#7A2048` |
| Plum | `#481936` |
| Coral | `#F08A78` |
| Marigold Gold | `#E8AE43` |
| Champagne | `#E8CC95` |
| Botanical Green | `#31594B` |
| Deep Ink | `#241920` |

## License

Private — Purely Baskets & Blooms. All rights reserved.
