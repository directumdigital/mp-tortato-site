"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Factory,
  HardHat,
  Clock,
  Handshake,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import Spotlight from "./Spotlight";
import GridPattern from "./GridPattern";
import { features } from "@/lib/site-data";

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  shieldCheck: ShieldCheck,
  factory: Factory,
  hardHat: HardHat,
  clock: Clock,
  handshake: Handshake,
};

export default function HomeFeatures() {
  const total = features.length.toString().padStart(2, "0");

  return (
    <section className="relative isolate overflow-hidden bg-brand py-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand via-brand to-brand-deep"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(42,58,140,0.45), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(42,58,140,0.35), transparent 60%)",
        }}
      />
      <GridPattern tone="dark" size={56} />

      <div className="container-px relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />
              <span className="mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55">
                Por que MP Tortato
              </span>
            </div>
            <h2 className="h2-display mt-6 text-white">
              <span className="text-white/55">Precisão no aço, </span>
              compromisso com prazo.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-[17px]">
              Engenharia integrada, parque fabril próprio e equipe técnica qualificada para entregar projetos industriais com previsibilidade.
            </p>
            <Link
              href="/empresa"
              className="group mt-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-brand-ice"
            >
              Conheça o parque fabril
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/10 md:grid-cols-2"
            >
              {features.map((f, i) => {
                const Icon = iconMap[f.icon] ?? Lightbulb;
                const index = (i + 1).toString().padStart(2, "0");

                return (
                  <motion.li
                    key={f.title}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative isolate bg-brand"
                  >
                    <Spotlight tone="dark" className="h-full">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-0 top-0 h-10 w-10 origin-top-right rotate-45 bg-white/[0.04] transition-colors duration-500 group-hover/spot:bg-white/[0.10]"
                      />

                      <div className="relative flex h-full flex-col p-5 md:p-6">
                        <div className="flex items-start justify-between">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-white transition-all duration-500 group-hover/spot:border-white/40 group-hover/spot:bg-white group-hover/spot:text-brand">
                            <Icon size={18} strokeWidth={1.6} />
                          </span>
                          <span className="mono text-[10px] font-medium tracking-[0.18em] text-white/45">
                            {index} / {total}
                          </span>
                        </div>

                        <div className="mt-5 flex items-baseline gap-1">
                          <span className="font-extrabold leading-none tracking-tight text-white text-[28px] md:text-[32px]">
                            {f.metric.value}
                          </span>
                          {f.metric.suffix && (
                            <span className="text-[15px] font-semibold tracking-tight text-white/70 md:text-[16px]">
                              {f.metric.suffix}
                            </span>
                          )}
                        </div>
                        <span className="mono mt-1.5 inline-block text-[9.5px] font-medium uppercase tracking-[0.22em] text-white/45">
                          {f.metric.label}
                        </span>

                        <div className="mt-4 border-t border-white/10 pt-4">
                          <h3 className="text-[15.5px] font-extrabold leading-tight tracking-tight text-white md:text-[16.5px]">
                            {f.title}
                          </h3>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">
                            {f.body}
                          </p>
                        </div>

                        <div className="mt-auto flex items-center pt-4">
                          <span className="h-px w-5 bg-white/40 transition-all duration-500 group-hover/spot:w-12 group-hover/spot:bg-white" />
                        </div>
                      </div>
                    </Spotlight>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
