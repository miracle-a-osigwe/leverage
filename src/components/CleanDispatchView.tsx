import React, { useState } from 'react';
import { Copy, Check, Send, Download } from 'lucide-react';

interface CleanDispatchViewProps {
  dispatchText: string;
  firmness: number;
  diplomacy: number;
  leverageScore: number;
}

export const CleanDispatchView: React.FC<CleanDispatchViewProps> = ({
  dispatchText,
  firmness,
  diplomacy,
  leverageScore,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(dispatchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = dispatchText.trim() ? dispatchText.trim().split(/\s+/).length : 0;
  const charCount = dispatchText.length;

  return (
    <div className="flex flex-col gap-5">
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-parchment border border-hairline text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-leverage-green inline-block animate-pulse"></span>
          <span className="font-semibold text-ink">Send-Ready Executive Dispatch</span>
        </div>
        <div className="flex items-center gap-4 text-ink-muted">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
          <span>•</span>
          <span className="text-leverage-green font-semibold">Leverage: {leverageScore}%</span>
        </div>
      </div>

      {/* Dispatch Document Surface */}
      <div className="p-7 md:p-10 rounded-xl bg-alabaster-50 border border-hairline shadow-briefing relative">
        <div className="font-serif text-lg md:text-xl leading-relaxed text-ink whitespace-pre-wrap selection:bg-amber-100">
          {dispatchText}
        </div>

        {/* Floating Quick Action Footer inside Card */}
        <div className="mt-8 pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-ink-muted font-mono">
            Calibrated with <strong className="text-ink">{firmness}% Firmness</strong> & <strong className="text-ink">{diplomacy}% Diplomacy</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all border shadow-subtle ${
                copied
                  ? 'bg-leverage-greenBg text-leverage-green border-leverage-green font-semibold'
                  : 'bg-ink text-alabaster border-ink hover:bg-ink-light'
              }`}
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
      </div>
    </div>
  );
};
