import React, { useState, useMemo } from 'react';
import { Persona, PillarTab, ScenarioPreset } from './types';
import { SCENARIO_PRESETS } from './data/scenarioPresets';
import { synthesizeDraft } from './engine/synthesisEngine';
import { TelemetryBar } from './components/TelemetryBar';
import { DocumentWorkspace } from './components/DocumentWorkspace';
import { ShieldCheck, Lock, Sparkles, Scale } from 'lucide-react';

export function App() {
  const [persona, setPersona] = useState<Persona>('founder');
  const [activeTab, setActiveTab] = useState<PillarTab>('equalizer');
  const [firmness, setFirmness] = useState<number>(85);
  const [diplomacy, setDiplomacy] = useState<number>(90);

  // Active scenario preset
  const defaultPreset = SCENARIO_PRESETS.find((p) => p.persona === 'founder') || SCENARIO_PRESETS[0];
  const [activePresetId, setActivePresetId] = useState<string | null>(defaultPreset.id);
  const [rawDraft, setRawDraft] = useState<string>(defaultPreset.rawDraft);

  // Handle persona switch
  const handlePersonaChange = (newPersona: Persona) => {
    setPersona(newPersona);
    const firstMatchingPreset = SCENARIO_PRESETS.find((p) => p.persona === newPersona);
    if (firstMatchingPreset) {
      setActivePresetId(firstMatchingPreset.id);
      setRawDraft(firstMatchingPreset.rawDraft);
    } else {
      setActivePresetId(null);
      setRawDraft('');
    }
  };

  // Handle preset select
  const handleSelectPreset = (preset: ScenarioPreset) => {
    setActivePresetId(preset.id);
    setRawDraft(preset.rawDraft);
  };

  // Active preset object
  const activePreset = useMemo(() => {
    return SCENARIO_PRESETS.find((p) => p.id === activePresetId) || null;
  }, [activePresetId]);

  // Reactive synthesis (0ms local calculation)
  const synthesis = useMemo(() => {
    return synthesizeDraft(rawDraft, firmness, diplomacy, activePreset);
  }, [rawDraft, firmness, diplomacy, activePreset]);

  return (
    <div className="min-h-screen bg-alabaster flex flex-col font-sans text-ink">
      {/* Top Telemetry & Controls Bar */}
      <TelemetryBar
        persona={persona}
        onPersonaChange={handlePersonaChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        firmness={firmness}
        onFirmnessChange={setFirmness}
        diplomacy={diplomacy}
        onDiplomacyChange={setDiplomacy}
        leverageScore={synthesis.leverageScore}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        {activeTab === 'equalizer' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-ink">
                  Subtext Equalizer
                </h1>
                <p className="text-sm text-ink-muted mt-1 max-w-2xl font-serif italic">
                  Strip emotional vulnerability, hedging, and unforced concessions from critical emails and messages before sending.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-ink-muted bg-parchment px-3 py-1.5 rounded border border-hairline self-start">
                <Lock className="w-3.5 h-3.5 text-leverage-green" />
                <span>Client-Side Local Session • Zero Remote Leaks</span>
              </div>
            </div>

            <DocumentWorkspace
              persona={persona}
              presets={SCENARIO_PRESETS}
              activePresetId={activePresetId}
              onSelectPreset={handleSelectPreset}
              rawDraft={rawDraft}
              onDraftChange={(text) => {
                setRawDraft(text);
                setActivePresetId(null);
              }}
              synthesis={synthesis}
              firmness={firmness}
              diplomacy={diplomacy}
            />
          </div>
        )}

        {activeTab === 'objections' && (
          <div className="p-12 text-center rounded-2xl bg-parchment-card border border-hairline my-8 shadow-subtle">
            <Scale className="w-10 h-10 text-ink mx-auto mb-3 opacity-80" />
            <h2 className="font-serif text-2xl font-bold text-ink">Objection Simulator</h2>
            <p className="text-sm text-ink-muted max-w-md mx-auto mt-2">
              Pillar 2: Stress-test adversarial pushback and rehearse 3-part counter-frames (Direct Answer, Pivot, High Ground).
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-parchment text-xs font-mono text-ink-muted border border-hairline">
              <span>Slice 3 in build schedule</span>
            </div>
          </div>
        )}

        {activeTab === 'clauseRadar' && (
          <div className="p-12 text-center rounded-2xl bg-parchment-card border border-hairline my-8 shadow-subtle">
            <ShieldCheck className="w-10 h-10 text-ink mx-auto mb-3 opacity-80" />
            <h2 className="font-serif text-2xl font-bold text-ink">Clause Radar</h2>
            <p className="text-sm text-ink-muted max-w-md mx-auto mt-2">
              Pillar 3: Contract Gotcha Scanner identifying vesting traps, non-competes, and offering 1-click counter-clauses.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-parchment text-xs font-mono text-ink-muted border border-hairline">
              <span>Slice 4 in build schedule</span>
            </div>
          </div>
        )}
      </main>

      {/* Swiss Editorial Footer */}
      <footer className="border-t border-hairline bg-parchment/40 py-6 px-4 md:px-8 mt-12 text-xs font-mono text-ink-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-ink text-sm">LEVERAGE</span>
            <span>—</span>
            <span>High-Stakes Career & Venture Copilot</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Built with AI: Basics</span>
            <span>•</span>
            <span className="text-leverage-green font-medium">100% Client-Side Evaluation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
