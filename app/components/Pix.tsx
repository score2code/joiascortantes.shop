'use client';
import { useEffect, useRef, useState } from 'react';

const PIX_KEY = 'joias.cortantes.shop@gmail.com';

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const input = document.createElement('input');
          input.value = text;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          input.remove();
        } finally {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }
      }}
      className={`px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition text-sm ${className}`}
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
        <code className="px-2 py-1 rounded bg-white/5 break-all">{PIX_KEY}</code>
        <CopyButton text={PIX_KEY} className="ml-auto" />
      </div>
    </div>
  );
}

export function PixModalLauncher() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Bloqueia scroll de fundo quando o modal abre
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/20 transition text-sm"
      >
        <PixIcon className="w-5 h-5" />
        PIX
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/60"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />

      )}
      {open && (
        <div
          className="fixed inset-0 z-[61] grid items-end sm:place-items-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pixDialogTitle"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[100vw] h-[100dvh] sm:w-full sm:h-auto sm:max-w-lg rounded-none sm:rounded-3xl bg-[#0b0f14] text-white shadow-2xl border border-white/10 flex flex-col pb-[env(safe-area-inset-bottom)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* handle do sheet no mobile */}
            <div className="sm:hidden w-full flex justify-center pt-3">
              <span className="block w-12 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <PixIcon className="w-6 h-6 text-cyan-300" />
              <h3 id="pixDialogTitle" className="text-base sm:text-lg font-semibold">Pagamento via PIX</h3>
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                className="ml-auto rounded-full w-9 h-9 grid place-items-center hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo rolável */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              <p className="text-sm opacity-80">
                Use a chave abaixo no app do seu banco e informe o <b>ID da jóia</b> no campo de mensagem.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <code className="px-3 py-2 rounded-xl bg-white/5 text-base break-all w-full sm:w-auto">
                  {PIX_KEY}
                </code>
                <CopyButton text={PIX_KEY} />
              </div>

              <ul className="text-sm list-disc pl-5 opacity-80 space-y-1">
                <li>Após o pagamento, envie o comprovante e o <b>ID</b> da jóia por WhatsApp.</li>
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://wa.me/?text=Olá!%20Segue%20comprovante%20do%20PIX%20para%20a%20joia%20ID%3A%20"
                  target="_blank"
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-center"
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
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M7.05 3.88a4 4 0 0 1 5.66 0l7.41 7.41a1.5 1.5 0 0 1 0 2.12l-7.41 7.41a4 4 0 0 1-5.66 0L1.99 13.77a1.5 1.5 0 0 1 0-2.12l5.06-5.06zM5.7 9.53l4.24-4.24a2 2 0 0 1 2.83 0l4.24 4.24H5.7zm12.13 4.94H5.7l4.24 4.24a2 2 0 0 0 2.83 0l4.24-4.24z" />
    </svg>
  );
}
