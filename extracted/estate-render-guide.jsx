import { useState } from "react";

const EC = {
  bg: "#F9F7F4", card: "#FFFFFF", ink: "#1A1814", dim: "#6B5F50",
  dim2: "#B0A898", border: "#E4DDD2", surf: "#F2EDE6",
  gold: "#8A6820", goldPale: "#FDF0E0", goldBorder: "#C4963A",
  green: "#1F3326", greenLight: "#4A6741", greenPale: "#EEF2ED",
  serif: "'Cormorant Garamond', Georgia, serif",
  mono: "'DM Mono', 'Courier New', monospace",
};

const GUIDE = [
  {
    num: 0, short: "Step 0", name: "Material Study Cascade",
    role: "Run This First — Oref for Every Product", form: '26-30" Asymmetric Cascade',
    isStep0: true,
    approach: "Generate this before any product render runs. One image. All eight products reference it at --ow 180 for consistent material fidelity across the collection. The magnolia, tartan ribbon, lacquered berry, and matte pine all read from the same source in every render. Doubles as a kit listing image. Save the seed.",
    camera: "Front-facing 3/4 view. Pale gray seamless background. --s 30 — clinical not beautiful. --ar 2:3 portrait.",
    watchOuts: [
      "No frosting on pine and no metallic elements — this collection is tobacco, tartan, and ivory. If any brass or gold appears in the cascade image, add: --no metallic, gold dust, brass finish, gilded accents.",
      "Tartan must be legible as plaid — the grid pattern visible. If it reads as solid ribbon, add: tartan plaid grid pattern clearly legible, dark hunter green and navy intersecting lines with burgundy accent thread.",
      "Save the seed. The tartan and lacquered berry fidelity from this image controls the entire collection.",
      "Use --ow 180 in all oref slots. Lower weight reads materials, higher weight tries to copy the cascade composition."
    ],
    phases: [
      { label: "Material Study Cascade", type: "text", typeLbl: "TEXT ONLY · --s 30",
        slots: [
          ["Image Prompt", null], ["Omni Reference", null],
          ["Style Reference", null],
          ["Parameters", "--style raw --s 30 --ar 2:3 --v 7 · Save seed immediately"]
        ],
        prompt: "Luxury handcrafted faux botanical The Estate material cascade, premium artificial silk and polyester florals, asymmetric cascade arrangement 26 to 30 inches, weighted left focal zone, full material hierarchy at maximum, all collection species clearly visible and individually readable — three ivory-cream artificial wire-structured magnolia blooms 3 to 4 inches across with matte antiqued petal texture and visible wire construction, three dark oxblood lacquered artificial berry clusters with deep burgundy-black surface and subtle lacquer sheen, two tobacco-cognac artificial seed pods with antique patina finish, deep dark matte green artificial pine stems with fine individual needle strands and no frosting composed formal finish, artificial magnolia leaves with silver-sage underside, layered ribbon bow combining deep forest green velvet ribbon over tartan plaid grosgrain ribbon in dark hunter green and navy with burgundy plaid accent lines — both ribbon textures clearly visible with velvet nap and tartan plaid grid legible — long trailing layered tail at base — all stems at varying heights and depths with natural overlap and clearly artificial construction, asymmetric cascade formula weighted toward 8 to 12 o'clock heavier side with layered ribbon fall descending at base, each material individually legible and separated, photographed against pale neutral gray seamless background, front-facing 3/4 view showing full cascade height and width, soft even studio lighting --style raw --s 30 --ar 2:3 --v 7 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, wreath form, circular, perfectly symmetrical, frosted pine, metallic, gold, brass, LED, illustrated, painted, cotton bolls, fluffy white balls"
      }
    ]
  },
  {
    num: 1, short: "Anteroom", name: "The Anteroom Wreath",
    role: "Hero · DNA Source", form: '24" Bottom Heavy',
    price: "$175", isSource: true,
    approach: "Your DNA source for this collection. Lock this before anything else. Every other product references this render. Bottom Heavy formula: density peaks 6–9 o'clock, silence arc 1–4 o'clock held completely bare. No LED. No frost. No metallic.",
    camera: "Front-facing wall-mount. Aged plaster or pale gray wall. --ar 1:1",
    watchOuts: [
      "Silence arc 1–4 o'clock must be completely bare — not sparse, not thin. Bare. If MJ adds any element to the upper right quadrant, add to --no: 'any greenery at 1 to 4 o'clock'.",
      "Matte pine only — no frosted tips, no silvering, no Christmas-tree gloss. If it reads festive, add: 'composed formal matte finish, no holiday cheer, no festive styling'.",
      "No LED strand on this product — it is not in the brief. If warm glowing lights appear, add '--no LED, warm lights, fairy lights, light strand' explicitly.",
      "The velvet ribbon in Phase 4 has ONE tail only — trailing down-left from 8 o'clock. If a bow forms symmetrically, reduce --iw to 2.0 and use Editor region for the ribbon."
    ],
    phases: [
      {
        label: "Green Base", type: "text", typeLbl: "TEXT ONLY",
        slots: [["Image Prompt", null], ["Omni Reference", null], ["Style Reference", null], ["Parameters", "--style raw --s 100 --ar 1:1 --v 7"]],
        prompt: `Luxury handcrafted faux botanical wreath, premium artificial silk and polyester greenery, home decor product photography, complete circular grapevine ring base forming a full unbroken 24-inch loop, deep dark matte green artificial pine stems with fine individual needle strands and no frosting composed formal finish throughout, artificial magnolia leaves with matte dusty-green finish and silver-sage undersides layered through the lower arc, greenery distribution bottom heavy with density concentrated from 6 o'clock through 9 o'clock, upper right quadrant from 1 o'clock through 4 o'clock held completely and deliberately bare with warm grapevine base exposed, no greenery anywhere in the silence zone, formal composed asymmetric structure with no symmetry and no cheerfulness, complete circular ring visible, photographed flat against an aged plaster pale gray wall as if hanging on a formal interior door, front-facing camera angle, soft diffused studio daylight from upper left, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, flat lay, overhead shot, frosted pine, frost on tips, metallic, gold, brass, LED lights, warm glow, fairy lights, cheerful, festive Christmas, symmetrical --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        label: "Ivory Magnolia Focals", type: "oref", typeLbl: "OREF",
        slots: [["Image Prompt", "Phase 1 output · --iw 2.0"], ["Omni Reference", "Ivory wire-structured magnolia blooms · --ow 380"], ["Style Reference", null], ["Parameters", "--iw 2.0  --ow 380"]],
        prompt: `[PHASE-1-ANTEROOM-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular ring, matte pine and magnolia leaf greenery base established with bottom heavy density, now adding three ivory-cream artificial wire-structured magnolia blooms each 3 to 4 inches across as the dominant focal element, blooms concentrated at the anchor zone from 7 to 9 o'clock, primary bloom fully open facing forward at 8 o'clock, secondary slightly smaller at 7 o'clock angled inward, tertiary bud-stage at 9 o'clock, matte antiqued petal texture and visible wire construction clearly artificial, upper right silence arc from 1 to 4 o'clock remains completely bare, warm grapevine exposed in silence zone, photographed flat against aged plaster wall front-facing, soft diffused daylight upper left, 85mm editorial product photography --iw 2.0 --oref [MAGNOLIA-IVORY-URL] --ow 380 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, frosted pine, metallic, gold, brass, symmetrical, cheerful, festive, LED, illustrated, painted --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        label: "Lacquered Berry + Tobacco Pods", type: "oref", typeLbl: "OREF + SREF",
        slots: [["Image Prompt", "Phase 2 output · --iw 2.5"], ["Omni Reference", "Oxblood lacquered berry clusters · --ow 240"], ["Style Reference", "Magnolia bloom stock photo · --sw 200"], ["Parameters", "--iw 2.5  --ow 240  --sref [MAGNOLIA] --sw 200"]],
        prompt: `[PHASE-2-ANTEROOM-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, complete 24-inch circular ring, ivory magnolia blooms established at anchor zone 7 to 9 o'clock, now adding dark oxblood lacquered artificial berry clusters with deep burgundy-black surface and subtle lacquer sheen layered through the density zone from 6 to 9 o'clock, tobacco-toned artificial seed pods in cognac brown with antique patina finish scattered through the anchor zone at 7 to 8 o'clock, all elements layered naturally into existing stem depth with no gap filling outside the density zone, silence arc 1 to 4 o'clock remains completely and deliberately bare, warm grapevine visible in silence zone, photographed flat against aged plaster wall front-facing, soft diffused daylight upper left, 85mm editorial product photography --iw 2.5 --oref [LACQUERED-BERRY-URL] --ow 240 --sref [MAGNOLIA-IVORY-URL] --sw 200 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, frosted pine, metallic, gold, bright red berries, symmetrical, cheerful, LED, illustrated --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        label: "Velvet Ribbon — Final Pass", type: "text", typeLbl: "TEXT + HIGH IW",
        slots: [["Image Prompt", "Phase 3 output · --iw 3.0"], ["Omni Reference", null], ["Style Reference", null], ["Parameters", "--iw 3.0 · No oref — protect accumulated render"]],
        prompt: `[PHASE-3-ANTEROOM-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals and textile accents, home decor product photography, complete 24-inch circular ring, all established elements preserved exactly, now adding a layered ribbon bow at 8 o'clock combining deep forest green velvet ribbon as the dominant outer layer and tartan plaid grosgrain ribbon in dark hunter green and navy with burgundy plaid accent lines as the inner layer, both ribbons visible in the bow with velvet nap and woven tartan plaid texture contrasting formally, one long layered tail descending to the left with both ribbon faces visible, only one tail below the anchor, no bow at right side, silence arc 1 to 4 o'clock remains completely bare with no ribbon encroaching on the silence zone, formal restraint throughout, photographed flat against aged plaster wall front-facing, soft diffused daylight upper left, 85mm editorial product photography --iw 3.0 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, frosted pine, metallic, gold, bright berries, symmetrical ribbon, matching bows, two ribbon tails, cheerful, LED, illustrated, painted --style raw --s 100 --ar 1:1 --v 7`
      }
    ]
  },
  {
    num: 2, short: "Rhinelander", name: "The Rhinelander Garland",
    role: "Premium Anchor", form: "7ft Linear · Twin Cluster",
    price: "$295",
    approach: "Twin Cluster composition — two distinct dense anchor clusters with a disciplined leaner spine between them. Left cluster heavier; left tail 4 inches longer than right. LED integrated into center density zone only — not throughout the full length. This is the most complex product in the collection.",
    camera: "Straight-on at mantel height. Dark mahogany or painted mantel shelf. Natural asymmetric drape with left tail longer. --ar 16:9",
    watchOuts: [
      "LED strand in center density zone only — not woven through the full garland length. If lights appear throughout, add: 'LED warm light visible in center cluster zone only, trailing ends have no lights'.",
      "--s 50 is critical for garlands to prevent the painted/illustrated look.",
      "Twin Cluster means TWO distinct anchor clusters — not even distribution. If MJ distributes florals evenly along the length, describe more explicitly: 'all florals clustered at two anchor points only, garland spine between clusters is intentionally lean'.",
      "Left tail must read 4 inches longer than right — describe this explicitly in the prompt or MJ will default to symmetry."
    ],
    phases: [
      {
        label: "Garland Base", type: "text", typeLbl: "TEXT ONLY",
        slots: [["Image Prompt", null], ["Omni Reference", null], ["Style Reference", null], ["Parameters", "--style raw --s 50 --ar 16:9 --v 7"]],
        prompt: `Luxury handcrafted faux botanical mantel garland, premium artificial silk and polyester greenery, home decor product photography, complete 7-foot unbroken linear garland with Twin Cluster composition, deep dark matte green artificial pine stems with fine individual needle strands and no frosting composed formal finish throughout, artificial magnolia leaves with silver-sage undersides woven through the two anchor cluster zones only, greenery density concentrated at two distinct cluster anchor points — one cluster at left-of-center and one at right-of-center — with disciplined lean coverage along the connecting spine between them and natural taper at both trailing ends, left trailing tail extends approximately 4 inches longer than right trailing tail creating deliberate asymmetry, garland drapes naturally over a dark mahogany mantel shelf with visible front sag and natural gravity, photographed straight-on at mantel height, soft diffused studio daylight from upper left, warm neutral interior background with dark wood mantel visible, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, flat lay, overhead shot, frosted pine, frost, metallic, gold, brass, even distribution of florals, symmetrical tails, cheerful, festive --style raw --s 50 --ar 16:9 --v 7`
      },
      {
        label: "Magnolia Clusters + LED Center Zone", type: "oref", typeLbl: "OREF + SREF",
        slots: [["Image Prompt", "Phase 1 output · --iw 2.0"], ["Omni Reference", "Ivory magnolia blooms · --ow 360"], ["Style Reference", "Hero Anteroom Wreath render · --sw 250"], ["Parameters", "--iw 2.0  --ow 360  --sref [ANTEROOM] --sw 250"]],
        prompt: `[PHASE-1-RHINELANDER-URL] Luxury handcrafted faux botanical mantel garland, premium artificial silk florals, photorealistic commercial product photography, real photograph not illustrated, complete 7-foot Twin Cluster garland, two distinct anchor cluster zones established, now adding ivory-cream artificial wire-structured magnolia blooms distributed between the two anchor clusters only — three blooms at left cluster and two blooms at right cluster — warm amber LED strand glow visible in the center density zone between the two clusters only with no lights at the trailing ends, matte antiqued magnolia petal texture visible, natural garland sag over dark mahogany mantel with left tail longer than right, photographed straight-on at mantel height, soft diffused daylight upper left, 85mm editorial product photography --iw 2.0 --oref [MAGNOLIA-IVORY-URL] --ow 360 --sref [ANTEROOM-WREATH-RENDER-URL] --sw 250 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, frosted pine, metallic, gold, even distribution, symmetrical tails, LED throughout full length, illustrated, painted --style raw --s 50 --ar 16:9 --v 7`
      },
      {
        label: "Berry Clusters + Tobacco Accents", type: "oref", typeLbl: "OREF + SREF",
        slots: [["Image Prompt", "Phase 2 output · --iw 2.5"], ["Omni Reference", "Oxblood lacquered berry clusters · --ow 220"], ["Style Reference", "Magnolia stock photo · --sw 200"], ["Parameters", "--iw 2.5  --ow 220  --sref [MAGNOLIA] --sw 200"]],
        prompt: `[PHASE-2-RHINELANDER-URL] Luxury handcrafted faux botanical mantel garland, premium artificial silk florals, photorealistic commercial product photography, real photograph not illustrated, complete 7-foot Twin Cluster garland, magnolia blooms and LED center zone established, now adding dark oxblood lacquered artificial berry clusters and tobacco-toned seed pods layered into both anchor cluster zones reinforcing density, layered ribbon bow at the left cluster combining deep forest green velvet ribbon over tartan plaid grosgrain ribbon in dark hunter green and navy with burgundy plaid lines, both velvet and tartan textures visible and contrasting, one long layered tail draping down over the left mantel edge, right trailing end has a single tartan plaid grosgrain ribbon tail without a bow, stems fully layered at anchor clusters with disciplined spine between, natural mantel sag with left tail longer than right, photographed straight-on at mantel height, soft diffused daylight upper left, 85mm editorial product photography --iw 2.5 --oref [LACQUERED-BERRY-URL] --ow 220 --sref [MAGNOLIA-IVORY-URL] --sw 200 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, frosted pine, metallic, gold, symmetrical bows, matching bows, even distribution, illustrated, painted --style raw --s 50 --ar 16:9 --v 7`
      }
    ]
  },
  {
    num: 3, short: "Library", name: "The Library Table Ring",
    role: "Supporting", form: '18" Ring · Garden Scatter',
    price: "$125",
    approach: "Garden Scatter formula — irregular placement around 360°, no even distribution of any single element. Designed to encircle a pillar candle grouping or whiskey decanter. Overhead angle is correct for this product — do NOT add --no flat lay.",
    camera: "3/4 overhead on dark mahogany or walnut table surface. Pillar candles or whiskey decanter at center. --ar 1:1 · Overhead angle is intentional and correct.",
    watchOuts: [
      "DO NOT add '--no flat lay, overhead shot' to this product. Overhead is the correct camera angle.",
      "Irregular outer edge is intentional — if MJ creates a perfectly round ring, add: 'irregular outer edge with varying projection distances, no uniform ring silhouette'.",
      "No even distribution — if any single element appears at regular intervals, describe the irregularity more explicitly.",
      "The decanter or candle grouping at center should read clearly — if it disappears, describe: 'three ivory pillar candles of graduated heights at center visible clearly above the ring'."
    ],
    phases: [
      {
        label: "Ring Base", type: "text", typeLbl: "TEXT ONLY",
        slots: [["Image Prompt", null], ["Omni Reference", null], ["Style Reference", null], ["Parameters", "--style raw --s 100 --ar 1:1 --v 7"]],
        prompt: `Luxury handcrafted faux botanical centerpiece ring, premium artificial polyester and silk greenery, home decor product photography, complete circular grapevine ring base forming a full unbroken 18-inch loop, deep dark matte green artificial pine stems and artificial magnolia leaves covering the ring with irregular Garden Scatter distribution and no even spacing of any element, irregular outer edge with varying projection distances creating a deliberately uneven silhouette, ring styled on a dark mahogany or walnut wood table surface surrounding three ivory pillar candles of graduated heights at the center, photographed from a 3/4 overhead angle showing the full ring and candles from above and slightly to the front, soft diffused studio daylight from upper left, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, frosted pine, metallic, gold, LED, uniform distribution, perfectly round outer edge --style raw --s 100 --ar 1:1 --v 7`
      },
      {
        label: "Focal Accents + Hero Style", type: "oref", typeLbl: "OREF + SREF",
        slots: [["Image Prompt", "Phase 1 output · --iw 2.0"], ["Omni Reference", "Lacquered berry or tobacco pod stock · --ow 220"], ["Style Reference", "Anteroom Wreath render · --sw 200"], ["Parameters", "--iw 2.0  --ow 220  --sref [ANTEROOM] --sw 200"]],
        prompt: `[PHASE-1-LIBRARY-URL] Luxury handcrafted faux botanical centerpiece ring, premium artificial silk florals, home decor product photography, complete 18-inch ring, matte pine and magnolia leaf base established, now adding one ivory-cream artificial magnolia bloom at an asymmetric position at approximately 10 o'clock as the single dominant accent, dark oxblood lacquered berry clusters scattered irregularly at three points around the ring without even spacing, tobacco-toned seed pods as secondary accents at two additional irregular positions, all elements integrated naturally into the existing stem layer, three ivory pillar candles at center visible clearly, photographed 3/4 overhead on dark mahogany table, soft diffused daylight upper left, 85mm editorial product photography --iw 2.0 --oref [LACQUERED-BERRY-URL] --ow 220 --sref [ANTEROOM-WREATH-RENDER-URL] --sw 200 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, frosted pine, metallic, gold, LED, evenly distributed accents, illustrated, painted --style raw --s 100 --ar 1:1 --v 7`
      }
    ]
  },
  {
    num: 4, short: "Club Room", name: "The Club Room Swag",
    role: "Supporting", form: '28" Horizontal Wall Swag · Side Sweep',
    price: "$135",
    approach: "This is a wall swag — not a garland, not a wreath. Hangs horizontally on a wall. Side Sweep with hard left composition: weight and florals pull decisively left. Right terminus trails into deliberate incompletion — as if the arranger was called away. No mantel, no shelf. Wall-mount horizontal.",
    camera: "Front-facing horizontal wall mount. Dark wood paneling or deep-toned interior wall. --ar 16:9 · NOT mantel height — this hangs directly on a wall.",
    watchOuts: [
      "No ring language, no loop language, no circular base — this is a linear wall swag built on a branch or vine armature.",
      "Right terminus must read deliberately incomplete — trailing off, not ending cleanly. If MJ creates a tidy right end, add: 'right terminus trails into sparse incompletion as if unfinished, bare branch visible at right end'.",
      "Hard left sweep — if the composition feels centered or balanced, describe: 'all weight and all florals pulled decisively to the left, right side intentionally lean and incomplete'.",
      "Camera is horizontal wall-mount, NOT mantel height. Remove any mantel shelf language."
    ],
    phases: [
      {
        label: "Swag Armature Base", type: "text", typeLbl: "TEXT ONLY",
        slots: [["Image Prompt", null], ["Omni Reference", null], ["Style Reference", null], ["Parameters", "--style raw --s 50 --ar 16:9 --v 7"]],
        prompt: `Luxury handcrafted faux botanical wall swag, premium artificial silk and polyester greenery, home decor product photography, complete 28-inch horizontal wall swag on a natural branch or grapevine armature, deep dark matte green artificial pine stems and artificial magnolia leaves covering the swag with hard left Side Sweep composition — all coverage and density pulled decisively to the left two-thirds, right one-third lean and sparse with bare armature becoming visible toward the right terminus, right terminus trails into deliberate sparse incompletion as if unfinished, left terminus full and anchored with the heaviest density at the left cluster, overall horizontal linear form hanging directly on a dark interior wall with dark wood paneling background, photographed front-facing showing the full horizontal swag silhouette, soft diffused studio daylight from upper left, 85mm editorial e-commerce product photography --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, frosted pine, metallic, gold, LED, circular form, ring, wreath, mantel shelf, even distribution, symmetrical, cheerful --style raw --s 50 --ar 16:9 --v 7`
      },
      {
        label: "Magnolia Focals + Accents", type: "oref", typeLbl: "OREF + SREF",
        slots: [["Image Prompt", "Phase 1 output · --iw 2.0"], ["Omni Reference", "Ivory magnolia blooms · --ow 340"], ["Style Reference", "Anteroom Wreath render · --sw 220"], ["Parameters", "--iw 2.0  --ow 340  --sref [ANTEROOM] --sw 220"]],
        prompt: `[PHASE-1-CLUBROOM-URL] Luxury handcrafted faux botanical wall swag, premium artificial silk florals, photorealistic commercial product photography, real photograph not illustrated, complete 28-inch horizontal wall swag, hard left Side Sweep base established, now adding two ivory-cream artificial wire-structured magnolia blooms at the left anchor cluster only — primary fully open at left-of-center and secondary slightly smaller further left, dark oxblood lacquered berry clusters and tobacco-toned seed pods reinforcing the left density zone only, right two-thirds remains lean and the right terminus continues its deliberate sparse incompletion with bare armature visible, layered ribbon at the left cluster zone combining deep forest green velvet ribbon over tartan plaid grosgrain ribbon in dark hunter green and navy plaid with burgundy lines, one loop and one trailing tail with both velvet and tartan textures visible in formal layered drape, swag hanging against dark wood paneling wall, photographed front-facing, soft diffused daylight upper left, 85mm editorial product photography --iw 2.0 --oref [MAGNOLIA-IVORY-URL] --ow 340 --sref [ANTEROOM-WREATH-RENDER-URL] --sw 220 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, frosted pine, metallic, gold, LED, symmetrical composition, even distribution, mantel shelf, illustrated, painted --style raw --s 50 --ar 16:9 --v 7`
      }
    ]
  },
  {
    num: 5, short: "Vestibule", name: "The Vestibule Wreath",
    role: "Gateway", form: '16" Bottom Heavy · Simplified',
    price: "$110",
    approach: "Simplified version of the Anteroom Wreath. Inherits the silence arc and asymmetric ribbon directly. Magnolia leaves reduced to three focal points only to maintain the accessible price point. Start from the Anteroom Wreath render at lower --iw to allow simplification.",
    camera: "Same as Hero — front-facing, aged plaster wall. --ar 1:1",
    watchOuts: [
      "Three magnolia focal points maximum — if more appear, the accessible price point logic breaks. Describe explicitly: 'exactly three ivory magnolia leaves as the only floral focal, no additional florals'.",
      "Silence arc must be identical to the Anteroom — 1 to 4 o'clock completely bare. This visual consistency is what makes the collection read as a system.",
      "Keep --iw at 1.5 — higher values will pull too directly from the Hero render and the 24-inch scale will fight the 16-inch form.",
      "No LED — same rule as the Hero."
    ],
    phases: [
      {
        label: "Vestibule — Simplified from Hero", type: "oref", typeLbl: "IMAGE + SREF",
        slots: [["Image Prompt", "Anteroom Wreath render · --iw 1.5"], ["Omni Reference", "Ivory magnolia leaf stock · --ow 280"], ["Style Reference", "Anteroom Wreath render · --sw 200"], ["Parameters", "--iw 1.5  --ow 280  --sref [ANTEROOM] --sw 200"]],
        prompt: `[ANTEROOM-WREATH-RENDER-URL] Luxury handcrafted faux botanical wreath, premium artificial silk florals, home decor product photography, 16-inch circular ring version of this design — smaller and more restrained than the source, simplified composition with exactly three ivory-cream artificial magnolia leaf clusters as the only focal elements at the anchor zone from 7 to 9 o'clock, matte pine and minimal dark leaf greenery covering the lower arc only, upper right silence arc from 1 to 4 o'clock completely bare with grapevine exposed exactly as in the source, layered ribbon bow at 8 o'clock of deep forest green velvet ribbon over tartan plaid grosgrain in dark hunter green and navy with burgundy lines, both textures visible, one tail trailing left, more restrained and simpler overall than the source image, photographed flat against aged plaster wall front-facing, soft diffused daylight upper left, 85mm editorial product photography --iw 1.5 --oref [MAGNOLIA-IVORY-URL] --ow 280 --sref [ANTEROOM-WREATH-RENDER-URL] --sw 200 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, flat lay, overhead shot, frosted pine, metallic, gold, LED, more than three focal points, illustrated, painted --style raw --s 100 --ar 1:1 --v 7`
      }
    ]
  },
  {
    num: 6, short: "Settee", name: "The Settee Ring",
    role: "Atmospheric Filler", form: '6" Ring · Wild Asymmetry',
    price: "$45",
    approach: "Very small — 6 inches. Wild Asymmetry formula: intentionally irregular, never uniform. One ribbon tail exits at 7 o'clock and trails 3 inches — never tucked, never tied symmetrically. No LED at this scale. Flat-lay overhead is correct for this tabletop product.",
    camera: "3/4 overhead flat-lay on dark linen or aged wool textile. Single taper candle at center. --ar 1:1 · Flat-lay is intentional and correct for this product.",
    watchOuts: [
      "DO NOT add --no flat lay to this product. Flat-lay overhead is correct.",
      "No LED — this is an atmospheric accent, not an illuminated product.",
      "The ribbon tail at 7 o'clock must trail outward — if MJ tucks it or forms a symmetric bow, add: 'single ribbon tail exits ring at 7 o'clock and trails 3 inches outward, never tucked, never symmetrical'.",
      "Wild Asymmetry at this scale means the outer edge is irregular — not a clean circle. Emphasize this explicitly if the ring renders too neat."
    ],
    phases: [
      {
        label: "Settee Ring — Single Phase", type: "text", typeLbl: "TEXT + SREF",
        slots: [["Image Prompt", null], ["Omni Reference", null], ["Style Reference", "Anteroom Wreath render · --sw 150"], ["Parameters", "--sref [ANTEROOM] --sw 150 · No oref, no --iw"]],
        prompt: `Luxury handcrafted faux botanical candle ring, premium artificial polyester and wire construction, home decor product photography, 6-inch circular ring with Wild Asymmetry formula, deep dark matte green artificial foliage and compact matte pine substrate with uneven coverage and deliberately irregular outer edge, one small ivory-cream artificial magnolia leaf fragment at approximately 9 o'clock as the single dominant accent, one dark lacquered berry cluster at approximately 6 o'clock as secondary, tartan plaid grosgrain ribbon tail in dark hunter green and navy with burgundy plaid accent lines exiting the ring at 7 o'clock and trailing 3 inches outward with the plaid grid pattern clearly visible — never tucked never symmetrical — tartan is the only ribbon at this scale, minimal and formally restrained, no LED strand at this scale, ring flat-lay styled on a dark aged linen or wool textile surface surrounding a single taper candle at center, photographed from a 3/4 overhead angle showing the full ring and candle, soft diffused studio daylight from upper left, 85mm editorial e-commerce product photography --sref [ANTEROOM-WREATH-RENDER-URL] --sw 150 --no fresh flowers, real plants, live botanicals, organic, dew, wilting, florist, fresh-cut, frosted pine, metallic, gold, LED, symmetrical ribbon, tucked ribbon, uniform ring silhouette --style raw --s 100 --ar 1:1 --v 7`
      }
    ]
  },
  {
    num: 7, short: "Polo Ribbon", name: "The Polo Ribbon Bundle",
    role: "Accent", form: "Accessory · Photography Only",
    price: "$28",
    isPhoto: true,
    approach: "No MJ generation. Three physical ribbons styled for real product photography. The trio should layer hierarchically: deep forest green velvet (widest), tartan plaid grosgrain (medium), tobacco/cognac linen or grosgrain (narrowest).",
    camera: "Flat-lay, 3/4 overhead on dark aged linen or polished wood surface. --ar 1:1 or 4:5",
    watchOuts: [
      "Show full ribbon body in a loose slightly overlapping fan — not folded bows.",
      "The forest green velvet must match the ribbon seen in the Anteroom Wreath render.",
      "The tartan ribbon should show its pattern clearly — don't obscure it in shadow.",
      "Context element: Anteroom Wreath or Vestibule Wreath visible softly blurred in background."
    ],
    photoDirection: [
      { title: "Background surface", body: "Dark aged linen, polished mahogany, or antique wool textile. Never white — it reads too commercial." },
      { title: "Ribbon arrangement", body: "Three ribbons in a loose overlapping fan: forest green velvet (widest) at base, tartan plaid grosgrain (medium) over it, tobacco/cognac grosgrain (narrowest) uppermost. Show full body length — not folded." },
      { title: "Context element", body: "Anteroom Wreath or Vestibule Wreath visible softly out of focus in the background — connects the accent to the collection immediately." },
      { title: "Camera angle", body: "Flat-lay, 3/4 overhead. Single directional light from one side showing velvet nap. --ar 1:1 or 4:5." }
    ]
  },
  {
    num: 8, short: "Estate Picks", name: "The Estate Pick Set",
    role: "Accent", form: "Accessory · Photography Only",
    isPhoto: true,
    approach: "No MJ generation. Two of each variety — 6 picks total. Photography should show the full wire stem length as well as the head. Styled to maintain visual consistency with the Polo Ribbon Bundle.",
    camera: "Same dark surface as Polo Ribbon Bundle. 3/4 overhead. Show full stem length. --ar 1:1",
    watchOuts: [
      "Show the full wire stem as well as the head — don't crop the stems.",
      "Use the same background surface as the Ribbon Bundle for visual collection consistency.",
      "Arrange at slight angles to each other — not perfectly parallel, not randomly scattered.",
      "Context element: Anteroom Wreath or Library Table Ring softly in the background."
    ],
    photoDirection: [
      { title: "Background surface", body: "Identical surface to the Polo Ribbon Bundle shoot — same dark linen or polished wood. Visual consistency between both accent products matters because they appear near each other in the shop." },
      { title: "Pick arrangement", body: "Six picks in three pairs at slight angles to each other. Full wire stem length visible. Heads at top, stems trailing below. Two magnolia, two berry, two tobacco pod." },
      { title: "Context element", body: "Library Table Ring or Anteroom Wreath softly visible in background — shows buyers what these picks complement." },
      { title: "Camera angle", body: "3/4 overhead, same directional light as Ribbon Bundle shoot. --ar 1:1." }
    ]
  }
];

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).catch(() => {});
  const orig = btn.textContent;
  btn.textContent = "Copied ✓";
  btn.style.background = "#2A4A2A";
  btn.style.borderColor = "#4A6741";
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = "";
    btn.style.borderColor = "";
  }, 2000);
}

