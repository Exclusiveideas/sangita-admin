import type { Viewport } from 'next';
import * as React from 'react';

import '@/styles/global.css';

import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from '@/contexts/user-context';
import { DM_Sans } from 'next/font/google';
import Head from 'next/head'; // app/layout.tsx or app/layout.jsx

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
  display: 'swap',
});


export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={dmSans.variable}>
      <Head>
        {/* Standard Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* PNG Favicons */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        {/* Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Android Chrome Icon */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
      </Head>
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
              <Toaster />
      </body>
    </html>
  );
}
