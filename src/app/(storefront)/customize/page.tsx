import type { Metadata } from "next";
import { CustomizeForm } from "@/components/customize/CustomizeForm";

export const metadata: Metadata = {
  title: "Customize | Purely Baskets & Blooms",
  description:
    "Share your event details and up to three reference photos. Submit at least two days before your event — we will confirm design and pricing by email.",
};

export default function CustomizePage() {
  return <CustomizeForm />;
}
