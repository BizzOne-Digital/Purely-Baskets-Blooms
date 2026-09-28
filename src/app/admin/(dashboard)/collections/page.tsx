import { getCollections } from '@/lib/admin-data';
import { CollectionsManager } from '@/components/admin/CollectionsManager';
import type { ICollection } from '@/types';

export default async function CollectionsPage() {
  const items = await getCollections();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Collections</h1>
        <p className="text-sm text-gray-500">Manage product collections</p>
      </div>
      <CollectionsManager items={items as ICollection[]} />
    </div>
  );
}
