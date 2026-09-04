'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { ProductImage } from '@/types';

interface ImageUploaderProps {
  value?: ProductImage | null;
  onChange: (image: ProductImage | null) => void;
  folder?: string;
  label?: string;
  className?: string;
  multiple?: false;
}

interface MultiImageUploaderProps {
  value?: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  folder?: string;
  label?: string;
  className?: string;
  multiple: true;
  maxImages?: number;
}

type Props = ImageUploaderProps | MultiImageUploaderProps;

async function uploadToCloudinary(file: File, folder?: string): Promise<ProductImage> {
  const sigRes = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  });

  if (!sigRes.ok) {
    throw new Error('Failed to get upload signature');
  }

  const { signature, timestamp, apiKey, cloudName, folder: uploadFolder } =
    await sigRes.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('folder', uploadFolder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!uploadRes.ok) {
    throw new Error('Upload failed');
  }

  const result = await uploadRes.json();

  return {
    url: result.secure_url,
    publicId: result.public_id,
    alt: file.name.replace(/\.[^.]+$/, ''),
    width: result.width,
    height: result.height,
  };
}

export function ImageUploader(props: Props) {
  const [uploading, setUploading] = useState(false);
  const folder = props.folder ?? 'pbb/products';
  const label = props.label ?? 'Image';

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
            toUpload.map((f) => uploadToCloudinary(f, folder))
          );
          props.onChange([...current, ...uploaded]);
          toast.success(`${uploaded.length} image(s) uploaded`);
        } else {
          const image = await uploadToCloudinary(files[0], folder);
          props.onChange(image);
          toast.success('Image uploaded');
        }
      } catch {
        toast.error('Failed to upload image');
      } finally {
        setUploading(false);
      }
    },
    [props, folder]
  );

  if (props.multiple) {
    const images = props.value ?? [];

    return (
      <div className={cn('space-y-3', props.className)}>
        <label className="block text-sm font-medium text-[#241920]">{label}</label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img, idx) => (
            <div key={img.publicId} className="group relative aspect-square overflow-hidden rounded-lg border border-[#F5D6DC]">
              <Image src={img.url} alt={img.alt ?? ''} fill className="object-cover" />
              <button
                type="button"
                onClick={() => props.onChange(images.filter((_, i) => i !== idx))}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
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
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFile(e.target.files)}
            />
          </label>
        </div>
      </div>
    );
  }

  const image = props.value;

  return (
    <div className={cn('space-y-2', props.className)}>
      <label className="block text-sm font-medium text-[#241920]">{label}</label>
      {image ? (
        <div className="group relative h-48 w-full max-w-xs overflow-hidden rounded-lg border border-[#F5D6DC]">
          <Image src={image.url} alt={image.alt ?? ''} fill className="object-cover" />
          <button
            type="button"
            onClick={() => props.onChange(null)}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
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
              <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}
