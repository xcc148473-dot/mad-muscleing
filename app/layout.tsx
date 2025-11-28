import React from 'react';
import type { Metadata } from 'next'
import Script from 'next/script' // 引入 Next.js 脚本组件
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
        {/* Ezoic 预连接建议 (可选，提高加载速度) */}
        <link rel="preconnect" href="https://www.ezojs.com" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-rose-500 selection:text-white">
        
        {/* ============================================================
            1. 隐私/Consent 脚本 (Gatekeeper) - 优先级最高
            放在 Ezoic 之前加载，确保合规性
           ============================================================ */}
        <Script
          src="https://cmp.gatekeeperconsent.com/min.js"
          strategy="afterInteractive"
          data-cfasync="false" // 防止 Cloudflare Rocket Loader 干扰
        />
        <Script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          strategy="afterInteractive"
          data-cfasync="false"
        />

        {/* ============================================================
            2. Ezoic 初始化与加载脚本
            放在 Consent 脚本之后
           ============================================================ */}
        
        {/* Ezoic 配置初始化 */}
        <Script id="ezoic-init" strategy="afterInteractive">
          {`
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `}
        </Script>

        {/* Ezoic 主脚本 */}
        <Script 
          src="//www.ezojs.com/ezoic/sa.min.js" 
          strategy="afterInteractive" 
          async // 显式标记异步
        />

        {/* ============================================================
            原有的 Google AdSense 脚本
            (保留不动，如果 Ezoic 要求移除原始 AdSense，请删除下方 Script)
           ============================================================ */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <div id="root" className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}