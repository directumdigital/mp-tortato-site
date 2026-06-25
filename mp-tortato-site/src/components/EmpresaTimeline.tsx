"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { siteData } from "@/lib/site-data";

const FRAME_COUNT = 112;
const framePath = (i: number) =>
  `/sequence-soldador/ezgif-frame-${String(i).padStart(3, "0")}.png`;

const REVEAL_RANGES: Array<[number, number]> = [
  [0.05, 0.15],
  [0.22, 0.32],
  [0.4, 0.5],
];

export default function EmpresaTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef<number>(-1);
  const [, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.decoding = "async";
      const onSettled = () => {
        if (cancelled) return;
        count++;
        setLoaded(count);
        if (i === 1) {
          lastDrawnFrame.current = -1;
          requestAnimationFrame(() => drawFrame(0));
        }
      };
      img.onload = onSettled;
      img.onerror = onSettled;
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
      imagesRef.current.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
      imagesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const iAspect = iw / ih;
    const cAspect = cw / ch;

    let dw: number;
    let dh: number;
    let dx: number;
    let dy: number;

    if (iAspect > cAspect) {
      dh = ch;
      dw = ch * iAspect;
      dx = (cw - dw) * 0.78;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / iAspect;
      dx = 0;
      dy = (ch - dh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnFrame.current = idx;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      const last = lastDrawnFrame.current === -1 ? 0 : lastDrawnFrame.current;
      drawFrame(last);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (v) => {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(v)));
      if (idx === lastDrawnFrame.current) return;
      drawFrame(idx);
    });
    return () => unsubscribe();
  }, [frameIndex]);

  return (
    <>
      {/* Mobile: static version */}
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

      {/* Desktop: scroll-jacking animation */}
      <section
        ref={sectionRef}
        className="relative hidden bg-white md:block"
        style={{ height: "400vh" }}
      >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

        <div
          aria-hidden
          className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.55) 75%)",
          }}
        />

        <div className="container-px relative z-10 flex h-full items-center">
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
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-4 top-0 w-px bg-gradient-to-b from-brand-mid via-brand to-brand"
              />

              <ol className="space-y-10 md:space-y-12">
                {siteData.timeline.map((t, i) => (
                  <TimelineItem
                    key={t.year}
                    progress={scrollYProgress}
                    range={REVEAL_RANGES[i] ?? [0.1, 0.3]}
                    year={t.year}
                    title={t.title}
                    body={t.body}
                    future={t.future}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

function TimelineItem({
  progress,
  range,
  year,
  title,
  body,
  future,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  year: string;
  title: string;
  body: string;
  future: boolean;
}) {
  const [start, end] = range;
  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(progress, [start, end], [40, 0], { clamp: true });

  return (
    <motion.li style={{ opacity, y }} className="relative pl-12">
      <span
        className={`absolute left-4 top-2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
          future ? "border-brand bg-white" : "border-brand bg-brand"
        }`}
      >
        {future && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/40" />
        )}
      </span>

      <div className="group relative overflow-hidden rounded-card border border-black/[0.06] bg-white/85 p-6 shadow-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-mid/30 hover:shadow-[0_24px_60px_-24px_rgba(10,15,61,0.35)] md:p-7">
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
