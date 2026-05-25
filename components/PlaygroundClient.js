"use client";

import dynamic from "next/dynamic";

const PlaygroundContent = dynamic(() => import("@/components/PlaygroundContent"), {
  ssr: false,
  loading: () => (
    <div className="section-container py-32 text-center text-gray-500 dark:text-gray-400">
      Loading playground…
    </div>
  ),
});

export default function PlaygroundClient() {
  return <PlaygroundContent />;
}
