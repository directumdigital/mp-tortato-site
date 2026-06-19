"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 197;
const FRAME_BASE = "/sequence-barras/ezgif-frame-";

const framePath = (i: number) =>
  `${FRAME_BASE}${String(i).padStart(3, "0")}.png`;

export default function BarrasLoopBg({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef<number>(-1);
  const [, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

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
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
