"use client";

import { motion } from "framer-motion";
import {
  Frame,
  Layers,
  ShieldCheck,
  Boxes,
  PipetteIcon,
  Cog,
  Wrench,
  Trees,
  Fuel,
  Wheat,
  FlaskConical,
  UtensilsCrossed,
  Recycle,
  Factory,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import Spotlight from "./Spotlight";
import GridPattern from "./GridPattern";

export type GalleryItem = {
  title: string;
  short: string;
  icon: string;
};

const iconMap: Record<string, LucideIcon> = {
  frame: Frame,
  layers: Layers,
  shield: ShieldCheck,
  boxes: Boxes,
  pipe: PipetteIcon,
  cog: Cog,
  wrench: Wrench,
  trees: Trees,
  fuel: Fuel,
  wheat: Wheat,
  flask: FlaskConical,
  utensils: UtensilsCrossed,
  recycle: Recycle,
  gauge: Gauge,
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

// col-spans em grid de 6 colunas para o layout bento de 8 itens
const BENTO_COL_SPANS = [
  "lg:col-span-3", // Estruturas Metálicas
  "lg:col-span-3", // Plataformas
  "lg:col-span-3", // Guarda-corpo
  "lg:col-span-3", // Skid
  "lg:col-span-3", // Pipe Racks
  "lg:col-span-3", // Equipamentos
  "lg:col-span-3", // Suportação
  "lg:col-span-3", // Vasos de Pressão
];

export default function GalleryGrid({
  items,
  bento = false,
}: {
  items: GalleryItem[];
  bento?: boolean;
}) {
  const total = items.length.toString().padStart(2, "0");

  if (bento) {
    return (
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6"
      >
        {items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Factory;
          const index = (i + 1).toString().padStart(2, "0");
          const colSpan = BENTO_COL_SPANS[i] ?? "lg:col-span-2";

          return (
            <motion.li
              key={item.title}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col bg-white border border-gray-200 rounded-[18px] min-h-[200px] p-7 md:p-8 ${colSpan}`}
            >
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-slate-400">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
              </div>

              <div className="mt-auto pt-8">
                <h3 className="text-[20px] font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-brand-mid">
                  {item.short}
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    );
  }

  const lastAloneLg = items.length % 3 === 1;

  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-card bg-black/[0.06] sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item, i) => {
        const Icon = iconMap[item.icon] ?? Factory;
        const index = (i + 1).toString().padStart(2, "0");
        const isLast = i === items.length - 1;

        return (
          <motion.li
            key={item.title}
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`relative isolate bg-white${isLast && lastAloneLg ? " lg:col-start-2" : ""}`}
          >
            <Spotlight tone="light" className="h-full">
              <GridPattern tone="light" size={28} className="opacity-[0.35]" />
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-12 w-12 origin-top-right rotate-45 bg-brand/[0.05] transition-colors duration-500 group-hover/spot:bg-brand/[0.12]"
              />
              <div className="relative flex h-full flex-col p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand/15 bg-white text-brand shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] transition-all duration-500 group-hover/spot:border-brand/40 group-hover/spot:bg-brand group-hover/spot:text-white">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <div className="flex items-center gap-2 pt-1.5">
                    <span className="mono text-[10.5px] font-medium tracking-[0.18em] text-slate-400">
                      {index} / {total}
                    </span>
                  </div>
                </div>
                <h3 className="mt-10 text-[20px] font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-slate-500">
                  {item.short}
                </p>
                <div className="mt-8 flex items-center gap-3 pt-6">
                  <span className="h-px w-6 bg-brand transition-all duration-500 group-hover/spot:w-16" />
                  <span className="mono text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400 transition-colors duration-500 group-hover/spot:text-brand-mid">
                    MP Tortato
                  </span>
                </div>
              </div>
            </Spotlight>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
