/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  
  // 国际化配置
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
      hreflang: 'en',
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/zh`,
      hreflang: 'zh',
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
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

  // 自定义路径转换
  transform: async (config, path) => {
    // 排除不需要的路径
    if (path.includes('/_not-found') || path.includes('/icon') || path.includes('/manifest')) {
      return null;
    }

    // 包含语言路由
    if (path.includes('/en') || path.includes('/zh')) {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      };
    }

    // 默认返回
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
