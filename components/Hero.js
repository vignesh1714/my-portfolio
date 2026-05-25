"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodingIconsBackground from "@/components/CodingIconsBackground";
import HeroCodeTyper from "@/components/HeroCodeTyper";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ name, title, tagline, intro, showCta = true }) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const codePanelRef = useRef(null);
  const codeStageRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gradientTween = gsap.to(".hero-animated-gradient, .hero-animated-gradient-subtle", {
      backgroundPosition: "200% center",
      duration: 7,
      repeat: -1,
      ease: "none",
      paused: prefersReducedMotion,
    });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;
        if (!isDesktop || reduceMotion) return undefined;

        const section = sectionRef.current;
        const pin = pinRef.current;
        const codePanel = codePanelRef.current;
        const codeStage = codeStageRef.current;
        const hint = hintRef.current;

        if (!section || !pin || !codePanel || !codeStage) return undefined;

        gsap.set(codeStage, { perspective: 1600, perspectiveOrigin: "65% 50%" });
        gsap.set(codePanel, {
          transformOrigin: "75% 50%",
          transformStyle: "preserve-3d",
          scale: 0.86,
          xPercent: 50,
          z: 0,
          force3D: true,
          boxShadow: "0 24px 48px -16px rgba(0, 0, 0, 0.35)",
        });

        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=85%",
            pin,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTimeline.to(
          codePanel,
          {
            scale: 1.08,
            xPercent: 42,
            z: 120,
            boxShadow:
              "0 50px 100px -20px rgba(0, 0, 0, 0.55), 0 28px 56px -16px rgba(99, 102, 241, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.08)",
            ease: "power2.out",
            duration: 0.85,
          },
          0
        );

        if (hint) {
          scrollTimeline.to(hint, { opacity: 0, y: 8, duration: 0.2 }, 0.65);
        }

        return () => {
          scrollTimeline.scrollTrigger?.kill();
          scrollTimeline.kill();
        };
      }
    );

    return () => {
      gradientTween.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-scroll-section relative w-full border-b border-gray-200/60 dark:border-gray-800/60"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <CodingIconsBackground />

        {/* Extra blend layer over the seam between copy and code */}
        <div
          className="pointer-events-none absolute inset-y-0 left-[42%] z-[8] w-[12%] bg-gradient-to-r from-white via-white/40 to-transparent dark:from-surface-dark dark:via-surface-dark/40"
          aria-hidden="true"
        />

        <motion.div
          className="absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-primary-400/10 blur-3xl dark:bg-primary-500/15"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full w-full items-center">
          {/* Left 50% — hero copy */}
          <div className="flex h-full w-full shrink-0 items-center px-5 sm:px-8 lg:w-1/2 lg:max-w-[50vw] lg:pl-10 xl:pl-14 2xl:pl-16">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="relative z-30 w-full"
            >
              <motion.div variants={item} className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-600 backdrop-blur-sm dark:bg-gray-900/70 dark:text-primary-300">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Available for opportunities
                </span>
              </motion.div>

              <motion.p
                variants={item}
                className="hero-animated-gradient-subtle mb-3 text-sm font-medium uppercase tracking-[0.2em]"
              >
                Hello, I&apos;m
              </motion.p>

              <motion.h1
                variants={item}
                className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.25rem] xl:text-5xl"
              >
                <span className="hero-animated-gradient">{name}</span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:text-lg"
              >
                {title}
              </motion.p>

              <motion.p
                variants={item}
                className="mb-5 text-sm font-medium text-primary-600 dark:text-primary-400 sm:text-base"
              >
                {tagline}
              </motion.p>

              {intro && (
                <motion.p
                  variants={item}
                  className="mb-7 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base"
                >
                  {intro}
                </motion.p>
              )}

              {showCta && (
                <motion.div variants={item} className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all hover:bg-primary-600"
                  >
                    View Projects →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-xl border border-gray-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all hover:border-primary-400 dark:border-gray-600 dark:bg-gray-900/80 dark:text-gray-200"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>

        </div>

        {/* Right 50% — half snippet off-screen; scroll zoom + 3D shadow */}
        <div
          ref={codeStageRef}
          className="pointer-events-none absolute inset-y-0 left-1/2 right-0 z-10 hidden overflow-hidden lg:block"
        >
          <div
            ref={codePanelRef}
            className="hero-code-panel pointer-events-auto absolute top-1/2 right-0 w-[min(58vw,640px)] -translate-y-1/2 rounded-2xl will-change-transform"
          >
            <HeroCodeTyper large />
          </div>
        </div>

        {/* Mobile */}
        <div className="section-container relative z-20 pb-8 lg:hidden">
          <HeroCodeTyper />
        </div>

        <p
          ref={hintRef}
          className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400 lg:block"
        >
          Scroll to continue
        </p>
      </div>
    </section>
  );
}
