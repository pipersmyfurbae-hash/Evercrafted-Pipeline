# Evercrafted — Product Requirements Document
### Collection Intelligence Studio · SaaS v1.0

---

## 1. Product Overview

**What it is:** A SaaS platform that turns a brief into a complete 8-product luxury faux botanical collection — palette, product hierarchy, release strategy, cross-sell architecture, and production-ready Midjourney render prompts.

**Who it's for:** Premium faux botanical wreath makers and Etsy sellers with $30k+ annual revenue who want to systematize their design and production process. They already know Midjourney. They already sell on Etsy. They have no system for going from inspiration to inventory.

**Why it exists:** Most wreath makers design by feel — picking florals, making something beautiful, photographing it, listing it. Evercrafted replaces that intuition-loop with an intelligence layer: emotional brief → collection architecture → render workflow → Etsy listing. The output is always premium, always manufacturable, always commercially positioned.

**Core differentiator:** The Collection Intelligence Engine doesn't just generate ideas — it generates a system. Eight products. A release timeline. Room-completion cross-sell paths. Priced bundles. A hero render prompt that actually works in Midjourney V7 without debugging.

---

## 2. User Stories

| # | As a... | I want to... | So that... |
|---|---------|-------------|------------|
| 1 | Wreath maker | Generate a complete holiday collection from a single brief | I stop spending hours designing individually and start working from a system |
| 2 | Etsy seller | Get the exact MJ V7 prompts for every product in my collection | I produce professional renders without prompt engineering expertise |
| 3 | Studio tier user | Auto-generate Etsy listings from my collection data | My product descriptions are consistent, keyword-rich, and on-brand |
| 4 | Craft tier user | Upload a render and get AI feedback against editorial standards | I know what to fix before spending more API credits on the next phase |
| 5 | Any user | Save my collections and notes including hero render seeds | I never lose production history between sessions |
| 6 | Bloom tier user | Browse all my saved collections in a visual gallery | I can track and manage multiple seasonal collections in parallel |

---

## 3. User Flow

1. User lands on `evercrafted.com` — sees marketing page with clear tier comparison
2. Clicks "Start free" → `/signup` → creates account (Supabase Auth)
3. Email confirmation → redirected to `/dashboard`
4. Dashboard shows: usage indicator, quick actions, recent collections grid
5. Clicks "New Collection" → `/generate` → enters brief
6. Backend: `POST /api/generate` → tier check → Claude API → collection JSON
7. Collection saved to Supabase → user sees full 8-tab results view
8. User works through Render Guide tab → Phase 1 prompt → generates in MJ → uploads to Review tab
9. AI feedback returned → user refines → advances to Phase 2
10. Completes all phases → saves seeds/notes in Notes & Seeds tab
11. Studio tier: exports Etsy listings → story drop page generated
12. User returns next week → dashboard auto-restores last collection

---

## 4. Tier Feature Matrix

| Feature | Free | Bloom | Craft | Studio | Atelier |
|---------|------|-------|-------|--------|---------|
| Collection generation | 2 total | 50/mo | 200/mo | 1000/mo | Unlimited |
| Collections browser | ✓ | ✓ | ✓ | ✓ | ✓ |
| Product hierarchy | ✓ | ✓ | ✓ | ✓ | ✓ |
| Release + cross-sell | ✓ | ✓ | ✓ | ✓ | ✓ |
| Render Guide | — | — | ✓ | ✓ | ✓ |
| Prompt Kit (14 templates) | — | — | ✓ | ✓ | ✓ |
| AI Render Review | — | — | ✓ | ✓ | ✓ |
| Notes & Seeds vault | — | — | ✓ | ✓ | ✓ |
| Inventory integration | — | — | — | ✓ | ✓ |
| Etsy listing generator | — | — | — | ✓ | ✓ |
| Moodoor story drops | — | — | — | ✓ | ✓ |
| Client handoff pages | — | — | — | ✓ | ✓ |
| Cross-collection continuity | — | — | — | — | ✓ |
| White-label output | — | — | — | — | ✓ |
| API access | — | — | — | — | ✓ |

---

## 5. AI Integration Details

### Collection Generation
- **Required tier:** Bloom
- **Model:** claude-sonnet-4-20250514
- **Max tokens:** 8192
- **System prompt:** `/lib/claude.ts` → `COLLECTION_SYSTEM_PROMPT`
- **Input:** Free-text brief (minimum 10 characters)
- **Output schema:** Full `CollectionData` JSON (palette, hierarchy, render prompt, etc.)
- **Location:** `POST /api/generate/route.ts` (server-side only)

### Render Review
- **Required tier:** Craft
- **Model:** claude-sonnet-4-20250514 (vision)
- **Max tokens:** 2000
- **System prompt:** `/lib/claude.ts` → `REVIEW_SYSTEM_PROMPT`
- **Input:** Base64 image + optional context string
- **Output:** `ReviewResponse` JSON (verdict, fixes, prompt additions)
- **Location:** `POST /api/review/route.ts` (server-side only)

**Critical:** `ANTHROPIC_API_KEY` is server-side only. Never prefix with `NEXT_PUBLIC_`.

