"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { SKILL_LOTTIE } from "@/lib/skillsLottie";

export default function SkillLottieIcon({ skillKey, className = "" }) {
  const [animationData, setAnimationData] = useState(null);
  const src = SKILL_LOTTIE[skillKey] || SKILL_LOTTIE.frontend;

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!animationData) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-primary-500/10 ${className}`}
        aria-hidden="true"
      >
        <span className="h-10 w-10 animate-pulse rounded-full bg-primary-500/30" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <Lottie animationData={animationData} loop className="h-full w-full" />
    </div>
  );
}
