import { NextRequest, NextResponse } from "next/server";
import {
  getClientIdentifier,
  rateLimit,
  createRateLimitResponse,
} from "@/lib/rate-limit";
import {
  generateUploadFilename,
  isAllowedMimeType,
  saveStoredUpload,
} from "@/lib/stored-upload";
import { UPLOAD_FOLDERS, UPLOAD_MAX_BYTES } from "@/lib/upload-constants";

export const runtime = "nodejs";

const BOOKINGS_FOLDER = UPLOAD_FOLDERS.bookings;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIdentifier(request.headers);
    const limit = rateLimit(`customize-upload:${ip}`, {
      limit: 12,
      windowMs: 60 * 60 * 1000,
    });

    if (!limit.success) {
      return createRateLimitResponse(limit.retryAfterMs ?? 60_000);
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (!isAllowedMimeType(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > UPLOAD_MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 8MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = generateUploadFilename(file.type);
    const saved = await saveStoredUpload({
      folder: BOOKINGS_FOLDER,
      filename,
      mimeType: file.type,
      data: buffer,
    });

    return NextResponse.json({
      success: true,
      url: saved.url,
      publicId: `${saved.folder}/${saved.filename}`,
      filename: saved.filename,
      folder: saved.folder,
    });
  } catch (error) {
    console.error("Customize upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
