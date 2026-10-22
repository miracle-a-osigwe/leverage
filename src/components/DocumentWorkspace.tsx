import React, { useState } from 'react';
import { ViewMode, SynthesisResult, ScenarioPreset, Persona } from '../types';
import { PresetSelector } from './PresetSelector';
import { RedlineViewer } from './RedlineViewer';
import { CleanDispatchView } from './CleanDispatchView';
import { TacticalDebriefDrawer } from './TacticalDebriefDrawer';
import { FileEdit, Check, Copy, Eye, ShieldCheck, Sparkles, MessageSquare, Sliders, RotateCcw, Zap, ArrowRight, TrendingUp } from 'lucide-react';

interface DocumentWorkspaceProps {
  persona: Persona;
  presets: ScenarioPreset[];
  activePresetId: string | null;
  activePreset: ScenarioPreset | null;
  onSelectPreset: (preset: ScenarioPreset) => void;
  rawDraft: string;
  onDraftChange: (text: string) => void;
  synthesis: SynthesisResult;
  firmness: number;
  onFirmnessChange: (val: number) => void;
  diplomacy: number;
  onDiplomacyChange: (val: number) => void;
}

export const DocumentWorkspace: React.FC<DocumentWorkspaceProps> = ({
  persona,
  presets,
  activePresetId,
  activePreset,
  onSelectPreset,
  rawDraft,
  onDraftChange,
  synthesis,
  firmness,
  onFirmnessChange,
  diplomacy,
  onDiplomacyChange,
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

  const tacticalNotes = activePreset?.tacticalNotes || [
    'Converts defensive hedging into firm contractual milestones.',
    'Eliminates unforced financial and liquidity concessions.',
    'Protects professional authority while maintaining constructive dialogue.',
  ];

  const baseline = synthesis.baselinePosture;
  const leverageLift = synthesis.leverageScore - baseline.leverageScore;

  const handleAutoEqualize = () => {
    onFirmnessChange(85);
    onDiplomacyChange(90);
  };

  const handleResetToBaseline = () => {
    onFirmnessChange(baseline.firmness);
    onDiplomacyChange(baseline.diplomacy);
  };

  const getToneLabel = () => {
    if (firmness >= 60 && diplomacy >= 60) return 'Firm & Diplomatic';
    if (firmness >= 60) return 'Direct & Boundary-Enforcing';
    if (diplomacy >= 60) return 'Strategic & Diplomatic';
    return 'Balanced Executive';
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Scenario Presets Bar */}
      <div data-tour="preset-scenarios" className="border-b border-hairline pb-2 transition-all">
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

      {/* Calibration Ribbon: Dual Sliders + Tone Telemetry + Live Leverage Index */}
      <div
        data-tour="calibration-sliders"
        className="p-3.5 rounded-xl bg-parchment/70 border border-hairline shadow-subtle flex flex-col gap-3 transition-all"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ink text-alabaster shadow-subtle">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-ink flex items-center gap-2">
                <span>Tone Calibration Matrix</span>
                <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-alabaster text-ink-muted border border-hairline">
                  {getToneLabel()}
                </span>
              </div>
              <p className="text-[11px] text-ink-muted">0ms Client-Side Tactical Diff Engine</p>
            </div>
          </div>

          {/* Dynamic Baseline vs Transformed Posture Telemetry */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Raw Baseline Badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-alabaster border border-hairline font-mono text-[11px]"
              title={`Raw Baseline Posture: ${baseline.firmness}% Firmness, ${baseline.diplomacy}% Diplomacy`}
            >
              <span className="text-ink-muted font-sans text-[10px] uppercase">Raw Baseline</span>
              <strong className={baseline.leverageScore < 40 ? 'text-hazard-red font-bold' : 'text-hazard-amber font-bold'}>
                {baseline.leverageScore}%
              </strong>
              <span className="text-ink-muted text-[10px] hidden sm:inline">({baseline.diagnosisLabel})</span>
            </div>

            <ArrowRight className="w-3 h-3 text-ink-muted/50 hidden sm:inline" />

            {/* Quick Action: Auto-Equalize vs Reset */}
            {leverageLift > 4 ? (
              <button
                onClick={handleResetToBaseline}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono text-ink-muted hover:text-ink hover:bg-alabaster transition-all border border-hairline"
                title="Reset sliders back to raw draft baseline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Baseline ({baseline.firmness}% / {baseline.diplomacy}%)</span>
              </button>
            ) : (
              <button
                onClick={handleAutoEqualize}
                className="flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono font-medium bg-ink text-alabaster hover:bg-ink-muted transition-all shadow-subtle"
                title="Instantly calibrate sliders to optimal executive command"
              >
                <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span>Auto-Equalize Posture</span>
              </button>
            )}

            {/* Transformed Leverage Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-xs font-bold transition-all ${
                synthesis.leverageScore >= 80
                  ? 'text-leverage-green border-leverage-green/40 bg-leverage-greenBg'
                  : synthesis.leverageScore >= 50
                  ? 'text-hazard-amber border-hazard-amber/40 bg-hazard-amberBg'
                  : 'text-hazard-red border-hazard-red/40 bg-hazard-redBg'
              }`}
              title="Real-Time Transformed Leverage Index computed from active sliders"
            >
              <span className="text-[10px] uppercase font-sans font-normal text-ink-muted">Leverage</span>
              <span>{synthesis.leverageScore}%</span>
              {leverageLift > 0 && (
                <span className="text-[10px] font-normal text-leverage-green ml-0.5">
                  (+{leverageLift}%)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sliders Bar + Baseline Diagnostic Summary */}
        <div className="pt-2.5 border-t border-hairline/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-ink-muted italic">
            <span className="font-mono not-italic font-semibold text-ink uppercase text-[10px] px-1.5 py-0.5 rounded bg-alabaster border border-hairline">
              Diagnosis
            </span>
            <span className="truncate max-w-sm lg:max-w-md">{baseline.summary}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Firmness */}
            <div className="flex items-center gap-2">
              <div className="w-20 text-[11px] font-mono text-ink-muted flex justify-between">
                <span>Firmness</span>
                <strong className="text-ink font-semibold">{firmness}%</strong>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={firmness}
                onChange={(e) => onFirmnessChange(Number(e.target.value))}
                className="w-24 sm:w-28 h-1.5 bg-hairline rounded-lg appearance-none cursor-pointer accent-ink"
                title="Calibrate assertiveness and boundary enforcement"
              />
            </div>

            {/* Diplomacy */}
            <div className="flex items-center gap-2">
              <div className="w-20 text-[11px] font-mono text-ink-muted flex justify-between">
                <span>Diplomacy</span>
                <strong className="text-ink font-semibold">{diplomacy}%</strong>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={diplomacy}
                onChange={(e) => onDiplomacyChange(Number(e.target.value))}
                className="w-24 sm:w-28 h-1.5 bg-hairline rounded-lg appearance-none cursor-pointer accent-ink"
                title="Calibrate tactical tact and relationship preservation"
              />
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-parchment/50 p-2 rounded-lg border border-hairline">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('redline')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'redline'
                ? 'bg-alabaster text-ink shadow-subtle font-semibold border border-hairline'
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
                ? 'bg-alabaster text-ink shadow-subtle font-semibold border border-hairline'
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
                ? 'bg-alabaster text-ink shadow-subtle font-semibold border border-hairline'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 text-ink-muted" />
            <span>Raw Draft</span>
          </button>
        </div>

        {/* Action Button: Copy Dispatch */}
        <div data-tour="copy-dispatch" className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all border shadow-subtle ${
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

      {/* Empty State Guard */}
      {!rawDraft.trim() && viewMode !== 'raw' ? (
        <div className="p-10 text-center rounded-xl bg-alabaster border border-dashed border-hairline-dark my-4 space-y-4">
          <MessageSquare className="w-8 h-8 text-ink-muted mx-auto" />
          <h3 className="font-serif text-lg font-bold text-ink">No Message Draft Loaded</h3>
          <p className="text-xs text-ink-muted max-w-md mx-auto">
            Select one of the calibrated high-stakes presets above or click "Raw Draft" to paste your sensitive communication.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectPreset(presets[0])}
              className="px-4 py-2 rounded-lg bg-ink text-alabaster text-xs font-medium inline-flex items-center gap-1.5 hover:bg-ink-light"
            >
              <Sparkles className="w-3.5 h-3.5 text-hazard-amber" />
              Load "{presets[0].title}"
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Workspace Body: Redline Mode */}
          {viewMode === 'redline' && (
            <div data-tour="redline-canvas">
              <RedlineViewer
                tokens={synthesis.redlineTokens}
                hazards={synthesis.detectedHazards}
                firmness={firmness}
                diplomacy={diplomacy}
              />
            </div>
          )}

          {/* Workspace Body: Clean Dispatch Mode */}
          {viewMode === 'clean' && (
            <CleanDispatchView
              dispatchText={synthesis.cleanDispatch}
              firmness={firmness}
              diplomacy={diplomacy}
              leverageScore={synthesis.leverageScore}
            />
          )}

          {/* Workspace Body: Raw Editor Mode */}
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
                className="w-full p-5 rounded-xl bg-alabaster border border-hairline font-serif text-base text-ink focus:outline-none focus:ring-1 focus:ring-ink focus:border-ink shadow-subtle resize-y"
              />
              <p className="text-xs text-ink-muted">
                Tip: Switch back to <strong>Live Redline</strong> to instantly see detected passive-aggressive traps, hedging, and unforced concessions.
              </p>
            </div>
          )}

          {/* Tactical Debrief Drawer */}
          <div data-tour="tactical-debrief">
            <TacticalDebriefDrawer
              tacticalNotes={tacticalNotes}
              hazards={synthesis.detectedHazards}
              leverageScore={synthesis.leverageScore}
            />
          </div>
        </>
      )}
    </div>
  );
};
