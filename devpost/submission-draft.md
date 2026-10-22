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
Dual-engine negotiation copilot: zero-latency local redlines + Google Gemini AI adversarial sparring and contract clause audits to equalize high-stakes career and venture deals.
```
*(181 / 200 characters used)*

---

## Step 2: Project Details

*(Copy and paste each markdown section below directly into Devpost's rich-text story editor)*

### Inspiration
In career and venture negotiations, the biggest disadvantage isn't lack of talent—it's information and leverage asymmetry:
- A junior founder receiving an email from a lead investor delaying a wire date by 4 weeks feels pressured to say: *"No problem at all, take your time!"* — signaling desperation and weakening their valuation.
- A senior engineer receiving an offer with a rigid base salary cap accepts it without realizing 85% of compensation leverage lives in performance bonuses, accelerated equity vesting, and sign-on incentives.
- A contractor or consultant signs an agreement containing hidden gotchas—like unilateral IP forfeiture or indefinite indemnification clauses buried on page 14.

Most negotiation advice is either overly theoretical or locked behind expensive corporate lawyers and executive coaches costing $500/hour. Generic chatbots output polite, generic summaries that actually dilute your leverage. We built **Leverage** to put an elite executive coach, corporate strategist, and contract watchdog right into the user's browser—private, local-first, zero-latency, and backed by Google Gemini 3.5 Flash for infinite, unscripted sparring.

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

2. **Objection Simulator (Live Meeting Prep + Gemini Sparring):**
   - Simulates high-pressure investor and hiring manager pushback (*"Your burn rate is too high for this round"*, *"Our base salary band is non-negotiable"*).
   - **Google Gemini 3.5 Flash Sparring Engine:** Users can input any unscripted pushback from an actual counterpart. Gemini generates 3 tailored tactical counter-frames with structured JSON intelligence:
     - **Direct Answer:** Neutralizes defensive panic and validates reality without conceding.
     - **Pivot Frame:** Shifts the conversation from cost/limitation to ROI and enterprise value.
     - **High Ground Question:** Puts constructive pressure back onto the counterpart.

3. **Clause Radar (Contract Gotcha Scanner & AI Clause Auditor):**
   - Scans term sheets, employment agreements, and advisory contracts for predatory provisions.
   - **Instant Pattern Radar:** Flags high/medium hazard patterns (perpetual non-competes, broad IP assignment, unvetted clawbacks).
   - **Gemini Contract Clause Audit:** Paste any custom contract paragraph, NDA clause, or equity agreement. Gemini evaluates the legal hazard level, unmasks hidden loopholes, and generates a ready-to-paste **Equitable Counter-Clause**.

4. **Interactive Executive Guide:**
   - A contextual spotlight overlay with focus cutout that guides first-time users through their first scenario step-by-step.

---

### How We Built It
- **Architecture:** Hybrid dual-engine single-page application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.
- **Deterministic Strategic Kernel (`synthesisEngine.ts`):** 
  - Engineered a mathematical matrix that maps multi-dimensional negotiation postures (`Firmness` × `Diplomacy` × `Scenario Context`) into surgical syntactic transformations.
  - Generates token-level diff trees displaying atomic strikethroughs and additions with zero network roundtrip latency.
- **Google Gemini 3.5 Flash Integration (`geminiService.ts`):**
  - Integrated Google's latest **Gemini 3.5 Flash** model with strict JSON schema outputs (`responseMimeType: 'application/json'`) for real-time adversarial sparring and custom contract audits.
  - Client-side direct connection architecture: users' confidential negotiation context stays in their browser session and talks directly to Gemini via user-supplied API key, with built-in instant offline fallback simulation for judges without keys.
- **Swiss Editorial Design System:** Custom-crafted typography and color architecture using warm Alabaster backgrounds (`#FBFBF9`), deep Slate typography (`#121212`), Crimson callouts (`#DC2626`), and Sage accents (`#15803D`) to evoke the calm rigor of a Swiss legal dossier.
- **Clipboard & Telemetry Engine:** Modern Clipboard API integration with optimistic tactile state resets, persistent persona switching (Founder vs. Career), and high-contrast accessible spotlight beacons.

---

### Challenges We Ran Into
1. **Zero-Latency Diff Synthesis:** Naive diff generation or cloud LLM calls introduce 1–3 second latency, breaking the tactile "instrument" feel when dragging sliders. We solved this by separating the deterministic 0ms slider engine from the on-demand generative Gemini sparring engine.
2. **Predictable AI Outputs Under High Pressure:** Contract terms and high-stakes pushback require rock-solid structural answers. We enforced Gemini's structured output schema to guarantee reliable Direct Answer, Pivot Frame, High Ground Question, and Equitable Counter-Clause fields.
3. **Privacy in High-Stakes Negotiations:** Career and fundraising negotiations involve strictly confidential financial data and compensation numbers. Leverage executes 100% locally in the browser with direct client-to-Gemini telemetry—zero intermediate database logging.
4. **Spotlight Cutout UX:** Crafting an uncluttered onboarding experience that guides users through complex negotiation telemetry without blocking underlying cards or controls. We implemented a dynamic 9999px cut-out box shadow overlay with right-aligned badges.

---

