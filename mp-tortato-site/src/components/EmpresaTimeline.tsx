"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { siteData } from "@/lib/site-data";

export default function EmpresaTimeline() {
  return (
    <>
      {/* Mobile */}
      <section className="bg-white py-20 md:hidden">
        <div className="container-px">
          <span className="eyebrow">Trajetória</span>
          <h2 className="h2-display mt-6 text-brand">
            <span className="text-slate-400">Marcos da </span>
            MP Tortato.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
            Cada etapa reforça a base: engenharia, aço e qualidade industrial.
          </p>
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

      {/* Desktop */}
      <section className="hidden bg-white py-24 md:block">
        <div className="container-px">
          <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <span className="eyebrow">Trajetória</span>
              <h2 className="h2-display mt-6 text-brand">
                <span className="text-slate-400">Marcos da </span>
                MP Tortato.
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-slate-700 md:text-base">
                Cada etapa reforça a base: engenharia, aço e qualidade
                industrial. Role para acompanhar a trajetória.
              </p>
            </motion.div>

            <div className="relative lg:col-span-7">
              <div className="absolute left-4 top-0 h-full w-px bg-brand/10" />
              <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand-mid via-brand to-brand" />

              <motion.ol
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
                className="space-y-10 md:space-y-12"
              >
                {siteData.timeline.map((t) => (
                  <TimelineItem
                    key={t.year}
                    year={t.year}
                    title={t.title}
                    body={t.body}
                    future={t.future}
                  />
                ))}
              </motion.ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TimelineItem({
  year,
  title,
  body,
  future,
}: {
  year: string;
  title: string;
  body: string;
  future: boolean;
}) {
  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12"
    >
      <span
        className={`absolute left-4 top-2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
          future ? "border-brand bg-white" : "border-brand bg-brand"
        }`}
      >
        {future && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/40" />
        )}
      </span>

      <div className="group relative overflow-hidden rounded-card border border-black/[0.06] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:shadow-[0_24px_60px_-24px_rgba(10,15,61,0.35)] md:p-7">
        <div className="flex items-center gap-2">
          <span className="mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-mid">
            {year}
          </span>
          {future && (
            <span className="inline-flex items-center gap-1 rounded-full border border-brand-mid/30 bg-brand-ice px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
              <Sparkles size={10} /> Próximo passo
            </span>
          )}
        </div>
        <h3 className="mt-3 text-[22px] font-extrabold leading-tight tracking-tight text-brand md:text-[24px]">
          {title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-slate-700">
          {body}
        </p>
      </div>
    </motion.li>
  );
}
