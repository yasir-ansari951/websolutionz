import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { MaskReveal, SectionLabel } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

function Card({
  t,
  index,
}: {
  t: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, ease: EASE, delay: (index % 3) * 0.08 }}
      className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/35 hover:bg-white/[0.045] sm:p-7"
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-brand/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
          Verified Review
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
          5.0 Rating
        </div>
      </div>

      <blockquote className="mt-7 text-[15px] leading-relaxed text-white/85">
        {t.review}
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-brand/30">
          <img
            src={t.image}
            alt={t.name}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[0.1] transition-all duration-500 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-white">{t.name}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
            {t.company}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ink2 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10">
        <SectionLabel index="07" title="Testimonials" />
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <h2 className="font-display uppercase leading-[0.9] tracking-tight text-[clamp(2rem,5vw,4.4rem)] text-white">
            <MaskReveal>Client</MaskReveal>
            <br />
            <MaskReveal delay={0.1} className="text-stroke-red">
              reviews
            </MaskReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-sm text-base leading-relaxed text-mist"
          >
            Clear feedback from clients who trusted WEBZ SLOUTINZ for design,
            development, SEO and conversion-focused launches.
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
