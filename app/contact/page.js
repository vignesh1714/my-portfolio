import { buildPageMetadata } from "@/lib/metadata";
import { site } from "@/lib/data";
import ContactContent from "@/components/ContactContent";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: "Get in touch for freelance or full-time opportunities.",
  pathname: "/contact",
});

export default function ContactPage() {
  return <ContactContent site={site} />;
}
