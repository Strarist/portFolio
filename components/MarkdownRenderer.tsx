"use client";
import React from "react";
import { jetbrainsMono } from "@/app/font";

interface MarkdownRendererProps {
  content: string;
  variant?: "default" | "blog";
}

export default function MarkdownRenderer({ content, variant = "default" }: MarkdownRendererProps) {
  const isBlog = variant === "blog";
  // Helper to render bold and links inside strings
  const inlineParse = (text: string) => {
    // Escape standard regex characters except what we want to parse
    let elements: React.ReactNode[] = [];
    let currentText = text;
    let keyIdx = 0;

    // Simple markdown link parsing: [link text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // Simple markdown bold parsing: **text**
    const boldRegex = /\*\*([^*]+)\*\*/g;
    // Simple inline code parsing: `code`
    const codeRegex = /`([^`]+)`/g;

    // First replace bold, code, and links with tokens, then reconstruct
    // But since it is simple, we can do it step-by-step or regex split
    // To keep it simple, we do simple replacement or rendering helper:
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className="font-extrabold text-[#e8390d]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={idx} className="bg-slate-800 text-pink-400 px-1.5 py-0.5 rounded font-mono text-xs">{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("[") && part.includes("](")) {
        const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          const [, label, url] = match;
          return (
            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-[#e8390d] hover:underline inline-flex items-center gap-0.5 font-bold">
              {label}
            </a>
          );
        }
      }
      return part;
    });
  };

  // Split by blocks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-6 leading-relaxed ${isBlog ? "text-zinc-300 text-base sm:text-[1.05rem] text-left" : "text-zinc-300 text-base sm:text-lg text-justify"}`}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Code block
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          // Remove backticks lines
          const codeContent = lines
            .filter((_, i) => i !== 0 && i !== lines.length - 1)
            .join("\n");
          return (
            <div key={idx} className="rounded-lg overflow-hidden bg-slate-900 border border-slate-800 text-slate-300 text-xs sm:text-sm my-6">
              <pre className="p-4 overflow-x-auto font-mono leading-relaxed text-left">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
        }

        // Headers
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-xl sm:text-2xl font-bold text-zinc-100 mt-8 mb-4">
              {inlineParse(trimmed.substring(4))}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-8 mb-4 border-b border-slate-800 pb-2">
              {inlineParse(trimmed.substring(3))}
            </h2>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-10 mb-6">
              {inlineParse(trimmed.substring(2))}
            </h1>
          );
        }

        // Blockquotes
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={idx} className="border-l-4 border-[#e8390d] pl-4 italic text-zinc-400 my-6 bg-slate-900/40 py-2 pr-2 rounded-r">
              {inlineParse(trimmed.substring(2).replace(/\n>\s/g, "\n"))}
            </blockquote>
          );
        }

        // Bullet lists
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const lines = trimmed.split("\n");
          return (
            <ul key={idx} className="list-disc list-outside pl-6 space-y-2 my-4">
              {lines.map((line, lIdx) => {
                const cleanLine = line.trim().substring(2);
                return <li key={lIdx}>{inlineParse(cleanLine)}</li>;
              })}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="leading-relaxed text-zinc-300">
            {inlineParse(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
