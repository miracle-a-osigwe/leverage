---
doc: prd
status: approved
---

# Leverage — Product Requirements Document

The high-stakes communication, meeting prep, and contract review copilot for founders and career professionals under pressure.
Source: `scope.md > The Unique Kernel` and `scope.md > Who It's For`.

## The Core Journey
1. **Arrival & Orientation:** User opens the application and sees the Swiss Editorial executive header, current persona (`Founder` by default, togglable to `Career Professional`), and a welcoming prompt with 1-click scenario preset chips.
2. **Input / Scenario Loading:** User pastes an emotionally charged message or clicks a preset chip (e.g., "Late Investor Wire" or "Burnout & Scope Creep Grievance").
3. **Subtext Radiograph Inspection:** Hazardous phrases are instantly flagged with color-coded badges (`[Passive Aggression]`, `[Defensive Hedging]`, `[Unforced Concession]`), setting a baseline Leverage Index (e.g., 28%).
4. **Dual-Axis Calibration:** User adjusts the **Firmness** (0–100%) and **Diplomacy** (0–100%) calibration sliders in the sticky telemetry bar.
5. **Interactive Redline & Dispatch:** The document view re-synthesizes in real time. User inspects the **Live Redline View** (showing crimson strikethroughs and forest sage enhancements) or toggles to **Clean Dispatch View** for send-ready prose.
6. **Tactical Debrief:** User reviews the concise rationale explaining *why* the refined wording protects their leverage.
7. **Export:** User clicks "Copy Dispatch" to copy the pristine message with visual confirmation.
8. **Exploration (Pillars 2 & 3):** User switches tabs to **Objection Simulator** to stress-test high-stakes questions or **Clause Radar** to scan contractual terms for hidden traps.

## Screens and Layout
A unified single-surface workspace with three integrated pillars accessible via top navigation:
1. **Top Header & Telemetry Bar:**
   - Brand mark: `LEVERAGE // HIGH-STAKES COPILOT`
   - Persona Switcher: Pill toggle (`Founder` | `Career Professional`)
   - Pillar Navigation Tabs: `Subtext Equalizer`, `Objection Simulator`, `Clause Radar`
   - Real-time Sliders: `Firmness` (0–100%) and `Diplomacy` (0–100%)
   - Real-time Gauge: `Leverage Index` (0–100% circular / numerical meter)
2. **Primary Document Workspace (Subtext Equalizer):**
   - **View Switcher:** `Live Redline` | `Clean Dispatch` | `Raw Draft`
   - **Interactive Document Card:** Central parchment card rendering editable text or redlined annotations with inline hazard markers.
   - **Quick Presets Bar:** One-click scenario chips below the editor.
   - **Tactical Debrief Drawer:** Collapsible insight panel detailing strategic negotiation rationale.
3. **Objection Simulator Surface:**
   - Scenario selector (e.g. "Burn Rate Concern" / "Salary Band Cap")
   - Adversary objection prompt card with difficulty badge
   - 3 curveball objection beats with high-conviction counter-frames and pivot questions.
4. **Clause Radar Surface:**
   - Contract snippet editor with preloaded clauses ("Founder Clawback / Vesting", "Restrictive Non-Compete")
   - Color-coded risk tags: Red (High Hazard), Amber (Equivocal), Green (Standard)
   - One-click "Equitable Counter-Clause" generator card.

## Look and Feel
Source: `scope.md > Inspiration & Identity`
* **Style:** Swiss Editorial / Executive Confidential Briefing.
* **Color Palette:**
  - Background: Warm Alabaster (`#fbfaf7`) with secondary parchment surfaces (`#f3efe6`)
  - Typography: Deep carbon ink (`#191817`), muted stone (`#6b665f`)
  - Hairline Borders: Crisp architectural lines (`#e6e0d4`)
  - Accents: Deep vermilion crimson (`#b91c1c` / bg `#fef2f2`) for hazards; warm amber-ochre (`#b45309` / bg `#fffbeb`) for caution; deep forest sage (`#15803d` / bg `#f0fdf4`) for leverage.
