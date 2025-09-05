import './globals.css';
import SWRegister from './sw-register';

export const metadata = {
  title: 'Saldão de Joias Cortantes',
  description: 'Catálogo de facas — sem carrinho',
  manifest: '/manifest.webmanifest',
  themeColor: '#0b0f14',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: ['/favicon.ico'],
    apple: { url: '/icons/icon-192.png' }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        {children}
        <SWRegister />
      </body>
    </html>
  );
}
