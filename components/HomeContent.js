"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import HeroStats from "@/components/HeroStats";
import BrandTicker from "@/components/BrandTicker";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsShowcase from "@/components/SkillsShowcase";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import HomeContact from "@/components/HomeContact";

export default function HomeContent({
  site,
  skills,
  featuredProjects,
  brands,
  heroStats,
  experience,
}) {
  return (
    <>
      <Hero
        name={site.name}
        title={site.title}
        tagline={site.tagline}
        intro={site.intro}
        showCta
      />
      <HeroStats stats={heroStats} />
      <BrandTicker brands={brands} />
      {Object.keys(skills).length > 0 && <SkillsShowcase skills={skills} />}
      <FeaturedProjects projects={featuredProjects} />
      <ExperienceTimeline experience={experience} />
      <HomeContact site={site} />
    </>
  );
}
