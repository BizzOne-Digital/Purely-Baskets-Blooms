import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata = {
  title: "Custom Florals | Purely Baskets & Blooms",
  description:
    "Share your vision for a custom floral arrangement. We will design with you and confirm timeline and payment details.",
};

export default function BookingPage() {
  return (
    <Suspense>
      <BookingForm />
    </Suspense>
  );
}
