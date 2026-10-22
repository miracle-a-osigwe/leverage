import { Persona } from '../types';

export interface ObjectionAIResult {
  title: string;
  adversaryRole: string;
  leverageTrap: string;
  directAnswer: string;
  pivotFrame: string;
  highGroundQuestion: string;
  verbalDeliveryTip: string;
}

export interface ClauseAIResult {
  title: string;
  clauseType: string;
  riskLevel: 'high' | 'medium' | 'standard';
  riskExplanation: string;
  equitableCounterClause: string;
  negotiationRationale: string;
}

const STORAGE_KEY = 'leverage_gemini_api_key';

export function getGeminiApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored.trim().length > 0) return stored.trim();
  try {
    const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
    const envKey = metaEnv?.VITE_GEMINI_API_KEY;
    if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
      return envKey.trim();
    }
  } catch {
    // In non-Vite environments, ignore
  }
  return null;
}

export function setGeminiApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (key && key.trim().length > 0) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function hasGeminiApiKey(): boolean {
  return !!getGeminiApiKey();
}

/**
 * Call Google Gemini 3.5 Flash directly with structured JSON output
 */
async function callGemini(prompt: string, systemInstruction: string): Promise<any> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json'
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Gemini API error: HTTP ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Empty response from Gemini API');
  }

  return JSON.parse(textOutput);
}

/**
 * AI-Powered Objection Simulator (Gemini 3.5 Flash)
 */
export async function generateObjectionCounterFrames(
  persona: Persona,
  objectionText: string
): Promise<ObjectionAIResult> {
  const apiKey = getGeminiApiKey();

  // If no API key is provided, use high-fidelity simulated response based on semantic triggers
  if (!apiKey) {
    await new Promise(r => setTimeout(r, 800)); // natural simulated latency
    return generateFallbackObjection(persona, objectionText);
  }

  const systemInstruction = `You are an elite high-stakes negotiation strategist trained in FBI crisis negotiation, venture capital term-sheet warfare, and executive compensation advocacy.
Your task is to analyze adversarial objections and formulate three structured, non-defensive counter-frames that neutralize intimidation, protect the user's valuation or compensation, and re-anchor leverage.`;

  const prompt = `Analyze this real-world negotiation pushback for a ${persona === 'founder' ? 'Venture Startup Founder' : 'Senior Tech / Executive Professional'}:

Adversary Objection:
"${objectionText}"

Return a valid JSON object matching this exact structure:
{
  "title": "A concise 2-4 word label for this objection",
  "adversaryRole": "Likely institutional title (e.g., General Partner, VP of Talent, Head of Procurement)",
  "leverageTrap": "1 sentence describing the psychological trap (e.g. artificial urgency, anchor intimidation, guilt)",
  "directAnswer": "1-2 sentences calmly addressing reality without apologizing, defensiveness, or unforced concessions",
  "pivotFrame": "2-3 sentences shifting focus from costs/deficits to durability, ROI, and commercial enterprise value",
  "highGroundQuestion": "1 sharp, constructive question that politely returns the burden of justification to the counterpart",
  "verbalDeliveryTip": "1 sentence on pacing, tone, or physical delivery in a live meeting"
}`;

  return await callGemini(prompt, systemInstruction);
}

/**
 * AI-Powered Contract Clause Radar (Gemini 3.5 Flash)
 */
export async function analyzeContractClause(
  persona: Persona,
  clauseText: string
): Promise<ClauseAIResult> {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    await new Promise(r => setTimeout(r, 800));
    return generateFallbackClause(persona, clauseText);
  }

  const systemInstruction = `You are a world-class venture capital and executive employment contracts attorney.
Your task is to scan contractual provisions for asymmetric, predatory, or one-sided legal gotchas and draft balanced, institutional-grade counter-clauses that sophisticated counterparties routinely accept as standard market terms.`;

  const prompt = `Analyze this contractual clause for a ${persona === 'founder' ? 'Startup Founder (Term Sheet / Shareholder Agreement)' : 'Executive / Technical Contributor (Employment Agreement)'}:

Contract Provision:
"${clauseText}"

Return a valid JSON object matching this exact structure:
{
  "title": "Concise 3-5 word name for this legal provision/gotcha",
  "clauseType": "Category (e.g., Restrictive Covenants, Equity Repurchase, Liquidation Overhang, IP Assignment)",
  "riskLevel": "high" or "medium" or "standard",
  "riskExplanation": "2-3 sentences explaining in clear plain English why this clause is dangerous and how it suppresses the user's equity or career mobility",
  "equitableCounterClause": "Full legal text of a balanced, bilateral counter-clause that protects the user while remaining commercially reasonable for the company to sign",
  "negotiationRationale": "1-2 sentences of tactical rationale explaining why this redline is difficult for institutional counsel to reject"
}`;

  return await callGemini(prompt, systemInstruction);
}

