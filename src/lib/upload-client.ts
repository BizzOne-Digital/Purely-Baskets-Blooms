import type { UploadFolder } from "@/lib/upload-constants";

export interface UploadResponse {
  success: true;
  url: string;
  filename: string;
  size: number;
  folder: UploadFolder;
}

export async function uploadImageFile(
  file: File,
  folder: UploadFolder
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof payload.error === "string" ? payload.error : "Upload failed"
    );
  }

  return payload as UploadResponse;
}

export async function deleteStoredUploadByUrl(
  url: string | null | undefined
): Promise<void> {
  if (!url?.startsWith("/api/uploads/")) {
    return;
  }

  const path = url.replace(/^\/api\/uploads\//, "");
  const response = await fetch(`/api/uploads/${path}`, {
    method: "DELETE",
  });

  if (!response.ok && response.status !== 404) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(
      typeof payload.error === "string" ? payload.error : "Delete failed"
    );
  }
}
