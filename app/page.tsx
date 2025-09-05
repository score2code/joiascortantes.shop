'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { prefix, withPrefix } from './lib/prefix';

type Knife = {
  id: string;
  title: string;
  price: number;
  size?: string;
  spine?: string;
  steel?: string;
  handle?: string;
  weight?: string;
  condition?: string;
  description?: string;
  images: string[]; // até 4
};

const BRAND = {
  name: 'Saldão de Joias Cortantes',
  Logo: ({ className = 'h-10' }: { className?: string }) => (
    <img
      src={withPrefix('/brand-512.png')}
      alt="Saldão de Joias Cortantes"
      className={className}
      width={120}
      height={120}
      loading="eager"
      decoding="async"
      style={{ height: 'auto' }}
    />
  ),
};

const SAMPLE: Knife[] = [
  {
    id: 'knife-001',
    title: 'Faca Chef 8"',
    price: 249.9,
    size: '8" (20 cm)',
    spine: '2.2 mm',
    steel: 'Inox 420C',
    handle: 'Pakkawood',
    weight: '210 g',
    condition: 'Nova',
    description: 'Equilíbrio e versatilidade para cortes precisos.',
    images: [
      // externo não recebe prefixo
      'https://images.unsplash.com/photo-1565512530013-6c8f0b88b597',
      'https://images.unsplash.com/photo-1604908177571-6e67cf60c8d1',
      'https://images.unsplash.com/photo-1566864324454-38c3e1d95f99',
      'https://images.unsplash.com/photo-1604908554051-f7b7d9bfe9a0'
    ]
  }
];

type Sort = 'price-asc'|'price-desc'|'title-asc'|'title-desc';

