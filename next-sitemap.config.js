/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://random-picker-tau.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  
  // 国际化配置
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/en` : 'https://random-picker-tau.vercel.app/en',
      hreflang: 'en',
    },
    {
      href: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/zh` : 'https://random-picker-tau.vercel.app/zh',
      hreflang: 'zh',
    },
    {
      href: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/en` : 'https://random-picker-tau.vercel.app/en',
      hreflang: 'x-default',
    },
  ],

  // robots.txt 配置
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },

  // 变更频率和优先级
  changefreq: 'monthly',
  priority: 1.0,

  // 自动生成最后修改时间
  autoLastmod: true,

  // 排除不需要的路径
  transform: async (config, path) => {
    // 只包含语言路由
    if (path === '/en' || path === '/zh') {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      };
    }

    // 排除其他路径
    return null;
  },
};
