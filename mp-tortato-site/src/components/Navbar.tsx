"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/servicos", label: "Serviços" },
  { href: "/segmentos", label: "Segmentos" },
  { href: "/obras", label: "Obras" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-black/[0.05] bg-white/90 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="container-px flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="MP Tortato — Início">
            <Image
              src={solid ? "/logos/logo-azul.png" : "/logos/log-branca.png"}
              alt="MP Tortato"
              width={150}
              height={42}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center text-[14px] font-medium tracking-wide transition-colors",
                    solid
                      ? active ? "text-brand" : "text-ink hover:text-brand-mid"
                      : active ? "text-white" : "text-white/85 hover:text-white",
                    active &&
                      "after:absolute after:-bottom-2 after:left-0 after:right-0 after:mx-auto after:h-[2px] after:w-6 after:rounded-full after:bg-brand-mid"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contato"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5",
                solid
                  ? "bg-brand text-white hover:bg-brand-mid"
                  : "bg-white text-brand hover:bg-brand-ice"
              )}
            >
              Solicitar orçamento
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className={cn(
              "lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
              solid ? "bg-brand-ice text-brand" : "bg-white/15 text-white backdrop-blur"
            )}
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay — outside header so fixed positioning works correctly */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(384px,_calc(100vw-40px))] flex-col bg-brand shadow-2xl lg:hidden"
            >
              {/* Header */}
              <div className="flex h-20 shrink-0 items-center justify-between px-6">
                <Image
                  src="/logos/log-branca.png"
                  alt="MP Tortato"
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
                className="flex flex-1 flex-col overflow-y-auto px-6 py-4"
              >
                {NAV.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-white/10"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block py-5 text-[22px] font-semibold transition-colors",
                          active ? "text-white" : "text-white/75 hover:text-white"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8"
                >
                  <Link
                    href="/contato"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-brand transition-colors hover:bg-brand-ice"
                  >
                    Solicitar orçamento
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
