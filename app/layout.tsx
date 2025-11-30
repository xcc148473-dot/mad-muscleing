
import React from 'react';
import type { Metadata } from 'next'
import Script from 'next/script' 
import './globals.css'
import { InteractiveVFX } from '../components/InteractiveVFX';
import { GlobalClickEffects } from '../components/GlobalClickEffects';

export const metadata: Metadata = {
  title: 'Mad Muscleing - Your Personal Plan',
  description: 'Mad Muscleing is your AI-powered fitness coach. Get personalized workout plans, custom diet meal plans, body fat calculations, and daily macro analysis.',
  keywords: 'Mad Muscleing, AI fitness coach, personalized workout plan, diet plan generator, body fat calculator, macro calculator, weight loss program',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.ezojs.com" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-rose-500 selection:text-white animate-glow-intro">
        
        {/* High-Performance Visual Effects Engine */}
        <InteractiveVFX />
        <GlobalClickEffects />

        {/* ============================================================
            Scripts (Consent, Ezoic, AdSense)
           ============================================================ */}
        <Script
          src="https://cmp.gatekeeperconsent.com/min.js"
          strategy="afterInteractive"
          data-cfasync="false" 
        />
        <Script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        <Script id="ezoic-init" strategy="afterInteractive">
          {`
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `}
        </Script>
        <Script 
          src="//www.ezojs.com/ezoic/sa.min.js" 
          strategy="afterInteractive" 
          async 
        />
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <div id="root" className="min-h-screen flex flex-col relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
