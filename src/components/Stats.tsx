import { motion } from "framer-motion";
import { stats } from "@/lib/data";
import { Counter, SectionLabel } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      {/* ghost word */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center">
        <span className="font-display text-[28vw] uppercase leading-none text-stroke-ghost">
          Results
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <SectionLabel index="08" title="By The Numbers" />

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="border-t border-white/[0.1] pt-6"
            >
              <div className="font-display text-[clamp(2.6rem,7.5vw,5.5rem)] leading-none text-white">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-mist">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
