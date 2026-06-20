import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  /** gradient = preloader only; default white uses currentColor */
  variant?: "white" | "gradient" | "muted";
}

const SW = 6;

/**
 * AG monogram — AB-inspired geometry:
 * Open A (no crossbar), right stem fuses into G with rounded bowl + detached bar gap.
 */
export function Logo({ className, size = 40, variant = "white" }: LogoProps) {
  const gradId = React.useId().replace(/:/g, "");

  const stroke =
    variant === "gradient"
      ? `url(#${gradId})`
      : variant === "muted"
        ? "#71717a"
        : "currentColor";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AG — Aditya Gupta"
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient id={gradId} x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#e8390d" />
          </linearGradient>
        </defs>
      )}

      {/* A — left leg */}
      <path
        d="M 14 54 L 30 10"
        stroke={stroke}
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Shared stem + G bowl (AB-style fused letterform) */}
      <path
        d="M 30 10 L 30 54 M 30 54 C 56 54 62 38 58 24 C 54 12 38 10 30 20"
        stroke={stroke}
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* G bar — detached gap like AB middle stroke */}
      <path
        d="M 30 37 L 50 37"
        stroke={stroke}
        strokeWidth={SW}
        strokeLinecap="round"
      />
    </svg>
  );
}
