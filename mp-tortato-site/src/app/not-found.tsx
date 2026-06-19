import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-brand text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(42,58,140,0.55),transparent_55%)]"
      />
      <div className="container-px relative z-10 flex min-h-screen flex-col items-start justify-center py-32">
        <span className="mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
          Erro 404
        </span>
        <h1 className="h1-display mt-6 max-w-3xl text-white">
          <span className="text-white/55">Esta página </span>
          saiu do escopo.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          O endereço não existe ou foi movido. Volte para o início ou fale com a equipe da MP Tortato.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-brand transition-colors duration-200 hover:bg-brand-ice"
          >
            Voltar ao início
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-[15px] font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/10"
          >
            Falar com a equipe
          </Link>
        </div>
      </div>
    </main>
  );
}