---

## 6. Data Model

### `profiles` (extends auth.users)
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | References auth.users |
| email | TEXT | |
| full_name | TEXT | |
| stripe_customer_id | TEXT UNIQUE | Set on first checkout |
| subscription_tier | TEXT | free/bloom/craft/studio/atelier |
| subscription_status | TEXT | active/inactive/trialing/past_due/canceled |
| generations_used | INTEGER | Resets on billing cycle (TODO: add cron) |
| generations_limit | INTEGER | Set by webhook on tier change |

### `collections`
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| user_id | UUID FK | → profiles.id |
| name | TEXT | Collection name from Claude output |
| brief | TEXT | Original user brief |
| atmosphere_archetype | TEXT | For dashboard display |
| tagline | TEXT | For dashboard display |
| data | JSONB | Full CollectionData JSON |

### `collection_notes`
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| collection_id | UUID FK | → collections.id |
| user_id | UUID FK | → profiles.id |
| hero_seed | TEXT | MJ seed for hero render |
| base_seed | TEXT | MJ seed for base render |
| notes | TEXT | Free-text production notes |
| image_thumb | TEXT | Base64 JPEG thumbnail |

### `product_renders` (Phase tracker)
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| collection_id | UUID FK | |
| product_name | TEXT | e.g. "The Quiet Hour Wreath" |
| product_type | TEXT | wreath/garland_mantel/etc. |
| phase | INTEGER | Current phase (1-4+) |
| seed | TEXT | Phase seed |
| thumb | TEXT | Phase render thumbnail |
| completed | BOOLEAN | Phase complete flag |

All tables have Row Level Security enabled. Users can only access their own rows.

---

## 7. API Routes

| Route | Method | Auth | Tier | Description |
|-------|--------|------|------|-------------|
| `/api/generate` | POST | ✓ | Bloom | Generate collection from brief |
| `/api/review` | POST | ✓ | Craft | AI review of uploaded render |
| `/api/stripe/create-session` | POST | ✓ | Any | Create Stripe checkout session |
| `/api/stripe/webhook` | POST | ✗ | — | Stripe webhook (subscription events) |

---

## 8. Component Map

| Component | File | Props | State |
|-----------|------|-------|-------|
| AppHeader | `/components/ui/AppHeader.tsx` | — | Uses `useTier()` |
| TierGate | `/components/ui/TierGate.tsx` | `requiredTier`, `children`, `featureName?` | Uses `useTier()` |
| BotanicalDivider | `/components/ui/BotanicalDivider.tsx` | `className?` | Stateless |
| Dashboard | `/app/(dashboard)/page.tsx` | — | Server component |
| useTier | `/hooks/useTier.ts` | — | Returns `{ tier, loading, canAccess }` |

---

## 9. Deployment Checklist

### Supabase
- [ ] Create project at supabase.com
- [ ] Run `supabase/migrations/001_init.sql` in SQL Editor
- [ ] Enable Email auth in Authentication → Providers
- [ ] Copy Project URL and both API keys to `.env.local`
- [ ] Enable RLS on all tables (done in migration)

### Stripe
- [ ] Create 4 products (Bloom/Craft/Studio/Atelier)
- [ ] Set each as recurring monthly subscription
- [ ] Copy each Price ID to `.env.local`
- [ ] Set webhook endpoint: `https://your-domain.com/api/stripe/webhook`
- [ ] Enable events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### Anthropic
- [ ] Get API key from console.anthropic.com
- [ ] Add as `ANTHROPIC_API_KEY` (never NEXT_PUBLIC_)

### Vercel
- [ ] `npm run build` — confirm zero TypeScript errors
- [ ] `vercel` — deploy
- [ ] Add all env vars in Vercel Dashboard → Settings → Environment Variables
- [ ] Verify `/api/stripe/webhook` is accessible (not behind auth)
- [ ] Test: sign up → generate collection → verify Supabase row created
- [ ] Test: upgrade to Bloom → verify Stripe webhook fires → tier updates

---

## 10. Known Limitations & V2 Ideas

### V1 Limitations
- Generation limit counter doesn't reset on billing cycle (needs Supabase Edge Function + cron)
- No email notifications (subscription confirmation, limit warning)
- Phase tracker (product_renders table) is built but frontend not yet wired
- `/app/(dashboard)/generate`, `/app/(dashboard)/collections`, `/app/(dashboard)/settings` pages are stubs — need full implementation

### V2 Ideas
- **Phase tracker UI:** Checklist per product within each collection. Mark phases complete.
- **Render vault:** Upload final renders per product, stored in Supabase Storage.
- **Etsy listing generator:** Claude generates title, tags, and description from collection data.
- **Inventory integration:** User maintains a material list; prompts reference actual owned stems.
- **Cross-collection continuity:** "Continue from The Quiet Hour" — maintains creator DNA.
- **Moodoor story drops:** Auto-generate cinematic HTML launch pages from collection data.
- **Prompt history:** Last 5 prompts per product for version control.
- **Collections API:** Webhook-based integration for builders who want to pipe Evercrafted into their own tools.
