import { useTranslation } from "react-i18next";

export const AboutPage = () => {
  const { t } = useTranslation();
  const highlights = (t("pages.about.highlights", { returnObjects: true }) as string[]) ?? [];

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">{t("pages.about.title")}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.about.description")}</p>
      <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
