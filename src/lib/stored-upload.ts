import { randomBytes } from "crypto";
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import {
  UPLOAD_FOLDERS,
  UPLOAD_MAX_BYTES,
  UPLOAD_MIME_TO_EXT,
  type UploadFolder,
} from "@/lib/upload-constants";
import {
  buildStoredUploadUrl,
  isSafeUploadPath,
  parseStoredUploadUrl,
} from "@/lib/image-url";

export function isAllowedUploadFolder(folder: string): folder is UploadFolder {
  return Object.values(UPLOAD_FOLDERS).includes(folder as UploadFolder);
}

export function isAllowedMimeType(mimeType: string): boolean {
  return mimeType in UPLOAD_MIME_TO_EXT;
}

export function extensionForMimeType(mimeType: string): string | null {
  return UPLOAD_MIME_TO_EXT[mimeType as keyof typeof UPLOAD_MIME_TO_EXT] ?? null;
}

export function generateUploadFilename(mimeType: string): string {
  const ext = extensionForMimeType(mimeType);

  if (!ext) {
    throw new Error("Unsupported mime type");
  }

  return `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
}

export async function saveStoredUpload(input: {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  data: Buffer;
}) {
  await connectDB();

  const doc = await StoredUpload.create({
    folder: input.folder,
    filename: input.filename,
    mimeType: input.mimeType,
    size: input.data.length,
    data: input.data,
  });

  return {
    folder: doc.folder,
    filename: doc.filename,
    mimeType: doc.mimeType,
    size: doc.size,
    url: buildStoredUploadUrl(doc.folder, doc.filename),
  };
}

export async function getStoredUpload(folder: string, filename: string) {
  if (!isSafeUploadPath(folder, filename)) {
    return null;
  }

  await connectDB();

  return StoredUpload.findOne({ folder, filename });
}

export async function deleteStoredUpload(folder: string, filename: string) {
  if (!isSafeUploadPath(folder, filename)) {
    return false;
  }

  await connectDB();

  const result = await StoredUpload.deleteOne({ folder, filename });
  return result.deletedCount > 0;
}

export async function deleteStoredUploadByUrl(url: string | null | undefined) {
  const parsed = url ? parseStoredUploadUrl(url) : null;

  if (!parsed) {
    return false;
  }

  return deleteStoredUpload(parsed.folder, parsed.filename);
}
