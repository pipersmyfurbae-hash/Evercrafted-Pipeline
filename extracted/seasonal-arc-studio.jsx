import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
.app { font-family: 'DM Sans', sans-serif; background: #FAF8F3; color: #1C1914; min-height: 100vh; }
.hdr { padding: 32px 36px 0; border-bottom: 1px solid #E4DDD2; }
.hdr-eye { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #8B7350; margin-bottom: 6px; }
.hdr-title { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 500; line-height: 1.1; margin-bottom: 3px; }
.hdr-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 17px; color: #8B7350; margin-bottom: 22px; }
.tabs { display: flex; gap: 0; overflow-x: auto; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tab { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 11px 18px; background: none; border: none; cursor: pointer; color: #8B7350; border-bottom: 2px solid transparent; white-space: nowrap; transition: color 0.2s, border-color 0.2s; }
.tab:hover { color: #1C1914; }
.tab.active { color: #1C1914; border-bottom-color: #C4963A; }
.body { padding: 36px; }
.eyebrow { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: #8B7350; margin-bottom: 16px; }
.serif { font-family: 'Cormorant Garamond', serif; font-weight: 500; }
.pull { background: #F3EEE5; border-left: 3px solid #C4963A; padding: 18px 22px; margin-bottom: 28px; }
.pull p { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 18px; line-height: 1.6; color: #3A3020; }
.arc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 28px; }
.arc-card { background: #fff; border: 0.5px solid #E4DDD2; padding: 18px; border-radius: 4px; }
.arc-name { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; margin-bottom: 3px; }
.arc-sub { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.12em; text-transform: uppercase; color: #8B7350; margin-bottom: 8px; }
.arc-body { font-size: 11px; color: #5A4F3E; line-height: 1.55; }
.hr { border: none; border-top: 1px solid #E4DDD2; margin: 26px 0; }
.note { background: #FFFBF0; border: 0.5px solid #E8D49C; border-radius: 4px; padding: 13px 16px; margin-bottom: 20px; font-size: 12px; color: #4A3E20; line-height: 1.65; }
.note strong { font-weight: 500; }
.rule-box { background: #F0F4FF; border: 0.5px solid #B0C0E8; border-radius: 4px; padding: 13px 16px; margin-bottom: 20px; font-size: 12px; color: #2A3560; line-height: 1.65; }
.rule-box strong { font-weight: 500; }
.tbl-wrap { overflow-x: auto; margin-bottom: 28px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase; color: #8B7350; padding: 9px 12px; text-align: left; border-bottom: 1px solid #E4DDD2; }
td { padding: 9px 12px; border-bottom: 0.5px solid #EDE7DC; vertical-align: top; line-height: 1.5; color: #3A3020; }
.badge { display: inline-block; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 6px; border-radius: 2px; border: 0.5px solid; white-space: nowrap; }
.b-focal { background: #FDF1E0; border-color: #C4963A; color: #7A5A18; }
.b-secondary { background: #EEF5EE; border-color: #7A9E7A; color: #2D5A2D; }
.b-filler { background: #F1EDF8; border-color: #9B8EC4; color: #4A3A82; }
.b-greenery { background: #E8F3E8; border-color: #5A8A5A; color: #1E4A1E; }
.b-accent { background: #F7EAEA; border-color: #C47A7A; color: #6A2020; }
.step-row { display: flex; gap: 18px; margin-bottom: 22px; }
.step-n { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: #C4963A; line-height: 1; min-width: 32px; flex-shrink: 0; padding-top: 2px; }
.step-title { font-size: 13px; font-weight: 500; margin-bottom: 4px; }
.step-body { font-size: 12px; color: #5A4F3E; line-height: 1.65; }
.meta-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 18px; }
.meta-card { background: #fff; border: 0.5px solid #E4DDD2; padding: 13px 15px; border-radius: 4px; }
.meta-lbl { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase; color: #8B7350; margin-bottom: 4px; }
.meta-val { font-size: 13px; font-weight: 500; }
.genome { background: #F3EEE5; border: 0.5px solid #D4C8A4; border-radius: 4px; padding: 13px 16px; margin-bottom: 24px; }
.genome-lbl { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase; color: #8B7350; margin-bottom: 6px; }
.genome-str { font-family: 'DM Mono', monospace; font-size: 10px; color: #5A4A20; word-break: break-all; line-height: 1.6; }
.oref-box { background: #F0EDF7; border: 0.5px solid #C4B8E8; border-radius: 4px; padding: 14px 16px; margin-bottom: 22px; }
.oref-lbl { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #5B4A8A; margin-bottom: 10px; }
.oref-box ul { list-style: none; }
.oref-box li { font-size: 12px; color: #3A3020; padding: 3px 0; padding-left: 14px; position: relative; }
.oref-box li::before { content: "→"; position: absolute; left: 0; color: #9B8EC4; font-family: 'DM Mono', monospace; font-size: 9px; top: 5px; }
.prompt-block { background: #1A1814; border-radius: 5px; margin-bottom: 16px; overflow: hidden; }
.prompt-block.text-only { border-left: 3px solid #4A6A4A; }
.prompt-block.oref { border-left: 3px solid #6A4A8A; }
.prompt-hdr { display: flex; align-items: center; justify-content: space-between; padding: 11px 15px; border-bottom: 1px solid #2E2A24; gap: 12px; }
.prompt-lbl { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #7A6A50; flex: 1; }
.phase-badge { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 7px; border-radius: 2px; flex-shrink: 0; }
.phase-badge.oref { background: #2A1A3A; border: 0.5px solid #6A4A8A; color: #9B8EC4; }
.phase-badge.text { background: #1A2A1A; border: 0.5px solid #4A6A4A; color: #7A9E7A; }
.copy-btn { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; background: none; border: 0.5px solid #3A3428; color: #7A6A50; cursor: pointer; border-radius: 2px; transition: all 0.18s; flex-shrink: 0; }
.copy-btn:hover { border-color: #6A5A40; color: #C4A060; }
.copy-btn.ok { border-color: #C4963A; color: #C4963A; }
.prompt-txt { font-family: 'DM Mono', monospace; font-size: 11px; color: #D0C4B0; padding: 15px; line-height: 1.72; white-space: pre-wrap; word-break: break-word; }
.wreath-hdr { border-left: 3px solid; padding-left: 16px; margin-bottom: 26px; }
.palette-card { background: #fff; border: 0.5px solid #E4DDD2; padding: 13px 16px; border-radius: 4px; margin-bottom: 18px; }
.species-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 28px; }
.spec-card { background: #fff; border: 0.5px solid #E4DDD2; padding: 12px 14px; border-radius: 4px; }
.spec-role { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: #8B7350; margin-bottom: 4px; }
.spec-name { font-size: 12px; font-weight: 500; margin-bottom: 3px; }
.spec-colors { font-family: 'DM Mono', monospace; font-size: 9px; color: #6A5A40; margin-bottom: 4px; }
.spec-note { font-size: 11px; color: #7A6A50; line-height: 1.45; }
.total-row td { background: #F3EEE5; font-weight: 500; }
.param-tier { background: #F3EEE5; border-radius: 3px; padding: 2px 7px; font-family: 'DM Mono', monospace; font-size: 10px; color: #5A4020; display: inline-block; }
@media (max-width: 600px) {
  .hdr { padding: 22px 18px 0; }
  .body { padding: 22px 18px; }
  .arc-grid { grid-template-columns: 1fr; }
  .meta-grid { grid-template-columns: 1fr 1fr; }
  .hdr-title { font-size: 26px; }
}
`;

const collection = {
  arc: "The collection moves from warmth to acceptance — the last breath of summer, the moment of change, and the arrival of something richer. No sunflowers. No wheat. Just the quiet drama of a season finding its footing.",
  species: [
    { role: "Focal", name: "Dinner plate dahlia", colors: "cream-blush · rust-terracotta · burgundy", note: "One oref image per colorway. Single head, white bg." },
    { role: "Secondary", name: "Lisianthus", colors: "dusty plum · mauve", note: "Multi-bud spray. Full stem. 2–3 buds visible." },
    { role: "Secondary", name: "Pompon chrysanthemum", colors: "copper · deep bronze", note: "Multi-head cluster. Full stem, 3+ heads." },
    { role: "Filler", name: "Coral / peach spray rose", colors: "coral · soft peach · wine", note: "Multi-head spray, open + closed mix." },
    { role: "Filler", name: "Baby's breath", colors: "cream", note: "Full stem. Airy, not compacted." },
    { role: "Filler", name: "Waxflower", colors: "blush · dusty mauve", note: "Full stem preferred." },
    { role: "Filler", name: "Trailing amaranthus", colors: "deep burgundy", note: "Show full drape length — used as oref in W3 Phase 4." },
    { role: "Greenery", name: "Silver dollar eucalyptus", colors: "sage-silver", note: "Full stem." },
    { role: "Greenery", name: "Seeded eucalyptus", colors: "sage", note: "Seeds visible. Full stem." },
    { role: "Greenery", name: "Dusty miller", colors: "silver-sage", note: "Full branch." },
    { role: "Greenery", name: "Olive branch", colors: "olive green", note: "Trailing length preferred." },
    { role: "Greenery", name: "Magnolia branch", colors: "deep green / copper-back", note: "Show both leaf faces." },
    { role: "Greenery", name: "Italian ruscus", colors: "dark green", note: "Compact cluster stem." },
    { role: "Accent", name: "Hypericum berries", colors: "peach · copper · deep red", note: "One image per colorway." },
    { role: "Accent", name: "Snowberries", colors: "white", note: "Full stem." },
    { role: "Accent", name: "Scabiosa pods", colors: "dried brown", note: "Structural pod." },
    { role: "Accent", name: "Blackberry stems", colors: "dark purple-black", note: "Berry clusters clearly visible." },
  ]
};

const workflow = {
  steps: [
    { n: "01", title: "Lock your version", body: "V8.1 is now the Midjourney default (June 2026). --oref and --ow are V7-only. Either set V7 in Settings or append --v 7 to every prompt." },
    { n: "02", title: "Host your stock photos", body: "Every MJ reference needs a public URL. Upload to midjourney.com, Discord (right-click → Copy Link), or use Shopify CDN URLs directly. Label clearly: dahlia-cream.jpg, dahlia-rust.jpg, dahlia-burgundy.jpg." },
    { n: "03", title: "Prep your oref images", body: "Single stem per oref image. White or neutral background. In-focus, full bloom face visible. One colorway per image file." },
    { n: "04", title: "Why 'faux botanical' isn't enough", body: "MJ treats 'faux botanical' as a style word, not a material instruction. Name what materials ARE (silk, polyester, wire stems) and what to EXCLUDE (--no fresh flowers, real plants, organic). Front-load this language — MJ weights early tokens heavily." },
    { n: "05", title: "Build density with a per-stem phase stack", body: "Three phases alone leave a sparse render. MJ only reliably renders the oref stem at full fidelity — everything else in the text prompt is partially interpreted. The fix: one phase per stem tier, building layer by layer exactly as you'd physically construct the wreath. --iw climbs each round (2.0 → 2.5 → 2.8 → 3.0) to lock what's been built. --ow drops each round (400 → 250 → 200 → none) because later stems are subordinate. Small fillers (baby's breath, waxflower, berries, pods) don't benefit from oref — their final pass uses --iw 3.0 with text-only density language." },
    { n: "06", title: "The density language — add this to every filler pass", body: "\"stems layered and overlapping naturally within the floral arc, full lush coverage from [X] to [Y] o'clock with no bare gaps in the floral zone, silence arc remains clear from [Z] to [Z] o'clock with warm grapevine exposed\" — this is what tells MJ to fill the composition. Without explicit coverage language, it defaults to sparse." },
    { n: "07", title: "Capture the seed", body: "After Phase 2 produces an output you love, note the seed number from the MJ interface. Reuse --seed [number] with the Phase 1 base prompt for 1:1 / 4:5 / 16:9 variants without drift." },
  ],
  params: [
    { phase: "Phase 1", p: "Text only", iw: "—", ow: "—", note: "No images in any slot. Pure text base generation." },
    { phase: "Phase 2", p: "Primary focal oref", iw: "2.0", ow: "350–400", note: "Base goes to Image Prompt. Hero focal stock photo goes to Omni Reference." },
    { phase: "Phase 3", p: "Secondary stem oref", iw: "2.5", ow: "250", note: "Phase 2 output goes to Image Prompt. Secondary stem stock photo goes to Omni Reference." },
    { phase: "Phase 4 (oref)", p: "Distinctive filler oref (W3 only: amaranthus)", iw: "2.8", ow: "150–200", note: "Use oref only for stems with distinctive shape MJ can't render from text alone." },
    { phase: "Phase 4/5 (text)", p: "Filler + accent density pass", iw: "3.0", ow: "—", note: "No oref slot. Previous output to Image Prompt only. Add dense coverage language for fillers + accents." },
  ]
};

const wreaths = [
  {
    id: "W1",
    accent: "#C4963A",
    name: "The Last Warmth",
    sub: "Late Summer",
    emotion: "Nostalgia · Warmth · The last sweet breath before autumn",
    palette: "Antique cream (60%) · Apricot-peach (30%) · Soft terracotta (10%)",
    size: "22\"",
    form: "Crescent-weighted arc",
    density: "Medium",
    silence: "3–6 o'clock · Exposed warm grapevine",
    formula: "Crescent Commitment (8 o'clock → 1 o'clock)",
    stems: 32,
    genome: "WGS1|22|crescent|medium|cream-apricot-terracotta|dahlia-cream|spray-rose-coral|babys-breath+waxflower-blush|eucalyptus-silver+olive-branch|hypericum-peach+snowberry|nostalgia-warmth|late-summer|editorial-romantic|asymmetric|DH22CR-LSW",
    florals: [
      { role: "Focal", stem: "Dinner plate dahlia, cream-to-blush", count: 3, place: "11 o'clock (5.5\"), 9 o'clock (4.5\"), 1 o'clock (3.5\")", note: "Vary open stages. Primary at 11 faces forward. Others angled slightly inward." },
      { role: "Secondary", stem: "Coral spray rose", count: 5, place: "8–12–1 arc, nestled between dahlias", note: "Multiple heads per stem. Fill without competing with focal." },
      { role: "Filler", stem: "Baby's breath, cream", count: 4, place: "Distributed through 8–1 arc", note: "Light and airy. Not clumped." },
      { role: "Filler", stem: "Waxflower, blush-pink", count: 3, place: "Accent through upper arc", note: "Tiny blooms, add variety without density." },
      { role: "Greenery", stem: "Silver dollar eucalyptus", count: 8, place: "Full base layer, clockwise sweep", note: "Primary directional element. All stems oriented clockwise." },
      { role: "Greenery", stem: "Olive branch", count: 4, place: "Trailing at 7 and 2 o'clock", note: "Break the silhouette. Extend outward and slightly downward." },
      { role: "Accent", stem: "Hypericum berries, peach/cream", count: 3, place: "Through 8–12 arc", note: "Warm texture dots between blooms." },
      { role: "Accent", stem: "Snowberries, white", count: 2, place: "10 and 12 o'clock", note: "Cool contrast. Use sparingly." },
    ],
    oref: ["Dinner plate dahlia — cream/blush · Phase 2 oref", "Coral spray rose · Phase 3 oref", "Baby's breath, waxflower, hypericum, snowberries · Phase 4 text-only pass"],
    prompts: [
      {
        id: "W1-base", type: "text",
        label: "Phase 1 — green base (no florals, no images)",
        text: `Luxury handcrafted faux botanical wreath, premium artificial silk and polyester greenery, home decor product photography, complete circular grapevine ring base forming a full unbroken 22-inch loop, faux silver dollar eucalyptus with artificial matte disc leaves covering the full ring with varying density, greenery heaviest from 8 to 1 o'clock and sparse from 2 to 7 o'clock with warm grapevine base exposed and visible from 3 to 6 o'clock, polyester olive branch sprays wire-reinforced trailing outward at 7 and 1 o'clock, semi-gloss artificial foliage finish, clockwise directional sweep throughout artificial stems, photographed flat against a pale gray painted wall as if hanging on a front door, front-facing camera angle, soft studio daylight from upper left, 85mm editorial e-commerce product photography, shallow depth of field --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, flat lay, overhead shot, bird's eye view, tabletop --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        id: "W1-p2", type: "oref",
        label: "Phase 2 — primary dahlia · Image Prompt: Phase 1 output · Oref: cream dahlia stock",
        text: `[PHASE1-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk and polyester florals, home decor product photography, complete 22-inch circular grapevine ring, three cream-to-blush silk dinner plate dahlias placed in crescent formation from 8 to 1 o'clock in graduating sizes, primary dahlia fully open at 11 o'clock facing forward, secondary at 9 o'clock angled slightly inward, tertiary at 1 o'clock smaller scale, faux silver dollar eucalyptus base layer clockwise sweep, polyester olive branches trailing at 7 and 1, open arc from 3 to 6 with grapevine exposed, complete circular ring fully visible, matte silk petal texture visible, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial e-commerce product photography --iw 2.0 --oref [DAHLIA-CREAM-URL] --ow 380 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        id: "W1-p3", type: "oref",
        label: "Phase 3 — coral spray rose · Image Prompt: Phase 2 output · Oref: spray rose stock",
        text: `[PHASE2-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 22-inch circular grapevine ring, cream dahlia crescent established at 11, 9, and 1, now adding five coral artificial spray roses nestled between and around dahlias through the 8 to 1 arc, multiple faux silk heads per stem at varied open stages, spray roses subordinate to dahlias in scale, complete circular ring fully visible, open arc 3 to 6 clear, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial product photography --iw 2.5 --oref [CORAL-SPRAY-ROSE-URL] --ow 250 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        id: "W1-p4", type: "text",
        label: "Phase 4 — filler + accent density pass · Image Prompt: Phase 3 output · No oref",
        text: `[PHASE3-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 22-inch circular grapevine ring, cream dahlias and coral spray roses established, now filling abundantly with scattered cream artificial baby's breath airy and light throughout the 8 to 1 o'clock arc, blush polyester waxflower tiny clusters accenting through the upper arc at 10 and 12, three peach faux hypericum berry stems dotted between florals at 8 through 12, white artificial snowberries placed lightly at 10 and 12, stems layered and overlapping naturally within the floral arc, full lush coverage from 8 to 1 o'clock with no bare gaps in the floral zone, silence arc remains clear from 3 to 6 o'clock with warm grapevine exposed, complete circular ring fully visible, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial e-commerce product photography --iw 3.0 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, bird's eye view --style raw --s 150 --ar 1:1 --v 7`
      },
    ],
  },
  {
    id: "W2",
    accent: "#B06040",
    name: "The Turning",
    sub: "Late Summer → Early Fall",
    emotion: "Liminal · Bittersweet · Cinematic change · The pivot",
    palette: "Terracotta-rust (40%) · Dusty mauve-plum (30%) · Sage-silver-olive (30%)",
    size: "24\"",
    form: "Diagonal arc",
    density: "Medium-lush",
    silence: "4–7 o'clock · Deep, intentional, grapevine shown",
    formula: "Diagonal Axis (10 o'clock → 2 o'clock) · Weighted at 10",
    stems: 38,
    genome: "WGS1|24|arc-diagonal|medium-lush|terracotta-mauve-sage|dahlia-rust+cream|lisianthus-plum|waxflower-mauve+spray-rose-peach|seeded-eucalyptus+dusty-miller+olive-branch|hypericum-copper+scabiosa-pod|liminal-bittersweet|transitional|editorial-moody|asymmetric|DH24AD-TRN",
    florals: [
      { role: "Focal", stem: "Dinner plate dahlia, rust-terracotta", count: 2, place: "10 o'clock (5.5\"), 2 o'clock (4\")", note: "Two rust dahlias anchor the diagonal. Size variation essential." },
      { role: "Focal", stem: "Dinner plate dahlia, cream", count: 1, place: "12 o'clock (3.5\")", note: "Cream bridge between the rust dahlias." },
      { role: "Secondary", stem: "Lisianthus, dusty plum", count: 5, place: "Distributed through 10–2 arc", note: "2–3 buds per stem." },
      { role: "Filler", stem: "Waxflower, dusty mauve", count: 4, place: "Through arc, dispersed", note: "Lightweight. Creates color transition." },
      { role: "Filler", stem: "Spray rose, soft peach-mauve", count: 3, place: "Nestled at 9, 11, 1 o'clock", note: "Subordinate to dahlia throughout." },
      { role: "Greenery", stem: "Seeded eucalyptus", count: 8, place: "Full base layer, primary direction", note: "All angled toward 2 o'clock." },
      { role: "Greenery", stem: "Dusty miller", count: 5, place: "Breaking into negative space at 7 and 3", note: "Leaves extend outward." },
      { role: "Greenery", stem: "Olive branch", count: 3, place: "Trailing at 7 and 2 o'clock", note: "Break silhouette." },
      { role: "Accent", stem: "Hypericum berries, copper-rust", count: 4, place: "Through 9–1 arc", note: "Copper echoes rust dahlias." },
      { role: "Accent", stem: "Scabiosa pods", count: 3, place: "10, 12, 2 o'clock", note: "Structural, commanding." },
    ],
    oref: ["Dinner plate dahlia — rust/terracotta · Phase 2 oref", "Lisianthus — dusty plum · Phase 3 oref", "Waxflower, spray roses, hypericum, scabiosa pods · Phase 4 text-only pass"],
    prompts: [
      {
        id: "W2-base", type: "text",
        label: "Phase 1 — green base (no florals, no images)",
        text: `Luxury handcrafted faux botanical wreath, premium artificial silk and polyester greenery, home decor product photography, complete circular grapevine ring base forming a full unbroken 24-inch loop, faux seeded eucalyptus with artificial seed pods covering the full ring with varying density, greenery weight concentrated diagonally from 10 to 2 o'clock and sparse from 3 to 9 o'clock with warm grapevine exposed and visible from 4 to 7 o'clock, polyester dusty miller with silver-tone artificial leaves extending into negative space at 7 and 3 o'clock, wire-structured polyester olive branch sprays trailing outward at 7 and 2, matte and semi-gloss artificial foliage finishes visible, clockwise directional sweep throughout artificial stems, photographed flat against a pale gray painted wall as if hanging on a front door, front-facing camera angle, soft directional studio light from upper left, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, flat lay, overhead shot, bird's eye view, tabletop --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        id: "W2-p2", type: "oref",
        label: "Phase 2 — rust dahlia · Image Prompt: Phase 1 output · Oref: rust dahlia stock",
        text: `[PHASE1-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular grapevine ring, two terracotta-rust silk dinner plate dahlias placed at 10 and 2 o'clock in graduating sizes, one cream silk dahlia bridging at 12 o'clock slightly off-center, faux seeded eucalyptus diagonal sweep established, artificial dusty miller extending outward, polyester olive branches trailing at 7 and 2, open arc from 4 to 7 with grapevine exposed, complete circular ring fully visible, matte silk petal texture visible, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial e-commerce product photography --iw 2.0 --oref [DAHLIA-RUST-URL] --ow 400 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        id: "W2-p3", type: "oref",
        label: "Phase 3 — dusty plum lisianthus · Image Prompt: Phase 2 output · Oref: lisianthus stock",
        text: `[PHASE2-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular grapevine ring, rust and cream silk dahlia diagonal established at 10, 12, and 2, now adding five dusty plum artificial lisianthus stems distributed through the 10 to 2 arc, 2 to 3 faux buds per stem at varied stages, lisianthus nestled between dahlias and subordinate in scale, complete circular ring fully visible, open arc 4 to 7 clear, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial product photography --iw 2.5 --oref [LISIANTHUS-PLUM-URL] --ow 250 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        id: "W2-p4", type: "text",
        label: "Phase 4 — filler + accent density pass · Image Prompt: Phase 3 output · No oref",
        text: `[PHASE3-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular grapevine ring, rust and cream dahlias and dusty plum lisianthus established, now filling abundantly with dusty mauve artificial waxflower dispersed lightly through the 10 to 2 arc, soft peach-mauve artificial spray roses nestled subordinately at 9, 11, and 1 o'clock, four copper faux hypericum berry stems placed through the 9 to 1 arc, three scabiosa pod accents structural at 10, 12, and 2, stems layered and overlapping naturally within the floral arc, full lush coverage from 10 to 2 o'clock with no bare gaps in the floral zone, silence arc remains clear from 4 to 7 o'clock with warm grapevine exposed, complete circular ring fully visible, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial e-commerce product photography --iw 3.0 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, bird's eye view --style raw --s 150 --ar 1:1 --v 7`
      },
    ],
  },
  {
    id: "W3",
    accent: "#8B2840",
    name: "The Arrival",
    sub: "Early Fall",
    emotion: "Settled resolve · Rich abundance · Quiet luxury of the season",
    palette: "Burgundy (40%) · Deep copper-bronze (30%) · Fig-deep green (30%)",
    size: "24\"",
    form: "Full asymmetric body with trailing extensions",
    density: "Lush",
    silence: "1–3 o'clock · Architectural, clean, grapevine as structure",
    formula: "Three-cluster asymmetric (11–8–2) · Amaranthus trailing downward",
    stems: 34,
    genome: "WGS1|24|full-asymmetric|lush|burgundy-copper-figgreen|dahlia-burgundy|chrysanthemum-copper|amaranthus-burgundy+spray-rose-wine|magnolia-branch+italian-ruscus+seeded-eucalyptus|hypericum-darkred+blackberry-stem|resolve-richness|early-fall|editorial-luxury|asymmetric|DH24FA-ARV",
    florals: [
      { role: "Focal", stem: "Dinner plate dahlia, burgundy", count: 3, place: "11 o'clock (6\"), 8 o'clock (4.5\"), 2 o'clock (3.5\")", note: "Primary at 11 commanding and fully open. Secondary at 8 angled inward. Tertiary at 2 quieter scale." },
      { role: "Secondary", stem: "Pompon chrysanthemum, copper-bronze", count: 4, place: "9–10 o'clock cluster (3 stems), accent at 1 (1 stem)", note: "Cluster 3 stems together — don't scatter." },
      { role: "Filler", stem: "Trailing amaranthus, deep burgundy", count: 3, place: "Hanging from 11 toward 8, lower ring at 6", note: "The drama element. Natural downward drape. Gets its own oref round." },
      { role: "Filler", stem: "Spray rose, deep blush-wine", count: 3, place: "At 9 subordinate, and at 2", note: "Dark and moody. Subordinate throughout." },
      { role: "Greenery", stem: "Magnolia branch", count: 4, place: "Structural layer, 8–12–2 arc", note: "Copper-bronze underside. Architectural anchor." },
      { role: "Greenery", stem: "Italian ruscus", count: 6, place: "Dense mid-body fill", note: "Compact. Fills gaps between magnolia. Don't trail." },
      { role: "Greenery", stem: "Seeded eucalyptus", count: 5, place: "Bridges magnolia toward silence arc", note: "Transitions from density to open." },
      { role: "Accent", stem: "Hypericum berries, deep red-burgundy", count: 4, place: "Through 9–11–1 arc", note: "Echo dahlia color, not contrast." },
      { role: "Accent", stem: "Blackberry stems", count: 2, place: "10 and 6 o'clock", note: "High visual weight — use sparingly." },
    ],
    oref: ["Dinner plate dahlia — burgundy · Phase 2 oref", "Pompon chrysanthemum — copper/bronze · Phase 3 oref", "Trailing amaranthus — deep burgundy · Phase 4 oref (distinctive drape form)", "Spray roses, hypericum, blackberry · Phase 5 text-only pass"],
    prompts: [
      {
        id: "W3-base", type: "text",
        label: "Phase 1 — green base (no florals, no images)",
        text: `Luxury handcrafted faux botanical wreath, premium artificial silk and polyester greenery, home decor product photography, complete circular grapevine ring base forming a full unbroken 24-inch loop, faux magnolia branch stems with artificial deep green and copper-bronze leaf faces and wire construction, compact artificial Italian ruscus stems with semi-gloss polyester leaves, faux seeded eucalyptus sprays completing the ring, full circular greenery coverage with artificial body heaviest from 8 to 12 o'clock and lighter from 12 to 4 o'clock, warm grapevine cleanly exposed and visible from 1 to 3 o'clock, faux magnolia leaves at varied angles showing both artificial faces, Italian ruscus filling mid-body densely, photographed flat against a pale gray painted wall as if hanging on a front door, front-facing camera angle, dramatic studio lighting from upper left, deep cream background, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, flat lay, overhead shot, bird's eye view, tabletop --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        id: "W3-p2", type: "oref",
        label: "Phase 2 — burgundy dahlia · Image Prompt: Phase 1 output · Oref: burgundy dahlia stock",
        text: `[PHASE1-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular grapevine ring, three burgundy silk dinner plate dahlias placed at 11, 8, and 2 o'clock in commanding graduating sizes, primary dahlia at 11 fully open and facing forward, secondary at 8 angled slightly inward, tertiary at 2 smaller and quieter, faux magnolia structure and Italian ruscus base established, open arc from 1 to 3 with grapevine architecturally exposed, complete circular ring fully visible, matte silk petal texture and wire stem construction visible, photographed flat against pale gray wall front-facing, dramatic studio lighting upper left, deep cream background, 85mm editorial e-commerce product photography --iw 2.0 --oref [DAHLIA-BURGUNDY-URL] --ow 400 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        id: "W3-p3", type: "oref",
        label: "Phase 3 — copper chrysanthemum · Image Prompt: Phase 2 output · Oref: chrysanthemum stock",
        text: `[PHASE2-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular grapevine ring, burgundy silk dahlia three-cluster established at 11, 8, and 2, now adding four copper-bronze artificial pompon chrysanthemums clustered densely at 9 and 10 o'clock as a group of three stems and one accent at 1 o'clock, chrysanthemum dome texture and bronze polyester finish visible, complete circular ring fully visible, open arc 1 to 3 clear, photographed flat against pale gray wall front-facing, dramatic studio lighting upper left, deep cream background, 85mm editorial product photography --iw 2.5 --oref [CHRYSANTHEMUM-COPPER-URL] --ow 250 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        id: "W3-p4", type: "oref",
        label: "Phase 4 — trailing amaranthus · Image Prompt: Phase 3 output · Oref: amaranthus stock",
        text: `[PHASE3-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular grapevine ring, burgundy dahlias and copper chrysanthemum cluster established, now adding three deep burgundy trailing artificial amaranthus stems, one hanging naturally downward from 11 o'clock toward 8, one from the lower ring at 6 o'clock trailing downward, one nestled at 9, amaranthus draping with natural gravity and visible full length, not coiled or bunched, stems layered abundantly within the 8 to 12 arc building lush coverage, open arc remains clear from 1 to 3 with grapevine exposed, complete circular ring fully visible, photographed flat against pale gray wall front-facing, dramatic studio lighting upper left, deep cream background, 85mm editorial e-commerce product photography --iw 2.8 --oref [AMARANTHUS-BURGUNDY-URL] --ow 200 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        id: "W3-p5", type: "text",
        label: "Phase 5 — filler + accent density pass · Image Prompt: Phase 4 output · No oref",
        text: `[PHASE4-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular grapevine ring, burgundy dahlias, copper chrysanthemums, and trailing burgundy amaranthus established, now filling with three deep wine artificial spray roses nestled subordinately at 9 o'clock and at 2, four deep red faux hypericum berry stems placed through the 9 to 11 to 1 arc, two faux blackberry stems with dark purple-black berry clusters at 10 and 6, stems fully layered and overlapping naturally within the primary arc, lush full coverage from 8 to 12 o'clock with no bare gaps in the floral zone, open arc architecturally clean from 1 to 3 o'clock with warm grapevine exposed, complete circular ring fully visible, photographed flat against pale gray wall front-facing, dramatic studio lighting upper left, deep cream background, 85mm editorial e-commerce product photography --iw 3.0 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, bird's eye view --style raw --s 150 --ar 1:1 --v 7`
      },
    ],
  }
];

function badgeClass(role) {
  const map = { Focal: "b-focal", Secondary: "b-secondary", Filler: "b-filler", Greenery: "b-greenery", Accent: "b-accent" };
  return "badge " + (map[role] || "b-accent");
}

export default function SeasonalArc() {
  const [tab, setTab] = useState("collection");
  const [copied, setCopied] = useState(null);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2200);
  };

  const tabs = [
    { id: "collection", label: "Collection" },
    { id: "workflow", label: "MJ Workflow" },
    ...wreaths.map(w => ({ id: w.id, label: w.name }))
  ];

  const activeWreath = wreaths.find(w => w.id === tab);

  return (
    <>
      <style>{FONTS + CSS}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-eye">Evercrafted · Seasonal Arc Collection</div>
          <div className="hdr-title serif">The Seasonal Arc</div>
          <div className="hdr-sub">Late Summer → Early Fall · MJ V7 Production System</div>
          <div className="tabs">
            {tabs.map(t => (
              <button key={t.id} className={`tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="body">

          {tab === "collection" && (
            <div>
              <div className="eyebrow">Collection Intelligence</div>
              <div className="pull"><p>{collection.arc}</p></div>
              <div className="eyebrow" style={{marginBottom: 12}}>Palette Arc</div>
              <div className="arc-grid">
                {wreaths.map(w => (
                  <div key={w.id} className="arc-card" style={{borderTop: `3px solid ${w.accent}`}}>
                    <div className="arc-name" style={{color: w.accent}}>{w.name}</div>
                    <div className="arc-sub">{w.sub}</div>
                    <div className="arc-body">{w.palette}</div>
                  </div>
                ))}
              </div>
              <hr className="hr" />
              <div className="eyebrow">Stock photo manifest</div>
              <div className="note"><strong>Prep standard:</strong> One image per colorway. Single stem, white or neutral background. In-focus, full bloom face. Shopify CDN URLs are already public.</div>
              <div className="species-grid">
                {collection.species.map((s, i) => (
                  <div key={i} className="spec-card">
                    <div className="spec-role">{s.role}</div>
                    <div className="spec-name">{s.name}</div>
                    <div className="spec-colors">{s.colors}</div>
                    <div className="spec-note">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "workflow" && (
            <div>
              <div className="eyebrow">EVS × Midjourney V7 Production Protocol</div>
              <div className="rule-box">
                <strong>The faux rendering rule:</strong> Open with "Luxury handcrafted faux botanical wreath, premium artificial silk and polyester..." · Name materials (silk, polyester, wire stems) · Close with --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot.
              </div>
              {workflow.steps.map(s => (
                <div key={s.n} className="step-row">
                  <div className="step-n">{s.n}</div>
                  <div><div className="step-title">{s.title}</div><div className="step-body">{s.body}</div></div>
                </div>
              ))}
              <hr className="hr" />
              <div className="eyebrow">Phase stack — parameter evolution</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>Phase</th><th>Stem tier</th><th>--iw</th><th>--ow</th><th>Notes</th></tr>
                  </thead>
                  <tbody>
                    {workflow.params.map((p, i) => (
                      <tr key={i}>
                        <td><span className="param-tier">{p.phase}</span></td>
                        <td style={{fontWeight: 500}}>{p.p}</td>
                        <td style={{fontFamily: "'DM Mono', monospace", color: "#C4963A", textAlign: "center"}}>{p.iw}</td>
                        <td style={{fontFamily: "'DM Mono', monospace", color: "#8B7350", textAlign: "center"}}>{p.ow}</td>
                        <td style={{color: "#5A4F3E"}}>{p.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeWreath && (() => {
            const w = activeWreath;
            return (
              <div>
                <div className="wreath-hdr" style={{borderLeftColor: w.accent}}>
                  <div className="eyebrow" style={{color: w.accent, marginBottom: 4}}>{w.sub} · Blueprint</div>
                  <h2 className="serif" style={{fontSize: 32, marginBottom: 4}}>{w.name}</h2>
                  <p style={{fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: "#8B7350"}}>{w.emotion}</p>
                </div>
                <div className="meta-grid">
                  {[["Size", w.size],["Form", w.form],["Density", w.density],["Formula", w.formula],["Silence arc", w.silence],["Total stems", `${w.stems} stems`]].map(([l, v]) => (
                    <div key={l} className="meta-card"><div className="meta-lbl">{l}</div><div className="meta-val">{v}</div></div>
                  ))}
                </div>
                <div className="palette-card">
                  <div className="meta-lbl">Palette</div>
                  <div style={{fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15}}>{w.palette}</div>
                </div>
                <div className="genome">
                  <div className="genome-lbl">WGS Genome String</div>
                  <div className="genome-str">{w.genome}</div>
                </div>
                <div className="eyebrow">Stem placement guide</div>
                <div className="tbl-wrap">
                  <table>
                    <thead><tr><th>Role</th><th>Stem</th><th style={{textAlign:"center"}}>Count</th><th>Placement</th><th>Construction notes</th></tr></thead>
                    <tbody>
                      {w.florals.map((f, i) => (
                        <tr key={i}>
                          <td><span className={badgeClass(f.role)}>{f.role}</span></td>
                          <td style={{fontWeight: 500, minWidth: 180}}>{f.stem}</td>
                          <td style={{fontFamily: "'DM Mono', monospace", textAlign: "center", fontWeight: 500, color: w.accent}}>{f.count}</td>
                          <td style={{fontFamily: "'DM Mono', monospace", fontSize: 10, minWidth: 180}}>{f.place}</td>
                          <td style={{color: "#5A4F3E", minWidth: 180}}>{f.note}</td>
                        </tr>
                      ))}
                      <tr className="total-row"><td colSpan={2}>Total</td><td style={{fontFamily: "'DM Mono', monospace", textAlign: "center", color: w.accent, fontWeight: 500}}>{w.stems}</td><td colSpan={2}></td></tr>
                    </tbody>
                  </table>
                </div>
                <hr className="hr" />
                <div className="oref-box">
                  <div className="oref-lbl">Phase map — what goes in each slot</div>
                  <ul>{w.oref.map((o, i) => <li key={i}>{o}</li>)}</ul>
                </div>
                <div className="eyebrow">Full phase stack — ready to paste</div>
                {w.prompts.map(({ id, type, label, text }) => (
                  <div key={id} className={`prompt-block ${type}`}>
                    <div className="prompt-hdr">
                      <span className="prompt-lbl">{label}</span>
                      <span className={`phase-badge ${type}`}>{type === "oref" ? "oref" : "text only"}</span>
                      <button className={`copy-btn${copied === id ? " ok" : ""}`} onClick={() => copy(text, id)}>
                        {copied === id ? "Copied ✓" : "Copy"}
                      </button>
                    </div>
                    <div className="prompt-txt">{text}</div>
                  </div>
                ))}
                <div className="note">
                  <strong>Seed capture:</strong> After Phase 2, note the seed number from MJ. Reuse --seed [number] on Phase 1's base prompt to generate 1:1 / 4:5 / 16:9 variants without drift.
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}
