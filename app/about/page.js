import { buildPageMetadata } from "@/lib/metadata";
import { site } from "@/lib/data";
import AboutContent from "@/components/AboutContent";

export const metadata = buildPageMetadata({
  title: "About",
  description: site.aboutSummary,
  pathname: "/about",
});

export default function AboutPage() {
  return <AboutContent site={site} />;
}
