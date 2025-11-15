import { useTranslation } from "react-i18next";

export const SkillsPage = () => {
  const { t } = useTranslation();
  const stacks = (t("pages.skills.sections", { returnObjects: true }) as { title: string; items: string[] }[]) ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold">{t("pages.skills.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.skills.description")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {stacks.map((stack) => (
          <article key={stack.title} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <h2 className="text-xl font-semibold">{stack.title}</h2>
            <ul className="mt-3 space-y-1 text-slate-600 dark:text-slate-300">
              {stack.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-brand">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
