/** Shared copy for timelines, advance notice, and payments across storefront. */

export const ORDER_TIMELINE = {
  headline: "Planning timeline & advance notice",
  standard:
    "Everyday shop orders: please order at least 24–48 hours before your preferred delivery date so we can source the freshest blooms.",
  custom:
    "Custom floral designs, weddings, and large installations: we recommend 2–4 weeks notice (or more for peak seasons). Share your date early and we will confirm what is possible.",
  madeToOrder:
    "Made-to-order pieces may require additional lead time — your product page or quote will include a timeline.",
} as const;

export const PAYMENT_INFO = {
  headline: "How payment works",
  online:
    "When secure card checkout is enabled, you will complete payment on the final step via our encrypted payment partner (Stripe). You will receive an email confirmation once payment is received.",
  manual:
    "If card checkout is not available for your order, we will confirm your total by email and share payment instructions (e-transfer or invoice) before we begin production.",
  customQuote:
    "Custom quotes may require a deposit to reserve your date; the balance is due before delivery or pickup as agreed in your quote.",
} as const;
