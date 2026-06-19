"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
            <span className="eyebrow">Portfólio</span>
            <h2 className="h2-display mt-5 text-brand">
              Aço entregue, instalado e operando.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-700">
            Clique em uma obra para ver descrição completa e galeria de imagens.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl2 bg-brand text-left shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-mid/30"
    >
      <Image
        src={obra.thumb}
        alt={`Obra — ${obra.cliente}`}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/50 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div className="flex justify-end">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:bg-white group-hover:text-brand">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Projeto em aço
          </span>
          <h3 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
            {obra.cliente}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}
