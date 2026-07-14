import { motion } from "framer-motion";
import { projects, services, type Service } from "@/lib/data";
import { MaskReveal, SectionLabel } from "./ui";

function getRelatedName(id: string) {
  return projects.find((p) => p.id === id)?.name ?? id;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, ease: EASE, delay: (index % 3) * 0.07 }}
      data-cursor="link"
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-brand/45 hover:bg-white/[0.045] hover:shadow-[0_0_44px_rgba(225,6,19,0.22)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-brand/0 mix-blend-screen transition-colors duration-500 group-hover:bg-brand/15" />
        <span className="absolute left-4 top-4 font-display text-4xl leading-none text-brand text-glow-red">
          {service.no}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
            {service.kicker}
          </div>
          <span className="rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.15em] text-brand">
            Example: {getRelatedName(service.relatedProjectId)}
          </span>
        </div>
        <h3 className="mt-3 font-display text-[clamp(1.25rem,2.2vw,1.9rem)] uppercase leading-none text-white">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          {service.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.deliverables.slice(0, 3).map((d) => (
            <span
              key={d}
              className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/75"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      <span className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-ink py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10">
        <SectionLabel index="03" title="What We Do" />
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <h2 className="font-display uppercase leading-[0.9] tracking-tight text-[clamp(2rem,5.2vw,4.6rem)] text-white">
            <MaskReveal>Full-service</MaskReveal>
            <br />
            <MaskReveal delay={0.1} className="text-stroke-red">
              creative engine
            </MaskReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-sm text-base leading-relaxed text-mist"
          >
            Strategy, design, code and growth in one focused system. Compact,
            sharp and built around real digital outcomes.
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.no} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