export default function EstateRenderGuide() {
  const [active, setActive] = useState(0);
  const p = GUIDE[active];

  return (
    <div style={{ background: EC.bg, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", color: EC.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${EC.border}; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${EC.border}`, padding: "20px 28px 16px", background: EC.bg, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ fontFamily: EC.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: EC.gold, marginBottom: 3 }}>◦ Evercrafted · Product Render Guide</div>
        <div style={{ fontFamily: EC.serif, fontSize: 26, fontWeight: 500, letterSpacing: "-0.01em" }}>The Estate Collection</div>
        <div style={{ fontFamily: EC.mono, fontSize: 9, color: EC.dim2, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>Rhinelander Mansion · Connecticut · 1987</div>
      </div>

      {/* Product Nav */}
      <div style={{ display: "flex", gap: 6, padding: "14px 28px", overflowX: "auto", borderBottom: `1px solid ${EC.border}`, flexWrap: "wrap" }}>
        {GUIDE.map((g, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            fontFamily: EC.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "8px 14px", borderRadius: 4, cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.2s",
            background: i === active ? EC.green : EC.card,
            border: `0.5px solid ${i === active ? EC.green : EC.border}`,
            color: i === active ? "#F9F7F4" : EC.dim,
          }}>
            {g.num} · {g.short}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 28px 60px" }}>
        <div style={{ marginBottom: 4, fontFamily: EC.mono, fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: EC.gold }}>{p.role}</div>
        <div style={{ fontFamily: EC.serif, fontSize: 32, fontWeight: 500, marginBottom: 2 }}>{p.name}</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center" }}>
          <span style={{ fontFamily: EC.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: EC.gold }}>{p.form}</span>
          {p.price && <span style={{ fontFamily: EC.mono, fontSize: 10, color: EC.green, fontWeight: 500 }}>{p.price}</span>}
        </div>

        {p.isSource && (
          <div style={{ background: EC.greenPale, border: `0.5px solid ${EC.greenLight}`, borderRadius: 4, padding: "9px 14px", marginBottom: 16, fontFamily: EC.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A3A1A" }}>
            ◦ DNA Source — build this first · All other products reference this render as --sref
          </div>
        )}
        {p.isPhoto && (
          <div style={{ background: "#E8F5EE", border: "0.5px solid #3D6B4A", borderRadius: 4, padding: "9px 14px", marginBottom: 16, fontFamily: EC.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A3A1A" }}>
            ◦ No MJ generation — physical product photography
          </div>
        )}

        <p style={{ fontSize: 13, color: "#5A4F3E", lineHeight: 1.75, marginBottom: 20 }}>{p.approach}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
          <div style={{ background: EC.card, border: `0.5px solid ${EC.border}`, borderRadius: 5, padding: "13px 15px" }}>
            <div style={{ fontFamily: EC.mono, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: EC.dim, marginBottom: 5 }}>Camera & Angle</div>
            <div style={{ fontSize: 12, color: "#5A4F3E", lineHeight: 1.65 }}>{p.camera}</div>
          </div>
          <div style={{ background: EC.card, border: `0.5px solid ${EC.border}`, borderRadius: 5, padding: "13px 15px" }}>
            <div style={{ fontFamily: EC.mono, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: EC.dim, marginBottom: 5 }}>Watch-Outs</div>
            <div style={{ fontSize: 12, color: "#5A4F3E", lineHeight: 1.65 }}>
              {(p.watchOuts || []).map((w, i) => <div key={i} style={{ marginBottom: 5 }}>◦ {w}</div>)}
            </div>
          </div>
        </div>

        {/* Photo Direction for accessories */}
        {p.isPhoto && p.photoDirection && (
          <>
            <div style={{ height: 1, background: EC.border, margin: "22px 0" }} />
            <div style={{ fontFamily: EC.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: EC.dim, marginBottom: 14 }}>Photography Direction</div>
            {p.photoDirection.map((d, i) => (
              <div key={i} style={{ background: EC.card, border: `0.5px solid ${EC.border}`, borderRadius: 5, padding: "13px 18px", marginBottom: 10 }}>
                <div style={{ fontFamily: EC.serif, fontSize: 15, fontWeight: 600, color: EC.gold, marginBottom: 5 }}>{d.title}</div>
                <div style={{ fontSize: 12.5, color: "#5A4F3E", lineHeight: 1.65 }}>{d.body}</div>
              </div>
            ))}
          </>
        )}

        {/* Phase Stacks */}
        {!p.isPhoto && p.phases && (
          <>
            <div style={{ height: 1, background: EC.border, margin: "22px 0" }} />
            <div style={{ fontFamily: EC.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: EC.dim, marginBottom: 18 }}>
              Phase Stack — {p.phases.length} Phase{p.phases.length > 1 ? "s" : ""}
            </div>

            {p.phases.map((ph, i) => (
              <div key={i} style={{ marginBottom: 26 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontFamily: EC.mono, fontSize: 11, fontWeight: 500, color: EC.gold }}>Phase {i + 1}</span>
                  <span style={{ fontFamily: EC.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: EC.ink, flex: 1 }}>{ph.label}</span>
                  <span style={{
                    fontFamily: EC.mono, fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "3px 8px", borderRadius: 2, border: "0.5px solid",
                    background: ph.type === "oref" ? "#EEE8F5" : "#E8F0E8",
                    borderColor: ph.type === "oref" ? "#7A5A8A" : "#3D6B4A",
                    color: ph.type === "oref" ? "#3A1A5A" : "#1A3A1A",
                  }}>{ph.typeLbl}</span>
                </div>

                {/* Slot guide */}
                <div style={{ background: EC.surf, border: `0.5px solid ${EC.border}`, borderRadius: 5, padding: "11px 15px", marginBottom: 10 }}>
                  {ph.slots.map(([lbl, val], si) => (
                    <div key={si} style={{ display: "flex", gap: 12, padding: "3px 0", borderBottom: si < ph.slots.length - 1 ? `0.5px solid ${EC.border}` : "none" }}>
                      <div style={{ fontFamily: EC.mono, fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: EC.dim, minWidth: 110, flexShrink: 0, paddingTop: 1 }}>{lbl}</div>
                      <div style={{ fontSize: 11.5, color: val ? (lbl === "Parameters" ? EC.gold : "#3A3020") : EC.dim2, fontStyle: val ? "normal" : "italic", fontFamily: lbl === "Parameters" ? EC.mono : "inherit", lineHeight: 1.5 }}>
                        {val || "— Empty"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prompt block */}
                <div style={{ background: "#1A1814" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderBottom: "0.5px solid #2A2420" }}>
                    <span style={{ fontFamily: EC.mono, fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7A6A50" }}>Ready to paste</span>
                    <button
                      onClick={(e) => copyToClipboard(ph.prompt, e.target)}
                      style={{ fontFamily: EC.mono, fontSize: 9, padding: "4px 12px", background: "#2A2420", border: "0.5px solid #4A4035", borderRadius: 3, color: "#C8BAA0", cursor: "pointer" }}>
                      Copy
                    </button>
                  </div>
                  <div style={{ fontFamily: EC.mono, fontSize: 10, color: "#C8BAA0", padding: "12px 14px", lineHeight: 1.75, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {ph.prompt}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Collection-wide note */}
        {active === 0 && (
          <>
            <div style={{ height: 1, background: EC.border, margin: "24px 0" }} />
            <div style={{ background: EC.goldPale, border: `0.5px solid ${EC.goldBorder}`, borderRadius: 5, padding: "14px 18px" }}>
              <div style={{ fontFamily: EC.mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: EC.gold, marginBottom: 8 }}>Collection-Wide Rules</div>
              <div style={{ fontSize: 12, color: "#5A4F3E", lineHeight: 1.8 }}>
                ◦ <strong>No LED</strong> except The Rhinelander Garland (center zone only)<br />
                ◦ <strong>No frosting on pine</strong> — matte dark green throughout, no frost on tips<br />
                ◦ <strong>No metallic or brass</strong> — tobacco, tartan, ivory only. Lacquered berry is the only high-sheen element<br />
                ◦ <strong>Silence arc 1–4 o'clock</strong> on all wreath products — completely bare, not sparse<br />
                ◦ <strong>All wreath products use --s 100</strong> · All garland and swag products use <strong>--s 50</strong><br />
                ◦ <strong>Anteroom Wreath is the DNA source</strong> — once locked, use its render as --sref for all subsequent products<br />
                ◦ <strong>Tartan runs through every product</strong> — velvet + tartan layered on wreaths and garland, tartan only on the Settee Ring (too small for layered bow). This is the collection thread
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
