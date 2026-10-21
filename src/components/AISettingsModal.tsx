import React, { useState, useEffect } from 'react';
import { getGeminiApiKey, setGeminiApiKey, hasGeminiApiKey } from '../services/geminiService';
import { Sparkles, Key, CheckCircle2, AlertCircle, X, ExternalLink, ShieldCheck } from 'lucide-react';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated: () => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated
}) => {
  const [keyInput, setKeyInput] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const existing = getGeminiApiKey();
      setKeyInput(existing || '');
      setIsConfigured(hasGeminiApiKey());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setGeminiApiKey(keyInput);
    setIsConfigured(hasGeminiApiKey());
    setSavedSuccess(true);
    onKeyUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setGeminiApiKey('');
    setKeyInput('');
    setIsConfigured(false);
    onKeyUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl border border-[#E5E5E2] max-w-lg w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#737373] hover:text-[#121212] p-1 rounded-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#F5F5F3]">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#121212] flex items-center gap-2">
              Google Gemini AI Integration
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                2.5 Flash
              </span>
            </h2>
            <p className="text-xs text-[#737373] mt-0.5">
              Power dynamic objection counter-frames and contract audits with live Google GenAI.
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="my-4 p-3.5 rounded-lg border flex items-center justify-between text-xs bg-[#FAF9F6] border-[#E5E5E2]">
          <div className="flex items-center gap-2.5">
            {isConfigured ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <div>
                  <span className="font-semibold text-[#121212] block">AI Engine: Connected</span>
                  <span className="text-[#737373] text-[11px]">Active model: Google Gemini 2.5 Flash</span>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-semibold text-[#121212] block">AI Engine: Demo Fallback Mode</span>
                  <span className="text-[#737373] text-[11px]">Using curated responses. Enter API key to unlock live custom AI.</span>
                </div>
              </>
            )}
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
            isConfigured ? 'bg-sage-100 text-sage-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {isConfigured ? 'LIVE AI' : 'DEMO MODE'}
          </span>
        </div>

        {/* API Key Form */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-[#121212] uppercase tracking-wider font-mono">
            Google Gemini API Key
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
              <Key className="w-4 h-4" />
            </div>
            <input
              type={showKey ? 'text' : 'password'}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full pl-9 pr-20 py-2.5 text-xs font-mono border border-[#E5E5E2] rounded-lg bg-[#FAF9F6] text-[#121212] focus:outline-none focus:ring-1 focus:ring-slate-800 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[11px] font-mono text-[#737373] hover:text-[#121212]"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#737373] pt-1">
            <span>Free API tier available from Google AI Studio.</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900 font-medium underline"
            >
              Get Gemini API Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Privacy Callout */}
        <div className="mt-5 p-3 rounded-lg bg-[#F5F5F3] border border-[#E5E5E2] flex items-start gap-2.5 text-xs text-[#525252]">
          <ShieldCheck className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-[#121212]">Client-Side Privacy Guarantee:</strong> Your key is stored exclusively in your browser’s local storage. Requests are dispatched directly from your browser to Google’s API endpoint with zero intermediate logging.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-[#F5F5F3] flex items-center justify-between">
          {isConfigured ? (
            <button
              onClick={handleClear}
              className="text-xs text-crimson-600 hover:text-crimson-800 font-medium transition-colors"
            >
              Clear Stored Key
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-[#737373] hover:text-[#121212] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 text-xs font-medium rounded-lg text-white transition-all shadow-sm flex items-center gap-1.5 ${
                savedSuccess
                  ? 'bg-sage-600'
                  : 'bg-[#121212] hover:bg-black'
              }`}
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Saved ✓</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Save & Connect</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
