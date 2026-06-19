"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { servicos, segmentos } from "@/lib/site-data";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; sub?: string }[];
};

const NAV: NavItem[] = [
  {
    href: "/servicos",
    label: "Serviços",
    children: servicos.map((s) => ({
      href: `/servicos/${s.slug}`,
      label: s.title,
      sub: s.eyebrow,
    })),
  },
  {
    href: "/segmentos",
    label: "Segmentos",
    children: segmentos.map((s) => ({
      href: `/segmentos/${s.slug}`,
      label: s.title,
      sub: s.eyebrow,
    })),
  },
  { href: "/obras", label: "Obras" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileChild, setOpenMobileChild] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome;

  return (
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

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            const hasChildren = !!item.children?.length;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasChildren && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center gap-1 text-[14px] font-medium tracking-wide transition-colors",
                    solid
                      ? active
                        ? "text-brand"
                        : "text-ink hover:text-brand-mid"
                      : active
                        ? "text-white"
                        : "text-white/85 hover:text-white",
                    active &&
                      "after:absolute after:-bottom-2 after:left-0 after:right-0 after:mx-auto after:h-[2px] after:w-6 after:rounded-full after:bg-brand-mid"
                  )}
                >
                  {item.label}
                  {hasChildren && (
                    <ChevronDown size={14} className="opacity-70" />
                  )}
                </Link>

                <AnimatePresence>
                  {hasChildren && openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full z-50 mt-3 w-[320px] -translate-x-1/2 rounded-xl2 border border-black/[0.06] bg-white p-3 shadow-[0_24px_60px_-24px_rgba(10,15,61,0.35)]"
                    >
                      <ul className="space-y-1">
                        {item.children!.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-ice"
                            >
                              <div className="text-[14px] font-semibold text-brand">
                                {c.label}
                              </div>
                              {c.sub && (
                                <div className="mt-0.5 text-[12px] leading-snug text-slate-500">
                                  {c.sub}
                                </div>
                              )}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-2 border-t border-black/[0.06] pt-2">
                          <Link
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-mid transition-colors hover:bg-brand-ice"
                          >
                            Ver todos →
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-brand/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-px flex h-20 items-center justify-between">
              <Image
                src="/logos/log-branca.png"
                alt="MP Tortato"
                width={150}
                height={42}
                className="h-10 w-auto object-contain"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"
              >
                <X size={22} />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="container-px mt-6 flex flex-col gap-1 pb-12"
            >
              {NAV.map((item) => {
                const hasChildren = !!item.children?.length;
                const isOpen = openMobileChild === item.href;
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0 },
                    }}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block flex-1 py-5 text-2xl font-semibold text-white"
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          aria-label={`Abrir ${item.label}`}
                          onClick={() =>
                            setOpenMobileChild(isOpen ? null : item.href)
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
                        >
                          <ChevronDown
                            size={18}
                            className={cn(
                              "transition-transform duration-300",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {hasChildren && isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          {item.children!.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => setOpen(false)}
                                className="block py-3 pl-4 text-base text-white/80 hover:text-white"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href="/contato"
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-brand"
                >
                  Solicitar orçamento
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
