"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ShapeGrid from "./ShapeGrid";

type Crumb = { href: string; label: string };

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  showShapeGrid = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  showShapeGrid?: boolean;
}) {
  const trail: Crumb[] =
    breadcrumbs && breadcrumbs.length > 0
      ? breadcrumbs
      : [{ href: "/", label: "Início" }, { href: "#", label: eyebrow }];

  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      {showShapeGrid && (
        <div aria-hidden className="absolute inset-0 opacity-50">
          <ShapeGrid
            speed={0.4}
            squareSize={48}
            direction="diagonal"
            borderColor="rgba(255,255,255,0.18)"
            hoverFillColor="rgba(255,255,255,0.85)"
            shape="square"
            hoverTrailAmount={3}
          />
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(42,58,140,0.55),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,15,61,0)_60%,rgba(10,15,61,0.6))]"
      />

      <div className="container-px relative z-10 pb-14 pt-28 md:pb-28 md:pt-44">
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/70"
        >
          {trail.map((c, i) => {
            const isLast = i === trail.length - 1;
            return (
              <span key={`${c.href}-${i}`} className="inline-flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} className="text-white/50" />}
                {isLast ? (
                  <span className="text-white">{c.label}</span>
                ) : (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                )}
              </span>
            );
          })}
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="h1-display mt-8 max-w-4xl text-white"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
