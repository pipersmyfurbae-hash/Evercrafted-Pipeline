# Evercrafted · Locked Rules Sheet
### Paste this when doing render, design, or blueprint work

---

## DESIGN DNA — NON-NEGOTIABLE

**Never include:**
- Sunflowers · pussy willow · cherry blossoms · dried wheat · cotton bolls
- Perfect symmetry (anywhere)
- Flat compositions or centered floral blobs
- Bouquet-style arrangements
- Craft-store aesthetics
- Fresh flower language ("blooming," "fragrant," "fresh-cut")

**Always include:**
- Asymmetric composition with directional flow
- Intentional silence arc / negative space (exposed grapevine)
- Focal hierarchy (dominant → supporting → accent)
- Warm LED strand in all winter/holiday designs
- Believable stem depth, layering, and gravity behavior
- Material specificity (silk, polyester, wire-structured, faux)

---

## THE 12 CANONICAL COMPOSITION FORMULAS

Crescent · Side Sweep · Bottom Heavy · Diagonal Flow · Twin Cluster · Corner Cluster · Wild Asymmetry · Half Ring · Top Cluster · Spiral Flow · Classic Balanced · Garden Scatter

---

## PRODUCT HIERARCHY (8-product system)

| Role | Form | Price Range |
|---|---|---|
| Premium Anchor | Garland or complex centerpiece | $225–$350 |
| Hero | Primary 24" door wreath | $145–$195 |
| Supporting (×2) | Garland or tablescape ring | $85–$165 |
| Gateway | Simplified 16–18" Hero | $95–$135 |
| Atmospheric Filler | Candle ring 5–7" | $35–$55 |
| Accent (×2) | Ribbon bundle or picks | $18–$38 |

---

## ATMOSPHERE ARCHETYPES (canonical list)

Quiet Opulence · Weathered Romance · Sacred Warmth · Lingering Autumn · Velvet Stillness · Candlelit Gathering · Garden Memory · Coastal Melancholy · Wild Ceremony · Soft Grandeur · Inherited Beauty · Winter Reverence · Faded Celebration · Untamed Elegance · Gilded Silence · Reverence · Ceremony · Stillness · Tension · Drift · Inheritance · Echo · Sanctuary

---

## VIGNETTE RULES (for product styling)

- One furniture piece + one wall decor item + one or two identical lamps + 2–3 accents
- Always odd total item count
- Only exact product images and SKUs from specified source brand — no AI placeholders

---

## EVS — EMOTIONAL VECTOR SYSTEM (7 dimensions)

```
warmth    0–1    Thermal, comforting, hearthside
energy    0–1    Active, celebratory, dynamic
nostalgia 0–1    Memory-triggering, temporal, bittersweet
valence   0–1    Positive / negative emotional charge
intimacy  0–1    Personal scale, closeness, privacy
restraint 0–1    Minimalism, silence, architectural
seasonal  0–1    Temporal specificity to a season
```

**Six emotional territories:**
1. Comfort — high warmth, high intimacy, low energy
2. Celebration — high energy, high valence, high warmth
3. Remembrance — high nostalgia, high intimacy, low valence
4. Renewal — high energy, high valence, moderate seasonal
5. Connection — high intimacy, high warmth, moderate energy
6. Seasonal Nostalgia — high nostalgia, high seasonal, moderate warmth

---

## EC_WR_V2 BLUEPRINT SCHEMA (canonical)

```json
{
  "blueprint_id": "EC_WR_V2_[seed]",
  "formula": "[one of 12 canonical formulas]",
  "seed": 42,
  "emotional_tags": ["string"],
  "canvas": { "type": "polar", "diameter_cm": 55 },
  "clusters": [{
    "cluster_id": "C1",
    "type": "focal",
    "zone": "mid",
    "angle_deg": 315,
    "radius_norm": 0.6,
    "stems": [{ "item_id": "INV-001", "name": "Ivory Wax Ranunculus", "qty": 3 }]
  }],
  "silence_arcs": [{ "from_deg": 45, "to_deg": 135 }],
  "scores": { "balance": 0.88, "rhythm": 0.91, "proportion": 0.85 }
}
```

---

## BRAND COPY STANDARDS

**Never use:** beautiful · stunning · gorgeous · cozy · charming · lovely · vibrant · boho · rustic · powerful · seamless · game-changing

**Voice:** Warm, editorial, emotionally precise. Luxury without pretension. Technically grounded but never clinical. Like a master florist who is also a great writer.

**Headlines:** Describe the transformation or the moment — not the feature.

**Always:** Gender-neutral language throughout. Never disclose emotional-tagging methodology to customers.

