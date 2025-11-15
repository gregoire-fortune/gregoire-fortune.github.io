import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const AVAILABLE_LANGS = [
  { code: "fr", labelKey: "language.fr" },
  { code: "en", labelKey: "language.en" },
];

const FlagIcon = ({ code, className }: { code: string; className?: string }) => {
  if (code === "fr") {
    return (
      <svg viewBox="0 0 3 2" className={className} aria-hidden>
        <rect width="1" height="2" fill="#0055A4" />
        <rect x="1" width="1" height="2" fill="#FFFFFF" />
        <rect x="2" width="1" height="2" fill="#EF4135" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden>
      <rect width="3" height="2" fill="#00247D" />
      <path d="M0 0 L3 2 M3 0 L0 2" stroke="#FFFFFF" strokeWidth="0.4" />
      <path d="M0 0 L3 2 M3 0 L0 2" stroke="#CF142B" strokeWidth="0.2" />
      <rect x="1.2" width="0.6" height="2" fill="#FFFFFF" />
      <rect y="0.7" width="3" height="0.6" fill="#FFFFFF" />
      <rect x="1.3" width="0.4" height="2" fill="#CF142B" />
      <rect y="0.8" width="3" height="0.4" fill="#CF142B" />
    </svg>
  );
};

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative text-xs font-medium text-slate-500 dark:text-slate-400">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("language.label") ?? "Language"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring focus-visible:ring-brand/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        <FlagIcon code={currentLanguage} className="h-4 w-6 rounded-sm" />
        <span aria-hidden className="uppercase tracking-wide">
          {currentLanguage?.slice(0, 2).toLowerCase()}
        </span>
        <svg
          className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label={t("language.label") ?? "Languages"}
          className="absolute right-0 top-full z-30 mt-2 w-48 rounded-2xl border border-slate-200 bg-white/95 p-2 text-sm shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/95"
        >
          {AVAILABLE_LANGS.map((lang) => {
            const isActive = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 transition focus:outline-none focus-visible:ring focus-visible:ring-brand/40 ${
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <FlagIcon code={lang.code} className="h-4 w-6 overflow-hidden rounded-sm" />
                <span className="flex-1 text-left">{t(lang.labelKey)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
