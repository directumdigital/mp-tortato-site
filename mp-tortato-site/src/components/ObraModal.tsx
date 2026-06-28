"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Building2, type LucideIcon } from "lucide-react";
import type { Obra } from "@/lib/site-data";

export default function ObraModal({
  obra,
  onClose,
}: {
  obra: Obra | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!obra) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.dispatchEvent(new CustomEvent("obra-modal", { detail: { open: true } }));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("obra-modal", { detail: { open: false } }));
    };
  }, [obra, onClose]);

  return (
    <AnimatePresence>
      {obra && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-deep/70 p-4 backdrop-blur-md md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="obra-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl2 bg-white shadow-2xl"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand shadow-soft backdrop-blur transition-all hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-mid/40"
            >
              <X size={20} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-ice">
                <Image
                  src={obra.gallery[0]}
                  alt={obra.cliente}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                    {obra.segmento}
                  </span>
                  <h3
                    id="obra-title"
                    className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl"
                  >
                    {obra.cliente}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] text-white/80 md:text-[17px]">
                    {obra.titulo}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-px bg-slate-100 md:grid-cols-3">
                <MetaItem icon={Building2} label="Segmento" value={obra.segmento} />
                <MetaItem icon={MapPin} label="Local" value={obra.local} />
                <MetaItem icon={Calendar} label="Ano" value={obra.ano} />
              </div>

              <div className="p-6 md:p-10">
                <div>
                  <span className="mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-brand-mid">
                    Sobre o projeto
                  </span>
                  <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-[17px]">
                    {obra.descricao}
                  </p>
                </div>

                <div className="mt-10">
                  <span className="mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-brand-mid">
                    Galeria
                  </span>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {obra.gallery.slice(1).map((src, i) => (
                      <div
                        key={src + i}
                        className="relative aspect-[4/3] overflow-hidden rounded-card bg-brand-ice"
                      >
                        <Image
                          src={src}
                          alt={`${obra.cliente} — imagem ${i + 2}`}
                          fill
                          loading="lazy"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white px-6 py-4">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-ice text-brand">
        <Icon size={16} strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <div className="mono text-[10px] font-medium uppercase tracking-[0.2em] text-brand-mid">
          {label}
        </div>
        <div className="mt-0.5 truncate text-[14px] font-semibold text-brand">{value}</div>
      </div>
    </div>
  );
}
