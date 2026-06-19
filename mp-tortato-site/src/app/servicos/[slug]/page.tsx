import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ServicoDetalhe from "@/components/ServicoDetalhe";
import HomeCta from "@/components/HomeCta";
import { servicos } from "@/lib/site-data";

export function generateStaticParams() {
  return servicos.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = servicos.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.intro,
  };
}

export default async function ServicoPage({ params }: Props) {
  const { slug } = await params;
  const servico = servicos.find((s) => s.slug === slug);
  if (!servico) notFound();

  return (
    <main className="bg-white">
      <PageHeader
        eyebrow={servico.eyebrow}
        title={`${servico.title} em aço sob medida.`}
        description={servico.intro}
        breadcrumbs={[
          { href: "/", label: "Início" },
          { href: "/servicos", label: "Serviços" },
          { href: `/servicos/${servico.slug}`, label: servico.title },
        ]}
      />
      <ServicoDetalhe servico={servico} />
      <HomeCta />
    </main>
  );
}
