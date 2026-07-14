import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
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
    <>
      <Cursor />
      <ScrollProgress />
      <div className="grain-layer" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <Navbar />

      <main className="relative">
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
    </>
  );
}
