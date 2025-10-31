import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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

  const title = locale === "zh"
    ? "随机轮盘 - 在线随机抽取工具 | Random Wheel"
    : "Random Wheel - Online Random Picker Tool | 随机轮盘";

  const description = locale === "zh"
    ? "免费在线随机轮盘抽取工具，支持自定义选项，流畅动画效果。适用于抽奖、决策、游戏等场景。无需下载，即开即用。"
    : "Free online random wheel picker tool with customizable options and smooth animations. Perfect for raffles, decision making, and games. No download required.";

  const keywords = locale === "zh"
    ? ["随机轮盘", "在线抽奖", "随机选择器", "转盘抽奖", "决策工具", "随机抽取", "幸运转盘", "抽奖工具"]
    : ["random wheel", "wheel spinner", "random picker", "decision maker", "raffle wheel", "spin the wheel", "random selector", "lucky wheel"];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://random-picker-tau.vercel.app";

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
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
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
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
      <head>
        <meta name="description" content={locale === "zh" 
          ? "免费在线随机轮盘抽取工具，支持自定义选项，流畅动画效果。适用于抽奖、决策、游戏等场景。无需下载，即开即用。"
          : "Free online random wheel picker tool with customizable options and smooth animations. Perfect for raffles, decision making, and games. No download required."
        } />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: locale === "zh" ? "随机轮盘" : "Random Wheel",
              description:
                locale === "zh"
                  ? "免费在线随机轮盘抽取工具，支持自定义选项，流畅动画效果"
                  : "Free online random wheel picker tool with customizable options and smooth animations",
              url: `https://random-picker-tau.vercel.app/${locale}`,
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              inLanguage: locale === "zh" ? "zh-CN" : "en-US",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
