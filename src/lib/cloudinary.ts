import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_FOLDERS = {
  products: "pbb/products",
  hero: "pbb/hero",
  gallery: "pbb/gallery",
  bookings: "pbb/bookings",
  settings: "pbb/settings",
  testimonials: "pbb/testimonials",
} as const;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && apiKey && apiSecret);
}

export function configureCloudinary(): void {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  alt?: string;
  tags?: string[];
  transformation?: Record<string, unknown>;
}

export async function uploadImage(
  file: string | Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  configureCloudinary();

  const folder = options.folder ?? CLOUDINARY_FOLDERS.products;

  const result = await cloudinary.uploader.upload(
    typeof file === "string" ? file : `data:image/jpeg;base64,${file.toString("base64")}`,
    {
      folder,
      public_id: options.publicId,
      tags: options.tags,
      resource_type: "image",
      overwrite: false,
      ...(options.transformation ? { transformation: options.transformation } : {}),
    }
  );

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function uploadFromBase64(
  base64Data: string,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  configureCloudinary();

  const dataUri = base64Data.startsWith("data:")
    ? base64Data
    : `data:image/jpeg;base64,${base64Data}`;

  const folder = options.folder ?? CLOUDINARY_FOLDERS.products;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    public_id: options.publicId,
    tags: options.tags,
    resource_type: "image",
    overwrite: false,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  configureCloudinary();
  await cloudinary.uploader.destroy(publicId);
}

export function getSignedUploadParams(folder?: string): {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
} {
  configureCloudinary();

  const timestamp = Math.round(Date.now() / 1000);
  const uploadFolder = folder ?? CLOUDINARY_FOLDERS.products;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: uploadFolder,
    },
    apiSecret!
  );

  return {
    signature,
    timestamp,
    apiKey: apiKey!,
    cloudName: cloudName!,
    folder: uploadFolder,
  };
}

export function buildOptimizedImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
  }
): string {
  configureCloudinary();

  const transformations: Record<string, string | number> = {
    fetch_format: "auto",
    quality: options?.quality ?? "auto",
  };

  if (options?.width) transformations.width = options.width;
  if (options?.height) transformations.height = options.height;
  if (options?.crop) transformations.crop = options.crop;

  return cloudinary.url(publicId, {
    secure: true,
    transformation: [transformations],
  });
}

export { CLOUDINARY_FOLDERS };

/** @alias getSignedUploadParams */
export const generateUploadSignature = getSignedUploadParams;