export default function Page() {
  const [items, setItems] = useState<Knife[]>(SAMPLE);
  const [query, setQuery] = useState('');
  const [steel, setSteel] = useState<string|undefined>(undefined);
  const [handle, setHandle] = useState<string|undefined>(undefined);
  const [sort, setSort] = useState<Sort>('price-asc');
  const [range, setRange] = useState<[number, number]>([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);

  // lightbox
  const [lightbox, setLightbox] = useState<{open:boolean; images:string[]; index:number; title?:string}>({open:false, images:[], index:0});
  const fileRef = useRef<HTMLInputElement>(null);

  // carrega /public/knives.json com prefix (produção)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${prefix}/knives.json`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length) setItems(data);
        }
      } catch {}
    })();
  }, []);

  // recalcula limites de preço
  useEffect(() => {
    const mp = Math.max(...items.map(i => i.price));
    const minp = Math.min(...items.map(i => i.price));
    const safeMax = Number.isFinite(mp) ? Math.ceil(mp) : 1000;
    const safeMin = Number.isFinite(minp) ? Math.floor(minp) : 0;
    setMaxPrice(safeMax);
    setRange([safeMin, safeMax]);
  }, [items.length]);

  const steels = useMemo(() => Array.from(new Set(items.map(i => i.steel).filter(Boolean))).sort() as string[], [items]);
  const handles = useMemo(() => Array.from(new Set(items.map(i => i.handle).filter(Boolean))).sort() as string[], [items]);

  const filtered = useMemo(() => {
    let r = items.filter(i => {
      const text = `${i.title} ${i.description ?? ''} ${i.steel ?? ''} ${i.handle ?? ''}`.toLowerCase();
      const okText = text.includes(query.toLowerCase());
      const okSteel = steel ? i.steel === steel : true;
      const okHandle = handle ? i.handle === handle : true;
      const okPrice = i.price >= range[0] && i.price <= range[1];
      return okText && okSteel && okHandle && okPrice;
    });
    switch (sort) {
      case 'price-asc': r.sort((a,b)=>a.price-b.price); break;
      case 'price-desc': r.sort((a,b)=>b.price-a.price); break;
      case 'title-asc': r.sort((a,b)=>a.title.localeCompare(b.title)); break;
      case 'title-desc': r.sort((a,b)=>b.title.localeCompare(a.title)); break;
    }
    return r;
  }, [items, query, steel, handle, sort, range]);

  // upload de JSON (opcional)
  const onUploadJson = async (file?: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error('JSON inválido (esperado array)');
      const normalized: Knife[] = data.map((k: any, idx: number) => ({
        id: String(k.id ?? `knife-${idx+1}`),
        title: String(k.title ?? 'Sem título'),
        price: Number(k.price) || 0,
        size: k.size ?? '',
        spine: k.spine ?? '',
        steel: k.steel ?? '',
        handle: k.handle ?? '',
        weight: k.weight ?? '',
        condition: k.condition ?? '',
        description: k.description ?? '',
        images: Array.isArray(k.images) ? k.images.slice(0,4) : []
      }));
      setItems(normalized);
    } catch (e:any) {
      alert('Falha ao ler JSON: ' + e.message);
    }
  };

  // atalhos do lightbox
  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(p=>({ ...p, open: false }));
      if (e.key === 'ArrowRight') setLightbox(p=>({ ...p, index: Math.min(p.images.length-1, p.index+1) }));
      if (e.key === 'ArrowLeft') setLightbox(p=>({ ...p, index: Math.max(0, p.index-1) }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, lightbox.images.length, lightbox.index]);

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-[#0b0f14]/70 border-b border-white/10">
        <div className="container py-4 flex items-center gap-4">
          <div className="text-[#4cc2ff]"><BRAND.Logo /></div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <input className="input w-64" placeholder="Buscar por título, aço, cabo..." value={query} onChange={e=>setQuery(e.target.value)} />
            <select className="select w-44" value={sort} onChange={e=>setSort(e.target.value as Sort)}>
              <option value="price-asc">Preço: menor → maior</option>
              <option value="price-desc">Preço: maior → menor</option>
              <option value="title-asc">Título: A → Z</option>
              <option value="title-desc">Título: Z → A</option>
            </select>
            {/* <div className="relative">
              <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e)=>onUploadJson(e.target.files?.[0])}/>
              <button className="btn" onClick={()=>fileRef.current?.click()}>Carregar JSON</button>
            </div> */}
          </div>
        </div>
      </header>

      {/* Filtros */}
      <section className="container py-6 grid md:grid-cols-4 gap-4">
        <div className="panel p-4">
          <div className="text-sm font-semibold mb-2">Aço</div>
          <select className="select" value={steel ?? ''} onChange={e=>setSteel(e.target.value || undefined)}>
            <option value="">Todos</option>
            {steels.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="panel p-4">
          <div className="text-sm font-semibold mb-2">Cabo</div>
          <select className="select" value={handle ?? ''} onChange={e=>setHandle(e.target.value || undefined)}>
            <option value="">Todos</option>
            {handles.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div className="panel p-4 md:col-span-2">
          <div className="text-sm font-semibold mb-2">Faixa de preço</div>
          <div className="flex items-center gap-3">
            <input type="range" min={0} max={maxPrice} value={range[0]} onChange={e=>setRange([Number(e.target.value), range[1]])} className="w-full" />
            <input type="range" min={0} max={maxPrice} value={range[1]} onChange={e=>setRange([range[0], Number(e.target.value)])} className="w-full" />
          </div>
          <div className="mt-2 text-sm subtle">R$ {range[0].toFixed(0)} — {range[1].toFixed(0)}</div>
        </div>
      </section>

      {/* Grid */}
      <main className="container pb-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(k => (
          <article key={k.id} className="panel overflow-hidden group">
            <div className="relative aspect-[4/3] bg-[#0f141b]">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                {k.images.slice(0,4).map((src, i) => (
                  <button
                    key={i}
                    className="relative thumb"
                    onClick={()=>setLightbox({open:true, images:k.images, index:i, title:k.title})}
                    aria-label={`Abrir imagem ${i+1} de ${k.title}`}
                  >
                    <img src={withPrefix(src)} alt={`${k.title} ${i+1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </button>
                ))}
              </div>
              <div className="absolute left-3 top-3 space-x-2">
                {k.condition ? <span className="badge">{k.condition}</span> : null}
                {k.steel ? <span className="badge">{k.steel}</span> : null}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-tight">{k.title}</h3>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#4cc2ff]">R$ {k.price.toFixed(2)}</div>
                </div>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {k.size && (<><dt className="subtle">Tamanho</dt><dd className="font-medium">{k.size}</dd></>)}
                {k.spine && (<><dt className="subtle">Dorso</dt><dd className="font-medium">{k.spine}</dd></>)}
                {k.handle && (<><dt className="subtle">Cabo</dt><dd className="font-medium">{k.handle}</dd></>)}
                {k.weight && (<><dt className="subtle">Peso</dt><dd className="font-medium">{k.weight}</dd></>)}
              </dl>
              {k.description && <p className="mt-3 text-sm subtle line-clamp-2">{k.description}</p>}
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center subtle mt-10">Nenhum item encontrado com os filtros atuais.</div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button className="absolute inset-0" aria-label="Fechar" onClick={()=>setLightbox(p=>({ ...p, open:false }))}></button>
          <div className="relative panel p-3 w-[92vw] max-w-5xl">
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="text-sm subtle">{lightbox.title}</div>
              <div className="text-xs badge">Use ← → ou ESC</div>
            </div>
            <div className="bg-black rounded-xl overflow-hidden">
              <img src={withPrefix(lightbox.images[lightbox.index])} className="w-full max-h-[70vh] object-contain" alt={`Imagem ${lightbox.index+1}`} />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              {lightbox.images.map((src, i) => (
                <button
                  key={i}
                  className={`h-16 w-24 thumb ${i===lightbox.index ? 'ring-2 ring-[#4cc2ff]' : 'opacity-80 hover:opacity-100'}`}
                  onClick={()=>setLightbox(p=>({ ...p, index:i }))}
                >
                  <img src={withPrefix(src)} className="w-full h-full object-cover" alt={`thumb ${i+1}`} />
                </button>
              ))}
            </div>
            <button className="btn absolute top-3 right-3" onClick={()=>setLightbox(p=>({ ...p, open:false }))}>Fechar</button>
            <button className="btn absolute left-3 top-1/2 -translate-y-1/2" onClick={()=>setLightbox(p=>({ ...p, index: Math.max(0, p.index-1) }))}>←</button>
            <button className="btn absolute right-3 top-1/2 -translate-y-1/2" onClick={()=>setLightbox(p=>({ ...p, index: Math.min(p.images.length-1, p.index+1) }))}>→</button>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 py-8 text-center text-sm subtle">
        <div className="container">© {new Date().getFullYear()} {BRAND.name}. Catálogo sem carrinho.</div>
      </footer>
    </div>
  );
}
