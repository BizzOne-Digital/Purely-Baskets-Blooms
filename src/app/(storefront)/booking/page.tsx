import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata = {
  title: "Book a Consultation | Purely Baskets & Blooms",
  description: "Schedule a complimentary floral design consultation for your event or custom order.",
};

export default function BookingPage() {
  return (
    <Suspense>
      <BookingForm />
    </Suspense>
  );
}
