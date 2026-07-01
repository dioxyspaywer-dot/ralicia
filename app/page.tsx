import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ralicia - Studio Vidéo IA',
  description: 'Créez des vidéos TikTok virales en quelques secondes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased min-h-screen`}>
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          {children}
        </main>
      </body>
    </html>
  );
}
