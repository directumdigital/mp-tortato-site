"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useScroll } from "framer-motion";

const FRAME_COUNT = 96;
const FRAME_BASE = "/sequence-servicos/frame-";

const framePath = (i: number) =>
  `${FRAME_BASE}${String(i).padStart(3, "0")}.png`;

export default function ServicosLoopBg({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef<number>(-1);
  const startProgressRef = useRef<number | null>(null);
  const [, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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

    let dw: number, dh: number, dx: number, dy: number;

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

  const DELAY = 0.14; // zona morta antes de começar a animação

  const rawToFrame = (raw: number) => {
    const start = startProgressRef.current ?? 0;
    const range = 1 - start;
    const adjusted = range > 0 ? Math.max(0, Math.min(1, (raw - start) / range)) : 0;
    // frame 0 enquanto adjusted < DELAY; depois mapeia [DELAY,1] → [0, FRAME_COUNT-1]
    const delayed = adjusted < DELAY ? 0 : Math.min(1, (adjusted - DELAY) / (1 - DELAY));
    return Math.round(delayed * (FRAME_COUNT - 1));
  };

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
      imagesRef.current.forEach((img) => { img.onload = null; img.onerror = null; });
      imagesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // captura o zero point logo que o componente monta
    startProgressRef.current = scrollYProgress.get();

    const unsubscribe = scrollYProgress.on("change", (raw) => {
      const idx = rawToFrame(raw);
      if (idx === lastDrawnFrame.current) return;
      drawFrame(idx);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-30"
    />
  );
}
