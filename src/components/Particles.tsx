import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

type P = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  c: string;
};

/**
 * Canvas particle field with mouse parallax. Lightweight and GPU-friendly.
 * Reduces density on mobile and respects prefers-reduced-motion.
 */
export function Particles({
  className,
  density = 0.00009,
  color = "255,255,255",
  red = true,
}: {
  className?: string;
  density?: number;
  color?: string;
  red?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let parts: P[] = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const spawn = (): P => {
      const z = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.04 + Math.random() * 0.22) * (0.4 + z),
        r: 0.4 + z * 1.8,
        a: 0.12 + z * 0.5,
        c: red && Math.random() < 0.16 ? "225,6,19" : color,
      };
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobileDensity = isMobile ? density * 0.5 : density;
      const count = Math.min(170, Math.max(24, Math.floor(w * h * mobileDensity)));
      parts = Array.from({ length: count }, spawn);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const px = p.x + mouse.x * (p.z * 46);
        const py = p.y + mouse.y * (p.z * 46);
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      }
    };

    const update = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;
      }
    };

    let raf = 0;
    const loop = () => {
      update();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    resize();
    if (reduced) draw();
    else raf = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density, color, red]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
