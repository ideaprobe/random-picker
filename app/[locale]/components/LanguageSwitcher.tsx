"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import { startTransition, useState } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isChanging, setIsChanging] = useState(false);

  const targetLocale = locale === "en" ? "zh" : "en";

  const handleChange = () => {
    setIsChanging(true);
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  };

  return (
    <button
      onClick={handleChange}
      disabled={isChanging}
      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:shadow-md transition-all text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed relative"
      aria-label={`Switch to ${targetLocale === "zh" ? "Chinese" : "English"}`}
    >
      {isChanging ? (
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
          {locale === "en" ? "中文" : "EN"}
        </span>
      ) : (
        locale === "en" ? "中文" : "EN"
      )}
      {/* 隐藏的 Link 用于预加载 */}
      <Link
        href={pathname}
        locale={targetLocale}
        className="hidden"
        prefetch={true}
        aria-hidden="true"
      />
    </button>
  );
}
