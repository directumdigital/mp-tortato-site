"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

type IconComponent = React.ElementType;

function WhatsAppIcon({ size = 18 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.571a.75.75 0 0 0 .922.922l5.726-1.469A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.523-5.204-1.433l-.374-.222-3.862.991.991-3.862-.222-.374A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { siteData } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Contato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Olá MP Tortato! Sou *${form.nome}*.%0A%0A` +
      `📧 Email: ${form.email}%0A` +
      `📞 Telefone: ${form.telefone}%0A%0A` +
      `Mensagem:%0A${form.mensagem}`;
    const url = `https://wa.me/${siteData.contact.whatsappPrimary}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contato" className="bg-white py-24 md:py-32">
      <div className="container-px">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="lg:col-span-5"
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.6 }} className="eyebrow">
              Atendimento
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="h2-display mt-5 text-brand"
            >
              Conte sobre seu projeto em aço.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-6 text-base leading-relaxed text-slate-700 md:text-[17px]"
            >
              Atendimento direto com os sócios pelo WhatsApp. Preencha o formulário ou use um dos canais ao lado.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-10 space-y-5"
            >
              <ContactItem
                icon={WhatsAppIcon}
                label="WhatsApp"
                value={siteData.contact.whatsappPrimaryLabel}
                href={`https://wa.me/${siteData.contact.whatsappPrimary}`}
              />
              <ContactItem icon={Mail} label="E-mail" value={siteData.contact.emails.join(" / ")} />
              <ContactItem
                icon={MapPin}
                label="Endereço"
                value={`${siteData.contact.address.street} — ${siteData.contact.address.district}, ${siteData.contact.address.city}`}
              />
              <ContactItem
                icon={InstagramIcon}
                label="Instagram"
                value="@mptortato.brasil"
                href={siteData.contact.instagram}
              />
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl2 border border-slate-100 bg-brand-ice/40 p-6 shadow-soft md:p-10 lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Nome" name="nome" value={form.nome} onChange={onChange} required placeholder="Seu nome" />
              <Field label="E-mail" name="email" type="email" value={form.email} onChange={onChange} required placeholder="voce@empresa.com" />
            </div>
            <div className="mt-4">
              <Field label="Telefone" name="telefone" type="tel" value={form.telefone} onChange={onChange} required placeholder="(41) 99999-9999" />
            </div>
            <div className="mt-4">
              <label className="block text-[13px] font-semibold text-ink">Mensagem</label>
              <textarea
                name="mensagem"
                value={form.mensagem}
                onChange={onChange}
                required
                rows={5}
                placeholder="Descreva projeto, peças, prazo e quantidade..."
                className="input-field mt-2 resize-none"
              />
            </div>

            <button type="submit" className="btn-primary mt-8 w-full justify-center md:w-auto">
              Enviar orçamento pelo WhatsApp
              <Send size={18} />
            </button>

            <p className="mt-4 text-xs text-slate-500">
              Ao enviar, abrimos uma conversa direta no WhatsApp com a sua especificação.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: IconComponent;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <Icon size={18} strokeWidth={2.2} />
      </span>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">{label}</div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-[15px] font-medium text-ink transition-colors hover:text-brand-mid"
          >
            {value}
          </a>
        ) : (
          <div className="mt-1 break-all text-[15px] font-medium text-ink">{value}</div>
        )}
      </div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-semibold text-ink">{label}</span>
      <input {...props} className="input-field mt-2" />
    </label>
  );
}
