import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const locales = ['en', 'zh'];

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        zh: `${baseUrl}/zh`,
        'x-default': `${baseUrl}/en`,
      },
    },
  }));
}
