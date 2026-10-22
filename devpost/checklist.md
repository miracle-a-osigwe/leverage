---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn mode

## Slices

- [x] **1. Project Scaffold, Swiss Editorial Theme & Interactive Subtext Equalizer (The Kernel)**
  Becomes usable: A running Vite + React + Tailwind app in the Swiss Editorial alabaster theme with telemetry header, persona switch (Founder/Employee), preset chips, and the flagship Subtext Equalizer. Moving Firmness and Diplomacy sliders instantly recalculates the Live Redline (crimson strikethroughs + sage insertions) and updates the Leverage Index in real time.
  Why now: Bootstraps the application and proves the core kernel on the very first slice — scaffold, UI tokens, diff engine, reactive sliders — so every later slice has somewhere solid to land.
  PRD ref: `prd.md > Features and Behavior (1. Subtext Equalizer & Live Redline)`, `prd.md > Screens and Layout`
  Spec ref: `spec.md > Components (1. TelemetryBar, 2. DocumentWorkspace)`, `spec.md > Stack`, `spec.md > File Structure`
  Build: Scaffold React + Vite + TypeScript + Tailwind CSS project with Swiss Editorial palette. Implement `synthesisEngine.ts`, `TelemetryBar.tsx`, `RedlineViewer.tsx`, and `PresetSelector.tsx` in `App.tsx`.
  Verify (mechanical): Run `npm run build` with zero TypeScript/lint errors; start dev server and verify 0ms reactive redline updates and Leverage Index calculation.
  Learner check: Open http://localhost:5173, click "Founder: Late Investor Wire", move the Firmness and Diplomacy sliders, and verify that the redline strikethroughs, insertions, and Leverage Index update smoothly.
  Commit: `Add project scaffold and interactive Subtext Equalizer with live redline`

- [x] **2. Clean Dispatch View, Tactical Debrief Drawer & 1-Click Clipboard Export**
  Becomes usable: ViewSwitcher toggles between Live Redline and Clean Dispatch View, collapsible Tactical Debrief drawer explains the strategic negotiation rationale, and 1-click Copy Dispatch provides animated visual feedback.
  Why now: Closes the primary user loop from analysis to send-ready export, fulfilling the complete journey for the flagship scenario.
  PRD ref: `prd.md > The Core Journey (steps 5-7)`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components (CleanDispatchView, TacticalDebriefDrawer)`
  Build: Implement `CleanDispatchView.tsx` with one-click clipboard copy and temporary "Copied to Clipboard ✓" state; implement `TacticalDebriefDrawer.tsx` detailing the psychological leverage rationale.
  Verify (mechanical): Run `npm run build`; verify tab switching between Redline and Clean Dispatch; test clipboard write helper and state reset.
  Learner check: Click "Clean Dispatch", click "Copy Dispatch", verify the copied text in your paste buffer, and expand the Tactical Debrief drawer to view the rationale.
  Commit: `Add Clean Dispatch view, tactical debrief drawer, and clipboard export`

- [x] **3. Objection Simulator with Adversarial Counter-Frames**
  Becomes usable: Pillar 2 tab active with adversarial pushback cards (Founder valuation/burn rate; Employee non-negotiable salary cap) and 3 structured counter-frames (Direct Answer, Pivot Frame, High Ground Question).
  Why now: Proves the second pillar of high-stakes preparation, expanding user capabilities without complicating the core state.
  PRD ref: `prd.md > Features and Behavior (2. Objection Simulator)`
  Spec ref: `spec.md > Components (3. ObjectionSimulator)`, `spec.md > Data Model`
  Build: Create `src/data/objectionPresets.ts` and `src/components/ObjectionSimulator.tsx`; wire tab switching in `App.tsx` and connect persona synchronization.
  Verify (mechanical): Run `npm run build`; verify tab activation, persona filtering (Founder vs. Employee), and rendering of all 3 counter-frame cards.
  Learner check: Click the "Objection Simulator" tab, toggle between Founder and Employee personas, and confirm the adversary objection and 3 counter-frames display clearly.
  Commit: `Add Objection Simulator with adversarial meeting counter-frames`

- [x] **4. Clause Radar Contract Gotcha Scanner & Counter-Clause Generator**
  Becomes usable: Pillar 3 tab active with contract clause snippet scanner, Red/Amber/Green hazard flags, and 1-click equitable counter-clauses with copy actions.
  Why now: Completes the full 3-pillar product vision for the 1st-place submission, delivering a comprehensive high-stakes negotiation copilot.
  PRD ref: `prd.md > Features and Behavior (3. Clause Radar)`
  Spec ref: `spec.md > Components (4. ClauseRadar)`, `spec.md > Data Model`
  Build: Create `src/data/clausePresets.ts` and `src/components/ClauseRadar.tsx`; integrate with `App.tsx` and add copy-to-clipboard actions.
  Verify (mechanical): Run `npm run build`; verify clause risk highlighting, category badges, and counter-clause generation.
  Learner check: Click the "Clause Radar" tab, review the highlighted contract hazard, and click "Copy Counter-Clause" to verify the equitable replacement.
  Commit: `Add Clause Radar contract gotcha scanner and counter-clause generator`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Slice 1 Subtext Equalizer and live redline verified
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — dual-engine AI architecture practice
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: All 4 slices built and verified mechanically (`npm run build` passing cleanly) and interactively. Added Google Gemini 3.5 Flash client-side integration for unscripted adversarial pushback sparring and arbitrary contract clause risk audits. Added Swiss Editorial AISettingsModal with localStorage key persistence and mock demo fallback. Generated `devpost/app-map.html`.
Route and stops: `src/engine/synthesisEngine.ts`, `src/services/geminiService.ts`, `src/components/DocumentWorkspace.tsx` and `src/App.tsx`.
Edit outcome: Kept; verified via Vite production bundle and clean dev server reload.
Reflection: Dual-engine architecture: combining 0ms local deterministic state with asynchronous LLM sparring for zero-latency UI responsiveness.
Activity mode: Live app and editor, standalone app map.

## Revisions

- Revision 1: Added Google Gemini 3.5 Flash AI integration to Objection Simulator (`src/components/ObjectionSimulator.tsx`) and Clause Radar (`src/components/ClauseRadar.tsx`) with client-side direct calls, structured JSON outputs, and fallback demo simulations.
- Revision 2: Added `src/components/AISettingsModal.tsx` and header telemetry trigger to allow judges and users to supply their own Gemini API keys directly in the browser with full privacy.
- Revision 3: Added dynamic linguistic raw baseline calibration engine (`computeRawBaseline` in `src/engine/synthesisEngine.ts`) to compute unique baseline firmness, diplomacy, and leverage scores across any scenario preset or custom user text before Leverage transformations, with live delta telemetry, baseline diagnostic summaries, and 1-click Auto-Equalize in `src/components/DocumentWorkspace.tsx`.
