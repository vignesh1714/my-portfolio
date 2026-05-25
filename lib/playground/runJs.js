export function formatValue(value) {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "function") return value.toString();
  if (typeof value === "bigint") return `${value}n`;
  if (value instanceof Error) return value.stack || value.message;
  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

export function createConsole(logs) {
  const append = (type, args) => {
    logs.push({
      type,
      text: args.map(formatValue).join(" "),
    });
  };

  return {
    log: (...args) => append("log", args),
    info: (...args) => append("info", args),
    warn: (...args) => append("warn", args),
    error: (...args) => append("error", args),
  };
}

export async function runJsCode(code) {
  const logs = [];
  const sandboxConsole = createConsole(logs);

  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const wrapped = `"use strict";\nreturn (async () => {\n${code}\n})();`;
  const runner = new AsyncFunction("console", wrapped);

  const result = await runner(sandboxConsole);

  if (result !== undefined) {
    logs.push({ type: "return", text: formatValue(result) });
  }

  return logs;
}
