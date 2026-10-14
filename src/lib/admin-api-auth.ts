import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/** Returns an error response when the caller is not an authenticated admin. */
export async function requireAdminApiAuth() {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session, error: null };
}
