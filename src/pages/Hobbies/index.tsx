import { useTranslation } from "react-i18next";

import artImage from "../../assets/hobbies/dessin.png";
import civilizationImage from "../../assets/hobbies/civilization.jpg";
import escaladeImage from "../../assets/hobbies/escalade.jpg";
import figurineImage from "../../assets/hobbies/figurine.png";
import golfImage from "../../assets/hobbies/golf.jpg";
import photoImage from "../../assets/hobbies/photo.jpg";
import puzzleImage from "../../assets/hobbies/puzzle.webp";
import volleyImage from "../../assets/hobbies/volley.avif";

type HobbyItem = {
  title: string;
  description: string;
  meta?: string;
  highlights?: string[];
  imageKey?: keyof typeof HOBBY_MEDIA | string;
};

type HobbyGroup = {
  title: string;
  intro?: string;
  items: HobbyItem[];
};

const HOBBY_MEDIA = {
  escalade: escaladeImage,
  volley: volleyImage,
  golf: golfImage,
  civilization: civilizationImage,
  dessin: artImage,
  figurine: figurineImage,
  photo: photoImage,
  puzzle: puzzleImage
} as const;

export const HobbiesPage = () => {
  const { t } = useTranslation();
  const groups = (t("pages.hobbies.groups", { returnObjects: true }) as HobbyGroup[]) ?? [];

  return (
    <section className="flex flex-col gap-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold lg:text-4xl">{t("pages.hobbies.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.hobbies.description")}</p>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.title} className="space-y-4">
            <header>
              <h2 className="text-2xl font-semibold">{group.title}</h2>
              {group.intro && <p className="mt-1 text-slate-600 dark:text-slate-300">{group.intro}</p>}
            </header>
            <div className="grid gap-6 md:grid-cols-2">
              {group.items?.map((item) => {
                const mediaSrc =
                  item.imageKey && item.imageKey in HOBBY_MEDIA
                    ? HOBBY_MEDIA[item.imageKey as keyof typeof HOBBY_MEDIA]
                    : undefined;

                return (
                  <article
                    key={item.title}
                    className="group flex flex-col rounded-3xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900/60"
                  >
                    {mediaSrc && (
                      <img
                        src={mediaSrc}
                        alt={item.title}
                        loading="lazy"
                        className="h-44 w-full rounded-2xl object-cover"
                      />
                    )}
                    <div className="mt-4 flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-brand dark:text-white">
                        {item.title}
                      </h3>
                      {item.meta && (
                        <p className="mt-1 text-xs uppercase tracking-wide text-brand">{item.meta}</p>
                      )}
                      <p className="mt-2 text-slate-600 dark:text-slate-300">{item.description}</p>
                      {item.highlights && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {item.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="rounded-full border border-slate-200/70 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};
