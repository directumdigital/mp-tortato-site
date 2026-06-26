"use client";

import { motion } from "framer-motion";
import GalleryGrid from "./GalleryGrid";
import GridPattern from "./GridPattern";
import { servicos } from "@/lib/site-data";

export default function ServicosHub() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ice py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[url('/servicos/picador.png')] bg-[length:55%_auto] bg-center bg-no-repeat opacity-70 mix-blend-multiply"
      />
      <GridPattern tone="light" size={56} />
      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Frentes de atuação</span>
          <h2 className="h2-display mt-6 text-brand">
            Nossos serviços.
          </h2>
        </motion.div>

        <div className="mt-16">
          <GalleryGrid items={servicos} bento />
        </div>
      </div>
    </section>
  );
}
