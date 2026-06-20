'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppleHelloEnglishEffect } from '@/components/ui/apple-hello-effect';
import { markHelloPreloaderSeen, shouldShowHelloPreloader } from '@/lib/hello-preloader';

/** Divisor passed to hello effect — 2.2 yields ~(0.7 + 2.8) / 2.2 ≈ 1.6s draw time */
const HELLO_SPEED = 2.2;
const FALLBACK_MS = 2200;

export default function Preloader() {
  const [visible, setVisible] = useState(shouldShowHelloPreloader);
  const [animDone, setAnimDone] = useState(false);
  const mountedRef = useRef(true);

  const dismiss = useCallback(() => {
    setVisible(false);
    markHelloPreloaderSeen();
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const fallback = setTimeout(dismiss, FALLBACK_MS);
    return () => clearTimeout(fallback);
  }, [visible, dismiss]);

  useEffect(() => {
    if (!animDone) return;
    const t = setTimeout(dismiss, 280);
    return () => clearTimeout(t);
  }, [animDone, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050508]"
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
