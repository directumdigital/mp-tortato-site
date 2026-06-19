"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Factory,
  HardHat,
  Wheat,
  Cog,
  type LucideIcon,
} from "lucide-react";
import GridPattern from "./GridPattern";
import Spotlight from "./Spotlight";
import { segmentos } from "@/lib/site-data";

const icons: Record<string, LucideIcon> = {
  industria: Factory,
  "construcao-civil": HardHat,
  agronegocio: Wheat,
  maquinas: Cog,
};

export default function SegmentosHub() {
  return (
    <section className="relative overflow-hidden bg-brand-ice py-24 md:py-32">
      <GridPattern tone="light" size={56} />

      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Segmentos atendidos</span>
          <h2 className="h2-display mt-6 text-brand">
            <span className="text-slate-400">Aço para </span>
            cada indústria.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-slate-600 md:text-base">
            Atendemos quatro setores com soluções metálicas sob medida —
            engenharia, fabricação, implantação e manutenção integradas.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {segmentos.map((s, i) => {
            const Icon = icons[s.slug] ?? Factory;
            return (
              <motion.div
                key={s.slug}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/segmentos/${s.slug}`}>
                  <Spotlight
                    tone="light"
                    className="group flex h-full flex-col rounded-card border border-black/[0.06] bg-white/85 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:bg-white hover:shadow-[0_24px_60px_-24px_rgba(10,15,61,0.35)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-white transition-all duration-300 group-hover:bg-brand-mid">
                        <Icon size={24} strokeWidth={1.75} />
                      </span>
                      <span className="mono text-[11px] font-medium tracking-wider text-brand-mid">
                        0{i + 1} / 0{segmentos.length}
                      </span>
                    </div>
                    <h3 className="mt-8 text-[26px] font-extrabold leading-tight tracking-tight text-brand md:text-[30px]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] font-medium uppercase tracking-[0.16em] text-brand-mid">
                      {s.eyebrow}
                    </p>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">
                      {s.intro}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                      Ver soluções
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Spotlight>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
