export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="7" fill="#1B2A41" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#C9AE84" strokeWidth="1.6" />
      <ellipse cx="16" cy="16" rx="4" ry="9" fill="none" stroke="#C9AE84" strokeWidth="1.2" />
      <path d="M7 16h18" stroke="#C9AE84" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark />
      <div className="leading-none">
        <div className="font-serif text-[19px] font-semibold tracking-[0.12em] text-ink">ATLAS</div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink-faint">Learning through time</div>
      </div>
    </div>
  );
}
