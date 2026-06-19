"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";

const TITLE_LINE_1 = "Da garagem ao aço";
const TITLE_LINE_2 = "em escala industrial.";

const SLIDES = [
  { src: "/empresa/fachada.jpg", alt: "Fachada da MP Tortato" },
  { src: "/empresa/barracao-1.jpg", alt: "Barracão MP Tortato" },
  { src: "/empresa/barracao-2.jpg", alt: "Parque fabril MP Tortato" },
  { src: "/empresa/barracao-3.jpg", alt: "Estruturas em produção" },
  { src: "/empresa/maquinario-solda-1.jpg", alt: "Maquinário de solda" },
  { src: "/empresa/maquinario-solda-2.jpg", alt: "Maquinário industrial" },
];

const SLIDE_DURATION = 4500;

export default function EmpresaHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.src}
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.04,
            }}
            transition={{
              opacity: { duration: 1.8, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 5, ease: "linear" },
            }}
            className="absolute inset-0 will-change-[opacity,transform]"
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i < 2}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand/85 via-brand/65 to-brand"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(42,58,140,0.45), transparent 60%)",
        }}
      />

      <motion.div
        aria-hidden
        animate={{ x: [0, 32, -14, 0], y: [0, -22, 16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-brand-mid opacity-25 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -26, 12, 0], y: [0, 20, -12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-44 -left-28 h-[460px] w-[460px] rounded-full bg-brand-mid/45 opacity-20 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,15,61,0)_55%,rgba(10,15,61,0.9))]"
      />

      <div className="container-px relative z-10 pb-24 pt-36 md:pb-32 md:pt-48">
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="breadcrumb"
          className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/70"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Início
          </Link>
          <ChevronRight size={14} className="text-white/50" />
          <span className="text-white">Empresa</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex items-center gap-3"
        >
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="mono text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">
            Curitiba/PR · Desde 2022
          </span>
        </motion.div>

        <h1 className="h1-display mt-8 max-w-5xl text-white">
          <RevealLine text={TITLE_LINE_1} delay={0.2} muted />
          <RevealLine text={TITLE_LINE_2} delay={0.45} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85"
        >
          Trajetória, propósito e os marcos de uma metalúrgica de base nascida em Curitiba — construída com engenharia, parque fabril próprio e equipe técnica qualificada.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-10 md:max-w-2xl"
        >
          {[
            { v: "+700m²", l: "Área fabril" },
            { v: "2022", l: "Fundação" },
            { v: "100%", l: "Qualidade" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-2xl font-extrabold tracking-tight text-white md:text-4xl">
                {s.v}
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 md:text-[11px]">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-16 flex items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55"
          >
            <span>Role para conhecer nossa história</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20"
            >
              <ArrowDown size={12} />
            </motion.span>
          </motion.div>

          <div className="hidden items-center gap-2 md:flex">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className="group inline-flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/35 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealLine({
  text,
  delay = 0,
  muted = false,
}: {
  text: string;
  delay?: number;
  muted?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`block ${muted ? "text-white/55" : "text-white"}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
