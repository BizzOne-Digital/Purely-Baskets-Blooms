import { redirect } from "next/navigation";

export const metadata = {
  title: "Services | Purely Baskets & Blooms",
};

/** Legacy route — custom florals are the primary service. */
export default function ServicesPage() {
  redirect("/booking");
}
