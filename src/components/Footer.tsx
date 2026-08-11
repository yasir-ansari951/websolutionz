import { motion } from "framer-motion";
import { navLinks, socials } from "@/lib/data";
import { scrollToId, scrollToTop } from "@/lib/smoothScroll";
import { Logo } from "./Logo";
import { Marquee } from "./Marquee";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  const go = (href: string) => scrollToId(href);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div className="col-span-2 lg:col-span-1">
            <Logo markSize={40} textSize="text-xl" onClick={scrollToTop} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
              A bold creative digital studio building cinematic web experiences
              that help brands dominate online.
            </p>
          </div>

          {/* menu */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
              Menu
            </div>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => go(l.href)}
                    data-cursor="link"
                    className="group flex items-center gap-2 font-display text-lg uppercase text-white/80 transition-colors hover:text-white"
                  >
                    <span className="text-brand opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* socials */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
              Social
            </div>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="group flex items-center gap-2 font-display text-lg uppercase text-white/80 transition-colors hover:text-white"
                  >
                    <span className="text-brand opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
              Get in touch
            </div>
            <div className="mt-5 space-y-3">
              <a
                href="mailto:info.websolutinz@gmail.com"
                data-cursor="link"
                className="block font-display text-lg uppercase text-white/80 transition-colors hover:text-brand"
              >
                info.websolutinz@gmail.com
              </a>
              <a
                href="https://wa.me/923194158162"
                data-cursor="link"
                className="block font-display text-lg uppercase text-white/80 transition-colors hover:text-brand"
              >
                +92 319 415 8162
              </a>
              <p className="pt-2 text-sm text-mist">Remote · Worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* giant marquee wordmark */}
      <div className="border-t border-white/10 py-4">
        <Marquee slow>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-8 px-8 font-display text-[clamp(2.2rem,8vw,7rem)] uppercase leading-none text-white/[0.06]"
            >
              WEBZ SLOUTINZ <span className="text-brand/30">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-4 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-mist sm:flex-row sm:px-8">
          <span>© 2026 WEBZ SLOUTINZ — All rights reserved</span>
          <motion.button
            onClick={scrollToTop}
            data-cursor="link"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex items-center gap-2 text-white transition-colors hover:text-brand"
          >
            Back to top <span>↑</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
