import { useTranslation } from "react-i18next";

import cinerentImage from "../../assets/projects/cinerent.png";
import mapImage from "../../assets/projects/map.png";

type Step = {
  title: string;
  details: string[];
};

type ProjectSegment =
  | { title: string; type: "paragraph"; text: string }
  | { title: string; type: "list"; items: string[] }
  | { title: string; type: "steps"; items: Step[] };

type ProjectItem = {
  title: string;
  badge?: string;
  summary?: string;
  mediaKey?: keyof typeof PROJECT_MEDIA | string;
  segments?: ProjectSegment[];
};

type ProjectSection = {
  title: string;
  description?: string;
  items: ProjectItem[];
};

const PROJECT_MEDIA = {
  cinerent: cinerentImage,
  map: mapImage
} as const;

export const ProjectsPage = () => {
  const { t } = useTranslation();
  const sections = (t("pages.projects.sections", { returnObjects: true }) as ProjectSection[]) ?? [];

  const renderSegment = (segment: ProjectSegment) => {
    if (segment.type === "list") {
      return (
        <div key={segment.title} className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {segment.title}
          </h4>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {segment.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (segment.type === "steps") {
      return (
        <div key={segment.title} className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {segment.title}
          </h4>
          <div className="grid gap-3">
            {segment.items.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-slate-800/60 dark:bg-slate-900/40"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600 dark:text-slate-300">
                  {step.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={segment.title} className="space-y-2">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {segment.title}
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-300">{segment.text}</p>
      </div>
    );
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold lg:text-4xl">{t("pages.projects.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.projects.description")}</p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title} className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.description && (
                <p className="text-slate-600 dark:text-slate-300">{section.description}</p>
              )}
            </div>

            <div className="space-y-6">
              {section.items?.map((item) => {
                const mediaSrc =
                  item.mediaKey && item.mediaKey in PROJECT_MEDIA
                    ? PROJECT_MEDIA[item.mediaKey as keyof typeof PROJECT_MEDIA]
                    : undefined;

                return (
                  <article
                    key={item.title}
                    className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/60 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                  >
                    {mediaSrc && (
                      <div className="flex items-center justify-center">
                        <img
                          src={mediaSrc}
                          alt={item.title}
                          loading="lazy"
                          className="max-h-64 w-full rounded-2xl border border-slate-200 object-contain p-4 dark:border-slate-800"
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div>
                        {item.badge && (
                          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                            {item.badge}
                          </span>
                        )}
                        <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                        {item.summary && (
                          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{item.summary}</p>
                        )}
                      </div>

                      <div className="space-y-5">
                        {item.segments?.map((segment) => renderSegment(segment))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
