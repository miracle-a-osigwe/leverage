import React, { useState } from 'react';
import { Persona, ObjectionScenario } from '../types';
import { OBJECTION_PRESETS } from '../data/objectionPresets';

interface ObjectionSimulatorProps {
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export const ObjectionSimulator: React.FC<ObjectionSimulatorProps> = ({
  currentPersona,
  onPersonaChange
}) => {
  const filteredScenarios = OBJECTION_PRESETS.filter(s => s.persona === currentPersona);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    filteredScenarios[0]?.id || OBJECTION_PRESETS[0].id
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Update selection if persona changes and current selection is not in list
  const activeScenario =
    filteredScenarios.find(s => s.id === selectedScenarioId) ||
    filteredScenarios[0] ||
    OBJECTION_PRESETS[0];

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      // Fallback
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Persona Selector & Scenario Chips */}
      <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-lg p-5 shadow-sm">
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

          {/* Persona Segmented Control */}
          <div className="inline-flex p-1 bg-[#F5F5F3] rounded-md border border-[#E5E5E2] self-start md:self-auto">
            <button
              onClick={() => {
                onPersonaChange('founder');
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
        </div>

        {/* Scenario Selection Chips */}
        <div className="pt-4 flex flex-wrap gap-2 items-center">
          <span className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mr-1">
            Scenarios:
          </span>
          {filteredScenarios.map(sc => {
            const isSelected = sc.id === activeScenario.id;
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
      </div>

      {/* Adversary Objection Card */}
      <div className="bg-white border-2 border-crimson-200/80 rounded-lg p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-crimson-600" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-crimson-50 text-crimson-700 border border-crimson-200 rounded uppercase tracking-wider">
              Adversary Pushback
            </span>
            <span className="text-xs font-mono text-[#737373]">
              Role: <strong className="text-[#121212] font-semibold">{activeScenario.adversaryRole}</strong>
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#A3A3A3]">
            Meeting Pressure Test
          </span>
        </div>

        <blockquote className="text-base sm:text-lg font-serif italic text-[#121212] leading-relaxed pl-3 border-l-2 border-crimson-300 my-2">
          &ldquo;{activeScenario.objectionText}&rdquo;
        </blockquote>

        <div className="mt-4 pt-3 border-t border-[#F5F5F3] flex items-center justify-between text-xs text-[#737373]">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-crimson-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium text-[#121212]">Leverage Trap:</span> Over-apologizing or immediately discounting your position.
          </span>
          <span className="text-[11px] font-mono text-sage-700 bg-sage-50 px-2 py-0.5 rounded border border-sage-200">
            Strategy: 3-Stage Re-Anchor
          </span>
        </div>
      </div>

      {/* 3 Structured Counter-Frames */}
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
              {activeScenario.counterFrames.directAnswer}
            </p>
          </div>

          <div className="pt-3 border-t border-[#F5F5F3] flex items-center justify-between">
            <span className="text-[11px] text-[#737373] italic">
              Removes defensiveness
            </span>
            <button
              onClick={() => handleCopy(activeScenario.counterFrames.directAnswer, 'direct')}
              className={`text-xs px-2.5 py-1 rounded border font-medium flex items-center gap-1 transition-all ${
                copiedKey === 'direct'
                  ? 'bg-sage-600 text-white border-sage-600'
                  : 'bg-white border-[#E5E5E2] text-[#121212] hover:bg-[#F5F5F3]'
              }`}
            >
              {copiedKey === 'direct' ? 'Copied ✓' : 'Copy Frame'}
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
              {activeScenario.counterFrames.pivotFrame}
            </p>
          </div>

          <div className="pt-3 border-t border-[#F5F5F3] flex items-center justify-between">
            <span className="text-[11px] text-sage-700 font-medium italic">
              Demonstrates ROI leverage
            </span>
            <button
              onClick={() => handleCopy(activeScenario.counterFrames.pivotFrame, 'pivot')}
              className={`text-xs px-2.5 py-1 rounded border font-medium flex items-center gap-1 transition-all ${
                copiedKey === 'pivot'
                  ? 'bg-sage-600 text-white border-sage-600'
                  : 'bg-sage-50 border-sage-300 text-sage-900 hover:bg-sage-100'
              }`}
            >
              {copiedKey === 'pivot' ? 'Copied ✓' : 'Copy Frame'}
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
              {activeScenario.counterFrames.highGroundQuestion}
            </p>
          </div>

          <div className="pt-3 border-t border-[#F5F5F3] flex items-center justify-between">
            <span className="text-[11px] text-[#737373] italic">
              Forces real criteria
            </span>
            <button
              onClick={() => handleCopy(activeScenario.counterFrames.highGroundQuestion, 'question')}
              className={`text-xs px-2.5 py-1 rounded border font-medium flex items-center gap-1 transition-all ${
                copiedKey === 'question'
                  ? 'bg-sage-600 text-white border-sage-600'
                  : 'bg-white border-[#E5E5E2] text-[#121212] hover:bg-[#F5F5F3]'
              }`}
            >
              {copiedKey === 'question' ? 'Copied ✓' : 'Copy Frame'}
            </button>
          </div>
        </div>
      </div>

      {/* Tactical Delivery Briefing */}
      <div className="bg-[#FAF9F6] border border-[#E5E5E2] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#121212] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
            Ω
          </div>
          <div>
            <span className="font-semibold text-[#121212] block">Verbal Delivery Rule: The 3-Second Pause</span>
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
