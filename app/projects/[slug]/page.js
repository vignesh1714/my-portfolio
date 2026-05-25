import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { projects, getProjectBySlug } from "@/lib/data";
import ProjectDetail from "@/components/ProjectDetail";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildPageMetadata({ title: "Project Not Found" });
  }

  return buildPageMetadata({
    title: project.title,
    description: project.shortDescription,
    pathname: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
