"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProjectImage } from "@/lib/projects";

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeaturedProjectTile({ project, index, image }) {
  return (
    <motion.article
      variants={reveal}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm transition-all hover:border-primary-500/35 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-500/40"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <div className="relative aspect-[5/3] shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {image ? (
            <Image
              src={image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-violet-500/10"
              aria-hidden
            >
              <span className="text-3xl font-bold text-primary-500/35">{project.title.charAt(0)}</span>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-gray-700 backdrop-blur-sm dark:bg-gray-950/80 dark:text-gray-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-1.5 text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2 min-h-[2.5rem]">
            {project.title}
          </h3>
          <p className="mb-3 flex-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
            {project.shortDescription}
          </p>
          {project.techStack?.length > 0 && (
            <ul className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 2).map((tech) => (
                <li
                  key={tech}
                  className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tech}
                </li>
              ))}
              {project.techStack.length > 2 && (
                <li className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800">
                  +{project.techStack.length - 2}
                </li>
              )}
            </ul>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

export default function FeaturedProjects({ projects }) {
  const featured = projects?.slice(0, 4) ?? [];
  if (!featured.length) return null;

  return (
    <section
      id="projects"
      className="featured-projects w-full border-y border-gray-200/70 bg-gray-50/90 py-12 md:py-16 dark:border-gray-800/60 dark:bg-gray-900/40"
    >
      <div className="section-container">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-8 max-w-3xl text-center md:mb-10"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Portfolio
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
            Four highlights from global e-commerce and brand storefront work.
          </p>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {featured.map((project, index) => (
            <FeaturedProjectTile
              key={project.slug}
              project={project}
              index={index}
              image={getProjectImage(project)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center md:mt-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-500/30 bg-white px-5 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-500/5 dark:bg-gray-900 dark:text-primary-400 dark:hover:bg-primary-500/15"
          >
            View all projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
