import site from "@/data/site/site.json";
import skills from "@/data/skills/skills.json";
import projects from "@/data/projects/projects.json";
import brands from "@/data/home/brands.json";
import heroStats from "@/data/home/hero-stats.json";
import experience from "@/data/experience/experience.json";

export { site, skills, projects, brands, heroStats, experience };
export { getProjectImage, getProjectGallery } from "@/lib/projects";

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
