"use client";

import { motion } from "framer-motion";
import { Sparkles, ImageIcon } from "lucide-react";
import { siteData } from "@/lib/site-data";

export default function EmpresaTimeline() {
  return (
    <>
      {/* Mobile */}
      <section className="bg-white py-16 md:hidden">
        <div className="container-px">
          <span className="eyebrow">Trajetória</span>
          <ol className="relative mt-10 space-y-6 pl-10">
            <div className="absolute left-4 top-0 h-full w-px bg-brand/10" />
            {siteData.timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className={`absolute left-[-24px] top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 ${t.future ? "border-brand bg-white" : "border-brand bg-brand"}`}>
                  {t.future && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/40" />}
                </span>
                <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
                  <span className="mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-mid">{t.year}</span>
                  <h3 className="mt-2 text-[18px] font-extrabold leading-tight tracking-tight text-brand">{t.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-700">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Desktop — alternating layout */}
      <section className="hidden bg-white py-24 md:block">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span className="eyebrow">Trajetória</span>
          </motion.div>

          <div className="relative">
            {/* Linha central */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-200" />

            <div className="space-y-0">
              {siteData.timeline.map((item, i) => {
                const textLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative grid grid-cols-2 items-center py-14"
                  >
                    {/* Dot central */}
                    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                      {item.future ? (
                        <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand bg-white">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/30" />
                        </span>
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand shadow-[0_0_0_5px_rgba(10,15,61,0.08)]" />
                      )}
                    </div>

                    {textLeft ? (
                      <>
                        {/* Texto — esquerda */}
                        <div className="pr-16 text-right">
                          {item.future && (
                            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand-mid/30 bg-brand-ice px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                              <Sparkles size={10} /> Próximo passo
                            </span>
                          )}
                          <div className="mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-mid">
                            {item.year}
                          </div>
                          <h3 className="mt-3 text-[28px] font-extrabold leading-tight tracking-tight text-brand lg:text-[34px]">
                            {item.title}
                          </h3>
                          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                            {item.body}
                          </p>
                        </div>
                        {/* Imagem — direita */}
                        <div className="pl-16">
                          <ImagePlaceholder label={placeholderLabel(i)} />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Imagem — esquerda */}
                        <div className="pr-16">
                          <ImagePlaceholder label={placeholderLabel(i)} />
                        </div>
                        {/* Texto — direita */}
                        <div className="pl-16">
                          {item.future && (
                            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand-mid/30 bg-brand-ice px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                              <Sparkles size={10} /> Próximo passo
                            </span>
                          )}
                          <div className="mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-mid">
                            {item.year}
                          </div>
                          <h3 className="mt-3 text-[28px] font-extrabold leading-tight tracking-tight text-brand lg:text-[34px]">
                            {item.title}
                          </h3>
                          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                            {item.body}
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function placeholderLabel(i: number) {
  const labels = ["Foto — fundação / oficina", "Foto — parque fabril", "Render — nova sede"];
  return labels[i] ?? "Foto";
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
      <ImageIcon size={32} className="text-slate-300" />
      <div className="text-center">
        <p className="text-[13px] font-medium text-slate-400">{label}</p>
      </div>
    </div>
  );
}
