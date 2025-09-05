export const metadata = { title: 'Saldão de Joias Cortantes', description: 'Catálogo de facas — sem carrinho' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">{children}</body>
    </html>
  );
}