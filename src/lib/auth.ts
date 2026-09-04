import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import type { AdminRole } from "@/types";

declare module "next-auth" {
  interface User {
    role: AdminRole;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: AdminRole;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: AdminRole;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        await connectDB();

        const admin = await AdminUser.findOne({
          email,
          isActive: true,
        }).select("+passwordHash");

        if (!admin) {
          return null;
        }

        const isValid = await bcrypt.compare(password, admin.passwordHash);

        if (!isValid) {
          return null;
        }

        admin.lastLoginAt = new Date();
        await admin.save();

        return {
          id: String(admin._id),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as AdminRole) ?? "admin";
      }
      return session;
    },
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (!isAdminRoute) return true;
      if (isLoginPage) return true;

      return !!auth?.user;
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});

export async function getAdminSession() {
  return auth();
}

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session;
}
