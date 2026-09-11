"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { resolveImageSrc } from "@/lib/image-url";
import {
  deleteStoredUploadByUrl,
  uploadImageFile,
} from "@/lib/upload-client";
import {
  UPLOAD_ACCEPT,
  UPLOAD_FOLDERS,
  type UploadFolder,
} from "@/lib/upload-constants";

interface LocalImageFieldProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: UploadFolder;
  label?: string;
  className?: string;
}

export function LocalImageField({
  value,
  onChange,
  folder = UPLOAD_FOLDERS.misc,
  label = "Image",
  className,
}: LocalImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);

    try {
      const previousUrl = value;
      const result = await uploadImageFile(file, folder);

      if (previousUrl && previousUrl !== result.url) {
        await deleteStoredUploadByUrl(previousUrl).catch(() => undefined);
      }

      onChange(result.url);
      toast.success("Image uploaded");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload image";
      toast.error(message);
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (!value) {
      return;
    }

    setUploading(true);

    try {
      await deleteStoredUploadByUrl(value);
      onChange(null);
      toast.success("Image removed");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to remove image";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = value ? resolveImageSrc(value) : null;

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-[#241920]">{label}</label>

      {previewSrc ? (
        <div className="space-y-2">
          <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border border-[#F5D6DC]">
            <Image
              src={previewSrc}
              alt=""
              fill
              className="object-cover"
              unoptimized={previewSrc.startsWith("/api/uploads/")}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <label
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#F5D6DC] px-3 py-1.5 text-sm text-[#7A2048] transition-colors hover:border-[#D8758F]",
                uploading && "pointer-events-none opacity-50"
              )}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              Replace
              <input
                ref={inputRef}
                type="file"
                accept={UPLOAD_ACCEPT}
                className="hidden"
                disabled={uploading}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void handleUpload(file);
                  }
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => void handleRemove()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-[#F5D6DC] px-3 py-1.5 text-sm text-red-700 transition-colors hover:border-red-300 disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label
          className={cn(
            "flex h-48 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#F5D6DC] bg-[#FFF9F4] transition-colors hover:border-[#D8758F]",
            uploading && "pointer-events-none opacity-50"
          )}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-[#7A2048]" />
          ) : (
            <>
              <Upload className="h-8 w-8 text-[#7A2048]" />
              <span className="mt-2 text-sm text-gray-500">Click to upload</span>
              <span className="text-xs text-gray-400">PNG, JPG, WebP, GIF up to 8MB</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={UPLOAD_ACCEPT}
            className="hidden"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleUpload(file);
              }
            }}
          />
        </label>
      )}
    </div>
  );
}
