import React, { useState } from 'react';
import { RedlineToken, HazardItem } from '../types';
import { AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RedlineViewerProps {
  tokens: RedlineToken[];
  hazards: HazardItem[];
  firmness: number;
  diplomacy: number;
}

export const RedlineViewer: React.FC<RedlineViewerProps> = ({
  tokens,
  hazards,
  firmness,
  diplomacy,
}) => {
  const [selectedHazard, setSelectedHazard] = useState<HazardItem | null>(null);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'unforced-concession':
        return {
          label: 'Concession Leak',
          classes: 'bg-red-100 text-red-800 border-red-200',
        };
      case 'passive-aggressive':
        return {
          label: 'Hostile Friction',
          classes: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      case 'defensive-hedging':
      default:
        return {
          label: 'Hedging / Deference',
          classes: 'bg-amber-50 text-amber-700 border-amber-200',
        };
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Telemetry Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-parchment border border-hairline text-xs font-mono">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-hazard-red" />
          <span className="font-semibold text-ink">
            {hazards.length} Subtext {hazards.length === 1 ? 'Hazard' : 'Hazards'} Neutralized
          </span>
        </div>
        <div className="flex items-center gap-4 text-ink-muted">
          <span>Firmness: <strong className="text-ink">{firmness}%</strong></span>
          <span>Diplomacy: <strong className="text-ink">{diplomacy}%</strong></span>
          <span className="text-leverage-green font-semibold">Live Redline Active</span>
        </div>
      </div>

      {/* Main Redline Canvas */}
      <div className="p-6 md:p-8 rounded-xl bg-alabaster-50 border border-hairline shadow-subtle min-h-[280px]">
        <div className="prose max-w-none font-serif text-lg md:text-[19px] leading-relaxed text-ink/90 whitespace-pre-wrap">
          {tokens.map((token, index) => {
            if (token.type === 'deletion') {
              const badge = token.hazard ? getCategoryBadge(token.hazard.category) : null;
              return (
                <span key={index} className="inline-block my-0.5">
                  <span className="redline-del" title="Eliminated Subtext Hazard">
                    {token.value}
                  </span>
                  {badge && token.hazard && (
                    <button
                      type="button"
                      onClick={() => setSelectedHazard(token.hazard || null)}
                      className={`inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded text-[10px] font-sans font-semibold tracking-wide border cursor-pointer transition-transform hover:scale-105 ${badge.classes}`}
                    >
                      <AlertTriangle className="w-2.5 h-2.5" />
                      {badge.label}
                    </button>
                  )}
                </span>
              );
            }

            if (token.type === 'insertion') {
              return (
                <span key={index} className="redline-ins mx-0.5" title="Synthesized High-Leverage Insertion">
                  {token.value}
                </span>
              );
            }

            // Normal text
            return <span key={index}>{token.value}</span>;
          })}
        </div>
      </div>

      {/* Interactive Hazard Detail Modal / Drawer Callout */}
      {selectedHazard && (
        <div className="p-4 rounded-lg bg-red-50/60 border border-red-200 text-xs flex items-start justify-between gap-3 animate-fadeIn">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-hazard-red mt-0.5 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-ink">Subtext Analysis:</span>
                <span className="font-mono text-[10px] uppercase px-1.5 py-0.2 rounded bg-red-100 text-red-800 border border-red-200">
                  {selectedHazard.category.replace('-', ' ')}
                </span>
              </div>
              <p className="text-ink-light mb-1.5">{selectedHazard.explanation}</p>
              <div className="font-mono text-[11px] text-ink-muted">
                Original phrase: <span className="line-through text-hazard-red font-serif text-xs">"{selectedHazard.phrase}"</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedHazard(null)}
            className="text-ink-muted hover:text-ink font-mono text-xs px-2 py-1 rounded hover:bg-red-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Legend & Guide */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted font-sans pt-1">
        <span className="font-medium text-ink">Redline Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-red-100 border border-red-300 rounded inline-block"></span>
          <span className="line-through text-hazard-red text-[11px]">Crimson strikethrough</span>
          <span>= Subtext vulnerability</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-green-100 border-b-2 border-green-500 rounded inline-block"></span>
          <span className="text-leverage-green font-medium text-[11px]">Sage underline</span>
          <span>= Executive leverage phrasing</span>
        </div>
      </div>
    </div>
  );
};
