'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  Home,
  Briefcase,
  FolderOpen,
  Wrench,
  Award,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  X,
  PenLine,
  ArrowUpRight,
  Search,
  Phone,
} from 'lucide-react';
import { jetbrainsMono } from '@/app/font';
import { cn } from '@/lib/utils';

const pages = [
  { name: 'Home', icon: Home, href: '/#home' },
  { name: 'Experience', icon: Briefcase, href: '/#experience' },
  { name: 'Projects', icon: FolderOpen, href: '/#projects' },
  { name: 'Skills', icon: Wrench, href: '/#skills' },
  { name: 'Certifications', icon: Award, href: '/#certifications' },
  { name: 'Publications', icon: BookOpen, href: '/#publications' },
  { name: 'Contact', icon: Mail, href: '/#contact' },
  { name: 'Blog', icon: PenLine, href: '/blog', route: true },
];

const connectLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Strarist' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/adigupta1620' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pt-3 pb-1">
      <p className="text-[11px] font-semibold tracking-wide text-zinc-500">{children}</p>
    </div>
  );
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();

  const navigate = useCallback(
    (href: string, opts?: { external?: boolean; route?: boolean }) => {
      onClose();
      if (opts?.external) {
        window.open(href, '_blank');
        return;
      }
      if (opts?.route) {
        router.push(href);
        return;
      }
      if (href.startsWith('/#')) {
        router.push(href);
        return;
      }
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    },
    [onClose, router]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center p-3 sm:p-6 pt-[12vh] sm:pt-[14vh]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          jetbrainsMono.className,
          'relative w-full max-w-xl rounded-2xl sm:rounded-3xl overflow-hidden',
          'border border-white/[0.08] bg-[#111118]/95 backdrop-blur-2xl',
          'shadow-[0_32px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)]',
          'animate-in fade-in slide-in-from-bottom-3 duration-300 max-h-[min(85vh,680px)] flex flex-col'
        )}
      >
        <Command className="flex flex-col min-h-0 flex-1" label="Command Palette">
          {/* Search header */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5">
              <Search className="h-4 w-4 text-zinc-500 shrink-0" />
              <Command.Input
                placeholder="Search pages, posts, projects..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none min-w-0"
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={() => navigate('/#contact')}
              className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Go to contact"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Close command palette"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Command.List className="flex-1 overflow-y-auto overscroll-contain p-2 sm:p-3 min-h-0 cmdk-scroll">
            <Command.Empty className="py-12 text-center text-sm text-zinc-500">
              No results found.
            </Command.Empty>

            <Command.Group>
              <SectionLabel>Pages</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 px-1 pb-2">
                {pages.map((page) => (
                  <Command.Item
                    key={page.name}
                    value={page.name}
                    onSelect={() => navigate(page.href, { route: page.route })}
                    className={cn(
                      'group flex items-center gap-3 px-2.5 py-2.5 rounded-xl cursor-pointer outline-none',
                      'text-sm text-zinc-300 transition-colors',
                      'data-[selected=true]:bg-white/[0.07] data-[selected=true]:text-white'
                    )}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] group-data-[selected=true]:border-white/15 group-data-[selected=true]:bg-white/[0.08]">
                      <page.icon className="h-4 w-4 text-zinc-400 group-data-[selected=true]:text-white" />
                    </span>
                    <span className="truncate font-medium">{page.name}</span>
                    <span className="ml-auto hidden group-data-[selected=true]:block w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  </Command.Item>
                ))}
              </div>
            </Command.Group>

            <div className="mx-3 h-px bg-white/[0.06]" />

            <Command.Group>
              <SectionLabel>Connect</SectionLabel>
              <div className="flex flex-wrap gap-2 px-2 pb-3">
                {connectLinks.map((link) => (
                  <Command.Item
                    key={link.name}
                    value={link.name}
                    onSelect={() => navigate(link.href, { external: true })}
                    className={cn(
                      'inline-flex items-center gap-2 px-3.5 py-2 rounded-full cursor-pointer outline-none',
                      'border border-white/[0.08] bg-white/[0.03] text-sm text-zinc-300',
                      'data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white data-[selected=true]:border-white/15'
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                  </Command.Item>
                ))}
              </div>
            </Command.Group>
          </Command.List>

          <div className="px-4 py-2.5 border-t border-white/[0.06] bg-black/20 flex items-center justify-between text-[10px] text-zinc-600 shrink-0">
            <span className="hidden sm:inline">Navigate ↑↓ · Select ↵</span>
            <span className="sm:hidden">↑↓ navigate · ↵ select</span>
            <kbd className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] font-mono text-zinc-500">
              ESC
            </kbd>
          </div>
        </Command>
      </div>
    </div>
  );
}
