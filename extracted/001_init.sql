-- ─────────────────────────────────────────────────────────────────────────────
-- Evercrafted Database Schema v1.0
-- Run this in your Supabase SQL editor or via: supabase db push
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PROFILES ─────────────────────────────────────────────────────────────────
-- Extends Supabase auth.users with subscription and usage data
CREATE TABLE IF NOT EXISTS profiles (
  id                  UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               TEXT        NOT NULL,
  full_name           TEXT,
  stripe_customer_id  TEXT        UNIQUE,
  subscription_tier   TEXT        NOT NULL DEFAULT 'free'
                      CHECK (subscription_tier IN ('free','bloom','craft','studio','atelier')),
  subscription_status TEXT        NOT NULL DEFAULT 'inactive'
                      CHECK (subscription_status IN ('active','inactive','trialing','past_due','canceled')),
  generations_used    INTEGER     NOT NULL DEFAULT 0,
  generations_limit   INTEGER     NOT NULL DEFAULT 2,  -- Free tier default
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── COLLECTIONS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS collections (
  id                   UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name                 TEXT        NOT NULL,
  brief                TEXT,
  atmosphere_archetype TEXT,
  tagline              TEXT,
  data                 JSONB       NOT NULL,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS collections_user_id_idx ON collections(user_id);
CREATE INDEX IF NOT EXISTS collections_created_at_idx ON collections(created_at DESC);

-- ── COLLECTION NOTES ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS collection_notes (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id  UUID        NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  user_id        UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  hero_seed      TEXT,
  base_seed      TEXT,
  notes          TEXT,
  image_thumb    TEXT,  -- base64 JPEG thumbnail
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS notes_collection_user_idx ON collection_notes(collection_id, user_id);

-- ── PRODUCT RENDERS (Phase Tracking) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_renders (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id  UUID        NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  user_id        UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_name   TEXT        NOT NULL,
  product_type   TEXT        NOT NULL
                 CHECK (product_type IN ('wreath','garland_mantel','garland_stair','tablescape','topper','candle_ring','ribbon','picks')),
  phase          INTEGER     NOT NULL DEFAULT 1,
  seed           TEXT,
  thumb          TEXT,
  notes          TEXT,
  completed      BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS renders_collection_idx ON product_renders(collection_id);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_renders ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Collections: users own their collections
CREATE POLICY "Users can manage own collections"
  ON collections FOR ALL USING (auth.uid() = user_id);

-- Notes: users own their notes
CREATE POLICY "Users can manage own notes"
  ON collection_notes FOR ALL USING (auth.uid() = user_id);

-- Renders: users own their renders
CREATE POLICY "Users can manage own renders"
  ON product_renders FOR ALL USING (auth.uid() = user_id);

-- ── UPDATED_AT TRIGGER ────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER collections_updated_at BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
