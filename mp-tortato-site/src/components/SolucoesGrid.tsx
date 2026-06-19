"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  DraftingCompass,
  Factory,
  HardHat,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import GridPattern from "./GridPattern";
import Spotlight from "./Spotlight";
import BarrasLoopBg from "./BarrasLoopBg";
import { servicos } from "@/lib/site-data";

const icons: Record<string, LucideIcon> = {
  Engenharia: DraftingCompass,
  Fabricação: Factory,
  Implantação: HardHat,
  Manutenção: Wrench,
};

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
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="order-2 grid grid-cols-2 gap-4 lg:order-1 lg:col-span-6"
          >
            {servicos.map((s, i) => {
              const Icon = icons[s.title] ?? DraftingCompass;
              return (
                <motion.div
                  key={s.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Spotlight
                    tone="dark"
                    className="h-full rounded-card border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] md:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white">
                        <Icon size={20} strokeWidth={1.75} />
                      </span>
                      <span className="mono text-[11px] font-medium tracking-wider text-white/55">
                        0{i + 1} / 0{servicos.length}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[20px] font-extrabold leading-tight tracking-tight text-white md:text-[22px]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">
                      {s.body}
                    </p>
                  </Spotlight>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-6"
          >
            <span className="eyebrow text-white/70">Frentes de atuação</span>
            <h2 className="h2-display mt-6 text-white">
              <span className="text-white/55">Para cada desafio, uma </span>
              solução em aço.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 md:text-[17px]">
              Engenharia, fabricação, implantação e manutenção integradas — atendendo indústria, construção, agronegócio e fabricantes de máquinas.
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
      </div>
    </section>
  );
}
