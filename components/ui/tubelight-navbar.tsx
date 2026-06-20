"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  onCommandOpen?: () => void;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function NavBar({ items, className, onCommandOpen }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = useCallback(
    (e: React.MouseEvent, item: NavItem) => {
      const hashIdx = item.url.indexOf("#");
      if (hashIdx === -1) return;

      e.preventDefault();
      const sectionId = item.url.substring(hashIdx + 1);
      setActiveTab(item.name);

      if (pathname === "/") {
        scrollToSection(sectionId);
        window.history.replaceState(null, "", `#${sectionId}`);
      } else {
        router.push(`/#${sectionId}`);
      }
    },
    [pathname, router]
  );

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 120;

      for (let i = items.length - 1; i >= 0; i--) {
        const url = items[i].url;
        const hashIdx = url.indexOf("#");
        const sectionId = hashIdx !== -1 ? url.substring(hashIdx + 1) : "";
        const section = sectionId ? document.getElementById(sectionId) : null;

        if (section && scrollY >= section.offsetTop) {
          setActiveTab(items[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, pathname]);

  /* Scroll to hash when landing on /#section from another page */
  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const t = setTimeout(() => scrollToSection(id), 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none",
        className
      )}
    >
      <div className="flex items-center gap-0.5 sm:gap-1 bg-[#0f0f14]/90 border border-white/[0.08] backdrop-blur-xl py-1 px-1 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] pointer-events-auto max-w-[calc(100vw-2rem)]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          const isHash = item.url.includes("#");

          return (
            <a
              key={item.name}
              href={item.url}
              aria-label={item.name}
              onClick={isHash ? (e) => handleNavClick(e, item) : undefined}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-3 sm:px-4 lg:px-6 py-2 rounded-full transition-colors group shrink-0",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary"
              )}
            >
              <span
                className={cn(
                  "hidden lg:inline transition-all duration-200",
                  isActive ? "active-tab-text" : "hover-tab-text text-foreground/80"
                )}
              >
                {item.name}
              </span>
              <span
                className={cn(
                  "lg:hidden transition-all duration-200",
                  isActive ? "active-tab-text" : "hover-tab-text text-foreground/80"
                )}
              >
                <Icon size={18} strokeWidth={2.5} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}

        {onCommandOpen && (
          <button
            onClick={onCommandOpen}
            className="ml-1 p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Open command palette (Ctrl+K)"
          >
            <svg className="h-4 w-4 text-zinc-400 hover:text-zinc-200 transition-colors" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="1" width="6" height="6" rx="1.5" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
