import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { reviewRender } from '@/lib/claude'
import { canAccess } from '@/lib/tier'
import type { Tier } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier, subscription_status')
      .eq('id', user.id)
      .single()

    const tier = (profile?.subscription_tier || 'free') as Tier

    // Craft+ required for render review
    if (!canAccess(tier, 'craft')) {
      return NextResponse.json({
        error: 'Render Review requires Craft tier or above.',
        code: 'TIER_REQUIRED',
        requiredTier: 'craft',
      }, { status: 403 })
    }

    const formData = await req.formData()
    const image = formData.get('image') as File
    const context = formData.get('context') as string | null

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Convert to base64
    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const mediaType = image.type || 'image/jpeg'

    const result = await reviewRender(base64, mediaType, context || undefined)
    return NextResponse.json(result)

  } catch (err) {
    console.error('[/api/review]', err)
    return NextResponse.json({ error: 'Review failed. Please try again.' }, { status: 500 })
  }
}
