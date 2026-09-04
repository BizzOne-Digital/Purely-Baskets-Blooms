'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { siteSettingsSchema } from '@/validations/settings';
import { updateSiteSettings } from '@/actions/settings';
import { ImageUploader } from './ImageUploader';
import { CLOUDINARY_FOLDERS } from '@/lib/constants';
import type { SiteSettingsInput } from '@/validations/settings';
import type { ISiteSettings } from '@/types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface SettingsFormProps {
  settings: Partial<ISiteSettings>;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<SiteSettingsInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(siteSettingsSchema) as any,
    defaultValues: {
      siteName: settings.siteName ?? 'Purely Baskets & Blooms',
      logo: settings.logo ?? undefined,
      favicon: settings.favicon ?? undefined,
      heroContent: settings.heroContent ?? {},
      heroImages: settings.heroImages ?? [],
      contactEmail: settings.contactEmail ?? '',
      phoneNumber: settings.phoneNumber ?? '',
      phoneVisible: settings.phoneVisible ?? true,
      instagramUrl: settings.instagramUrl ?? '',
      deliveryAreaText: settings.deliveryAreaText ?? '',
      announcementBar: settings.announcementBar ?? { enabled: false },
      businessHours:
        settings.businessHours?.length
          ? settings.businessHours
          : DAYS.map((day) => ({ day, open: '09:00', close: '17:00', isClosed: false })),
      taxRate: settings.taxRate ?? 0.13,
      deliveryCharge: settings.deliveryCharge ?? 15,
      minimumOrder: settings.minimumOrder ?? 0,
      stripeEnabled: settings.stripeEnabled ?? false,
      seoDefaults: settings.seoDefaults ?? {},
      footerContent: settings.footerContent ?? {},
      privacyPolicy: settings.privacyPolicy ?? '',
      termsAndConditions: settings.termsAndConditions ?? '',
    },
  });

  const { fields: hoursFields } = useFieldArray({ control, name: 'businessHours' });
  const heroImages = watch('heroImages');
  const logo = watch('logo');
  const favicon = watch('favicon');

  const onSubmit = async (data: SiteSettingsInput) => {
    setSaving(true);
    const result = await updateSiteSettings(data);
    setSaving(false);

    if (result.success) {
      toast.success('Settings saved');
    } else {
      toast.error(result.error ?? 'Failed to save settings');
    }
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'hero', label: 'Hero' },
    { id: 'contact', label: 'Contact' },
    { id: 'commerce', label: 'Commerce' },
    { id: 'hours', label: 'Business Hours' },
    { id: 'seo', label: 'SEO' },
    { id: 'footer', label: 'Footer' },
    { id: 'legal', label: 'Legal' },
  ];

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]';
  const labelClass = 'block text-sm font-medium text-[#241920] mb-1';
  const sectionClass = 'rounded-xl border border-[#F5D6DC]/60 bg-white p-5 space-y-4';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-[#F5D6DC]/60 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-[#7A2048] text-white'
                : 'text-[#7A2048] hover:bg-[#F5D6DC]/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">General Settings</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Site Name</label>
              <input {...register('siteName')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Delivery Area Text</label>
              <input {...register('deliveryAreaText')} className={inputClass} />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <ImageUploader
              value={logo}
              onChange={(img) => setValue('logo', img)}
              folder={CLOUDINARY_FOLDERS.settings}
              label="Logo"
            />
            <ImageUploader
              value={favicon}
              onChange={(img) => setValue('favicon', img)}
              folder={CLOUDINARY_FOLDERS.settings}
              label="Favicon"
            />
          </div>
          <div className={sectionClass}>
            <h3 className="text-sm font-semibold text-[#7A2048]">Announcement Bar</h3>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register('announcementBar.enabled')} />
              Enable announcement bar
            </label>
            <input {...register('announcementBar.message')} placeholder="Message" className={inputClass} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input {...register('announcementBar.link')} placeholder="Link URL" className={inputClass} />
              <input {...register('announcementBar.linkLabel')} placeholder="Link label" className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hero' && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">Hero Content</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Eyebrow</label>
              <input {...register('heroContent.eyebrow')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Heading</label>
              <input {...register('heroContent.heading')} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Subheading</label>
              <textarea {...register('heroContent.subheading')} rows={2} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Primary CTA Label</label>
              <input {...register('heroContent.primaryCtaLabel')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Primary CTA Link</label>
              <input {...register('heroContent.primaryCtaHref')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Secondary CTA Label</label>
              <input {...register('heroContent.secondaryCtaLabel')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Secondary CTA Link</label>
              <input {...register('heroContent.secondaryCtaHref')} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Trust Line</label>
              <input {...register('heroContent.trustLine')} className={inputClass} />
            </div>
          </div>
          <ImageUploader
            multiple
            value={heroImages}
            onChange={(imgs) => setValue('heroImages', imgs)}
            folder={CLOUDINARY_FOLDERS.hero}
            label="Hero Images"
            maxImages={5}
          />
        </div>
      )}

      {activeTab === 'contact' && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">Contact Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Contact Email</label>
              <input type="email" {...register('contactEmail')} className={inputClass} />
              {errors.contactEmail && (
                <p className="text-xs text-red-600">{errors.contactEmail.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input {...register('phoneNumber')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input {...register('instagramUrl')} className={inputClass} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register('phoneVisible')} />
                Show phone on website
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'commerce' && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">Commerce Settings</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Tax Rate (decimal)</label>
              <input
                type="number"
                step="0.01"
                {...register('taxRate', { valueAsNumber: true })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Delivery Charge (CAD)</label>
              <input
                type="number"
                step="0.01"
                {...register('deliveryCharge', { valueAsNumber: true })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Minimum Order (CAD)</label>
              <input
                type="number"
                step="0.01"
                {...register('minimumOrder', { valueAsNumber: true })}
                className={inputClass}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('stripeEnabled')} />
            Enable Stripe payments
          </label>
        </div>
      )}

      {activeTab === 'hours' && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">Business Hours</h2>
          <div className="space-y-3">
            {hoursFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium">{field.day}</span>
                <input type="hidden" {...register(`businessHours.${index}.day`)} />
                <input
                  type="time"
                  {...register(`businessHours.${index}.open`)}
                  className={inputClass}
                  disabled={watch(`businessHours.${index}.isClosed`)}
                />
                <span className="text-gray-400">to</span>
                <input
                  type="time"
                  {...register(`businessHours.${index}.close`)}
                  className={inputClass}
                  disabled={watch(`businessHours.${index}.isClosed`)}
                />
                <label className="flex items-center gap-1 text-xs whitespace-nowrap">
                  <input type="checkbox" {...register(`businessHours.${index}.isClosed`)} />
                  Closed
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'seo' && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">SEO Defaults</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Default Title</label>
              <input {...register('seoDefaults.title')} className={inputClass} maxLength={70} />
            </div>
            <div>
              <label className={labelClass}>Default Description</label>
              <textarea {...register('seoDefaults.description')} rows={3} className={inputClass} maxLength={160} />
            </div>
            <div>
              <label className={labelClass}>OG Image URL</label>
              <input {...register('seoDefaults.ogImage')} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'footer' && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">Footer Content</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Tagline</label>
              <input {...register('footerContent.tagline')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>About Snippet</label>
              <textarea {...register('footerContent.aboutSnippet')} rows={3} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Copyright Text</label>
              <input {...register('footerContent.copyrightText')} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'legal' && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">Legal Pages</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Privacy Policy</label>
              <textarea {...register('privacyPolicy')} rows={10} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Terms & Conditions</label>
              <textarea {...register('termsAndConditions')} rows={10} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      <div className="sticky bottom-0 border-t border-[#F5D6DC]/60 bg-[#FFF9F4] py-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#7A2048] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#481936] disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
