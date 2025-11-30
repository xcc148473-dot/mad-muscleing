
'use client';

import React, { useEffect } from 'react';

const EMOJIS = ['💪', '🔥', '✨', '⚡', '🏋️‍♂️', '😁', '🌟'];

export const GlobalClickEffects = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 1. Identify if the click target is a button or interactive element
      const target = (e.target as HTMLElement).closest('button, [role="button"], .cursor-pointer, .group, .card, .option');
      
      if (!target) return;

      const { clientX, clientY } = e;
      const rect = (target as HTMLElement).getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // --- Trigger Effects ---
      triggerRipple(target as HTMLElement, x, y);
      triggerScale(target as HTMLElement);
      spawnParticles(clientX, clientY);
      spawnEmojis(clientX, clientY);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null;
};

// --- 1. Ripple Effect ---
const triggerRipple = (element: HTMLElement, x: number, y: number) => {
  const ripple = document.createElement('span');
  ripple.classList.add('effect-ripple');
  
  // Ensure we don't break layout position if it's static
  const originalPosition = window.getComputedStyle(element).position;
  if (originalPosition === 'static') {
    element.style.position = 'relative';
  }
  
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  element.appendChild(ripple);

  const animation = ripple.animate([
    { transform: 'translate(-50%, -50%) scale(0)', opacity: 0.6 },
    { transform: 'translate(-50%, -50%) scale(4)', opacity: 0 }
  ], {
    duration: 600,
    easing: 'ease-out'
  });

  animation.onfinish = () => ripple.remove();
};

// --- 2. Scale Pop Effect ---
const triggerScale = (element: HTMLElement) => {
  element.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(1)' }
  ], {
    duration: 200,
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  });
};

// --- 3. Particle Explosion ---
const spawnParticles = (x: number, y: number) => {
  // 12-18 small particles
  const particleCount = 12 + Math.floor(Math.random() * 7);

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('effect-particle');
    document.body.appendChild(particle);

    // Random directions and speeds
    const angle = Math.random() * Math.PI * 2;
    const velocity = 30 + Math.random() * 50; // Varying speeds
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    // Set initial position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Random color
    const colors = ['#f43f5e', '#6366f1', '#fbbf24', '#ffffff'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Fade out after 0.7s
    const animation = particle.animate([
      { transform: 'translate(-50%, -50%) translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
      duration: 700,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: Math.random() * 50 // Slight stagger
    });

    animation.onfinish = () => particle.remove();
  }
};

// --- 4. Emoji Burst ---
const spawnEmojis = (x: number, y: number) => {
  const count = 6 + Math.floor(Math.random() * 6); // 6-12 emojis

  for (let i = 0; i < count; i++) {
    const emojiEl = document.createElement('div');
    emojiEl.innerText = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    emojiEl.classList.add('effect-emoji');
    document.body.appendChild(emojiEl);

    // Physics
    const angle = Math.random() * Math.PI * 2;
    const velocity = 60 + Math.random() * 60;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    const rotation = (Math.random() - 0.5) * 360;

    emojiEl.style.left = `${x}px`;
    emojiEl.style.top = `${y}px`;

    const animation = emojiEl.animate([
      { transform: 'translate(-50%, -50%) translate(0, 0) scale(0.5) rotate(0deg)', opacity: 0 },
      { transform: 'translate(-50%, -50%) translate(0, 0) scale(1.2) rotate(0deg)', opacity: 1, offset: 0.2 },
      { transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(0.8) rotate(${rotation}deg)`, opacity: 0 }
    ], {
      duration: 800 + Math.random() * 200,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    });

    animation.onfinish = () => emojiEl.remove();
  }
};
