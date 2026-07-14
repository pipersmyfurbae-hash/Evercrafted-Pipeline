import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'DM Sans',sans-serif; background:#FAF8F3; color:#1A1814; min-height:100vh; }
.app { display:flex; flex-direction:column; min-height:100vh; }

/* HEADER */
.hdr { padding:24px 32px 0; border-bottom:1px solid #E4DDD2; background:#FAF8F3; flex-shrink:0; }
.hdr-eye { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:#8A7142; margin-bottom:6px; }
.hdr-title { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:500; margin-bottom:18px; }

/* PRODUCT TABS */
.tab-rail { display:flex; overflow-x:auto; scrollbar-width:none; gap:0; }
.tab-rail::-webkit-scrollbar { display:none; }
.prod-tab { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.1em; text-transform:uppercase; padding:10px 14px; background:none; border:none; border-bottom:2px solid transparent; cursor:pointer; color:#8A7142; white-space:nowrap; transition:all .2s; }
.prod-tab:hover { color:#1A1814; }
.prod-tab.active { color:#C4963A; border-bottom-color:#C4963A; }

/* MAIN LAYOUT */
.main { flex:1; display:flex; overflow:hidden; }
.panel { flex:1; overflow-y:auto; padding:32px 36px; max-width:900px; }

/* PRODUCT HEADER */
.prod-hdr { margin-bottom:24px; }
.prod-role-row { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
.role-badge { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.12em; text-transform:uppercase; padding:3px 8px; border-radius:2px; border:.5px solid; }
.rb-hero { background:#FDF1E0; border-color:#C4963A; color:#7A5A18; }
.rb-anchor { background:#E8F0E8; border-color:#3D6B4A; color:#1A3A1A; }
.rb-supporting { background:#EEE8F5; border-color:#7A5A8A; color:#3A1A5A; }
.rb-gateway { background:#F5EEE8; border-color:#8A6A4A; color:#3A2A18; }
.rb-filler { background:#E8F0EE; border-color:#4A8A7A; color:#1A3A32; }
.rb-accent { background:#F0EEE8; border-color:#8A7A5A; color:#3A3018; }
.rb-photo { background:#F0E8F5; border-color:#7A5A8A; color:#3A1A5A; }
.prod-name { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:500; line-height:1.1; margin-bottom:3px; }
.prod-form { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:#8A7142; }

.approach { font-size:13px; color:#5A4F3E; line-height:1.7; margin-bottom:22px; }
.source-flag { background:#FDF1E0; border:.5px solid #C4963A; border-radius:4px; padding:10px 14px; margin-bottom:22px; font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.1em; text-transform:uppercase; color:#8A5A18; }

/* INFO CARDS */
.info-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px; }
.info-card { background:#fff; border:.5px solid #E4DDD2; border-radius:4px; padding:14px 16px; }
.info-lbl { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.16em; text-transform:uppercase; color:#8A7142; margin-bottom:6px; }
.info-body { font-size:12px; color:#5A4F3E; line-height:1.65; }
.info-body b { color:#1A1814; font-weight:500; }

/* PHASE STACK */
.eyebrow { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:#8A7142; margin-bottom:16px; }
.phase-item { margin-bottom:24px; }
.phase-hdr { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.phase-num { font-family:'DM Mono',monospace; font-size:11px; font-weight:500; color:#C4963A; }
.phase-title { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:#1A1814; flex:1; }
.type-badge { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.1em; text-transform:uppercase; padding:3px 8px; border-radius:2px; border:.5px solid; }
.tb-text { background:#E8F0E8; border-color:#3D6B4A; color:#1A3A1A; }
.tb-oref { background:#EEE8F5; border-color:#7A5A8A; color:#3A1A5A; }
.tb-sref { background:#E8EEF5; border-color:#4A6A8A; color:#1A2A3A; }
.tb-photo { background:#F5EEE8; border-color:#8A6A4A; color:#3A2A18; }
.tb-text-only { background:#E8F0E8; border-color:#3D6B4A; color:#1A3A1A; }

/* SLOT GUIDE */
.slot-guide { background:#F3EEE5; border:.5px solid #E4DDD2; border-radius:4px; padding:12px 16px; margin-bottom:10px; }
.slot-row { display:flex; gap:12px; padding:4px 0; }
.slot-row:not(:last-child) { border-bottom:.5px solid #E4DDD2; }
.slot-lbl { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.1em; text-transform:uppercase; color:#8A7142; min-width:110px; flex-shrink:0; padding-top:1px; }
.slot-val { font-size:11.5px; color:#3A3020; line-height:1.5; }
.slot-val.none { color:#C4B898; font-style:italic; }
.slot-val.param { font-family:'DM Mono',monospace; font-size:10px; color:#C4963A; }

/* PROMPT BLOCK */
.prompt-wrap { background:#1A1814; border-radius:4px; overflow:hidden; margin-bottom:4px; }
.prompt-hdr { display:flex; align-items:center; justify-content:space-between; padding:9px 14px; border-bottom:.5px solid #2A2420; }
.prompt-lbl { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.1em; text-transform:uppercase; color:#7A6A50; }
.copy-btn { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.08em; text-transform:uppercase; padding:4px 10px; background:none; border:.5px solid #3A3020; color:#7A6A50; cursor:pointer; border-radius:2px; transition:all .18s; }
.copy-btn:hover { border-color:#C4963A; color:#C4963A; }
.copy-btn.ok { border-color:#C4963A; color:#C4963A; }
.prompt-txt { font-family:'DM Mono',monospace; font-size:10.5px; color:#C8BAA0; padding:14px; line-height:1.75; white-space:pre-wrap; word-break:break-word; }

/* PHOTO DIRECTION */
.photo-card { background:#fff; border:.5px solid #E4DDD2; border-radius:4px; padding:20px 22px; margin-bottom:20px; }
.photo-title { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:600; color:#C4963A; margin-bottom:8px; }
.photo-body { font-size:13px; color:#5A4F3E; line-height:1.7; }
.no-gen-flag { background:#E8F0EE; border:.5px solid #4A8A7A; border-radius:4px; padding:10px 14px; margin-bottom:20px; font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.1em; text-transform:uppercase; color:#1A3A32; }

.hr { border:none; border-top:.5px solid #E4DDD2; margin:22px 0; }
@media(max-width:640px) {
  .panel { padding:20px 18px; }
  .info-row { grid-template-columns:1fr; }
  .hdr { padding:18px 18px 0; }
}
`;

const PRODUCTS = [
  {
    num: 0, short: "Step 0", name: "Material Study Cascade",
    role: "Run This First", roleClass: "rb-hero", form: '26-30" Asymmetric Cascade',
    isStep0: true,
    approach: "Generate this before any product render runs. This single image becomes your oref at --ow 180 for all eight products. The ranunculus in your wreath, garland, and tablescape ring will all share the same fidelity because they all referenced the same source. Doubles as a kit product image for Etsy and Moodoor. One render, two purposes. Save the seed immediately.",
    camera: "Front-facing 3/4 view. Pale gray seamless background. --s 30 is intentional — keeps it clinical, not beautiful. Every material needs to be individually readable. --ar 2:3 portrait gives the cascade room.",
    watchOuts: [
      "Do not raise --s above 30. Higher stylize makes it look editorial but obscures individual material legibility. Readable beats beautiful here.",
      "Save the seed. This image controls material fidelity across the entire collection. Add it to Notes and Seeds in the app alongside the Hero Wreath seed.",
      "Use --ow 180 when this image is in the oref slot. At 380 MJ tries to copy the cascade shape. At 180 it reads materials only.",
      "If any material disappears or merges into the mass, re-run and name that element explicitly with count: five ivory wax-finish ranunculus blooms clearly individually visible, each stem separated and readable."
    ],
    phases: [
      { label: "Material Study Cascade — Single Generation",
        type: "text", typeLbl: "TEXT ONLY · --s 20", typeClass: "tb-text",
        slots: [
          ["Image Prompt", null],
          ["Omni Reference", null],
          ["Style Reference", null],
          ["Parameters", "--style raw --s 20 --ar 2:3 --v 7 · Save seed immediately"],
        ],
        prompt: "Faux botanical material study, flat-lay product catalog photograph showing all six collection materials simultaneously, each material in its own distinct zone with clear negative space between zones, no single material dominating the frame — MATERIAL 1: five ivory wax-finish silk ranunculus blooms 4 to 5 inches across, fully open, 40 to 60 paper-thin concentric petals in tight spiral rings with flat open center, distinctly NOT roses NOT peonies NOT garden roses — MATERIAL 2: three faux eucalyptus pod spray branches (98898.GR) each showing 8 to 12 small sage-green rounded pods clustered on arching wire stems, matte sage-green pod surface — MATERIAL 3: three deep burgundy faux berry stems (95482.BU) with tight clusters of small round matte deep burgundy berries — MATERIAL 4: deep dark green artificial frosted pine sprays showing individual needle strands with silver-white frost on needle tips only, warm deep green base, NOT blue NOT gray — MATERIAL 5: frosted artificial eucalyptus leaf sprays with matte silver-sage finish — MATERIAL 6: deep burgundy wine velvet ribbon showing rich velvet pile and two generous loops with a trailing tail — all six materials shown at full length, all stems visible from tip to cut end, camera positioned 24 inches back showing complete arrangement, no cropping, no macro, pure pale neutral gray seamless paper background not white not cream not dark, flat even studio lighting from directly above with no dramatic shadows no vignette, premium artificial polyester and silk construction clearly visible throughout, e-commerce product catalog photograph --style raw --s 20 --ar 2:3 --v 7 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, macro photography, close-up, cropped, single flower focus, roses, peonies, garden roses, gold pods, brass pods, gold balls, ornaments, jingle bells, blue pine, gray pine, illustrated, painted, wreath form, circular, bouquet, florist, dramatic lighting, shadows, dark corners, vignette, dark background, moody, lifestyle, textured background"
      }
    ]
  },
  {
    num: 1, short: "Hero", name: "The Quiet Hour Wreath",
    role: "Hero", roleClass: "rb-hero", form: '24" Half Ring',
    isSource: true,
    approach: "This is your DNA source. Build it first and don't move on until you have a render you're happy with — every other product will reference this one for style and material consistency. Four phases: greenery base, primary focal oref, structural secondary oref, then a filler and ribbon density pass.",
    camera: "Front-facing wall-mount. Pale gray painted wall. Flat against the wall as if hanging on a door. Soft daylight from upper left. --ar 1:1",
    watchOuts: [
      "The LED strand should glow warm but subtly — if it's reading as Christmas lights rather than soft ambient warmth, lower --s slightly.",
      "The ribbon trails asymmetrically from 10 o'clock downward through the quiet arc — if MJ places it symmetrically or wraps it around the ring, describe it more explicitly as a single trailing drape.",
      "Don't advance to Phase 3 until the Phase 2 ranunculus reads as wax-finish and clearly artificial — re-run Phase 2 if needed before moving forward."
    ],
    phases: [
      {
        label: "Green Base",
        type: "text", typeLbl: "TEXT ONLY", typeClass: "tb-text",
        slots: [
          ["Image Prompt", null],
          ["Omni Reference", null],
          ["Style Reference", null],
          ["Parameters", "Text only — no image slots, no --iw"],
        ],
        prompt: `Luxury handcrafted faux botanical wreath, premium artificial silk and polyester greenery, home decor product photography, complete circular grapevine ring base forming a full unbroken 24-inch loop, deep artificial frosted pine and frosted faux eucalyptus covering the full ring with varying density, greenery concentrated across the top half from 8 through 12 to 4 o'clock and sparse from 4 to 8 o'clock with warm grapevine base cleanly exposed from 5 to 7 o'clock, artificial pine boughs with frosted needle tips, semi-gloss polyester eucalyptus leaves, clockwise directional sweep throughout, integrated warm LED light strand woven through the dense upper arc with soft warm glow visible, complete circular ring fully visible, photographed flat against a pale gray painted wall as if hanging on a front door, front-facing camera angle, soft studio daylight from upper left, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, flat lay, overhead shot, bird's eye view --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        label: "Ivory Wax Ranunculus",
        type: "oref", typeLbl: "OREF", typeClass: "tb-oref",
        slots: [
          ["Image Prompt", "Phase 1 output · --iw 2.0"],
          ["Omni Reference", "Ivory wax-finish ranunculus stock photo · --ow 380"],
          ["Style Reference", null],
          ["Parameters", "--iw 2.0  --ow 380"],
        ],
        prompt: `[PHASE-1-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular grapevine ring, frosted pine and eucalyptus upper arc established, now adding three ivory wax-finish faux ranunculus blooms in the dense upper arc in graduating sizes, primary fully open at 11 o'clock facing forward, secondary mid-open at 9 o'clock angled slightly inward, tertiary smaller at 1 o'clock, matte wax-finish petal texture and silk construction clearly visible, LED strand warm glow throughout dense arc, complete circular ring visible, lower arc sparse from 5 to 7 with warm grapevine exposed, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial e-commerce product photography --iw 2.0 --oref [RANUNCULUS-IVORY-URL] --ow 380 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        label: "Eucalyptus Pod Sprays + Berry Stems",
        type: "oref", typeLbl: "OREF", typeClass: "tb-oref",
        slots: [
          ["Image Prompt", "Phase 2 output · --iw 2.5"],
          ["Omni Reference", "Eucalyptus pod spray stock photo (98898.GR) · --ow 260"],
          ["Style Reference", null],
          ["Parameters", "--iw 2.5  --ow 260"],
        ],
        prompt: `[PHASE-2-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular ring, ivory ranunculus trio established at 11, 9, and 1, now adding three faux eucalyptus pod sprays anchoring structural weight at 10, 12, and 2 o'clock, pods showing elongated sage-green artificial pod clusters, subordinate in scale to ranunculus but commanding in surface texture, deep burgundy faux berry stems tucked at base of each pod cluster for color accent, warm LED glow throughout, complete ring visible, lower arc from 5 to 7 clear, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial product photography --iw 2.5 --oref [EUCALYPTUS-POD-URL] --ow 260 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
      {
        label: "Filler + Ribbon Density Pass",
        type: "text", typeLbl: "TEXT ONLY", typeClass: "tb-text",
        slots: [
          ["Image Prompt", "Phase 3 output · --iw 3.0"],
          ["Omni Reference", null],
          ["Style Reference", null],
          ["Parameters", "--iw 3.0 · No oref — protect accumulated render"],
        ],
        prompt: `[PHASE-3-OUTPUT-URL] Luxury handcrafted faux botanical wreath, premium artificial florals and accents, home decor product photography, complete 24-inch circular ring, ivory ranunculus and eucalyptus pod sprays established, now filling with additional scattered deep burgundy faux berry stems through the dense upper arc, single burgundy velvet ribbon trailing asymmetrically from 10 o'clock down through the quiet lower arc toward 6, ribbon draping naturally with visible velvet texture and soft weight, stems layered and overlapping naturally within the floral arc, full lush coverage from 8 to 4 o'clock with no bare gaps, quiet lower arc remains clear from 5 to 7 with warm grapevine exposed, warm LED strand glowing softly throughout, complete circular ring fully visible, photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial e-commerce product photography --iw 3.0 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, bird's eye view --style raw --s 150 --ar 1:1 --v 7`
      },
    ]
  },
  {
    num: 2, short: "Garland", name: "The Quiet Hour Mantel Garland",
    role: "Premium Anchor", roleClass: "rb-anchor", form: '6ft Linear · Center-weighted',
    approach: "Linear form — no ring language anywhere in the prompt. The Hero Wreath render goes in the --sref slot (not Image Prompt) to transfer palette and material quality without forcing a circular shape. The Mantel Garland render will later become the Image Prompt source for the Stair Garland.",
    camera: "Straight-on at mantel height. White painted mantel shelf. Natural front sag and drape. Warm neutral interior wall behind. --ar 16:9",
    watchOuts: [
      "If MJ tries to form a ring or arch shape, your prompt still has ring language — search for 'loop', 'ring', 'circular' and remove them all.",
      "--sref pulls color and material but not form. If the garland is starting to look too much like the wreath render, lower --sw from 300 to 150.",
      "The drape should sag naturally at the front edge of the shelf. If it renders as a flat horizontal line, add: 'natural downward drape with visible front sag consistent with garland weight and gravity.'"
    ],
    phases: [
      {
        label: "Garland Base",
        type: "text", typeLbl: "TEXT ONLY", typeClass: "tb-text",
        slots: [
          ["Image Prompt", null],
          ["Omni Reference", null],
          ["Style Reference", null],
          ["Parameters", "Text only — no image slots"],
        ],
        prompt: `Luxury handcrafted faux botanical mantel garland, premium artificial silk and polyester greenery, home decor product photography, complete 6-foot unbroken linear garland of deep artificial frosted pine and frosted faux eucalyptus with full continuous coverage and no bare sections throughout the full length, greenery density concentrated at the center and tapering naturally toward both trailing ends, integrated warm LED light strand woven continuously through the full length with soft warm glow throughout, artificial pine boughs with frosted needle tips, natural downward drape consistent with garland weight and gravity with visible front sag, draped along a white painted mantel shelf, photographed straight-on at mantel height, soft studio daylight from upper left, warm neutral interior background, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, flat lay, overhead shot --style raw --s 100 --ar 16:9 --v 7`
      },
      {
        label: "Ivory Ranunculus + Hero Style",
        type: "oref", typeLbl: "OREF + SREF", typeClass: "tb-oref",
        slots: [
          ["Image Prompt", "Phase 1 output · --iw 2.0"],
          ["Omni Reference", "Ivory ranunculus stock photo · --ow 350"],
          ["Style Reference", "Hero Wreath render · --sw 300"],
          ["Parameters", "--iw 2.0  --ow 350  --sref [HERO] --sw 300"],
        ],
        prompt: `[PHASE-1-GARLAND-URL] Luxury handcrafted faux botanical mantel garland, premium artificial silk florals, home decor product photography, complete 6-foot linear garland, frosted pine and eucalyptus base established, now adding five ivory wax-finish faux ranunculus blooms with three at center and one at each quarter point along the length, sizes graduating from fully open at center to smaller toward trailing ends, matte wax-finish artificial petal texture visible, LED strand warm glow continuous throughout, two burgundy velvet ribbons trailing from each end with natural soft drape, natural sag and gravity along mantel shelf, photographed straight-on at mantel height, soft studio daylight upper left, warm neutral background, 85mm editorial product photography --iw 2.0 --oref [RANUNCULUS-IVORY-URL] --ow 350 --sref [HERO-WREATH-RENDER-URL] --sw 300 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 16:9 --v 7`
      },
      {
        label: "Brass Pods + Filler Density Pass",
        type: "oref", typeLbl: "OREF + SREF", typeClass: "tb-oref",
        slots: [
          ["Image Prompt", "Phase 2 output · --iw 2.5"],
          ["Omni Reference", "Eucalyptus pod spray stock photo (98898.GR) · --ow 220"],
          ["Style Reference", "Hero Wreath render · --sw 300"],
          ["Parameters", "--iw 2.5  --ow 220  --sref [HERO] --sw 300"],
        ],
        prompt: `[PHASE-2-GARLAND-URL] Luxury handcrafted faux botanical mantel garland, premium artificial silk florals, home decor product photography, complete 6-foot linear garland, ivory ranunculus distribution established, now adding four faux eucalyptus pod sprays anchored at center cluster and at quarter points with deep burgundy faux berry stems tucked at each cluster for color accent, stems fully layered and overlapping naturally throughout, complete linear coverage with no bare sections, warm LED glow throughout, dual burgundy velvet ribbon trails at each end draping naturally downward, natural mantel sag and gravity, photographed straight-on at mantel height, soft studio daylight upper left, 85mm editorial product photography --iw 2.5 --oref [EUCALYPTUS-POD-URL] --ow 220 --sref [HERO-WREATH-RENDER-URL] --sw 300 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 16:9 --v 7`
      },
    ]
  },
  {
    num: 3, short: "Stair", name: "The Quiet Hour Stair Garland",
    role: "Supporting", roleClass: "rb-supporting", form: '9ft Linear · Directional Ascent',
    approach: "Your Mantel Garland render goes in the Image Prompt slot — same linear form, different directionality. The Hero Wreath render stays in --sref for style continuity. The key design idea here is directional ascent: heaviest at the newel post base, tapering lighter up the rail.",
    camera: "Camera angled looking down the stair run. The garland ascends in the frame. Newel post at base of frame, rail rising upward. --ar 4:5 for vertical framing.",
    watchOuts: [
      "If MJ gives you a garland floating in space rather than draped on a rail, add: 'white painted staircase handrail clearly visible beneath the garland, newel post at the base of the frame.'",
      "Keep --iw at 1.5 (not 2.0+) — you want the linear DNA from the Mantel Garland but you need room for the camera angle and directional shift.",
      "The taper is critical — if density looks even throughout the length, add: 'density heaviest at the newel post base and visibly lighter progressively toward the upper rail end.'"
    ],
    phases: [
      {
        label: "Stair Garland",
        type: "oref", typeLbl: "OREF + SREF", typeClass: "tb-oref",
        slots: [
          ["Image Prompt", "Mantel Garland render · --iw 1.5"],
          ["Omni Reference", "Ivory ranunculus stock photo · --ow 300"],
          ["Style Reference", "Hero Wreath render · --sw 250"],
          ["Parameters", "--iw 1.5  --ow 300  --sref [HERO] --sw 250"],
        ],
        prompt: `[MANTEL-GARLAND-RENDER-URL] Luxury handcrafted faux botanical stair garland, premium artificial silk florals, home decor product photography, complete 9-foot linear garland along a staircase handrail, greenery density heaviest at the newel post base end and tapering progressively lighter up the full rail length, ivory wax-finish faux ranunculus blooms clustered heaviest at the newel post base with three blooms there and tapering to one smaller bloom near the upper end, faux eucalyptus pod sprays at the base cluster with deep burgundy berry stems for accent, additional burgundy berry stems through the mid-length, matte silk petal texture visible, LED strand warm glow throughout, white painted staircase handrail visible beneath the garland with newel post at base, photographed from a camera angle looking down the stair run showing ascending directional drape, soft studio daylight upper left, 85mm editorial product photography --iw 1.5 --oref [RANUNCULUS-IVORY-URL] --ow 300 --sref [HERO-WREATH-RENDER-URL] --sw 250 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead --style raw --s 150 --ar 4:5 --v 7`
      },
    ]
  },
  {
    num: 4, short: "Table", name: "The Quiet Hour Tablescape Ring",
    role: "Supporting", roleClass: "rb-supporting", form: '14" Ring · Garden Scatter · 360°',
    approach: "The only product in the collection where overhead angle is correct — this sits on a table and is designed to be seen from above. Garden Scatter formula means no directional weighting: blooms go evenly around the full 360°. The Hero Wreath render goes in the Image Prompt slot (shared circular form) but at moderate --iw since the formula and camera are different.",
    camera: "3/4 overhead angle on a white linen table surface. Three ivory pillar candles at center. Slight perspective — not fully bird's eye, but clearly from above and to one side. --ar 1:1",
    watchOuts: [
      "Do NOT add '--no flat lay, overhead shot' to this product's prompt — overhead is the correct and intentional angle here.",
      "If candles end up sitting on or in the ring (Advent wreath style), add to --no: 'candles on ring, candles in greenery, advent wreath.' Key phrase to reinforce: 'standing on the table surface inside the open center hole of the ring, ring encircling them like a collar, not embedded in the ring.'",
      "Garden Scatter means no dominant focal. If MJ puts all the ranunculus at one side, describe: 'four ranunculus blooms evenly distributed at 12, 3, 6, and 9 o'clock positions.'"
    ],
    phases: [
      {
        label: "Ring Base",
        type: "text", typeLbl: "TEXT ONLY", typeClass: "tb-text",
        slots: [
          ["Image Prompt", null],
          ["Omni Reference", null],
          ["Style Reference", null],
          ["Parameters", "Text only — no image slots"],
        ],
        prompt: `Luxury handcrafted faux botanical centerpiece ring, premium artificial polyester and silk greenery, home decor product photography, complete circular grapevine ring base forming a full unbroken 14-inch loop, deep artificial frosted pine and frosted faux eucalyptus covering the full ring with even radial coverage distributed symmetrically around 360 degrees with no directional weighting in any clock position, integrated warm LED light strand woven through the ring with soft warm glow visible, ring lying flat on a white linen table surface with its center hole open, three ivory pillar candles of three different graduated heights standing upright on the table surface inside the open center hole of the ring, candles taller than the ring height so they rise visibly above the greenery, ring encircling the candles like a wreath collar with the candles clearly separate and inside the hole not on top of the ring, photographed from a 3/4 overhead angle showing the full ring and candles from above and slightly to the front, soft studio daylight from upper left, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, candles on the ring, candles embedded in greenery, advent wreath --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        label: "Radial Florals + Hero Style",
        type: "oref", typeLbl: "OREF + SREF", typeClass: "tb-oref",
        slots: [
          ["Image Prompt", "Phase 1 output · --iw 2.0"],
          ["Omni Reference", "Ivory ranunculus stock photo · --ow 300"],
          ["Style Reference", "Hero Wreath render · --sw 200"],
          ["Parameters", "--iw 2.0  --ow 300  --sref [HERO] --sw 200"],
        ],
        prompt: `[PHASE-1-TABLE-URL] Luxury handcrafted faux botanical centerpiece ring, premium artificial silk florals, home decor product photography, complete 14-inch circular ring lying flat on white linen with its center hole open and unobstructed, frosted pine and eucalyptus radial base established, now adding four ivory wax-finish faux ranunculus blooms distributed evenly at 12, 3, 6, and 9 o'clock positions on the ring itself, slightly graduated sizes for gentle visual interest but no single dominant focal point, one faux eucalyptus pod spray at 12 o'clock as a structural accent with a small deep burgundy berry stem cluster beside it, additional burgundy berry stems scattered through the arc, LED strand warm glow around the full ring, three ivory pillar candles of three different graduated heights standing upright on the table surface inside the open center hole of the ring with the ring encircling them like a collar, tallest candle at back center shortest at front, candles rising clearly above the ring height and visibly separate from the greenery, not embedded in the ring, not on top of the ring, photographed 3/4 overhead on white linen, soft studio daylight upper left, 85mm editorial product photography --iw 2.0 --oref [RANUNCULUS-IVORY-URL] --ow 300 --sref [HERO-WREATH-RENDER-URL] --sw 200 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, candles on ring, candles in greenery, advent wreath, four candles --style raw --s 150 --ar 1:1 --v 7`
      },
    ]
  },
  {
    num: 5, short: "Topper", name: "The Quiet Hour Door Topper",
    role: "Gateway", roleClass: "rb-gateway", form: '16" Half-Ring Arch',
    approach: "Half-ring arch form — an open arch with a flat bottom edge, not a full circle. Use your Phase 1 arch base as the Image Prompt (not the Hero Wreath, which is circular and would fight against the arch form). Use the Hero as --sref for style continuity only. Simplified composition: one cluster at the peak, two phases maximum.",
    camera: "Front-facing wall-mount. Same pale gray wall as the Hero. The arch silhouette should read cleanly. --ar 1:1",
    watchOuts: [
      "If the Hero Wreath is in the Image Prompt slot at high --iw, MJ will try to complete the ring. Keep it in --sref only.",
      "The composition is intentionally simpler than the Hero — one cluster at the arch peak, not three. If MJ adds florals along the full arch, simplify the prompt: 'all florals clustered at the peak at 12 o'clock, arch arms clear.'",
      "No velvet ribbon on this product — it's the Gateway (entry price point). Keep it cleaner and simpler."
    ],
    phases: [
      {
        label: "Arch Base",
        type: "text", typeLbl: "TEXT ONLY", typeClass: "tb-text",
        slots: [
          ["Image Prompt", null],
          ["Omni Reference", null],
          ["Style Reference", null],
          ["Parameters", "Text only — no image slots"],
        ],
        prompt: `Luxury handcrafted faux botanical half-wreath door topper, premium artificial polyester and silk greenery, home decor product photography, 16-inch half-ring arch form with an open flat bottom edge and full arched upper structure, deep artificial frosted pine and frosted faux eucalyptus forming the full arch from end to end with complete coverage, integrated warm LED light strand woven through the arch with soft warm glow visible, half-ring arch photographed flat against a pale gray painted wall as a door decoration, front-facing camera angle showing the arch silhouette cleanly, soft studio daylight from upper left, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, flat lay, overhead shot --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        label: "Simplified Focal Cluster",
        type: "oref", typeLbl: "OREF + SREF", typeClass: "tb-oref",
        slots: [
          ["Image Prompt", "Phase 1 arch base · --iw 2.0"],
          ["Omni Reference", "Ivory ranunculus stock photo · --ow 320"],
          ["Style Reference", "Hero Wreath render · --sw 250"],
          ["Parameters", "--iw 2.0  --ow 320  --sref [HERO] --sw 250"],
        ],
        prompt: `[PHASE-1-TOPPER-URL] Luxury handcrafted faux botanical half-wreath door topper, premium artificial silk florals, home decor product photography, 16-inch half-ring arch form, frosted pine and eucalyptus arch base established, now adding two ivory wax-finish faux ranunculus blooms and one faux eucalyptus pod spray with a small deep burgundy berry cluster all grouped at the peak of the arch at 12 o'clock, simpler and more restrained composition than the full Hero Wreath, arch arms clear on both sides, matte wax-finish petal texture visible, single warm LED accent at the cluster visible, half-ring photographed flat against pale gray wall front-facing, soft studio daylight upper left, 85mm editorial product photography --iw 2.0 --oref [RANUNCULUS-IVORY-URL] --ow 320 --sref [HERO-WREATH-RENDER-URL] --sw 250 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot --style raw --s 150 --ar 1:1 --v 7`
      },
    ]
  },
  {
    num: 6, short: "Candle", name: "The Quiet Hour Candle Ring",
    role: "Atmospheric Filler", roleClass: "rb-filler", form: '5" Ring · Micro Scale',
    approach: "One dominant accent, one secondary, substrate only. At 5 inches MJ can render this correctly from text alone — no oref needed. Use --sref at low weight (sw 150) just to pull the pale gold and ivory material language from the Hero. This is the one product in the collection where a flat-lay angle is correct — it lives on a table.",
    camera: "3/4 overhead flat-lay on warm linen surface. Single ivory pillar candle at center. Tabletop context — not wall-mounted. --ar 1:1",
    watchOuts: [
      "No LED strand at this scale — it's too small. Remove all LED language from the prompt.",
      "If the ring renders too large or elaborate, add: 'small, minimal, and architecturally restrained — no more than one dominant accent and one secondary sprig.'",
      "The flat-lay angle is intentional here and correct. Do NOT add '--no flat lay' to this product."
    ],
    phases: [
      {
        label: "Candle Ring — Single Phase",
        type: "text", typeLbl: "TEXT + SREF", typeClass: "tb-text",
        slots: [
          ["Image Prompt", null],
          ["Omni Reference", null],
          ["Style Reference", "Hero Wreath render · --sw 150"],
          ["Parameters", "--sref [HERO] --sw 150 · No oref, no --iw"],
        ],
        prompt: `Luxury handcrafted faux botanical candle ring, premium artificial polyester and wire construction, home decor product photography, 5-inch circular ring of frost-silver artificial foliage and compact frosted artificial pine substrate with full ring coverage, one faux eucalyptus pod spray cluster (98898.GR) with elongated sage-green artificial pods as the single dominant accent positioned at 12 o'clock, two deep burgundy faux berry stems (95482.BU) with small clustered matte round berries at 9 o'clock as secondary, minimal and architecturally restrained, no LED strand at this scale, ring flat-lay styled on a warm ivory linen surface surrounding a single ivory pillar candle at center, photographed from a 3/4 overhead angle showing the full ring and candle, soft studio daylight from upper left, 85mm editorial e-commerce product photography --sref [HERO-WREATH-RENDER-URL] --sw 150 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, round pods, gold balls, ornaments, brass pods, magnolia pods --style raw --s 100 --ar 1:1 --v 7`
      },
    ]
  },
  {
    num: 7, short: "Ribbon", name: "The Quiet Hour Velvet Ribbon Trio",
    role: "Accent", roleClass: "rb-photo", form: 'Accessory · Physical Product',
    isPhoto: true,
    approach: "No MJ generation. These are physical ribbons — style them for real product photography. The Ribbon Trio connects directly to the Hero Wreath's signature trailing ribbon, so the burgundy velvet should read identically to what's in your Hero render.",
    photoDirection: [
      { title: "Background surface", body: "Warm ivory linen or parchment paper. Not white — too clinical. Not dark — this is the light-theme collection." },
      { title: "Product arrangement", body: "Three ribbons: burgundy velvet (widest), brass wire-edge, ivory linen (narrowest). Arrange in a loose, slightly overlapping fan. Don't fold them into bows — show the full ribbon body and the way the velvet catches light." },
      { title: "Context element", body: "One Hero Wreath product or a corner of the mantel garland visible soft and slightly blurred in the background. This connects the accent to the collection immediately." },
      { title: "Camera angle", body: "Flat-lay, slightly angled — 3/4 overhead, not straight down. Soft daylight from one side. --ar 1:1 or 4:5. No MJ needed." },
    ]
  },
  {
    num: 8, short: "Picks", name: "The Quiet Hour Brass Pick Bundle",
    role: "Accent", roleClass: "rb-photo", form: 'Accessory · Physical Product',
    isPhoto: true,
    approach: "No MJ generation. Three physical picks — a eucalyptus pod spray pick (98898.GR), a deep burgundy berry stem pick (95482.BU), and a frosted pine pick. Same photographic logic as the Ribbon Trio: warm linen surface, Hero Wreath in soft background for collection context.",
    photoDirection: [
      { title: "Background surface", body: "Same warm ivory linen as the Ribbon Trio. Maintain visual consistency between the two accent products — they'll appear near each other in the shop." },
      { title: "Product arrangement", body: "Three picks laid at slight angles to each other — not perfectly parallel, not randomly scattered. Think of them as a small loose cluster. Show the full pick wire stem as well as the head." },
      { title: "Context element", body: "Hero Wreath or Candle Ring visible softly in the background to anchor the picks in the collection world. Buyers should be able to see immediately what these accent." },
      { title: "Camera angle", body: "Flat-lay, 3/4 overhead. Same daylight direction as all other collection photos. --ar 1:1 for grid consistency." },
    ]
  },
];

function copy(text, btn) {
  navigator.clipboard.writeText(text).catch(() => {});
  btn.textContent = 'Copied ✓'; btn.classList.add('ok');
  setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('ok'); }, 2200);
}

export default function RenderGuide() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];

  return (
    <>
      <style>{FONTS + CSS}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-eye">Evercrafted · The Quiet Hour · Render Guide</div>
          <div className="hdr-title">Product-by-Product Rendering Walkthrough</div>
          <div className="tab-rail">
            {PRODUCTS.map((prod, i) => (
              <button key={i} className={`prod-tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>
                {prod.num} · {prod.short}
              </button>
            ))}
          </div>
        </div>

        <div className="main">
          <div className="panel">
            {/* Product header */}
            <div className="prod-hdr">
              <div className="prod-role-row">
                <span className={`role-badge ${p.roleClass}`}>{p.role}</span>
                <span className="prod-form">{p.form}</span>
              </div>
              <div className="prod-name">{p.name}</div>
            </div>

            {p.isSource && (
              <div className="source-flag">◦ DNA Source — build this first · All other products reference this render</div>
            )}
            {p.isPhoto && (
              <div className="no-gen-flag">◦ No MJ generation — physical product photography</div>
            )}

            <p className="approach">{p.approach}</p>

            {/* Camera + Watch-outs */}
            {!p.isPhoto && (
              <div className="info-row">
                <div className="info-card">
                  <div className="info-lbl">Camera + Angle</div>
                  <div className="info-body">{p.camera}</div>
                </div>
                <div className="info-card">
                  <div className="info-lbl">Watch-Outs</div>
                  <div className="info-body">
                    {p.watchOuts.map((w, i) => (
                      <div key={i} style={{marginBottom: i < p.watchOuts.length-1 ? 8 : 0}}>◦ {w}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Photo direction */}
            {p.isPhoto && p.photoDirection && (
              <>
                <div className="eyebrow">Photography Direction</div>
                {p.photoDirection.map((d, i) => (
                  <div key={i} className="photo-card">
                    <div className="photo-title">{d.title}</div>
                    <div className="photo-body">{d.body}</div>
                  </div>
                ))}
              </>
            )}

            {/* Phase stack */}
            {!p.isPhoto && p.phases && (
              <>
                <div className="hr"></div>
                <div className="eyebrow">Phase Stack — {p.phases.length} Phase{p.phases.length > 1 ? 's' : ''}</div>
                {p.phases.map((phase, i) => (
                  <div key={i} className="phase-item">
                    <div className="phase-hdr">
                      <span className="phase-num">Phase {i + 1}</span>
                      <span className="phase-title">{phase.label}</span>
                      <span className={`type-badge ${phase.typeClass}`}>{phase.typeLbl}</span>
                    </div>

                    {/* Slot guide */}
                    <div className="slot-guide">
                      {phase.slots.map(([lbl, val], si) => (
                        <div key={si} className="slot-row">
                          <div className="slot-lbl">{lbl}</div>
                          <div className={`slot-val${!val ? ' none' : lbl === 'Parameters' ? ' param' : ''}`}>
                            {val || '— Empty'}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Prompt block */}
                    <div className="prompt-wrap">
                      <div className="prompt-hdr">
                        <span className="prompt-lbl">Ready to paste</span>
                        <button className="copy-btn" onClick={e => copy(phase.prompt, e.currentTarget)}>Copy</button>
                      </div>
                      <div className="prompt-txt">{phase.prompt}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
