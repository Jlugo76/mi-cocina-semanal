import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mi-cocina-jhonathan.jlugo21776.chatgpt.site'),
  title: 'Mi cocina | Plan semanal',
  description: 'Tu menú semanal, recetas guiadas y horario de entrenamiento.',
  openGraph: {
    title: 'Mi cocina | Plan semanal',
    description: 'Tu menú semanal, recetas guiadas y horario de entrenamiento.',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Mi cocina, tu plan semanal paso a paso' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mi cocina | Plan semanal',
    description: 'Tu menú semanal, recetas guiadas y horario de entrenamiento.',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#16805b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
