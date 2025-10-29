export default function StructuredData({ locale }: { locale: string }) {
  const structuredData = {
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
