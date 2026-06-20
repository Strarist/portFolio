"use client";
import React, { useEffect, useState } from "react";
import { jetbrainsMono } from "@/app/font";
import { Cpu, Terminal, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface HighlightItem {
  title: string;
  category: string;
  icon: React.ReactNode;
  problem: string;
  rootCause: string;
  solution: string;
  codeDiff?: {
    file: string;
    diff: string;
  };
}

const highlights: HighlightItem[] = [
  {
    title: "Express/Next.js Authentication Redirection Loop Fix",
    category: "Security & Session Management",
    icon: <ShieldAlert className="h-6 w-6" />,
    problem: "Dashboard interface would lock up in an infinite redirect spinner when a user session expired or a token cookie signature was invalid.",
    rootCause: "Next.js middleware detected the 'token' cookie existence and routed users to the secure dashboard page, which requested profile info. The backend returned 401 Unauthorized because the token was expired, redirecting the user to '/login'. The middleware intercepted '/login', saw the token cookie was still present in the browser, and redirected back to the dashboard, creating an infinite loop.",
    solution: "Enhanced the Express backend authenticateJWT middleware to immediately invoke res.clearCookie('token') upon token validation or signature mismatch failures. This ensures the invalid cookie is instantly purged from the browser, allowing the client-side router to land cleanly on the login page.",
    codeDiff: {
      file: "src/middleware/auth.ts",
      diff: `- } catch (err) {
-   res.status(401).json({ error: 'Unauthorized' });
- }
+ } catch (err) {
+   res.clearCookie('token');
+   res.status(401).json({ error: 'Unauthorized. Token cleared.' });
+ }`
    }
  },
  {
    title: "AI Cosine Similarity Search Scaling Optimization",
    category: "System Scaling & Optimization",
    icon: <Cpu className="h-6 w-6" />,
    problem: "Evaluating cosine similarity for user queries in-memory blocks the single-threaded Node.js event loop as the total number of files in the database grows.",
    rootCause: "Iterating over high-dimensional vector embeddings (1,536 dimensions) for all database records in-memory scales at O(N) globally, consuming unnecessary memory and CPU overhead.",
    solution: "Restructured the search pipeline to query and filter active file records by the specific workspace ID at the database level first. This confines the similarity calculations to only the files belonging to the active workspace.",
    codeDiff: {
      file: "src/routes/search.routes.ts",
      diff: `// Restricting search array at DB layer first
- const allFiles = await File.find({});
+ const workspaceFiles = await File.find({ 
+   workspaceId: req.params.workspaceId,
+   deletedAt: null 
+ });`
    }
  }
];

export default function EngineeringHighlights() {
  return (
    <section id="highlights" className={` ${jetbrainsMono.className} w-full max-w-7xl mx-auto py-20 sm:py-28 md:py-36 px-6 scroll-mt-28`}>
      <div className="flex flex-col items-center justify-center gap-2 mb-12">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">
          Problem Solving
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl text-center font-bold">
          Engineering Highlights
        </h2>
      </div>

      {/* List */}
      <div className="space-y-10 w-full">
        {highlights.map((hl, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl border border-white/8 bg-slate-950/60 backdrop-blur-xl space-y-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_-8px_rgba(232,57,13,0.15)] transition-shadow duration-300"
          >
            {/* Header info */}
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#e8390d]/10 text-[#e8390d]">
                {hl.icon}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-100">
                  {hl.title}
                </h3>
                <span className="inline-block text-xs font-semibold text-[#e8390d] uppercase tracking-wider mt-1">
                  {hl.category}
                </span>
              </div>
            </div>

            {/* Analysis details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-300">
              <div className="space-y-1 text-justify">
                <h4 className="font-bold flex items-center gap-1.5 text-red-400">
                  <AlertTriangle className="h-4 w-4" /> Issue Detected
                </h4>
                <p className="text-xs leading-relaxed">{hl.problem}</p>
              </div>

              <div className="space-y-1 text-justify">
                <h4 className="font-bold flex items-center gap-1.5 text-orange-400">
                  <Terminal className="h-4 w-4" /> Root Cause Diagnosis
                </h4>
                <p className="text-xs leading-relaxed">{hl.rootCause}</p>
              </div>

              <div className="space-y-1 text-justify">
                <h4 className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="h-4 w-4" /> Resolution & Impact
                </h4>
                <p className="text-xs leading-relaxed">{hl.solution}</p>
              </div>
            </div>

            {/* Optional Code Diff Block */}
            {hl.codeDiff && (
              <div className="rounded-lg overflow-hidden bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-zinc-400 font-semibold flex items-center justify-between">
                  <span>File: {hl.codeDiff.file}</span>
                  <span className="text-[10px] uppercase text-[#e8390d] tracking-wide font-mono">Code Change</span>
                </div>
                <pre className="p-4 overflow-x-auto font-mono leading-relaxed">
                  <code>{hl.codeDiff.diff}</code>
                </pre>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
