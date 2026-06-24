import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/lib/site-data";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.571a.75.75 0 0 0 .922.922l5.726-1.469A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.523-5.204-1.433l-.374-.222-3.862.991.991-3.862-.222-.374A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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

        <FooterColumn label="Menu">
          {navLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn label="Redes Sociais">
          <li>
            <a
              href={siteData.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] text-white/70 transition-colors hover:text-white"
            >
              <InstagramIcon size={14} />
              Instagram
            </a>
          </li>
          <li>
            <a
              href={siteData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] text-white/70 transition-colors hover:text-white"
            >
              <LinkedInIcon size={14} />
              LinkedIn
            </a>
          </li>
        </FooterColumn>

        <FooterColumn label="Contato">
          <li>
            <a
              href={`https://wa.me/${siteData.contact.whatsappPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] text-white/70 transition-colors hover:text-white"
            >
              <WhatsAppIcon size={14} />
              {siteData.contact.whatsappPrimaryLabel}
            </a>
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
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="transition-colors text-white/85 hover:text-white">
        {children}
      </Link>
    </li>
  );
}
