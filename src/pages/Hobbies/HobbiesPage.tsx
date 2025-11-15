import { useTranslation } from "react-i18next";

export const HobbiesPage = () => {
  const { t } = useTranslation();
  const hobbies = (t("pages.hobbies.items", { returnObjects: true }) as { title: string; description: string }[]) ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold">{t("pages.hobbies.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.hobbies.description")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {hobbies.map((hobby) => (
          <article key={hobby.title} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <h2 className="text-xl font-semibold">{hobby.title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{hobby.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
