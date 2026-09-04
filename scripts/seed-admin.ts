/**
 * Seed admin user from environment variables.
 *
 * Usage:
 *   npm run seed-admin
 *
 * Required env vars:
 *   MONGODB_URI
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 */

import bcrypt from 'bcryptjs';
import { connectDB } from '../src/lib/mongodb';
import AdminUser from '../src/models/AdminUser';

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      'Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment'
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Error: ADMIN_PASSWORD must be at least 8 characters');
    process.exit(1);
  }

  try {
    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await AdminUser.findOne({ email: normalizedEmail }).select(
      '+passwordHash'
    );

    const passwordHash = await bcrypt.hash(password, 12);

    if (existing) {
      existing.passwordHash = passwordHash;
      existing.role = 'admin';
      existing.isActive = true;
      await existing.save();
      console.log(`Admin user updated: ${normalizedEmail}`);
    } else {
      await AdminUser.create({
        email: normalizedEmail,
        passwordHash,
        name: 'Admin',
        role: 'admin',
        isActive: true,
      });
      console.log(`Admin user created: ${normalizedEmail}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seedAdmin();