### Accomplishments That We're Proud Of
- **Dual-Engine Balance:** Moving the Firmness and Diplomacy sliders feels as immediate and tactile as tuning a hardware synthesizer (0ms latency), while the Gemini 3.5 Flash integration provides infinite depth for real-world unscripted objections and contracts.
- **True Privacy & Security:** Client-side first; no confidential negotiation drafts or salary numbers are logged to a remote database.
- **All Three Pillars Functional:** Shipped the full vision: Subtext Equalizer, Objection Simulator, and Clause Radar, complete with real-world scenarios, AI sparring, and one-click export workflows.
- **Refined Editorial Polish:** Avoided standard generic dashboard bloat; achieved a clean, authoritative executive aesthetic.

---

### What We Learned
- **The Psychology of Leverage:** Small syntactic concessions (*"If that works for you"*, *"Sorry to bother you"*) subconsciously cede control to counterparties. Framing counter-proposals with mutual contingencies (*"To ensure we hit the Q3 deployment milestone, we require confirmation by Thursday 5 PM"*) preserves goodwill while commanding respect.
- **Prompt Engineering for Counter-Framing:** Fine-tuning the adversarial prompts in Gemini 3.5 Flash to avoid cliché corporate speak and produce sharp, respectful, executive-grade responses.

---

### What's Next for Leverage
- **Browser Extension for Gmail & LinkedIn:** In-line subtext warnings as you type outbound emails or messages to recruiters and investors.
- **PDF Term Sheet & Employment Contract Import:** Direct drag-and-drop parsing of multi-page agreements into Clause Radar.
- **Voice Objection Sparring Mode:** Real-time audio pitch simulator with interactive speech-to-text to practice objection responses out loud before investor partner meetings.

---

### Built With (Devpost Tags)
gemini-api, google-genai, google-gemini, react, typescript, vite, tailwind-css, local-first, diff-engine, ux-design, negotiation-science, career, venture-capital

---

### Try It Out (Submission Links)
- **GitHub Repository:** *(Insert your public repo URL here)*
- **Live Demo / Web App:** *(Insert your deployed URL e.g. Vercel/Netlify, or `http://localhost:5173` instructions)*

---

## Step 3: Complete 90-Second Demo Video Script

> **Video Duration:** ~90 seconds (Max allowed: 2 minutes)  
> **Format:** Screen capture of the live app + voiceover (no slides, direct product walkthrough).  
> **Dedicated Script File:** An expanded teleprompter-style version with visual cues placed directly above each spoken line is available in [`devpost/demo-video-script.md`](file:///c:/Users/mirac/Documents/company%20docs/devpost%20hackathon/devpost-new/devpost/demo-video-script.md).

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
       | Leverage Index climbs to 88."             |
--------------------------------------------------------------------------------
0:40   | Click 'Clean Dispatch' button.            | "Switching to Clean Dispatch view gives me
       | Click 'Copy Dispatch'. Button animates:   | a polished, send-ready message. One click
       | 'Copied to Clipboard ✓'.                  | copies it directly to my clipboard."
       | Expand 'Tactical Debrief' drawer below.   | "And expanding the Tactical Debrief explains
                                                   | the psychological leverage behind every sentence."
--------------------------------------------------------------------------------
0:52   | Click 'Objection Simulator' in top bar.   | "Next: high-stakes meetings. In the Objection
       | Show curated counter-frames.              | Simulator, founders get battle-tested frames.
       | Click '+ AI Custom Pushback'.             | Even better: with our Google Gemini 3.5 Flash
       | Enter: 'We want 25% equity or we walk'.   | integration, you can spar against ANY custom
       | Click 'Generate AI Counters'.             | pushback. Gemini delivers a Direct Answer, a Value
       | 3 AI frames appear instantly.             | Pivot, and a High-Ground Question."
--------------------------------------------------------------------------------
1:10   | Click 'Clause Radar' in top bar.          | "Finally, Clause Radar scans contracts for
       | Click 'Custom AI Audit' tab.              | predatory gotchas. Paste any custom contract clause,
       | Click 'Run Gemini Audit'.                 | and Gemini 3.5 Flash evaluates the risk, exposes
       | Shows risk rating, loophole explanation,  | loopholes, and generates an equitable counter-clause
       | and 1-click counter-clause copy.          | ready to drop into redlines."
--------------------------------------------------------------------------------
1:23   | Click 'Gemini AI' status pill in header   | "Leverage connects directly to Gemini client-side
       | showing API key control.                  | with total privacy.
       | Return to clean workspace.                | Equalize the table. That is Leverage. Thank you!"
================================================================================
```

---

## Step 4: Submission Checklist Before Finalizing

- [ ] Project Name pasted (`Leverage — High-Stakes Career & Venture Copilot` or `Leverage`)
- [ ] Elevator pitch pasted (181 / 200 characters)
- [ ] Project details sections copied into story editor
- [ ] GitHub repository is **Public** and contains clean commits
- [ ] Demo video recorded (under 2 minutes, uploaded to YouTube / Loom / Vimeo) and link pasted
- [ ] Built With tags added (`gemini-api`, `google-genai`, `google-gemini`, etc.)
- [ ] Click **Save & Continue**, review preview, and click **Submit Project**!

