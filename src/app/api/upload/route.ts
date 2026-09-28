import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getClientIdentifier,
  rateLimit,
  createRateLimitResponse,
} from "@/lib/rate-limit";
import {
  generateUploadFilename,
  isAllowedMimeType,
  isAllowedUploadFolder,
  saveStoredUpload,
} from "@/lib/stored-upload";
import { UPLOAD_MAX_BYTES } from "@/lib/upload-constants";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ip = getClientIdentifier(request.headers);
    const limit = rateLimit(`upload:${ip}`, {
      limit: 20,
      windowMs: 60_000,
    });

    if (!limit.success) {
      return createRateLimitResponse(limit.retryAfterMs ?? 60_000);
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (typeof folder !== "string" || !isAllowedUploadFolder(folder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
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
      folder,
      filename,
      mimeType: file.type,
      data: buffer,
    });

    return NextResponse.json({
      success: true,
      url: saved.url,
      filename: saved.filename,
      size: saved.size,
      folder: saved.folder,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
