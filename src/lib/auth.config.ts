import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config for middleware.
 * Do not import MongoDB, Mongoose, or bcrypt here.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
