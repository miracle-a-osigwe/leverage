import React from 'react';
import { Persona, PillarTab } from '../types';
import { Compass, Briefcase, UserCheck } from 'lucide-react';

interface TelemetryBarProps {
  persona: Persona;
  onPersonaChange: (persona: Persona) => void;
  activeTab: PillarTab;
  onTabChange: (tab: PillarTab) => void;
  onOpenGuide: () => void;
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({
  persona,
  onPersonaChange,
  activeTab,
  onTabChange,
  onOpenGuide,
}) => {
  return (
    <header className="border-b border-hairline bg-alabaster/95 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Clean Brand Monogram & Wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-ink text-alabaster flex items-center justify-center font-serif text-base font-bold shadow-subtle">
            L
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-ink hidden sm:inline">
            LEVERAGE
          </span>
        </div>

        {/* Center: Pillar Navigation Tabs (De-clustered) */}
        <nav
          data-tour="pillar-tabs"
          className="flex items-center bg-parchment/80 p-1 rounded-lg border border-hairline text-xs font-medium"
        >
          <button
            onClick={() => onTabChange('equalizer')}
            className={`px-3.5 py-1.5 rounded-md transition-all ${
              activeTab === 'equalizer'
                ? 'bg-ink text-alabaster shadow-subtle font-semibold'
                : 'text-ink-muted hover:text-ink hover:bg-parchment'
            }`}
          >
            Equalizer
          </button>
          <button
            onClick={() => onTabChange('objections')}
            className={`px-3.5 py-1.5 rounded-md transition-all ${
              activeTab === 'objections'
                ? 'bg-ink text-alabaster shadow-subtle font-semibold'
                : 'text-ink-muted hover:text-ink hover:bg-parchment'
            }`}
          >
            Objections
          </button>
          <button
            onClick={() => onTabChange('clauseRadar')}
            className={`px-3.5 py-1.5 rounded-md transition-all ${
              activeTab === 'clauseRadar'
                ? 'bg-ink text-alabaster shadow-subtle font-semibold'
                : 'text-ink-muted hover:text-ink hover:bg-parchment'
            }`}
          >
            Clause Radar
          </button>
        </nav>

        {/* Right: Persona Switcher & Sleek Guide Me Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Persona Toggle */}
          <div
            data-tour="persona-selector"
            className="flex items-center bg-parchment/80 p-0.5 rounded-md border border-hairline text-xs font-medium"
          >
            <button
              onClick={() => onPersonaChange('founder')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all ${
                persona === 'founder'
                  ? 'bg-alabaster text-ink shadow-subtle font-semibold'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span className="hidden sm:inline">Founder</span>
            </button>
            <button
              onClick={() => onPersonaChange('professional')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all ${
                persona === 'professional'
                  ? 'bg-alabaster text-ink shadow-subtle font-semibold'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              <span className="hidden sm:inline">Career</span>
            </button>
          </div>

          {/* Guide Me Button */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-all shadow-subtle group cursor-pointer"
            title="Launch interactive spotlight walkthrough"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-45 transition-transform" />
            <span className="font-sans font-semibold">Guide Me</span>
          </button>
        </div>
      </div>
    </header>
  );
};
