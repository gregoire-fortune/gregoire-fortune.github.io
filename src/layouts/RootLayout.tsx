import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { MainNav, NAV_LINKS } from "../components/MainNav";
import { PageProgress } from "../components/PageProgress";
import { ThemeToggle } from "../components/ThemeToggle";

export const RootLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentNav = NAV_LINKS.find((link) => matchesRoute(location.pathname, link.to, link.end));
  const currentPageTitle = currentNav ? t(currentNav.labelKey) : t("nav.title");

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <PageProgress />
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-4">
          <div className="flex min-w-[220px] items-center gap-4">
            <Link
              to="/"
              aria-label={t("nav.home") ?? "Home"}
              className="rounded-3xl outline-none focus-visible:ring focus-visible:ring-brand/50"
            >
              <AppLogo />
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

      <main className="mx-auto flex-1 max-w-5xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
        {t("footer.signature")}
      </footer>
    </div>
  );
};

const AppLogo = () => (
  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-indigo-500 text-xl font-black text-white shadow-xl shadow-brand/30">
    PF
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
