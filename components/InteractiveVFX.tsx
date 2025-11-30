'use client';

import React, { useEffect, useRef } from 'react';

const EMOJIS = ['💪', '🔥', '✨', '⚡', '🏋️‍♂️', '😁', '🌟', '💥'];
const COLORS = ['#f43f5e', '#6366f1', '#fbbf24', '#ffffff', '#10b981'];

export const InteractiveVFX = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- SETUP RESIZE & DPI ---
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    updateSize();

    // --- STATE ---
    const particles: Particle[] = [];
    const trails: TrailPoint[] = [];

    // --- CLASSES ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      color: string;
      type: 'circle' | 'emoji';
      text?: string;
      rotation: number;
      rotationSpeed: number;

      constructor(x: number, y: number, type: 'circle' | 'emoji' = 'circle') {
        this.x = x;
        this.y = y;
        this.type = type;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4; // Faster burst
        
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1.0;
        
        if (type === 'emoji') {
          this.text = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
          this.size = 24 + Math.random() * 12; // Larger emojis
          this.rotation = Math.random() * 360;
          this.rotationSpeed = (Math.random() - 0.5) * 15;
        } else {
          this.size = Math.random() * 6 + 3;
          this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.3; // Heavy gravity
        this.vx *= 0.94; // Friction
        this.vy *= 0.94;
        this.life -= 0.02; // Fade out
        if (this.type === 'emoji') this.rotation += this.rotationSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.life;
        
        if (this.type === 'emoji' && this.text) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate((this.rotation * Math.PI) / 180);
          ctx.font = `${this.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.text, 0, 0);
          ctx.restore();
        } else {
          ctx.fillStyle = this.color!;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }
    }

    class TrailPoint {
      x: number;
      y: number;
      life: number;
      size: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.life = 1.0;
        this.size = Math.random() * 6 + 2;
        // Check for mobile vs desktop for color theme
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.color = isTouch ? '244, 63, 94' : '99, 102, 241'; // Rose (Mobile) vs Indigo (Desktop)
      }

      update() {
        this.life -= 0.04;
        this.size *= 0.92;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${this.color}, ${this.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- EVENT HANDLERS (CAPTURE PHASE) ---
    // Using capture: true ensures we get the event before any button calls stopPropagation()

    const handlePointerDown = (e: PointerEvent) => {
      // 1. Logic for "Shake" Effect on click targets
      const target = (e.target as HTMLElement).closest('button, .cursor-pointer, [role="button"], .card, .option');
      if (target) {
        const el = target as HTMLElement;
        // Force reflow to restart animation
        el.classList.remove('shake-effect');
        void el.offsetWidth; 
        el.classList.add('shake-effect');
      }

      // 2. Logic for Particles
      // Spawn right at click coordinates
      const x = e.clientX;
      const y = e.clientY;

      for (let i = 0; i < 15; i++) {
        particles.push(new Particle(x, y, 'circle'));
      }
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, y, 'emoji'));
      }
      
      // 3. Ripple logic (Visual only)
      // We simulate a large white flash particle
      const ripple = new Particle(x, y, 'circle');
      ripple.size = 50;
      ripple.color = 'rgba(255,255,255,0.3)';
      ripple.life = 0.5;
      ripple.vx = 0; 
      ripple.vy = 0;
      particles.push(ripple);
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Add trail point
      trails.push(new TrailPoint(e.clientX, e.clientY));
    };

    // Attach with { capture: true } is CRITICAL for it to work on buttons
    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    window.addEventListener('pointermove', handlePointerMove, { capture: true });
    window.addEventListener('resize', updateSize);

    // --- ANIMATION LOOP ---
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update/Draw Trails
      for (let i = trails.length - 1; i >= 0; i--) {
        trails[i].update();
        trails[i].draw(ctx);
        if (trails[i].life <= 0) trails.splice(i, 1);
      }

      // Update/Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      requestAnimationFrame(loop);
    };

    const animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      window.removeEventListener('pointermove', handlePointerMove, { capture: true });
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // Allows clicks to pass through to buttons
        zIndex: 2147483647,    // Highest possible z-index
        background: 'transparent'
      }}
    />
  );
};