import { redirect } from "next/navigation";

export const metadata = {
  title: "Event Florals | Purely Baskets & Blooms",
};

export default function EventFloralsPage() {
  redirect("/booking");
}
