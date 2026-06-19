import type { Metadata } from "next";
import EmpresaHero from "@/components/EmpresaHero";
import EmpresaTimeline from "@/components/EmpresaTimeline";
import EmpresaPilares from "@/components/EmpresaPilares";
import HomeCta from "@/components/HomeCta";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Metalúrgica de base em Curitiba — desde 2022 transformando aço em solução para indústria, construção, agronegócio e fabricantes de máquinas.",
};

export default function EmpresaPage() {
  return (
    <main className="bg-white">
      <EmpresaHero />
      <EmpresaTimeline />
      <EmpresaPilares />
      <HomeCta />
    </main>
  );
}
