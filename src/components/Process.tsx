import { motion } from "framer-motion";
import { processSteps } from "@/lib/data";
import { MaskReveal, SectionLabel } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ink2 py-24 sm:py-32">
      {/* floating graphic */}
      <div className="pointer-events-none absolute right-[8%] top-[20%] hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="h-40 w-40 rounded-full border border-dashed border-white/10"
        >
          <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand" />
        </motion.div>
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        {/* sticky header */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel index="05" title="The Process" />
          <h2 className="mt-8 font-display uppercase leading-[0.9] tracking-tight text-[clamp(2rem,5vw,4.2rem)] text-white">
            <MaskReveal>How we</MaskReveal>
            <br />
            <MaskReveal delay={0.08}>make it</MaskReveal>
            <br />
            <MaskReveal delay={0.16} className="text-stroke-red">
              happen
            </MaskReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-6 max-w-sm text-base leading-relaxed text-mist"
          >
            A proven six-step rhythm that turns ambitious briefs into shipped,
            measurable products — without the chaos.
          </motion.p>
        </div>

        {/* steps */}
        <div>
          {processSteps.map((step, i) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
              className="group relative grid grid-cols-[auto_1fr] items-start gap-5 border-t border-white/[0.08] py-8 sm:gap-10 sm:py-10"
            >
              <motion.span
                initial={{ scale: 0.7, opacity: 0.2 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 + 0.1 }}
                className="font-display text-[clamp(2.2rem,7vw,5rem)] leading-none text-white/15 transition-colors duration-500 group-hover:text-brand group-hover:text-glow-red"
              >
                {step.no}
              </motion.span>
              <div className="pt-2 sm:pt-4">
                <h3 className="font-display text-2xl uppercase text-white sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-mist sm:text-base">
                  {step.text}
                </p>
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
