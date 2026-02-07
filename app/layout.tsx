import './globals.css';
import React from 'react';
import { LenisProvider } from '@/components/lenis/LenisProvider'

export const metadata = {
  title: 'IFS Starter',
  description: 'Next.js App Router starter'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <header className="py-6 border-b">
            <div className="container flex items-center justify-between">
              <h1 className="text-xl font-bold">IFS Starter</h1>
              <nav>
                <a className="text-sm text-gray-600 hover:text-gray-900" href="/bathroom/shower-heads">Shower Heads</a>
              </nav>
            </div>
          </header>
          <main className="container py-8">{children}</main>
          <footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} IFS Starter</footer>
        </LenisProvider>
      </body>
    </html>
  );
}
