/** Strip HTML markup so admin and storefront use plain text only. */
export function stripHtmlToPlainText(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  let text = value
    .replace(/\r\n/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/div>\s*/gi, "\n")
    .replace(/<div[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"');

  text = text
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

export function plainTextOrEmpty(value: string | null | undefined): string {
  return stripHtmlToPlainText(value);
}
