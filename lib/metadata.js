const SITE_TITLE = "Vignesh Sathyamoorthy";
const SITE_DESCRIPTION =
  "Senior Frontend Engineer & Tech Lead — React, Next.js, Shopify, and headless commerce.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yourportfolio.netlify.app";
const SITE_LOGO = "/vignesh-logo.png";

export function buildPageMetadata({ title, description, pathname }) {
  const metaTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const metaDescription = description || SITE_DESCRIPTION;
  const canonical = pathname ? `${SITE_URL}${pathname}` : SITE_URL;
  const logoUrl = `${SITE_URL}${SITE_LOGO}`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    icons: {
      icon: SITE_LOGO,
      apple: SITE_LOGO,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: SITE_TITLE,
      type: "website",
      images: [
        {
          url: logoUrl,
          alt: "Vignesh — Frontend and Shopify Expert",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [logoUrl],
    },
  };
}
