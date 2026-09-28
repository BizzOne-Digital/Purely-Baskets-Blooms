export const UPLOAD_FOLDERS = {
  products: "products",
  gallery: "gallery",
  pages: "pages",
  misc: "misc",
} as const;

export type UploadFolder =
  (typeof UPLOAD_FOLDERS)[keyof typeof UPLOAD_FOLDERS];

export const UPLOAD_MAX_BYTES = 8 * 1024 * 1024;

export const UPLOAD_ACCEPT =
  "image/png,image/jpeg,image/webp,image/gif,.png,.jpg,.jpeg,.webp,.gif";

export const UPLOAD_MIME_TO_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
} as const;
