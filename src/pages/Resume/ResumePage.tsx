import { useTranslation } from "react-i18next";

export const ResumePage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold">{t("pages.resume.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.resume.description")}</p>
      </div>
      <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-300">{t("pages.resume.instructions")}</p>
        <button
          type="button"
          className="mt-4 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
        >
          {t("pages.resume.downloadCta")}
        </button>
      </div>
    </section>
  );
};
