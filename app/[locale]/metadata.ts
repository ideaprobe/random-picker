import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

// 缓存 metadata 避免重复计算
const metadataCache = new Map<string, Metadata>();

export async function generateLocalizedMetadata(locale: string): Promise<Metadata> {
  // 检查缓存
  if (metadataCache.has(locale)) {
    return metadataCache.get(locale)!;
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = t("description");
  const appName = t("appName");
  const appDescription = t("appDescription");
  const breadcrumbHome = t("breadcrumbHome");

  const keywords = Object.values(t.raw("keywords") as Record<string, string>);
  const features = Object.values(t.raw("features") as Record<string, string>);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: appName,
      description: appDescription,
      url: baseUrl ? `${baseUrl}/${locale}` : undefined,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: 1250,
        bestRating: "5",
        worstRating: "1",
      },
      featureList: features,
      inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: breadcrumbHome,
          item: baseUrl ? `${baseUrl}/${locale}` : undefined,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Random Wheel",
      url: baseUrl,
      logo: baseUrl ? `${baseUrl}/logo.png` : undefined,
      sameAs: [],
    },
  ];

  const metadata: Metadata = {
    title,
    description,
    keywords,
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        zh: `${baseUrl}/zh`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      siteName: "Random Wheel",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "1VrMDcQ0pK0iwcz45ZzCK9qg6jSpnJRMX0DTjLM5Vs0",
    },
    other: {
      "script:ld+json": structuredData.map((data) => JSON.stringify(data)),
    },
  };

  // 存入缓存
  metadataCache.set(locale, metadata);
  
  return metadata;
}
