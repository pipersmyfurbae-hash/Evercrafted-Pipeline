import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, createAdminClient } from '@/lib/supabase-server'
import { stripe, getOrCreateCustomer } from '@/lib/stripe'
import { getStripePriceId } from '@/lib/tier'
import type { Tier } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { tier } = await req.json() as { tier: Exclude<Tier, 'free'> }
    if (!['bloom', 'craft', 'studio', 'atelier'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('email, stripe_customer_id')
      .eq('id', user.id)
      .single()

    const customerId = await getOrCreateCustomer(
      user.id,
      profile?.email || user.email!,
      profile?.stripe_customer_id || undefined
    )

    // Save customer ID if new
    if (!profile?.stripe_customer_id) {
      await createAdminClient()
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: getStripePriceId(tier),
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
      metadata: { user_id: user.id, tier },
    })

    return NextResponse.json({ url: session.url })

  } catch (err) {
    console.error('[/api/stripe/create-session]', err)
    return NextResponse.json({ error: 'Could not create checkout session' }, { status: 500 })
  }
}
