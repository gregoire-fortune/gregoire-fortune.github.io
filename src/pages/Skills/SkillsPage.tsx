import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type SkillItem = string | { label: string; icon?: string; group?: string };

const normalizeItem = (item: SkillItem) =>
  typeof item === "string"
    ? { label: item, icon: undefined, group: undefined }
    : { label: item.label, icon: item.icon, group: item.group };

export const SkillsPage = () => {
  const { t } = useTranslation();
  const stacks = useMemo(
    () => (t("pages.skills.sections", { returnObjects: true }) as { title: string; items: SkillItem[] }[]) ?? [],
    [t]
  );

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{t("pages.skills.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.skills.description")}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {stacks.map((stack) => (
          <article
            key={stack.title}
            className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/60"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{stack.title}</h2>
            </div>

            <div className="flex flex-col gap-3">
              {Object.entries(
                stack.items.reduce<Record<string, ReturnType<typeof normalizeItem>[]>>((acc, raw) => {
                  const normalized = normalizeItem(raw);
                  const key = normalized.group ?? "default";
                  acc[key] = acc[key] ? [...acc[key], normalized] : [normalized];
                  return acc;
                }, {})
              ).map(([group, items]) => (
                <div key={group} className="space-y-2">
                  {group !== "default" && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{group}</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {items.map(({ label, icon }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 shadow-[0_1px_4px_rgba(15,23,42,0.05)] dark:border-slate-800/80 dark:bg-slate-900/70"
                      >
                        {icon && (
                          <span
                            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white/90 text-xs font-semibold dark:border-slate-800 dark:bg-slate-800"
                            aria-label={`Logo ${label}`}
                            title={`Logo ${label}`}
                          >
                            <img src={icon} alt={`Logo ${label}`} className="h-full w-full object-contain" />
                          </span>
                        )}
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
