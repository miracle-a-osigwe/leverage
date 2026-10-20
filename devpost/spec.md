---
doc: spec
status: approved
---

# Leverage — Technical Specification

The blueprint for building the high-stakes communication, meeting prep, and contract review copilot for founders and career professionals under pressure.
Implements: `prd.md` and `scope.md`.

## How This Works, In Plain Language
Leverage is a client-side reactive single-page application designed for instant, zero-latency feedback during high-stakes communication moments.
Instead of sending sensitive message drafts across remote networks or waiting for slow LLM responses while dragging UI sliders, Leverage runs a local **Tactical Synthesis Engine**.
As the user pastes text or selects a scenario and moves the **Firmness** and **Diplomacy** calibration sliders, the engine immediately:
1. Scans text for subtext traps (passive-aggression, hedging, unforced concessions).
2. Generates an annotated **Live Redline Diff** that identifies problematic phrases, marks them with strikethroughs and categorized hazard pills, and injects high-leverage executive phrasing.
3. Computes a real-time **Leverage Index** (0–100%) and generates a contextual **Tactical Debrief** explaining the strategic leverage preserved.

All state resides in the local browser session, ensuring absolute privacy, zero authentication friction, and lightning-fast demo evaluation.

## The Core Journey Through the System
Implements `prd.md > The Core Journey`.
1. **User lands on app** → `App.tsx` initializes default state (Persona: `Founder`, Pillar: `Subtext Equalizer`, Sliders: `Firmness: 85%`, `Diplomacy: 90%`).
2. **User selects preset or types draft** → `PresetSelector` fires scenario update into `useNegotiationState` hook.
3. **Engine analyzes input** → `synthesisEngine.ts` processes raw text against the tactical hazard matrix.
4. **User adjusts sliders** → `TelemetryBar` updates `firmness` and `diplomacy` state values in real time (0ms delay).
5. **UI re-renders live views** → `RedlineViewer` renders semantic diff tokens (`del` strikethroughs + `ins` replacements) or `CleanDispatchView` displays send-ready copy.
6. **User copies output** → `Clipboard` helper writes clean dispatch to system clipboard with an animated 2-second confirmation badge.
7. **User navigates to Pillars 2 & 3** → `ObjectionSimulator` or `ClauseRadar` mounts and renders stress-tested counter-frames and contract gotcha scans.

