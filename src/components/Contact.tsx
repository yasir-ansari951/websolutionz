import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { socials } from "@/lib/data";
import { Magnetic, MaskReveal, SectionLabel } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const WHATSAPP_NUMBER = "923194158162";

const projectTypes = [
  "Website",
  "Web App",
  "E-Commerce",
  "Branding",
  "SEO / Marketing",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
};

export function Contact() {
  const empty: FormState = {
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  };
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const update =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const lines = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone ? `Phone: ${form.phone}` : "",
        form.project ? `Project Type: ${form.project}` : "",
        `Message: ${form.message}`,
      ].filter(Boolean);
      const text = encodeURIComponent(lines.join("\n"));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[40vmin] w-[40vmin] rounded-full bg-brand/20 blur-[150px]" />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* left */}
        <div>
          <SectionLabel index="09" title="Contact" />
          <h2 className="mt-8 font-display uppercase leading-[0.9] tracking-tight text-[clamp(2rem,5.5vw,4.5rem)] text-white">
            <MaskReveal>Let's build</MaskReveal>
            <br />
            <MaskReveal delay={0.08}>something</MaskReveal>
            <br />
            <MaskReveal delay={0.16} className="text-stroke-red">
              amazing
            </MaskReveal>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-12 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
              Available for projects — 2026
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                Email
              </div>
              <a
                href="mailto:info.websolutinz@gmail.com"
                data-cursor="link"
                className="font-display text-2xl uppercase text-white transition-colors hover:text-brand sm:text-3xl"
              >
                info.websolutinz@gmail.com
              </a>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                Phone
              </div>
              <a
                href="https://wa.me/923194158162"
                data-cursor="link"
                className="font-display text-2xl uppercase text-white transition-colors hover:text-brand sm:text-3xl"
              >
                +92 319 415 8162
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="rounded-full border border-white/12 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-brand hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* right — card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              /* success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-12"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-brand/15 blur-[80px]" />

                <div className="relative grid h-16 w-16 place-items-center rounded-full bg-brand glow-red">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mt-7 font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-white">
                  Message sent
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
                  Your message has been prepared. WhatsApp should open shortly
                  — we'll get back to you quickly.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setError(false);
                    setForm(empty);
                  }}
                  data-cursor="link"
                  className="mt-8 rounded-full border border-white/15 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-brand hover:text-brand"
                >
                  ← Send another
                </button>
              </motion.div>
            ) : (
              /* form card */
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[0_24px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-brand/15 blur-[80px]" />

                {/* card header */}
                <div className="relative flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5 sm:px-8 sm:py-6">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand">
                      Project Inquiry
                    </div>
                    <h3 className="mt-2 font-display text-[clamp(1.4rem,2.4vw,2rem)] uppercase leading-[0.95] text-white">
                      Start your project
                    </h3>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                    Open
                  </div>
                </div>

                {/* card body */}
                <div className="relative space-y-5 px-6 py-6 sm:px-8 sm:py-7">
                  {/* name + email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={update("name")}
                        data-cursor="link"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={update("email")}
                        data-cursor="link"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* phone + project type */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (000) 000 000"
                        value={form.phone}
                        onChange={update("phone")}
                        data-cursor="link"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="project" className="form-label">
                        Project Type
                      </label>
                      <div className="relative">
                        <select
                          id="project"
                          value={form.project}
                          onChange={update("project")}
                          data-cursor="link"
                          className={cn(
                            "form-select",
                            !form.project && "text-white/40",
                          )}
                        >
                          <option value="" disabled className="bg-ink2 text-mist">
                            Select type
                          </option>
                          {projectTypes.map((p) => (
                            <option key={p} value={p} className="bg-ink2 text-white">
                              {p}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-mist">
                          ▾
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* message */}
                  <div>
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Tell us about your project, goals and timeline…"
                      value={form.message}
                      onChange={update("message")}
                      data-cursor="link"
                      className="form-textarea"
                    />
                  </div>

                  {/* error */}
                  {error && (
                    <div className="rounded-full border border-red-500/25 bg-red-500/8 px-5 py-3 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-red-400">
                      Something went wrong. Please try again or message us on
                      WhatsApp directly.
                    </div>
                  )}
                </div>

                {/* card footer */}
                <div className="relative flex flex-wrap items-center gap-3 border-t border-white/8 px-6 py-5 sm:px-8 sm:py-6">
                  <Magnetic strength={0.25}>
                    <button
                      type="submit"
                      disabled={submitting}
                      data-cursor="link"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white glow-red transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
                      <span className="relative">
                        {submitting ? "Sending…" : "Send Message"}
                      </span>
                      {!submitting && (
                        <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      )}
                      {submitting && (
                        <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      )}
                    </button>
                  </Magnetic>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white/30 hover:text-white"
                  >
                    Or WhatsApp us
                    <span className="h-1.5 w-1.5 rounded-full bg-brand transition-transform duration-300 group-hover:scale-150" />
                  </a>
                </div>

                {/* bottom note */}
                <div className="border-t border-white/6 px-6 py-3.5 sm:px-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                    Your message will be sent via WhatsApp. We never share your
                    information with third parties.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
