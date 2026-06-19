"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { servicos, type Segmento } from "@/lib/site-data";

export default function SegmentoDetalhe({ segmento }: { segmento: Segmento }) {
  const servs = servicos.filter((s) =>
    segmento.servicosRelacionados.includes(s.slug)
  );

  return (
    <>
      <section className="relative bg-white py-24 md:py-32">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="eyebrow">{segmento.eyebrow}</span>
            <h2 className="h2-display mt-6 text-brand">
              <span className="text-slate-400">Soluções em aço para </span>
              {segmento.title.toLowerCase()}.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-[17px]">
              {segmento.intro}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-brand-ice py-24 md:py-32">
        <div className="container-px">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl2 border border-black/[0.06] bg-white p-8 shadow-soft md:p-10"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-ice text-brand">
                  <AlertTriangle size={18} strokeWidth={2.2} />
                </span>
                <span className="mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand-mid">
                  Desafios do segmento
                </span>
              </div>
              <h3 className="mt-6 text-[24px] font-extrabold leading-tight tracking-tight text-brand md:text-[28px]">
                O que costuma travar o projeto.
              </h3>
              <ul className="mt-8 space-y-4">
                {segmento.desafios.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mid" />
                    <span className="text-[14.5px] leading-relaxed text-slate-700">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl2 border border-brand/20 bg-brand p-8 text-white shadow-soft md:p-10"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                  <CheckCircle2 size={18} strokeWidth={2.2} />
                </span>
                <span className="mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
                  Como a MP Tortato resolve
                </span>
              </div>
              <h3 className="mt-6 text-[24px] font-extrabold leading-tight tracking-tight text-white md:text-[28px]">
                Aço entregue no prazo combinado.
              </h3>
              <ul className="mt-8 space-y-4">
                {segmento.solucoes.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                    <span className="text-[14.5px] leading-relaxed text-white/85">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24 md:py-32">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-2xl">
              <span className="eyebrow">Frentes aplicáveis</span>
              <h2 className="h2-display mt-6 text-brand">
                <span className="text-slate-400">Serviços para </span>
                {segmento.title.toLowerCase()}.
              </h2>
            </div>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {servs.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/servicos/${s.slug}`}
                  className="group flex h-full flex-col rounded-card border border-black/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:shadow-soft"
                >
                  <span className="mono text-[11px] font-medium tracking-wider text-brand-mid">
                    {s.eyebrow}
                  </span>
                  <h3 className="mt-4 text-[20px] font-extrabold leading-tight tracking-tight text-brand">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                    {s.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
                    Ver serviço
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
