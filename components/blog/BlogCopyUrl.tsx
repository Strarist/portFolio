'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { toast } from 'sonner';

export function BlogCopyUrl() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('URL copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy URL');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Link2 className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : 'Copy URL'}
    </button>
  );
}
