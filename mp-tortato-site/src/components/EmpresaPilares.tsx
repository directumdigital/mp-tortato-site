"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  ShieldCheck,
  Users,
  Cpu,
  Clock,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import GridPattern from "./GridPattern";
import Spotlight from "./Spotlight";
import { features } from "@/lib/site-data";

const icons: Record<string, LucideIcon> = {
  "Engenharia integrada": Lightbulb,
  "Aço com rastreabilidade": ShieldCheck,
  "Parque fabril próprio": Cpu,
  "Equipe técnica qualificada": Users,
  "Prazo acordado, prazo cumprido": Clock,
  "Atendimento com os sócios": Handshake,
};

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
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <span className="eyebrow">Pilares</span>
            <h2 className="h2-display mt-6 text-brand">
              <span className="text-slate-400">O que sustenta a </span>
              MP Tortato.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Valores que orientam cada projeto, fabricação, implantação e manutenção entregue em aço.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f, i) => {
            const Icon = icons[f.title] ?? Lightbulb;
            return (
              <motion.div
                key={f.title}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Spotlight
                  tone="light"
                  className="group relative h-full overflow-hidden rounded-card border border-black/[0.06] bg-white/85 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:bg-white hover:shadow-[0_24px_60px_-24px_rgba(10,15,61,0.35)] md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white transition-all duration-300 group-hover:bg-brand-mid">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="mono text-[11px] font-medium tracking-wider text-brand-mid">
                      {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-7 text-[22px] font-extrabold leading-tight tracking-tight text-brand">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
                    {f.body}
                  </p>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-mid transition-transform duration-500 group-hover:scale-x-100"
                  />
                </Spotlight>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
