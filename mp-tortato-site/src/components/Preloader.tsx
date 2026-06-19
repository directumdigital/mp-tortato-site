"use client";

import { useEffect, useState } from "react";

const GIF_SRC = "/pre-loader.gif";
const HOLD_MS = 2600;
const FADE_MS = 700;

export default function Preloader() {
  const [active, setActive] = useState(true);
  const [fading, setFading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mp-preloader-shown") === "1") {
      setActive(false);
      return;
    }

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    let fadeTimer: number | undefined;
    let unmountTimer: number | undefined;
    let cancelled = false;

    const img = new Image();
    img.src = GIF_SRC;
    img.onload = () => {
      if (cancelled) return;
      setLoaded(true);
      fadeTimer = window.setTimeout(() => {
        if (cancelled) return;
        setFading(true);
        unmountTimer = window.setTimeout(() => {
          if (cancelled) return;
          setActive(false);
          sessionStorage.setItem("mp-preloader-shown", "1");
        }, FADE_MS);
      }, HOLD_MS);
    };
    img.onerror = () => {
      if (cancelled) return;
      setActive(false);
    };

    return () => {
      cancelled = true;
      root.style.overflow = prevOverflow;
      if (fadeTimer) window.clearTimeout(fadeTimer);
      if (unmountTimer) window.clearTimeout(unmountTimer);
    };
  }, []);

  useEffect(() => {
    if (!active) {
      document.documentElement.style.overflow = "";
    }
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {loaded && (
        <img
          src={GIF_SRC}
          alt=""
          className="max-h-[80vh] max-w-[92vw] object-contain"
        />
      )}
    </div>
  );
}
