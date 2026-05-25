import Link from "next/link";

export default function Logo({ linkClassName = "" }) {
  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 flex-col gap-0.5 leading-none hover:opacity-90 transition-opacity ${linkClassName}`}
    >
      <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white sm:text-xl">
        Vignesh Developer
      </span>
      <span className="text-[10px] font-normal leading-snug text-gray-500 dark:text-gray-400 sm:text-[11px]">
        Frontend developer | Shopify expert
      </span>
    </Link>
  );
}
