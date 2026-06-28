"use client";

import { motion } from "framer-motion";
import { Diamond, Target, Square } from "lucide-react";
import GridPattern from "./GridPattern";

const PILARES = [
  {
    icon: Diamond,
    title: "Missão",
    body: "Entregar estruturas e peças metálicas sob medida com precisão de engenharia, prazo cumprido e qualidade industrial.",
    bullets: null,
  },
  {
    icon: Target,
    title: "Visão",
    body: "Ser referência em fabricação metálica no Sul do país, reconhecida pela confiabilidade técnica e pela capacidade de crescer com escala industrial.",
    bullets: null,
  },
  {
    icon: Square,
    title: "Valores",
    body: null,
    bullets: [
      "Precisão de engenharia",
      "Compromisso com o prazo",
      "Segurança no chão de fábrica",
      "Transparência com o cliente",
    ],
  },
];

export default function EmpresaPilares() {
  return (
    <section className="relative overflow-hidden bg-brand-ice py-24 md:py-32">
      <GridPattern tone="light" size={56} />

      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="eyebrow">Pilares</span>
          <h2 className="h2-display mt-6 text-brand">
            <span className="text-slate-400">O que sustenta a </span>
            MP Tortato.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {PILARES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-8 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="mono text-[11px] font-medium tracking-wider text-slate-400">
                    {String(i + 1).padStart(2, "0")} / {String(PILARES.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-8 text-[22px] font-extrabold leading-tight tracking-tight text-brand">
                  {p.title}
                </h3>

                {p.body && (
                  <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
                    {p.body}
                  </p>
                )}

                {p.bullets && (
                  <ul className="mt-3 space-y-2">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[14.5px] text-slate-600">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
