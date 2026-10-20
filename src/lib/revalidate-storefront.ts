import { revalidatePath } from "next/cache";

/** Bust cached storefront pages after catalog changes in admin. */
export function revalidateStorefrontCatalog(slug: string, previousSlug?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/shop");
  revalidatePath(`/shop/${slug}`);

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/shop/${previousSlug}`);
  }

  revalidatePath("/riwaaz");
}
