"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GridPattern from "./GridPattern";
import BarrasLoopBg from "./BarrasLoopBg";

export default function SolucoesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <BarrasLoopBg sectionRef={sectionRef} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand/80 via-brand/65 to-brand/90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,15,61,0.25) 0%, rgba(10,15,61,0.7) 80%)",
        }}
      />
      <GridPattern tone="dark" size={64} />

      <motion.div
        aria-hidden
        animate={{ x: [0, 28, -12, 0], y: [0, -18, 14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-brand-mid opacity-30 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -22, 10, 0], y: [0, 16, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[380px] w-[380px] rounded-full bg-brand-mid/50 opacity-25 blur-3xl"
      />

      <div className="container-px relative z-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow text-white/70">Frentes de atuação</span>
          <h2 className="h2-display mt-6 text-white">
            <span className="text-white/55">Para cada desafio, uma </span>
            solução.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 md:text-[17px]">
            Engenharia, fabricação, implantação e manutenção integradas — atendendo indústria, agronegócio, química, alimentícia, reciclagem e eletromecânica.
          </p>
          <Link
            href="/contato"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-[15px] font-semibold text-brand transition-all duration-300 hover:bg-brand-ice"
          >
            Solicitar orçamento
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
