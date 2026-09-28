import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/storefront";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const products = await searchProducts(q, 8);
  return NextResponse.json({ products });
}
