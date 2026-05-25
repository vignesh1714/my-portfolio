"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { getProjectImage } from "@/lib/projects";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured first" },
  { value: "title-asc", label: "Name (A–Z)" },
  { value: "title-desc", label: "Name (Z–A)" },
  { value: "tech-asc", label: "Tech stack (A–Z)" },
];

function matchesSearch(project, query) {
  const haystack = [
    project.title,
    project.shortDescription,
    project.description,
    project.slug,
    ...(project.techStack || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function sortProjects(list, sortBy) {
  const projects = [...list];
  switch (sortBy) {
    case "title-asc":
      return projects.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return projects.sort((a, b) => b.title.localeCompare(a.title));
    case "tech-asc":
      return projects.sort((a, b) => {
        const techA = (a.techStack?.[0] || "").toLowerCase();
        const techB = (b.techStack?.[0] || "").toLowerCase();
        return techA.localeCompare(techB) || a.title.localeCompare(b.title);
      });
    case "featured":
    default:
      return projects.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title)
      );
  }
}

export default function ProjectsContent({ projects }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const displayedProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q ? projects.filter((p) => matchesSearch(p, q)) : projects;
    return sortProjects(filtered, sortBy);
  }, [projects, search, sortBy]);

  return (
    <div className="section-container py-20 md:py-28">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Production work from my resume — global e-commerce, microfrontends, headless Shopify, and
          brand storefronts for Coty, O&apos;Reilly Auto Parts, Redsea, UMG, and more.
        </p>
      </motion.header>

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xl">
          <label htmlFor="projects-search" className="sr-only">
            Search projects
          </label>
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            id="projects-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, tech, or keyword…"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <label htmlFor="projects-sort" className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Sort by
          </label>
          <select
            id="projects-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2.5 pl-3 pr-9 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-8 text-sm text-gray-500 dark:text-gray-500">
        {search.trim()
          ? `${displayedProjects.length} of ${projects.length} projects`
          : `${projects.length} projects`}
      </p>

      {displayedProjects.length === 0 ? (
        <p className="py-16 text-center text-gray-500 dark:text-gray-400">
          No projects match &ldquo;{search}&rdquo;. Try &ldquo;Shopify&rdquo;, &ldquo;Coty&rdquo;, or
          &ldquo;React&rdquo;.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              shortDescription={project.shortDescription}
              techStack={project.techStack || []}
              image={getProjectImage(project)}
              featured={project.featured}
            />
          ))}
        </div>
      )}
    </div>
  );
}
