"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const TITLE_LINE_1 = "Da garagem ao aço";
const TITLE_LINE_2 = "em escala industrial.";

const CDN = "https://s3.directum.com.br/mptortato";

export default function EmpresaHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={`${CDN}/barracao-3.jpg`}
          alt="Estruturas em produção"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
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

      <div className="container-px relative z-10 pb-16 pt-28 md:pb-32 md:pt-48">
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
            Curitiba/PR
          </span>
        </motion.div>

        <h1 className="h1-display mt-8 max-w-5xl text-white">
          <RevealLine text={TITLE_LINE_1} delay={0.2} muted />
          <RevealLine text={TITLE_LINE_2} delay={0.45} />
        </h1>
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
