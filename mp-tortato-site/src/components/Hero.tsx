"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden bg-brand text-white"
    >
      <Image
        src="/hero-bg.gif"
        alt="Parque fabril da MP Tortato — corte, dobra e solda de aço"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/75 to-brand/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand/40 via-transparent to-brand/60" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(42,58,140,0.45),transparent_55%)]"
      />

      <div className="container-px relative z-10 w-full pb-20 pt-28 md:pb-56 md:pt-44">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="h1-display mt-8 max-w-4xl text-white"
        >
          Transformando aço em soluções para o futuro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.45 }}
          className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/80 md:text-[19px]"
        >
          Projetamos, fabricamos, e entregamos soluções em estruturas nos mais variados nichos da indústria
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contato"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-brand transition-all duration-300 hover:bg-brand-ice hover:shadow-[0_12px_40px_-12px_rgba(255,255,255,0.4)]"
          >
            Solicitar orçamento
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/obras"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-[15px] font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/10"
          >
            Ver obras
            <ArrowRight
              size={18}
              className="opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
            />
          </Link>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 right-8 z-10 hidden items-center gap-3 md:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
          Role
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80"
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
