import React, { useState } from 'react';
import { Persona, ClauseScenario } from '../types';
import { CLAUSE_PRESETS } from '../data/clausePresets';
import { ShieldAlert, ShieldCheck, Copy, Check, FileText, AlertTriangle } from 'lucide-react';

interface ClauseRadarProps {
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export const ClauseRadar: React.FC<ClauseRadarProps> = ({
  currentPersona,
  onPersonaChange
}) => {
  const filteredPresets = CLAUSE_PRESETS.filter(c => c.persona === currentPersona);
  const [selectedClauseId, setSelectedClauseId] = useState<string>(
    filteredPresets[0]?.id || CLAUSE_PRESETS[0].id
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

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

  // Heuristic scanner for custom pasted text
  const detectCustomGotchas = (text: string) => {
    const triggers = [
      { pattern: /\b(unilateral|sole discretion)\b/gi, issue: 'Unilateral Discretion', severity: 'high', tip: 'Convert to "mutual written consent" or "reasonable good-faith determination".' },
      { pattern: /\b(repurchase.*par value|forfeiture)\b/gi, issue: 'Equity Forfeiture', severity: 'high', tip: 'Limit repurchases strictly to unvested shares for felony cause only.' },
      { pattern: /\b(worldwide|24 months|two years)\b/gi, issue: 'Overbroad Scope', severity: 'high', tip: 'Narrow geographical limit to direct past clients and reduce time to 6 months.' },
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
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                isCustomMode
                  ? 'bg-white text-[#121212] shadow-sm font-semibold'
                  : 'text-[#737373] hover:text-[#121212]'
              }`}
            >
              Custom Paste
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
        /* Custom Clause Pasting Surface */
        <div className="bg-white border border-[#E5E5E2] rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#121212] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#737373]" />
              Paste Contract Clause for Asymmetry Scan
            </h3>
            <span className="text-xs font-mono text-[#737373]">
              100% Client-Side • Nothing Uploaded
            </span>
          </div>

          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Paste any suspect contract provision here (e.g. non-compete clause, vesting repurchase, indemnity, or IP assignment)..."
            rows={6}
            className="w-full text-xs font-mono p-4 border border-[#E5E5E2] rounded-lg bg-[#FAF9F6] text-[#121212] focus:outline-none focus:ring-1 focus:ring-slate-800 leading-relaxed resize-y"
          />

          {customText.trim().length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase font-mono text-[#737373] mb-3">
                Scan Results: {customDetected.length > 0 ? `${customDetected.length} Asymmetry Flags Detected` : 'No Obvious Red Flags Found'}
              </h4>

              {customDetected.length > 0 ? (
                <div className="space-y-3">
                  {customDetected.map((gotcha, i) => (
                    <div key={i} className="p-3 bg-crimson-50/70 border border-crimson-200 rounded-lg flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-crimson-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-crimson-900">{gotcha.issue}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-crimson-100 text-crimson-800 rounded uppercase">
                            {gotcha.severity}
                          </span>
                        </div>
                        <p className="text-xs text-crimson-800 mt-1">
                          <strong>Recommended Redline:</strong> {gotcha.tip}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-sage-50 border border-sage-200 rounded-lg text-xs text-sage-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                  <span>No standard predatory triggers detected in this snippet. Always consult legal counsel for binding agreements.</span>
                </div>
              )}
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
