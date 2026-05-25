"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import JsReferenceGuide from "@/components/JsReferenceGuide";
import { runJsCode } from "@/lib/playground/runJs";

const NextSandpackPreview = dynamic(() => import("@/components/NextSandpackPreview"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[360px] text-sm text-gray-500">
      Loading Next.js preview…
    </div>
  ),
});

const TABS = [
  { id: "js", label: "JS" },
  { id: "react", label: "React" },
  { id: "next", label: "Next.js" },
];

const DEFAULT_CODE = {
  js: `// Write JavaScript below, then click Run (or Ctrl+Enter)
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map((n) => n * 2);

console.log("Original:", nums);
console.log("Doubled:", doubled);
console.log("Sum:", doubled.reduce((a, b) => a + b, 0));

doubled; // last expression is shown as the return value
`,
  react: `// Define a component named App, then click Run
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Hello React</h1>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount((c) => c + 1);
          console.log("Clicked! Count is now", count + 1);
        }}
        style={{
          marginTop: 8,
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          background: "#6366f1",
          color: "white",
          cursor: "pointer",
        }}
      >
        Increment
      </button>
    </div>
  );
}
`,
  next: `// app/page.tsx — Next.js page component
export default function Page() {
  return (
    <main
      style={{
        fontFamily: "system-ui",
        padding: 24,
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Hello Next.js</h1>
      <p style={{ color: "#64748b", lineHeight: 1.6 }}>
        Edit this page component and click Run to refresh the live preview.
      </p>
    </main>
  );
}
`,
};

const lineStyles = {
  log: "text-gray-800 dark:text-gray-200",
  info: "text-blue-600 dark:text-blue-400",
  warn: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
  return: "text-primary-600 dark:text-primary-400",
};

const linePrefix = {
  log: "›",
  info: "i",
  warn: "⚠",
  error: "✕",
  return: "←",
};

export default function JsPlayground() {
  const [activeTab, setActiveTab] = useState("js");
  const [codeByTab, setCodeByTab] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);
  const [nextRunKey, setNextRunKey] = useState(0);
  const [nextPreviewReady, setNextPreviewReady] = useState(false);

  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const reactUnmountRef = useRef(null);

  const code = codeByTab[activeTab];
  const isJs = activeTab === "js";
  const isReact = activeTab === "react";
  const isNext = activeTab === "next";

  const setCode = useCallback(
    (value) => {
      setCodeByTab((prev) => ({
        ...prev,
        [activeTab]: typeof value === "function" ? value(prev[activeTab]) : value,
      }));
    },
    [activeTab]
  );

  const resetCode = () => {
    setCodeByTab((prev) => ({ ...prev, [activeTab]: DEFAULT_CODE[activeTab] }));
    setOutput([]);
    if (isNext) setNextRunKey((k) => k + 1);
  };

  const handleRun = useCallback(async () => {
    setRunning(true);
    setOutput([{ type: "info", text: "Running…" }]);

    try {
      if (isJs) {
        const logs = await runJsCode(code);
        setOutput(logs.length > 0 ? logs : [{ type: "info", text: "(no output)" }]);
      } else if (isReact) {
        reactUnmountRef.current?.();
        reactUnmountRef.current = null;

        const { runReactCode } = await import("@/lib/playground/runReact");
        const { logs, unmount } = await runReactCode(code, previewRef.current);
        reactUnmountRef.current = unmount;
        setOutput(logs);
      } else if (isNext) {
        setNextRunKey((k) => k + 1);
        setNextPreviewReady(true);
        setOutput([
          {
            type: "info",
            text: "Next.js preview updated. Errors appear in the preview panel.",
          },
        ]);
      }
    } catch (err) {
      setOutput([
        {
          type: "error",
          text: err instanceof Error ? err.stack || err.message : String(err),
        },
      ]);
    } finally {
      setRunning(false);
    }
  }, [code, isJs, isReact, isNext]);

  useEffect(() => {
    return () => {
      reactUnmountRef.current?.();
    };
  }, []);

  useEffect(() => {
    reactUnmountRef.current?.();
    reactUnmountRef.current = null;
    setOutput([]);
  }, [activeTab]);

  useEffect(() => {
    if (isNext && !nextPreviewReady) {
      setNextRunKey((k) => k + 1);
      setNextPreviewReady(true);
    }
  }, [isNext, nextPreviewReady]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    const el = editorRef.current;
    el?.addEventListener("keydown", onKeyDown);
    return () => el?.removeEventListener("keydown", onKeyDown);
  }, [handleRun]);

  const outputPlaceholder = isNext
    ? "Run your Next.js page code. The live app preview appears on the right."
    : isReact
      ? "Run your React component. Console output appears here; UI renders in the preview."
      : "Run your code to see console output and return values here.";

  return (
    <div className="space-y-4">
      <div
        className="flex flex-wrap gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 w-fit"
        role="tablist"
        aria-label="Playground language"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 min-h-[480px]">
        <div className="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-soft dark:shadow-soft-dark">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isNext ? "app/page.tsx" : isReact ? "Editor (JSX)" : "Editor"}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={resetCode}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Reset
              </button>
              {!isNext && (
                <button
                  type="button"
                  onClick={() => setOutput([])}
                  className="text-xs px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Clear output
                </button>
              )}
              <button
                type="button"
                onClick={handleRun}
                disabled={running}
                className="text-xs px-4 py-1.5 rounded-md bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-medium"
              >
                {running ? "Running…" : "Run"}
              </button>
            </div>
          </div>
          <textarea
            ref={editorRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 min-h-[360px] lg:min-h-[420px] w-full p-4 font-mono text-sm leading-relaxed bg-gray-950 text-gray-100 resize-y focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            aria-label={`${activeTab} code editor`}
          />
          <p className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-800">
            Ctrl+Enter (⌘+Enter on Mac) to run
          </p>
        </div>

        <div className="flex flex-col gap-4 min-h-[480px]">
          {(isReact || isNext) && (
            <div className="flex flex-col flex-1 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-soft dark:shadow-soft-dark">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isNext ? "Next.js preview" : "React preview"}
                </span>
              </div>
              {isReact && (
                <div
                  ref={previewRef}
                  className="flex-1 min-h-[200px] p-4 overflow-auto bg-white dark:bg-gray-950"
                />
              )}
              {isNext && nextPreviewReady && (
                <NextSandpackPreview code={code} runKey={nextRunKey} />
              )}
            </div>
          )}

          <div
            className={`flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-soft dark:shadow-soft-dark ${
              isJs ? "flex-1" : ""
            }`}
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</span>
            </div>
            <pre
              className={`overflow-auto p-4 font-mono text-sm leading-relaxed bg-gray-50 dark:bg-gray-950 ${
                isJs ? "flex-1 min-h-[360px] lg:min-h-[420px]" : "min-h-[120px] max-h-[200px]"
              }`}
              aria-live="polite"
            >
              {output.length === 0 ? (
                <span className="text-gray-400 dark:text-gray-600">{outputPlaceholder}</span>
              ) : (
                output.map((line, i) => (
                  <div
                    key={i}
                    className={`mb-2 whitespace-pre-wrap break-words ${lineStyles[line.type] || lineStyles.log}`}
                  >
                    <span className="select-none opacity-60 mr-2">
                      {linePrefix[line.type] || "›"}
                    </span>
                    {line.text}
                  </div>
                ))
              )}
            </pre>
          </div>
        </div>
      </div>

      {isJs && (
        <JsReferenceGuide
          onTryExample={(snippet) => {
            setCodeByTab((prev) => ({ ...prev, js: snippet }));
            setOutput([]);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}
