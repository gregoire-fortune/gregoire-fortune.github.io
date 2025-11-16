import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import portfolioLogo from "../assets/portfolio-logo.ico";
import { AnimatedWaveBackground } from "../components/AnimatedWaveBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { MainNav, NAV_LINKS } from "../components/MainNav";
import { PageProgress } from "../components/PageProgress";
import { ThemeToggle } from "../components/ThemeToggle";

const DARK_LOGO_FILTER =
  "brightness(0) saturate(100%) invert(17%) sepia(76%) saturate(2963%) hue-rotate(239deg) brightness(105%) contrast(99%)" as const;

export const RootLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentNav = NAV_LINKS.find((link) => matchesRoute(location.pathname, link.to, link.end));
  const currentPageTitle = currentNav ? t(currentNav.labelKey) : t("nav.title");

  return (
    <div className="flex min-h-screen flex-col text-slate-900 transition-colors dark:text-slate-100">
      <AnimatedWaveBackground />
      <PageProgress />
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-4">
          <div className="flex min-w-[220px] items-center gap-4">
            <Link
              to="/"
              aria-label={t("nav.home") ?? "Home"}
              className="rounded-3xl outline-none focus-visible:ring focus-visible:ring-brand/50"
            >
              <AppLogo alt={t("nav.title") ?? "Portfolio logo"} />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-brand">{t("nav.title")}</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">{currentPageTitle}</p>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-5">
            <MainNav />
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full px-6 py-10 lg:px-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
        {t("footer.signature")}
      </footer>
    </div>
  );
};

type AppLogoProps = {
  alt: string;
};

const AppLogo = ({ alt }: AppLogoProps) => (
  <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-3xl p-2 ring-1 ring-slate-200/70 shadow-lg shadow-slate-900/10 transition-all duration-200 dark:ring-white/5 dark:shadow-black/40">
    <div
      className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/30 via-indigo-500/20 to-transparent opacity-70 blur-lg transition-opacity duration-200 dark:from-brand/25 dark:via-indigo-500/25"
      aria-hidden
    />
    <img
      src={portfolioLogo}
      alt={alt}
      className="relative h-full w-full rounded-2xl object-contain drop-shadow-[0_4px_8px_rgba(15,23,42,0.35)] transition-opacity duration-200 dark:opacity-0"
    />
    <img
      src={portfolioLogo}
      aria-hidden
      alt=""
      className="pointer-events-none absolute h-10 w-10 rounded-2xl object-contain opacity-0 drop-shadow-[0_4px_12px_rgba(76,29,149,0.65)] transition-opacity duration-200 dark:opacity-100"
      style={{ filter: DARK_LOGO_FILTER }}
    />
  </div>
);

const matchesRoute = (pathname: string, target: string, exact?: boolean) => {
  const normalize = (value: string) => {
    if (value === "/") return "/";
    return value.replace(/\/$/, "");
  };

  const current = normalize(pathname);
  const goal = normalize(target);

  if (exact || goal === "/") {
    return current === goal;
  }

  return current === goal || current.startsWith(`${goal}/`);
};
