import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
.app { font-family: 'DM Sans', sans-serif; background: #F7F4EE; color: #1A1814; min-height: 100vh; }
.hdr { padding: 32px 36px 0; border-bottom: 1px solid #E2DACB; background: linear-gradient(180deg, #F0EBDC 0%, #F7F4EE 100%); }
.hdr-eye { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #8A7142; margin-bottom: 6px; }
.hdr-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 500; line-height: 1.1; margin-bottom: 4px; }
.hdr-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 16px; color: #8A7142; margin-bottom: 22px; }
.tabs { display: flex; gap: 0; overflow-x: auto; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tab { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; padding: 11px 16px; background: none; border: none; cursor: pointer; color: #8A7142; border-bottom: 2px solid transparent; white-space: nowrap; transition: color 0.2s, border-color 0.2s; }
.tab:hover { color: #1A1814; }
.tab.active { color: #1A1814; border-bottom-color: #B08D45; }
.body { padding: 36px; max-width: 1100px; }
.eyebrow { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: #8A7142; margin-bottom: 16px; }
.serif { font-family: 'Cormorant Garamond', serif; font-weight: 500; }
.pull { background: #EFE9D8; border-left: 3px solid #B08D45; padding: 20px 24px; margin-bottom: 28px; }
.pull p { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 19px; line-height: 1.62; color: #332B1A; }
.hr { border: none; border-top: 1px solid #E2DACB; margin: 28px 0; }
.note { background: #FFFBF0; border: 0.5px solid #E8D49C; border-radius: 4px; padding: 13px 16px; margin-bottom: 20px; font-size: 12px; color: #4A3E20; line-height: 1.65; }
.note strong { font-weight: 500; }
.section-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; margin-bottom: 14px; }
.swatch-row { display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap; }
.swatch { flex: 1; min-width: 110px; border-radius: 4px; overflow: hidden; border: 0.5px solid #E2DACB; }
.swatch-color { height: 52px; }
.swatch-label { background: #fff; padding: 8px 10px; }
.swatch-name { font-size: 11px; font-weight: 500; }
.swatch-hex { font-family: 'DM Mono', monospace; font-size: 9px; color: #8A7142; }
.profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
.profile-card { background: #fff; border: 0.5px solid #E2DACB; padding: 14px 16px; border-radius: 4px; }
.profile-lbl { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase; color: #8A7142; margin-bottom: 5px; }
.profile-val { font-size: 13px; line-height: 1.5; }
.sig-block { background: #1A1814; border-radius: 5px; padding: 22px 26px; margin-bottom: 28px; }
.sig-row { display: flex; gap: 14px; padding: 7px 0; border-bottom: 0.5px solid #2E2A22; font-size: 12.5px; }
.sig-row:last-child { border-bottom: none; }
.sig-lbl { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: #B08D45; min-width: 165px; flex-shrink: 0; padding-top: 1px; }
.sig-val { color: #E0D8C4; line-height: 1.55; font-family: 'Cormorant Garamond', serif; font-size: 15px; }
.role-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.role-card { background: #fff; border: 0.5px solid #E2DACB; border-left: 4px solid; border-radius: 4px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
.role-left { flex: 1; min-width: 220px; }
.role-tag { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.12em; text-transform: uppercase; color: #8A7142; margin-bottom: 4px; }
.role-name { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 600; margin-bottom: 4px; }
.role-meta { font-size: 11.5px; color: #5A5240; line-height: 1.55; }
.role-price { font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500; color: #1A1814; white-space: nowrap; }
.price-range-card { background: #1A1814; border-radius: 5px; padding: 18px 22px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 28px; }
.pr-item { }
.pr-lbl { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.12em; text-transform: uppercase; color: #8A7142; margin-bottom: 4px; }
.pr-val { font-family: 'DM Mono', monospace; font-size: 18px; color: #E0D8C4; }
.exp-row { display: flex; gap: 16px; padding: 14px 0; border-bottom: 0.5px solid #E2DACB; }
.exp-tag { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: #B08D45; min-width: 150px; flex-shrink: 0; padding-top: 2px; }
.exp-body { font-size: 12.5px; color: #332B1A; line-height: 1.6; }
.exp-body b { font-weight: 500; }
.tbl-wrap { overflow-x: auto; margin-bottom: 28px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.12em; text-transform: uppercase; color: #8A7142; padding: 9px 12px; text-align: left; border-bottom: 1px solid #E2DACB; }
td { padding: 9px 12px; border-bottom: 0.5px solid #EDE6D4; vertical-align: top; line-height: 1.5; color: #332B1A; }
.thread-card { background: #fff; border: 0.5px solid #E2DACB; padding: 14px 18px; border-radius: 4px; margin-bottom: 10px; }
.thread-name { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 15px; margin-bottom: 3px; color: #B08D45; }
.thread-body { font-size: 12px; color: #5A5240; line-height: 1.6; }
.chk { font-size: 13px; }
.chk.ok { color: #3D7A4A; }
.timeline { display: flex; flex-direction: column; gap: 0; margin-bottom: 28px; }
.phase-card { border-left: 3px solid #B08D45; padding: 4px 0 22px 20px; position: relative; }
.phase-card::before { content: ''; position: absolute; left: -6px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: #B08D45; }
.phase-card:last-child { padding-bottom: 0; }
.phase-num { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #8A7142; margin-bottom: 2px; }
.phase-title { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 600; margin-bottom: 6px; }
.phase-meta { font-size: 12px; color: #5A5240; line-height: 1.65; margin-bottom: 4px; }
.phase-meta b { color: #332B1A; font-weight: 500; }
.system-card { background: #fff; border: 0.5px solid #E2DACB; padding: 16px 20px; border-radius: 4px; margin-bottom: 14px; }
.system-name { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; margin-bottom: 8px; color: #B08D45; }
.system-flow { font-size: 12.5px; color: #332B1A; line-height: 1.7; }
.bundle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px; }
.bundle-card { background: #fff; border: 0.5px solid #E2DACB; border-radius: 4px; padding: 16px 18px; }
.bundle-name { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; margin-bottom: 3px; }
.bundle-type { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: #8A7142; margin-bottom: 8px; }
.bundle-contents { font-size: 11.5px; color: #5A5240; line-height: 1.55; margin-bottom: 10px; }
.bundle-price-row { display: flex; align-items: baseline; gap: 8px; }
.bundle-sum { font-family: 'DM Mono', monospace; font-size: 11px; color: #A89878; text-decoration: line-through; }
.bundle-final { font-family: 'DM Mono', monospace; font-size: 17px; color: #B08D45; font-weight: 500; }
.bundle-save { font-family: 'DM Mono', monospace; font-size: 9px; color: #3D7A4A; }
.merch-block { margin-bottom: 22px; }
.merch-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; margin-bottom: 6px; color: #1A1814; }
.merch-body { font-size: 12.5px; color: #5A5240; line-height: 1.65; }
.flow-list { list-style: none; counter-reset: flow; margin-bottom: 28px; }
.flow-list li { counter-increment: flow; padding: 9px 0 9px 32px; border-bottom: 0.5px solid #EDE6D4; position: relative; font-size: 12.5px; color: #332B1A; line-height: 1.55; }
.flow-list li::before { content: counter(flow); position: absolute; left: 0; top: 9px; font-family: 'DM Mono', monospace; font-size: 10px; color: #B08D45; border: 0.5px solid #B08D45; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
.genome { background: #EFE9D8; border: 0.5px solid #D8C8A0; border-radius: 4px; padding: 13px 16px; margin-bottom: 16px; }
.genome-lbl { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase; color: #8A7142; margin-bottom: 6px; }
.genome-str { font-family: 'DM Mono', monospace; font-size: 10px; color: #6A5420; word-break: break-all; line-height: 1.6; }
.prompt-block { background: #1A1814; border-radius: 5px; margin-bottom: 18px; overflow: hidden; }
.prompt-hdr { display: flex; align-items: center; justify-content: space-between; padding: 11px 15px; border-bottom: 1px solid #2E2A24; gap: 12px; }
.prompt-lbl { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #9A8860; flex: 1; }
.copy-btn { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; background: none; border: 0.5px solid #3A3428; color: #9A8860; cursor: pointer; border-radius: 2px; transition: all 0.18s; flex-shrink: 0; }
.copy-btn:hover { border-color: #B08D45; color: #B08D45; }
.copy-btn.ok { border-color: #B08D45; color: #B08D45; }
.prompt-txt { font-family: 'DM Mono', monospace; font-size: 11px; color: #D4C8B0; padding: 15px; line-height: 1.72; white-space: pre-wrap; word-break: break-word; }
.render-product-hdr { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; margin-bottom: 4px; }
.render-product-sub { font-size: 12px; color: #8A7142; margin-bottom: 14px; }
.condensed-card { background: #fff; border: 0.5px solid #E2DACB; padding: 14px 18px; border-radius: 4px; margin-bottom: 10px; }
.condensed-name { font-weight: 500; font-size: 13px; margin-bottom: 4px; }
.condensed-note { font-size: 11.5px; color: #5A5240; line-height: 1.55; }
@media (max-width: 600px) {
  .hdr { padding: 22px 18px 0; } .body { padding: 22px 18px; }
  .profile-grid { grid-template-columns: 1fr; } .bundle-grid { grid-template-columns: 1fr; }
  .hdr-title { font-size: 27px; } .role-card { flex-direction: column; }
}
`;

const palette = [
  { name: "Aged Brass", hex: "#B08D45" },
  { name: "Deep Pine", hex: "#1F3326" },
  { name: "Ivory Wax", hex: "#F0E8D8" },
  { name: "Burgundy Wine", hex: "#5C1A2E" },
  { name: "Frost Silver", hex: "#B8C4BE" },
];

const foundation = {
  profile: [
    ["Collection name", "The Quiet Hour"],
    ["Atmosphere archetype", "Gilded Silence — rich, warm, and absolutely still; gold without noise"],
    ["Season / timing", "Winter Holiday · Preparation (Nov) → Celebration (Dec) → Still Retreat (Jan)"],
    ["Palette identity", "Aged Brass · Deep Pine · Ivory Wax · Burgundy Wine · Frost Silver"],
    ["Movement archetype", "Still, expressed as Orbit on ring-form pieces, translating to Cascade + Taper Fade on linear garlands"],
    ["Texture language", "Brushed brass · frosted pine needle · wax-finish bloom · dark velvet · diffused warm LED glow"],
    ["Emotional purchase trigger", "The desire to make a home feel like sanctuary before the season's noise arrives — not louder decoration, a held breath of quality"],
    ["Hero formula", "Half Ring — top-weighted density, bottom half held quiet"],
    ["Variation formulas", "Garden Scatter (centerpiece) · Crescent-translated (mantel garland) · Side Sweep-translated (stair garland)"],
    ["Collection ambition", "Full — 8 products"],
  ],
  signature: [
    ["Emotional Atmosphere", "Gilded Silence with held stillness and architectural restraint."],
    ["Structural Movement", "Orbit + Still — ring-form pieces; Cascade + Taper Fade on linear garlands."],
    ["Palette Language", "Aged brass · deep pine · ivory wax · burgundy wine · frost silver."],
    ["Density Profile", "Top-weighted and structured · open breathing through the lower half."],
    ["Asymmetry Direction", "Weighted upper arc · silence protected lower arc, one velvet ribbon breaking the architecture."],
    ["Texture Language", "Brushed brass · frosted needle · wax-finish petal · dark velvet · warm glow."],
    ["Composition Formula", "Half Ring (hero) · Garden Scatter, Crescent, Side Sweep (variations)"],
    ["Silence Arc", "120°–240° (lower half quiet, grapevine exposed)"],
    ["Seasonal Resonance", "Preparation settling into celebration, then still retreat."],
    ["Emotion Tags", '["hushed", "architectural", "warm", "ceremonial", "restrained", "gilded"]'],
  ]
};

const hierarchy = [
  { role: "Premium Anchor", color: "#1F3326", name: "The Quiet Hour Mantel Garland", form: "6ft mantel garland", formula: "Crescent-translated directional linear flow", scale: "72\" length", price: 295, meta: "Most complex, most labor. Center-weighted density tapering toward both trailing ends. Sets the collection's value ceiling. Positioned first in the shop." },
  { role: "Hero", color: "#B08D45", name: "The Quiet Hour Wreath", form: "24\" door wreath", formula: "Half Ring", scale: "24\"", price: 185, meta: "The emotional centerpiece. Top-weighted dense arc from 8 through 12 to 4 o'clock; lower half held quiet with grapevine exposed. Most photographed, collection thumbnail hero." },
  { role: "Supporting", color: "#5C1A2E", name: "The Quiet Hour Stair Garland", form: "9ft staircase garland", formula: "Side Sweep-translated asymmetric weight", scale: "108\" length, lighter density than anchor", price: 165, meta: "Heavier at the newel post, tapering up the rail — directional ascent. Same material family, lower density than the Premium Anchor." },
  { role: "Supporting", color: "#5C1A2E", name: "The Quiet Hour Tablescape Ring", form: "14\" centerpiece ring", formula: "Garden Scatter", scale: "14\" diameter, surrounds pillar candles", price: 98, meta: "Radially balanced, 360°-viewable — no directional formula, since it's seen from every seat at the table." },
  { role: "Gateway", color: "#8A7142", name: "The Quiet Hour Door Topper", form: "16\" half-wreath swag", formula: "Simplified Half Ring", scale: "16\"", price: 118, meta: "Lower complexity, single LED accent, no velvet ribbon. The accessible way into the collection's signature DNA before committing to the full wreath." },
  { role: "Atmospheric Filler", color: "#B8C4BE", name: "The Quiet Hour Candle Ring", form: "5\" candle ring", formula: "Classic Balanced", scale: "5\" diameter, fits standard pillar candles", price: 42, meta: "Micro scale — one dominant brass pod, one secondary frosted pine sprig, substrate only. No wisp material at this scale. Most accessible product in the collection." },
  { role: "Accent", color: "#F0E8D8", name: "The Quiet Hour Velvet Ribbon Trio", form: "3-ribbon bundle", formula: "—", scale: "burgundy velvet, brass wire-edge, ivory linen", price: 34, meta: "Ties directly to the wreath's signature trailing ribbon. Gift-wrap and bow-making companion." },
  { role: "Accent", color: "#F0E8D8", name: "The Quiet Hour Brass Pick Bundle", form: "3-stem pick set", formula: "—", scale: "magnolia pod pick, wax berry pick, frosted pine pick", price: 26, meta: "Completes a vase, gift topper, or place setting. Lowest-commitment way to own a piece of the collection." },
];

const totalSum = hierarchy.reduce((s, h) => s + h.price, 0);
const avgPrice = Math.round(totalSum / hierarchy.length);

const expansionMap = [
  ["Seed product", "The Quiet Hour Wreath — Half Ring, 24\""],
  ["Collection ambition", "Full (8 products)"],
  ["Premium Anchor", "Mantel garland · Crescent-translated linear flow · 72\" · deep pine, frosted eucalyptus, brass magnolia pods, ivory wax ranunculus, dual trailing velvet ribbon"],
  ["Hero", "Door wreath · Half Ring · 24\" · same material family at full hierarchy expression"],
  ["Supporting 1", "Stair garland · Side Sweep-translated · 108\" · lighter density than anchor, directional ascent up the rail"],
  ["Supporting 2", "Tablescape ring · Garden Scatter · 14\" · 360°-viewable, no directional formula, radial bloom distribution"],
  ["Atmospheric Filler", "Candle ring · Classic Balanced · 5\" · simplified to one dominant + one secondary + substrate, no wisp material"],
  ["Gateway", "Door topper · simplified Half Ring · 16\" · lower complexity, single LED, no ribbon — entry price rationale: 60% below Premium Anchor while remaining a true wreath-form product"],
  ["Accent 1–2", "Velvet ribbon trio (ties to wreath's signature ribbon) · brass pick bundle (vase/gift topper companion)"],
];

const continuityAudit = hierarchy.map(h => ({ name: h.name, atmosphere: true, palette: true, movement: true, texture: true }));

const releasePhases = [
  { n: "Phase 1", title: "Anticipation Release", timing: "Late October → Early November", releases: "Gateway (Door Topper) + Atmospheric Filler (Candle Ring)", purpose: "Signal the collection is coming, establish Gilded Silence as the season's atmosphere, capture early buyers before the rush.", copy: "\"The collection begins here\" — positioned as a beginning, not a complete offering." },
  { n: "Phase 2", title: "Hero Release", timing: "Mid-November", releases: "Hero (Wreath) + Premium Anchor (Mantel Garland)", purpose: "Maximum commercial window — highest browse-to-purchase intent of the season. Full collection announcement.", copy: "Reference Phase 1 products explicitly as part of the same family." },
  { n: "Phase 3", title: "Full Collection — Celebration", timing: "Early December (peak)", releases: "Stair Garland, Tablescape Ring, Velvet Ribbon Trio, Brass Pick Bundle", purpose: "Complete the ecosystem. Trigger collection-completion psychology in Phase 1–2 buyers, who are the highest-intent audience for these remaining pieces.", copy: "Room-system framing — \"complete the entry,\" \"complete the table.\"" },
  { n: "Phase 4", title: "Still Retreat — Late Season Sustain", timing: "Mid-to-late December into early January", releases: "Bundle Gateway + Atmospheric Filler at a modest discount; no individual price changes", purpose: "Extend the commercial window without cannibalizing peak pricing.", copy: "Begin seeding Spring collection language — the quiet exhale after the gathering." },
];

const crossSellSystems = [
  { name: "Entry / front door system", flow: "Hero Wreath → Door Topper (interior door) → Stair Garland (entry hall) → Brass Pick Bundle at the threshold console table." },
  { name: "Mantel system", flow: "Mantel Garland (anchor) → Candle Rings ×2–3 (rhythm at thirds) → Wreath hung above as coordinating focal → Brass Pick Bundle as the final accent." },
  { name: "Dining table system", flow: "Tablescape Ring (hero, surrounding pillar candles) → Candle Rings ×2 (flanking) → Velvet Ribbon Trio for napkin ties." },
];

const bundles = [
  { name: "The Mantel Edit", type: "Completion bundle", contents: "Mantel Garland + 2× Candle Ring + Wreath + Brass Pick Bundle", sum: 295 + 84 + 185 + 26, pct: 0.12 },
  { name: "Collection Starter", type: "Collection starter", contents: "Door Topper + Wreath", sum: 118 + 185, pct: 0.08 },
  { name: "The Gift Edit", type: "Gift bundle", contents: "Wreath + Velvet Ribbon Trio + premium gift presentation", sum: 185 + 34, pct: 0 },
  { name: "Full Collection", type: "Collector bundle", contents: "All 8 Quiet Hour products", sum: totalSum, pct: 0.16 },
];

const renderProducts = [
  {
    name: "The Quiet Hour Wreath",
    sub: "Hero · 24\" · Half Ring",
    genome: "WGS1|24|half-ring|medium-lush|brass-pine-ivorywax|wax-ranunculus-ivory|magnolia-pod-brass|wax-berry-ivory+velvet-ribbon-burgundy|frosted-pine+frosted-eucalyptus|led-warm-strand|gilded-silence-stillness|winter-holiday|editorial-architectural|top-weighted-half-ring|QH24HR-WRH",
    prompt: `Luxury handcrafted faux botanical wreath, premium artificial silk and polyester florals with brass-dusted sculptural accents, home decor product photography, complete circular grapevine ring base forming a full unbroken 24-inch loop, deep faux pine and frosted artificial eucalyptus covering the full ring with varying density, greenery and floral mass concentrated across the top half from 8 through 12 to 4 o'clock, sparse and quiet across the bottom half from 4 to 8 o'clock with warm grapevine base cleanly exposed, three ivory wax-finish faux ranunculus blooms placed within the dense arc at 11, 1, and 9 o'clock in graduating sizes, three brass-dusted faux magnolia pods anchoring structural weight through the dense arc, scattered ivory wax-finish berry clusters, single burgundy velvet ribbon trailing asymmetrically from 10 o'clock down through the quiet lower arc toward 6 o'clock, integrated warm LED light strand woven subtly through the dense arc with soft warm glow visible, matte wax petal texture and brushed brass sculptural finish clearly premium artificial construction, stems layered and overlapping naturally with full lush coverage and no bare gaps in the dense arc, complete circular ring fully visible, photographed flat against a pale dove-gray painted wall as if hanging on a front door, front-facing camera angle, soft side-lit daylight from upper left, 85mm editorial e-commerce product photography, shallow depth of field --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, flat lay, overhead shot, bird's eye view, tabletop --style raw --s 150 --ar 1:1 --v 7`
  },
  {
    name: "The Quiet Hour Mantel Garland",
    sub: "Premium Anchor · 6ft · Crescent-translated",
    genome: "WGS1|72|crescent-linear|lush|brass-pine-ivorywax|wax-ranunculus-ivory|magnolia-pod-brass|wax-berry-ivory+velvet-ribbon-burgundy-dual|frosted-pine+frosted-eucalyptus|led-warm-strand-full|gilded-silence-cascade|winter-holiday|editorial-architectural|center-weighted-taper|QH72CL-GRL",
    prompt: `Luxury handcrafted faux botanical mantel garland, premium artificial silk and polyester florals with brass-dusted sculptural accents, home decor product photography, complete 6-foot unbroken garland of deep faux pine and frosted artificial eucalyptus with full continuous coverage and no bare sections, density concentrated at the center with natural directional taper toward both trailing ends, five brass-dusted faux magnolia pods and four ivory wax-finish faux ranunculus blooms distributed with heavier concentration at the center loosening gradually toward both ends, scattered ivory wax-finish berry clusters throughout, two burgundy velvet ribbons trailing from each end with natural soft drape, integrated warm LED light strand woven continuously through the full length with soft warm glow visible, matte wax petal texture and brushed brass sculptural finish clearly premium artificial construction, draped naturally along a white painted mantel shelf with soft downward sag at the front edge consistent with natural garland weight and gravity, photographed straight-on at mantel height, soft side-lit daylight from upper left, warm neutral interior background with painted paneled wall, 85mm editorial e-commerce product photography, shallow depth of field --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, flat lay, overhead shot, bird's eye view, tabletop --style raw --s 150 --ar 16:9 --v 7`
  },
];

const condensedRender = [
  { name: "The Quiet Hour Stair Garland", note: "Same material family as the Mantel Garland at lower density. Photograph draped along a staircase handrail, density heaviest at the bottom newel post and tapering upward — directional ascent. Vertical framing, --ar 4:5, camera angled down the stair run." },
  { name: "The Quiet Hour Tablescape Ring", note: "Garden Scatter — even radial bloom distribution, no directional weighting. Photograph from a 3/4 overhead table angle (this is the one product in the collection where an elevated angle is correct, since it's designed to be seen from above on a table) surrounding three ivory pillar candles." },
  { name: "The Quiet Hour Door Topper", note: "Simplified Half Ring at 16\" — single magnolia pod cluster, frosted pine, one LED accent, no ribbon. Same wall-mount front-facing framing as the Hero wreath, --ar 1:1." },
  { name: "The Quiet Hour Candle Ring", note: "Classic Balanced micro scale — one brass pod, one frosted pine sprig, substrate only. Photograph flat-lay is acceptable here since this is a true tabletop accessory, surrounding a single ivory pillar candle." },
  { name: "Velvet Ribbon Trio + Brass Pick Bundle", note: "Flat-lay product photography is correct for both — styled on linen with the wreath's signature burgundy velvet visible as the connecting thread. Standard accent product photography, no faux-rendering concerns since no AI floral generation needed for ribbon." },
];

function copyText(text, setCopied, id) {
  navigator.clipboard.writeText(text).catch(() => {});
  setCopied(id);
  setTimeout(() => setCopied(null), 2200);
}

export default function QuietHourCollection() {
  const [tab, setTab] = useState("foundation");
  const [copied, setCopied] = useState(null);

  const tabs = [
    { id: "foundation", label: "Foundation" },
    { id: "hierarchy", label: "Hierarchy" },
    { id: "continuity", label: "Continuity" },
    { id: "release", label: "Release" },
    { id: "crosssell", label: "Cross-Sell" },
    { id: "merch", label: "Merchandising" },
    { id: "render", label: "Render" },
  ];

  return (
    <>
      <style>{FONTS + CSS}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-eye">Evercrafted · Full Collection Intelligence Package</div>
          <div className="hdr-title serif">The Quiet Hour</div>
          <div className="hdr-sub">Winter Holiday · Gilded Silence · 8-Product Collection System</div>
          <div className="tabs">
            {tabs.map(t => (
              <button key={t.id} className={`tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>
        </div>

        <div className="body">

          {tab === "foundation" && (
            <div>
              <div className="eyebrow">Collection Foundation Profile</div>
              <div className="pull"><p>The hush before the house fills. Not louder decoration for the season's busiest weeks — a held breath of quality, gold without noise, the moment a room feels finished before anyone arrives to see it.</p></div>

              <div className="section-title">Palette Identity</div>
              <div className="swatch-row">
                {palette.map((p, i) => (
                  <div key={i} className="swatch">
                    <div className="swatch-color" style={{background: p.hex}}></div>
                    <div className="swatch-label"><div className="swatch-name">{p.name}</div><div className="swatch-hex">{p.hex}</div></div>
                  </div>
                ))}
              </div>

              <div className="section-title">Foundation Profile</div>
              <div className="profile-grid">
                {foundation.profile.map(([l, v], i) => (
                  <div key={i} className="profile-card"><div className="profile-lbl">{l}</div><div className="profile-val">{v}</div></div>
                ))}
              </div>

              <div className="section-title">Signature Spec Block</div>
              <div className="sig-block">
                {foundation.signature.map(([l, v], i) => (
                  <div key={i} className="sig-row"><div className="sig-lbl">{l}</div><div className="sig-val">{v}</div></div>
                ))}
              </div>
            </div>
          )}

          {tab === "hierarchy" && (
            <div>
              <div className="eyebrow">Collection Hierarchy Map</div>
              <div className="role-grid">
                {hierarchy.map((h, i) => (
                  <div key={i} className="role-card" style={{borderLeftColor: h.color}}>
                    <div className="role-left">
                      <div className="role-tag">{h.role}</div>
                      <div className="role-name">{h.name}</div>
                      <div className="role-meta"><b>{h.form}</b> · {h.formula !== "—" ? h.formula : "no composition formula — accent object"} · {h.scale}<br/>{h.meta}</div>
                    </div>
                    <div className="role-price">${h.price}</div>
                  </div>
                ))}
              </div>

              <div className="price-range-card">
                <div className="pr-item"><div className="pr-lbl">Collection price range</div><div className="pr-val">$26 — $295</div></div>
                <div className="pr-item"><div className="pr-lbl">Center of gravity (weighted avg)</div><div className="pr-val">${avgPrice}</div></div>
                <div className="pr-item"><div className="pr-lbl">Collection sum (all 8)</div><div className="pr-val">${totalSum}</div></div>
              </div>

              <hr className="hr" />
              <div className="eyebrow">Product Expansion Blueprint</div>
              {expansionMap.map(([l, v], i) => (
                <div key={i} className="exp-row"><div className="exp-tag">{l}</div><div className="exp-body">{v}</div></div>
              ))}
            </div>
          )}

          {tab === "continuity" && (
            <div>
              <div className="eyebrow">Emotional Continuity Map</div>

              <div className="thread-card">
                <div className="thread-name">Thread 1 — Atmosphere</div>
                <div className="thread-body">Gilded Silence is immediately recognizable from the Candle Ring to the Mantel Garland — restrained richness, warm metallic accent, absolute stillness. Tested against the system's own standard: shown the Tablescape Ring alone, a buyer who has only seen the Wreath would recognize the same family instantly.</div>
              </div>
              <div className="thread-card">
                <div className="thread-name">Thread 2 — Palette Rhythm</div>
                <div className="thread-body">Aged Brass (dominant warm) → Ivory Wax (bridge tone) → Frost Silver (cool note, used sparingly on the candle ring substrate only). Burgundy Wine never appears without brass nearby — it is always an accent, never a dominant, preventing the collection from reading as a generic red-and-green holiday set.</div>
              </div>
              <div className="thread-card">
                <div className="thread-name">Thread 3 — Movement</div>
                <div className="thread-body">Still is the constant. On ring-form pieces (Wreath, Tablescape Ring, Candle Ring, Door Topper) it expresses as Orbit — contained, circular, no surge. On linear pieces (both garlands) it translates to Cascade + Taper Fade — a slow settling drape, never urgent. No product in the collection carries surging or restless energy.</div>
              </div>
              <div className="thread-card">
                <div className="thread-name">Thread 4 — Texture</div>
                <div className="thread-body">Matte wax-finish bloom + brushed brass + frosted needle, locked across every scale. No high-gloss material is introduced at any product tier — the candle ring's micro scale uses the same matte/brushed register as the mantel garland's full expression.</div>
              </div>

              <hr className="hr" />
              <div className="eyebrow">Product Continuity Audit</div>
              <div className="tbl-wrap">
                <table>
                  <thead><tr><th>Product</th><th>Atmosphere</th><th>Palette</th><th>Movement</th><th>Texture</th></tr></thead>
                  <tbody>
                    {continuityAudit.map((c, i) => (
                      <tr key={i}>
                        <td style={{fontWeight: 500}}>{c.name}</td>
                        <td className="chk ok">✅</td><td className="chk ok">✅</td><td className="chk ok">✅</td><td className="chk ok">✅</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="note"><strong>No unresolved flags.</strong> All four threads hold across all eight products at every scale — clear to advance to release and merchandising.</div>
            </div>
          )}

          {tab === "release" && (
            <div>
              <div className="eyebrow">Seasonal Release Strategy</div>
              <div className="note"><strong>Winter emotional arc:</strong> Preparation (Nov) → Celebration (Dec) → Still Retreat (Jan). Each phase below tracks this arc rather than launching the full collection at once.</div>
              <div className="timeline">
                {releasePhases.map((p, i) => (
                  <div key={i} className="phase-card">
                    <div className="phase-num">{p.n} · {p.timing}</div>
                    <div className="phase-title">{p.title}</div>
                    <div className="phase-meta"><b>Releases:</b> {p.releases}</div>
                    <div className="phase-meta"><b>Purpose:</b> {p.purpose}</div>
                    <div className="phase-meta"><b>Copy framing:</b> {p.copy}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "crosssell" && (
            <div>
              <div className="eyebrow">Room-Level Completion Systems</div>
              {crossSellSystems.map((s, i) => (
                <div key={i} className="system-card">
                  <div className="system-name">{s.name}</div>
                  <div className="system-flow">{s.flow}</div>
                </div>
              ))}

              <hr className="hr" />
              <div className="eyebrow">Bundle Architecture</div>
              <div className="bundle-grid">
                {bundles.map((b, i) => {
                  const final = Math.round(b.sum * (1 - b.pct));
                  const save = b.sum - final;
                  return (
                    <div key={i} className="bundle-card">
                      <div className="bundle-name">{b.name}</div>
                      <div className="bundle-type">{b.type}</div>
                      <div className="bundle-contents">{b.contents}</div>
                      <div className="bundle-price-row">
                        {b.pct > 0 && <span className="bundle-sum">${b.sum}</span>}
                        <span className="bundle-final">${final}</span>
                      </div>
                      {b.pct > 0 ? <div className="bundle-save">Save ${save} ({Math.round(b.pct*100)}%)</div> : <div className="bundle-save">Premium presentation, no discount</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "merch" && (
            <div>
              <div className="eyebrow">Visual Merchandising Plan</div>

              <div className="merch-block">
                <div className="merch-title">Collection hero shot</div>
                <div className="merch-body">All eight products styled together in one scene — the establishing image. Premium Anchor (Mantel Garland) prominent across the back plane, Hero Wreath centered, Gateway and Atmospheric Filler recessive at the edges. Background and lighting consistent with the Faux Floral Render Engine direction for Gilded Silence: soft side-lit daylight, dove-gray and warm neutral surfaces, no overhead light competing with the integrated LED glow.</div>
              </div>
              <div className="merch-block">
                <div className="merch-title">Product family groupings</div>
                <div className="merch-body">Mantel system and entry system each photographed as room-completion shots, not isolated product shots — this activates the room-completion psychology described in the Cross-Sell Architecture. A vignette frame (one furniture surface, the garland as wall/mantel decor, one or two matched candle pairs, two to three accent objects, odd total count) keeps each staged shot from reading as cluttered.</div>
              </div>
              <div className="merch-block">
                <div className="merch-title">Individual product shots</div>
                <div className="merch-body">Consistent dove-gray wall background and consistent side-lit daylight across every individual shot — this consistency is the collection signal. Varying backgrounds between products breaks the Gilded Silence continuity faster than any palette mismatch would.</div>
              </div>
              <div className="merch-block">
                <div className="merch-title">Detail shots</div>
                <div className="merch-body">Close-up macro on the brass-dusted magnolia pod and the wax-finish ranunculus for the Wreath and Mantel Garland — confirms the dominant texture signature (brushed brass, matte wax) is consistent and visible at full resolution.</div>
              </div>

              <hr className="hr" />
              <div className="eyebrow">Shop Front Flow</div>
              <ol className="flow-list">
                <li>Premium Anchor (Mantel Garland) positioned first — establishes the value ceiling.</li>
                <li>Hero (Wreath) second — drives the emotional narrative, most-clicked thumbnail.</li>
                <li>Supporting products follow in scale graduation — Stair Garland, then Tablescape Ring.</li>
                <li>Gateway (Door Topper) positioned later in sequence but cross-linked directly from the Premium Anchor's product description.</li>
                <li>Atmospheric Filler and both Accents close the sequence — the impulse-add tier.</li>
                <li>Collection cohesion statement in the shop banner: one line naming Gilded Silence as the season's atmosphere, not a generic "Holiday Collection" header.</li>
              </ol>

              <div className="eyebrow">Display Grouping Principles</div>
              <div className="note">Group in 3s or 5s — never 2 or 4, which read as static and lower-energy. Never place two products of identical scale adjacent to each other. In any grouping of three, the middle position is the focal — that's where the Wreath or Mantel Garland goes, never an accent.</div>
            </div>
          )}

          {tab === "render" && (
            <div>
              <div className="eyebrow">MJ V7 Render Direction</div>
              <div className="note"><strong>Faux rendering rule applied throughout:</strong> material identity opens every prompt, materials are explicitly named (silk, polyester, wax-finish, brass-dusted), complete ring/garland structure is stated, wall-mount or mantel-drape framing replaces flat lay, lights are included per standing wreath/garland construction rule, and every prompt closes with the --no exclusion block.</div>

              {renderProducts.map((r, i) => (
                <div key={i} style={{marginBottom: 30}}>
                  <div className="render-product-hdr">{r.name}</div>
                  <div className="render-product-sub">{r.sub}</div>
                  <div className="genome"><div className="genome-lbl">WGS Genome String</div><div className="genome-str">{r.genome}</div></div>
                  <div className="prompt-block">
                    <div className="prompt-hdr">
                      <span className="prompt-lbl">Ready-to-paste MJ V7 prompt</span>
                      <button className={`copy-btn${copied === `r${i}` ? " ok" : ""}`} onClick={() => copyText(r.prompt, setCopied, `r${i}`)}>
                        {copied === `r${i}` ? "Copied ✓" : "Copy"}
                      </button>
                    </div>
                    <div className="prompt-txt">{r.prompt}</div>
                  </div>
                </div>
              ))}

              <hr className="hr" />
              <div className="eyebrow">Remaining products — photography direction</div>
              {condensedRender.map((c, i) => (
                <div key={i} className="condensed-card">
                  <div className="condensed-name">{c.name}</div>
                  <div className="condensed-note">{c.note}</div>
                </div>
              ))}
              <div className="note" style={{marginTop: 16}}><strong>Want full ready-to-paste prompts or the multi-phase oref stack for any of these?</strong> Say which product and I'll build it out the same way as the Wreath and Mantel Garland above — or with the full stock-photo oref pipeline if you want SKU-accurate florals.</div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
