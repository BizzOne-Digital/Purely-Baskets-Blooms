'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/actions/gallery';
import { ImageUploader } from './ImageUploader';
import { ConfirmDialog } from './ConfirmDialog';
import { CLOUDINARY_FOLDERS } from '@/lib/constants';
import type { IGalleryItem } from '@/types';

interface GalleryManagerProps {
  items: IGalleryItem[];
}

export function GalleryManager({ items }: GalleryManagerProps) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<IGalleryItem> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const empty = (): Partial<IGalleryItem> => ({
    title: '',
    caption: '',
    category: '',
    isActive: true,
    order: items.length,
  });

  const handleSave = async () => {
    if (!editing?.image) {
      toast.error('Image is required');
      return;
    }
    setSaving(true);
    const payload = {
      title: editing.title,
      caption: editing.caption,
      category: editing.category,
      image: editing.image,
      isActive: editing.isActive ?? true,
      order: editing.order ?? 0,
    };

    const result = editing._id
      ? await updateGalleryItem(String(editing._id), payload)
      : await createGalleryItem(payload);

    setSaving(false);
    if (result.success) {
      toast.success(editing._id ? 'Gallery item updated' : 'Gallery item created');
      setEditing(null);
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to save');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const result = await deleteGalleryItem(deleteId);
    setDeleteId(null);
    if (result.success) {
      toast.success('Gallery item deleted');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to delete');
    }
  };

  const inputClass = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm';

  return (
    <div className="space-y-6">
      <button type="button" onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white">
        <Plus className="h-4 w-4" />
        Add Image
      </button>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={String(item._id)} className="group relative overflow-hidden rounded-xl border border-[#F5D6DC]/60 bg-white">
            <div className="relative aspect-square">
              <Image src={item.image.url} alt={item.title ?? ''} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="font-medium text-sm text-[#241920]">{item.title || 'Untitled'}</p>
              {item.caption && <p className="text-xs text-gray-500 line-clamp-2">{item.caption}</p>}
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => setEditing(item)} className="text-xs text-[#7A2048] hover:underline">Edit</button>
                <button type="button" onClick={() => setDeleteId(String(item._id))} className="text-xs text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-semibold">{editing._id ? 'Edit' : 'New'} Gallery Item</h3>
            <ImageUploader
              value={editing.image}
              onChange={(img) => setEditing({ ...editing, image: img! })}
              folder={CLOUDINARY_FOLDERS.gallery}
              label="Image *"
            />
            <input value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Title" className={inputClass} />
            <textarea value={editing.caption ?? ''} onChange={(e) => setEditing({ ...editing, caption: e.target.value })} placeholder="Caption" rows={2} className={inputClass} />
            <input value={editing.category ?? ''} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="Category" className={inputClass} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.isActive ?? true} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
              Active
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={handleSave} disabled={saving} className="rounded-lg bg-[#7A2048] px-4 py-2 text-sm text-white disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} title="Delete Gallery Item" variant="danger" confirmLabel="Delete" onConfirm={handleDelete} />
    </div>
  );
}
