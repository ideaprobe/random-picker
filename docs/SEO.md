# SEO 优化指南

本项目已实施全面的 SEO 优化，以下是详细说明和配置步骤。

## ✅ 已实施的 SEO 优化

### 1. 元数据优化

- ✅ 动态生成的标题和描述（中英文）
- ✅ 关键词优化
- ✅ Open Graph 标签（社交媒体分享）
- ✅ Twitter Card 标签
- ✅ Canonical URLs（规范链接）
- ✅ 语言替代链接（hreflang）

### 2. 国际化 SEO

- ✅ 独立的语言路由（/en, /zh）
- ✅ 自动语言检测和重定向
- ✅ hreflang 标签正确配置
- ✅ 每种语言的独立 metadata

### 3. 技术 SEO

- ✅ robots.txt 文件
- ✅ sitemap.xml（动态生成）
- ✅ manifest.json（PWA 支持）
- ✅ 结构化数据（JSON-LD）
- ✅ 语义化 HTML 标签
- ✅ 响应式设计（移动优先）

### 4. 性能优化

- ✅ 图片优化（AVIF, WebP）
- ✅ 字体优化（display: swap）
- ✅ Gzip 压缩
- ✅ 静态资源缓存
- ✅ 代码分割和懒加载

### 5. 安全性

- ✅ 安全响应头
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy

## 📋 配置步骤

### 1. 设置基础 URL

创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_BASE_URL=https://random-picker-tau.vercel.app
```

### 2. 生成 Sitemap 和 Robots.txt

使用 next-sitemap 自动生成：

```bash
# 构建时自动生成
pnpm build

# 或手动生成
pnpm postbuild
```

生成的文件位于 `public/` 目录：

- `public/sitemap.xml`
- `public/robots.txt`

### 3. 配置搜索引擎验证

在 `app/[locale]/layout.tsx` 中更新验证码：

```typescript
verification: {
  google: "your-google-verification-code",
  yandex: "your-yandex-verification-code",
  bing: "your-bing-verification-code",
},
```

### 4. 提交到搜索引擎

#### Google Search Console

1. 访问 https://search.google.com/search-console
2. 添加网站并验证所有权
3. 提交 sitemap: `https://yourdomain.com/sitemap.xml`

#### Bing Webmaster Tools

1. 访问 https://www.bing.com/webmasters
2. 添加网站并验证
3. 提交 sitemap

#### 百度站长平台

1. 访问 https://ziyuan.baidu.com
2. 添加网站并验证
3. 提交 sitemap

## 🔍 SEO 检查清单

### 上线前检查

- [ ] 设置正确的 `NEXT_PUBLIC_BASE_URL`
- [ ] 更新 robots.txt 中的域名
- [ ] 配置搜索引擎验证码
- [ ] 测试所有语言版本的 metadata
- [ ] 验证 sitemap.xml 可访问
- [ ] 检查 hreflang 标签
- [ ] 测试移动端响应式
- [ ] 验证结构化数据（使用 Google Rich Results Test）

### 上线后检查

- [ ] 提交 sitemap 到各搜索引擎
- [ ] 设置 Google Analytics（可选）
- [ ] 监控 Core Web Vitals
- [ ] 检查索引状态
- [ ] 监控搜索排名

## 🛠️ SEO 工具推荐

### 分析工具

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

### 测试工具

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### SEO 检查工具

- [Ahrefs](https://ahrefs.com/)
- [SEMrush](https://www.semrush.com/)
- [Screaming Frog](https://www.screamingfrog.co.uk/)

## 📊 关键指标

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 其他指标

- **首次内容绘制 (FCP)**: < 1.8s
- **交互时间 (TTI)**: < 3.8s
- **总阻塞时间 (TBT)**: < 200ms

## 🎯 关键词策略

### 英文关键词

- Primary: random wheel, wheel spinner, random picker
- Secondary: decision maker, raffle wheel, spin the wheel
- Long-tail: online random wheel picker, free wheel spinner tool

### 中文关键词

- 主要: 随机轮盘, 在线抽奖, 随机选择器
- 次要: 转盘抽奖, 决策工具, 幸运转盘
- 长尾: 免费在线随机轮盘, 随机抽取工具

## 📈 持续优化建议

1. **内容优化**

   - 添加使用教程页面
   - 创建博客内容
   - 添加常见问题（FAQ）

2. **技术优化**

   - 监控和优化 Core Web Vitals
   - 实施 Service Worker（离线支持）
   - 优化图片和资源加载

3. **链接建设**

   - 社交媒体分享
   - 获取外部链接
   - 内部链接优化

4. **用户体验**
   - 收集用户反馈
   - A/B 测试
   - 持续改进界面

## 🔗 相关文件

- `app/[locale]/layout.tsx` - Metadata 配置
- `next-sitemap.config.js` - Sitemap 配置
- `app/manifest.ts` - PWA Manifest
- `next.config.ts` - Next.js 配置
- `.env.example` - 环境变量示例

## 📝 next-sitemap 配置说明

`next-sitemap.config.js` 提供了强大的 sitemap 生成功能：

- ✅ 自动生成 sitemap.xml 和 robots.txt
- ✅ 支持国际化（hreflang）
- ✅ 自动添加最后修改时间
- ✅ 可自定义优先级和更新频率
- ✅ 支持排除特定路径

构建时会自动在 `public/` 目录生成：

- `public/sitemap.xml` - 网站地图
- `public/robots.txt` - 爬虫规则
