import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mi-cocina-jhonathan.jlugo21776.chatgpt.site').replace(/\/$/, '');
const socialImageUrl = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: 'Mi cocina | Plan semanal',
  description: 'Tu menú semanal, recetas guiadas y horario de entrenamiento.',
  openGraph: {
    title: 'Mi cocina | Plan semanal',
    description: 'Tu menú semanal, recetas guiadas y horario de entrenamiento.',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: 'Mi cocina, tu plan semanal paso a paso' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mi cocina | Plan semanal',
    description: 'Tu menú semanal, recetas guiadas y horario de entrenamiento.',
    images: [socialImageUrl],
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
      <body>{children}</body>
    </html>
  );
}
