/** Customize / custom order page — advance notice copy. */

export const CUSTOMIZE_MIN_LEAD_DAYS = 2;

export const CUSTOMIZE_POLICY = {
  headline: "Submit at least 2 days before your event",
  notice:
    "Please send your customize request at least 2 full days before your event date so we can review your references and confirm availability.",
  references:
    "Share up to 3 inspiration photos ( Pinterest, past events, colour palettes, etc.).",
} as const;

export function startOfLocalDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Earliest selectable event date (today + CUSTOMIZE_MIN_LEAD_DAYS). */
export function earliestCustomizeEventDate(from: Date = new Date()): Date {
  const min = startOfLocalDay(from);
  min.setDate(min.getDate() + CUSTOMIZE_MIN_LEAD_DAYS);
  return min;
}

export function formatDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isEventDateAllowed(eventDate: Date, from: Date = new Date()): boolean {
  return startOfLocalDay(eventDate) >= earliestCustomizeEventDate(from);
}
