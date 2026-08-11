import { useEffect, useRef } from "react";

/**
 * Custom cursor — red glowing ring with a trailing lag, an instant dot,
 * and an interactive hover scale. Active only on fine-pointer devices.
 * Falls back gracefully on touch devices.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const interactive = (e.target as HTMLElement | null)?.closest?.(
        "a,button,[data-cursor],input,textarea,select,label",
      );
      document.body.classList.toggle("cursor-hover", !!interactive);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
      if (!shown) {
        shown = true;
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
    };

    const loop = () => {
      const smoothing = prefersReduced ? 0.3 : 0.18;
      rx += (mx - rx) * smoothing;
      ry += (my - ry) * smoothing;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor", "cursor-hover");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }}>
        <div className="cursor-ring-visual" />
      </div>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
    </>
  );
}
