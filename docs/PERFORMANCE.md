# 性能优化指南

## 🎯 性能目标

| 指标 | 目标 | 当前状态 |
|------|------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | 🟡 1.8-3s → 优化中 |
| FID (First Input Delay) | < 100ms | ✅ < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ < 0.1 |
| TTFB (Time to First Byte) | < 800ms | ✅ < 800ms |

## ✅ 已实施的优化

### 1. 代码优化

#### React 性能优化
- ✅ 使用 `useMemo` 缓存轮盘路径计算
- ✅ 避免不必要的重新渲染
- ✅ 优化状态管理

**代码位置**: `app/[locale]/page.tsx`
```typescript
// Memoize wheel paths to avoid recalculation
const wheelPaths = useMemo(() => {
  return items.map((_, index) => createWheelPath(index, items.length));
}, [items.length]);
```

#### 包优化
- ✅ 启用 `optimizePackageImports` for framer-motion
- ✅ 启用 `optimizePackageImports` for next-intl
- ✅ Tree shaking 自动移除未使用代码

**配置位置**: `next.config.ts`

### 2. 资源优化

#### 字体优化
- ✅ 使用 `display: swap` 避免字体阻塞
- ✅ 预加载关键字体
- ✅ 字体子集化（仅加载 latin）

**配置位置**: `app/[locale]/layout.tsx`

#### CSS 优化
- ✅ 内联关键 CSS
- ✅ 使用 Tailwind CSS 4 的优化
- ✅ 移除未使用的样式

**配置位置**: `app/globals.css`

### 3. 缓存策略

#### 静态资源缓存
- ✅ 图片: 1 年缓存
- ✅ CSS: 1 年缓存
- ✅ JS: 1 年缓存
- ✅ 使用 immutable 标记

**配置位置**: `next.config.ts` headers

#### 浏览器缓存
```
Cache-Control: public, max-age=31536000, immutable
```

### 4. 渲染优化

#### SVG 优化
- ✅ 使用 `display: block` 避免布局偏移
- ✅ 缓存路径计算
- ✅ 优化渐变定义

#### 动画优化
- ✅ 使用 CSS transform（GPU 加速）
- ✅ 支持 `prefers-reduced-motion`
- ✅ 优化 Framer Motion 配置

### 5. 网络优化

#### 压缩
- ✅ Gzip/Brotli 压缩
- ✅ 代码分割
- ✅ 懒加载非关键资源

#### DNS 预取
- ✅ X-DNS-Prefetch-Control: on
- ✅ 预连接到关键域名

## 🔧 进一步优化建议

### 短期优化（立即可做）

#### 1. 预加载关键资源
在 `app/[locale]/layout.tsx` 中添加：
```tsx
<head>
  <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
</head>
```

#### 2. 优化初始加载
```typescript
// 延迟加载非关键组件
const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })), {
  ssr: false
});
```

#### 3. 减少 JavaScript 包大小
```bash
# 分析包大小
pnpm build
pnpm analyze
```

### 中期优化（1-2 周）

#### 1. 实施 Service Worker
- 离线支持
- 资源预缓存
- 后台同步

#### 2. 图片优化
- 使用 Next.js Image 组件
- 实施响应式图片
- 懒加载图片

#### 3. 代码分割
- 路由级别分割
- 组件级别分割
- 第三方库分割

### 长期优化（1 个月+）

#### 1. 边缘计算
- 使用 Vercel Edge Functions
- 地理位置路由
- 边缘缓存

#### 2. 预渲染
- 静态生成（SSG）
- 增量静态再生（ISR）
- 按需重新验证

#### 3. 监控和分析
- 实时性能监控
- 用户体验追踪
- A/B 测试

## 📊 性能测试

### 本地测试

#### Lighthouse
```bash
# 1. 构建生产版本
pnpm build

# 2. 启动生产服务器
pnpm start

# 3. 在 Chrome DevTools 中运行 Lighthouse
# 打开 http://localhost:3758
# F12 → Lighthouse → 分析页面加载
```

