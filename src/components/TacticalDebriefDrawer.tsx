import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Compass, ShieldAlert, Award, Lightbulb } from 'lucide-react';
import { HazardItem } from '../types';

interface TacticalDebriefDrawerProps {
  tacticalNotes: string[];
  hazards: HazardItem[];
  leverageScore: number;
}

export const TacticalDebriefDrawer: React.FC<TacticalDebriefDrawerProps> = ({
  tacticalNotes,
  hazards,
  leverageScore,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-xl border border-hairline bg-parchment/60 overflow-hidden shadow-subtle transition-all">
      {/* Header Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-parchment transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Compass className="w-4 h-4 text-ink" />
          <span className="font-serif font-bold text-base text-ink">Tactical Debrief & Strategic Rationale</span>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-alabaster-50 border border-hairline text-ink-muted">
            {hazards.length} Traps Neutralized
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
          <span>{isOpen ? 'Collapse' : 'Expand Briefing'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Drawer Content */}
      {isOpen && (
        <div className="px-5 pb-5 pt-1 space-y-4 border-t border-hairline/70">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            
            {/* Left: Strategic Leverage Notes */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5 font-semibold">
                <Award className="w-3.5 h-3.5 text-leverage-green" />
                Negotiation Leverage Principles Applied
              </h4>
              <ul className="space-y-2 text-xs text-ink/90">
                {tacticalNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-alabaster-50 p-2.5 rounded-lg border border-hairline/80">
                    <span className="w-4 h-4 rounded-full bg-leverage-greenBg text-leverage-green text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Subtext Hazards Neutralized */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 text-hazard-red" />
                Vulnerability Breakdown
              </h4>
              <div className="space-y-2 text-xs">
                {hazards.map((hazard) => (
                  <div key={hazard.id} className="p-2.5 rounded-lg bg-alabaster-50 border border-hairline/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif italic text-hazard-red line-through">"{hazard.phrase}"</span>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                        {hazard.category.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-muted leading-tight">{hazard.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Golden Executive Rule Card */}
          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 flex items-center gap-2.5 text-xs text-amber-900">
            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Executive Rule:</strong> High-stakes leverage is maintained by establishing explicit next milestones and deadlines, never by apologizing for holding counterparts to signed commitments.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
