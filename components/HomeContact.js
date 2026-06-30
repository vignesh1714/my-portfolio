"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function ContactLink({ href, icon, label, external = false }) {
  const className =
    "inline-flex items-center gap-2.5 rounded-xl border border-gray-200/80 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-primary-400 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-primary-500/50 dark:hover:text-primary-300";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span aria-hidden>{icon}</span>
        {label}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      <span aria-hidden>{icon}</span>
      {label}
    </a>
  );
}

export default function HomeContact({ site }) {
  const links = [
    site.email && { href: `mailto:${site.email}`, icon: "✉", label: site.email },
    site.phone && { href: `tel:${site.phone}`, icon: "📱", label: site.phoneDisplay || site.phone },
    site.github && { href: site.github, icon: "⌥", label: "GitHub", external: true },
    site.linkedin && { href: site.linkedin, icon: "in", label: "LinkedIn", external: true },
  ].filter(Boolean);

  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <div className="section-container">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 via-white to-violet-500/5 p-8 text-center md:p-14 dark:from-primary-500/15 dark:via-gray-900/80 dark:to-violet-500/10"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              Let&apos;s Connect
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Open to remote opportunities
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-gray-600 dark:text-gray-400">
              Based in {site.location || "Chennai, India"}. Available for remote Frontend, Shopify, or
              Tech Lead roles globally.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {links.map((link) => (
                <ContactLink key={link.label} {...link} />
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-xl bg-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:-translate-y-0.5"
            >
              Send a message
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
