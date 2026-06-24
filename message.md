# Memória do Projeto — MP Tortato

Site institucional da MP Tortato (metalúrgica de base, Curitiba/PR). Aplicação Next.js localizada em `mp-tortato-site/`.

## Stack

- **Framework:** Next.js 14.2.35 (App Router)
- **Linguagem:** TypeScript 5
- **UI:** React 18, Tailwind CSS 3.4, Framer Motion 12, lucide-react
- **Utilitários:** clsx, tailwind-merge
- **Fontes:** Epilogue + JetBrains Mono (next/font/google)
- **Imagens externas:** CDN `s3.directum.com.br` (whitelist em `next.config.mjs`)

## Estrutura de rotas (`src/app/`)

| Rota | Função |
|---|---|
| `/` | Home (Hero + serviços + clientes + soluções + features + CTA) |
| `/servicos` | Hub de serviços |
| `/segmentos` | Hub de segmentos |
| `/obras` | Portfólio de obras com filtro por segmento + modal |
| `/empresa` | Hero + timeline + pilares |
| `/contato` | Página de contato |
| `not-found` | 404 |

## Componentes (`src/components/`)

- **Layout:** `Navbar`, `Footer`, `PageHeader`
- **Home:** `Hero`, `HomeServices`, `HomeFeatures`, `HomeCta`, `SolucoesGrid`, `ClientesMarquee`
- **Conteúdo:** `ServicosHub`, `SegmentosHub`, `Obras`, `ObraModal`, `GalleryGrid`
- **Empresa:** `EmpresaHero`, `EmpresaTimeline`, `EmpresaPilares`
- **Visual:** `Spotlight`, `GridPattern`, `BarrasLoopBg`
- **Contato:** `Contato`

## Dados (`src/lib/site-data.ts`)

Fonte única de verdade. Exporta:
- `siteData` — brand, contact, nav, timeline, obras
- `servicos` — 7 itens (Estruturas Metálicas, Plataformas, Guarda-corpo, Skid, Pipe Racks, Equipamentos, Suportação)
- `segmentos` — 6 itens (Celulose, Óleo e Gás, Agronegócio, Indústria Química, Alimentícia, Reciclagem)
- `features` — 6 pilares com métricas
- Tipos: `Obra`, `Servico`, `Segmento`, `GalleryIcon`

Obras cadastradas: Andritz, Klabin, Electrolux, Continental Pneus, Grupo Potencial, Elco Engenharia.

Contato: WhatsApp `(41) 99263-9915`, e-mail `comercial@mptortato.com.br`, endereço Rua Francisco Batista Claudino 300, Campo de Santana, Curitiba/PR.

## Histórico de commits

1. `db7ae6c` — Commit inicial
2. `dee7df0` — Atualizando arquivos e recursos do projeto
3. `8180591` — Convertendo `mp-tortato-site` de submódulo para pasta normal
4. `56422c3` — Removendo preloader e arquivos obsoletos/não utilizados
5. `1187bd3` — Reestruturando UI e dados do site (último):
   - Contato simplificado (sem nomes dos sócios)
   - Navbar sem dropdowns, navegação direta
   - Hero com novo título/copy
   - Listas novas de serviços e segmentos; cards de galeria editorial não clicáveis (`GalleryGrid`)
   - Removidas rotas dinâmicas `/segmentos/[slug]` e `/servicos/[slug]` e seus detalhes
   - `HomeServices` agora resume 3 segmentos com CTA "Saiba mais"
   - `HomeFeatures` redesenhado (bento dark, métricas, ícones)
   - `SolucoesGrid` virou bloco CTA dark simples
   - `ClientesMarquee` virou grid de logos cinza com hover colorido + 5 marcas novas (Komatsu, Neodent, Nissin Foods, Schreiber Foods, Sumitomo Rubber)
   - `Obras` em layout bento, filtro por segmento, modal com ficha técnica
   - Imagens migradas para `s3.directum.com.br`

## Assets

- `Logos/` (raiz) — versões branca, preta, azul e com fundo cinza
- `mp-tortato-site/public/clientes/` — SVGs dos clientes (komatsu, neodent, nissin-foods, schreiber-foods, sumitomo-rubber)
- `mp-tortato-site/src/app/fonts/` — Geist VF (legacy, não usado no layout atual)

## Scripts

```bash
cd mp-tortato-site
npm run dev     # servidor de desenvolvimento
npm run build   # build de produção
npm run start   # servir build
npm run lint    # eslint
```

## Status atual

- Branch: `main`
- Modificado: `.claude/settings.local.json`
- Untracked: `image.png` (raiz)