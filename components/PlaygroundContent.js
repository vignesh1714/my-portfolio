"use client";

import { motion } from "framer-motion";
import JsPlayground from "@/components/JsPlayground";

export default function PlaygroundContent() {
  return (
    <div className="section-container py-20 md:py-28">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          JS Playground
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Switch between JavaScript, React, and Next.js tabs — write code, run it, and see live
          output and previews in your browser.
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <JsPlayground />
      </motion.div>

      <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-500 max-w-xl mx-auto">
        Code runs locally in your browser only. Avoid pasting untrusted scripts. No code is sent
        to a server.
      </p>
    </div>
  );
}
