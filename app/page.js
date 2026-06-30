import { buildPageMetadata } from "@/lib/metadata";
import { site, skills, getFeaturedProjects, brands, heroStats, experience } from "@/lib/data";
import HomeContent from "@/components/HomeContent";

export const metadata = buildPageMetadata({
  title: "Home",
  description: site.tagline,
  pathname: "/",
});

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <HomeContent
      site={site}
      skills={skills}
      featuredProjects={featuredProjects}
      brands={brands}
      heroStats={heroStats}
      experience={experience}
    />
  );
}
