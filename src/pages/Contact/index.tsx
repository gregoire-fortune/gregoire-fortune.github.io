import { useState } from "react";
import { useTranslation } from "react-i18next";

// Set your Formspree endpoint in .env as VITE_FORMSPREE_ENDPOINT
const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xeegqbre";

export const ContactPage = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (e) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold">{t("pages.contact.title")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t("pages.contact.description")}</p>
      </div>
      <div className="grid gap-4 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <label className="flex flex-col gap-2 text-sm">
          <span>{t("pages.contact.form.name")}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 focus:border-brand focus:outline-none dark:border-slate-700"
            placeholder={t("pages.contact.form.namePlaceholder") ?? undefined}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span>{t("pages.contact.form.email")}</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 focus:border-brand focus:outline-none dark:border-slate-700"
            placeholder={t("pages.contact.form.emailPlaceholder") ?? undefined}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span>{t("pages.contact.form.message")}</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 focus:border-brand focus:outline-none dark:border-slate-700"
            placeholder={t("pages.contact.form.messagePlaceholder") ?? undefined}
          />
        </label>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 disabled:opacity-50"
        >
          {loading ? t("pages.contact.form.sending") : t("pages.contact.form.cta")}
        </button>
        {status === 'sent' && <p className="text-sm text-green-600">{t("pages.contact.form.sent")}</p>}
        {status === 'error' && <p className="text-sm text-red-600">{t("pages.contact.form.error")}</p>}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{t("pages.contact.cvHint")}</p>
    </section>
  );
};
