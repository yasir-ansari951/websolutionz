import { useEffect, useRef } from "react";

/**
 * Custom cursor — red glowing ring with a trailing lag, an instant dot,
 * and an interactive hover scale. Active only on fine-pointer devices.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

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
        ringRef.current && (ringRef.current.style.opacity = "1");
        dotRef.current && (dotRef.current.style.opacity = "1");
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
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
