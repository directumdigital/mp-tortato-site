import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SegmentosHub from "@/components/SegmentosHub";
import HomeCta from "@/components/HomeCta";

export const metadata: Metadata = {
  title: "Segmentos",
  description:
    "Soluções metálicas para indústria, construção civil, agronegócio e fabricantes de máquinas — sob medida em Curitiba.",
};

export default function SegmentosPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Segmentos"
        title="Aço para cada indústria."
        description="Atendemos quatro setores com soluções metálicas sob medida — engenharia, fabricação, implantação e manutenção integradas."
        breadcrumbs={[
          { href: "/", label: "Início" },
          { href: "/segmentos", label: "Segmentos" },
        ]}
      />
      <SegmentosHub />
      <HomeCta />
    </main>
  );
}
