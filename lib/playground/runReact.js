import React from "react";
import { createRoot } from "react-dom/client";
import { createConsole } from "./runJs";

/** Strip export syntax so code can run inside a Function scope. */
export function normalizeReactSource(code) {
  return code
    .replace(/export\s+default\s+function\s+(\w+)/g, "function $1")
    .replace(/export\s+default\s+/g, "")
    .replace(/export\s+function\s+/g, "function ")
    .replace(/export\s+\{[^}]*\}\s*;?/g, "");
}

export async function runReactCode(code, previewElement) {
  const Babel = (await import("@babel/standalone")).default;
  const logs = [];
  const sandboxConsole = createConsole(logs);

  const source = normalizeReactSource(code);
  const body = `${source}\n;return typeof App !== "undefined" ? App : null;`;

  const { code: transformed } = Babel.transform(body, {
    presets: [["react", { runtime: "classic" }]],
    filename: "playground.jsx",
  });

  const getComponent = new Function("React", "console", transformed);
  const Component = getComponent(React, sandboxConsole);

  if (!Component || typeof Component !== "function") {
    throw new Error('Define a component named App, e.g. function App() { return <h1>Hi</h1>; }');
  }

  if (!previewElement) {
    throw new Error("Preview container is not ready.");
  }

  const root = createRoot(previewElement);
  root.render(React.createElement(Component));

  logs.push({ type: "info", text: "React component rendered in preview." });

  return { logs, unmount: () => root.unmount() };
}
