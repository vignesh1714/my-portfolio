"use client";

import { useState, useEffect } from "react";

const SNIPPETS = [
  {
    id: "javascript",
    label: "JavaScript",
    file: "shopify-cart.js",
    code: `export async function addToCart(variantId) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: variantId, qty: 1 }),
  });
  if (!response.ok) throw new Error("Cart failed");
  return response.json();
}`,
  },
  {
    id: "liquid",
    label: "Shopify Liquid",
    file: "product-card.liquid",
    code: `{% for product in collection.products limit: 6 %}
  <article class="product-card">
    <a href="{{ product.url }}">
      <h3>{{ product.title }}</h3>
      <p>{{ product.price | money }}</p>
    </a>
  </article>
{% endfor %}`,
  },
];

const TYPING_MS = 22;
const PAUSE_AFTER_COMPLETE_MS = 2600;

export default function HeroCodeTyper({ large = false }) {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const snippet = SNIPPETS[snippetIndex];
  const displayed = snippet.code.slice(0, charIndex);
  const isComplete = charIndex >= snippet.code.length;

  useEffect(() => {
    if (!isComplete) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), TYPING_MS);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSnippetIndex((i) => (i + 1) % SNIPPETS.length);
      setCharIndex(0);
    }, PAUSE_AFTER_COMPLETE_MS);

    return () => clearTimeout(timeout);
  }, [charIndex, isComplete, snippet.code.length]);

  return (
    <div className="w-full">
      <div
        className={`flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-black ${
          large ? "min-h-[min(68vh,480px)]" : "min-h-[220px]"
        }`}
      >
        <div
          className={`flex shrink-0 items-center gap-2 border-b border-neutral-800 bg-black ${
            large ? "px-4 py-2.5" : "px-3 py-2.5"
          }`}
        >
          <span className={`rounded-full bg-red-500 ${large ? "h-3.5 w-3.5" : "h-2.5 w-2.5"}`} />
          <span className={`rounded-full bg-amber-400 ${large ? "h-3.5 w-3.5" : "h-2.5 w-2.5"}`} />
          <span className={`rounded-full bg-emerald-500 ${large ? "h-3.5 w-3.5" : "h-2.5 w-2.5"}`} />
          <span className={`ml-2 truncate font-mono text-neutral-400 ${large ? "text-xs" : "text-[11px]"}`}>
            {snippet.file}
          </span>
        </div>

        <div className={`flex shrink-0 gap-1 border-b border-neutral-800 bg-black ${large ? "px-4 pt-2" : "px-2 pt-1.5"}`}>
          {SNIPPETS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSnippetIndex(i);
                setCharIndex(0);
              }}
              className={`rounded-t-lg font-medium transition-colors ${
                large ? "px-3 py-1.5 text-xs" : "px-2.5 py-1.5 text-[11px]"
              } ${
                i === snippetIndex
                  ? "bg-black text-primary-400 ring-1 ring-neutral-700"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className={`relative min-h-0 flex-1 overflow-hidden bg-black ${large ? "p-4" : "p-3"}`}>
          <pre
            className={`font-mono leading-relaxed text-neutral-300 whitespace-pre-wrap ${
              large ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"
            }`}
          >
            <code>{displayed}</code>
            <span
              className={`code-typing-cursor ml-0.5 inline-block bg-primary-400 align-middle ${
                large ? "h-5 w-0.5" : "h-3.5 w-0.5"
              }`}
            />
          </pre>
        </div>

        <div
          className={`flex shrink-0 items-center justify-between border-t border-neutral-800 bg-black font-mono text-neutral-500 ${
            large ? "px-4 py-2 text-[10px]" : "px-3 py-2 text-[10px]"
          }`}
        >
          <span>{snippet.label}</span>
          <span>
            {charIndex}/{snippet.code.length}
          </span>
        </div>
      </div>
    </div>
  );
}
