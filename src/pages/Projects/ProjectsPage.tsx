import { useTranslation } from "react-i18next";

export const ProjectsPage = () => {
  const { t } = useTranslation();
  const projects = (t("pages.projects.items", {
    returnObjects: true,
  }) as { title: string; description: string; stack: string }[]) ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold">{t("pages.projects.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.projects.description")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{project.description}</p>
            <p className="mt-3 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {project.stack}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
