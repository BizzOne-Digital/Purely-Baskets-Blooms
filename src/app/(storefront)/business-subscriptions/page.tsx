import { redirect } from "next/navigation";

/** Common spelling — same page as /business-subcriptions (live GoDaddy URL). */
export default function BusinessSubscriptionsRedirectPage() {
  redirect("/business-subcriptions");
}
