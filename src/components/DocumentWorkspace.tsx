import React, { useState } from 'react';
import { ViewMode, SynthesisResult, ScenarioPreset, Persona } from '../types';
import { PresetSelector } from './PresetSelector';
import { RedlineViewer } from './RedlineViewer';
import { FileEdit, Check, Copy, SlidersHorizontal, Eye, ShieldCheck, RefreshCw } from 'lucide-react';

interface DocumentWorkspaceProps {
  persona: Persona;
  presets: ScenarioPreset[];
  activePresetId: string | null;
  onSelectPreset: (preset: ScenarioPreset) => void;
  rawDraft: string;
  onDraftChange: (text: string) => void;
  synthesis: SynthesisResult;
  firmness: number;
  diplomacy: number;
}

export const DocumentWorkspace: React.FC<DocumentWorkspaceProps> = ({
  persona,
  presets,
  activePresetId,
  onSelectPreset,
  rawDraft,
  onDraftChange,
  synthesis,
  firmness,
  diplomacy,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('redline');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(synthesis.cleanDispatch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewDraft = () => {
    onDraftChange('');
    setViewMode('raw');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Scenario Presets Bar */}
      <div className="border-b border-hairline pb-2">
        <PresetSelector
          presets={presets}
          persona={persona}
          activePresetId={activePresetId}
          onSelectPreset={(p) => {
            onSelectPreset(p);
            setViewMode('redline');
          }}
          onNewDraft={handleNewDraft}
        />
      </div>

      {/* View Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-parchment/70 p-2 rounded-lg border border-hairline">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('redline')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'redline'
                ? 'bg-alabaster-50 text-ink shadow-subtle font-semibold border border-hairline'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-leverage-green" />
            <span>Live Redline</span>
            {synthesis.detectedHazards.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-100 text-hazard-red text-[10px] font-mono font-bold flex items-center justify-center">
                {synthesis.detectedHazards.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setViewMode('clean')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'clean'
                ? 'bg-alabaster-50 text-ink shadow-subtle font-semibold border border-hairline'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-ink" />
            <span>Clean Dispatch</span>
          </button>

          <button
            onClick={() => setViewMode('raw')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'raw'
                ? 'bg-alabaster-50 text-ink shadow-subtle font-semibold border border-hairline'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 text-ink-muted" />
            <span>Raw Draft</span>
          </button>
        </div>

        {/* Action Button: Copy Dispatch */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all border ${
              copied
                ? 'bg-leverage-greenBg text-leverage-green border-leverage-green font-semibold'
                : 'bg-ink text-alabaster border-ink hover:bg-ink-light'
            }`}
            title="Copy clean, high-leverage dispatch to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Dispatch</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Workspace Body */}
      {viewMode === 'redline' && (
        <RedlineViewer
          tokens={synthesis.redlineTokens}
          hazards={synthesis.detectedHazards}
          firmness={firmness}
          diplomacy={diplomacy}
        />
      )}

      {viewMode === 'clean' && (
        <div className="flex flex-col gap-4">
          <div className="p-6 md:p-8 rounded-xl bg-alabaster-50 border border-hairline shadow-subtle">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline text-xs font-mono text-ink-muted">
              <span>SEND-READY EXECUTIVE DISPATCH</span>
              <span className="text-leverage-green font-semibold">Zero Hazards • Formatted</span>
            </div>
            <div className="font-serif text-lg md:text-[19px] leading-relaxed text-ink whitespace-pre-wrap">
              {synthesis.cleanDispatch}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'raw' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-ink-muted font-mono">
            <span>PASTE OR EDIT RAW MESSAGE DRAFT</span>
            <span>{rawDraft.length} characters</span>
          </div>
          <textarea
            value={rawDraft}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder="Paste your sensitive email or Slack draft here (e.g., following up with an investor, handling an aggressive client, or addressing compensation with your manager)..."
            rows={8}
            className="w-full p-5 rounded-xl bg-alabaster-50 border border-hairline font-serif text-base text-ink focus:outline-none focus:ring-1 focus:ring-ink focus:border-ink shadow-subtle resize-y"
          />
          <p className="text-xs text-ink-muted">
            Tip: Switch back to <strong>Live Redline</strong> to instantly see detected passive-aggressive traps, hedging, and unforced concessions.
          </p>
        </div>
      )}
    </div>
  );
};
