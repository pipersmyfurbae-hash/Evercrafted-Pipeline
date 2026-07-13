# Evercrafted — Reference Weight Calibration Protocol
## How to find and lock the three-source weight set for any collection

---

## The Three Sources and Their MJ Parameters

| Source | What You Make | MJ Slot | Weight Param | Default |
|---|---|---|---|---|
| Floral Collage | Handheld bouquet of all collection florals | `--oref [URL]` | `--ow` | 100 |
| Lifestyle Scene | Generated environment / room / mood image | `--sref [URL]` | `--sw` | 100 |
| Greens Base | Greenery-only structural wreath base | Image prompt `[URL]` | `--iw` | 1.0 |

**Remember:** All three sources must be generated and saved with their seeds before you run any product render. The floral collage is your Step 0 — generate it first using the Material Study Cascade prompt in the render guide.

---

## Step 1 — Prepare Your Three Sources

### 1A — Floral Collage (→ `--oref`)
Run the **Material Study Cascade** prompt from the collection render guide at `--s 30 --style raw`.
- Save the seed immediately
- This image must show every collection material individually readable
- If any element disappears, re-run with that element named explicitly
- The URL of this image is your `OREF_URL`

### 1B — Lifestyle Scene (→ `--sref`)
Generate a scene that captures the collection's atmosphere — the room, the surface, the light quality, the time of day. No wreaths or botanicals in this image. Pure environment.

**Quiet Hour example prompt:**
```
Moody interior vignette, late afternoon winter light filtering through sheer linen curtains, pale gray plaster wall, aged brass candlesticks, deep burgundy linen throw, weathered oak surface, cold blue-gold quality of light, atmospheric and still, editorial interiors photography, soft natural shadows --style raw --s 20 --ar 3:4 --v 7
```

- Save the seed
- The URL of this image is your `SREF_URL`

### 1C — Greens Base (→ image prompt / `--iw`)
Generate a plain greenery-only wreath base — all structural stems, no florals, no ribbon. This anchors the form across products.

**Quiet Hour example prompt:**
```
Luxury faux botanical wreath base, greenery only, deep dark green artificial frosted pine sprays, frosted eucalyptus, natural stem construction, 26 inch full-and-lush wreath form, asymmetric formula, no florals, no ribbon, no decorative elements, pale gray seamless background, front-facing view, soft even studio lighting --style raw --s 20 --ar 1:1 --v 7 --no flowers, berries, ribbon, pods, picks, decorative elements
```

- Save the seed
- The URL of this image is your `IREF_URL`

---

## Step 2 — The Calibration Grid

Run all 9 variants using a single product as the test subject. Use whichever product is **mid-complexity** — not the hero (too complex to isolate variables) and not a filler (too simple to see the differences). For Quiet Hour, use the **Tablescape Ring** or **Door Topper**.

Use the base text prompt for that product from the render guide. Replace `[OREF_URL]`, `[SREF_URL]`, `[IREF_URL]` with your actual URLs.

### The 9 Variants

```
VARIANT A — All defaults (baseline)
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 100 --sref [SREF_URL] --sw 100 --iw 1.0 --style raw --s 50 --ar 4:5 --v 7

VARIANT B — Materials lifted, structure neutral
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 180 --sref [SREF_URL] --sw 100 --iw 1.0 --style raw --s 50 --ar 4:5 --v 7

VARIANT C — Materials lifted, atmosphere pulled back
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 180 --sref [SREF_URL] --sw 60 --iw 1.0 --style raw --s 50 --ar 4:5 --v 7

VARIANT D — Materials lifted, structure strengthened
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 180 --sref [SREF_URL] --sw 100 --iw 1.5 --style raw --s 50 --ar 4:5 --v 7

VARIANT E — Materials dominant (starting point for most collections)
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 180 --sref [SREF_URL] --sw 80 --iw 1.5 --style raw --s 50 --ar 4:5 --v 7

VARIANT F — Materials dominant, structure heavy
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 200 --sref [SREF_URL] --sw 80 --iw 2.0 --style raw --s 50 --ar 4:5 --v 7

VARIANT G — Atmosphere dominant
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 150 --sref [SREF_URL] --sw 150 --iw 1.0 --style raw --s 50 --ar 4:5 --v 7

VARIANT H — Materials very high, atmosphere minimal
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 250 --sref [SREF_URL] --sw 50 --iw 1.5 --style raw --s 50 --ar 4:5 --v 7

VARIANT I — Structure dominant (for products where form is more important than material detail)
[IREF_URL] [base product prompt] --oref [OREF_URL] --ow 150 --sref [SREF_URL] --sw 80 --iw 2.5 --style raw --s 50 --ar 4:5 --v 7
```

