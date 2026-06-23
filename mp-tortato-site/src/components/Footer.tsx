import Image from "next/image";
import Link from "next/link";
import { servicos, segmentos, siteData } from "@/lib/site-data";

const navLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/segmentos", label: "Segmentos" },
  { href: "/obras", label: "Obras" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contato", label: "Contato" },
];

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="container-px grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 sm:gap-10 md:py-20 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Image
            src="/logos/log-branca.png"
            alt="MP Tortato"
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            {siteData.brand.description}
          </p>
          <address className="mt-6 not-italic text-sm leading-relaxed text-white/85">
            {siteData.contact.address.street}
            <br />
            {siteData.contact.address.district}
            <br />
            {siteData.contact.address.city}
          </address>
        </div>

        <FooterColumn label="Serviços">
          {servicos.map((s) => (
            <li key={s.title} className="text-[13px] text-white/85">
              {s.title}
            </li>
          ))}
        </FooterColumn>

        <FooterColumn label="Segmentos">
          {segmentos.map((s) => (
            <li key={s.title} className="text-[13px] text-white/85">
              {s.title}
            </li>
          ))}
        </FooterColumn>

        <FooterColumn label="Contato">
          {navLinks
            .filter((l) => l.href !== "/contato")
            .map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          <FooterLink href="/contato">Solicitar orçamento</FooterLink>
          <li className="pt-3 text-[13px] text-white/70">
            {siteData.contact.whatsappPrimaryLabel}
          </li>
          <li className="text-[13px] text-white/70">
            {siteData.contact.emails[0]}
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 md:flex-row">
          <span>© {new Date().getFullYear()} MP Tortato. Todos os direitos reservados.</span>
          <span>{siteData.contact.site}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
        {label}
      </div>
      <ul className="mt-5 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  muted,
}: {
  href: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`transition-colors ${
          muted ? "text-white/55 hover:text-white" : "text-white/85 hover:text-white"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
