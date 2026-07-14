import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

/* ----------------------------------------------------------------
   Magnetic — element drifts toward the cursor (desktop only)
----------------------------------------------------------------- */
export function Magnetic({
  children,
  className,
  strength = 0.4,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor="magnetic"
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------
   Section label — mono index + line + title
----------------------------------------------------------------- */
export function SectionLabel({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.34em] text-mist",
        className,
      )}
    >
      <span className="text-brand">{index}</span>
      <motion.span
        className="h-px w-12 origin-left bg-white/25"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <span>{title}</span>
    </div>
  );
}

/* ----------------------------------------------------------------
   MaskReveal — line/word masked up-shift reveal
----------------------------------------------------------------- */
export function MaskReveal({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <span className={cn("inline-block overflow-hidden align-bottom", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once, margin: "-8% 0px" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ----------------------------------------------------------------
   Stagger container helpers
----------------------------------------------------------------- */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ----------------------------------------------------------------
   ScrollProgress — top progress bar driven by window scroll
----------------------------------------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[91] h-[2px] w-full origin-left bg-brand"
      aria-hidden="true"
    />
  );
}

/* ----------------------------------------------------------------
   Counter — count-up on scroll into view
----------------------------------------------------------------- */
export function Counter({
  to,
  suffix = "",
  duration = 2,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const display = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(eased * to);
      if (display.current) display.current.textContent = String(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      <span ref={display}>0</span>
      {suffix}
    </span>
  );
}
