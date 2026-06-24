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
        title="Uma solução para cada segmento."
        description="Atuação diversificada em toda região sul do Brasil."
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
