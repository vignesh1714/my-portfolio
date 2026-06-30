"use client";

const sectionClass =
  "w-full overflow-hidden border-y border-gray-200/70 bg-gray-50/90 py-5 dark:border-gray-800/60 dark:bg-gray-900/50";

export default function BrandTicker({ brands }) {
  if (!brands?.length) return null;

  const track = [...brands, ...brands];

  return (
    <section aria-label="Brands worked with" className={sectionClass}>
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
        Brands I&apos;ve built for
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-50/95 to-transparent dark:from-gray-900/95" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-50/95 to-transparent dark:from-gray-900/95" />
        <div className="flex w-max animate-ticker motion-reduce:animate-none">
          {track.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="flex shrink-0 items-center gap-3 px-8 text-sm font-semibold text-gray-600 dark:text-gray-300 md:text-base"
            >
              <span className="text-[0.45rem] text-primary-500 dark:text-primary-400" aria-hidden>
                ◆
              </span>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
