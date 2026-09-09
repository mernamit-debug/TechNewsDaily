# Spark News Live — Headless Intelligence Web Portal

A high-signal executive intelligence portal and daily investigative news digest engineered with a headless, data-driven architecture. Every edition is 100% defined by structured JSON data files.

---

## 🚀 Adding a New Edition via JSON (1-Minute Workflow)

To publish a brand new daily edition, **no frontend code changes are needed**. The entire application — masthead, radar KPIs, cheat sheet, lead investigative anchor, 3D engineering lab, company spotlight, quick hits, case study deep dive, executive wager, micro-quiz, and easter egg — is completely dynamically rendered from your JSON file.

### Step 1: Create the Issue File
Create a new file in `data/issues/` named with the publication date:
```bash
data/issues/YYYY-MM-DD.json
```
*(For example: `data/issues/2026-09-09.json`)*

### Step 2: Populate the Issue Schema
Fill in the structured fields according to the schema:

```json
{
  "meta": {
    "issue_number": 9,
    "date": "2026-09-09",
    "volume": "VOLUME IV",
    "domain": "AI INFRASTRUCTURE",
    "edition": "GLOBAL INVESTIGATIVE BRIEFING"
  },
  "radar_kpis": {
    "baseload_nuclear": "3.4 GW",
    "transformer_lead_time": "190 WKS",
    "optical_bandwidth": "3.8 Tbps",
    "target_pue": "1.04",
    "sni_rating": "9.9 / 10"
  },
  "cheat_sheet": [
    "Key Shift 1: Summary of critical technological or structural change.",
    "Key Shift 2: Second decisive development in compute, energy, or silicon."
  ],
  "lead_story": {
    "kicker": "LEAD INVESTIGATIVE ANCHOR",
    "headline": "Lead Story Title Highlighting Core Tension or Breakthrough",
    "catch_up": "Detailed 2-3 paragraph investigative analysis breaking down the technical and financial realities.",
    "analogy": "An intuitive physical or engineering bridge translating complex mechanics into clear intuition.",
    "pr_claim": "The polished corporate press release claim.",
    "pr_reality": "The unvarnished, physics-grounded investigative audit.",
    "bull_take": "The upside investment thesis.",
    "bear_take": "The physical bottleneck or regulatory vector.",
    "why_it_matters": "Strategic macro significance for executives and engineers.",
    "cocktail_flex": "Memorable quip summarizing the core insight.",
    "image_url": "https://example.com/schematic.png",
    "image_caption": "Figure 1.1: System architecture schematic"
  },
  "interactive_model": {
    "archetype": "semiconductor_die",
    "title": "2nm Gate-All-Around (GAA) & Backside Power (BSPDN)",
    "subtitle": "Interactive 3D Sub-Micron Silicon Die, GAA Channels & Power Rails",
    "badge": "SEMICONDUCTOR PHYSICS // 3D INTERACTIVE LAB",
    "controls": [
      { "id": "voltage", "label": "Vdd Core Voltage", "min": 0.5, "max": 1.2, "step": 0.05, "value": 0.75, "unit": "V" }
    ],
    "metrics": [
      { "id": "gate_delay", "label": "Gate Switching Delay", "value": "1.12 ps" }
    ]
  },
  "deep_dive": {
    "kicker": "SECTION 3 // DETAILED CASE STUDY ANALYSIS",
    "headline": "Comprehensive Technical & Financial Case Study",
    "thesis": "In-depth investigative narrative dissecting thermodynamics, supply chains, and market dynamics.",
    "physics_breakdown": "Rigorous breakdown of the physical laws governing the system.",
    "image_url": "https://example.com/deepdive-schematic.png",
    "image_caption": "Figure 1.2: Deep dive architectural blueprint",
    "matrix": {
      "mechanism": "Physical driver or catalytic mechanism",
      "audit": "Financial, operational, and supply-chain audit",
      "cascades": "Second-order market and industry consequences",
      "sni": "9.9 / 10"
    },
    "takeaway": "Decisive strategic conclusion."
  },
  "company_spotlight": {
    "company": "NextGen Systems",
    "ticker": "NASDAQ: NXGN",
    "market_cap": "$180B",
    "summary": "Strategic overview of the company's positioning and recent strategic vector.",
    "metrics": {
      "velocity": "9.8 / 10",
      "capex": "$14.2B Annualized",
      "moat": "Silicon IP & Monolithic Packaging",
      "regulatory": "Export Controls & Grid Compliance"
    },
    "takeaway": "Definitive takeaway on enterprise positioning."
  },
  "quick_hits": [
    {
      "tag": "GRID INFRASTRUCTURE",
      "headline": "Regional Grid Operator Imposes 500MW Interconnection Moratorium",
      "facts": "PJM halts new high-voltage datacenter tap requests until Q3 2027.",
      "sni": "9.6",
      "why_it_matters": "Hyperscalers forced into behind-the-meter generation.",
      "ticker": "CEG",
      "shift": "▲ 4.2%",
      "source": "FERC Docket #ER26-104"
    }
  ],
  "executive_wager": {
    "question": "Will behind-the-meter nuclear co-location receive standard FERC approval by year-end?",
    "consensus_yes_pct": 34,
    "consensus_no_pct": 66,
    "analysis": "Regulatory pushback highlights cost socialization concerns among public rate-payers."
  },
  "micro_quiz": [
    {
      "id": "q1",
      "question": "What is the primary physical bottleneck in backside power delivery networks (BSPDN)?",
      "options": [
        "Wafer thinning thermal dissipation and contact resistance",
        "Higher optical interconnect signal attenuation",
        "Excessive inductive cross-talk on memory buses"
      ],
      "answer": 0,
      "explanation": "Wafer thinning down to sub-100nm limits thermal conductivity and demands nanoscale through-silicon via (TSV) precision."
    }
  ],
  "easter_egg": {
    "secret_code": "BSPDN",
    "discovery_text": "Enter the silicon transistor packaging breakthrough to decrypt classified intelligence.",
    "bonus_insight": "Foundry yields on 2nm GAA with Backside Power are tracking 18 months ahead of projected industry roadmaps."
  }
}
```

