'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const TRAIL_COUNT = 10;
const RING_LERP = 0.15;
const TRAIL_LERP = 0.35;

export function Cursor() {
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const hasMovedRef = useRef(false);
  const trailRef = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })));
  const rafRef = useRef<number | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringElRef = useRef<HTMLDivElement>(null);
  const trailElsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        ringRef.current = { x: e.clientX, y: e.clientY };
        trailRef.current = Array.from({ length: TRAIL_COUNT }, () => ({
          x: e.clientX,
          y: e.clientY,
        }));
        document.documentElement.classList.add('custom-cursor-active');
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      hoveringRef.current = !!target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
      );
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });

    const tick = () => {
      const mouse = mouseRef.current;
      const ring = ringRef.current;
      const hovering = hoveringRef.current;

      if (hasMovedRef.current) {
        ring.x += (mouse.x - ring.x) * RING_LERP;
        ring.y += (mouse.y - ring.y) * RING_LERP;

        const trails = trailRef.current;
        trails[0].x += (ring.x - trails[0].x) * TRAIL_LERP;
        trails[0].y += (ring.y - trails[0].y) * TRAIL_LERP;
        for (let i = 1; i < TRAIL_COUNT; i++) {
          trails[i].x += (trails[i - 1].x - trails[i].x) * TRAIL_LERP;
          trails[i].y += (trails[i - 1].y - trails[i].y) * TRAIL_LERP;
        }

        if (dotRef.current) {
          dotRef.current.style.opacity = '1';
          dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
        }
        if (ringElRef.current) {
          ringElRef.current.style.opacity = '1';
          const scale = hovering ? 1.65 : 1;
          ringElRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
          ringElRef.current.style.borderColor = hovering ? 'rgba(232, 57, 13, 0.65)' : 'rgba(255, 255, 255, 0.35)';
          ringElRef.current.style.backgroundColor = hovering ? 'rgba(232, 57, 13, 0.1)' : 'rgba(139, 92, 246, 0.12)';
          ringElRef.current.style.boxShadow = hovering
            ? '0 0 28px rgba(232, 57, 13, 0.5)'
            : '0 0 22px rgba(139, 92, 246, 0.4)';
        }
        trailElsRef.current.forEach((el, i) => {
          if (!el) return;
          const t = trails[i];
          el.style.opacity = String(Math.max(0, 0.6 - i * 0.05));
          el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%) scale(${1 - i * 0.07})`;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden="true"
      data-custom-cursor-root
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 2147483647 }}
    >
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailElsRef.current[i] = el; }}
          className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-violet-400"
          style={{ opacity: 0, willChange: 'transform' }}
        />
      ))}
      <div
        ref={ringElRef}
        className="absolute top-0 left-0 w-10 h-10 rounded-full border-2"
        style={{ opacity: 0, willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#e8390d]"
        style={{
          opacity: 0,
          willChange: 'transform',
          boxShadow: '0 0 16px rgba(232,57,13,1), 0 0 32px rgba(232,57,13,0.5)',
        }}
      />
    </div>,
    document.body
  );
}
