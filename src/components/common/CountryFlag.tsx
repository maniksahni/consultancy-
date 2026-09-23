"use client";

import React, { useId } from "react";

interface CountryFlagProps {
  country: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CountryFlag({ country, className = "", size = "md" }: CountryFlagProps) {
  const norm = country.toLowerCase().trim();
  const rawId = useId();
  // Safe unique ID for SVG clipPaths to prevent multi-instance ID collisions
  const clipId = `flag-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Dimensions matching standard 5:3 flag proportions (e.g. 40x24 = 5:3, 30x18 = 5:3, 25x15 = 5:3)
  const dimensions = {
    sm: "w-[25px] h-[15px]",
    md: "w-[30px] h-[18px]",
    lg: "w-[40px] h-[24px]",
  }[size];

  // Tailored SVG flags with crisp heraldic vector rendering, centered and contained
  const renderSvg = () => {
    switch (norm) {
      case "united kingdom":
      case "uk":
        return (
          <svg
            viewBox="0 0 60 36"
            className="w-full h-full block"
            style={{ objectFit: "cover", objectPosition: "center" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id={clipId}>
                <rect width="60" height="36" />
              </clipPath>
            </defs>
            <g clipPath={`url(#${clipId})`}>
              <rect width="60" height="36" fill="#012169" />
              {/* White saltire */}
              <path d="M0 0l60 36m0-36L0 36" stroke="#fff" strokeWidth="6" />
              {/* Red saltire */}
              <path d="M0 0l60 36m0-36L0 36" stroke="#C8102E" strokeWidth="4" />
              {/* White St George Cross */}
              <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="10" />
              {/* Red St George Cross */}
              <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="6" />
            </g>
          </svg>
        );

      case "united states":
      case "usa":
      case "us":
        return (
          <svg
            viewBox="0 0 60 36"
            className="w-full h-full block"
            style={{ objectFit: "cover", objectPosition: "center" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width="60" height="36" fill="#B22234" />
            {/* White stripes: 6 alternating stripes */}
            <rect y="2.77" width="60" height="2.77" fill="#fff" />
            <rect y="8.31" width="60" height="2.77" fill="#fff" />
            <rect y="13.85" width="60" height="2.77" fill="#fff" />
            <rect y="19.38" width="60" height="2.77" fill="#fff" />
            <rect y="24.92" width="60" height="2.77" fill="#fff" />
            <rect y="30.46" width="60" height="2.77" fill="#fff" />
            {/* Blue canton: 7 stripes tall */}
            <rect width="25" height="19.38" fill="#3C3B6E" />
            {/* Crisp 50-star arrangement representation */}
            <g fill="#fff">
              <circle cx="5" cy="3.5" r="1.1" />
              <circle cx="11" cy="3.5" r="1.1" />
              <circle cx="17" cy="3.5" r="1.1" />
              <circle cx="8" cy="6.7" r="1.1" />
              <circle cx="14" cy="6.7" r="1.1" />
              <circle cx="20" cy="6.7" r="1.1" />
              <circle cx="5" cy="9.9" r="1.1" />
              <circle cx="11" cy="9.9" r="1.1" />
              <circle cx="17" cy="9.9" r="1.1" />
              <circle cx="8" cy="13.1" r="1.1" />
              <circle cx="14" cy="13.1" r="1.1" />
              <circle cx="20" cy="13.1" r="1.1" />
              <circle cx="5" cy="16.3" r="1.1" />
              <circle cx="11" cy="16.3" r="1.1" />
              <circle cx="17" cy="16.3" r="1.1" />
            </g>
          </svg>
        );

      case "canada":
      case "ca":
        return (
          <svg
            viewBox="0 0 60 36"
            className="w-full h-full block"
            style={{ objectFit: "cover", objectPosition: "center" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width="15" height="36" fill="#D80621" />
            <rect x="15" width="30" height="36" fill="#FFFFFF" />
            <rect x="45" width="15" height="36" fill="#D80621" />
            {/* Stylized Maple Leaf */}
            <path
              d="M30 6l2.2 5.5 4.4-2.2-1.1 4.4 4.4 1.1-3.3 3.3 2.2 4.4-5.5-1.1v4.5h-2.2v-4.5l-5.5 1.1 2.2-4.4-3.3-3.3 4.4-1.1-1.1-4.4 4.4 2.2z"
              fill="#D80621"
            />
          </svg>
        );

      case "germany":
      case "de":
        return (
          <svg
            viewBox="0 0 60 36"
            className="w-full h-full block"
            style={{ objectFit: "cover", objectPosition: "center" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width="60" height="12" fill="#000000" />
            <rect y="12" width="60" height="12" fill="#DD0000" />
            <rect y="24" width="60" height="12" fill="#FFCC00" />
          </svg>
        );

      case "australia":
      case "au":
        return (
          <svg
            viewBox="0 0 60 36"
            className="w-full h-full block"
            style={{ objectFit: "cover", objectPosition: "center" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width="60" height="36" fill="#00008B" />
            {/* Mini Union Jack canton */}
            <g>
              <rect width="30" height="18" fill="#012169" />
              <path d="M0 0l30 18m0-18L0 18" stroke="#fff" strokeWidth="4" />
              <path d="M0 0l30 18m0-18L0 18" stroke="#C8102E" strokeWidth="2" />
              <path d="M15 0v18M0 9h30" stroke="#fff" strokeWidth="6" />
              <path d="M15 0v18M0 9h30" stroke="#C8102E" strokeWidth="3" />
            </g>
            {/* Commonwealth Star */}
            <polygon
              points="15,22 17,27 22,27 18,30 20,35 15,32 10,35 12,30 8,27 13,27"
              fill="#fff"
              transform="scale(0.8) translate(3.5, 4)"
            />
            {/* Southern Cross stars */}
            <circle cx="45" cy="8" r="1.3" fill="#fff" />
            <circle cx="52" cy="14" r="1.3" fill="#fff" />
            <circle cx="42" cy="18" r="1.3" fill="#fff" />
            <circle cx="48" cy="27" r="1.3" fill="#fff" />
            <circle cx="49" cy="20" r="0.9" fill="#fff" />
          </svg>
        );

      case "ireland":
      case "ie":
        return (
          <svg
            viewBox="0 0 60 36"
            className="w-full h-full block"
            style={{ objectFit: "cover", objectPosition: "center" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width="20" height="36" fill="#169B62" />
            <rect x="20" width="20" height="36" fill="#FFFFFF" />
            <rect x="40" width="20" height="36" fill="#FF883E" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-300 font-bold">
            {country.slice(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden rounded-[3px] border border-white/20 bg-slate-900 shadow-sm box-border ${dimensions} ${className}`}
      style={{ boxSizing: "border-box" }}
      title={country}
      aria-label={`${country} flag`}
    >
      {renderSvg()}
    </div>
  );
}
