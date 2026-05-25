/** Skills coverflow: always show 3 slides in the viewport. */
export const SKILL_VISIBLE_SLIDES = 3;
export const SKILL_SLIDE_GAP = 20;

/** Slide width so exactly 3 cards fit: (container − 2 gaps) / 3 */
export function getSkillSlideWidth(containerWidth) {
  const gaps = (SKILL_VISIBLE_SLIDES - 1) * SKILL_SLIDE_GAP;
  return Math.max(220, Math.floor((containerWidth - gaps) / SKILL_VISIBLE_SLIDES));
}

/** Local Lottie JSON paths + cinematic card copy per skill category */
export const SKILL_LOTTIE = {
  frontend: "/skills/frontend.json",
  shopify: "/skills/shopify.json",
  cms: "/skills/cms.json",
  performance: "/skills/performance.json",
  integrations: "/skills/integrations.json",
};

export const SKILL_META = {
  frontend: {
    eyebrow: "Frontend Engineering",
    explore: "Explore Frontend",
    watermark: "F",
  },
  shopify: {
    eyebrow: "Commerce Systems",
    explore: "Explore Shopify",
    watermark: "S",
  },
  cms: {
    eyebrow: "Content Architecture",
    explore: "Explore CMS",
    watermark: "C",
  },
  performance: {
    eyebrow: "Speed & Quality",
    explore: "Explore Performance",
    watermark: "P",
  },
  integrations: {
    eyebrow: "Connected Platforms",
    explore: "Explore Integrations",
    watermark: "I",
  },
};
