"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsShowcase from "@/components/SkillsShowcase";

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeContent({ site, skills, featuredProjects }) {
  return (
    <>
      <Hero
        name={site.name}
        title={site.title}
        tagline={site.tagline}
        intro={site.intro}
        showCta
      />
      {Object.keys(skills).length > 0 && <SkillsShowcase skills={skills} />}
      <FeaturedProjects projects={featuredProjects} />
      <section id="contact" className="w-full py-20 md:py-28">
        <div className="section-container">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 via-white to-violet-500/5 p-10 md:p-16 dark:from-primary-500/15 dark:via-gray-900/80 dark:to-violet-500/10"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" aria-hidden="true" />
            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500 dark:text-primary-400 mb-3">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Let&apos;s work together
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Have a project in mind? I&apos;d love to hear about it. Get in touch for freelance or
                full-time opportunities.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
