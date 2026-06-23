"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GalleryGrid from "./GalleryGrid";
import { segmentos } from "@/lib/site-data";

export default function HomeServices() {
  const featured = segmentos.slice(0, 3);

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
            <span className="eyebrow">Segmentos atendidos</span>
            <h2 className="h2-display mt-6 text-brand">
              <span className="text-slate-400">Aço para </span>
              cada indústria.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Atuamos em diferentes segmentos com soluções metálicas sob medida.
          </p>
        </motion.div>

        <div className="mt-16">
          <GalleryGrid items={featured} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/contato"
            className="group inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-brand-mid hover:-translate-y-0.5"
          >
            Saiba mais
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
