'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Star } from 'lucide-react';
import { toast } from 'sonner';
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/actions/testimonials';
import { ImageUploader } from './ImageUploader';
import { ConfirmDialog } from './ConfirmDialog';
import { CLOUDINARY_FOLDERS } from '@/lib/constants';
import type { ITestimonial } from '@/types';

interface TestimonialsManagerProps {
  items: ITestimonial[];
}

export function TestimonialsManager({ items }: TestimonialsManagerProps) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<ITestimonial> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const empty = (): Partial<ITestimonial> => ({
    name: '',
    content: '',
    role: '',
    rating: 5,
    isFeatured: false,
    isActive: true,
    order: items.length,
  });

  const handleSave = async () => {
    if (!editing?.name || !editing.content) {
      toast.error('Name and content are required');
      return;
    }
    setSaving(true);
    const payload = {
      name: editing.name,
      content: editing.content,
      role: editing.role,
      rating: editing.rating,
      image: editing.image,
      isFeatured: editing.isFeatured ?? false,
      isActive: editing.isActive ?? true,
      order: editing.order ?? 0,
    };

    const result = editing._id
      ? await updateTestimonial(String(editing._id), payload)
      : await createTestimonial(payload);

    setSaving(false);
    if (result.success) {
      toast.success(editing._id ? 'Testimonial updated' : 'Testimonial created');
      setEditing(null);
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to save');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const result = await deleteTestimonial(deleteId);
    setDeleteId(null);
    if (result.success) {
      toast.success('Testimonial deleted');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to delete');
    }
  };

  const inputClass = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm';

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => setEditing(empty())}
        className="inline-flex items-center gap-2 rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white"
      >
        <Plus className="h-4 w-4" />
        Add Testimonial
      </button>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={String(item._id)} className="rounded-xl border border-[#F5D6DC]/60 bg-white p-4">
            {item.image?.url && (
              <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full">
                <Image src={item.image.url} alt="" fill className="object-cover" />
              </div>
            )}
            <div className="flex items-center gap-1 text-[#E8AE43]">
              {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-700 line-clamp-3">&ldquo;{item.content}&rdquo;</p>
            <p className="mt-2 font-medium text-[#241920]">{item.name}</p>
            {item.role && <p className="text-xs text-gray-500">{item.role}</p>}
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => setEditing(item)} className="text-sm text-[#7A2048] hover:underline">
                Edit
              </button>
              <button type="button" onClick={() => setDeleteId(String(item._id))} className="text-sm text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-semibold">{editing._id ? 'Edit' : 'New'} Testimonial</h3>
            <input value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Name" className={inputClass} />
            <input value={editing.role ?? ''} onChange={(e) => setEditing({ ...editing, role: e.target.value })} placeholder="Role" className={inputClass} />
            <textarea value={editing.content ?? ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} placeholder="Content" rows={4} className={inputClass} />
            <input type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className={inputClass} />
            <ImageUploader
              value={editing.image}
              onChange={(img) => setEditing({ ...editing, image: img ?? undefined })}
              folder={CLOUDINARY_FOLDERS.testimonials}
              label="Photo"
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.isFeatured ?? false} onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })} />
              Featured
            </label>
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

      <ConfirmDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} title="Delete Testimonial" variant="danger" confirmLabel="Delete" onConfirm={handleDelete} />
    </div>
  );
}
