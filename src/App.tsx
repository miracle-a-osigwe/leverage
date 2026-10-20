import React, { useState, useMemo } from 'react';
import { Persona, PillarTab, ScenarioPreset } from './types';
import { SCENARIO_PRESETS } from './data/scenarioPresets';
import { synthesizeDraft } from './engine/synthesisEngine';
import { TelemetryBar } from './components/TelemetryBar';
import { DocumentWorkspace } from './components/DocumentWorkspace';
import { ExecutiveGuideModal } from './components/ExecutiveGuideModal';
import { ObjectionSimulator } from './components/ObjectionSimulator';
import { ClauseRadar } from './components/ClauseRadar';
import { Lock } from 'lucide-react';

export function App() {
  const [persona, setPersona] = useState<Persona>('founder');
  const [activeTab, setActiveTab] = useState<PillarTab>('equalizer');
  const [firmness, setFirmness] = useState<number>(85);
  const [diplomacy, setDiplomacy] = useState<number>(90);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

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
      {/* Top Clean Global Bar */}
      <TelemetryBar
        persona={persona}
        onPersonaChange={handlePersonaChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
        {activeTab === 'equalizer' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-ink">
                  Subtext Equalizer
                </h1>
                <p className="text-xs md:text-sm text-ink-muted mt-0.5 font-serif italic">
                  Neutralize defensive hedging, hostility, and unforced concessions before sending.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-ink-muted bg-parchment/80 px-2.5 py-1 rounded border border-hairline self-start">
                <Lock className="w-3 h-3 text-leverage-green" />
                <span>Client-Side Local Session • Zero Remote Leaks</span>
              </div>
            </div>

            <DocumentWorkspace
              persona={persona}
              presets={SCENARIO_PRESETS}
              activePresetId={activePresetId}
              activePreset={activePreset}
              onSelectPreset={handleSelectPreset}
              rawDraft={rawDraft}
              onDraftChange={(text) => {
                setRawDraft(text);
                setActivePresetId(null);
              }}
              synthesis={synthesis}
              firmness={firmness}
              onFirmnessChange={setFirmness}
              diplomacy={diplomacy}
              onDiplomacyChange={setDiplomacy}
            />
          </div>
        )}

        {activeTab === 'objections' && (
          <ObjectionSimulator
            currentPersona={persona}
            onPersonaChange={handlePersonaChange}
          />
        )}

        {activeTab === 'clauseRadar' && (
          <ClauseRadar
            currentPersona={persona}
            onPersonaChange={handlePersonaChange}
          />
        )}
      </main>

      {/* Interactive Spotlight Guide Modal */}
      <ExecutiveGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onSelectSample={() => {
          handleSelectPreset(defaultPreset);
          setActiveTab('equalizer');
        }}
      />

      {/* Swiss Editorial Footer */}
      <footer className="border-t border-hairline bg-parchment/40 py-5 px-4 md:px-8 mt-10 text-xs font-mono text-ink-muted">
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