### Step 3: Auto-Update the Index & Validate
Run the automated manifest synchronizer and schema validator:
```bash
# Automatically detects all issues in data/issues/, updates manifest.json and issues.json
npm run manifest

# Validates all issue files for schema completeness and syntax errors
npm run validate
```

Once committed or pushed to your repository, the web portal automatically displays the newest edition as the active hero briefing, adds it to the archive dropdown selector, updates the scrubber pills, and wires it into the keyboard navigation (`[` and `]`).

---

## 🧊 3D Hardware Lab Archetypes

The 3D Engineering Lab dynamically initializes one of 10 canonical WebGL physical archetypes dictated by `"archetype"` in `interactive_model`:

| Archetype Key | Domain / Focus | Key 3D Components |
|---|---|---|
| `semiconductor_die` | Advanced Silicon, ASICs & Packaging | Sub-micron Silicon Die, Logic Cores, HBM4 Stacks, Substrate, Heat Spreader |
| `server_rack` | AI Supercomputing & Datacenter Compute | 42U Heavy Chassis, Compute Blades, Liquid Manifolds, Busbars, Cable Harnesses |
| `power_transformer` | Grid Substation & Transformers | Laminated Magnetic Core, HV Windings, Porcelain Bushings, Cooling Radiators |
| `rotary_actuator` | Humanoid Robotics & Turbines | Stator Coils, Halbach Rotor, Strain-Wave Gear, Cross-Roller Bearing |
| `reactor_vessel` | SMRs & Nuclear Fission Cores | Forged Steel Pressure Vessel, Core Basket, Fuel Bundles, Control Rod Drives |
| `energy_storage` | Utility-Scale BESS & Storage | 40ft ISO Container, LFP Battery Racks, Liquid Chiller, DC Disconnects |
| `optical_transceiver` | Photonic Switching & CPO | Silicon Photonic PIC, Micro-Laser Array, MT Fiber Ribbon, Heat Slug |
| `lattice_tower` | High-Voltage Transmission Pylons | Galvanized Steel Mast, Cantilever Crossarms, Glass Insulators, ACSR Bundles |
| `fluid_manifold` | Cryogenic Liquid Cooling & Valves | Billet Manifold Block, Proportional Servo Valves, Insulated Quick-Disconnects |
| `satellite_bus` | Orbital Compute & Space Hardware | Hexagonal Honeycomb Bus, GaAs Solar Arrays, Star Tracker, Phased-Array Panel |

---

## 🐙 GitHub & GitHub Pages Deployment Readiness

This repository is pre-configured for deployment to **GitHub Pages** or any static hosting service (Cloudflare Pages, Vercel, Netlify):

1. **Pure Client-Side Zero-Dependency SPA**:
   The application runs directly in modern browsers using native ES6+ and WebGL (Three.js bundled in `vendor/`). No backend server or Node.js runtime is strictly required for production serving.

2. **Strict Relative Path Resolution (`./`)**:
   All asset links, scripts, stylesheets, and data fetch targets use strict relative paths (`./data/manifest.json`, `./styles.css`, etc.), guaranteeing compatibility with GitHub project pages deployed under subpaths (e.g. `https://<username>.github.io/<repo-name>/`).

3. **`.nojekyll` Included**:
   A `.nojekyll` file is present in both the root and `dist/` directories to prevent GitHub Pages from attempting Jekyll processing on JSON issue files.

4. **`404.html` SPA Router Fallback**:
   A lightweight `404.html` fallback handler is present to intercept deep links (`#date=YYYY-MM-DD`) and redirect back to the root `index.html` seamlessly without 404 errors.

5. **Dual Deployment Modes**:
   - **Root Serving (Recommended for GitHub Pages)**:
     Set **Settings → Pages → Source** to `Deploy from a branch` and select `main` / `/ (root)`.
   - **Build Pipeline**:
     Run `npm run build` to package an optimized static distribution into `dist/`.

---

## 🛠️ CLI Commands

| Command | Action |
|---|---|
| `npm run dev` | Launch local development preview server on `http://localhost:3000` |
| `npm run manifest` | Scan `data/issues/` and re-generate `data/manifest.json` and `issues.json` |
| `npm run validate` | Run comprehensive schema check across all daily issue files |
| `npm run build` | Synchronize manifest, validate, and bundle static assets into `dist/` |
| `npm run lint` | Check Node.js syntax and integrity across JavaScript source files |