## Stack
* **Runtime / Bundler:** [Vite 6](https://vitejs.dev/) + [React 18/19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
  - *Rationale:* Instant hot-module reloading, ultra-fast production builds, and strict type safety for negotiation state models.
* **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
  - *Rationale:* Direct implementation of our custom Swiss Editorial design tokens (`#fbfaf7` alabaster, `#191817` carbon ink, custom hairlines, and typography hierarchy).
* **Icons:** [Lucide React](https://lucide.dev/)
  - *Rationale:* Lightweight, clean iconography (sliders, copy icons, chevron toggles, shield badges).
* **Diff Engine:** Native tokenized phrase difference mapper (`synthesisEngine.ts`).
  - *Rationale:* Zero external binary dependencies; guarantees clean semantic HTML rendering without broken tags.

## Where It Runs and How Someone Tries It
* **Runtime:** Any modern web browser (Chrome, Edge, Safari, Firefox). Runs locally as a Node.js development server or static web build.
* **Prerequisites:** Node.js v18+ and npm installed.
* **Start Command:**
  ```bash
  npm install
  npm run dev
  ```
* **What to Open:** `http://localhost:5173` in a web browser.
* **Demo Video Script:** 
  1. Open `http://localhost:5173`.
  2. Click preset *"Founder: Late Investor Wire"* or *"Employee: Burnout Grievance"*.
  3. Show inline hazard pills and baseline Leverage Index (28%).
  4. Slide **Firmness** to 85% and **Diplomacy** to 90% → watch the Live Redline update instantly and Leverage Index jump to 94%.
  5. Toggle to **Clean Dispatch** and click "Copy Dispatch".
  6. Switch to **Objection Simulator** and **Clause Radar** to show preloaded scenarios.

## Look and Feel
Implements `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`.
* **Design System:** Swiss Editorial / Executive Confidential Briefing.
* **Colors:**
  - `bg-alabaster`: `#fbfaf7` (primary canvas)
  - `bg-parchment`: `#f3efe6` (secondary cards, panels)
  - `text-ink`: `#191817` (rich carbon ink text)
  - `text-muted`: `#6b665f` (captions, metadata)
  - `border-hairline`: `#e6e0d4` (crisp 1px borders)
  - `badge-hazard`: text `#991b1b`, bg `#fee2e2`, border `#fecaca`
  - `badge-caution`: text `#b45309`, bg `#fffbeb`, border `#fde68a`
  - `badge-leverage`: text `#15803d`, bg `#f0fdf4`, border `#bbf7d0`
* **Typography:** Serif headings (`font-serif`), neutral sans-serif UI controls (`font-sans`), and monospaced telemetry tags (`font-mono`).

## Components

### 1. `TelemetryBar`
Implements `prd.md > Screens and Layout (Top Header & Telemetry Bar)`.
* Manages header branding, persona toggle (`Founder` | `Career Professional`), pillar navigation tabs, dual calibration sliders (`Firmness`, `Diplomacy`), and the circular `LeverageGauge`.
* Talks to: `useNegotiationState`.

### 2. `DocumentWorkspace` (Subtext Equalizer)
Implements `prd.md > Features and Behavior (1. Subtext Equalizer & Live Redline)`.
* Hosts the primary editor surface. Includes:
  - `ViewSwitcher` (Live Redline | Clean Dispatch | Raw Draft).
  - `RedlineViewer` (renders text with inline `<del>` strikethroughs, hazard badges, and `<ins>` additions).
  - `CleanDispatchView` (renders polished executive copy with copy-to-clipboard action).
  - `RawDraftEditor` (textarea for user input).
  - `PresetSelector` (quick-load buttons for realistic scenarios).
  - `TacticalDebriefDrawer` (collapsible cards explaining the leverage strategy).
* Talks to: `synthesisEngine` and `useNegotiationState`.

### 3. `ObjectionSimulator`
Implements `prd.md > Features and Behavior (2. Objection Simulator)`.
* Renders adversarial objection cards (e.g., investor valuation pushback, recruiter salary band cap).
* Displays 3 structured counter-frames: Direct Answer, Pivot Frame, and High-Ground Question.

### 4. `ClauseRadar`
Implements `prd.md > Features and Behavior (3. Clause Radar)`.
* Analyzes contractual clauses (founder vesting clawbacks, non-compete agreements).
* Displays risk severity badges (Red/Amber/Green) and 1-click equitable counter-clauses with copy button.

## Data Model
All models defined in `src/types/index.ts`:

```typescript
export type Persona = 'founder' | 'professional';
export type PillarTab = 'equalizer' | 'objections' | 'clauseRadar';
export type ViewMode = 'redline' | 'clean' | 'raw';

export interface HazardItem {
  id: string;
  phrase: string;
  category: 'passive-aggressive' | 'defensive-hedging' | 'unforced-concession';
  explanation: string;
}

export interface RedlineToken {
  type: 'text' | 'deletion' | 'insertion';
  value: string;
  hazard?: HazardItem;
}

export interface ScenarioPreset {
  id: string;
  title: string;
  persona: Persona;
  rawDraft: string;
  hazards: HazardItem[];
  synthesizedBase: {
    balanced: string;
    firm: string;
    diplomatic: string;
    firmAndDiplomatic: string;
  };
  tacticalNotes: string[];
}

export interface ObjectionScenario {
  id: string;
  title: string;
  persona: Persona;
  adversaryRole: string;
  objectionText: string;
  counterFrames: {
    directAnswer: string;
    pivotFrame: string;
    highGroundQuestion: string;
  };
}

export interface ClauseScenario {
  id: string;
  title: string;
  persona: Persona;
  clauseType: string;
  originalClause: string;
  riskLevel: 'high' | 'medium' | 'standard';
  riskExplanation: string;
  equitableCounterClause: string;
}
```

## File Structure
```
devpost-new/
├── devpost/                         # Devpost learning workspace
│   ├── learner-profile.md
│   ├── scope.md
│   ├── scope.html
│   ├── prd.md
│   ├── prd.html
│   ├── spec.md
│   └── spec.html
├── src/
│   ├── components/
│   │   ├── TelemetryBar.tsx         # Header, persona switch, sliders, gauge
│   │   ├── DocumentWorkspace.tsx    # Equalizer container & view toggles
│   │   ├── RedlineViewer.tsx        # Inline strikethrough & hazard renderer
│   │   ├── CleanDispatchView.tsx    # Send-ready clean view + 1-click copy
│   │   ├── PresetSelector.tsx       # 1-click scenario preset chips
│   │   ├── TacticalDebriefDrawer.tsx# Strategic negotiation rationale
│   │   ├── ObjectionSimulator.tsx   # Meeting objection counter-frames
│   │   └── ClauseRadar.tsx          # Contract gotcha scanner & counter-terms
│   ├── data/
│   │   ├── scenarioPresets.ts       # Presets for founders and employees
│   │   ├── objectionPresets.ts      # Meeting stress-test presets
│   │   └── clausePresets.ts         # Contract review presets
│   ├── engine/
│   │   └── synthesisEngine.ts       # Live redline diff & leverage index engine
│   ├── types/
│   │   └── index.ts                 # Type definitions
│   ├── App.tsx                      # Main application view & tab coordinator
│   ├── index.css                    # Swiss Editorial custom Tailwind tokens
│   └── main.tsx                     # React root mount
├── index.html                       # HTML entry with Newsreader & Inter fonts
├── package.json                     # Dependencies & scripts
├── tailwind.config.js               # Color palette & font definitions
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite bundler config
└── .gitignore                       # Git ignores & secrets protection
```

## External Services and Dependencies
* **No external runtime APIs or paid services required.**
* Everything executes locally inside the browser client. This eliminates API quota exhaustion, network latency, and reviewer friction.
* Dependencies:
  - `react`: `^18.3.1` (or `^19.0.0`)
  - `react-dom`: `^18.3.1` (or `^19.0.0`)
  - `lucide-react`: `^0.460.0`
  - `tailwindcss`: `^3.4.15`
  - `vite`: `^6.0.0`

## Important Failure Modes
1. **Empty Custom Input:** User clears the input box entirely → UI gracefully renders the welcoming state with instant-load preset chips rather than an empty crash.
2. **Zero Hazards Detected:** User types a clean, safe message → UI renders a calming green confirmation card: *"Zero leverage hazards detected — clear and ready to dispatch (Leverage: 98%)"*.
3. **Clipboard Permission Denied:** Browser blocks clipboard API write → UI falls back to an inline selection modal allowing manual copy with a single keystroke (`Ctrl+C`).

## What Was Simplified and Why
* **Deterministic Tactical Engine instead of remote LLM calls on every slider tick:** Dragging sliders over network APIs causes 3–5 second delays, laggy UI, and potential rate-limit crashes. The client-side tactical engine guarantees instant 60fps responsiveness during the demo video.
* **Preloaded High-Stakes Presets instead of complex multi-page PDF document upload:** PDF parsing often mangles text columns and introduces layout edge cases; structured clause snippets demonstrate contract gotchas cleanly and reliably.

## Decisions and Open Issues
* **Decision:** React + Vite + Tailwind CSS selected for maximum speed, type safety, and component clarity.
* **Decision:** Swiss Editorial Alabaster design system selected to distinguish the project from dark-mode SaaS entries.
* **One Technical Unknown Clarified:** We verified that tokenized inline diffing (`del` strikethrough in crimson + `ins` in sage green) avoids broken HTML tags and delivers immediate visual comprehension in the 1-minute demo video.
