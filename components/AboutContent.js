"use client";

import { motion } from "framer-motion";

export default function AboutContent({ site }) {
  return (
    <div className="section-container py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About Me
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          {site.aboutSummary}
        </p>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Expertise</h2>
        <ul className="space-y-2 mb-8">
          {(site.aboutExpertise || []).map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{site.aboutExperience}</p>
      </motion.div>
    </div>
  );
}
