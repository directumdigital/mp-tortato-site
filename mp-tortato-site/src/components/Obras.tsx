"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { siteData, type Obra } from "@/lib/site-data";
import ObraModal from "./ObraModal";

export default function Obras() {
  const [active, setActive] = useState<Obra | null>(null);

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
              Clientes que escolheram nosso serviço.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Trabalhos em Destaque.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.obras.map((obra, i) => (
            <ObraCard
              key={obra.slug}
              obra={obra}
              index={i}
              onClick={() => setActive(obra)}
            />
          ))}
        </div>
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl bg-brand text-left focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-mid"
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
