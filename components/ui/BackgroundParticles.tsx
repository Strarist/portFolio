"use client";
import React from "react";

interface ParticleItem {
  left: string;
  top?: string;
  size: string;
  duration: string;
  delay: string;
  endX: string;
  maxOpacity: number;
  layer: 0 | 1 | 2 | 3;
}

/** Layer 0 = instant static twinkle; 1–3 = gentle float */
const particlesConfig: ParticleItem[] = [
  // Layer 0 — visible immediately across viewport
  { left: "5%",  top: "12%", size: "1.2px", duration: "4s",  delay: "0s",   endX: "0", maxOpacity: 0.5,  layer: 0 },
  { left: "18%", top: "28%", size: "1px",   duration: "5s",  delay: "0.4s", endX: "0", maxOpacity: 0.4,  layer: 0 },
  { left: "32%", top: "8%",  size: "1.4px", duration: "3.5s",delay: "0.2s", endX: "0", maxOpacity: 0.55, layer: 0 },
  { left: "48%", top: "22%", size: "1px",   duration: "4.5s",delay: "0.6s", endX: "0", maxOpacity: 0.45, layer: 0 },
  { left: "62%", top: "15%", size: "1.2px", duration: "3.8s",delay: "0.1s", endX: "0", maxOpacity: 0.5,  layer: 0 },
  { left: "75%", top: "35%", size: "1px",   duration: "5s",  delay: "0.3s", endX: "0", maxOpacity: 0.4,  layer: 0 },
  { left: "88%", top: "18%", size: "1.3px", duration: "4.2s",delay: "0.5s", endX: "0", maxOpacity: 0.48, layer: 0 },
  { left: "12%", top: "55%", size: "1px",   duration: "4.8s",delay: "0.7s", endX: "0", maxOpacity: 0.42, layer: 0 },
  { left: "40%", top: "48%", size: "1.1px", duration: "3.6s",delay: "0.2s", endX: "0", maxOpacity: 0.46, layer: 0 },
  { left: "58%", top: "62%", size: "1.2px", duration: "4.4s",delay: "0.4s", endX: "0", maxOpacity: 0.44, layer: 0 },
  { left: "82%", top: "52%", size: "1px",   duration: "5.2s",delay: "0.8s", endX: "0", maxOpacity: 0.4,  layer: 0 },
  { left: "25%", top: "72%", size: "1.3px", duration: "4s",  delay: "0.1s", endX: "0", maxOpacity: 0.5,  layer: 0 },

  // Layer 1 — small floaters (short delay, start mid-screen)
  { left: "8%",  size: "1px",   duration: "38s", delay: "0s",   endX: "12px",  maxOpacity: 0.4, layer: 1 },
  { left: "22%", size: "1.1px", duration: "42s", delay: "0.2s", endX: "-10px", maxOpacity: 0.45, layer: 1 },
  { left: "38%", size: "0.9px", duration: "36s", delay: "0.1s", endX: "14px",  maxOpacity: 0.38, layer: 1 },
  { left: "55%", size: "1.2px", duration: "40s", delay: "0.3s", endX: "-12px", maxOpacity: 0.42, layer: 1 },
  { left: "70%", size: "1px",   duration: "44s", delay: "0s",   endX: "10px",  maxOpacity: 0.4, layer: 1 },
  { left: "85%", size: "1.1px", duration: "37s", delay: "0.4s", endX: "-8px",  maxOpacity: 0.43, layer: 1 },

  // Layer 2 — medium twinkle float
  { left: "12%", size: "1.7px", duration: "32s", delay: "0s",   endX: "16px",  maxOpacity: 0.6, layer: 2 },
  { left: "30%", size: "1.9px", duration: "28s", delay: "0.2s", endX: "-14px", maxOpacity: 0.65, layer: 2 },
  { left: "50%", size: "2px",   duration: "30s", delay: "0.1s", endX: "18px",  maxOpacity: 0.7, layer: 2 },
  { left: "68%", size: "1.8px", duration: "34s", delay: "0.3s", endX: "-16px", maxOpacity: 0.62, layer: 2 },
  { left: "90%", size: "2.1px", duration: "29s", delay: "0.15s",endX: "12px",  maxOpacity: 0.68, layer: 2 },

  // Layer 3 — subtle orange accent
  { left: "15%", size: "2.4px", duration: "26s", delay: "0s",   endX: "14px",  maxOpacity: 0.65, layer: 3 },
  { left: "42%", size: "2.6px", duration: "24s", delay: "0.2s", endX: "-12px", maxOpacity: 0.7, layer: 3 },
  { left: "65%", size: "2.5px", duration: "27s", delay: "0.1s", endX: "16px",  maxOpacity: 0.68, layer: 3 },
  { left: "88%", size: "2.8px", duration: "25s", delay: "0.3s", endX: "-10px", maxOpacity: 0.72, layer: 3 },
];

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: calc(var(--mo) * 0.35); transform: scale(1); }
          50%      { opacity: var(--mo); transform: scale(1.25); }
        }
        @keyframes floatL1 {
          0%   { transform: translate3d(0, 72vh, 0); opacity: var(--mo); }
          100% { transform: translate3d(var(--dx), -8vh, 0); opacity: 0; }
        }
        @keyframes floatL2 {
          0%   { transform: translate3d(0, 68vh, 0); opacity: calc(var(--mo) * 0.7); }
          50%  { opacity: calc(var(--mo) * 0.35); }
          100% { transform: translate3d(var(--dx), -8vh, 0); opacity: 0; }
        }
        @keyframes floatL3 {
          0%   { transform: translate3d(0, 65vh, 0); opacity: var(--mo); }
          100% { transform: translate3d(var(--dx), -8vh, 0); opacity: 0; }
        }
        .bp0 { position:absolute; border-radius:50%; background:rgba(148,163,184,0.32); animation:twinkle ease-in-out infinite; }
        .bp1 { position:absolute; border-radius:50%; background:rgba(148,163,184,0.26); animation:floatL1 linear infinite; }
        .bp2 { position:absolute; border-radius:50%; background:rgba(148,163,184,0.3); animation:floatL2 ease-in-out infinite; }
        .bp3 { position:absolute; border-radius:50%; background:#e8390d; filter:drop-shadow(0 0 3px rgba(232,57,13,0.45)); animation:floatL3 linear infinite; }
      `}</style>
      {particlesConfig.map((p, i) => {
        let cls = "bp1";
        let bg: string | undefined = "rgba(148,163,184,0.18)";
        if (p.layer === 0) { cls = "bp0"; bg = "rgba(148,163,184,0.22)"; }
        if (p.layer === 2) { cls = "bp2"; bg = "rgba(148,163,184,0.22)"; }
        if (p.layer === 3) { cls = "bp3"; bg = undefined; }

        return (
          <div
            key={i}
            className={cls}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              background: bg,
              "--dx": p.endX,
              "--mo": p.maxOpacity,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
