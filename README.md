# ⚖️ Leverage — Tactical Negotiation Copilot

> **Equalize the room in high-stakes venture, compensation, and contract negotiations.**  
> Built for the Devpost **Build With AI: Basics** Hackathon. Powered by React 19, TypeScript, and **Google Gemini 3.5 Flash**.

---

## 🎯 What is Leverage?

In career and startup negotiations, the primary disadvantage isn't lack of talent—it's **leverage asymmetry**.
When an investor stalls a wire, an acquirer inserts predatory liquidation overhangs, or a recruiter imposes a hard salary ceiling, counterparties rely on conversational traps and unforced concessions.

**Leverage** is an institutional-grade negotiation copilot designed for founders, technical contributors, and executives. It operates via a **dual-engine architecture**:
1. **Local Deterministic Engine:** Real-time syntax parser that instantly detects defensive language, unassertive hedging, and unforced concessions, generating live redlines with zero latency.
2. **Google Gemini 3.5 Flash Copilot:** Live adversarial sparring partner and contract gotcha auditor that generates counter-frames and balanced bilateral clauses.

---

## ✨ Key Capabilities

| Module | Purpose | Engine |
| :--- | :--- | :--- |
| **Subtext Equalizer** | Live interactive redlining of email/message drafts. Striking out apologies in crimson, inserting firm deadlines in sage green, and computing real-time **Leverage Index** (0–100). | Local Client-Side Kernel |
| **Tactical Debrief & Clean Dispatch** | Game-theoretic breakdown of unforced concessions + one-click sanitized dispatch to clipboard. | Local Client-Side Kernel |
| **Objection Simulator** | Practice live meeting pushback against aggressive VC and HR tactics (e.g. burn rate critique, down-rounds, salary bands). Features bespoke AI counter-generation. | Google Gemini 3.5 Flash |
| **Clause Radar** | Audit venture term sheets and executive contracts for predatory asymmetry (forfeiture, non-competes, liquidation overhangs) and draft bilateral counter-provisions. | Google Gemini 3.5 Flash |

---

## 📜 Devpost Learn Skill Planning Artifacts

Per hackathon requirements, this project was planned and executed using the official **Devpost Learn Skill Pack**. All verified planning docs are included in the repository:

- 📋 [**Scope Document**](devpost/scope.md) (`devpost/scope.md` & `devpost/scope.html`) — Kernel definition, target users, and Proof-of-Concept boundaries.
- 📐 [**Product Requirements Document (PRD)**](devpost/prd.md) (`devpost/prd.md` & `devpost/prd.html`) — User journeys, state transitions, and acceptance criteria.
- 🛠️ [**Technical Specification**](devpost/spec.md) (`devpost/spec.md` & `devpost/spec.html`) — System architecture, state machine, and data models.
- 🗺️ [**Interactive App Map**](devpost/app-map.html) (`devpost/app-map.html`) — Visual system walkthrough and dual-engine dataflow.
- ✅ [**Build Verification Checklist**](devpost/checklist.md) (`devpost/checklist.md`) — Incremental build slices, test verifications, and revision history.

---

## 🔒 Security & Privacy

- **Client-Side Local Storage:** Your drafts, scenarios, and API keys are stored strictly in your browser session (`localStorage`).
- **Zero Remote Leakage:** Negotiation drafts never touch a middleman server or third-party database.
- **Fail-Safe Demo Mode:** If evaluated without an API key, the built-in deterministic simulator provides 100% functional demo responses so judges can evaluate the app friction-free.

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js `v18+` (recommended `v20` or `v22`)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/leverage.git
cd leverage

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

### (Optional) Gemini API Key Setup
Leverage works out of the box with built-in realistic demo data. To enable live Google Gemini 3.5 Flash generation:
1. Click the **AI Engine** button in the header bar.
2. Enter your Google Gemini API Key (saved locally in your browser).
3. Alternatively, copy `.env.example` to `.env` and set `VITE_GEMINI_API_KEY=your_key_here`.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS (Swiss Editorial typography & design system)
- **Icons:** Lucide React
- **AI Intelligence:** Google Gemini 3.5 Flash API (`v1beta`)
- **State Management:** React hooks + localStorage persistence

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
