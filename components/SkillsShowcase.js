"use client";

import { motion } from "framer-motion";
import SkillsSwiper from "@/components/SkillsSwiper";

export default function SkillsShowcase({ skills }) {
  if (!skills || Object.keys(skills).length === 0) return null;

  return (
    <section
      id="skills"
      className="skills-showcase w-full overflow-x-clip border-y border-gray-200/70 bg-gray-50/90 py-16 md:py-24 dark:border-gray-800/60 dark:bg-gray-900/40"
    >
      <div className="section-container">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Expertise
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Core Skills
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
            Frontend engineering, Shopify commerce, headless CMS, performance, and integrations.
          </p>
        </motion.header>
      </div>

      <SkillsSwiper skills={skills} />
    </section>
  );
}
