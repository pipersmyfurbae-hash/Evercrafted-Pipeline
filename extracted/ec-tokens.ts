// ── Evercrafted Design Token System ─────────────────────────────────────────
export const EC = {
  // Colors
  white: '#FFFFFF',
  offWhite: '#F9F7F4',
  paper: '#F2EFE9',
  black: '#1A1A1A',
  charcoal: '#2E2E2E',
  ink: '#4A4A4A',
  green: '#4A6741',
  greenLight: '#6B8F67',
  greenPale: '#EEF2ED',
  greenDim: 'rgba(74,103,65,0.12)',
  gold: '#C4963A',
  goldDim: '#8A6820',
  goldPale: '#FDF0E0',
  border: '#E8E8E8',
  borderDark: '#D0D0D0',
  gray400: '#A8A8A8',
  gray500: '#787878',
  // Tier accent colors
  tierBloom: '#6B8F67',
  tierCraft: '#4A6741',
  tierStudio: '#C4963A',
  tierAtelier: '#1A1A1A',
} as const

// ── Tier feature gates ───────────────────────────────────────────────────────
export const TIER_FEATURES = {
  COLLECTION_GENERATION: 'bloom',
  RENDER_GUIDE: 'craft',
  PROMPT_KIT: 'craft',
  RENDER_REVIEW: 'craft',
  NOTES_AND_SEEDS: 'craft',
  INVENTORY_INTEGRATION: 'studio',
  ETSY_LISTINGS: 'studio',
  STORY_DROPS: 'studio',
  CLIENT_HANDOFFS: 'studio',
  CROSS_COLLECTION_CONTINUITY: 'atelier',
  WHITE_LABEL: 'atelier',
  API_ACCESS: 'atelier',
} as const

// ── Generation limits ────────────────────────────────────────────────────────
export const GENERATION_LIMITS = {
  free: 2,
  bloom: 50,
  craft: 200,
  studio: 1000,
  atelier: Infinity,
} as const
