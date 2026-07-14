import { motion } from "framer-motion";
import { whyItems } from "@/lib/data";
import { MaskReveal, SectionLabel } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="06" title="Why Choose Us" />
            <h2 className="mt-8 font-display uppercase leading-[0.9] tracking-tight text-[clamp(2rem,5vw,4.6rem)] text-white">
              <MaskReveal>Built to</MaskReveal>
              <br />
              <MaskReveal delay={0.1} className="text-stroke-red">
                outclass
              </MaskReveal>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-xs text-base leading-relaxed text-mist"
          >
            We don't chase trends — we engineer advantage. Six reasons brands
            stay with us project after project.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.08 }}
              data-cursor="link"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:bg-white/[0.04] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-brand">
                  0{i + 1}
                </span>
                <span className="text-white/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-brand">
                  ↗
                </span>
              </div>

              <h3 className="mt-10 font-display text-3xl uppercase text-white sm:text-4xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {item.text}
              </p>

              <div className="mt-6 h-px w-10 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
