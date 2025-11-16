import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

type IconProps = { className?: string };
type NavItem = {
  to: string;
  labelKey: string;
  end?: boolean;
  icon: ComponentType<IconProps>;
};

const HomeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" strokeLinecap="round" />
    <path d="M9 20v-6h6v6" />
  </svg>
);

const UserIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" strokeLinecap="round" />
  </svg>
);

const BookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M6 4h11a2 2 0 0 1 2 2v14l-5-2-5 2V6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 4v14a2 2 0 0 0 2 2h1" />
  </svg>
);

const SparkIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="m12 2 2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LayersIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 16l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PuzzleIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path
      d="M9 3h2a2 2 0 0 1 2 2v1a1 1 0 0 0 1 1h1a2 2 0 0 1 2 2v2h1a2 2 0 0 1 0 4h-1v2a2 2 0 0 1-2 2h-1a1 1 0 0 0-1 1v1a2 2 0 0 1-2 2H9v-3a1 1 0 0 0-1-1H7a2 2 0 0 1-2-2v-1a1 1 0 0 0-1-1H3v-4h1a1 1 0 0 0 1-1V8a2 2 0 0 1 2-2h1a1 1 0 0 0 1-1Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FileIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 3v6h6" />
    <path d="M9 13h6" />
    <path d="M9 17h4" />
  </svg>
);

export const NAV_LINKS: NavItem[] = [
  { to: "/", labelKey: "nav.home", end: true, icon: HomeIcon },
  { to: "/about", labelKey: "nav.about", icon: UserIcon },
  { to: "/curriculum", labelKey: "nav.curriculum", icon: BookIcon },
  { to: "/skills", labelKey: "nav.skills", icon: SparkIcon },
  { to: "/projects", labelKey: "nav.projects", icon: LayersIcon },
  { to: "/hobbies", labelKey: "nav.hobbies", icon: PuzzleIcon },
  { to: "/contact", labelKey: "nav.contact", icon: MailIcon },
  { to: "/resume", labelKey: "nav.resume", icon: FileIcon },
];

export const MainNav = () => {
  const { t } = useTranslation();

  return (
    <nav className="flex flex-wrap justify-end gap-5 overflow-x-auto text-sm font-medium sm:flex-nowrap">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          aria-label={t(link.labelKey)}
          className="group relative flex w-24 flex-shrink-0 flex-col items-center gap-2 px-2 py-1"
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-lg transition-all duration-200 ${
                  isActive
                    ? "border-brand bg-brand/15 text-brand shadow-lg shadow-brand/20"
                    : "border-transparent bg-white/60 text-slate-500 shadow-sm transition group-hover:-translate-y-1 group-hover:border-brand/40 group-hover:text-brand dark:bg-slate-900/25 dark:text-slate-300"
                }`}
              >
                <link.icon className="h-5 w-5" />
              </span>
              <span
                className={`h-0.5 w-8 rounded-full bg-brand transition-all duration-200 ${
                  isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`}
              />
              <span
                className={`text-center text-[0.55rem] font-semibold uppercase tracking-[0.2em] leading-tight transition ${
                  isActive
                    ? "text-brand opacity-100"
                    : "text-slate-500 opacity-0 group-hover:text-brand group-hover:opacity-100 dark:text-slate-300"
                }`}
              >
                {t(link.labelKey)}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
