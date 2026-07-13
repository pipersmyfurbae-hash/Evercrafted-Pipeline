'use client'

import Link from 'next/link'
import { useTier } from '@/hooks/useTier'
import { TIER_LABELS, TIER_COLORS } from '@/types'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Collections', href: '/collections' },
  { label: 'Generate', href: '/generate' },
  { label: 'Settings', href: '/settings' },
]

export function AppHeader() {
  const { tier } = useTier()

  return (
    <header className="sticky top-0 z-50 bg-ec-off-white border-b border-ec-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="text-ec-green">
            <path d="M16 28C16 28 8 20 8 12C8 7.6 11.6 4 16 4C20.4 4 24 7.6 24 12C24 20 16 28 16 28Z"
              stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          <span className="font-script text-xl text-ec-black">Evercrafted</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link key={href} href={href}
              className="text-sm text-ec-ink hover:text-ec-black transition-colors font-mono uppercase tracking-widest text-[10px]">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border"
            style={{ borderColor: TIER_COLORS[tier], color: TIER_COLORS[tier] }}
          >
            {TIER_LABELS[tier]}
          </span>
        </div>
      </div>
    </header>
  )
}
