"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteData, type Obra } from "@/lib/site-data";
import ObraModal from "./ObraModal";

const ALL = "Todos";

export default function Obras() {
  const [active, setActive] = useState<Obra | null>(null);
  const [filter, setFilter] = useState<string>(ALL);

  const segmentos = useMemo(() => {
    const set = new Set<string>();
    siteData.obras.forEach((o) => set.add(o.segmento));
    return [ALL, ...Array.from(set)];
  }, []);

  const visible = useMemo(
    () =>
      filter === ALL
        ? siteData.obras
        : siteData.obras.filter((o) => o.segmento === filter),
    [filter]
  );

  return (
    <section id="obras" className="bg-brand-ice py-24 md:py-32">
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brand/30" />
              <span className="mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-brand-mid">
                Portfólio
              </span>
            </div>
            <h2 className="h2-display mt-5 text-brand">
              Aço entregue, instalado e operando.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Projetos executados com engenharia integrada, fabricação certificada e implantação coordenada.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          role="tablist"
          aria-label="Filtrar projetos por segmento"
          className="mt-10 flex flex-wrap gap-2"
        >
          {segmentos.map((s) => {
            const activeChip = filter === s;
            return (
              <button
                key={s}
                role="tab"
                aria-selected={activeChip}
                onClick={() => setFilter(s)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[12.5px] font-semibold tracking-tight transition-all duration-200",
                  activeChip
                    ? "border-brand bg-brand text-white shadow-soft"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand/30 hover:text-brand"
                )}
              >
                {s}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-black/[0.06] md:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((obra, i) => (
              <ObraCard
                key={obra.slug}
                obra={obra}
                index={i}
                featured={i === 0}
                onClick={() => setActive(obra)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ObraModal obra={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ObraCard({
  obra,
  index,
  featured,
  onClick,
}: {
  obra: Obra;
  index: number;
  featured: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative block w-full overflow-hidden bg-brand text-left focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-mid",
        featured
          ? "aspect-[16/10] md:col-span-4 md:row-span-2 md:aspect-auto"
          : "aspect-[4/3] md:col-span-2"
      )}
    >
      <Image
        src={obra.thumb}
        alt={`${obra.cliente} — ${obra.titulo}`}
        fill
        loading={featured ? "eager" : "lazy"}
        sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
        className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand/40 to-transparent transition-opacity duration-500 group-hover:from-brand/90 group-hover:via-brand/30" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-white/30"
      />

      <div className={cn("absolute inset-0 flex flex-col justify-between p-5 md:p-6", featured && "md:p-8")}>
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
            {obra.segmento}
          </span>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white backdrop-blur transition-all duration-300 group-hover:border-white/60 group-hover:bg-white group-hover:text-brand">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div>
          <h3
            className={cn(
              "font-extrabold leading-[1.05] tracking-tight text-white",
              featured ? "text-[32px] md:text-[42px]" : "text-[22px] md:text-[26px]"
            )}
          >
            {obra.cliente}
          </h3>
          <p
            className={cn(
              "mt-2 max-w-[34ch] leading-snug text-white/80",
              featured ? "text-[15px] md:text-[16px]" : "text-[13.5px]"
            )}
          >
            {obra.titulo}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-white/65">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} strokeWidth={1.8} />
              {obra.local}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} strokeWidth={1.8} />
              {obra.ano}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
