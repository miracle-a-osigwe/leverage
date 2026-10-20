# Devpost Submission Draft: Leverage

> **Hackathon:** Build With AI: Basics  
> **Target Award:** 1st Place ($1,250)  
> **Status:** Ready to copy-paste into Devpost submission portal

---

## Step 1: Project Overview (General Info)

### Project Name (Max 60 characters)
```text
Leverage — High-Stakes Career & Venture Copilot
```
*(47 / 60 characters used — alternative: `Leverage`)*

### Elevator Pitch (Max 200 characters)
```text
Local-first negotiation copilot that equalizes power dynamics in high-stakes emails, meetings, and contract clauses with live redlines, objection counters, and gotcha scans.
```
*(184 / 200 characters used)*

---

## Step 2: Project Details

*(Copy and paste each markdown section below directly into Devpost's rich-text story editor)*

### Inspiration
In career and venture negotiations, the biggest disadvantage isn't lack of talent—it's information and leverage asymmetry:
- A junior founder receiving an email from a lead investor delaying a wire date by 4 weeks feels pressured to say: *"No problem at all, take your time!"* — signaling desperation and weakening their valuation.
- A senior engineer receiving an offer with a rigid base salary cap accepts it without realizing 85% of compensation leverage lives in performance bonuses, accelerated equity vesting, and sign-on incentives.
- A contractor or consultant signs an agreement containing hidden gotchas—like unilateral IP forfeiture or indefinite indemnification clauses buried on page 14.

Most negotiation advice is either overly theoretical or locked behind expensive corporate lawyers and executive coaches costing $500/hour. Generic chatbots output polite, generic summaries that actually dilute your leverage. We built **Leverage** to put an elite executive coach, corporate strategist, and contract watchdog right into the user's browser—private, local-first, and zero-latency.

---

### What It Does
**Leverage** is a tactical negotiation copilot engineered for high-stakes career and venture moments. Designed around a distraction-free Swiss Editorial aesthetic, Leverage operates across three tactical pillars:

1. **Subtext Equalizer & Live Redlines (Flagship):**
   - Paste any incoming high-stakes email or draft reply.
   - Dual reactive sliders (**Firmness** and **Diplomacy**) recalculate the strategic response in real time (0ms latency).
   - Dynamic diff engine shows **crimson strikethroughs** for unassertive subtext (*"just checking in"*, *"whenever you get a chance"*) and **sage green insertions** that enforce clear deadlines, mutual commitment, and boundary control.
   - Live **Leverage Index** (0–100) dynamically scores negotiating posture, urgency parity, and psychological concession risk.
   - One-click toggle to **Clean Dispatch View** and **Copy Dispatch** with animated clipboard confirmation.
   - Collapsible **Tactical Debrief Drawer** breaking down the psychological rationale, concession avoidance, and frame control behind every sentence.

2. **Objection Simulator (Live Meeting Prep):**
   - Simulates high-pressure investor and hiring manager pushback (*"Your burn rate is too high for this round"*, *"Our base salary band is non-negotiable"*).
   - Equips founders and candidates with three battle-tested counter-frames:
     - **Direct Answer:** Neutralizes defensive panic and validates reality without conceding.
     - **Pivot Frame:** Shifts the conversation from cost/limitation to ROI and enterprise value.
     - **High Ground Question:** Puts constructive pressure back onto the counterpart.

3. **Clause Radar (Contract Gotcha Scanner):**
   - Scans term sheets, employment agreements, and advisory contracts for predatory provisions.
   - Categorizes hazards into high/medium risk (e.g., perpetual non-competes, IP assignment overreach, clawbacks).
   - Generates 1-click **Equitable Counter-Clauses** ready to insert directly into redline negotiations.

4. **Interactive Executive Guide:**
   - A contextual spotlight overlay with focus cutout that guides first-time users through their first scenario step-by-step.

---

### How We Built It
- **Architecture:** Local-first, privacy-first single-page application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.
- **Deterministic Strategic Kernel (`synthesisEngine.ts`):** 
  - Engineered a mathematical matrix that maps multi-dimensional negotiation postures (`Firmness` × `Diplomacy` × `Scenario Context`) into surgical syntactic transformations.
  - Generates token-level diff trees displaying atomic strikethroughs and additions with zero network roundtrip latency.
- **Swiss Editorial Design System:** Custom-crafted typography and color architecture using warm Alabaster backgrounds (`#FBFBF9`), deep Slate typography (`#121212`), Crimson callouts (`#DC2626`), and Sage accents (`#15803D`) to evoke the calm rigor of a Swiss legal dossier.
- **Clipboard & Telemetry Engine:** Modern Clipboard API integration with optimistic tactile state resets, persistent persona switching (Founder vs. Employee), and high-contrast accessible spotlight beacons.

---

### Challenges We Ran Into
1. **Zero-Latency Diff Synthesis:** Naive diff generation or cloud LLM calls introduce 1–3 second latency, breaking the tactile "instrument" feel when dragging sliders. We solved this by designing a client-side strategic matrix that re-evaluates semantic framing and word-level diffs in sub-millisecond time.
2. **Avoiding Tone Extremes:** Finding the precise balance where high firmness doesn't sound combative or hostile, and high diplomacy doesn't sound meek or apologetic. We calibrated each scenario against real-world term sheet correspondence and executive offer negotiations.
3. **Spotlight Cutout UX:** Crafting an uncluttered onboarding experience that guides users through complex negotiation telemetry without blocking underlying cards or controls. We implemented a dynamic 9999px cut-out box shadow overlay with right-aligned badges.

---

### Accomplishments That We're Proud Of
- **Zero-Latency Tactile Control:** Moving the Firmness and Diplomacy sliders feels as immediate and tactile as tuning a hardware synthesizer—instantly revealing how language choices shift bargaining power.
- **True Privacy & Security:** Career and fundraising negotiations involve strictly confidential financial data and compensation numbers. Leverage executes 100% locally in the browser—no confidential negotiation drafts ever touch a third-party server.
- **All Three Pillars Functional:** Shipped the full vision: Subtext Equalizer, Objection Simulator, and Clause Radar, complete with real-world scenarios and one-click export workflows.
- **Refined Editorial Polish:** Avoided standard generic dashboard bloat; achieved a clean, authoritative executive aesthetic.

---

### What We Learned
- **The Psychology of Leverage:** Small syntactic concessions (*"If that works for you"*, *"Sorry to bother you"*) subconsciously cede control to counterparties. Framing counter-proposals with mutual contingencies (*"To ensure we hit the Q3 deployment milestone, we require confirmation by Thursday 5 PM"*) preserves goodwill while commanding respect.
- **State Design for Interactive Diffs:** Managing dual-slider continuous states while calculating word-level visual deltas required clean pure-function decoupling between the strategic policy rules and the rendering layer.

---

### What's Next for Leverage
- **Browser Extension for Gmail & LinkedIn:** In-line subtext warnings as you type outbound emails or messages to recruiters and investors.
- **PDF Term Sheet & Employment Contract Import:** Direct drag-and-drop parsing of multi-page agreements into Clause Radar.
- **Voice Objection Sparring Mode:** Real-time audio pitch simulator with interactive speech-to-text to practice objection responses out loud before investor partner meetings.

---

### Built With (Devpost Tags)
`react`, `typescript`, `vite`, `tailwind-css`, `local-first`, `diff-engine`, `ux-design`, `negotiation-science`, `career`, `venture-capital`

---

### Try It Out (Submission Links)
- **GitHub Repository:** *(Insert your public repo URL here)*
- **Live Demo / Web App:** *(Insert your deployed URL e.g. Vercel/Netlify, or `http://localhost:5173` instructions)*

---

## Step 3: Complete 90-Second Demo Video Script

> **Video Duration:** ~90 seconds (Max allowed: 2 minutes)  
> **Format:** Screen capture of the live app + voiceover (no slides, direct product walkthrough).

```
================================================================================
TIME   | SCREEN ACTION                             | VOICEOVER SCRIPT
================================================================================
0:00   | App loads at http://localhost:5173.       | "In career and venture negotiations, the
       | Mouse hovers over the clean Swiss         | biggest disadvantage isn't skill—it's leverage
       | Editorial header: 'Leverage' and the      | asymmetry. When an investor stalls a wire or
       | Subtext Equalizer.                        | a recruiter caps your salary, most people either
                                                   | sound desperate or overly aggressive.
                                                   | This is Leverage: the high-stakes negotiation
                                                   | copilot built for founders and professionals."
--------------------------------------------------------------------------------
0:15   | Click on the preset chip:                 | "Watch what happens with a real scenario:
       | 'Late Investor Wire'.                     | A lead investor stalls their wire by 4 weeks.
       | Screen shows original apologetic draft:   | The raw draft is passive: 'Take your time,
       | 'Sorry to bother you...'.                 | totally understand.'
       | Firmness is at 30, Diplomacy at 70.       | Leverage Index calculates a weak posture of 34."
--------------------------------------------------------------------------------
0:28   | Drag the 'Firmness' slider from 30 to 85. | "Watch the live redline. As I dial Firmness up,
       | Strikethroughs (crimson) appear over      | Leverage instantly strikes out unassertive
       | weak phrases; sage green insertions       | subtext in crimson and inserts mutual deadlines
       | appear with hard mutual contingencies.    | in sage green. Zero latency, 100% local.
       | Leverage Index climbs to 88.              | The Leverage Index updates in real-time."
--------------------------------------------------------------------------------
0:42   | Click 'Clean Dispatch' button.            | "Switching to Clean Dispatch view gives me
       | Click 'Copy Dispatch'. Button animates:   | a polished, send-ready message. One click
       | 'Copied to Clipboard ✓'.                  | copies it directly to my clipboard."
       | Expand 'Tactical Debrief' drawer below.   | "And expanding the Tactical Debrief explains
                                                   | the psychological leverage behind every sentence:
                                                   | framing delays as a mutual project risk."
--------------------------------------------------------------------------------
0:55   | Click 'Objection Simulator' in top bar.   | "Next: high-stakes meetings. In the Objection
       | Toggle between Founder and Career.        | Simulator, founders practice against pushback like
       | Show 3 counter-frames: Direct Answer,     | 'Your burn rate is too high.'
       | Pivot Frame, and High Ground Question.    | Leverage provides three battle-tested frames:
                                                   | a direct answer, a strategic value pivot,
                                                   | and a high-ground question that puts constructive
                                                   | pressure back on the counterparty."
--------------------------------------------------------------------------------
1:10   | Click 'Clause Radar' in top bar.          | "Finally, Clause Radar: your contract gotcha
       | Show highlighted predatory clause.        | scanner. It flags high-risk clauses in term sheets
       | Click 'Copy Counter-Clause'.              | or employment agreements—like IP forfeiture—
                                                   | and generates equitable counter-clauses you can
                                                   | paste straight into legal redlines."
--------------------------------------------------------------------------------
1:22   | Click 'Guide Me' button to show the       | "Leverage runs 100% locally in your browser.
       | spotlight tour in action, then return     | No private salary or investor emails ever leave
       | to clean workspace.                       | your machine.
                                                   | Equalize the table. That is Leverage. Thank you!"
================================================================================
```

---

## Step 4: Submission Checklist Before Finalizing

- [ ] Project Name pasted (`Leverage — High-Stakes Career & Venture Copilot` or `Leverage`)
- [ ] Elevator pitch pasted (184 / 200 characters)
- [ ] Project details sections copied into story editor
- [ ] GitHub repository is **Public** and contains clean commits
- [ ] Demo video recorded (under 2 minutes, uploaded to YouTube / Loom / Vimeo) and link pasted
- [ ] Built With tags added
- [ ] Click **Save & Continue**, review preview, and click **Submit Project**!
