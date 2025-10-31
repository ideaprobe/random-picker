# Bundle 分析指南

## 📦 Bundle Analyzer

项目已集成 `@next/bundle-analyzer`，可以可视化分析打包后的文件大小。

## 🚀 使用方法

### 运行分析

```bash
# 方法 1: 使用 npm script（推荐）
pnpm analyze

# 方法 2: 使用环境变量
ANALYZE=true next build --webpack
```

**注意**: Next.js 16 默认使用 Turbopack，但 Bundle Analyzer 需要 Webpack。因此必须添加 `--webpack` 标志。

### 查看报告

运行后会自动在浏览器中打开两个报告：

1. **Client Bundle** - 客户端 JavaScript 包
2. **Server Bundle** - 服务端 JavaScript 包

## 📊 报告解读

### 可视化图表

报告以树状图显示：

- **大小**: 方块越大，文件越大
- **颜色**: 不同颜色代表不同的包
- **层级**: 显示依赖关系

### 关键指标

#### Stat Size

- 原始文件大小（未压缩）
- 用于了解源代码大小

#### Parsed Size

- 解析后的大小
- 实际加载到浏览器的大小

#### Gzipped Size

- Gzip 压缩后的大小
- **最重要的指标**（实际传输大小）

## 🔍 分析要点

### 1. 识别大型依赖

查找占用空间最大的包：

- `framer-motion` - 动画库
- `next-intl` - 国际化
- `react` / `react-dom` - React 核心

### 2. 检查重复依赖

如果看到相同的包出现多次：

- 可能是版本冲突
- 需要统一依赖版本

### 3. 查找未使用的代码

大型包中可能包含未使用的功能：

- 考虑使用更轻量的替代品
- 或者只导入需要的部分

## 📈 优化建议

### 当前项目分析

#### 主要依赖大小（预估）

| 包名                   | Gzipped 大小 | 优化建议                         |
| ---------------------- | ------------ | -------------------------------- |
| framer-motion          | ~30KB        | ✅ 已启用 optimizePackageImports |
| next-intl              | ~15KB        | ✅ 已启用 optimizePackageImports |
| react + react-dom      | ~45KB        | ✅ 核心依赖，无需优化            |
| @vercel/analytics      | ~5KB         | ✅ 轻量级                        |
| @vercel/speed-insights | ~5KB         | ✅ 轻量级                        |

**总计**: ~100KB (Gzipped)

### 优化策略

#### 1. 代码分割

```typescript
// 动态导入非关键组件
const Analytics = dynamic(() => import("@vercel/analytics/react"), {
  ssr: false,
});
```

#### 2. Tree Shaking

确保只导入需要的功能：

```typescript
// ❌ 不好
import * as motion from "framer-motion";

// ✅ 好
import { motion } from "framer-motion";
```

#### 3. 移除未使用的依赖

定期检查 `package.json`：

```bash
# 检查未使用的依赖
pnpm dlx depcheck
```

## 🎯 性能目标

### JavaScript 包大小目标

| 类型          | 目标    | 当前   | 状态    |
| ------------- | ------- | ------ | ------- |
| First Load JS | < 200KB | ~150KB | ✅ 优秀 |
| Total Bundle  | < 500KB | ~300KB | ✅ 优秀 |

### 优化检查清单

- [x] 启用 `optimizePackageImports`
- [x] 使用动态导入
- [x] Tree shaking 配置
- [x] 代码分割
- [x] 移除未使用代码
- [ ] 考虑 CDN 加载大型库
- [ ] 实施懒加载策略

## 📝 实际案例

### 案例 1: 优化 framer-motion

**问题**: framer-motion 包含很多未使用的功能

**解决方案**:

```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ['framer-motion'],
}
```

**结果**: 减少 ~20% 包大小

### 案例 2: 优化 next-intl

**问题**: 加载了所有语言的翻译

**解决方案**:

```typescript
// 只在需要时加载翻译
const messages = await import(`../messages/${locale}.json`);
```

**结果**: 减少初始加载大小

## 🔧 高级分析

### 使用 webpack-bundle-analyzer

如果需要更详细的分析：

```bash
# 安装
pnpm add -D webpack-bundle-analyzer

# 在 next.config.ts 中配置
// 已经配置好了，直接使用 pnpm analyze
```

### 分析特定路由

```bash
# 构建并分析
pnpm build

# 查看 .next/analyze/ 目录
ls -lh .next/analyze/
```

## 📊 持续监控

### 1. 设置大小预算

在 `package.json` 中：

```json
{
  "bundlesize": [
    {
      "path": ".next/static/chunks/*.js",
      "maxSize": "200 KB"
    }
  ]
}
```

### 2. CI/CD 集成

在 GitHub Actions 中：

```yaml
- name: Analyze bundle
  run: pnpm analyze

- name: Check bundle size
  run: pnpm bundlesize
```

### 3. 定期审查

- 每次添加新依赖后运行分析
- 每月审查一次包大小
- 设置告警阈值

## 💡 最佳实践

### 1. 依赖选择

- 优先选择轻量级库
- 检查包大小：https://bundlephobia.com
- 考虑替代方案

### 2. 导入优化

```typescript
// ❌ 导入整个库
import _ from "lodash";

// ✅ 只导入需要的函数
import debounce from "lodash/debounce";
```

### 3. 动态导入

```typescript
// 非关键功能延迟加载
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
```

### 4. 代码分割

```typescript
// 路由级别分割（Next.js 自动处理）
// 组件级别分割（使用 dynamic）
```

## 🔗 相关资源

- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Bundle Phobia](https://bundlephobia.com/)
- [Package Phobia](https://packagephobia.com/)

## 📞 故障排除

### 问题 1: 分析报告没有打开

**解决方案**: 手动打开 `.next/analyze/client.html`

### 问题 2: 分析时间过长

**解决方案**: 这是正常的，分析需要完整构建

### 问题 3: 报告显示不正确

**解决方案**: 清理缓存后重新构建

```bash
rm -rf .next
pnpm analyze
```

---

**最后更新**: 2025-10-31
**工具**: @next/bundle-analyzer v16.0.1
**状态**: ✅ 已配置并可用


## 📞 故障排除

### 问题 1: 分析报告没有打开
**解决方案**: 手动打开 `.next/analyze/client.html`

### 问题 2: 分析时间过长
**解决方案**: 这是正常的，分析需要完整构建

### 问题 3: 报告显示不正确
**解决方案**: 清理缓存后重新构建
```bash
rm -rf .next
pnpm analyze
```

### 问题 4: 提示 "not compatible with Turbopack"
**原因**: Next.js 16 默认使用 Turbopack，Bundle Analyzer 还不支持

**解决方案**: 已在 `package.json` 中配置 `--webpack` 标志
```bash
pnpm analyze  # 自动使用 webpack
```

---

**最后更新**: 2025-10-31
**工具**: @next/bundle-analyzer v16.0.1
**状态**: ✅ 已配置并可用
**注意**: 需要使用 `--webpack` 标志（已自动配置）
