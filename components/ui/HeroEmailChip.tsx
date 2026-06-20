'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { jetbrainsMono } from '@/app/font';

const EMAIL = '2002guptaadi@gmail.com';

export function HeroEmailChip() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success('Email copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy email');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${jetbrainsMono.className} group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-sm text-zinc-300 transition-all duration-300`}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />}
      <span>{EMAIL}</span>
    </button>
  );
}
