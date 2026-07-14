import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Vector brand mark — a red-outlined frame holding a drawn "W",
 * with a single red pixel accent. Supports a stroke-draw reveal.
 */
export function LogoMark({
  draw = false,
  size = 42,
  className,
}: {
  draw?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <motion.rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="11"
        stroke="#e10613"
        strokeWidth="2.4"
        initial={draw ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <motion.path
        d="M12 33 L18 18 L24 28 L30 18 L36 33"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={draw ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: EASE, delay: draw ? 0.45 : 0 }}
      />
      <motion.rect
        x="33.5"
        y="8.5"
        width="6"
        height="6"
        rx="1.4"
        fill="#ff2a35"
        style={{ transformOrigin: "36.5px 11.5px" }}
        initial={draw ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE, delay: draw ? 1.15 : 0 }}
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display uppercase leading-none tracking-tight",
        className,
      )}
    >
      <span className="text-white">WEB</span>
      <span className="text-brand text-glow-red">Z</span>
      <span className="text-white"> SLOUTIN</span>
      <span className="text-brand text-glow-red">Z</span>
    </span>
  );
}

export function Logo({
  draw = false,
  className,
  markSize = 42,
  textSize = "text-[clamp(18px,2.5vw,26px)]",
  onClick,
}: {
  draw?: boolean;
  className?: string;
  markSize?: number;
  textSize?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href="#home"
      onClick={onClick}
      data-cursor="link"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMark draw={draw} size={markSize} />
      <Wordmark className={textSize} />
    </a>
  );
}
