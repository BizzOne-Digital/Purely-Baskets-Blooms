"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { uploadCustomizeReference } from "@/lib/customize-upload-client";
import { UPLOAD_ACCEPT } from "@/lib/upload-constants";
import { cn } from "@/lib/utils";
import type { BookingInspirationImage } from "@/types";

const MAX_REFERENCES = 3;

type ReferenceImageUploadProps = {
  value: BookingInspirationImage[];
  onChange: (images: BookingInspirationImage[]) => void;
  error?: string;
};

export function ReferenceImageUpload({
  value,
  onChange,
  error,
}: ReferenceImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const remaining = MAX_REFERENCES - value.length;

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length || remaining <= 0) return;

    const toUpload = Array.from(files).slice(0, remaining);
    setUploading(true);

    try {
      const uploaded: BookingInspirationImage[] = [];
      for (const file of toUpload) {
        uploaded.push(await uploadCustomizeReference(file));
      }
      onChange([...value, ...uploaded]);
      toast.success(
        uploaded.length === 1
          ? "Reference uploaded"
          : `${uploaded.length} references uploaded`
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-deep-berry">
          Reference photos{" "}
          <span className="font-normal text-deep-ink/55">(optional, max {MAX_REFERENCES})</span>
        </p>
        <span className="text-xs text-deep-ink/50">
          {value.length}/{MAX_REFERENCES}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {value.map((img, index) => (
          <div
            key={`${img.publicId}-${index}`}
            className="relative h-24 w-24 overflow-hidden rounded-xl border border-deep-ink/15 bg-ivory"
          >
            <Image
              src={img.url}
              alt={img.alt ?? `Reference ${index + 1}`}
              fill
              className="object-cover"
              sizes="96px"
              unoptimized
            />
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="absolute right-1 top-1 rounded-full bg-deep-ink/70 p-1 text-white hover:bg-deep-ink"
              aria-label={`Remove reference ${index + 1}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {remaining > 0 ? (
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-deep-berry/35 bg-blush/20 text-deep-berry transition-colors hover:border-deep-berry hover:bg-blush/40",
              uploading && "pointer-events-none opacity-60"
            )}
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              {uploading ? "Uploading…" : "Add photo"}
            </span>
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={UPLOAD_ACCEPT}
        multiple={remaining > 1}
        className="hidden"
        onChange={(e) => void handleFiles(e.target.files)}
      />

      {error ? <p className="text-sm text-coral">{error}</p> : null}
    </div>
  );
}
