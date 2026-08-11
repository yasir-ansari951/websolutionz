import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { services } from "@/lib/data";
import { scrollToId } from "@/lib/smoothScroll";
import { Particles } from "./Particles";
import { Marquee } from "./Marquee";
import { Magnetic } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const lineParent: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.028, delayChildren: delay },
  }),
};
const charChild: Variants = {
  hidden: { y: "120%" },
  show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

function SplitChars({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={cn("block", className)} aria-label={text}>
      <motion.span
        className="inline-block"
        custom={delay}
        variants={lineParent}
        initial="hidden"
        animate="show"
      >
        {text.split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span className="inline-block" variants={charChild}>
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(useTransform(mx, [-0.5, 0.5], [-70, 70]), {
    stiffness: 60,
    damping: 20,
  });
  const gy = useSpring(useTransform(my, [-0.5, 0.5], [-45, 45]), {
    stiffness: 60,
    damping: 20,
  });
  const hx = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), {
    stiffness: 80,
    damping: 22,
  });
  const hy = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 80,
    damping: 22,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink"
    >
      {/* base gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(225,6,19,0.18),transparent_55%)]" />

      {/* particles */}
      <Particles className="opacity-80" />

      {/* mouse-follow glow */}
      <motion.div style={{ x: gx, y: gy }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[140px]" />
      </motion.div>

      {/* top label */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 pt-24 font-mono text-[10px] uppercase tracking-[0.3em] text-mist sm:px-8 sm:pt-28">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          § Creative Studio
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden sm:block"
        >
          Based Worldwide
        </motion.span>
      </div>

      {/* headline block */}
      <motion.div
        style={{ x: hx, y: hy }}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10"
      >
        <h1 className="font-display uppercase leading-[0.88] tracking-tight text-[clamp(2.4rem,9vw,7.5rem)]">
          <SplitChars text="WE BUILD" delay={0.1} className="text-white" />
          <SplitChars text="DIGITAL" delay={0.35} className="text-white text-glow-red" />
          <SplitChars text="EXPERIENCES" delay={0.6} className="text-stroke-red" />
        </h1>

        <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
            className="max-w-md text-base leading-relaxed text-mist sm:text-lg"
          >
            Creative websites that help brands{" "}
            <span className="text-white">dominate</span> online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Magnetic strength={0.35}>
              <button
                onClick={() => scrollToId("#work")}
                data-cursor="link"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white glow-red sm:px-7 sm:py-4"
              >
                <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">View Work</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Magnetic>
            <Magnetic strength={0.35}>
              <button
                onClick={() => scrollToId("#contact")}
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white/40 sm:px-7 sm:py-4"
              >
                Start Project
                <span className="h-1.5 w-1.5 rounded-full bg-brand transition-transform duration-300 group-hover:scale-150" />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25 }}
        className="relative z-10 mx-auto hidden w-full max-w-[1280px] items-center justify-between px-5 pb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-mist sm:flex sm:px-8"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
            <motion.span
              animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-brand"
            />
          </span>
          Scroll
        </div>
        <span>Available for projects — 2026</span>
      </motion.div>

      {/* marquee strip */}
      <div className="relative z-10 border-y border-white/10 bg-white/[0.02] py-4">
        <Marquee>
          {services.map((s) => (
            <MarqueeItem key={s.no}>{s.title}</MarqueeItem>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function MarqueeItem({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-8 px-8 font-display text-xl uppercase text-white/70 sm:text-2xl">
      <span>{children}</span>
      <span className="text-brand">✦</span>
    </span>
  );
}
