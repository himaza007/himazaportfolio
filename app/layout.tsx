import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: 'Himaza Zahara | Fullstack Engineer & Creative Strategist',
  description: 'Building scalable backends and immersive 3D digital experiences.',
};

export const viewport: Viewport = {
  themeColor: '#0B0512',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-[#0B0512] font-sans text-white antialiased">{children}</body>
    </html>
  );
}