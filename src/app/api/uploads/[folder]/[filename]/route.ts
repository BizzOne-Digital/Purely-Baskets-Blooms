import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import { isSafeUploadPath } from "@/lib/image-url";
import {
  deleteStoredUpload,
  getStoredUpload,
} from "@/lib/stored-upload";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ folder: string; filename: string }>;
}

function toResponseBuffer(data: unknown): Buffer {
  if (Buffer.isBuffer(data)) {
    return data;
  }

  if (data instanceof mongoose.mongo.Binary) {
    return Buffer.from(data.buffer);
  }

  if (data instanceof Uint8Array) {
    return Buffer.from(data);
  }

  return Buffer.from(data as ArrayBuffer);
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { folder, filename } = await params;

    if (!isSafeUploadPath(folder, filename)) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const doc = await getStoredUpload(folder, filename);

    if (!doc?.data) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const body = toResponseBuffer(doc.data);

    return new NextResponse(new Uint8Array(body), {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType,
        "Content-Length": String(doc.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Stored upload fetch error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { folder, filename } = await params;

    if (!isSafeUploadPath(folder, filename)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const deleted = await deleteStoredUpload(folder, filename);

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stored upload delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
