// ── Tier System ──────────────────────────────────────────────────────────────
export type Tier = 'free' | 'bloom' | 'craft' | 'studio' | 'atelier'

export const TIER_RANK: Record<Tier, number> = {
  free: 0, bloom: 1, craft: 2, studio: 3, atelier: 4,
}

export const TIER_LABELS: Record<Tier, string> = {
  free: 'Free', bloom: 'Bloom', craft: 'Craft', studio: 'Studio', atelier: 'Atelier',
}

export const TIER_PRICES: Record<Exclude<Tier,'free'>, string> = {
  bloom: '$39/mo', craft: '$97/mo', studio: '$197/mo', atelier: '$397/mo',
}

export const TIER_COLORS: Record<Tier, string> = {
  free: '#A8A8A8', bloom: '#6B8F67', craft: '#4A6741', studio: '#C4963A', atelier: '#1A1A1A',
}

// ── User / Profile ───────────────────────────────────────────────────────────
export interface Profile {
  id: string
  email: string
  full_name?: string
  stripe_customer_id?: string
  subscription_tier: Tier
  subscription_status: 'active' | 'inactive' | 'trialing' | 'past_due' | 'canceled'
  generations_used: number
  generations_limit: number
  created_at: string
}

// ── Collection ───────────────────────────────────────────────────────────────
export interface PaletteColor {
  name: string
  hex: string
  role: 'dominant' | 'supporting' | 'accent' | 'bridge' | 'negative'
  pct: string
}

export interface ProductHierarchyItem {
  role: string
  name: string
  form: string
  formula: string
  scale: string
  price: number
  keyMaterials: string
  notes: string
}

export interface CollectionData {
  collectionName: string
  tagline: string
  atmosphereArchetype: string
  atmosphereDescription: string
  emotionalBrief: string
  palette: PaletteColor[]
  signatureSpec: { label: string; value: string }[]
  emotionTags: string[]
  hierarchy: ProductHierarchyItem[]
  priceRange: { low: number; high: number; center: number }
  continuity: { atmosphere: string; palette: string; movement: string; texture: string; bridgeTone: string }
  releasePhases: { phase: string; title: string; timing: string; releases: string; purpose: string; copy: string }[]
  crossSell: { name: string; flow: string }[]
  bundles: { name: string; type: string; contents: string; sum: number; discount: number }[]
  heroRenderPrompt: string
  heroGenome: string
  merchandising: string[]
  brief?: string
  savedAt?: string
}

export interface Collection {
  id: string
  user_id: string
  name: string
  brief?: string
  atmosphere_archetype?: string
  tagline?: string
  data: CollectionData
  created_at: string
  updated_at: string
}

// ── Collection Notes ─────────────────────────────────────────────────────────
export interface CollectionNotes {
  id: string
  collection_id: string
  hero_seed?: string
  base_seed?: string
  notes?: string
  image_thumb?: string
  updated_at: string
}

// ── Render / Phase Tracking ──────────────────────────────────────────────────
export type ProductType = 'wreath' | 'garland_mantel' | 'garland_stair' | 'tablescape' | 'topper' | 'candle_ring' | 'ribbon' | 'picks'

export interface ProductRender {
  id: string
  collection_id: string
  product_name: string
  product_type: ProductType
  phase: number
  seed?: string
  thumb?: string
  notes?: string
  completed: boolean
  created_at: string
}

// ── API Responses ────────────────────────────────────────────────────────────
export interface ApiError {
  error: string
  code?: string
}

export interface GenerateResponse {
  collection: CollectionData
  saved_id?: string
}

export interface ReviewResponse {
  overallVerdict: 'advance' | 're-run'
  verdictStatement: string
  whatsWorking: string[]
  criticalFixes: { issue: string; fix: string }[]
  adjustments: { item: string; suggestion: string }[]
  promptAdditions: string[]
  phaseRecommendation: string
}
