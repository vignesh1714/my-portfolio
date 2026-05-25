"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import InnerEdgeScroll from "@/components/InnerEdgeScroll";
import { jsReferenceTopics } from "@/data/jsReference";

function matchesQuery(topic, query) {
  const haystack = [topic.title, topic.summary, topic.note, topic.id, topic.snippet]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function getBadgeLabel(topic) {
  if (topic.badge) return topic.badge;
  if (topic.title.endsWith("()")) return topic.title.slice(0, -2);
  return topic.id.replace(/-/g, " ");
}

export default function JsReferenceGuide({ onTryExample }) {
  const [openId, setOpenId] = useState(jsReferenceTopics[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchWrapRef = useRef(null);

  const filteredTopics = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return jsReferenceTopics;
    return jsReferenceTopics.filter((topic) => matchesQuery(topic, q));
  }, [search]);

  const suggestionTopics = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return jsReferenceTopics;
    return jsReferenceTopics.filter((topic) => matchesQuery(topic, q));
  }, [search]);

  const selectTopic = (topic) => {
    setSearch(getBadgeLabel(topic));
    setOpenId(topic.id);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const onPointerDown = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    if (filteredTopics.length === 0) {
      setOpenId(null);
      return;
    }
    const stillVisible = filteredTopics.some((t) => t.id === openId);
    if (!stillVisible) {
      setOpenId(filteredTopics[0].id);
    }
  }, [filteredTopics, openId]);

  return (
    <section className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          JavaScript reference
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Definitions, corrections where needed, and runnable examples. Click{" "}
          <strong className="font-medium text-gray-800 dark:text-gray-200">Try in editor</strong>{" "}
          to load a snippet into the playground above, then press Run.
        </p>
      </div>

      <div className="mb-4" ref={searchWrapRef}>
        <label htmlFor="js-ref-search" className="sr-only">
          Search methods
        </label>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
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
            id="js-ref-search"
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setDropdownOpen(false);
            }}
            placeholder="Search methods (e.g. map, filter, Promise.all)…"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-expanded={dropdownOpen}
            aria-controls="js-ref-suggestions"
            aria-autocomplete="list"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setDropdownOpen(true);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm font-medium"
              aria-label="Clear search"
            >
              Clear
            </button>
          )}

          {dropdownOpen && (
            <div
              id="js-ref-suggestions"
              role="listbox"
              className="absolute z-40 left-0 right-0 top-full mt-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg dark:shadow-soft-dark p-3 max-h-52 overflow-y-auto"
            >
              <p className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2 px-0.5">
                {search.trim()
                  ? `Matching methods (${suggestionTopics.length})`
                  : `All methods (${jsReferenceTopics.length})`}
              </p>
              {suggestionTopics.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 py-2">No matches</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {suggestionTopics.map((topic) => {
                    const label = getBadgeLabel(topic);
                    const isActive = openId === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectTopic(topic)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] leading-tight font-medium border transition-colors ${
                          isActive
                            ? "bg-primary-500 text-white border-primary-500"
                            : "bg-primary-500/10 text-primary-700 dark:text-primary-300 border-primary-500/20 hover:bg-primary-500/20 dark:hover:bg-primary-500/25"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {search.trim()
            ? `${filteredTopics.length} of ${jsReferenceTopics.length} topics`
            : `${jsReferenceTopics.length} topics — click the search field for all method badges`}
        </p>
      </div>

      <InnerEdgeScroll maxHeight="min(70vh, 560px)" scrollSpeed={12}>
        {filteredTopics.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No methods match &ldquo;{search}&rdquo;. Try another keyword like{" "}
            <button
              type="button"
              className="text-primary-500 hover:underline"
              onClick={() => setSearch("map")}
            >
              map
            </button>
            ,{" "}
            <button
              type="button"
              className="text-primary-500 hover:underline"
              onClick={() => setSearch("reduce")}
            >
              reduce
            </button>
            , or{" "}
            <button
              type="button"
              className="text-primary-500 hover:underline"
              onClick={() => setSearch("promise")}
            >
              promise
            </button>
            .
          </p>
        ) : (
          <div className="space-y-3">
            {filteredTopics.map((topic) => {
              const isOpen = openId === topic.id;
              return (
                <article
                  key={topic.id}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : topic.id)}
                    className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {topic.title}
                    </span>
                    <span className="text-gray-400 text-lg leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-800">
                      <p className="pt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {topic.summary}
                      </p>
                      {topic.note && (
                        <p className="text-sm text-primary-700 dark:text-primary-300 bg-primary-500/10 rounded-lg px-3 py-2 leading-relaxed">
                          {topic.note}
                        </p>
                      )}
                      <pre className="overflow-x-auto rounded-lg bg-gray-950 text-gray-100 p-4 text-xs leading-relaxed font-mono">
                        <code>{topic.snippet.trim()}</code>
                      </pre>
                      <button
                        type="button"
                        onClick={() => onTryExample?.(topic.snippet.trim())}
                        className="text-xs px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white font-medium"
                      >
                        Try in editor
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </InnerEdgeScroll>
    </section>
  );
}
