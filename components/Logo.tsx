type LogoProps = {
  showText?: boolean;
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Wambete Benjamin logo"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#009BB7" />
          <stop offset="1" stopColor="#076799" />
        </linearGradient>
        <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#009BB7" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="17" fill="url(#logo-bg)" filter="url(#logo-shadow)" />
      <path
        d="M15 18 L22.5 46 L32 25 L41.5 46 L49 18"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 18 H43 C49 18 52 22 52 27 C52 31 49 34 44 34 H34 M34 34 H45 C51 34 54 38 54 43 C54 49 50 52 43 52 H34"
        stroke="#FAAD3B"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="49" cy="15" r="4" fill="#FAAD3B" />
    </svg>
  );
}

export default function Logo({
  showText = true,
  className = "flex items-center gap-3",
  markClassName = "h-10 w-10",
  textClassName = "font-heading text-xl font-bold tracking-tight text-slate-950",
}: LogoProps) {
  return (
    <span className={className}>
      <LogoMark className={markClassName} />
      {showText && <span className={textClassName}>Wambete Benjamin</span>}
    </span>
  );
}
