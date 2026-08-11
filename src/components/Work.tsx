import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { scrollToId, getLenis } from "@/lib/smoothScroll";
import { Magnetic, SectionLabel } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <article
      data-cursor="view"
      className="group relative flex h-[60vh] w-[86vw] shrink-0 flex-col sm:h-[62vh] sm:w-[58vw] lg:w-[42vw] xl:w-[36vw]"
    >
      <button
        onClick={() => onOpen(project)}
        className="relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 text-left transition-all duration-500 hover:border-brand/40 hover:shadow-[0_0_60px_rgba(225,6,19,0.32)]"
        data-cursor="link"
      >
        <div className="relative flex-1 overflow-hidden">
          <img
            src={project.image}
            alt={`${project.name} — ${project.category} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <div className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/10" />

          {/* top meta */}
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
            <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
              {project.category}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[10px] text-white backdrop-blur">
              {project.year} • {project.client}
            </span>
          </div>

          {/* center view */}
          <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink">
              View Case Study →
            </span>
          </div>

          {/* bottom stack */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-1.5 p-4">
            {project.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-white/80 backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </button>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-brand">0{index + 1}</span>
            <span className="font-display text-[clamp(1.4rem,2.6vw,2.1rem)] uppercase leading-none text-white">
              {project.name}
            </span>
          </h3>
          <p className="mt-2 line-clamp-2 max-w-[36ch] text-sm leading-relaxed text-mist">
            {project.description}
          </p>
        </div>
        <Magnetic strength={0.35}>
          <button
            onClick={() => onOpen(project)}
            data-cursor="link"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-brand"
            aria-label={`View ${project.name} case study`}
          >
            ↗
          </button>
        </Magnetic>
      </div>

      {/* metrics mini */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {project.metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
            <div className="font-display text-lg leading-none text-white">{m.value}</div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-mist">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const lenis = getLenis();

  useEffect(() => {
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[96] flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-xl" onClick={onClose} />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative m-auto flex max-h-[92svh] w-[94vw] max-w-5xl flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0c0c0c] shadow-[0_20px_90px_rgba(0,0,0,0.8)] lg:flex-row"
      >
        <button
          onClick={onClose}
          data-cursor="link"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-brand hover:text-white"
          aria-label="Close case study"
        >
          ✕
        </button>

        {/* image side */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-ink2 lg:aspect-auto lg:w-[48%]">
          <img
            src={project.image}
            alt={`${project.name} full preview`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:hidden" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-4">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* content side */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
            <span className="rounded-full bg-brand px-3 py-1 text-white">{project.category}</span>
            <span>• {project.year}</span>
            <span>• {project.client}</span>
            <span>• {project.role}</span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] uppercase leading-[0.9] text-white">
            {project.name}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-mist">{project.longDescription}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-display text-2xl text-brand">{m.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Challenge</div>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{project.challenge}</p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Solution</div>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{project.solution}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">Deliverables</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.deliverables.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/80"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <button
              onClick={() => {
                onClose();
                window.setTimeout(() => scrollToId("#contact"), 200);
              }}
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white glow-red"
            >
              Start similar project →
            </button>
            <a
              href={project.liveUrl}
              onClick={(e) => e.preventDefault()}
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white hover:border-white/40"
            >
              Preview (soon)
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);

      gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getAmount()}`,
          scrub: 1,
          pin: wrapRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
            if (counterRef.current) {
              const idx = Math.min(
                projects.length,
                Math.floor(self.progress * projects.length) + 1,
              );
              counterRef.current.textContent = String(idx).padStart(2, "0");
            }
          },
        },
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-ink">
      <div ref={wrapRef} className="relative h-[100svh] w-full overflow-hidden">
        <header className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-[1280px] items-end justify-between px-5 pt-20 sm:px-8 sm:pt-24">
          <SectionLabel index="04" title="Selected Work" />
          <div className="hidden items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mist sm:flex">
            <span className="text-brand">
              <span ref={counterRef}>01</span> / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="hidden lg:block">Drag • Click any card for full case study</span>
            <span className="lg:hidden">Scroll →</span>
          </div>
        </header>

        <div
          ref={trackRef}
          className="absolute left-0 top-1/2 flex -translate-y-1/2 items-stretch gap-4 px-5 sm:gap-6 sm:px-8"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
          ))}

          <div className="flex h-[60vh] w-[70vw] shrink-0 flex-col items-start justify-center sm:h-[62vh] sm:w-[44vw] lg:w-[28vw]">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">
              Want to be next?
            </span>
            <h3 className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2.4rem)] uppercase leading-[0.9] text-white">
              Let's build
              <br />
              <span className="text-stroke-red">something</span>
              <br />
              legendary.
            </h3>
            <p className="mt-3 max-w-[28ch] text-sm text-mist">
              Every project above is real scope, real metrics, real launch. Yours is next.
            </p>
            <button
              onClick={() => scrollToId("#contact")}
              data-cursor="link"
              className="group mt-5 inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white glow-red"
            >
              Start Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 z-20 mx-auto w-full max-w-[1280px] px-5 sm:bottom-8 sm:px-8">
          <div className="h-px w-full bg-white/10">
            <div ref={progressRef} style={{ width: "0%" }} className="h-full bg-brand" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <CaseStudyModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
