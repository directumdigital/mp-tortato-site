"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const FRAME_COUNT = 112;
const framePath = (i: number) =>
  `/sequence-soldador/ezgif-frame-${String(i).padStart(3, "0")}.png`;

export default function Empresa() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef<number>(-1);
  const [, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  const frameIndex = useTransform(smooth, [0, 1], [0, FRAME_COUNT - 1]);

  const beat1Opacity = useTransform(smooth, [0.0, 0.1, 0.22], [0, 1, 1]);
  const beat1Y = useTransform(smooth, [0.0, 0.1, 0.22], [30, 0, 0]);

  const beat2Opacity = useTransform(smooth, [0.28, 0.42, 0.55], [0, 1, 1]);
  const beat2Y = useTransform(smooth, [0.28, 0.42, 0.55], [30, 0, 0]);

  const beat3Opacity = useTransform(smooth, [0.6, 0.78, 0.95], [0, 1, 1]);
  const beat3Y = useTransform(smooth, [0.6, 0.78, 0.95], [30, 0, 0]);

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
      dx = (cw - dw) / 2;
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

  const progressBar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="empresa"
      className="relative bg-[#050505]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/45 via-transparent to-[#050505]/90"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(5,5,5,0.6))]"
        />

        <div className="pointer-events-none absolute left-6 right-6 top-6 z-20 flex items-center justify-between md:left-12 md:right-12 md:top-10">
          <span className="mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 md:text-[11px]">
            MP Tortato · História
          </span>
          <div className="h-px w-32 overflow-hidden bg-white/15 md:w-48">
            <motion.div
              style={{ width: progressBar }}
              className="h-full bg-white/80"
            />
          </div>
        </div>

        <div className="relative z-10 grid h-full w-full grid-cols-12 grid-rows-6 gap-3 px-6 py-24 md:gap-6 md:px-12 md:py-16">
          <BeatBox
            opacity={beat1Opacity}
            y={beat1Y}
            className="col-span-12 row-span-2 row-start-1 md:col-span-6 md:row-span-2"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Nossa história
            </span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.05] tracking-tight text-white md:text-[40px]">
              Da garagem ao parque fabril.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/80 md:text-[16px]">
              Em 2022, pai e filho fundam a MP Tortato apostando em transformar aço com precisão de engenharia e cumprir prazo industrial.
            </p>
          </BeatBox>

          <BeatBox
            opacity={beat2Opacity}
            y={beat2Y}
            className="col-span-12 row-span-2 row-start-3 md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-3"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Curitiba · Parque fabril
            </span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.05] tracking-tight text-white md:text-[40px]">
              +700m² de aço em produção.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/80 md:text-[16px]">
              Corte, dobra, solda, usinagem e pintura industrial sob o mesmo teto — máquinas de última geração e processo controlado.
            </p>
          </BeatBox>

          <BeatBox
            opacity={beat3Opacity}
            y={beat3Y}
            className="col-span-12 row-span-2 row-start-5 md:col-span-8 md:col-start-3 md:row-span-2 md:row-start-5"
            center
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Em números
            </span>
            <h2 className="mt-3 text-[22px] font-extrabold leading-[1.05] tracking-tight text-white md:text-[32px]">
              A MP Tortato em escala.
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/15 pt-5 md:gap-8 md:pt-6">
              {[
                { v: "+700m²", l: "Área fabril" },
                { v: "2022", l: "Fundação" },
                { v: "100%", l: "Qualidade" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xl font-bold text-white md:text-4xl">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/60 md:text-[11px]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </BeatBox>
        </div>
      </div>
    </section>
  );
}

function BeatBox({
  opacity,
  y,
  className,
  center,
  children,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  className?: string;
  center?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className={`flex ${className ?? ""}`}
    >
      <div
        className={`group/beat relative flex w-full flex-col overflow-hidden rounded-xl2 border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.06] md:p-8 ${
          center ? "text-center" : ""
        }`}
      >
        <span
          aria-hidden
          className={`absolute top-0 h-px w-24 bg-gradient-to-r from-white/60 to-transparent ${
            center ? "left-1/2 -translate-x-1/2" : "left-5 md:left-8"
          }`}
        />
        {children}
      </div>
    </motion.div>
  );
}
