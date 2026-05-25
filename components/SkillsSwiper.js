"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import SkillLottieIcon from "@/components/SkillLottieIcon";
import {
  SKILL_META,
  SKILL_SLIDE_GAP,
  SKILL_VISIBLE_SLIDES,
  getSkillSlideWidth,
} from "@/lib/skillsLottie";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const LOOP_MIN_SLIDES = SKILL_VISIBLE_SLIDES * 2;

function getCenterIndex(count) {
  return Math.floor(count / 2);
}

function isSwiperAlive(swiper) {
  return Boolean(swiper && !swiper.destroyed && swiper.params);
}

function safeLoopFix(swiper) {
  if (!isSwiperAlive(swiper) || !swiper.params.loop) return;
  try {
    swiper.loopFix();
  } catch {
    /* loop clones not ready yet (Strict Mode remount / coverflow init) */
  }
}

function applySlideStacking(swiper) {
  if (!isSwiperAlive(swiper) || !swiper.slides?.length) return;
  swiper.slides.forEach((slideEl) => {
    const abs = Math.min(Math.abs(slideEl.progress ?? 0), 2.5);
    slideEl.style.zIndex = String(100 - Math.round(abs * 24));
  });
}

function centerSwiper(swiper, index, useLoop) {
  if (!isSwiperAlive(swiper)) return;
  if (useLoop && swiper.params.loop) {
    try {
      swiper.slideToLoop(index, 0, false);
      return;
    } catch {
      /* fall through */
    }
  }
  swiper.slideTo(index, 0, false);
}

