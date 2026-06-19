"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { servicos } from "@/lib/site-data";

export default function ServicosHub() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Frentes de atuação</span>
          <h2 className="h2-display mt-6 text-brand">
            <span className="text-slate-400">Quatro etapas, </span>
            uma metalúrgica.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-slate-600 md:text-base">
            Engenharia, fabricação, implantação e manutenção integradas sob o
            mesmo teto — escolha por onde quer começar.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {servicos.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/servicos/${s.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-xl2 bg-brand"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/60 to-brand/10" />
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
                    <h3 className="mt-3 text-[28px] font-extrabold leading-[0.95] tracking-tight text-white md:text-[34px]">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[40ch] text-[13px] leading-relaxed text-white/75">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
