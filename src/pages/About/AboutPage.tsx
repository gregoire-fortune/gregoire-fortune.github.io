import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import portraitFlower from "../../assets/about/moi_fleur.jpg";
import handPhoto from "../../assets/about/hand.jpg";
import puyDeDomePhoto from "../../assets/about/puyDeDome.jpg";
import ambitionPhoto from "../../assets/about/ambi.webp";
import ideaPhoto from "../../assets/about/idee.jpg";
import fractalPhoto from "../../assets/about/fractal.jpg";
import volleyPhoto from "../../assets/about/volley.avif";
import golfPhoto from "../../assets/about/golf.jpg";

type Trait = {
  title: string;
  description: string;
};

const GALLERY_ITEMS = [
  { src: handPhoto, labelKey: "pages.about.gallery.items.hand" },
  { src: puyDeDomePhoto, labelKey: "pages.about.gallery.items.puyDeDome" },
  { src: ambitionPhoto, labelKey: "pages.about.gallery.items.ambition" },
  { src: ideaPhoto, labelKey: "pages.about.gallery.items.idea" },
  { src: fractalPhoto, labelKey: "pages.about.gallery.items.fractal" },
  { src: volleyPhoto, labelKey: "pages.about.gallery.items.volley" },
  { src: golfPhoto, labelKey: "pages.about.gallery.items.golf" }
] as const;

const toStringArray = (value: unknown) => (Array.isArray(value) ? (value as string[]) : []);
const toTraitArray = (value: unknown) => (Array.isArray(value) ? (value as Trait[]) : []);

export const AboutPage = () => {
  const { t, i18n } = useTranslation();

  const introParagraphs = useMemo(
    () => toStringArray(t("pages.about.intro.paragraphs", { returnObjects: true })),
    [t, i18n.language]
  );

  const moreParagraphs = useMemo(
    () => toStringArray(t("pages.about.more.paragraphs", { returnObjects: true })),
    [t, i18n.language]
  );

  const traits = useMemo(
    () => toTraitArray(t("pages.about.traits", { returnObjects: true })),
    [t, i18n.language]
  );

  const marqueeItems = useMemo(() => [...GALLERY_ITEMS, ...GALLERY_ITEMS], []);
  const originalGalleryLength = GALLERY_ITEMS.length;

  return (
    <section className="space-y-10">
      <div className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10 text-white shadow-2xl shadow-slate-900/30 sm:px-10">
        <p className="text-sm uppercase tracking-[0.4em] text-brand/70">{t("pages.about.badge")}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1.2fr)] lg:items-center">
          <div className="space-y-6 text-base leading-relaxed text-slate-200">
            <h1 className="text-4xl font-semibold text-white">{t("pages.about.title")}</h1>
            <p className="text-lg text-slate-100">{t("pages.about.lead")}</p>
            {introParagraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-6 rounded-[48px] bg-gradient-to-br from-brand/20 via-indigo-500/20 to-white/10 blur-3xl" aria-hidden />
            <div className="relative w-full max-w-[22rem] overflow-hidden rounded-[40px] border border-white/15 bg-white/10 p-4 backdrop-blur">
              <img
                src={portraitFlower}
                alt={t("pages.about.photoAlt") ?? "Portrait"}
                loading="lazy"
                className="w-full rounded-[32px] object-cover"
              />
              <div className="mt-4 rounded-3xl bg-white/15 p-4 text-sm text-white">
                <p className="text-xs uppercase tracking-[0.35em] text-brand/90">{t("pages.about.card.title")}</p>
                <p className="text-base font-medium leading-tight text-white">{t("pages.about.card.subtitle")}</p>
                <p className="mt-1 text-slate-200/90">{t("pages.about.card.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,_1.5fr)_minmax(0,_1fr)]">
        <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800/60 dark:bg-slate-900/70">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t("pages.about.more.title")}</h2>
          <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-200">
            {moreParagraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {traits.map((trait) => (
            <div
              key={trait.title}
              className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/60"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-brand">{trait.title}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">{trait.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-slate-200/60 bg-slate-950/80 text-white shadow-2xl shadow-brand/20 dark:border-slate-800">
        <div className="px-0 py-6 sm:px-6">
          <div className="about-marquee">
            <div className="about-marquee-track">
              {marqueeItems.map((item, index) => {
                const isClone = index >= originalGalleryLength;
                const label = t(item.labelKey);
                return (
                  <figure
                    key={`${item.labelKey}-${index}`}
                    className="relative h-48 w-64 flex-shrink-0 overflow-hidden rounded-3xl border border-white/10"
                    aria-hidden={isClone}
                  >
                    <img
                      src={item.src}
                      alt={isClone ? "" : label}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 text-sm font-semibold">
                      {label}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
