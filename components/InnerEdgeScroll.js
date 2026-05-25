"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STRIP_HEIGHT = 36;

/**
 * Inner scroll with dedicated top/bottom hover strips (outside the content area)
 * so accordions and buttons stay clickable.
 */
export default function InnerEdgeScroll({
  children,
  className = "",
  maxHeight = "min(70vh, 560px)",
  scrollSpeed = 10,
}) {
  const containerRef = useRef(null);
  const directionRef = useRef(0);
  const rafRef = useRef(null);
  const pointerDownRef = useRef(false);
  const [activeEdge, setActiveEdge] = useState(null);

  const stopAutoScroll = useCallback(() => {
    directionRef.current = 0;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const el = containerRef.current;
    if (!el || directionRef.current === 0 || pointerDownRef.current) {
      rafRef.current = null;
      return;
    }

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      stopAutoScroll();
      setActiveEdge(null);
      return;
    }

    const next = el.scrollTop + directionRef.current * scrollSpeed;
    el.scrollTop = Math.max(0, Math.min(maxScroll, next));

    if (
      (directionRef.current > 0 && el.scrollTop >= maxScroll) ||
      (directionRef.current < 0 && el.scrollTop <= 0)
    ) {
      stopAutoScroll();
      setActiveEdge(null);
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [scrollSpeed, stopAutoScroll]);

  const startAutoScroll = useCallback(
    (direction, edge) => {
      const el = containerRef.current;
      if (!el || pointerDownRef.current) return;

      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      if (direction > 0 && el.scrollTop >= maxScroll) return;
      if (direction < 0 && el.scrollTop <= 0) return;

      directionRef.current = direction;
      setActiveEdge(edge);
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [tick]
  );

  const handleStripLeave = useCallback(() => {
    setActiveEdge(null);
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handlePointerDown = useCallback(() => {
    pointerDownRef.current = true;
    setActiveEdge(null);
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handlePointerUp = useCallback(() => {
    pointerDownRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      stopAutoScroll();
    };
  }, [handlePointerUp, stopAutoScroll]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50/80 dark:bg-gray-900/50">
        <div
          role="presentation"
          onMouseEnter={() => startAutoScroll(1, "top")}
          onMouseLeave={handleStripLeave}
          onPointerDown={handlePointerDown}
          className={`flex shrink-0 items-center justify-center border-b border-gray-200 dark:border-gray-800 text-xs font-medium transition-colors cursor-default select-none ${
            activeEdge === "top"
              ? "bg-primary-500/15 text-primary-600 dark:text-primary-400"
              : "bg-gray-100/80 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"
          }`}
          style={{ height: STRIP_HEIGHT }}
          aria-label="Hover here to scroll content down"
        >
          Hover here to scroll down ↓
        </div>

        <div
          ref={containerRef}
          className="overflow-y-auto overscroll-contain scroll-smooth"
          style={{ maxHeight: `calc(${maxHeight} - ${STRIP_HEIGHT * 2}px)` }}
          onPointerDown={handlePointerDown}
          role="region"
          aria-label="JavaScript reference list"
        >
          <div className="p-4">{children}</div>
        </div>

        <div
          role="presentation"
          onMouseEnter={() => startAutoScroll(-1, "bottom")}
          onMouseLeave={handleStripLeave}
          onPointerDown={handlePointerDown}
          className={`flex shrink-0 items-center justify-center border-t border-gray-200 dark:border-gray-800 text-xs font-medium transition-colors cursor-default select-none ${
            activeEdge === "bottom"
              ? "bg-primary-500/15 text-primary-600 dark:text-primary-400"
              : "bg-gray-100/80 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"
          }`}
          style={{ height: STRIP_HEIGHT }}
          aria-label="Hover here to scroll content up"
        >
          Hover here to scroll up ↑
        </div>
      </div>

      <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-500">
        Use the <strong>top strip</strong> to scroll down · <strong>bottom strip</strong> to scroll up · wheel works in the list
      </p>
    </div>
  );
}
