import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { getLenis, scrollToId } from "@/lib/smoothScroll";
import { navLinks } from "@/lib/data";
import { Logo } from "./Logo";
import { Magnetic } from "./ui";

const EASE = [0.83, 0, 0.17, 1] as const;

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  // hide on scroll down, show on scroll up + glass after threshold
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > last && y > 240) setHidden(true);
      else setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section tracking
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    // wait for menu close before scrolling
    window.setTimeout(() => scrollToId(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <nav
          className={cn(
            "flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6",
            scrolled
              ? "glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <div onClick={() => go("#home")}>
            <Logo markSize={36} textSize="text-[clamp(16px,2vw,20px)]" />
          </div>

          {/* desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Magnetic key={link.href} strength={0.2}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  data-cursor="link"
                  className={cn(
                    "group relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300",
                    active === link.href ? "text-white" : "text-mist hover:text-white",
                  )}
                >
                  <span className="mr-1 text-brand/70">{link.index}</span>
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-brand transition-all duration-500",
                      active === link.href ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              </Magnetic>
            ))}
          </div>

          {/* cta + burger */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.3} className="hidden sm:block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("#contact");
                }}
                data-cursor="link"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white"
              >
                <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">Start Project</span>
                <span className="relative">→</span>
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              data-cursor="link"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-white"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-white"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col justify-center bg-ink/95 px-6 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" />
            <div className="relative flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.07 }}
                    className="flex items-baseline gap-3 font-display text-[14vw] uppercase leading-none text-white"
                  >
                    <span className="font-mono text-xs text-brand">{link.index}</span>
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
            >
              <a href="mailto:info.websolutinz@gmail.com">info.websolutinz@gmail.com</a>
              <a href="tel:+1238679342">+1 (238) 679 342</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
