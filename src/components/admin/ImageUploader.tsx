'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { resolveImageSrc } from '@/lib/image-url';
import {
  deleteStoredUploadByUrl,
  uploadImageFile,
} from '@/lib/upload-client';
import {
  UPLOAD_ACCEPT,
  UPLOAD_FOLDERS,
  type UploadFolder,
} from '@/lib/upload-constants';
import type { ProductImage } from '@/types';

interface ImageUploaderProps {
  value?: ProductImage | null;
  onChange: (image: ProductImage | null) => void;
  folder?: UploadFolder;
  label?: string;
  className?: string;
  multiple?: false;
}

interface MultiImageUploaderProps {
  value?: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  folder?: UploadFolder;
  label?: string;
  className?: string;
  multiple: true;
  maxImages?: number;
}

type Props = ImageUploaderProps | MultiImageUploaderProps;

function toProductImage(
  result: { url: string; filename: string; folder: string },
  alt?: string
): ProductImage {
  return {
    url: result.url,
    publicId: `${result.folder}/${result.filename}`,
    alt,
  };
}

function useStoredImageUpload(folder: UploadFolder) {
  const [uploading, setUploading] = useState(false);

  const uploadFile = useCallback(
    async (file: File): Promise<ProductImage> => {
      const result = await uploadImageFile(file, folder);
      return toProductImage(
        result,
        file.name.replace(/\.[^.]+$/, '')
      );
    },
    [folder]
  );

  return { uploading, setUploading, uploadFile };
}

function isApiUpload(url: string) {
  return url.startsWith('/api/uploads/');
}

export function ImageUploader(props: Props) {
  const folder = props.folder ?? UPLOAD_FOLDERS.products;
  const label = props.label ?? 'Image';
  const { uploading, setUploading, uploadFile } = useStoredImageUpload(folder);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;

      setUploading(true);
      try {
        if (props.multiple) {
          const max = props.maxImages ?? 10;
          const current = props.value ?? [];
          const remaining = max - current.length;

          if (remaining <= 0) {
            toast.error(`Maximum ${max} images allowed`);
            return;
          }

          const toUpload = Array.from(files).slice(0, remaining);
          const uploaded = await Promise.all(
            toUpload.map((file) => uploadFile(file))
          );
          props.onChange([...current, ...uploaded]);
          toast.success(`${uploaded.length} image(s) uploaded`);
        } else {
          const previousUrl = props.value?.url;
          const image = await uploadFile(files[0]);

          if (previousUrl && previousUrl !== image.url) {
            await deleteStoredUploadByUrl(previousUrl).catch(() => undefined);
          }

          props.onChange(image);
          toast.success('Image uploaded');
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to upload image';
        toast.error(message);
      } finally {
        setUploading(false);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    },
    [props, setUploading, uploadFile]
  );

  const handleRemove = useCallback(
    async (url: string, onRemoved: () => void) => {
      setUploading(true);
      try {
        await deleteStoredUploadByUrl(url);
        onRemoved();
        toast.success('Image removed');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to remove image';
        toast.error(message);
      } finally {
        setUploading(false);
      }
    },
    [setUploading]
  );

  if (props.multiple) {
    const images = props.value ?? [];

    return (
      <div className={cn('space-y-3', props.className)}>
        <label className="block text-sm font-medium text-[#241920]">{label}</label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img, idx) => (
            <div key={img.publicId || img.url} className="group relative aspect-square overflow-hidden rounded-lg border border-[#F5D6DC]">
              <Image
                src={resolveImageSrc(img.url)}
                alt={img.alt ?? ''}
                fill
                className="object-cover"
                unoptimized={isApiUpload(img.url)}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() =>
                  void handleRemove(img.url, () =>
                    props.onChange(images.filter((_, i) => i !== idx))
                  )
                }
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <label
            className={cn(
              'flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#F5D6DC] bg-[#FFF9F4] transition-colors hover:border-[#D8758F]',
              uploading && 'pointer-events-none opacity-50'
            )}
          >
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-[#7A2048]" />
            ) : (
              <>
                <Upload className="h-6 w-6 text-[#7A2048]" />
                <span className="mt-1 text-xs text-gray-500">Add image</span>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept={UPLOAD_ACCEPT}
              multiple
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleFile(e.target.files)}
            />
          </label>
        </div>
      </div>
    );
  }

  const image = props.value;
  const previewSrc = image ? resolveImageSrc(image.url) : null;

  return (
    <div className={cn('space-y-2', props.className)}>
      <label className="block text-sm font-medium text-[#241920]">{label}</label>
      {previewSrc ? (
        <div className="space-y-2">
          <div className="group relative h-48 w-full max-w-xs overflow-hidden rounded-lg border border-[#F5D6DC]">
            <Image
              src={previewSrc}
              alt={image?.alt ?? ''}
              fill
              className="object-cover"
              unoptimized={image ? isApiUpload(image.url) : false}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <label
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#F5D6DC] px-3 py-1.5 text-sm text-[#7A2048] transition-colors hover:border-[#D8758F]',
                uploading && 'pointer-events-none opacity-50'
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
                onChange={(e) => handleFile(e.target.files)}
              />
            </label>
            <button
              type="button"
              disabled={uploading}
              onClick={() =>
                image &&
                void handleRemove(image.url, () => props.onChange(null))
              }
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
            'flex h-48 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#F5D6DC] bg-[#FFF9F4] transition-colors hover:border-[#D8758F]',
            uploading && 'pointer-events-none opacity-50'
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
            onChange={(e) => handleFile(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}