function SkillCard({ skillKey, title, items }) {
  const meta = SKILL_META[skillKey] || {
    eyebrow: "Skill",
    explore: "Explore",
    watermark: "V",
  };

  return (
    <article className="skill-swiper-card group relative flex min-h-[400px] w-full flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white">
      <div
        className="skill-swiper-watermark pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-bold leading-none text-gray-100"
        style={{ fontSize: "7.5rem" }}
        aria-hidden="true"
      >
        {meta.watermark}
      </div>

      <div className="skill-swiper-card-bg pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-50/90 via-white/50 to-violet-50/60" />

      <div className="relative z-10 flex min-h-[400px] flex-1 flex-col p-5 pb-6 md:p-6 md:pb-7">
        <div className="mb-3 shrink-0">
          <p className="skill-swiper-eyebrow text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-600">
            {meta.eyebrow}
          </p>
          <h3 className="skill-swiper-title mt-1.5 text-base font-bold leading-tight text-gray-900 md:text-lg">
            {title}
          </h3>
        </div>

        <ul className="skill-swiper-list flex min-h-0 flex-1 flex-col gap-2 overflow-hidden py-1">
          {items.slice(0, 3).map((item, i) => (
            <li key={i} className="skill-swiper-list-item border-l-2 border-primary-400/50 pl-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-0.5 text-sm font-medium leading-snug text-gray-700 dark:text-gray-200">
                {item}
              </p>
            </li>
          ))}
        </ul>

        <div className="skill-swiper-footer mt-auto flex shrink-0 items-end justify-between gap-3 border-t border-gray-200/80 pt-4 dark:border-gray-700/80">
          <Link
            href="/skills"
            className="skill-explore-btn inline-flex min-h-[40px] shrink-0 items-center whitespace-nowrap rounded-full border border-gray-200 bg-gradient-to-b from-white to-gray-50 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-800 shadow-sm transition-all hover:border-primary-300 hover:from-primary-50 hover:text-primary-700"
          >
            {meta.explore}
          </Link>

          <div className="skill-swiper-icon-box relative h-[68px] w-[68px] shrink-0 rounded-xl border border-gray-100 bg-gray-50 p-1 shadow-sm">
            <SkillLottieIcon skillKey={skillKey} className="relative h-full w-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SkillsSwiper({ skills }) {
  const entries = Object.entries(skills);
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(320);

  const slides = useMemo(
    () =>
      entries.map(([key, data]) => ({
        key,
        skillKey: key,
        title: data.title,
        items: data.items,
      })),
    [entries]
  );

  const skillCount = slides.length;
  const centerIndex = getCenterIndex(skillCount);
  const enableLoop = skillCount > 1;

  /** Swiper loop needs at least slidesPerView × 2 slides (3 × 2 = 6); we have 5. */
  const swiperSlides = useMemo(() => {
    if (slides.length >= LOOP_MIN_SLIDES) return slides;
    return [...slides, ...slides];
  }, [slides]);

  const measureContainer = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const nextWidth = getSkillSlideWidth(el.offsetWidth);
    setSlideWidth((prev) => (prev === nextWidth ? prev : nextWidth));
  }, []);

  useLayoutEffect(() => {
    measureContainer();
    setActiveIndex(centerIndex);
  }, [centerIndex, measureContainer]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      measureContainer();
      const swiper = swiperRef.current;
      if (!swiper) return;
      swiper.update();
      safeLoopFix(swiper);
      applySlideStacking(swiper);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureContainer]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!isSwiperAlive(swiper)) return;
    swiper.update();
    safeLoopFix(swiper);
    applySlideStacking(swiper);
  }, [slideWidth]);

  const initSwiper = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      centerSwiper(swiper, centerIndex, enableLoop);
      safeLoopFix(swiper);
      applySlideStacking(swiper);
      setActiveIndex(centerIndex);
    },
    [centerIndex, enableLoop]
  );

  const goTo = (index, speed = 700) => {
    const swiper = swiperRef.current;
    if (!isSwiperAlive(swiper)) return;
    if (enableLoop && swiper.params.loop) {
      swiper.slideToLoop(index, speed);
    } else {
      swiper.slideTo(index, speed);
    }
  };

  if (skillCount === 0) return null;

  const realActiveIndex = activeIndex % skillCount;

  return (
    <div ref={containerRef} className="skills-swiper-wrap relative w-full overflow-hidden">
      <div className="skills-swiper skills-perspective-stage relative w-full">
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop={enableLoop}
          loopAdditionalSlides={SKILL_VISIBLE_SLIDES}
          slidesPerView="auto"
          spaceBetween={SKILL_SLIDE_GAP}
          speed={700}
          slideToClickedSlide
          watchSlidesProgress
          observer
          observeParents
          coverflowEffect={{
            rotate: 18,
            stretch: 0,
            depth: 100,
            modifier: 1,
            scale: 0.94,
            slideShadows: false,
          }}
          autoplay={
            enableLoop
              ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          navigation={{
            prevEl: ".skills-nav-prev",
            nextEl: ".skills-nav-next",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onAfterInit={initSwiper}
          onProgress={(swiper) => applySlideStacking(swiper)}
          onSlideChange={(swiper) => {
            const idx = enableLoop ? swiper.realIndex : swiper.activeIndex;
            setActiveIndex(idx % skillCount);
          }}
          onSlideChangeTransitionEnd={(swiper) => {
            safeLoopFix(swiper);
            applySlideStacking(swiper);
          }}
          onResize={(swiper) => {
            if (!isSwiperAlive(swiper)) return;
            swiper.update();
            safeLoopFix(swiper);
            applySlideStacking(swiper);
          }}
          className="skills-coverflow-swiper !overflow-visible !pb-8"
          style={{ "--skill-slide-width": `${slideWidth}px` }}
        >
          {swiperSlides.map((slide, i) => (
            <SwiperSlide
              key={`${slide.key}-${i}`}
              className="skills-swiper-slide !h-auto"
              style={{ width: slideWidth, maxWidth: "100%" }}
            >
              <SkillCard skillKey={slide.skillKey} title={slide.title} items={slide.items} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className="skills-nav-prev absolute left-3 top-[42%] z-30 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 text-gray-700 shadow-md transition hover:border-primary-300 sm:left-6 md:left-10 lg:left-16"
          aria-label="Previous skill"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          className="skills-nav-next absolute right-3 top-[42%] z-30 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 text-gray-700 shadow-md transition hover:border-primary-300 sm:right-6 md:right-10 lg:right-16"
          aria-label="Next skill"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="mt-8 flex flex-col items-center gap-3">
          {skillCount > 1 && (
            <div className="skills-pagination flex items-center justify-center gap-2">
              {entries.map(([key], index) => (
                <button
                  key={key}
                  type="button"
                  aria-label={`Go to ${key}`}
                  aria-current={realActiveIndex === index ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    realActiveIndex === index
                      ? "w-6 bg-gradient-to-r from-indigo-500 to-violet-500"
                      : "w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {skillCount} skills · {SKILL_VISIBLE_SLIDES} visible
          </p>
        </div>
      </div>
    </div>
  );
}
