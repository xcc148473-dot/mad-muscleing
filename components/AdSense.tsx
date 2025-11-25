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
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready'>('idle');

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

  // Effect 1: Handle layout timing and visibility check
  useEffect(() => {
    // Reset to loading whenever identifying props change
    setStatus('loading');

    const timer = setTimeout(() => {
      const element = adRef.current;
      // Check if element exists and is visible (has dimensions or offsetParent)
      if (element && (element.offsetWidth > 0 || element.offsetParent !== null)) {
         setStatus('ready');
      } else {
         setStatus('idle');
      }
    }, 200); // Short delay to allow DOM layout to settle

    return () => clearTimeout(timer);
  }, [slot, layoutKey]);

  // Effect 2: Trigger AdSense push ONLY after status is 'ready' (meaning <ins> is in DOM)
  useEffect(() => {
    if (status === 'ready') {
       // Use requestAnimationFrame to ensure DOM paint has occurred
       const rafId = requestAnimationFrame(() => {
          // 1. Check if component is still mounted
          if (!adRef.current) return;

          // 2. Find the specific <ins> tag in this component
          const insElement = adRef.current.querySelector('ins.adsbygoogle');

          // 3. Only push if the element exists AND it hasn't been filled yet.
          // AdSense adds 'data-adsbygoogle-status="done"' (or similar) when filled.
          if (insElement && !insElement.getAttribute('data-adsbygoogle-status')) {
             try {
               if (typeof window !== 'undefined') {
                 // @ts-ignore
                 (window.adsbygoogle = window.adsbygoogle || []).push({});
               }
             } catch (e) {
               console.error("AdSense Push execution error:", e);
             }
          }
       });

       return () => cancelAnimationFrame(rafId);
    }
  }, [status]);

  // Development Mode: Visual Placeholder
  const isDev = false; // Set to true to see ad boxes in dev without script

  return (
    <div 
      ref={adRef}
      className={`ad-container w-full flex flex-col items-center justify-center my-6 ${className}`}
      style={{ minHeight: getMinHeight(), ...style }} 
    >
      {/* Label - Requirement: Clear separation */}
      <div className="w-full text-center mb-1">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold bg-slate-900/50 px-2 py-0.5 rounded">
          {label}
        </span>
      </div>

      {/* Ad Wrapper */}
      <div className="w-full bg-slate-900/20 rounded-lg overflow-hidden flex justify-center items-center relative transition-colors duration-300 border border-slate-800/30">
        
        {/* Ad Script - Only rendered when ready */}
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
        
        {/* Placeholder / Loading State to prevent CLS */}
        {(status !== 'ready' || isDev) && (
           <div 
             className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 animate-pulse text-slate-700"
             style={{ minHeight: getMinHeight() }}
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
};