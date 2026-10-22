import React, { useState } from 'react';
import { Persona, ClauseScenario } from '../types';
import { CLAUSE_PRESETS } from '../data/clausePresets';
import { analyzeContractClause, ClauseAIResult, hasGeminiApiKey } from '../services/geminiService';
import { ShieldAlert, ShieldCheck, Copy, Check, FileText, AlertTriangle, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface ClauseRadarProps {
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
  onOpenAISettings?: () => void;
}

export const ClauseRadar: React.FC<ClauseRadarProps> = ({
  currentPersona,
  onPersonaChange,
  onOpenAISettings
}) => {
  const filteredPresets = CLAUSE_PRESETS.filter(c => c.persona === currentPersona);
  const [selectedClauseId, setSelectedClauseId] = useState<string>(
    filteredPresets[0]?.id || CLAUSE_PRESETS[0].id
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // AI Clause Audit State
  const [isAuditingAI, setIsAuditingAI] = useState<boolean>(false);
  const [aiClauseResult, setAiClauseResult] = useState<ClauseAIResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const activePreset: ClauseScenario =
    filteredPresets.find(c => c.id === selectedClauseId) ||
    filteredPresets[0] ||
    CLAUSE_PRESETS[0];

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleAuditWithAI = async () => {
    if (!customText.trim()) return;
    setIsAuditingAI(true);
    setAiError(null);
    try {
      const result = await analyzeContractClause(currentPersona, customText);
      setAiClauseResult(result);
    } catch (err: any) {
      setAiError(err.message || 'Failed to analyze contract clause with AI.');
    } finally {
      setIsAuditingAI(false);
    }
  };

  // Heuristic scanner for instant regex detection
  const detectCustomGotchas = (text: string) => {
    const triggers = [
      { pattern: /\b(unilateral|sole discretion)\b/gi, issue: 'Unilateral Discretion', severity: 'high', tip: 'Convert to "mutual written consent" or "reasonable good-faith determination".' },
      { pattern: /\b(repurchase.*par value|forfeiture)\b/gi, issue: 'Equity Forfeiture', severity: 'high', tip: 'Limit repurchases strictly to unvested shares for felony cause only.' },
      { pattern: /\b(worldwide|24 months|two years)\b/gi, issue: 'Overbroad Restrictive Covenant', severity: 'high', tip: 'Narrow geographical limit to direct past clients and reduce time to 6 months.' },
      { pattern: /\b(prior to|all inventions|personal equipment)\b/gi, issue: 'Overreaching IP Assignment', severity: 'high', tip: 'Explicitly carve out prior inventions and personal weekend projects.' },
      { pattern: /\b(participating preferred|2\.0x|liquidation preference)\b/gi, issue: 'Liquidation Overhang', severity: 'high', tip: 'Insist on standard 1.0x Non-Participating preference.' }
    ];

    return triggers.filter(t => t.pattern.test(text));
  };

  const customDetected = isCustomMode ? detectCustomGotchas(customText) : [];

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation */}
      <div className="bg-white border border-[#E5E5E2] rounded-lg p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EFEFEA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h2 className="text-sm font-semibold tracking-wide uppercase text-[#121212]">
                Pillar 3: Clause Radar
              </h2>
            </div>
            <p className="text-xs text-[#737373] mt-0.5">
              Contract gotcha scanner. Detects predatory legal traps in agreements and generates equitable counter-clauses.
            </p>
          </div>

          {/* Persona Segmented Control */}
          <div className="inline-flex p-1 bg-[#F5F5F3] rounded-md border border-[#E5E5E2] self-start md:self-auto">
            <button
              onClick={() => {
                setIsCustomMode(false);
                setAiClauseResult(null);
                onPersonaChange('founder');
                const firstFounder = CLAUSE_PRESETS.find(c => c.persona === 'founder');
                if (firstFounder) setSelectedClauseId(firstFounder.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                !isCustomMode && currentPersona === 'founder'
                  ? 'bg-white text-[#121212] shadow-sm font-semibold'
                  : 'text-[#737373] hover:text-[#121212]'
              }`}
            >
              Founder Contracts
            </button>
            <button
              onClick={() => {
                setIsCustomMode(false);
                setAiClauseResult(null);
                onPersonaChange('professional');
                const firstCareer = CLAUSE_PRESETS.find(c => c.persona === 'professional');
                if (firstCareer) setSelectedClauseId(firstCareer.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                !isCustomMode && currentPersona === 'professional'
                  ? 'bg-white text-[#121212] shadow-sm font-semibold'
                  : 'text-[#737373] hover:text-[#121212]'
              }`}
            >
              Career & Offer Contracts
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all flex items-center gap-1.5 ${
                isCustomMode
                  ? 'bg-purple-600 text-white shadow-sm font-semibold'
                  : 'text-purple-700 hover:text-purple-900 bg-purple-50'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Custom AI Audit</span>
            </button>
          </div>
        </div>

        {/* Preset Clause Selection Chips */}
        {!isCustomMode && (
          <div className="pt-4 flex flex-wrap gap-2 items-center">
            <span className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mr-1">
              Common Gotchas:
            </span>
            {filteredPresets.map(clause => {
              const isSelected = clause.id === activePreset.id;
              return (
                <button
                  key={clause.id}
                  onClick={() => setSelectedClauseId(clause.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'border-slate-800 bg-[#121212] text-white font-medium shadow-sm'
                      : 'border-[#E5E5E2] bg-white text-[#525252] hover:border-slate-400 hover:text-[#121212]'
                  }`}
                >
                  {clause.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Clause Analysis Body */}
      {!isCustomMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Predatory Clause Detection */}
          <div className="bg-white border-2 border-crimson-200/90 rounded-lg p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-crimson-600" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-crimson-600" />
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-crimson-50 text-crimson-700 border border-crimson-200 rounded uppercase tracking-wider">
                    {activePreset.riskLevel === 'high' ? 'High Risk Hazard' : 'Moderate Hazard'}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#737373]">
                  {activePreset.clauseType}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-[#121212] mb-1">
                {activePreset.title}
              </h3>

              {/* Legal Hazard Explanation */}
              <div className="bg-crimson-50/60 border border-crimson-200/60 rounded p-3 my-3 text-xs text-crimson-900 leading-relaxed">
                <strong className="font-semibold block mb-0.5">Tactical Analysis:</strong>
                {activePreset.riskExplanation}
              </div>

              {/* Clause Raw Text */}
              <div className="mt-4">
                <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Asymmetrical Clause Language:</span>
                  <span className="text-crimson-700 font-medium">Flagged Provision</span>
                </div>
                <div className="bg-[#FAF9F6] border border-[#E5E5E2] rounded-lg p-4 font-mono text-xs leading-relaxed text-[#1F2937] whitespace-pre-wrap select-all">
                  {activePreset.originalClause}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#F5F5F3] flex items-center justify-between text-[11px] text-[#737373]">
              <span>Asymmetry: Unilateral terms favored against your equity/career</span>
              <span className="font-mono text-crimson-700 font-semibold">Do Not Sign Unamended</span>
            </div>
          </div>

          {/* Right Column: Equitable Counter-Clause Solution */}
          <div className="bg-white border-2 border-sage-300 rounded-lg p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-sage-600" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-sage-50 text-sage-800 border border-sage-200 rounded uppercase tracking-wider">
                    Equitable Replacement
                  </span>
                </div>
                <span className="text-xs font-mono text-sage-700 font-medium">
                  Standard Market Compromise
                </span>
              </div>

              <h3 className="text-sm font-semibold text-[#121212] mb-1">
                Institutional Counter-Clause
              </h3>

              <div className="bg-sage-50/70 border border-sage-200/70 rounded p-3 my-3 text-xs text-sage-900 leading-relaxed">
                <strong className="font-semibold block mb-0.5">Negotiation Frame:</strong>
                Presents balanced bilateral terms that enterprise legal teams or top venture counsel routinely accept as industry standard.
              </div>

              {/* Counter-Clause Text */}
              <div className="mt-4">
                <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Proposed Redline Replacement:</span>
                  <span className="text-sage-700 font-medium">Ready for Counsel</span>
                </div>
                <div className="bg-[#FAFBF9] border border-sage-200 rounded-lg p-4 font-mono text-xs leading-relaxed text-[#1F2937] whitespace-pre-wrap select-all">
                  {activePreset.equitableCounterClause}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F5F5F3] flex items-center justify-between">
              <span className="text-xs text-[#737373] italic">
                Protects vested assets & mobility
              </span>
              <button
                onClick={() => handleCopy(activePreset.equitableCounterClause)}
                className={`px-4 py-2 text-xs font-medium rounded-md border flex items-center gap-1.5 shadow-sm transition-all ${
                  copied
                    ? 'bg-sage-700 text-white border-sage-700'
                    : 'bg-[#121212] text-white border-[#121212] hover:bg-black'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Counter-Clause ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Counter-Clause</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Custom AI Clause Pasting Surface */
        <div className="bg-white border border-[#E5E5E2] rounded-lg p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F5F5F3]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-semibold text-[#121212]">
                Custom Legal Clause Audit with Google Gemini AI
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                {hasGeminiApiKey() ? 'Gemini 3.5 Active' : 'Demo Evaluation Engine'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#737373]">
              <span>Paste any suspicious clause from an offer letter, vesting grant, or term sheet:</span>
              <button
                onClick={() => setCustomText(
                  currentPersona === 'founder'
                    ? 'The Board reserves unilateral discretion to reclassify Founder Common shares into non-voting shadow equity upon any executive leadership re-organization.'
                    : 'Employee agrees not to engage in any independent software development or open-source contribution for eighteen months post-termination anywhere in North America.'
                )}
                className="text-[11px] text-purple-700 hover:text-purple-900 underline font-medium"
              >
                Insert Sample Gotcha
              </button>
            </div>

            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste contract clause text here..."
              rows={5}
              className="w-full text-xs font-mono p-4 border border-[#E5E5E2] rounded-lg bg-[#FAF9F6] text-[#121212] focus:outline-none focus:ring-2 focus:ring-purple-400 leading-relaxed resize-y"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-[#737373]">
              Gemini evaluates legal asymmetry and drafts an institutional-grade redline.
            </span>
            <button
              onClick={handleAuditWithAI}
              disabled={isAuditingAI || !customText.trim()}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              {isAuditingAI ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Auditing Legal Asymmetry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Audit Clause with Gemini AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {aiError && (
            <p className="text-xs text-crimson-600 font-mono mt-2">{aiError}</p>
          )}

          {/* AI Analysis Result Cards */}
          {aiClauseResult && (
            <div className="mt-6 pt-6 border-t border-[#E5E5E2] space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage-600" />
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#121212]">
                  Gemini Legal Audit Results: {aiClauseResult.title}
                </h4>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Breakdown */}
                <div className="bg-crimson-50/50 border border-crimson-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-crimson-100 text-crimson-800 rounded uppercase">
                      Risk: {aiClauseResult.riskLevel}
                    </span>
                    <span className="text-xs font-mono text-crimson-900 font-medium">
                      {aiClauseResult.clauseType}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-crimson-950 uppercase tracking-wide mb-1">
                      Predatory Legal Trap
                    </h5>
                    <p className="text-xs text-crimson-900 leading-relaxed">
                      {aiClauseResult.riskExplanation}
                    </p>
                  </div>
                </div>

                {/* Equitable Counter-Clause Solution */}
                <div className="bg-sage-50/60 border border-sage-300 rounded-lg p-5 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-sage-100 text-sage-800 rounded uppercase">
                        AI Counter-Clause
                      </span>
                      <span className="text-[11px] font-mono text-sage-700">
                        Equitable Redline
                      </span>
                    </div>
                    <div className="bg-white border border-sage-200 rounded p-3 font-mono text-xs text-[#121212] leading-relaxed select-all">
                      {aiClauseResult.equitableCounterClause}
                    </div>
                    <p className="text-[11px] text-sage-900 italic mt-2">
                      <strong>Tactical Rationale:</strong> {aiClauseResult.negotiationRationale}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-sage-200 flex items-center justify-end">
                    <button
                      onClick={() => handleCopy(aiClauseResult.equitableCounterClause)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md border flex items-center gap-1.5 shadow-sm transition-all ${
                        copied
                          ? 'bg-sage-700 text-white border-sage-700'
                          : 'bg-[#121212] text-white hover:bg-black'
                      }`}
                    >
                      {copied ? <><Check className="w-3.5 h-3.5" /> Copied Redline ✓</> : <><Copy className="w-3.5 h-3.5" /> Copy Redline</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Heuristic Alerts (Shown if text matches known triggers) */}
          {customDetected.length > 0 && !aiClauseResult && (
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase font-mono text-[#737373] mb-3">
                Instant Heuristic Regex Warnings: {customDetected.length} Found
              </h4>
              <div className="space-y-2">
                {customDetected.map((gotcha, i) => (
                  <div key={i} className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-950 font-semibold">{gotcha.issue}:</strong>{' '}
                      <span className="text-amber-900">{gotcha.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contract Negotiation Doctrine */}
      <div className="bg-[#FAF9F6] border border-[#E5E5E2] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#121212] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
            §
          </div>
          <div>
            <span className="font-semibold text-[#121212] block">The Equitable Redline Principle</span>
            <span className="text-[#525252]">
              Never reject an aggressive clause with a blank refusal. Always offer an equitable bilateral standard term. Institutional counsel rarely rejects parity when formulated politely.
            </span>
          </div>
        </div>
        <div className="text-[11px] font-mono text-sage-700 bg-sage-50 px-2 py-1 rounded border border-sage-200 shrink-0 self-end sm:self-auto">
          Win-Win Parity Framing
        </div>
      </div>
    </div>
  );
};
