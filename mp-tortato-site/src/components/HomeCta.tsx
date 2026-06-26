"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GridPattern from "./GridPattern";
import ShapeGrid from "./ShapeGrid";

export default function HomeCta() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => { setIsDesktop(window.innerWidth >= 768); }, []);

  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      {isDesktop && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
          <ShapeGrid speed={0.4} squareSize={48} direction="diagonal" borderColor="rgba(255,255,255,0.18)" shape="square" hoverTrailAmount={0} />
        </div>
      )}
      <GridPattern tone="dark" size={64} />

      <motion.div
        aria-hidden
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full bg-brand-mid opacity-30 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{
          x: [0, -25, 12, 0],
          y: [0, 18, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-brand-mid/50 opacity-25 blur-3xl"
      />

      <div className="container-px relative z-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow text-white/70">Pronto para começar</span>
            <h2 className="h2-display mt-6 text-white">
              <span className="text-white/55">Entre em contato.</span>
              <br />
              E compartilhe suas ideias.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 md:text-[17px]">
              Atendimento personalizado pelo WhatsApp.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end">
            <Link
              href="/contato"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-white px-6 py-4 text-[15px] font-semibold text-brand transition-all duration-300 hover:bg-brand-ice sm:w-auto"
            >
              Solicitar orçamento
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/obras"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-full border border-white/20 bg-white/[0.04] px-6 py-4 text-[15px] font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              Ver obras
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
