'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AdSenseProps {
  slot: string; // The Ad Slot ID from Google AdSense
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  responsive?: boolean;
  label?: string;
  style?: React.CSSProperties;
  layoutKey?: string; // Used to force refresh on route change
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSense: React.FC<AdSenseProps> = ({ 
  slot, 
  format = 'auto', 
  className = '',
  responsive = true,
  label = 'Advertisement',
  style = {},
  layoutKey
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'ready'>('idle');

  // Determine min-height based on format to prevent CLS
  const getMinHeight = () => {
    const s = style as React.CSSProperties;
    if (s.minHeight) return s.minHeight;
    if (s.height) return s.height;
    if (format === 'rectangle') return '250px';
    if (format === 'horizontal') return '90px';
    if (format === 'vertical') return '600px';
    return '280px'; // Default for auto/responsive
  };

  // Effect 1: Wait for actual DOM dimensions
  useEffect(() => {
    if (typeof window === 'undefined' || !adRef.current) return;

    // Reset status when props change to force re-evaluation
    setStatus('idle');

    // Helper to check dimensions
    const hasDimensions = (el: HTMLElement) => {
      return el.offsetWidth > 0 && el.offsetHeight > 0;
    };

    // 1. Initial check (if already visible)
    if (hasDimensions(adRef.current)) {
      setStatus('ready');
      return;
    }

    // 2. Observer for layout changes (waits for slide-up animations or tab switches)
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
        setStatus('ready');
        observer.disconnect(); // Stop observing once we are ready to load
      }
    });

    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, [slot, layoutKey]);

  // Effect 2: Trigger AdSense push ONLY after status is 'ready' and element is visible
  useEffect(() => {
    if (status === 'ready' && adRef.current) {
       // Use a timeout to ensure React has fully committed the <ins> tag to the DOM
       const timer = setTimeout(() => {
          try {
            if (typeof window !== 'undefined') {
              const ins = adRef.current?.querySelector('ins.adsbygoogle');
              // Only push if the tag exists and hasn't been processed yet
              if (ins && !ins.getAttribute('data-adsbygoogle-status') && ins.innerHTML === "") {
                 // Double check width to be absolutely safe
                 if (adRef.current && adRef.current.offsetWidth > 0) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                 }
              }
            }
          } catch (e) {
            console.error("AdSense Push execution error:", e);
          }
       }, 100);

       return () => clearTimeout(timer);
    }
  }, [status]);

  // Development Mode: Visual Placeholder
  const isDev = process.env.NODE_ENV === 'development'; 
  const minH = getMinHeight();

  return (
    <div 
      ref={adRef}
      className={`ad-container w-full flex flex-col items-center justify-center my-6 ${className}`}
      style={{ minHeight: minH, ...style }} 
    >
      {/* Label */}
      <div className="w-full text-center mb-1">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold bg-slate-900/50 px-2 py-0.5 rounded">
          {label}
        </span>
      </div>

      {/* Ad Wrapper */}
      <div 
        className="w-full bg-slate-900/20 rounded-lg overflow-hidden flex justify-center items-center relative transition-colors duration-300 border border-slate-800/30"
        style={{ minHeight: minH }}
      >
        
        {/* Ad Script - Only rendered when layout is stable */}
        {status === 'ready' && !isDev && (
          <ins
            className="adsbygoogle block"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        )}
        
        {/* Placeholder / Loading State */}
        {(status !== 'ready' || isDev) && (
           <div 
             className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 animate-pulse text-slate-700"
             style={{ minHeight: minH }}
           >
              {isDev ? (
                 <span className="text-xs font-mono border border-slate-600 p-2 rounded">DEV AD: {slot}</span>
              ) : (
                 <div className="w-8 h-8 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
              )}
           </div>
        )}
      </div>
    </div>
  );
}