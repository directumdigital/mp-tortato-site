"use client";

import { motion } from "framer-motion";

type Logo = { src: string; alt: string };

const logos: Logo[] = [
  { src: "/clientes/andritz-logo-icon.webp", alt: "Andritz" },
  { src: "/clientes/Klabin.svg", alt: "Klabin" },
  { src: "/clientes/Electrolux-Logo.png", alt: "Electrolux" },
  { src: "/clientes/logo_continental.svg", alt: "Continental" },
  { src: "/clientes/logo-zaffari.svg", alt: "Zaffari" },
  { src: "/clientes/Envases_Logo.svg.png", alt: "Envases" },
  { src: "/clientes/grupo_potencial_logo.webp", alt: "Grupo Potencial" },
  { src: "/clientes/elco_engenharia_logo.png", alt: "Elco Engenharia" },
  { src: "/clientes/LOGO-mamute.svg", alt: "Mamute" },
  { src: "/clientes/logo-otz.png", alt: "OTZ" },
  { src: "/clientes/logork.png", alt: "Rolkran" },
  { src: "/clientes/TEQUALY-LOGO.png", alt: "Tequaly" },
];

export default function ClientesMarquee() {
  const loop = [...logos, ...logos];

  return (
    <section className="overflow-hidden bg-white py-20 md:py-24">
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="eyebrow">Quem confia</span>
          <h2 className="mt-6 text-[28px] font-extrabold leading-[1.1] tracking-tight text-brand md:text-[40px]">
            <span className="text-slate-400">Indústrias que escolhem </span>
            MP Tortato.
          </h2>
        </motion.div>
      </div>

      <div
        className="relative mt-14 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
        aria-label="Clientes da MP Tortato"
      >
        <motion.div
          className="flex w-max items-center gap-6 md:gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loop.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="group flex h-16 w-[140px] shrink-0 items-center justify-center sm:h-20 sm:w-[180px] md:h-24 md:w-[220px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-10 max-w-full object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-14 md:max-h-16"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
