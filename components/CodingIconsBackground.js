"use client";

import { motion } from "framer-motion";

/** Fewer columns — lighter background, sits behind the right 3/4 panel */
const CODE_COLUMNS = [
  [
    "import React from 'react';",
    "export default function Hero() {",
    "  return <section />;",
    "}",
    "const data = await fetch('/api');",
  ],
  [
    "// Shopify headless",
    "function addToCart(id) {",
    "  return cart.add({ id });",
    "}",
    "export { addToCart };",
  ],
  [
    "npm run build",
    "git push origin main",
    "export const runtime = 'edge';",
    "async function Page() {}",
  ],
  [
    "{% for product in products %}",
    "  {{ product.title }}",
    "  {{ product.price | money }}",
    "{% endfor %}",
  ],
];

function highlightCode(line) {
  if (line.trim().startsWith("//") || line.trim().startsWith("{%")) {
    return <span className="text-primary-500/35 dark:text-primary-400/30">{line}</span>;
  }
  if (/\b(import|export|const|function|return|async)\b/.test(line)) {
    const parts = line.split(/(\b(?:import|export|const|function|return|async)\b)/g);
    return parts.map((part, i) =>
      /^(import|export|const|function|return|async)$/.test(part) ? (
        <span key={i} className="text-primary-500/45 dark:text-primary-400/35">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }
  return line;
}

function CodeColumn({ lines, index }) {
  const duration = 32 + index * 5;
  const reverse = index % 2 === 1;
  const doubled = [...lines, ...lines];

  return (
    <div className="relative h-full min-w-0 flex-1 overflow-hidden">
      <div
        className={`code-scroll-column font-mono text-xs leading-6 text-gray-500/35 dark:text-gray-400/25 ${
          reverse ? "code-scroll-reverse" : ""
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((line, i) => (
          <div key={`${index}-${i}`} className="py-1.5 pr-3 whitespace-nowrap">
            {highlightCode(line)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CodingIconsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-white dark:bg-surface-dark" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_82%_40%,rgba(99,102,241,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_70%_at_82%_40%,rgba(99,102,241,0.16),transparent)]" />

      {/* Scrolling code — right 72% only, 4 columns */}
      <div className="absolute inset-y-0 right-0 w-[72%] overflow-hidden opacity-70">
        <div className="absolute inset-0 flex gap-4 px-4">
          {CODE_COLUMNS.map((lines, index) => (
            <CodeColumn key={index} lines={lines} index={index} />
          ))}
        </div>
      </div>

      {/* Wide soft blend — no hard vertical cut */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,white_0%,white_40%,rgba(255,255,255,0.88)_48%,rgba(255,255,255,0.4)_54%,transparent_62%)] dark:bg-[linear-gradient(to_right,#0a0a0a_0%,#0a0a0a_40%,rgba(10,10,10,0.88)_48%,rgba(10,10,10,0.4)_54%,transparent_62%)]" />

      <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent dark:from-surface-dark/85" />
    </div>
  );
}
