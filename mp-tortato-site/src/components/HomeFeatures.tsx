"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Spotlight from "./Spotlight";
import GridPattern from "./GridPattern";
import { features } from "@/lib/site-data";

export default function HomeFeatures() {
  return (
    <section className="relative isolate overflow-hidden bg-brand py-24 md:py-32">
      <Image
        src="/mp-tortato-facility.jpg"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 object-cover object-[25%_center]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand/85 via-brand/55 to-brand/85"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(42,58,140,0.25), transparent 70%)",
        }}
      />
      <GridPattern tone="dark" size={56} />

      <div className="container-px relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="eyebrow text-white/70">Por que MP Tortato</span>
            <h2 className="h2-display mt-6 text-white">
              <span className="text-white/55">Precisão no aço, </span>
              compromisso com prazo.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/75 md:text-[17px]">
              Engenharia integrada, parque fabril próprio e equipe técnica qualificada para entregar projetos industriais com previsibilidade.
            </p>
            <Link
              href="/empresa"
              className="group mt-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-brand-ice"
            >
              Conheça o parque fabril
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Spotlight
                    tone="dark"
                    className="h-full rounded-card border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] md:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="mono text-[11px] font-medium tracking-wider text-white/65">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-12 bg-white/25" />
                    </div>
                    <h3 className="mt-5 text-[20px] font-extrabold leading-tight tracking-tight text-white md:text-[22px]">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                      {f.body}
                    </p>
                  </Spotlight>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
