import { instrumentSerif } from '@/app/font';
import { cn } from '@/lib/utils';

interface BlogHeroProps {
  label?: string;
  title: string;
  summary?: string;
  variant?: 'post' | 'list';
}

export function BlogHero({ label = 'Blog', title, summary, variant = 'post' }: BlogHeroProps) {
  return (
    <header className="relative w-full overflow-hidden border-b border-white/[0.06]">
      {/* Halftone + gradient backdrop */}
      <div
        className="absolute inset-0 bg-[#0a0a0f]/50"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)`,
          backgroundSize: '12px 12px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-800/40 via-[#0a0a0f]/80 to-[#0a0a0f]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/20 via-transparent to-violet-950/25" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 sm:pt-32 pb-12 sm:pb-16 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-5">{label}</p>
        <h1
          className={cn(
            instrumentSerif.className,
            'text-zinc-100 leading-[1.08] tracking-tight',
            variant === 'list' ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl md:text-[2.75rem]'
          )}
        >
          {title}
        </h1>
        {summary && (
          <p className="mt-5 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {summary}
          </p>
        )}
      </div>
    </header>
  );
}
