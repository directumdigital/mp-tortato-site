"use client";

import { motion } from "framer-motion";
import { Diamond, Target, Sparkles } from "lucide-react";
import GridPattern from "./GridPattern";

const TOTAL_PILARES = 3;

const PILARES = [
  {
    icon: Diamond,
    title: "Missão",
    body: "Desenvolver e fabricar estruturas metálicas e soluções industriais com excelência, segurança e precisão, agregando valor aos projetos de nossos clientes e contribuindo para o crescimento da indústria por meio da inovação, qualidade e comprometimento.",
  },
  {
    icon: Target,
    title: "Visão",
    body: "Ser reconhecida como uma das principais referências do Sul do Brasil em estruturas metálicas pesadas e soluções industriais, destacando-se pela tecnologia, confiabilidade, capacidade de execução e constante evolução.",
  },
];

const VALORES = [
  {
    title: "Comprometimento",
    body: "Cumprir prazos e honrar cada compromisso assumido.",
  },
  {
    title: "Qualidade",
    body: "Buscar a excelência em cada detalhe, do projeto à entrega.",
  },
  {
    title: "Segurança",
    body: "Priorizar a integridade das pessoas e a confiabilidade dos processos.",
  },
  {
    title: "Inovação",
    body: "Investir continuamente em tecnologia, equipamentos e melhoria contínua.",
  },
  {
    title: "Ética e Transparência",
    body: "Construir relações de confiança com clientes, parceiros e colaboradores.",
  },
  {
    title: "Valorização das Pessoas",
    body: "Acreditar que o crescimento da empresa acontece por meio do desenvolvimento das pessoas.",
  },
  {
    title: "Responsabilidade",
    body: "Atuar com seriedade, respeito e responsabilidade em cada projeto executado.",
  },
];

const QUOTE =
  "A MP nasceu de um sonho, cresceu com trabalho e segue investindo em tecnologia, pessoas e inovação para construir o futuro da indústria brasileira.";

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
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
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
                    {String(i + 1).padStart(2, "0")} / {String(TOTAL_PILARES).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-8 text-[22px] font-extrabold leading-tight tracking-tight text-brand">
                  {p.title}
                </h3>

                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-5 overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-8 shadow-soft md:p-10"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
              <Sparkles size={18} strokeWidth={1.75} />
            </span>
            <span className="mono text-[11px] font-medium tracking-wider text-slate-400">
              {String(TOTAL_PILARES).padStart(2, "0")} / {String(TOTAL_PILARES).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-8 text-[22px] font-extrabold leading-tight tracking-tight text-brand">
            Valores
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.map((v) => (
              <div key={v.title}>
                <div className="flex items-center gap-2">
                  <Diamond size={10} strokeWidth={2.5} className="shrink-0 text-brand-mid" />
                  <h4 className="text-[15px] font-bold text-brand">{v.title}</h4>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-3xl text-center"
        >
          <span className="mono select-none text-[64px] leading-none text-brand-mid/25">“</span>
          <p className="-mt-6 text-[19px] font-medium italic leading-relaxed text-brand md:text-[22px]">
            {QUOTE}
          </p>
          <span className="mt-6 block h-px w-16 mx-auto bg-brand-mid/30" />
        </motion.blockquote>
      </div>
    </section>
  );
}
