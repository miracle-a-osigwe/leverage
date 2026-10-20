import React from 'react';
import { Persona, ScenarioPreset } from '../types';
import { Sparkles, FileText } from 'lucide-react';

interface PresetSelectorProps {
  presets: ScenarioPreset[];
  persona: Persona;
  activePresetId: string | null;
  onSelectPreset: (preset: ScenarioPreset) => void;
  onNewDraft: () => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  presets,
  persona,
  activePresetId,
  onSelectPreset,
  onNewDraft,
}) => {
  const filteredPresets = presets.filter((p) => p.persona === persona);

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5 mr-1">
        <Sparkles className="w-3.5 h-3.5 text-hazard-amber" />
        Scenarios:
      </span>

      {filteredPresets.map((preset) => {
        const isActive = activePresetId === preset.id;
        return (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${
              isActive
                ? 'bg-ink text-alabaster border-ink shadow-subtle'
                : 'bg-parchment-card hover:bg-parchment text-ink border-hairline hover:border-hairline-dark'
            }`}
          >
            {preset.title}
          </button>
        );
      })}

      <button
        onClick={onNewDraft}
        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border border-dashed border-hairline-dark ${
          activePresetId === null
            ? 'bg-ink text-alabaster border-ink'
            : 'text-ink-muted hover:text-ink hover:bg-parchment'
        }`}
      >
        + Blank Custom Draft
      </button>
    </div>
  );
};
