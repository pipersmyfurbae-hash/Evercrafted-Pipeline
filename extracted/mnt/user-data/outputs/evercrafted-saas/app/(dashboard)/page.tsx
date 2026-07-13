import { createServerClient, createAdminClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { BotanicalDivider } from '@/components/ui/BotanicalDivider'
import type { Collection } from '@/types'

export default async function DashboardPage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, subscription_tier, generations_used, generations_limit')
    .eq('id', user!.id)
    .single()

  const { data: recentCollections } = await supabase
    .from('collections')
    .select('id, name, atmosphere_archetype, tagline, data, created_at')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(6)

  const usagePct = profile?.generations_limit
    ? Math.round((profile.generations_used / profile.generations_limit) * 100)
    : 0

  return (
    <div>
      {/* Studio header */}
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ec-gold mb-2">◦ Evercrafted</p>
        <h1 className="font-serif text-5xl font-medium text-ec-black mb-2">
          Collection Intelligence Studio
        </h1>
        <p className="text-ec-ink text-sm max-w-xl">
          The full design, render, and commerce system for premium faux botanical collections.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 flex-wrap mb-10">
        <Link href="/generate"
          className="px-5 py-2.5 bg-ec-black text-white text-sm font-medium rounded-md hover:bg-ec-charcoal transition-colors">
          + New Collection
        </Link>
        <Link href="/collections"
          className="px-5 py-2.5 bg-white border border-ec-border text-ec-ink text-sm font-medium rounded-md hover:border-ec-border-dark transition-colors">
          All Collections
        </Link>
        <Link href="/settings?tab=billing"
          className="px-5 py-2.5 bg-white border border-ec-border text-ec-ink text-sm font-medium rounded-md hover:border-ec-border-dark transition-colors">
          Billing & Tier
        </Link>
      </div>

      {/* Usage indicator */}
      {profile && (
        <div className="bg-white border border-ec-border rounded-lg p-4 mb-10 flex items-center gap-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ec-gold mb-1">
              {profile.subscription_tier} plan
            </p>
            <p className="text-sm text-ec-ink">
              {profile.generations_used} of {profile.generations_limit} generations used
            </p>
          </div>
          <div className="flex-1 bg-ec-border rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-ec-green transition-all"
              style={{ width: `${Math.min(usagePct, 100)}%` }}
            />
          </div>
          {usagePct >= 80 && (
            <Link href="/settings?tab=billing"
              className="text-xs font-mono uppercase tracking-widest text-ec-gold hover:text-ec-gold-dim">
              Upgrade →
            </Link>
          )}
        </div>
      )}

      <BotanicalDivider className="mb-10" />

      {/* Recent Collections */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-medium">Recent Collections</h2>
          <Link href="/collections"
            className="font-mono text-[10px] uppercase tracking-widest text-ec-gold hover:text-ec-gold-dim">
            View all →
          </Link>
        </div>

        {!recentCollections?.length ? (
          <div className="bg-white border border-ec-border border-dashed rounded-lg p-12 text-center">
            <p className="font-serif text-xl text-ec-ink mb-2">No collections yet</p>
            <p className="text-sm text-ec-gray400 mb-6">
              Describe a season, theme, or emotional direction to generate your first collection.
            </p>
            <Link href="/generate"
              className="inline-block px-6 py-3 bg-ec-black text-white text-sm font-medium rounded-md hover:bg-ec-charcoal transition-colors">
              Generate First Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentCollections.map((c: Collection) => {
              const palette = c.data?.palette?.slice(0, 5) || []
              return (
                <Link key={c.id} href={`/collections/${c.id}`}
                  className="bg-white border border-ec-border rounded-lg p-5 hover:border-ec-border-dark transition-colors group">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-ec-gold mb-1">
                    {c.atmosphere_archetype || ''}
                  </p>
                  <h3 className="font-serif text-lg font-semibold text-ec-black mb-1 group-hover:text-ec-green transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-ec-ink line-clamp-2 mb-3">
                    {c.tagline || ''}
                  </p>
                  {palette.length > 0 && (
                    <div className="flex gap-1.5 mb-3">
                      {palette.map((p: { hex: string; name: string }, i: number) => (
                        <div key={i} className="w-4 h-4 rounded-full border border-black/10"
                          style={{ backgroundColor: p.hex }} title={p.name} />
                      ))}
                    </div>
                  )}
                  <p className="font-mono text-[9px] text-ec-gray400 uppercase tracking-widest">
                    {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
