export function BotanicalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-ec-border" />
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-ec-green flex-shrink-0">
        <path d="M16 28C16 28 8 20 8 12C8 7.6 11.6 4 16 4C20.4 4 24 7.6 24 12C24 20 16 28 16 28Z"
          stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M16 28L16 10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M16 18C16 18 12 16 10 13" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M16 14C16 14 20 12 22 9" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
      <div className="flex-1 h-px bg-ec-border" />
    </div>
  )
}