* **Typography:** Elegant serif titles (Newsreader / Georgia style), clean neutral sans-serif body (-apple-system / Inter), monospaced telemetry tags (JetBrains Mono).
* **Motion & Touch:** Instantaneous reactive updates; tactile sliders with numerical readouts; zero layout jumps.

## Features and Behavior

### 1. Subtext Equalizer & Live Redline
Source: `scope.md > The Unique Kernel`
* Real-time hazard identification for high-risk communication traps:
  - `Passive-Aggressive`: Hidden resentment, sarcastic phrasing.
  - `Defensive Hedging`: Over-apologizing, weakening authority.
  - `Unforced Concession`: Prematurely granting discounts, equity, or commitments without reciprocity.
* Dynamic Dual-Axis Sliders:
  - *Firmness:* Controls assertiveness, boundary enforcement, and clear next steps.
  - *Diplomacy:* Controls tact, professional warmth, and face-saving phrasing.
* Acceptance Criteria:
  - [ ] Moving Firmness or Diplomacy sliders immediately updates the synthesized message.
  - [ ] Live Redline View shows strikethroughs for excised text and sage green for replacements.
  - [ ] Clean Dispatch View displays only the polished output with a 1-click Copy button.
  - [ ] Leverage Index calculates a dynamic score (0–100%) reflecting phrasing strength.

### 2. Objection Simulator
* Generates realistic, adversarial pushback from tough investors or demanding managers.
* Acceptance Criteria:
  - [ ] Selecting a preset instantly populates the adversary objection scenario.
  - [ ] Displays 3 distinct counter-frames: Direct Answer, Pivot Frame, and High-Ground Question.
  - [ ] User can toggle between Founder mode (investor objections) and Professional mode (manager/recruiter objections).

### 3. Clause Radar
* Scans contract clauses for one-sided terms and gotchas.
* Acceptance Criteria:
  - [ ] Highlights hazardous clauses with categorized risk pills (Red/Amber/Green).
  - [ ] Generates an equitable, industry-standard counter-clause with a 1-click Copy button.

## States and Boundaries
* **First Arrival / Welcoming State:** Editor displays an inviting empty state with prominent quick-start chips: *"Try Founder: Late Investor Wire"* and *"Try Employee: Burnout Grievance"*.
* **Active Working State:** Text populated, hazard badges rendered, sliders active, Leverage Index visible.
* **Zero-Hazard / Clean State:** If input contains no hazards (e.g. *"Confirmed for Thursday at 2 PM"*), displays: *"Zero leverage hazards detected — clear and ready to dispatch (Leverage Index: 98%)"*.
* **Copied State:** Clicking "Copy Dispatch" turns button into *"Copied to Clipboard ✓"* for 2 seconds.
* **Persistence:** Session state preserved in local browser memory; no account creation required.

## Product Decisions
* **Live Redline Display over Split-Pane:** Adopted in-place redline to provide immediate visual contrast and high demo comprehension in under 60 seconds.
* **Preset Scenarios First:** Preloading high-stakes scenarios avoids demo friction and ensures instant evaluator gratification.
* **Standalone Client Architecture:** Eliminates auth and backend latency, ensuring 100% reliability for reviewers.

## What We're Building
* Responsive single-page web app with Swiss Editorial alabaster styling.
* Founder & Employee persona switcher.
* Flagship Subtext Equalizer with Live Redline, Clean Dispatch, dual sliders, and dynamic Leverage Index.
* Objection Simulator with 2 high-impact adversarial scenarios and counter-frames.
* Clause Radar with 2 tricky contract clauses and counter-clauses.
* Quick preset chips and 1-click copy functionality.

## Deferred From the POC
* Full multi-page PDF upload / parsing (deferred to keep demo friction-free).
* Audio/voice speech simulator.
* Email client browser extensions (Chrome / Outlook).

## Non-Goals
* General-purpose chat assistant.
* Binding legal advice (app explicitly positions as strategic communication analysis).
* Complex user auth or database accounts.
