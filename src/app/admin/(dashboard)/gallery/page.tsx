import { getGalleryItems } from '@/lib/admin-data';
import { GalleryManager } from '@/components/admin/GalleryManager';
import type { IGalleryItem } from '@/types';

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Gallery</h1>
        <p className="text-sm text-gray-500">Manage gallery images</p>
      </div>
      <GalleryManager items={items as IGalleryItem[]} />
    </div>
  );
}
