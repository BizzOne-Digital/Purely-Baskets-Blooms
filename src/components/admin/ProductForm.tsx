'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { productSchema } from '@/validations/product';
import { createProduct, updateProduct } from '@/actions/products';
import { slugify } from '@/lib/utils';
import {
  PRICE_TYPES,
  AVAILABILITY_TYPES,
  OCCASIONS,
  CLOUDINARY_FOLDERS,
} from '@/lib/constants';
import { ImageUploader } from './ImageUploader';
import type { ProductInput } from '@/validations/product';
import type { IProduct, ICategory, ICollection } from '@/types';

interface ProductFormProps {
  product?: IProduct;
  categories: ICategory[];
  collections: ICollection[];
}

export function ProductForm({ product, categories, collections }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: product?.name ?? '',
      slug: product?.slug ?? '',
      shortDescription: product?.shortDescription ?? '',
      fullDescription: product?.fullDescription ?? '',
      category: product?.category ? String(product.category) : '',
      collection: product?.collection ? String(product.collection) : undefined,
      occasionTags: product?.occasionTags ?? [],
      mainImage: product?.mainImage ?? undefined,
      gallery: product?.gallery ?? [],
      priceType: product?.priceType ?? 'fixed',
      basePrice: product?.basePrice ?? undefined,
      compareAtPrice: product?.compareAtPrice ?? undefined,
      salePrice: product?.salePrice ?? undefined,
      saleStartDate: product?.saleStartDate
        ? new Date(product.saleStartDate)
        : undefined,
      saleEndDate: product?.saleEndDate ? new Date(product.saleEndDate) : undefined,
      productOptions: product?.productOptions ?? [],
      sizeOptions: product?.sizeOptions ?? [],
      colorPaletteOptions: product?.colorPaletteOptions ?? [],
      addOns: product?.addOns ?? [],
      leadTime: product?.leadTime ?? '',
      careInstructions: product?.careInstructions ?? '',
      availability: product?.availability ?? 'made_to_order',
      stockQuantity: product?.stockQuantity ?? undefined,
      isFeatured: product?.isFeatured ?? false,
      isBestseller: product?.isBestseller ?? false,
      isRiwaaz: product?.isRiwaaz ?? false,
      seoTitle: product?.seoTitle ?? '',
      seoDescription: product?.seoDescription ?? '',
      status: product?.status ?? 'draft',
    },
  });

  const priceType = watch('priceType');
  const mainImage = watch('mainImage');
  const gallery = watch('gallery');
  const occasionTags = watch('occasionTags');

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({ control, name: 'productOptions' });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: 'sizeOptions' });

  const {
    fields: addOnFields,
    append: appendAddOn,
    remove: removeAddOn,
  } = useFieldArray({ control, name: 'addOns' });

  const onSubmit = async (data: ProductInput) => {
    setSaving(true);
    try {
      const result = isEditing
        ? await updateProduct(String(product._id), data)
        : await createProduct(data);

      if (!result.success) {
        toast.error(result.error ?? 'Failed to save product');
        return;
      }

      toast.success(isEditing ? 'Product updated' : 'Product created');
      router.push('/admin/products');
      router.refresh();
    } catch {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const toggleOccasion = (occasion: string) => {
    const current = occasionTags ?? [];
    if (current.includes(occasion)) {
      setValue(
        'occasionTags',
        current.filter((o) => o !== occasion)
      );
    } else {
      setValue('occasionTags', [...current, occasion]);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]';
  const labelClass = 'block text-sm font-medium text-[#241920] mb-1';
  const sectionClass = 'rounded-xl border border-[#F5D6DC]/60 bg-white p-5 space-y-4';
  const errorClass = 'text-xs text-red-600 mt-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <div className={sectionClass}>
            <h2 className="text-base font-semibold text-[#7A2048]">Basic Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Product Name *</label>
                <input
                  {...register('name')}
                  onBlur={(e) => {
                    if (!isEditing && !watch('slug')) {
                      setValue('slug', slugify(e.target.value));
                    }
                  }}
                  className={inputClass}
                />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Slug *</label>
                <input {...register('slug')} className={inputClass} />
                {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select {...register('status')} className={inputClass}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Short Description *</label>
                <textarea {...register('shortDescription')} rows={2} className={inputClass} />
                {errors.shortDescription && (
                  <p className={errorClass}>{errors.shortDescription.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Description *</label>
                <textarea {...register('fullDescription')} rows={6} className={inputClass} />
                {errors.fullDescription && (
                  <p className={errorClass}>{errors.fullDescription.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className={sectionClass}>
            <h2 className="text-base font-semibold text-[#7A2048]">Pricing</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Price Type</label>
                <select {...register('priceType')} className={inputClass}>
                  {PRICE_TYPES.map((pt) => (
                    <option key={pt.value} value={pt.value}>
                      {pt.label}
                    </option>
                  ))}
                </select>
              </div>
              {priceType !== 'quote' && (
                <div>
                  <label className={labelClass}>Base Price (CAD)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('basePrice', { valueAsNumber: true })}
                    className={inputClass}
                  />
                  {errors.basePrice && (
                    <p className={errorClass}>{errors.basePrice.message}</p>
                  )}
                </div>
              )}
              <div>
                <label className={labelClass}>Compare At Price</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('compareAtPrice', { valueAsNumber: true })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sale Price</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('salePrice', { valueAsNumber: true })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sale Start Date</label>
                <input
                  type="date"
                  {...register('saleStartDate')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sale End Date</label>
                <input
                  type="date"
                  {...register('saleEndDate')}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#7A2048]">Product Options</h2>
              <button
                type="button"
                onClick={() => appendOption({ name: '', values: [''], required: false })}
                className="flex items-center gap-1 text-sm text-[#7A2048] hover:underline"
              >
                <Plus className="h-4 w-4" /> Add Option
              </button>
            </div>
            {optionFields.map((field, index) => (
              <div key={field.id} className="flex gap-3 rounded-lg border border-gray-100 p-3">
                <div className="flex-1 space-y-2">
                  <input
                    {...register(`productOptions.${index}.name`)}
                    placeholder="Option name (e.g. Ribbon Color)"
                    className={inputClass}
                  />
                  <input
                    {...register(`productOptions.${index}.values.0`)}
                    placeholder="Values (comma-separated)"
                    className={inputClass}
                    onChange={(e) => {
                      const vals = e.target.value.split(',').map((v) => v.trim()).filter(Boolean);
                      setValue(`productOptions.${index}.values`, vals.length ? vals : ['']);
                    }}
                  />
                </div>
                <button type="button" onClick={() => removeOption(index)} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Sizes */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#7A2048]">Size Options</h2>
              <button
                type="button"
                onClick={() => appendSize({ label: '', priceModifier: 0 })}
                className="flex items-center gap-1 text-sm text-[#7A2048] hover:underline"
              >
                <Plus className="h-4 w-4" /> Add Size
              </button>
            </div>
            {sizeFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  {...register(`sizeOptions.${index}.label`)}
                  placeholder="Size label"
                  className={inputClass}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register(`sizeOptions.${index}.priceModifier`, { valueAsNumber: true })}
                  placeholder="Price modifier"
                  className={inputClass}
                />
                <button type="button" onClick={() => removeSize(index)} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className={sectionClass}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#7A2048]">Add-Ons</h2>
              <button
                type="button"
                onClick={() => appendAddOn({ name: '', price: 0 })}
                className="flex items-center gap-1 text-sm text-[#7A2048] hover:underline"
              >
                <Plus className="h-4 w-4" /> Add Add-On
              </button>
            </div>
            {addOnFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  {...register(`addOns.${index}.name`)}
                  placeholder="Add-on name"
                  className={inputClass}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register(`addOns.${index}.price`, { valueAsNumber: true })}
                  placeholder="Price"
                  className={inputClass}
                />
                <button type="button" onClick={() => removeAddOn(index)} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* SEO */}
          <div className={sectionClass}>
            <h2 className="text-base font-semibold text-[#7A2048]">SEO</h2>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>SEO Title</label>
                <input {...register('seoTitle')} className={inputClass} maxLength={70} />
              </div>
              <div>
                <label className={labelClass}>SEO Description</label>
                <textarea {...register('seoDescription')} rows={2} className={inputClass} maxLength={160} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className={sectionClass}>
            <h2 className="text-base font-semibold text-[#7A2048]">Images</h2>
            <ImageUploader
              value={mainImage}
              onChange={(img) => setValue('mainImage', img!, { shouldValidate: true })}
              folder={CLOUDINARY_FOLDERS.products}
              label="Main Image *"
            />
            {errors.mainImage && (
              <p className={errorClass}>Main image is required</p>
            )}
            <ImageUploader
              multiple
              value={gallery}
              onChange={(imgs) => setValue('gallery', imgs)}
              folder={CLOUDINARY_FOLDERS.products}
              label="Gallery Images"
            />
          </div>

          <div className={sectionClass}>
            <h2 className="text-base font-semibold text-[#7A2048]">Organization</h2>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Category *</label>
                <select {...register('category')} className={inputClass}>
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={String(cat._id)} value={String(cat._id)}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className={errorClass}>{errors.category.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Collection</label>
                <select {...register('collection')} className={inputClass}>
                  <option value="">None</option>
                  {collections.map((col) => (
                    <option key={String(col._id)} value={String(col._id)}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Availability</label>
                <select {...register('availability')} className={inputClass}>
                  {AVAILABILITY_TYPES.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Stock Quantity</label>
                <input
                  type="number"
                  {...register('stockQuantity', { valueAsNumber: true })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Lead Time</label>
                <input {...register('leadTime')} className={inputClass} placeholder="e.g. 2-3 days" />
              </div>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-base font-semibold text-[#7A2048]">Flags</h2>
            <div className="space-y-2">
              {[
                { key: 'isFeatured' as const, label: 'Featured' },
                { key: 'isBestseller' as const, label: 'Bestseller' },
                { key: 'isRiwaaz' as const, label: 'Riwaaz Collection' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register(key)} className="rounded border-gray-300" />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-base font-semibold text-[#7A2048]">Occasions</h2>
            <div className="flex flex-wrap gap-1.5">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => toggleOccasion(occ)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    occasionTags?.includes(occ)
                      ? 'bg-[#7A2048] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-[#F5D6DC]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-[#7A2048] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#481936] disabled:opacity-50"
            >
              {saving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
