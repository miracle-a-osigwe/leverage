import React from 'react';
import { Persona, PillarTab } from '../types';
import { ShieldCheck, Sliders, Briefcase, UserCheck } from 'lucide-react';

interface TelemetryBarProps {
  persona: Persona;
  onPersonaChange: (persona: Persona) => void;
  activeTab: PillarTab;
  onTabChange: (tab: PillarTab) => void;
  firmness: number;
  onFirmnessChange: (val: number) => void;
  diplomacy: number;
  onDiplomacyChange: (val: number) => void;
  leverageScore: number;
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({
  persona,
  onPersonaChange,
  activeTab,
  onTabChange,
  firmness,
  onFirmnessChange,
  diplomacy,
  onDiplomacyChange,
  leverageScore,
}) => {
  // Gauge color logic
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-leverage-green border-leverage-green bg-leverage-greenBg';
    if (score >= 50) return 'text-hazard-amber border-hazard-amber bg-hazard-amberBg';
    return 'text-hazard-red border-hazard-red bg-hazard-redBg';
  };

  return (
    <header className="border-b border-hairline bg-alabaster-50/90 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand & Persona */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-ink text-alabaster flex items-center justify-center font-serif text-lg font-bold shadow-subtle">
              L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-tight text-ink">LEVERAGE</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-parchment text-ink-muted border border-hairline font-medium">
                  Confidential
                </span>
              </div>
              <p className="text-xs text-ink-muted font-sans hidden sm:block">
                High-Stakes Career & Venture Negotiation Copilot
              </p>
            </div>
          </div>

          {/* Persona Switcher */}
          <div className="flex items-center bg-parchment p-1 rounded-md border border-hairline text-xs font-medium">
            <button
              onClick={() => onPersonaChange('founder')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                persona === 'founder'
                  ? 'bg-alabaster-50 text-ink shadow-subtle font-semibold'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Founder</span>
            </button>
            <button
              onClick={() => onPersonaChange('professional')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                persona === 'professional'
                  ? 'bg-alabaster-50 text-ink shadow-subtle font-semibold'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Career Professional</span>
            </button>
          </div>
        </div>

        {/* Pillars Navigation */}
        <nav className="flex items-center gap-1 bg-parchment/60 p-1 rounded-lg border border-hairline text-xs font-medium self-center">
          <button
            onClick={() => onTabChange('equalizer')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'equalizer'
                ? 'bg-ink text-alabaster shadow-subtle font-semibold'
                : 'text-ink-muted hover:text-ink hover:bg-parchment'
            }`}
          >
            1. Subtext Equalizer
          </button>
          <button
            onClick={() => onTabChange('objections')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'objections'
                ? 'bg-ink text-alabaster shadow-subtle font-semibold'
                : 'text-ink-muted hover:text-ink hover:bg-parchment'
            }`}
          >
            2. Objection Simulator
          </button>
          <button
            onClick={() => onTabChange('clauseRadar')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'clauseRadar'
                ? 'bg-ink text-alabaster shadow-subtle font-semibold'
                : 'text-ink-muted hover:text-ink hover:bg-parchment'
            }`}
          >
            3. Clause Radar
          </button>
        </nav>

        {/* Sliders & Leverage Score Gauge */}
        <div className="flex items-center justify-between sm:justify-end gap-5">
          {/* Reactive Sliders */}
          <div className="flex items-center gap-4 bg-parchment/40 px-3 py-1.5 rounded-md border border-hairline/80">
            {/* Firmness Slider */}
            <div className="flex flex-col gap-1 w-24">
              <div className="flex justify-between text-[11px] font-mono text-ink-muted">
                <span>Firmness</span>
                <span className="font-semibold text-ink">{firmness}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={firmness}
                onChange={(e) => onFirmnessChange(Number(e.target.value))}
                className="w-full h-1.5 bg-hairline rounded-lg appearance-none cursor-pointer"
                title="Calibrate assertiveness and boundary enforcement"
              />
            </div>

            {/* Diplomacy Slider */}
            <div className="flex flex-col gap-1 w-24">
              <div className="flex justify-between text-[11px] font-mono text-ink-muted">
                <span>Diplomacy</span>
                <span className="font-semibold text-ink">{diplomacy}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={diplomacy}
                onChange={(e) => onDiplomacyChange(Number(e.target.value))}
                className="w-full h-1.5 bg-hairline rounded-lg appearance-none cursor-pointer"
                title="Calibrate tactical tact and relationship preservation"
              />
            </div>
          </div>

          {/* Real-time Leverage Index Gauge */}
          <div className="flex items-center gap-2 pl-2 border-l border-hairline">
            <div className="text-right hidden xl:block">
              <div className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">Leverage Index</div>
              <div className="text-[11px] font-medium text-ink">
                {leverageScore >= 80 ? 'Dominant Position' : leverageScore >= 50 ? 'Moderate Ground' : 'Vulnerable'}
              </div>
            </div>
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-mono font-bold text-sm shadow-subtle transition-all duration-300 ${getScoreColor(
                leverageScore
              )}`}
              title="Real-time Leverage Index calculated from subtext hazard elimination and calibration"
            >
              {leverageScore}%
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
