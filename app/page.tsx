'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  images: string[];
};

const BRAND = {
  name: 'Saldão de Joias Cortantes',
  Logo: () => (
    <svg width="160" height="40" viewBox="0 0 320 80" role="img" aria-label="Saldão de Joias Cortantes logo">
      <g transform="translate(10,15)">
        <path d="M0 20 C 40 5, 110 5, 150 20 L 130 30 C 90 15, 40 15, 10 30 Z" fill="currentColor" />
        <circle cx="135" cy="26" r="2" fill="white" />
      </g>
      <text x="170" y="48" fontFamily="ui-sans-serif, system-ui, -apple-system" fontSize="18" fontWeight="700" fill="currentColor">Saldão de Joias Cortantes</text>
    </svg>
  )
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
      'https://images.unsplash.com/photo-1565512530013-6c8f0b88b597',
      'https://images.unsplash.com/photo-1604908177571-6e67cf60c8d1',
      'https://images.unsplash.com/photo-1566864324454-38c3e1d95f99',
      'https://images.unsplash.com/photo-1604908554051-f7b7d9bfe9a0'
    ]
  }
];

export default function Page() {
  const [items, setItems] = useState<Knife[]>(SAMPLE);
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Facas</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(k => (
          <article key={k.id} className="card p-4">
            <img src={k.images[0]} alt={k.title} className="w-full h-48 object-cover rounded" />
            <h2 className="font-semibold mt-3">{k.title}</h2>
            <p className="text-gray-600 text-sm">{k.description}</p>
            <div className="font-bold mt-2">R$ {k.price.toFixed(2)}</div>
          </article>
        ))}
      </div>
    </main>
  );
}