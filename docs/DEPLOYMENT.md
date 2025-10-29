# 部署指南

## 🚀 当前部署状态

- **域名**: https://random-picker-tau.vercel.app
- **平台**: Vercel
- **状态**: ✅ 已配置

## 📋 部署后验证清单

### 1. 基础功能测试

- [ ] 访问首页自动重定向到浏览器语言
- [ ] 英文版 `/en` 正常访问
- [ ] 中文版 `/zh` 正常访问
- [ ] 语言切换按钮正常工作
- [ ] 轮盘旋转功能正常
- [ ] 添加/删除选项功能正常
- [ ] 移动端响应式正常

### 2. SEO 验证

- [ ] 访问 https://random-picker-tau.vercel.app/sitemap.xml
- [ ] 访问 https://random-picker-tau.vercel.app/robots.txt
- [ ] 访问 https://random-picker-tau.vercel.app/manifest.json
- [ ] 检查页面 meta 标签（使用浏览器开发者工具）
- [ ] 验证 hreflang 标签

### 3. 性能测试

使用以下工具测试：

#### PageSpeed Insights

```
https://pagespeed.web.dev/analysis?url=https://random-picker-tau.vercel.app
```

目标分数：

- 性能 (Performance): > 90
- 可访问性 (Accessibility): > 90
- 最佳实践 (Best Practices): > 90
- SEO: > 90

#### Lighthouse

在 Chrome DevTools 中运行 Lighthouse 审计

### 4. 搜索引擎提交

#### Google Search Console

1. 访问 https://search.google.com/search-console
2. 添加资源: `https://random-picker-tau.vercel.app`
3. 验证所有权（推荐使用 HTML 标签方法）
4. 提交 sitemap: `https://random-picker-tau.vercel.app/sitemap.xml`
5. 请求索引主要页面

#### Bing Webmaster Tools

1. 访问 https://www.bing.com/webmasters
2. 添加网站并验证
3. 提交 sitemap
4. 配置 URL 检查

#### 百度站长平台（可选）

1. 访问 https://ziyuan.baidu.com
2. 添加网站并验证
3. 提交 sitemap
4. 使用链接提交工具

### 5. 结构化数据验证

#### Google Rich Results Test

```
https://search.google.com/test/rich-results?url=https://random-picker-tau.vercel.app/en
```

验证 JSON-LD 结构化数据是否正确。

#### Schema.org Validator

```
https://validator.schema.org/
```

### 6. 社交媒体预览测试

#### Facebook Sharing Debugger

```
https://developers.facebook.com/tools/debug/?q=https://random-picker-tau.vercel.app
```

#### Twitter Card Validator

```
https://cards-dev.twitter.com/validator
```

### 7. 移动端测试

#### Google Mobile-Friendly Test

```
https://search.google.com/test/mobile-friendly?url=https://random-picker-tau.vercel.app
```

#### 实际设备测试

- [ ] iOS Safari
- [ ] Android Chrome
- [ ] 平板设备

### 8. 浏览器兼容性测试

- [ ] Chrome (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (最新版)
- [ ] Edge (最新版)

## 🔧 Vercel 配置建议

### 环境变量

在 Vercel 项目设置中添加：

```
NEXT_PUBLIC_BASE_URL=https://random-picker-tau.vercel.app
```

### 自定义域名（可选）

如果你有自定义域名：

1. 在 Vercel 项目设置中添加域名
2. 更新 DNS 记录
3. 更新 `.env.local` 中的 `NEXT_PUBLIC_BASE_URL`
4. 更新 `public/robots.txt`
5. 重新部署

### 性能优化设置

- ✅ 自动启用 Edge Network
- ✅ 自动启用 Image Optimization
- ✅ 自动启用 Gzip/Brotli 压缩

## 📊 监控和分析

### 推荐工具

1. **Vercel Analytics** (内置)

   - 访问 Vercel 项目 → Analytics
   - 查看 Core Web Vitals

2. **Google Analytics** (可选)

   - 创建 GA4 属性
   - 添加跟踪代码到项目

3. **Sentry** (可选)
   - 错误监控和性能追踪

## 🐛 常见问题

### 问题 1: Sitemap 404

**解决方案**: 确保已部署最新代码，Vercel 会自动生成 sitemap。

### 问题 2: 语言重定向不工作

**解决方案**: 检查 middleware.ts 是否正确部署。

### 问题 3: 图片加载慢

**解决方案**: 使用 Next.js Image 组件，Vercel 会自动优化。

### 问题 4: 字体闪烁

**解决方案**: 已配置 `display: swap`，这是正常的优化行为。

## 📈 持续优化

### 每周检查

- [ ] 查看 Vercel Analytics
- [ ] 检查 Core Web Vitals
- [ ] 查看错误日志

### 每月检查

- [ ] 查看 Google Search Console 数据
- [ ] 分析搜索关键词
- [ ] 检查索引状态
- [ ] 更新内容（如有需要）

### 每季度检查

- [ ] 运行完整的 Lighthouse 审计
- [ ] 更新依赖包
- [ ] 检查安全漏洞
- [ ] 优化性能

## 🎯 下一步行动

1. **立即执行**

   - [ ] 运行 `pnpm seo-check` 确认配置
   - [ ] 部署到 Vercel
   - [ ] 验证所有页面正常访问

2. **24 小时内**

   - [ ] 提交到 Google Search Console
   - [ ] 运行 PageSpeed Insights
   - [ ] 测试移动端

3. **一周内**
   - [ ] 提交到 Bing Webmaster Tools
   - [ ] 监控索引状态
   - [ ] 收集用户反馈

## 📞 支持资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [next-intl 文档](https://next-intl-docs.vercel.app/)
- [Google Search Console 帮助](https://support.google.com/webmasters)

---

**最后更新**: 2025-10-29
**域名**: https://random-picker-tau.vercel.app
