"use client";

import { motion } from "framer-motion";

export default function HeroStats({ stats }) {
  if (!stats?.length) return null;

  return (
    <section
      aria-label="Career highlights"
      className="w-full border-b border-gray-200/70 bg-white/80 dark:border-gray-800/60 dark:bg-gray-950/80"
    >
      <div className="section-container py-10 md:py-12">
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6"
        >
          {stats.map((stat) => (
            <li key={stat.label} className="text-center md:text-left">
              <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                {stat.value}
                <span className="text-primary-500 dark:text-primary-400">{stat.suffix}</span>
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 md:text-sm md:normal-case md:tracking-normal">
                {stat.label}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
