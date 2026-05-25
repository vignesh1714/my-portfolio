import { buildPageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/data";
import ProjectsContent from "@/components/ProjectsContent";

export const metadata = buildPageMetadata({
  title: "Projects",
  description: "Portfolio projects — Coty, O'Reilly Auto Parts, Redsea, Shopify, and headless commerce.",
  pathname: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsContent projects={projects} />;
}
