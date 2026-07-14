# Evercrafted · Project State Card
### Update this after every session. Paste alongside the Context Block.

*Last updated: July 2026*

---

## ACTIVE PROJECT: The Quiet Hour — Winter Holiday Collection

**Collection identity:** Gilded Silence atmosphere archetype
**Palette:** Aged Brass #B08D45 · Deep Pine #1F3326 · Ivory Wax #F0E8D8 · Burgundy Wine #5C1A2E · Frost Silver #B8C4BE
**Materials:** Ivory wax-finish silk ranunculus · Eucalyptus pod sprays (98898.GR) · Deep burgundy berry stems (95482.BU) · Frosted pine · Warm LED strand · Burgundy velvet ribbon

---

## RENDER STATUS

| Product | Role | Price | Render Status |
|---|---|---|---|
| Hero Wreath | Hero | $185 | ✅ LOCKED — seed captured |
| Mantel Garland | Premium Anchor | $295 | 🔄 In progress — Phase 3 |
| Stair Garland | Supporting | $165 | ⬜ Not started |
| Tablescape Ring | Supporting | $98 | ⬜ Not started |
| Door Topper | Gateway | $118 | ⬜ Not started |
| Candle Ring | Atmospheric | $42 | ⬜ Not started |
| Velvet Ribbon Trio | Accent | $34 | ⬜ Photography only |
| Brass Pick Bundle | Accent | $26 | ⬜ Photography only |

---

## WHAT'S LOCKED — DO NOT REVISIT

- Hero Wreath render is final and approved
- Collection palette and product hierarchy are locked
- All 8 MJ V7 render prompts exist in the Collection Generator app (Render Guide tab)
- Render guide covers all products, all phases, with copy buttons

---

## WHAT'S IN PROGRESS

- Mantel Garland Phase 3: Testing off-center bow, single sref (ranunculus only), --s 50, pine color corrected
- Key fix applied: --sref [RANUNCULUS-URL] --sw 200 to protect ranunculus when orefing eucalyptus pod sprays
- Bow issue: MJ defaulting to symmetrical — use Editor region or --iw 1.8

---

## WHAT COMES NEXT (in order)

1. ✅ Finish Mantel Garland (Phase 3 → 4)
2. ⬜ Render remaining 5 products using Render Guide in the app
3. ⬜ Build The Quiet Hour lookbook using `the-turning-lookbook.html` as template
4. ⬜ Generate individual product story pages using wreath-lifestyle-story skill
5. ⬜ Add three-tier purchase footer (commission / kit / blueprint) to each story page
6. ⬜ Wire Stripe payment links or Etsy listings to purchase footer
7. ⬜ Connect Moodoor memory intake to Claude API
8. ⬜ Migrate EVS vectors from Moodoor_Studio_dc.html into wreaths-data.js
9. ⬜ Wire Evercrafted SaaS dashboard and generate page client UI

---

## KEY MJ V7 PARAMETERS — LOCKED

```
--style raw          (not --raw alone — that doesn't work)
--s 150              wreaths and rings
--s 50               garlands (prevents painted/illustrated look)
--v 7                always
--ar 1:1             wreaths, topper, candle ring, tablescape
--ar 16:9            mantel garland
--ar 4:5             stair garland

Faux opener:
"Luxury handcrafted faux botanical [wreath/garland], premium artificial
silk and polyester florals, home decor product photography..."

--no block always includes:
fresh flowers, real plants, live botanicals, organic, dew, wilting,
florist, fresh-cut

Garlands add:
--no illustrated, painted, digital art, blue pine, gray pine

Wall-mount wreaths add:
--no flat lay, overhead shot, bird's eye view

Pine language (always use this exact wording):
"deep dark green artificial pine stems with fine individual needle
strands and silver-white frost on needle tips only —
warm deep green base color throughout not blue not gray"
```

---

## PROTECTING PREVIOUS OREF ROUNDS

When running Phase 3+ oref with a new element:
- New element → `--oref [STOCK-URL] --ow [220–380]`
- Previous focal → `--sref [PREVIOUS-STOCK-URL] --sw 200`
- Never put two images in --sref if they fight (reduces to one if fidelity drops)

---

## DECISIONS ALREADY MADE — DON'T RE-LITIGATE

- Ranunculus buds are NOT cotton bolls — they are small ranunculus in bud stage
- Bow placement: single off-center at one-third from left (not symmetrical ends)
- Pine renders blue/gray when described loosely — always use the locked pine language above
- LED should read "warm amber LED strand glow as distinct warm light points between foliage"
- Garland sag: describe "natural downward drape with visible front sag consistent with garland weight and gravity"

