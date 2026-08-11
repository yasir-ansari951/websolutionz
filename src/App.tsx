import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Component, useEffect, type ReactNode } from "react";
import { setLenis } from "@/lib/smoothScroll";
import { ScrollProgress } from "@/components/ui";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandStory } from "@/components/BrandStory";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Stats } from "@/components/Stats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
          <h1 className="font-display text-4xl uppercase text-white sm:text-5xl">
            Something went wrong
          </h1>
          <p className="mt-4 max-w-md text-base text-mist">
            An unexpected error occurred. Please refresh the page or contact us
            directly.
          </p>
          <a
            href="mailto:info.websolutinz@gmail.com"
            className="mt-8 rounded-full bg-brand px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white"
          >
            Contact Support
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    window.scrollTo(0, 0);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(t);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Cursor />
      <ScrollProgress />
      <div className="grain-layer" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <Navbar />

      <main id="main-content" className="relative">
        <Hero />
        <BrandStory />
        <Services />
        <Work />
        <Process />
        <WhyChooseUs />
        <Testimonials />
        <Stats />
        <Contact />
      </main>

      <Footer />
    </ErrorBoundary>
  );
}
