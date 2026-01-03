import { useTranslation } from "react-i18next";

import resumePreview from "../../assets/resume/cv-preview.png";

const resumePdf = "/CV_Gregoire_FORTUNE.pdf";

export const ResumePage = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-8 px-2 sm:px-4">
      <div className="space-y-3">
        {t("pages.resume.badge") && (
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
            {t("pages.resume.badge")}
          </span>
        )}
        <h1 className="text-3xl font-semibold lg:text-4xl">{t("pages.resume.title")}</h1>
        {/*<p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.resume.description")}</p>*/}
      </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <a href={resumePdf} target="_blank" rel="noreferrer" className="block w-full max-w-[520px]">
          <img
            src={resumePreview}
            alt={t("pages.resume.previewAlt") ?? "CV preview"}
            loading="lazy"
            className="w-full rounded-2xl border border-slate-200 object-cover dark:border-slate-800"
          />
          </a>
          <p className="text-sm text-slate-600 dark:text-slate-300">{t("pages.resume.instructions")}</p>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:border-white dark:bg-white dark:text-slate-900"
          >
            {t("pages.resume.actions.view")}
          </a>
          <a
            href={resumePdf}
            download
            className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-transparent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-white"
          >
            {t("pages.resume.actions.download")}
          </a>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t("pages.resume.actions.note")}</p>
        </div>
    </section>
  );
};
