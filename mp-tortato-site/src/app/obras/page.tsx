import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Obras from "@/components/Obras";

export const metadata: Metadata = {
  title: "Obras",
  description:
    "Portfólio de estruturas, peças e projetos metálicos entregues pela MP Tortato — fabricados em Curitiba.",
};

export default function ObrasPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Obras"
        title="Aço transformado, projeto a projeto."
        description="Estruturas, peças e conjuntos metálicos entregues para indústria, construção, agronegócio e fabricantes de máquinas."
      />
      <Obras />
    </main>
  );
}
