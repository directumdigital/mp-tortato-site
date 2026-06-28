"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[67vh] items-center overflow-hidden bg-brand text-white"
    >
      <Image
        src="https://s3.directum.com.br/mptortato/barracao-1.jpg"
        alt="Parque fabril da MP Tortato — corte, dobra e solda de aço"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/75 to-brand/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand/40 via-transparent to-brand/60" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(42,58,140,0.45),transparent_55%)]"
      />

      <div className="container-px relative z-10 w-full pb-16 pt-28 md:pb-20 md:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="max-w-4xl text-[clamp(36px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-tight text-white"
        >
          Transformando aço em soluções para o futuro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.45 }}
          className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75 md:text-[18px]"
        >
          Projetamos, fabricamos, e entregamos soluções em estruturas nos mais variados nichos da indústria
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/contato"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-brand transition-all duration-300 hover:bg-brand-ice"
          >
            Solicitar orçamento
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/obras"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-6 py-3 text-[14px] font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/10"
          >
            Ver obras
            <ArrowRight size={16} className="opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
