import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

const words = [
  { w: "CREATE", k: "We start with a bold, unmissable idea." },
  { w: "DESIGN", k: "We shape it into a cinematic experience." },
  { w: "DEVELOP", k: "We engineer it to perform flawlessly." },
  { w: "LAUNCH", k: "We ship it and scale it relentlessly." },
];

function StoryWord({
  word,
  kicker,
  index,
  count,
  progress,
}: {
  word: string;
  kicker: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / (count - 1);
  const c = index * seg;
  const pr = seg * 0.16;
  const k = [c - seg + pr, c - pr, c + pr, c + seg - pr];
  const opacity = useTransform(progress, k, [0, 1, 1, 0], { clamp: false });
  const scale = useTransform(progress, k, [1.18, 1, 1, 1.18]);
  const y = useTransform(progress, k, [80, 0, 0, -80]);
  const blurPx = useTransform(progress, k, [14, 0, 0, 14]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  return (
    <motion.div
      style={{ opacity, scale, y, filter }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <span className="mb-5 font-mono text-[11px] uppercase tracking-[0.4em] text-brand">
        0{index + 1} / 0{count}
      </span>
      <h2 className="font-display uppercase leading-[0.9] tracking-tight text-[clamp(2.6rem,10.5vw,8.5rem)] text-white text-glow-red">
        {word}
      </h2>
      <p className="mt-6 max-w-md font-mono text-xs uppercase tracking-[0.2em] text-mist sm:text-sm">
        {kicker}
      </p>
    </motion.div>
  );
}

export function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="about" className="relative" style={{ height: "340vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* ambient glow */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.4]),
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[150px]"
        />

        {/* top label */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 pt-28 font-mono text-[11px] uppercase tracking-[0.3em] text-mist sm:px-10">
          <span className="flex items-center gap-3">
            <span className="text-brand">§</span> The Method
          </span>
          <span className="hidden sm:block">From idea to impact</span>
        </div>

        {/* words */}
        <div className="relative flex flex-1 items-center justify-center">
          {words.map((item, i) => (
            <StoryWord
              key={item.w}
              word={item.w}
              kicker={item.k}
              index={i}
              count={words.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* progress bar */}
        <div className="relative z-10 mx-auto mb-10 w-full max-w-[1600px] px-6 sm:px-10">
          <div className="h-px w-full bg-white/10">
            <motion.div style={{ width: barWidth }} className="h-full bg-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
