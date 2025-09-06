'use client';
import { useState } from 'react';

const PIX_KEY = 'joias.cortantes.shop@gmail.com';

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          // fallback
          const input = document.createElement('input');
          input.value = text;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          input.remove();
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }
      }}
      className={`px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition ${className}`}
      aria-label="Copiar chave PIX"
    >
      {copied ? 'Copiado ✓' : 'Copiar'}
    </button>
  );
}

export function PixBadge() {
  return (
    <div className="w-full bg-[#0b0f14] text-white/90 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3 text-sm">
        <PixIcon className="w-5 h-5" />
        <span className="opacity-80">PIX:</span>
        <code className="px-2 py-1 rounded bg-white/5">{PIX_KEY}</code>
        <CopyButton text={PIX_KEY} className="ml-auto" />
      </div>
    </div>
  );
}

export function PixModalLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/20 transition"
      >
        <PixIcon className="w-5 h-5" />
        Pagar via PIX
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-[#0b0f14] text-white shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <PixIcon className="w-6 h-6 text-cyan-300" />
              <h3 className="text-lg font-semibold">Pagamento via PIX</h3>
              <button onClick={() => setOpen(false)} className="ml-auto opacity-70 hover:opacity-100">✕</button>
            </div>

            <div className="px-5 py-5 space-y-4">
              <div className="text-sm opacity-80">
                Use a chave abaixo no app do seu banco e informe o <b>ID da Jóia</b> no campo de mensagem.
              </div>

              <div className="flex items-center gap-3">
                <code className="px-3 py-2 rounded-xl bg-white/5 text-base">{PIX_KEY}</code>
                <CopyButton text={PIX_KEY} />
              </div>

              <ul className="text-sm list-disc pl-5 opacity-80 space-y-1">
                <li>Após o pagamento, envie o comprovante por WhatsApp.</li>
              </ul>

              <div className="pt-2 flex gap-3">
                <a
                  href="https://wa.me/?text=Olá!%20Segue%20comprovante%20do%20PIX%20para%20a%20faca%20ID%3A%20"
                  target="_blank"
                  className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10"
                >
                  Enviar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PixIcon({ className = '' }: { className?: string }) {
  // Ícone PIX estilizado (SVG inline, sem assets externos)
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M7.05 3.88a4 4 0 0 1 5.66 0l7.41 7.41a1.5 1.5 0 0 1 0 2.12l-7.41 7.41a4 4 0 0 1-5.66 0L1.99 13.77a1.5 1.5 0 0 1 0-2.12l5.06-5.06zM5.7 9.53l4.24-4.24a2 2 0 0 1 2.83 0l4.24 4.24H5.7zm12.13 4.94H5.7l4.24 4.24a2 2 0 0 0 2.83 0l4.24-4.24z" />
    </svg>
  );
}
