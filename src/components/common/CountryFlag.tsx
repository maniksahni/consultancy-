import React from "react";

interface CountryFlagProps {
  country: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CountryFlag({ country, className = "", size = "md" }: CountryFlagProps) {
  const norm = country.toLowerCase().trim();

  const dimensions = {
    sm: "w-5 h-3.5",
    md: "w-7 h-5",
    lg: "w-9 h-6",
  }[size];

  // Tailored SVG flags with crisp heraldic vector rendering
  const renderSvg = () => {
    switch (norm) {
      case "united kingdom":
      case "uk":
        return (
          <svg viewBox="0 0 60 36" className="w-full h-full rounded-sm overflow-hidden shadow-inner">
            <clipPath id="uk-clip">
              <path d="M0 0v36h60V0z" />
            </clipPath>
            <path d="M0 0v36h60V0z" fill="#012169" />
            <path d="M0 0l60 36m0-36L0 36" stroke="#fff" strokeWidth="6" />
            <path d="M0 0l60 36m0-36L0 36" clipPath="url(#uk-clip)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="10" />
            <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="6" />
          </svg>
        );

      case "united states":
      case "usa":
      case "us":
        return (
          <svg viewBox="0 0 60 36" className="w-full h-full rounded-sm overflow-hidden shadow-inner">
            <rect width="60" height="36" fill="#B22234" />
            <path d="M0 2.77h60M0 8.31h60M0 13.85h60M0 19.38h60M0 24.92h60M0 30.46h60" stroke="#fff" strokeWidth="2.77" />
            <rect width="26" height="19.4" fill="#3C3B6E" />
            <circle cx="6" cy="4" r="1.1" fill="#fff" />
            <circle cx="13" cy="4" r="1.1" fill="#fff" />
            <circle cx="20" cy="4" r="1.1" fill="#fff" />
            <circle cx="9.5" cy="8" r="1.1" fill="#fff" />
            <circle cx="16.5" cy="8" r="1.1" fill="#fff" />
            <circle cx="6" cy="12" r="1.1" fill="#fff" />
            <circle cx="13" cy="12" r="1.1" fill="#fff" />
            <circle cx="20" cy="12" r="1.1" fill="#fff" />
            <circle cx="9.5" cy="16" r="1.1" fill="#fff" />
            <circle cx="16.5" cy="16" r="1.1" fill="#fff" />
          </svg>
        );

      case "canada":
      case "ca":
        return (
          <svg viewBox="0 0 60 36" className="w-full h-full rounded-sm overflow-hidden shadow-inner">
            <rect width="15" height="36" fill="#D80621" />
            <rect x="15" width="30" height="36" fill="#FFFFFF" />
            <rect x="45" width="15" height="36" fill="#D80621" />
            {/* Stylized Maple Leaf */}
            <path
              d="M30 7l2 5 4-2-1 4 4 1-3 3 2 4-5-1v4h-2v-4l-5 1 2-4-3-3 4-1-1-4 4 2z"
              fill="#D80621"
            />
          </svg>
        );

      case "germany":
      case "de":
        return (
          <svg viewBox="0 0 60 36" className="w-full h-full rounded-sm overflow-hidden shadow-inner">
            <rect width="60" height="12" fill="#000000" />
            <rect y="12" width="60" height="12" fill="#DD0000" />
            <rect y="24" width="60" height="12" fill="#FFCC00" />
          </svg>
        );

      case "australia":
      case "au":
        return (
          <svg viewBox="0 0 60 36" className="w-full h-full rounded-sm overflow-hidden shadow-inner">
            <rect width="60" height="36" fill="#00008B" />
            {/* Mini Union Jack canton */}
            <g transform="scale(0.5)">
              <rect width="60" height="36" fill="#012169" />
              <path d="M0 0l60 36m0-36L0 36" stroke="#fff" strokeWidth="6" />
              <path d="M0 0l60 36m0-36L0 36" stroke="#C8102E" strokeWidth="3" />
              <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="8" />
              <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="5" />
            </g>
            {/* Commonwealth Star */}
            <polygon points="15,22 17,27 22,27 18,30 20,35 15,32 10,35 12,30 8,27 13,27" fill="#fff" transform="scale(0.8) translate(4, 3)" />
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
          <svg viewBox="0 0 60 36" className="w-full h-full rounded-sm overflow-hidden shadow-inner">
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
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 border border-white/20 bg-slate-900 rounded-[3px] p-[1px] shadow-sm ${dimensions} ${className}`}
      title={country}
      aria-label={`${country} flag`}
    >
      {renderSvg()}
    </span>
  );
}
