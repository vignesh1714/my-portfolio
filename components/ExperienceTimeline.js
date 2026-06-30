"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ExperienceTimeline({ experience }) {
  if (!experience?.length) return null;

  return (
    <section
      id="experience"
      className="w-full border-y border-gray-200/70 bg-gray-50/90 py-16 md:py-24 dark:border-gray-800/60 dark:bg-gray-900/40"
    >
      <div className="section-container">
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={reveal}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Career
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
            Experience
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
            Over a decade delivering frontend excellence across verticals, geographies, and scales.
          </p>
        </motion.header>

        <ol className="relative mx-auto max-w-3xl border-l-2 border-primary-200 pl-6 dark:border-primary-500/30 md:pl-8">
          {experience.map((item, index) => (
            <motion.li
              key={`${item.role}-${item.period}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={reveal}
              transition={{ delay: index * 0.06 }}
              className="relative pb-10 last:pb-0 md:pb-12"
            >
              <span
                className="absolute -left-[1.65rem] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-gray-50 bg-primary-500 shadow-[0_0_0_4px_rgba(99,102,241,0.15)] dark:border-gray-900 dark:shadow-[0_0_0_4px_rgba(99,102,241,0.25)] md:-left-[2.05rem]"
                aria-hidden
              />
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary-500/25 bg-primary-500/10 px-3 py-0.5 text-xs font-semibold text-primary-700 dark:border-primary-400/30 dark:bg-primary-500/15 dark:text-primary-300">
                  {item.period}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.company}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white md:text-xl">
                {item.role}
              </h3>
              <ul className="space-y-2">
                {item.highlights.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5 text-sm leading-relaxed text-gray-600 before:absolute before:left-0 before:text-primary-500 before:content-['→'] dark:text-gray-300"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
