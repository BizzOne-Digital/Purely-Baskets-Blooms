'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { createCollection, updateCollection, deleteCollection } from '@/actions/collections';
import { ImageUploader } from './ImageUploader';
import { ConfirmDialog } from './ConfirmDialog';
import { slugify } from '@/lib/utils';
import { CLOUDINARY_FOLDERS } from '@/lib/constants';
import type { ICollection } from '@/types';

interface CollectionsManagerProps {
  items: ICollection[];
}

export function CollectionsManager({ items }: CollectionsManagerProps) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<ICollection> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const empty = (): Partial<ICollection> => ({
    name: '',
    slug: '',
    description: '',
    order: items.length,
    isActive: true,
    isRiwaaz: false,
  });

  const handleSave = async () => {
    if (!editing?.name) {
      toast.error('Name is required');
      return;
    }
    setSaving(true);
    const payload = {
      name: editing.name,
      slug: editing.slug || slugify(editing.name),
      description: editing.description,
      image: editing.image,
      order: editing.order ?? 0,
      isActive: editing.isActive ?? true,
      isRiwaaz: editing.isRiwaaz ?? false,
    };

    const result = editing._id
      ? await updateCollection(String(editing._id), payload)
      : await createCollection(payload);

    setSaving(false);
    if (result.success) {
      toast.success(editing._id ? 'Collection updated' : 'Collection created');
      setEditing(null);
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to save');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const result = await deleteCollection(deleteId);
    setDeleteId(null);
    if (result.success) {
      toast.success('Collection deleted');
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
        Add Collection
      </button>

      <div className="overflow-hidden rounded-xl border border-[#F5D6DC]/60 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-[#FFF9F4]">
              <th className="px-4 py-3 text-xs font-semibold uppercase text-[#7A2048]">Name</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-[#7A2048]">Slug</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-[#7A2048]">Riwaaz</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-[#7A2048]">Active</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item._id)} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3 text-gray-500">{item.slug}</td>
                <td className="px-4 py-3">{item.isRiwaaz ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3">{item.isActive ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => setEditing(item)} className="mr-3 text-[#7A2048] hover:underline">Edit</button>
                  <button type="button" onClick={() => setDeleteId(String(item._id))} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-semibold">{editing._id ? 'Edit' : 'New'} Collection</h3>
            <input value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value, slug: editing.slug || slugify(e.target.value) })} placeholder="Name" className={inputClass} />
            <input value={editing.slug ?? ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="Slug" className={inputClass} />
            <textarea value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Description" rows={3} className={inputClass} />
            <input type="number" value={editing.order ?? 0} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} placeholder="Order" className={inputClass} />
            <ImageUploader value={editing.image} onChange={(img) => setEditing({ ...editing, image: img ?? undefined })} folder={CLOUDINARY_FOLDERS.products} label="Image" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.isRiwaaz ?? false} onChange={(e) => setEditing({ ...editing, isRiwaaz: e.target.checked })} />
              Riwaaz Collection
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.isActive ?? true} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
              Active
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={handleSave} disabled={saving} className="rounded-lg bg-[#7A2048] px-4 py-2 text-sm text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} title="Delete Collection" variant="danger" confirmLabel="Delete" onConfirm={handleDelete} />
    </div>
  );
}
