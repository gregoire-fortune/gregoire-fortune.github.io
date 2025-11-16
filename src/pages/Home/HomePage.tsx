import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import heroPortrait from "../../assets/profile-placeholder.svg";

export const HomePage = () => {
  const { t, i18n } = useTranslation();
  const typingRoles = useMemo(() => {
    const values = t("pages.home.typingRoles", { returnObjects: true });
    return Array.isArray(values) ? (values as string[]) : [];
  }, [t, i18n.language]);
  const longestRoleLength = useMemo(() => typingRoles.reduce((max, role) => Math.max(max, role.length), 0), [typingRoles]);
  const textRef = useRef<HTMLSpanElement>(null);
  const [caretOffset, setCaretOffset] = useState(0);

  const [displayedText, setDisplayedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setRoleIndex(0);
    setIsDeleting(false);
  }, [typingRoles]);

  useEffect(() => {
    if (typingRoles.length === 0) {
      return;
    }

    const currentRole = typingRoles[roleIndex % typingRoles.length];
    let timeout: number;

    const moveToNextRole = () => {
      setIsDeleting(false);
      setDisplayedText("");
      setRoleIndex((prev) => (prev + 1) % typingRoles.length);
    };

    if (!isDeleting && displayedText === currentRole) {
      timeout = window.setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && displayedText === "") {
      timeout = window.setTimeout(moveToNextRole, 200);
    } else {
      const nextText = isDeleting
        ? currentRole.slice(0, Math.max(0, displayedText.length - 1))
        : currentRole.slice(0, displayedText.length + 1);
      const delay = isDeleting ? 40 : 90;
      timeout = window.setTimeout(() => setDisplayedText(nextText), delay);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, typingRoles]);

  useEffect(() => {
    const measure = () => {
      setCaretOffset(textRef.current?.offsetWidth ?? 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [displayedText, longestRoleLength]);

  return (
    <section className="flex min-h-[calc(100vh-220px)] items-center">
      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] lg:items-center">
      <div className="flex justify-center lg:justify-start">
        <div className="flex w-full flex-col gap-6 px-4 text-center sm:px-6 lg:px-10 lg:text-left">
        <p className="text-sm uppercase tracking-[0.35em] text-brand">{t("pages.home.badge")}</p>
        <h1 className="font-semibold leading-[1.05] text-[clamp(3.5rem,10vw,8rem)]">
          <span className="block">{t("pages.home.firstName")}</span>
          <span className="block text-brand">{t("pages.home.lastName")}</span>
        </h1>
        <div className="text-xl text-slate-700 dark:text-slate-200">
          <span>{t("pages.home.typingPrefix")}&nbsp;</span>
          <span
            className="relative inline-flex items-center font-semibold text-brand"
            style={{ minWidth: `${Math.max(10, longestRoleLength + 1)}ch` }}
          >
            <span ref={textRef} className="inline-flex min-h-[2ch] whitespace-nowrap">
              {displayedText || "\u00A0"}
            </span>
            <span
              className="absolute top-1/2 h-6 w-px -translate-y-1/2 animate-pulse bg-brand"
              style={{ left: caretOffset + 4 }}
              aria-hidden
            />
          </span>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.home.description")}</p>

        <div className="flex w-full justify-center">
          <Link
            to="/about"
            aria-label={t("pages.home.arrowLabel") ?? "About"}
            className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-brand/40 text-brand transition hover:-translate-y-1 hover:text-brand"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 17 5 8h14Z" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            {t("pages.home.ctaProjects")}
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t("pages.home.ctaContact")}
          </Link>
        </div>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <div className="relative flex w-full justify-center px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-8 rounded-full bg-brand/20 blur-3xl dark:bg-brand/30" aria-hidden />
          <img
            src={heroPortrait}
            alt={t("pages.home.photoAlt") ?? "Portrait"}
            loading="lazy"
            className="relative z-10 aspect-square w-full max-w-[20rem] rounded-full border border-white/50 object-cover shadow-2xl shadow-brand/20 dark:border-slate-800"
          />
        </div>
      </div>
      </div>
    </section>
  );
};
