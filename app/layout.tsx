import React from 'react';
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mad Muscleing - Your Personal Plan',
  description: 'Mad Muscleing is your AI-powered fitness coach. Get personalized workout plans, custom diet meal plans, body fat calculations, and daily macro analysis.',
  keywords: 'Mad Muscleing, AI fitness coach, personalized workout plan, diet plan generator, body fat calculator, macro calculator, weight loss program',
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
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-rose-500 selection:text-white">
        <div id="root" className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}