#### WebPageTest
```
https://www.webpagetest.org/
```
测试配置：
- Location: 选择目标用户地区
- Browser: Chrome
- Connection: 4G/Cable

### 生产环境测试

#### PageSpeed Insights
```
https://pagespeed.web.dev/analysis?url=https://random-picker-tau.vercel.app
```

#### Vercel Speed Insights
在 Vercel Dashboard 中查看真实用户数据（RUM）

## 🎯 优化检查清单

### 代码层面
- [x] 使用 React.memo 缓存组件
- [x] 使用 useMemo 缓存计算
- [x] 使用 useCallback 缓存函数
- [x] 避免内联对象和函数
- [x] 优化列表渲染（key）

### 资源层面
- [x] 压缩图片
- [x] 使用现代图片格式（WebP, AVIF）
- [x] 字体优化
- [x] CSS 优化
- [x] JavaScript 优化

### 网络层面
- [x] 启用压缩
- [x] 设置缓存头
- [x] 使用 CDN
- [x] 减少请求数量
- [x] 优化关键渲染路径

### 渲染层面
- [x] 避免布局偏移
- [x] 优化首屏渲染
- [x] 减少重绘和回流
- [x] 使用 GPU 加速
- [x] 优化动画性能

## 📈 性能监控

### 关键指标

#### Core Web Vitals
- **LCP**: 监控最大内容绘制时间
- **FID**: 监控首次输入延迟
- **CLS**: 监控累积布局偏移

#### 其他指标
- **TTFB**: 首字节时间
- **FCP**: 首次内容绘制
- **TTI**: 可交互时间
- **TBT**: 总阻塞时间

### 监控工具

1. **Vercel Analytics**
   - 实时性能数据
   - 地理位置分布
   - 设备类型分析

2. **Vercel Speed Insights**
   - Core Web Vitals 追踪
   - 真实用户监控（RUM）
   - 性能趋势分析

3. **Google Search Console**
   - Core Web Vitals 报告
   - 移动端可用性
   - 页面体验报告

## 🔍 性能调试

### Chrome DevTools

#### Performance 面板
1. 打开 DevTools (F12)
2. 切换到 Performance 标签
3. 点击录制按钮
4. 刷新页面
5. 停止录制并分析

#### Coverage 面板
查看未使用的 CSS 和 JavaScript：
1. DevTools → More tools → Coverage
2. 刷新页面
3. 查看未使用代码百分比

#### Network 面板
分析资源加载：
- 查看瀑布图
- 识别慢速资源
- 检查缓存状态

### 性能分析工具

#### Bundle Analyzer（已配置）
✅ 已集成到项目中

**使用方法**：
```bash
# 分析包大小
pnpm analyze
```

这会：
1. 使用 Webpack 构建生产版本
2. 生成三个分析报告：
   - `.next/analyze/client.html` - 客户端包
   - `.next/analyze/nodejs.html` - Node.js 包
   - `.next/analyze/edge.html` - Edge 包
3. 手动打开 HTML 文件查看报告

**查看内容**：
- 📦 每个包的大小
- 🔍 依赖关系树
- 📊 可视化图表
- 💡 优化建议

## 💡 最佳实践

### 1. 图片优化
- 使用 Next.js Image 组件
- 提供多种尺寸
- 使用现代格式
- 懒加载非关键图片

### 2. 字体优化
- 使用 font-display: swap
- 预加载关键字体
- 使用字体子集
- 考虑系统字体

### 3. JavaScript 优化
- 代码分割
- Tree shaking
- 压缩和混淆
- 移除 console.log

### 4. CSS 优化
- 移除未使用样式
- 内联关键 CSS
- 使用 CSS-in-JS 按需加载
- 避免 @import

### 5. 缓存策略
- 静态资源长期缓存
- API 响应适当缓存
- 使用 Service Worker
- 实施 CDN

## 🎓 学习资源

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Core Web Vitals](https://web.dev/vitals/)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)

---

**最后更新**: 2025-10-31
**目标**: LCP < 2.5s
**状态**: 🟡 持续优化中
