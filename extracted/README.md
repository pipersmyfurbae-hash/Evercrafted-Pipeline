# Evercrafted — Collection Intelligence Studio

The AI-powered design, render, and commerce system for premium faux botanical wreath makers.

## What This Is

Evercrafted is a SaaS platform that turns an emotional brief into a complete 8-product collection system — including palette, product hierarchy, release strategy, cross-sell architecture, and production-ready Midjourney render prompts. Built on Claude (Anthropic), Supabase, Stripe, and Next.js.

---

## Tech Stack

| Layer | Stack |
|-------|-------|
| Framework | Next.js 14 (App Router) |
| Auth + Database | Supabase |
| Payments | Stripe |
| AI | Anthropic Claude (claude-sonnet-4-20250514) |
| Styling | Tailwind CSS + EC design token system |
| Deployment | Vercel |

---

## Quick Start

### 1. Clone and install

```bash
git clone [your-repo]
cd evercrafted
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → paste and run `supabase/migrations/001_init.sql`
3. Copy your project URL and API keys

### 3. Set up Stripe

1. Create products in Stripe Dashboard:
   - Bloom: $39/month recurring
   - Craft: $97/month recurring
   - Studio: $197/month recurring
   - Atelier: $397/month recurring
2. Copy each product's Price ID

### 4. Set up Anthropic

1. Get your API key from [console.anthropic.com](https://console.anthropic.com)
2. **Never expose this key client-side**

### 5. Configure environment

```bash
cp .env.local.example .env.local
# Fill in all values — see .env.local.example for descriptions
```

### 6. Run locally

```bash
npm run dev
# Visit http://localhost:3000

# In a separate terminal, forward Stripe webhooks:
npm run stripe:listen
```

---

## Project Structure

```
evercrafted/
├── app/
│   ├── (auth)/           — Login + signup pages
│   ├── (dashboard)/      — Protected app pages (requires auth)
│   ├── api/
│   │   ├── generate/     — Collection generation (Claude API, tier-gated)
│   │   ├── review/       — Render review (Claude vision, Craft+)
│   │   └── stripe/       — Checkout session + webhook handler
│   ├── layout.tsx        — Root layout with fonts
│   └── page.tsx          — Marketing landing page
├── components/
│   └── ui/
│       ├── AppHeader.tsx          — Nav with tier badge
│       ├── BotanicalDivider.tsx   — Branded SVG divider
│       └── TierGate.tsx           — Blur overlay for locked features
├── hooks/
│   └── useTier.ts        — Auth-aware tier hook
├── lib/
│   ├── claude.ts         — Anthropic integration + system prompts
│   ├── ec-tokens.ts      — Design token constants
│   ├── stripe.ts         — Stripe client + helpers
│   ├── supabase.ts       — Client-side Supabase
│   ├── supabase-server.ts — Server-side Supabase + admin client
│   └── tier.ts           — Tier logic: canAccess, limits, price IDs
├── types/
│   └── index.ts          — Full TypeScript type system
└── supabase/
    └── migrations/
        └── 001_init.sql  — Full database schema + RLS
```

---

## Tier System

| Tier | Price | Key Features |
|------|-------|--------------|
| Free | $0 | 2 collection generations |
| Bloom | $39/mo | Unlimited generations, collections browser |
| Craft | $97/mo | + Render Review, Prompt Kit, Notes & Seeds |
| Studio | $197/mo | + Inventory integration, Etsy listings, Story drops |
| Atelier | $397/mo | + Cross-collection continuity, white label, API access |

Tier gating is handled by `TierGate` component + server-side checks in every API route.
Features are always visible but blurred with an upgrade CTA — never hidden.

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Then set Stripe webhook endpoint to: https://your-domain.com/api/stripe/webhook
```

---

## The System Behind the Platform

The Collection Intelligence Engine system prompt (in `lib/claude.ts`) encodes:
- 12 canonical composition formulas
- Canonical atmosphere archetypes
- Product hierarchy rules (8 products, specific price ranges, roles)
- Hero render prompt structure (faux material language, camera angles, --v 7 params)
- Gilded Silence, Weathered Romance, and all other atmosphere archetypes

This prompt is the core IP of the platform. Keep it server-side only.

---

## Questions?

Built by Evercrafted · Powered by Anthropic, Supabase, and Stripe.
