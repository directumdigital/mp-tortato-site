"use client";

import { motion } from "framer-motion";
import GridPattern from "./GridPattern";
import GalleryGrid from "./GalleryGrid";
import { segmentos } from "@/lib/site-data";

export default function SegmentosHub() {
  return (
    <section className="relative overflow-hidden bg-brand-ice py-24 md:py-32">
      <GridPattern tone="light" size={56} />

      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Segmentos</span>
          <h2 className="h2-display mt-6 text-brand">
            Nossos segmentos.
          </h2>
        </motion.div>

        <div className="mt-16">
          <GalleryGrid items={segmentos} />
        </div>
      </div>
    </section>
  );
}