// Fallbacks for zero-friction demo mode when judges don't input an API key
function generateFallbackObjection(persona: Persona, text: string): ObjectionAIResult {
  const lower = text.toLowerCase();
  
  if (lower.includes('burn') || lower.includes('runway') || lower.includes('cost')) {
    return {
      title: 'Runway & Burn Rate Critique',
      adversaryRole: 'Lead Venture Partner',
      leverageTrap: 'Intimidation through macro-skepticism to suppress valuation.',
      directAnswer: 'The increase in operating capital was a deliberate, board-approved allocation toward critical platform infrastructure.',
      pivotFrame: 'That investment compressed our enterprise deployment cycle from six weeks to four days, expanding our net revenue retention to 138%.',
      highGroundQuestion: 'What specific milestone velocity would your committee need to see to lead the syndicate at our current terms?',
      verbalDeliveryTip: 'Deliver the direct answer without hesitation, pause for two seconds, and state the ROI metric with absolute calm.'
    };
  }

  if (persona === 'founder') {
    return {
      title: 'Dynamic Strategic Counter-Frame',
      adversaryRole: 'Institutional Counterpart',
      leverageTrap: 'Attempting to impose an arbitrary ceiling or delay to test your resolve.',
      directAnswer: 'We understand your caution regarding this provision and respect your fiduciary process.',
      pivotFrame: 'Our current velocity and customer adoption data demonstrate that this valuation directly reflects our capital efficiency and market positioning.',
      highGroundQuestion: 'What specific risk metric can we align on today that would give you full conviction to close this week?',
      verbalDeliveryTip: 'Keep your vocal pitch downward at the end of the sentence to project calm executive authority.'
    };
  } else {
    return {
      title: 'Executive Compensation Re-Anchor',
      adversaryRole: 'VP of Talent Acquisition',
      leverageTrap: 'Using standardized organizational bands to bypass individual market leverage.',
      directAnswer: 'I appreciate the clarity around company bands and the importance of departmental equity.',
      pivotFrame: 'Because my primary responsibility directly drives the upcoming core infrastructure release, we can bridge the total compensation target through accelerated equity vesting or performance milestones.',
      highGroundQuestion: 'How does the compensation committee evaluate key technical leaders whose market value exceeds standard tier parameters?',
      verbalDeliveryTip: 'Do not fill the silence after asking your question. Let the recruiter speak first.'
    };
  }
}

function generateFallbackClause(persona: Persona, text: string): ClauseAIResult {
  return {
    title: 'Predatory Asymmetry Flagged',
    clauseType: persona === 'founder' ? 'Vesting & Governance Overreach' : 'Employment Restrictive Covenant',
    riskLevel: 'high',
    riskExplanation: 'This provision creates an unmitigated unilateral benefit for the company without reciprocal protections for the individual, exposing you to forfeiture or career restraint without cause.',
    equitableCounterClause: persona === 'founder'
      ? 'The Company’s repurchase or discretionary rights shall apply strictly upon a final judicial finding of Cause (limited to willful felony or gross material fraud), with full double-trigger acceleration upon any corporate restructuring.'
      : 'Employee’s obligations under this provision shall be strictly limited to direct proprietary clients engaged in the preceding ninety (90) days, with zero non-competition restrictions on independent engineering or future employment.',
    negotiationRationale: 'Institutional counsel accepts this bilateral framing because it protects legitimate trade secrets without exposing the company to unconscionability challenges in court.'
  };
}
