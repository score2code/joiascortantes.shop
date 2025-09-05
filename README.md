# Catálogo de Facas — dark, moderno, estático (Next.js App Router)

## Rodar
npm install
npm run dev

## Gerar site estático
npm run build    # cria a pasta out/ automaticamente (output: 'export')

## Testar build estático
npx serve out -p 3000

## Seus dados
- Catálogo real: `public/knives.json` (seguindo o formato de `public/knives.sample.json`)
- Imagens: 4 por faca em `public/images/` (ou URLs externas)

### Recursos
- Layout dark com cartões, hover, badges, tipografia moderna
- Busca por texto
- Ordenação por preço (↑/↓) e título (A→Z / Z→A)
- Filtros por Aço, Cabo e Faixa de preço
- Lightbox com 4 fotos (navegação por teclado: ← → ESC)
