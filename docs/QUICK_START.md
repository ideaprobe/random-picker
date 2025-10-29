# 快速开始指南

## 🚀 5 分钟快速部署

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd random-picker
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 配置环境变量
创建 `.env.local` 文件：
```bash
NEXT_PUBLIC_BASE_URL=https://random-picker-tau.vercel.app
```

### 4. 本地开发
```bash
pnpm dev
```
访问 http://localhost:3758

### 5. 构建和部署
```bash
# 构建（自动生成 sitemap 和 robots.txt）
pnpm build

# 运行 SEO 检查
pnpm seo-check

# 提交到 Git
git add .
git commit -m "Initial commit"
git push

# Vercel 会自动部署
```

## ✅ 部署后检查清单

### 立即检查
- [ ] 访问主页：https://random-picker-tau.vercel.app
- [ ] 测试语言切换：/en 和 /zh
- [ ] 测试轮盘功能
- [ ] 检查移动端响应式

### SEO 检查
- [ ] 访问 sitemap：https://random-picker-tau.vercel.app/sitemap.xml
- [ ] 访问 robots.txt：https://random-picker-tau.vercel.app/robots.txt
- [ ] 运行 PageSpeed Insights
- [ ] 验证结构化数据

### 搜索引擎提交（可选）
- [ ] Google Search Console
- [ ] Bing Webmaster Tools
- [ ] 百度站长平台

## 📝 常用命令

```bash
# 开发
pnpm dev                 # 启动开发服务器（端口 3758）

# 构建
pnpm build              # 构建生产版本 + 生成 sitemap
pnpm start              # 启动生产服务器

# SEO
pnpm postbuild          # 手动生成 sitemap 和 robots.txt
pnpm seo-check          # 运行 SEO 检查

# 代码质量
pnpm lint               # 运行 ESLint
```

## 🔧 配置文件说明

| 文件 | 用途 |
|------|------|
| `.env.local` | 环境变量（不提交到 Git） |
| `next-sitemap.config.js` | Sitemap 配置 |
| `next.config.ts` | Next.js 配置 |
| `middleware.ts` | 语言检测中间件 |
| `i18n/routing.ts` | 国际化路由配置 |

## 🌍 多语言配置

### 添加新语言
1. 在 `messages/` 目录添加新的 JSON 文件（如 `ja.json`）
2. 更新 `i18n/routing.ts` 的 locales 数组
3. 更新 `next-sitemap.config.js` 的 alternateRefs
4. 重新构建项目

### 修改翻译
编辑 `messages/en.json` 或 `messages/zh.json`

## 🎨 自定义样式

### 修改颜色
编辑 `app/[locale]/page.tsx` 中的 `COLORS` 数组

### 修改端口
编辑 `package.json` 中的 dev 脚本：
```json
"dev": "next dev -p 3758"
```

## 🐛 常见问题

### Q: Sitemap 没有生成？
A: 运行 `pnpm build` 或 `pnpm postbuild`

### Q: 语言切换不工作？
A: 检查 middleware.ts 是否正确配置

### Q: 端口被占用？
A: 修改 package.json 中的端口号

### Q: 构建失败？
A: 检查 Node.js 版本（需要 18+）

## 📚 更多文档

- [SEO 优化指南](./SEO.md)
- [部署指南](./DEPLOYMENT.md)
- [项目 README](../README.md)

## 🆘 获取帮助

- 查看 [GitHub Issues](https://github.com/yourusername/random-picker/issues)
- 阅读 [Next.js 文档](https://nextjs.org/docs)
- 阅读 [next-intl 文档](https://next-intl-docs.vercel.app/)
