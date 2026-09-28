import type { BookingInspirationImage } from "@/types";

export async function uploadCustomizeReference(
  file: File
): Promise<BookingInspirationImage> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/customize/upload", {
    method: "POST",
    body: formData,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof payload.error === "string" ? payload.error : "Upload failed"
    );
  }

  return {
    url: payload.url as string,
    publicId: payload.publicId as string,
    alt: file.name.slice(0, 120),
  };
}
