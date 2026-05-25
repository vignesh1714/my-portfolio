"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function ContactContent({ site }) {
  return (
    <div className="section-container py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Have a project in mind or want to collaborate? Send a message or reach out via the links
          below.
        </p>
        <ContactForm />
        <ul className="mt-10 space-y-4">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="text-primary-500 dark:text-primary-400 hover:underline font-medium"
            >
              {site.email}
            </a>
          </li>
          {site.linkedin && (
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 dark:text-primary-400 hover:underline font-medium"
              >
                LinkedIn
              </a>
            </li>
          )}
          {site.github && (
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 dark:text-primary-400 hover:underline font-medium"
              >
                GitHub
              </a>
            </li>
          )}
        </ul>
      </motion.div>
    </div>
  );
}
