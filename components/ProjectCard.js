"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectCard({
  slug,
  title,
  shortDescription,
  techStack = [],
  image,
  featured = false,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group h-full"
    >
      <Link
        href={`/projects/${slug}`}
        className="flex h-full flex-col rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft dark:shadow-soft-dark hover:shadow-xl dark:hover:shadow-xl hover:border-primary-500/30 transition-all duration-300"
      >
        <div className="aspect-video shrink-0 bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-600/10 dark:from-primary-500/10 dark:to-primary-600/5"
              aria-hidden
            >
              <span className="text-4xl font-bold text-primary-500/40">{title.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 min-h-[220px]">
          {featured && (
            <span className="inline-block text-xs font-medium text-primary-500 dark:text-primary-400 mb-2">
              Featured
            </span>
          )}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
            {shortDescription}
          </p>
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-2 content-start">
              {techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
