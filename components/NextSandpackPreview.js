"use client";

import { Sandpack } from "@codesandbox/sandpack-react";

export default function NextSandpackPreview({ code, runKey }) {
  return (
    <div className="h-full min-h-[360px] sandpack-playground">
      <Sandpack
        key={runKey}
        template="nextjs"
        theme="dark"
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: true,
          editorHeight: 0,
          layout: "preview",
          classes: {
            "sp-wrapper": "h-full !rounded-none !border-0",
            "sp-preview": "h-full min-h-[340px]",
          },
        }}
        files={{
          "/app/page.tsx": {
            code,
            active: true,
          },
        }}
      />
    </div>
  );
}
