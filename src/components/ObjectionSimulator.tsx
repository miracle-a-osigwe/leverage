import React, { useState } from 'react';
import { Persona, ObjectionScenario } from '../types';
import { OBJECTION_PRESETS } from '../data/objectionPresets';
import { generateObjectionCounterFrames, ObjectionAIResult, hasGeminiApiKey } from '../services/geminiService';
import { Sparkles, Loader2, ArrowRight, CornerDownRight, Check, Copy } from 'lucide-react';

interface ObjectionSimulatorProps {
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
  onOpenAISettings?: () => void;
}

export const ObjectionSimulator: React.FC<ObjectionSimulatorProps> = ({
  currentPersona,
  onPersonaChange,
  onOpenAISettings
}) => {
  const filteredScenarios = OBJECTION_PRESETS.filter(s => s.persona === currentPersona);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    filteredScenarios[0]?.id || OBJECTION_PRESETS[0].id
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // AI State
  const [isAICustomMode, setIsAICustomMode] = useState<boolean>(false);
  const [customObjectionInput, setCustomObjectionInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<ObjectionAIResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const activePreset =
    filteredScenarios.find(s => s.id === selectedScenarioId) ||
    filteredScenarios[0] ||
    OBJECTION_PRESETS[0];

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  const handleGenerateAI = async () => {
    if (!customObjectionInput.trim()) return;
    setIsGenerating(true);
    setAiError(null);
    try {
      const result = await generateObjectionCounterFrames(currentPersona, customObjectionInput);
      setAiResult(result);
      setIsAICustomMode(true);
    } catch (err: any) {
      setAiError(err.message || 'Failed to generate counter-frames.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Quick suggestion prompts
  const suggestions = currentPersona === 'founder'
    ? [
        'A competitor just raised $50M and offers your core feature for free.',
        'Why should we value you at $20M when you only have $400k ARR?',
        'We need you to give up another 8% in advisor equity before closing.'
      ]
    : [
        'Our budget for this role is strictly capped at $180k with zero flex.',
        'We love your background, but your title will be Senior, not Staff.',
        'Nobody on the team gets remote work exceptions; you must relocate.'
      ];

  return (
    <div className="space-y-6">
      {/* Top Controls: Persona Selector & Scenario Chips */}
      <div className="bg-white border border-[#E5E5E2] rounded-lg p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EFEFEA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crimson-600 animate-pulse" />
              <h2 className="text-sm font-semibold tracking-wide uppercase text-[#121212]">
                Pillar 2: Objection Simulator
              </h2>
            </div>
            <p className="text-xs text-[#737373] mt-0.5">
              Live verbal pushback deconstruction. Practice real-time counter-frames against institutional objections.
            </p>
          </div>

          {/* Persona Segmented Control & AI Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 bg-[#F5F5F3] rounded-md border border-[#E5E5E2]">
              <button
                onClick={() => {
                  onPersonaChange('founder');
                  setIsAICustomMode(false);
                  const firstFounder = OBJECTION_PRESETS.find(s => s.persona === 'founder');
                  if (firstFounder) setSelectedScenarioId(firstFounder.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                  currentPersona === 'founder'
                    ? 'bg-white text-[#121212] shadow-sm font-semibold'
                    : 'text-[#737373] hover:text-[#121212]'
                }`}
              >
                Founder Scenarios
              </button>
              <button
                onClick={() => {
                  onPersonaChange('professional');
                  setIsAICustomMode(false);
                  const firstCareer = OBJECTION_PRESETS.find(s => s.persona === 'professional');
                  if (firstCareer) setSelectedScenarioId(firstCareer.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                  currentPersona === 'professional'
                    ? 'bg-white text-[#121212] shadow-sm font-semibold'
                    : 'text-[#737373] hover:text-[#121212]'
                }`}
              >
                Career & Comp Scenarios
              </button>
            </div>

            {/* AI Generator Toggle Button */}
            <button
              onClick={() => setIsAICustomMode(!isAICustomMode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border flex items-center gap-1.5 transition-all shadow-sm ${
                isAICustomMode
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-purple-50 text-purple-900 border-purple-300 hover:bg-purple-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Custom Pushback</span>
            </button>
          </div>
        </div>

        {/* AI Custom Pushback Input Surface (Collapsible) */}
        {isAICustomMode && (
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-50/70 to-indigo-50/70 border border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Spar with Gemini 3.5 Flash on ANY Objection
              </span>
              <span className="text-[10px] font-mono text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                {hasGeminiApiKey() ? 'Live Gemini Engine' : 'Demo Evaluation Mode'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customObjectionInput}
                onChange={(e) => setCustomObjectionInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateAI()}
                placeholder="Type or paste any pushback (e.g. 'Your valuation is 2x market', 'This salary band is non-negotiable')..."
                className="flex-1 px-3.5 py-2 text-xs font-mono rounded-lg border border-purple-300 bg-white text-[#121212] focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleGenerateAI}
                disabled={isGenerating || !customObjectionInput.trim()}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Frame...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Frames</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-purple-800 mr-1">Try example:</span>
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomObjectionInput(s)}
                  className="text-[11px] text-purple-900 bg-white/80 hover:bg-white border border-purple-200 px-2 py-0.5 rounded-full transition-all text-left"
                >
                  &ldquo;{s.slice(0, 42)}...&rdquo;
                </button>
              ))}
            </div>

            {aiError && (
              <p className="text-xs text-crimson-600 font-mono mt-1">{aiError}</p>
            )}
          </div>
        )}

        {/* Preset Chips (When not in AI mode or to switch presets) */}
        {!isAICustomMode && (
          <div className="pt-4 flex flex-wrap gap-2 items-center">
            <span className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mr-1">
              Scenarios:
            </span>
            {filteredScenarios.map(sc => {
              const isSelected = sc.id === activePreset.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'border-slate-800 bg-[#121212] text-white font-medium shadow-sm'
                      : 'border-[#E5E5E2] bg-white text-[#525252] hover:border-slate-400 hover:text-[#121212]'
                  }`}
                >
                  {sc.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Adversary Objection Card */}
      <div className={`bg-white border-2 rounded-lg p-6 shadow-sm relative overflow-hidden ${
        isAICustomMode && aiResult ? 'border-purple-300' : 'border-crimson-200/80'
      }`}>
        <div className={`absolute top-0 left-0 w-1.5 h-full ${
          isAICustomMode && aiResult ? 'bg-purple-600' : 'bg-crimson-600'
        }`} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold border rounded uppercase tracking-wider ${
              isAICustomMode && aiResult
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-crimson-50 text-crimson-700 border-crimson-200'
            }`}>
              {isAICustomMode && aiResult ? 'Gemini AI Pushback Analysis' : 'Adversary Pushback'}
            </span>
            <span className="text-xs font-mono text-[#737373]">
              Role: <strong className="text-[#121212] font-semibold">
                {isAICustomMode && aiResult ? aiResult.adversaryRole : activePreset.adversaryRole}
              </strong>
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#A3A3A3]">
            {isAICustomMode && aiResult ? 'Google Gemini 3.5 Flash' : 'Meeting Pressure Test'}
          </span>
        </div>

        <blockquote className="text-base sm:text-lg font-serif italic text-[#121212] leading-relaxed pl-3 border-l-2 border-crimson-300 my-2">
          &ldquo;{isAICustomMode && aiResult ? customObjectionInput : activePreset.objectionText}&rdquo;
        </blockquote>

        <div className="mt-4 pt-3 border-t border-[#F5F5F3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#737373]">
          <span className="flex items-center gap-1.5">
            <CornerDownRight className="w-3.5 h-3.5 text-crimson-600 shrink-0" />
            <span className="font-medium text-[#121212]">Leverage Trap:</span>{' '}
            {isAICustomMode && aiResult
              ? aiResult.leverageTrap
              : 'Over-apologizing or immediately discounting your position.'}
          </span>
          <span className="text-[11px] font-mono text-sage-700 bg-sage-50 px-2 py-0.5 rounded border border-sage-200 shrink-0 self-start sm:self-auto">
            Strategy: 3-Stage Re-Anchor
          </span>
        </div>
      </div>

      {/* 3 Structured Counter-Frames */}
      {(() => {
        const directText = isAICustomMode && aiResult ? aiResult.directAnswer : activePreset.counterFrames.directAnswer;
        const pivotText = isAICustomMode && aiResult ? aiResult.pivotFrame : activePreset.counterFrames.pivotFrame;
        const questionText = isAICustomMode && aiResult ? aiResult.highGroundQuestion : activePreset.counterFrames.highGroundQuestion;

        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Frame 1: Direct Answer */}
            <div className="bg-white border border-[#E5E5E2] rounded-lg p-5 flex flex-col justify-between shadow-sm hover:border-slate-400 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#F5F5F3] text-[#525252] border border-[#E5E5E2] rounded uppercase tracking-wider">
                    1. Direct Answer
                  </span>
                  <span className="text-[10px] font-mono text-[#737373]">
                    De-escalate
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#121212] mb-2 uppercase tracking-wide">
                  Neutralize Panic & Validate
                </h4>
                <p className="text-xs text-[#404040] leading-relaxed mb-4">
                  {directText}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5F5F3] flex items-center justify-between">
                <span className="text-[11px] text-[#737373] italic">
                  Removes defensiveness
                </span>
                <button
                  onClick={() => handleCopy(directText, 'direct')}
                  className={`text-xs px-2.5 py-1 rounded border font-medium flex items-center gap-1 transition-all ${
                    copiedKey === 'direct'
                      ? 'bg-sage-600 text-white border-sage-600'
                      : 'bg-white border-[#E5E5E2] text-[#121212] hover:bg-[#F5F5F3]'
                  }`}
                >
                  {copiedKey === 'direct' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Frame</>}
                </button>
              </div>
            </div>

            {/* Frame 2: Pivot Frame */}
            <div className="bg-white border-2 border-sage-300 rounded-lg p-5 flex flex-col justify-between shadow-sm relative hover:border-sage-400 transition-colors">
              <div className="absolute -top-2.5 right-4 bg-sage-700 text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded-full tracking-wider font-semibold">
                Primary Re-Anchor
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-sage-50 text-sage-800 border border-sage-200 rounded uppercase tracking-wider">
                    2. Pivot Frame
                  </span>
                  <span className="text-[10px] font-mono text-sage-700">
                    Shift to Value
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#121212] mb-2 uppercase tracking-wide">
                  Shift Focus from Cost to Durability
                </h4>
                <p className="text-xs text-[#262626] font-medium leading-relaxed mb-4">
                  {pivotText}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5F5F3] flex items-center justify-between">
                <span className="text-[11px] text-sage-700 font-medium italic">
                  Demonstrates ROI leverage
                </span>
                <button
                  onClick={() => handleCopy(pivotText, 'pivot')}
                  className={`text-xs px-2.5 py-1 rounded border font-medium flex items-center gap-1 transition-all ${
                    copiedKey === 'pivot'
                      ? 'bg-sage-600 text-white border-sage-600'
                      : 'bg-sage-50 border-sage-300 text-sage-900 hover:bg-sage-100'
                  }`}
                >
                  {copiedKey === 'pivot' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Frame</>}
                </button>
              </div>
            </div>

            {/* Frame 3: High Ground Question */}
            <div className="bg-white border border-[#E5E5E2] rounded-lg p-5 flex flex-col justify-between shadow-sm hover:border-slate-400 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#F5F5F3] text-[#525252] border border-[#E5E5E2] rounded uppercase tracking-wider">
                    3. High Ground
                  </span>
                  <span className="text-[10px] font-mono text-[#737373]">
                    Constructive Pressure
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#121212] mb-2 uppercase tracking-wide">
                  Return the Pressure Elegantly
                </h4>
                <p className="text-xs text-[#404040] leading-relaxed mb-4">
                  {questionText}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5F5F3] flex items-center justify-between">
                <span className="text-[11px] text-[#737373] italic">
                  Forces real criteria
                </span>
                <button
                  onClick={() => handleCopy(questionText, 'question')}
                  className={`text-xs px-2.5 py-1 rounded border font-medium flex items-center gap-1 transition-all ${
                    copiedKey === 'question'
                      ? 'bg-sage-600 text-white border-sage-600'
                      : 'bg-white border-[#E5E5E2] text-[#121212] hover:bg-[#F5F5F3]'
                  }`}
                >
                  {copiedKey === 'question' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Frame</>}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Tactical Delivery Briefing */}
      <div className="bg-[#FAF9F6] border border-[#E5E5E2] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#121212] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
            Ω
          </div>
          <div>
            <span className="font-semibold text-[#121212] block">
              Verbal Delivery Rule: {isAICustomMode && aiResult ? aiResult.verbalDeliveryTip : 'The 3-Second Pause'}
            </span>
            <span className="text-[#525252]">
              After answering with Frame 1, do not rush. Take a calm breath, deliver Frame 2, and end definitively on Frame 3. Whoever speaks next bears the burden of negotiation.
            </span>
          </div>
        </div>
        <div className="text-[11px] font-mono text-[#737373] shrink-0 self-end sm:self-auto">
          Tactical Ratio: 20% Talk / 80% Listen
        </div>
      </div>
    </div>
  );
};
