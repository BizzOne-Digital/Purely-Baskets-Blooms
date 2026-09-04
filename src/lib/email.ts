import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { BRAND, BRAND_COLORS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { IBooking, IOrder, OrderStatus } from "@/types";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

let transporter: Transporter | null = null;

function getMailConfig() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  const from = process.env.MAIL_FROM ?? user;
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.ADMIN_EMAIL ?? user;

  return { host, port, user, pass, from, adminEmail };
}

export function isEmailConfigured(): boolean {
  const { user, pass } = getMailConfig();
  return Boolean(user && pass);
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { host, port, user, pass } = getMailConfig();

  if (!user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_USER and SMTP_APP_PASSWORD."
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const { from } = getMailConfig();
  const transport = getTransporter();

  await transport.sendMail({
    from: `"${BRAND.name}" <${from}>`,
    to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
  });
}

function emailLayout(content: string, preheader?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${BRAND.name}</title>
  ${preheader ? `<span style="display:none;font-size:1px;color:#fff;max-height:0;overflow:hidden;">${preheader}</span>` : ""}
</head>
<body style="margin:0;padding:0;background-color:${BRAND_COLORS.warmIvory};font-family:'Helvetica Neue',Arial,sans-serif;color:${BRAND_COLORS.deepInk};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,${BRAND_COLORS.softBlush} 0%,${BRAND_COLORS.warmIvory} 50%,${BRAND_COLORS.champagne} 100%);padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(72,25,54,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND_COLORS.deepBerry},${BRAND_COLORS.plum});padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;color:#ffffff;letter-spacing:0.5px;">
                ${BRAND.name}
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:${BRAND_COLORS.softBlush};letter-spacing:1px;">
                ${BRAND.tagline}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color:${BRAND_COLORS.warmIvory};padding:24px 40px;text-align:center;border-top:1px solid ${BRAND_COLORS.softBlush};">
              <p style="margin:0 0 8px;font-size:13px;color:${BRAND_COLORS.deepBerry};">
                ${BRAND.email}
              </p>
              <p style="margin:0;font-size:12px;color:${BRAND_COLORS.dustyRose};">
                ${BRAND.deliveryArea}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buttonHtml(label: string, href: string): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:24px auto;">
      <tr>
        <td style="border-radius:8px;background:${BRAND_COLORS.deepBerry};">
          <a href="${href}" style="display:inline-block;padding:14px 32px;font-size:14px;color:#ffffff;text-decoration:none;letter-spacing:0.5px;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

export function buildOrderConfirmationEmail(order: IOrder): {
  subject: string;
  html: string;
  text: string;
} {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid ${BRAND_COLORS.softBlush};">
          <strong>${item.name}</strong><br/>
          <span style="font-size:13px;color:${BRAND_COLORS.dustyRose};">Qty: ${item.quantity}</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid ${BRAND_COLORS.softBlush};text-align:right;">
          ${formatPrice(item.lineTotal)}
        </td>
      </tr>`
    )
    .join("");

  const content = `
    <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:22px;color:${BRAND_COLORS.plum};">
      Thank you for your order!
    </h2>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
      Hi ${order.customerName}, we've received your order and will be in touch shortly to confirm the details.
    </p>
    <p style="margin:0 0 16px;font-size:14px;">
      <strong>Order Number:</strong> ${order.orderNumber}
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
      ${itemsHtml}
      <tr>
        <td style="padding:12px 0;font-size:14px;">Subtotal</td>
        <td style="padding:12px 0;text-align:right;">${formatPrice(order.pricing.subtotal)}</td>
      </tr>
      ${order.pricing.discountAmount > 0 ? `
      <tr>
        <td style="padding:4px 0;font-size:14px;color:${BRAND_COLORS.botanicalGreen};">Discount</td>
        <td style="padding:4px 0;text-align:right;color:${BRAND_COLORS.botanicalGreen};">-${formatPrice(order.pricing.discountAmount)}</td>
      </tr>` : ""}
      <tr>
        <td style="padding:4px 0;font-size:14px;">Delivery</td>
        <td style="padding:4px 0;text-align:right;">${formatPrice(order.pricing.deliveryCharge)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:14px;">Tax</td>
        <td style="padding:4px 0;text-align:right;">${formatPrice(order.pricing.taxAmount)}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;font-size:16px;font-weight:bold;color:${BRAND_COLORS.plum};">Total</td>
        <td style="padding:12px 0;text-align:right;font-size:16px;font-weight:bold;color:${BRAND_COLORS.plum};">${formatPrice(order.pricing.total)}</td>
      </tr>
    </table>
    ${order.giftMessage ? `<p style="font-size:14px;"><strong>Gift Message:</strong> ${order.giftMessage}</p>` : ""}
    <p style="font-size:14px;line-height:1.6;color:${BRAND_COLORS.dustyRose};">
      If you have any questions, reply to this email or contact us at ${BRAND.email}.
    </p>`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return {
    subject: `Order Confirmation – ${order.orderNumber} | ${BRAND.name}`,
    html: emailLayout(content, `Your order ${order.orderNumber} has been received.`),
    text: `Thank you for your order, ${order.customerName}! Order ${order.orderNumber}. Total: ${formatPrice(order.pricing.total)}. ${siteUrl}`,
  };
}

export function buildAdminOrderNotificationEmail(order: IOrder): {
  subject: string;
  html: string;
  text: string;
} {
  const content = `
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;color:${BRAND_COLORS.plum};">
      New Order Received
    </h2>
    <p style="font-size:15px;"><strong>Order:</strong> ${order.orderNumber}</p>
    <p style="font-size:15px;"><strong>Customer:</strong> ${order.customerName} (${order.customerEmail})</p>
    <p style="font-size:15px;"><strong>Phone:</strong> ${order.customerPhone}</p>
    <p style="font-size:15px;"><strong>Total:</strong> ${formatPrice(order.pricing.total)}</p>
    <p style="font-size:15px;"><strong>Payment:</strong> ${order.paymentStatus}</p>
    <p style="font-size:14px;color:${BRAND_COLORS.dustyRose};">
      Log in to the admin portal to view full order details.
    </p>`;

  return {
    subject: `New Order: ${order.orderNumber} – ${formatPrice(order.pricing.total)}`,
    html: emailLayout(content, `New order ${order.orderNumber} from ${order.customerName}`),
    text: `New order ${order.orderNumber} from ${order.customerName}. Total: ${formatPrice(order.pricing.total)}.`,
  };
}

export function buildOrderStatusUpdateEmail(
  order: Pick<IOrder, "orderNumber" | "customerName" | "customerEmail">,
  status: OrderStatus
): { subject: string; html: string; text: string } {
  const statusLabel = ORDER_STATUS_LABELS[status];

  const content = `
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;color:${BRAND_COLORS.plum};">
      Order Update
    </h2>
    <p style="font-size:15px;line-height:1.6;">
      Hi ${order.customerName}, your order <strong>${order.orderNumber}</strong> has been updated.
    </p>
    <p style="font-size:18px;color:${BRAND_COLORS.deepBerry};font-weight:bold;">
      Status: ${statusLabel}
    </p>
    <p style="font-size:14px;color:${BRAND_COLORS.dustyRose};">
      Thank you for choosing ${BRAND.name}.
    </p>`;

  return {
    subject: `Order Update – ${order.orderNumber} | ${BRAND.name}`,
    html: emailLayout(content, `Your order status is now: ${statusLabel}`),
    text: `Hi ${order.customerName}, your order ${order.orderNumber} status is now: ${statusLabel}.`,
  };
}

export function buildBookingConfirmationEmail(booking: IBooking): {
  subject: string;
  html: string;
  text: string;
} {
  const content = `
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;color:${BRAND_COLORS.plum};">
      We've Received Your Request
    </h2>
    <p style="font-size:15px;line-height:1.6;">
      Hi ${booking.customerName}, thank you for reaching out to ${BRAND.name}. We've received your custom order / booking request and will be in touch within 1–2 business days.
    </p>
    <p style="font-size:14px;"><strong>Service:</strong> ${booking.serviceType.replace(/_/g, " ")}</p>
    ${booking.eventDate ? `<p style="font-size:14px;"><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString("en-CA")}</p>` : ""}
    <p style="font-size:14px;color:${BRAND_COLORS.dustyRose};">
      We look forward to creating something beautiful for your celebration.
    </p>`;

  return {
    subject: `Booking Request Received | ${BRAND.name}`,
    html: emailLayout(content, "Your booking request has been received."),
    text: `Hi ${booking.customerName}, we've received your booking request. We'll be in touch soon.`,
  };
}

export function buildAdminBookingNotificationEmail(booking: IBooking): {
  subject: string;
  html: string;
  text: string;
} {
  const content = `
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;color:${BRAND_COLORS.plum};">
      New Booking Request
    </h2>
    <p style="font-size:15px;"><strong>Customer:</strong> ${booking.customerName}</p>
    <p style="font-size:15px;"><strong>Email:</strong> ${booking.customerEmail}</p>
    <p style="font-size:15px;"><strong>Phone:</strong> ${booking.customerPhone}</p>
    <p style="font-size:15px;"><strong>Service:</strong> ${booking.serviceType.replace(/_/g, " ")}</p>
    <p style="font-size:14px;"><strong>Message:</strong> ${booking.message}</p>`;

  return {
    subject: `New Booking Request from ${booking.customerName}`,
    html: emailLayout(content, `New booking from ${booking.customerName}`),
    text: `New booking from ${booking.customerName} (${booking.customerEmail}). Service: ${booking.serviceType}.`,
  };
}

export function buildContactNotificationEmail(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): { subject: string; html: string; text: string } {
  const content = `
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;color:${BRAND_COLORS.plum};">
      New Contact Inquiry
    </h2>
    <p style="font-size:15px;"><strong>From:</strong> ${inquiry.name} (${inquiry.email})</p>
    ${inquiry.phone ? `<p style="font-size:15px;"><strong>Phone:</strong> ${inquiry.phone}</p>` : ""}
    ${inquiry.subject ? `<p style="font-size:15px;"><strong>Subject:</strong> ${inquiry.subject}</p>` : ""}
    <p style="font-size:14px;line-height:1.6;">${inquiry.message}</p>`;

  return {
    subject: `Contact Form: ${inquiry.subject ?? inquiry.name}`,
    html: emailLayout(content, `New message from ${inquiry.name}`),
    text: `Contact from ${inquiry.name} (${inquiry.email}): ${inquiry.message}`,
  };
}

export function buildContactConfirmationEmail(inquiry: {
  name: string;
  email: string;
}): { subject: string; html: string; text: string } {
  const content = `
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;color:${BRAND_COLORS.plum};">
      Thank You for Reaching Out
    </h2>
    <p style="font-size:15px;line-height:1.6;">
      Hi ${inquiry.name}, we've received your message and will respond as soon as possible, typically within 1–2 business days.
    </p>
    <p style="font-size:14px;color:${BRAND_COLORS.dustyRose};">
      With warm regards,<br/>The ${BRAND.name} Team
    </p>`;

  return {
    subject: `We've Received Your Message | ${BRAND.name}`,
    html: emailLayout(content, "We've received your message."),
    text: `Hi ${inquiry.name}, we've received your message and will respond soon.`,
  };
}

export async function sendOrderEmails(order: IOrder): Promise<void> {
  const { adminEmail } = getMailConfig();

  const customerEmail = buildOrderConfirmationEmail(order);
  await sendEmail({
    to: order.customerEmail,
    subject: customerEmail.subject,
    html: customerEmail.html,
    text: customerEmail.text,
  });

  if (adminEmail) {
    const adminEmailContent = buildAdminOrderNotificationEmail(order);
    await sendEmail({
      to: adminEmail,
      subject: adminEmailContent.subject,
      html: adminEmailContent.html,
      text: adminEmailContent.text,
      replyTo: order.customerEmail,
    });
  }
}

export async function sendBookingEmails(booking: IBooking): Promise<void> {
  const { adminEmail } = getMailConfig();

  const customerEmail = buildBookingConfirmationEmail(booking);
  await sendEmail({
    to: booking.customerEmail,
    subject: customerEmail.subject,
    html: customerEmail.html,
    text: customerEmail.text,
  });

  if (adminEmail) {
    const adminEmailContent = buildAdminBookingNotificationEmail(booking);
    await sendEmail({
      to: adminEmail,
      subject: adminEmailContent.subject,
      html: adminEmailContent.html,
      text: adminEmailContent.text,
      replyTo: booking.customerEmail,
    });
  }
}

export async function sendOrderConfirmationEmail(order: IOrder): Promise<void> {
  const email = buildOrderConfirmationEmail(order);
  await sendEmail({
    to: order.customerEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
}

export async function sendOrderAdminNotification(order: IOrder): Promise<void> {
  const { adminEmail } = getMailConfig();
  if (!adminEmail) return;

  const email = buildAdminOrderNotificationEmail(order);
  await sendEmail({
    to: adminEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
    replyTo: order.customerEmail,
  });
}

export async function sendOrderStatusUpdateEmail(
  order: Pick<IOrder, "orderNumber" | "customerName" | "customerEmail">,
  status: OrderStatus
): Promise<void> {
  const email = buildOrderStatusUpdateEmail(order, status);
  await sendEmail({
    to: order.customerEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
}

export async function sendBookingConfirmationEmail(
  booking: IBooking
): Promise<void> {
  const email = buildBookingConfirmationEmail(booking);
  await sendEmail({
    to: booking.customerEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
}

export async function sendBookingAdminNotification(
  booking: IBooking
): Promise<void> {
  const { adminEmail } = getMailConfig();
  if (!adminEmail) return;

  const email = buildAdminBookingNotificationEmail(booking);
  await sendEmail({
    to: adminEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
    replyTo: booking.customerEmail,
  });
}

export async function sendContactNotification(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const { adminEmail } = getMailConfig();
  if (!adminEmail) return;

  const email = buildContactNotificationEmail(inquiry);
  await sendEmail({
    to: adminEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
    replyTo: inquiry.email,
  });
}

export async function sendContactConfirmationEmail(inquiry: {
  name: string;
  email: string;
}): Promise<void> {
  const email = buildContactConfirmationEmail(inquiry);
  await sendEmail({
    to: inquiry.email,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
}

export { buttonHtml, emailLayout };
