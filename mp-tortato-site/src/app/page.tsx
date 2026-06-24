import Hero from "@/components/Hero";
import HomeServices from "@/components/HomeServices";
import ClientesMarquee from "@/components/ClientesMarquee";
import SolucoesGrid from "@/components/SolucoesGrid";
import HomeCta from "@/components/HomeCta";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Hero />
      <HomeServices />
      <SolucoesGrid />
      <ClientesMarquee />
      <HomeCta />
    </main>
  );
}
