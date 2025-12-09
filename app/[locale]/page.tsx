"use client";

import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { WHEEL_COLORS, WHEEL_CONFIG } from "./constants";

// 懒加载动画组件，减少首屏 bundle
const WheelSpinner = lazy(() => import("./components/WheelSpinner").then(mod => ({ default: mod.WheelSpinner })));

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const getDefaultItems = () => [
    t("defaultItems.item1"),
    t("defaultItems.item2"),
    t("defaultItems.item3"),
    t("defaultItems.item4"),
    t("defaultItems.item5"),
    t("defaultItems.item6"),
  ];

  const [items, setItems] = useState<string[]>(getDefaultItems());
  const [inputValue, setInputValue] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const changeLang = useCallback((newLocale: "en" | "zh") => {
    router.replace(pathname, { locale: newLocale });
  }, [router, pathname]);

  const addItem = useCallback(() => {
    if (inputValue.trim() && items.length < WHEEL_CONFIG.MAX_ITEMS) {
      setItems(prev => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  }, [inputValue, items.length]);

  const removeItem = useCallback((index: number) => {
    setItems(prev => {
      if (prev.length > WHEEL_CONFIG.MIN_ITEMS) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || items.length < WHEEL_CONFIG.MIN_ITEMS) return;

    setIsSpinning(true);
    setResult(null);

    const spins = WHEEL_CONFIG.MIN_SPINS + Math.random() * WHEEL_CONFIG.MAX_EXTRA_SPINS;
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentAngle = 360 / items.length;
      const selectedIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % items.length;

      setResult(items[selectedIndex]);
      setIsSpinning(false);
    }, WHEEL_CONFIG.SPIN_DURATION);
  }, [isSpinning, items, rotation]);

  // Memoize wheel paths to avoid recalculation
  const wheelPaths = useMemo(() => {
    const createWheelPath = (index: number, total: number) => {
      const angle = (2 * Math.PI) / total;
      const startAngle = index * angle - Math.PI / 2;
      const endAngle = startAngle + angle;

      const x1 = 200 + 200 * Math.cos(startAngle);
      const y1 = 200 + 200 * Math.sin(startAngle);
      const x2 = 200 + 200 * Math.cos(endAngle);
      const y2 = 200 + 200 * Math.sin(endAngle);

      const largeArc = angle > Math.PI ? 1 : 0;

      return `M 200 200 L ${x1} ${y1} A 200 200 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    return items.map((_, index) => createWheelPath(index, items.length));
  }, [items]);

  if (items.length === 0) return null;

  return (
    <main className="min-h-screen bg-linear-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            {t("title")}
          </h1>
          <button
            onClick={() => changeLang(locale === "en" ? "zh" : "en")}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:shadow-md transition-all text-sm sm:text-base font-medium"
          >
            {locale === "en" ? "中文" : "EN"}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] aspect-square">
              <Suspense fallback={
                <svg width="100%" height="100%" viewBox="0 0 400 400" className="drop-shadow-2xl">
                  <circle cx="200" cy="200" r="200" fill="#e5e7eb" />
                  <circle cx="200" cy="200" r="30" fill="white" stroke="#ddd" strokeWidth="2" />
                  <circle cx="200" cy="200" r="15" fill="#f59e0b" />
                </svg>
              }>
                <WheelSpinner items={items} rotation={rotation} wheelPaths={wheelPaths} />
              </Suspense>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-15 sm:border-l-20 border-r-15 sm:border-r-20 border-t-22 sm:border-t-30 border-l-transparent border-r-transparent border-t-red-600 z-10" />
            </div>

            <button
              onClick={spin}
              disabled={isSpinning || items.length < WHEEL_CONFIG.MIN_ITEMS}
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-lg sm:text-xl rounded-full shadow-lg transition-all transform hover:scale-105 disabled:hover:scale-100 active:scale-95"
            >
              {isSpinning ? t("spinning") : t("startSpin")}
            </button>

            {result && (
              <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-[320px] sm:max-w-none">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t("result")}</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 wrap-break-word">{result}</p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t("customList")}</h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder={t("inputPlaceholder")}
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                disabled={items.length >= WHEEL_CONFIG.MAX_ITEMS}
              />
              <button
                onClick={addItem}
                disabled={!inputValue.trim() || items.length >= WHEEL_CONFIG.MAX_ITEMS}
                className="px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                {t("add")}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t("itemCount", { count: items.length })}
            </p>

            <div className="space-y-2 max-h-[300px] sm:max-h-96 overflow-y-auto">
              {items.map((item, index) => {
                const color = WHEEL_COLORS[index % WHEEL_COLORS.length];
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0"
                        style={{ background: `linear-gradient(135deg, ${color.start}, ${color.end})` }}
                      />
                      <span className="text-gray-800 dark:text-white text-sm sm:text-base truncate">{item}</span>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      disabled={items.length <= WHEEL_CONFIG.MIN_ITEMS}
                      className="px-2 sm:px-3 py-1 text-sm sm:text-base text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:text-gray-400 disabled:hover:bg-transparent rounded transition-colors shrink-0"
                    >
                      {t("remove")}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
