import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type TimelineEntry = {
  title: string;
  subtitle: string;
  timeframe: string;
  description: string;
  details?: string;
};

export const CurriculumPage = () => {
  const { t } = useTranslation();
  const milestones = (t("pages.curriculum.timeline", { returnObjects: true }) as TimelineEntry[]) ?? [];
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineEntry | null>(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    if (!selectedMilestone) {
      setOverlayVisible(false);
      return;
    }

    setOverlayVisible(true);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMilestone(null);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedMilestone]);

  const closeOverlay = () => setSelectedMilestone(null);

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold">{t("pages.curriculum.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.curriculum.description")}</p>
      </div>

      <div className="relative mt-4">
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 -top-3 h-0 w-0 -translate-x-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent border-b-slate-200 dark:border-b-slate-800 md:left-1/2 md:-translate-x-1/2"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 -top-2 h-0 w-0 -translate-x-0 border-l-[7px] border-r-[7px] border-b-[10px] border-l-transparent border-r-transparent border-b-white dark:border-b-slate-950 md:left-1/2 md:-translate-x-1/2"
        />
        <ol
          className="relative space-y-10 rounded pl-3 before:absolute before:left-3 before:top-0 before:h-full before:w-[3px] before:bg-slate-200 before:content-[''] dark:before:bg-slate-800 md:space-y-12 md:pl-0 md:before:left-1/2 md:before:-translate-x-1/2"
        >
        {milestones.map((milestone, index) => (
          <li key={`${milestone.title}-${milestone.timeframe}`} className="relative ml-8 md:ml-0">
            <span
              className="absolute -left-3 top-3 h-4 w-4 rounded-full border-4 border-white bg-brand shadow-md dark:border-slate-900 md:left-1/2 md:-translate-x-1/2"
            />

            <button
              type="button"
              onClick={() => setSelectedMilestone(milestone)}
              className={`group relative block w-full rounded-2xl border border-slate-200 bg-white/80 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md focus:outline-none focus-visible:ring focus-visible:ring-brand/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/40 md:w-[calc(50%-1.5rem)] ${
                index % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-brand">{milestone.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{milestone.subtitle}</p>
                </div>
                <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand dark:text-brand">
                  {milestone.timeframe}
                </span>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{milestone.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                {t("pages.curriculum.cta")}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </li>
        ))}
        </ol>
      </div>

      {selectedMilestone && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 transition ${
            isOverlayVisible ? "opacity-100" : "opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="curriculum-detail-title"
        >
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            aria-hidden
            onClick={closeOverlay}
          />

          <article className="relative z-10 max-w-2xl rounded-3xl border border-slate-200/40 bg-white p-8 shadow-2xl dark:border-slate-800/60 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <header>
                <p className="text-sm uppercase tracking-wide text-brand">{selectedMilestone.timeframe}</p>
                <h2 id="curriculum-detail-title" className="mt-1 text-2xl font-semibold">
                  {selectedMilestone.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400">{selectedMilestone.subtitle}</p>
              </header>
              <button
                type="button"
                onClick={closeOverlay}
                className="rounded-full border border-slate-200/60 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 focus:outline-none focus-visible:ring focus-visible:ring-brand/40 dark:border-slate-700 dark:text-slate-300"
                aria-label={t("pages.curriculum.close")}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">{selectedMilestone.description}</p>
            {selectedMilestone.details && (
              <p className="mt-4 text-slate-600 dark:text-slate-300">{selectedMilestone.details}</p>
            )}
          </article>
        </div>
      )}
    </section>
  );
};
