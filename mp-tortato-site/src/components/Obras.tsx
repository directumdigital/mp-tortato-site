"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { siteData, type Obra } from "@/lib/site-data";
import ObraModal from "./ObraModal";

const ALL = "Todos";

export default function Obras() {
  const [active, setActive] = useState<Obra | null>(null);
  const [filter, setFilter] = useState(ALL);

  const segmentos = [ALL, ...Array.from(new Set(siteData.obras.map((o) => o.segmento)))];
  const obrasIndexed = siteData.obras.map((o, i) => ({ ...o, _idx: i }));
  const filtered = filter === ALL ? obrasIndexed : obrasIndexed.filter((o) => o.segmento === filter);

  return (
    <section
      id="obras"
      className="relative isolate overflow-hidden bg-brand-ice py-10 md:py-14"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[url('/obras/continental.jpeg')] bg-cover bg-center bg-no-repeat opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-ice/60 via-brand-ice/40 to-brand-ice/70"
      />

      {/* Filtros */}
      <div className="mb-8 flex w-full flex-wrap justify-center gap-3 px-4">
        {segmentos.map((seg) => (
          <button
            key={seg}
            onClick={() => setFilter(seg)}
            className={`rounded-full border px-6 py-2.5 text-[15px] font-semibold transition-all duration-200 ${
              filter === seg
                ? "border-brand bg-brand text-white shadow-md"
                : "border-brand/20 bg-white/70 text-brand backdrop-blur hover:border-brand/60 hover:bg-white"
            }`}
          >
            {seg}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((obra, i) => (
            <ObraCard
              key={obra._idx}
              obra={obra}
              index={i}
              onClick={() => setActive(obra)}
            />
          ))}
        </AnimatePresence>
      </div>

      <ObraModal obra={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ObraCard({
  obra,
  index,
  onClick,
}: {
  obra: Obra;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand text-left focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-mid"
    >
      <Image
        src={obra.thumb}
        alt={`${obra.cliente} — ${obra.titulo}`}
        fill
        loading={index < 3 ? "eager" : "lazy"}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand/40 to-transparent transition-opacity duration-500 group-hover:from-brand/90 group-hover:via-brand/30" />

      <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-white/30" />

      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-end">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white backdrop-blur transition-all duration-300 group-hover:border-white/60 group-hover:bg-white group-hover:text-brand">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div>
          <h3 className="text-[22px] font-extrabold leading-[1.05] tracking-tight text-white md:text-[26px]">
            {obra.cliente}
          </h3>
          <p className="mt-2 max-w-[34ch] text-[13.5px] leading-snug text-white/80">
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
