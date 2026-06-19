"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { servicos } from "@/lib/site-data";

export default function HomeServices() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <span className="eyebrow">Capacidade industrial</span>
            <h2 className="h2-display mt-6 text-brand">
              <span className="text-slate-400">Da chapa bruta à </span>
              estrutura instalada.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Quatro frentes integradas — engenharia, fabricação, implantação e manutenção — sob o mesmo teto.
          </p>
        </motion.div>
      </div>

      <div className="container-px mt-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {servicos.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/servicos/${s.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl2 bg-brand md:aspect-[3/4]"
              >
              <Image
                src={s.image}
                alt={s.title}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/60 to-brand/10" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px circle at 50% 30%, rgba(255,255,255,0.12), transparent 50%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl2 ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-white/30" />

              <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="mono text-[11px] font-medium tracking-wider text-white/55">
                    0{i + 1} / 04
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur transition-all duration-300 group-hover:border-white/40 group-hover:bg-white group-hover:text-brand">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
                    {s.eyebrow}
                  </span>
                  <h3 className="mt-3 text-[32px] font-extrabold leading-[0.95] tracking-tight text-white md:text-[38px]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[20ch] text-[12.5px] leading-relaxed text-white/70">
                    {s.body}
                  </p>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