---

## Step 3 — Evaluate the Grid

For each variant, score these four criteria. One point each. Maximum 4.

| Criterion | What to look for |
|---|---|
| **Material fidelity** | Can you identify each specific floral? Are textures right (wax finish, velvet nap, frosted tips)? |
| **Color accuracy** | Is the palette pulling from the floral collage correctly? No color drift toward the lifestyle scene? |
| **Atmosphere** | Does the render feel like the right mood/light/environment without being stylistically hijacked by the scene image? |
| **Form integrity** | Is the wreath shape correct — formula, density zones, silence arc — or is it being distorted by the greens base weight? |

The variant with the highest total score (or the one that passes all four qualitatively) becomes your **locked weight set**.

---

## Step 4 — Verify Across Products

Take your winning weight set and run it on one more product — something at the opposite end of the complexity scale from your test subject. If the hero wreath is complex, test a filler or accent product. If weights hold across both, they're locked.

---

## Step 5 — Record in Project State

Add a LOCKED RENDER PARAMETERS block to the collection's Project State card:

```
LOCKED RENDER PARAMETERS — [Collection Name]
  --v 7 --s [value] --style raw --ar [value]
  --ow [value]    (floral collage → oref)
  --sw [value]    (lifestyle scene → sref)  
  --iw [value]    (greens base → image prompt)
  
  Calibration test product: [product name]
  Calibration date: [date]
  Winning variant: [A–I]
  
  Source seeds:
    Floral collage seed: [seed]
    Lifestyle scene seed: [seed]
    Greens base seed: [seed]
```

All eight products in the collection use these exact weights. Do not adjust per-product unless a product fails (see troubleshooting below).

---

## Troubleshooting

**"The oref is pulling the floral collage shape into my wreath"**
Lower `--ow`. You've crossed from material-reading into shape-copying. Drop by 30 and re-run.

**"The lifestyle scene is turning my wreath gray/warm/cold"**
Lower `--sw`. The atmosphere is bleeding into material color temperature. Try 50.

**"The wreath form keeps coming out wrong"**
Raise `--iw` by 0.5 steps. Your text description isn't strong enough to hold the form alone. Alternatively, re-generate the greens base with a more explicit formula description.

**"Every product looks the same regardless of the product prompt"**
Your `--ow` and/or `--iw` are too high. MJ is copying sources instead of using them as reference. Drop both by 30–40%.

**"Materials look right but the image feels flat / no atmosphere"**
Raise `--sw`. Try 120.

**"Color in oref looks right in collage but drifts in product renders"**
The lifestyle scene is pulling color temperature. Lower `--sw` first. If that doesn't fix it, re-generate the lifestyle scene with more neutral lighting.

---

## Per-Collection Calibration Records

### The Quiet Hour
```
Status: NEEDS CALIBRATION
Expected starting point: Variant E (--ow 180 / --sw 80 / --iw 1.5)
Test product: Tablescape Ring or Door Topper
Note: Material Study Cascade already defined in render guide — use as OREF_URL source
```

### The Estate
```
Status: NEEDS CALIBRATION
Expected starting point: Variant E (--ow 180 / --sw 80 / --iw 1.5)
Test product: The Library Table Ring (mid-complexity)
Note: Estate uses no metallics, no frost — lifestyle scene must reflect this or --sw will drift palette warm
```

### The Amber Hour (Seasonal Arc — Dahlias)
```
Status: NEEDS CALIBRATION
Expected starting point: Variant G (--ow 150 / --sw 150 / --iw 1.0)
Rationale: Dahlia oref needs less weight than pod/berry collections — petals are complex and MJ can over-pull at 180
Test product: W2 "The Turning" (rust/mauve diagonal)
Note: Must use --v 7 explicitly. MJ V8.1 is default as of June 2026. --oref/--ow are V7-only flags.
```

---

## Notes on MJ V8.1 (June 2026)

MJ V8.1 is now the default model. The `--oref` and `--ow` flags are **V7-only**. Every prompt in this system must include `--v 7` explicitly or oref slots will be silently ignored.

Confirmed V7-only flags: `--oref`, `--ow`, `--cref`  
Available in both V7 and V8.1: `--sref`, `--sw`, `--iw`, `--s`, `--style raw`, `--ar`, `--no`

If you are testing what V8.1 produces (for future collection planning), omit `--oref` and rely on `--sref` + `--iw` + strong text description. V8.1 produces different material fidelity characteristics — evaluate separately.
