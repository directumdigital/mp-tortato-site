import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServicosHub from "@/components/ServicosHub";
import HomeCta from "@/components/HomeCta";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Engenharia, fabricação, implantação e manutenção em aço — quatro frentes integradas sob o mesmo teto em Curitiba.",
};

export default function ServicosPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Serviços"
        title="Da chapa bruta à estrutura instalada."
        description="Engenharia, fabricação, implantação e manutenção integradas — escolha por onde quer começar."
        breadcrumbs={[
          { href: "/", label: "Início" },
          { href: "/servicos", label: "Serviços" },
        ]}
      />
      <ServicosHub />
      <HomeCta />
    </main>
  );
}
