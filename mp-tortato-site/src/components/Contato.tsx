"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, type LucideIcon } from "lucide-react";
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
              <ContactItem icon={Phone} label="Contato" value={siteData.contact.whatsappPrimaryLabel} />
              <ContactItem icon={Mail} label="E-mail" value={siteData.contact.emails.join(" / ")} />
              <ContactItem
                icon={MapPin}
                label="Endereço"
                value={`${siteData.contact.address.street} — ${siteData.contact.address.district}, ${siteData.contact.address.city}`}
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
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <Icon size={18} strokeWidth={2.2} />
      </span>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">{label}</div>
        <div className="mt-1 text-[15px] font-medium text-ink">{value}</div>
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
