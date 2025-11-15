import { useTranslation } from "react-i18next";

export const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold">{t("pages.contact.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.contact.description")}</p>
      </div>
      <form className="grid gap-4 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <label className="flex flex-col gap-2 text-sm">
          <span>{t("pages.contact.form.name")}</span>
          <input
            type="text"
            className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 focus:border-brand focus:outline-none dark:border-slate-700"
            placeholder={t("pages.contact.form.namePlaceholder") ?? undefined}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span>{t("pages.contact.form.email")}</span>
          <input
            type="email"
            className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 focus:border-brand focus:outline-none dark:border-slate-700"
            placeholder={t("pages.contact.form.emailPlaceholder") ?? undefined}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span>{t("pages.contact.form.message")}</span>
          <textarea
            rows={5}
            className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 focus:border-brand focus:outline-none dark:border-slate-700"
            placeholder={t("pages.contact.form.messagePlaceholder") ?? undefined}
          />
        </label>
        <button
          type="button"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
        >
          {t("pages.contact.form.cta")}
        </button>
      </form>
      <p className="text-sm text-slate-500 dark:text-slate-400">{t("pages.contact.cvHint")}</p>
    </section>
  );
};
