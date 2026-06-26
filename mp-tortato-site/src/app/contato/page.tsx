import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contato from "@/components/Contato";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Solicite orçamento da MP Tortato pelo WhatsApp — metalúrgica de base em Curitiba.",
};

export default function ContatoPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Contato"
        title="Descreva o projeto. A gente fabrica."
        description="Solicite orçamento da MP Tortato pelo WhatsApp."
        showShapeGrid
      />
      <Contato />
    </main>
  );
}
