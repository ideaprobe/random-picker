'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // 只在生产环境发送
    if (process.env.NODE_ENV !== 'production') return;

    // 方案 1: 发送到 Vercel Analytics (已经通过 @vercel/speed-insights 自动处理)
    // 无需额外代码

    // 方案 2: 发送到 Google Analytics 4
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // 方案 3: 发送到自定义 API
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: metric.name,
    //     value: metric.value,
    //     id: metric.id,
    //     rating: metric.rating,
    //     delta: metric.delta,
    //     navigationType: metric.navigationType,
    //   }),
    // }).catch(console.error);

    // 方案 4: 发送到 Sentry
    // if (window.Sentry) {
    //   window.Sentry.captureMessage(`Web Vital: ${metric.name}`, {
    //     level: 'info',
    //     tags: {
    //       web_vital: metric.name,
    //       rating: metric.rating,
    //     },
    //     contexts: {
    //       web_vitals: {
    //         value: metric.value,
    //         delta: metric.delta,
    //       },
    //     },
    //   });
    // }

    // 方案 5: 发送到 PostHog
    // if (window.posthog) {
    //   window.posthog.capture('web_vitals', {
    //     metric_name: metric.name,
    //     metric_value: metric.value,
    //     metric_rating: metric.rating,
    //     metric_id: metric.id,
    //   });
    // }

    // 开发时查看
    console.log(metric);
  });

  return null;
}

// TypeScript 类型声明
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    Sentry?: any;
    posthog?: unknown;
  }
}
