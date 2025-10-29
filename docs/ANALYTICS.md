# Analytics 使用指南

## 📊 Vercel Analytics

### 概述
Vercel Analytics 已集成到项目中，无需额外配置。部署到 Vercel 后自动启用。

### 功能特性

#### 1. 页面浏览量
- 实时页面访问统计
- 按路径分组的访问量
- 时间范围筛选

#### 2. 访客分析
- 独立访客数
- 新访客 vs 回访访客
- 访问时长统计

#### 3. 地理位置
- 访客国家/地区分布
- 城市级别数据
- 语言偏好统计

#### 4. 设备信息
- 桌面 vs 移动端比例
- 浏览器类型分布
- 操作系统统计

#### 5. 流量来源
- 直接访问
- 搜索引擎
- 社交媒体
- 外部链接

### 查看数据

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目 "random-picker"
3. 点击顶部导航栏的 "Analytics"
4. 选择时间范围（24h, 7d, 30d, 90d）

### 数据保留
- **Hobby 计划**: 保留 30 天
- **Pro 计划**: 保留 90 天
- **Enterprise 计划**: 自定义保留期

## ⚡ Vercel Speed Insights

### 概述
Speed Insights 监控真实用户的性能数据（Real User Monitoring, RUM）。

### Core Web Vitals

#### LCP (Largest Contentful Paint)
**最大内容绘制时间**

- **优秀**: < 2.5s
- **需要改进**: 2.5s - 4.0s
- **差**: > 4.0s

**优化建议**：
- 优化图片加载
- 使用 CDN
- 减少服务器响应时间

#### FID (First Input Delay)
**首次输入延迟**

- **优秀**: < 100ms
- **需要改进**: 100ms - 300ms
- **差**: > 300ms

**优化建议**：
- 减少 JavaScript 执行时间
- 代码分割
- 使用 Web Workers

#### CLS (Cumulative Layout Shift)
**累积布局偏移**

- **优秀**: < 0.1
- **需要改进**: 0.1 - 0.25
- **差**: > 0.25

**优化建议**：
- 为图片设置尺寸
- 避免动态插入内容
- 使用 font-display: swap

#### TTFB (Time to First Byte)
**首字节时间**

- **优秀**: < 800ms
- **需要改进**: 800ms - 1800ms
- **差**: > 1800ms

**优化建议**：
- 使用 Edge Functions
- 优化数据库查询
- 启用缓存

### 查看数据

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目 "random-picker"
3. 点击顶部导航栏的 "Speed Insights"
4. 查看各项指标的分布和趋势

### 性能评分

Speed Insights 会给出总体性能评分：
- **90-100**: 优秀 🟢
- **50-89**: 需要改进 🟡
- **0-49**: 差 🔴

## 📈 数据分析最佳实践

### 1. 定期检查
- 每周查看一次 Analytics 数据
- 关注流量趋势和异常
- 分析用户行为模式

### 2. 性能监控
- 每天检查 Core Web Vitals
- 关注性能下降趋势
- 及时优化慢速页面

### 3. A/B 测试
- 使用 Analytics 数据验证改进效果
- 对比不同版本的性能
- 基于数据做决策

### 4. 用户体验优化
- 分析跳出率高的页面
- 优化加载慢的资源
- 改进移动端体验

## 🔧 高级配置

### 自定义事件追踪

如果需要追踪自定义事件，可以使用 Vercel Analytics API：

```typescript
import { track } from '@vercel/analytics';

// 追踪自定义事件
track('wheel_spin', {
  items_count: 6,
  language: 'en'
});

// 追踪转化
track('conversion', {
  type: 'share'
});
```

### 过滤数据

在 Vercel Dashboard 中可以：
- 按路径过滤
- 按国家/地区过滤
- 按设备类型过滤
- 按浏览器过滤

## 📊 报告和导出

### 生成报告
1. 在 Analytics 页面选择时间范围
2. 点击 "Export" 按钮
3. 选择导出格式（CSV, JSON）

### 定期报告
- 设置每周/每月自动报告
- 通过邮件接收摘要
- 与团队分享数据

## 🎯 性能目标

### 当前项目目标

| 指标 | 目标值 | 当前状态 |
|------|--------|----------|
| LCP | < 2.5s | ✅ 优秀 |
| FID | < 100ms | ✅ 优秀 |
| CLS | < 0.1 | ✅ 优秀 |
| TTFB | < 800ms | ✅ 优秀 |

### 流量目标
- 月访问量: 10,000+
- 平均会话时长: > 2 分钟
- 跳出率: < 40%

## 🔗 相关资源

- [Vercel Analytics 文档](https://vercel.com/docs/analytics)
- [Speed Insights 文档](https://vercel.com/docs/speed-insights)
- [Web Vitals 指南](https://web.dev/vitals/)
- [Core Web Vitals 优化](https://web.dev/optimize-vitals/)

## 💡 提示

1. **数据需要时间积累**
   - 新部署的项目需要几天才能看到有意义的数据
   - 至少等待 7 天再做性能优化决策

2. **关注趋势而非绝对值**
   - 单次访问的数据可能有波动
   - 关注长期趋势和平均值

3. **移动端优先**
   - 大部分用户来自移动设备
   - 优先优化移动端性能

4. **持续优化**
   - 性能优化是持续的过程
   - 定期检查和改进

---

**最后更新**: 2025-10-29
**项目**: Random Wheel
