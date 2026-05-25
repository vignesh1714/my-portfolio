import { buildPageMetadata } from "@/lib/metadata";
import { skills } from "@/lib/data";
import SkillsContent from "@/components/SkillsContent";

export const metadata = buildPageMetadata({
  title: "Skills",
  description:
    "Frontend development, Shopify, headless CMS, performance, and API integrations.",
  pathname: "/skills",
});

export default function SkillsPage() {
  return <SkillsContent skills={skills} />;
}
