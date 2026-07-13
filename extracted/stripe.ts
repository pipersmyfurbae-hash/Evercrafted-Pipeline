import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export async function getOrCreateCustomer(
  userId: string,
  email: string,
  stripeCustomerId?: string
): Promise<string> {
  if (stripeCustomerId) return stripeCustomerId

  const customer = await stripe.customers.create({
    email,
    metadata: { supabase_user_id: userId },
  })
  return customer.id
}
