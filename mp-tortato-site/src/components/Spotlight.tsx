"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

const tones: Record<Tone, string> = {
  light:
    "radial-gradient(520px circle at var(--mx) var(--my), rgba(42,58,140,0.18), transparent 45%)",
  dark: "radial-gradient(520px circle at var(--mx) var(--my), rgba(255,255,255,0.10), transparent 45%)",
};

export default function Spotlight({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("group/spot relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: tones[tone] }}
      />
      {children}
    </div>
  );
}
