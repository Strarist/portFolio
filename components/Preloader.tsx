'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppleHelloEnglishEffect } from '@/components/ui/apple-hello-effect';

/** Divisor passed to hello effect — 2.2 yields ~(0.7 + 2.8) / 2.2 ≈ 1.6s draw time */
const HELLO_SPEED = 2.2;
const FALLBACK_MS = 2200;
const STORAGE_KEY = 'portfolio-hello-seen';

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      /* private browsing — show once per load */
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const fallback = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
    }, FALLBACK_MS);
    return () => clearTimeout(fallback);
  }, [visible]);

  useEffect(() => {
    if (animDone) {
      const t = setTimeout(() => {
        setVisible(false);
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {
          /* ignore */
        }
      }, 280);
      return () => clearTimeout(t);
    }
  }, [animDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <AppleHelloEnglishEffect
            speed={HELLO_SPEED}
            className="h-14 sm:h-16 w-auto text-white"
            onAnimationComplete={() => {
              if (mountedRef.current) setAnimDone(true);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
