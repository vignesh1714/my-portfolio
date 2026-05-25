"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProjectGallery, getProjectImage } from "@/lib/projects";

export default function ProjectDetail({ project }) {
  const imageSrc = getProjectImage(project);
  const gallery = getProjectGallery(project);
  return (
    <article className="section-container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-8"
        >
          ← Back to Projects
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6 shadow-soft dark:shadow-soft-dark relative">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-600/10">
              <span className="text-6xl font-bold text-primary-500/30">{project.title.charAt(0)}</span>
            </div>
          )}
        </div>

        {gallery.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
            {gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 50vw, 240px"
                />
              </div>
            ))}
          </div>
        )}

        {gallery.length <= 1 && <div className="mb-6" />}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{project.description}</p>

          {project.challenges && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Challenges</h2>
              <p className="text-gray-600 dark:text-gray-400">{project.challenges}</p>
            </section>
          )}

          {project.solutions && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Solutions</h2>
              <p className="text-gray-600 dark:text-gray-400">{project.solutions}</p>
            </section>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </article>
  );
}
