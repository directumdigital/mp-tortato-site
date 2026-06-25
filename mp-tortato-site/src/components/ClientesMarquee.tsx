"use client";

import { motion } from "framer-motion";

type Logo = { src: string; alt: string; zoom?: number };

const CDN = "https://s3.directum.com.br/mptortato";

const logos: Logo[] = [
  { src: `/logos/clientes/Electrolux-Logo.png`, alt: "Electrolux" },
  { src: `/logos/clientes/andritz-logo-icon.webp`, alt: "Andritz" },
  { src: `/logos/clientes/elco.png`, alt: "Elco Engenharia" },
  { src: `/logos/clientes/Klabin.svg`, alt: "Klabin Ortigueira" },
  { src: `/logos/clientes/potencial.png`, alt: "Grupo Potencial", zoom: 1.7 },
  { src: `/logos/clientes/logo_continental.svg`, alt: "Continental Pneus" },
  { src: `${CDN}/Nissin_Logo.svg.png`, alt: "Nissin Foods" },
  { src: `${CDN}/Schreiber-Logo.png`, alt: "Schreiber Foods" },
  { src: `${CDN}/Komatsu-logo.png`, alt: "Komatsu" },
  { src: `${CDN}/Sumitomo-logo.jpg`, alt: "Sumitomo Rubber do Brasil" },
  { src: `/logos/clientes/logo-zaffari.svg`, alt: "Zaffari & Bourbon" },
  { src: `/logos/clientes/Envases_Logo.svg.png`, alt: "Envases (CristalPet)" },
  { src: `/logos/clientes/logork.png`, alt: "Rolkran" },
  { src: `${CDN}/neodent-logo.png`, alt: "Neodent" },
  { src: `/logos/clientes/TEQUALY-LOGO.png`, alt: "Tequaly" },
  { src: `/logos/clientes/LOGO-mamute.svg`, alt: "Mamute" },
  { src: `/logos/clientes/logo-otz.png`, alt: "OTZ" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ClientesMarquee() {
  return (
    <section className="bg-white py-20 md:py-24">
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
            <span className="text-slate-400">Clientes que confiam na </span>
            MP Tortato.
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          aria-label="Clientes da MP Tortato"
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-16 md:grid-cols-4 md:gap-6"
        >
          {logos.map((logo) => (
            <motion.li
              key={logo.alt}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group flex h-28 items-center justify-center rounded-xl2 border border-slate-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_18px_40px_-20px_rgba(10,15,61,0.18)] md:h-32"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                style={logo.zoom ? { transform: `scale(${logo.zoom})` } : undefined}
                className="max-h-12 max-w-[80%] object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-14"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
