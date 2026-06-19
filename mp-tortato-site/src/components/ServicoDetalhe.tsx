"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { segmentos, type Servico } from "@/lib/site-data";

export default function ServicoDetalhe({ servico }: { servico: Servico }) {
  const segs = segmentos.filter((s) =>
    servico.segmentosRelacionados.includes(s.slug)
  );

  return (
    <>
      <section className="relative bg-white py-24 md:py-32">
        <div className="container-px">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <span className="eyebrow">{servico.eyebrow}</span>
              <h2 className="h2-display mt-6 text-brand">
                <span className="text-slate-400">Aço em </span>
                {servico.title.toLowerCase()} sob medida.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-[17px]">
                {servico.intro}
              </p>

              <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
                {servico.entregaveis.map((e) => (
                  <li
                    key={e}
                    className="flex items-start gap-3 rounded-card border border-black/[0.06] bg-white p-4 transition-all duration-300 hover:border-brand-mid/30 hover:shadow-soft"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-ice text-brand-mid">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span className="text-[14.5px] font-medium text-ink">{e}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-xl2 bg-brand lg:col-span-5"
            >
              <Image
                src={servico.image}
                alt={servico.title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                <span className="mono text-[11px] font-medium tracking-wider text-white/65">
                  MP Tortato · {servico.title}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative bg-brand-ice py-24 md:py-32">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="eyebrow">Como executamos</span>
            <h2 className="h2-display mt-6 text-brand">
              <span className="text-slate-400">Quatro etapas, </span>
              um resultado.
            </h2>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {servico.processo.map((p, i) => (
              <motion.li
                key={p.step}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-card border border-black/[0.06] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:shadow-soft"
              >
                <span className="mono text-[11px] font-medium tracking-wider text-brand-mid">
                  Etapa 0{i + 1}
                </span>
                <h3 className="mt-4 text-[18px] font-extrabold leading-tight tracking-tight text-brand">
                  {p.step}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  {p.body}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {segs.length > 0 && (
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
                <span className="eyebrow">Segmentos atendidos</span>
                <h2 className="h2-display mt-6 text-brand">
                  <span className="text-slate-400">{servico.title} para </span>
                  cada indústria.
                </h2>
              </div>
            </motion.div>

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {segs.map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/segmentos/${s.slug}`}
                    className="group flex h-full flex-col rounded-card border border-black/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:shadow-soft"
                  >
                    <span className="mono text-[11px] font-medium tracking-wider text-brand-mid">
                      Segmento
                    </span>
                    <h3 className="mt-4 text-[20px] font-extrabold leading-tight tracking-tight text-brand">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {s.eyebrow}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
                      Ver segmento
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
      )}
    </>
  );
}
