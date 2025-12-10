import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "./components/Analytics";
import { WebVitals } from "../web-vitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = t("description");
  const appName = t("appName");
  const appDescription = t("appDescription");
  const breadcrumbHome = t("breadcrumbHome");

  // 获取数组数据
  const keywords = Object.values(t.raw("keywords") as Record<string, string>);
  const features = Object.values(t.raw("features") as Record<string, string>);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // 结构化数据
  const structuredData = [
    // WebApplication Schema
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
    // BreadcrumbList Schema
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
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Random Wheel",
      url: baseUrl,
      logo: baseUrl ? `${baseUrl}/logo.png` : undefined,
      sameAs: [],
    },
  ];

  return {
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}
