import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import SegmentoDetalhe from "@/components/SegmentoDetalhe";
import HomeCta from "@/components/HomeCta";
import { segmentos } from "@/lib/site-data";

export function generateStaticParams() {
  return segmentos.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = segmentos.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.intro,
  };
}

export default async function SegmentoPage({ params }: Props) {
  const { slug } = await params;
  const segmento = segmentos.find((s) => s.slug === slug);
  if (!segmento) notFound();

  return (
    <main className="bg-white">
      <PageHeader
        eyebrow={segmento.eyebrow}
        title={`Soluções em aço para ${segmento.title.toLowerCase()}.`}
        description={segmento.intro}
        breadcrumbs={[
          { href: "/", label: "Início" },
          { href: "/segmentos", label: "Segmentos" },
          { href: `/segmentos/${segmento.slug}`, label: segmento.title },
        ]}
      />
      <SegmentoDetalhe segmento={segmento} />
      <HomeCta />
    </main>
  );
}
