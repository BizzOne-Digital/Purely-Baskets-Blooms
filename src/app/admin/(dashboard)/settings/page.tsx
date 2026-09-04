import { getSiteSettings } from '@/actions/settings';
import { SettingsForm } from '@/components/admin/SettingsForm';
import type { ISiteSettings } from '@/types';

export default async function SettingsPage() {
  const result = await getSiteSettings();
  const settings = (result.data ?? {}) as Partial<ISiteSettings>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Site Settings</h1>
        <p className="text-sm text-gray-500">Configure your storefront and business settings</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
