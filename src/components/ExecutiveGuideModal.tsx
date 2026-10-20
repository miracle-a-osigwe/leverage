import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Compass } from 'lucide-react';

interface ExecutiveGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: () => void;
}

interface TourStep {
  targetSelector: string;
  title: string;
  description: string;
  actionHint: string;
  badge: string;
}

interface ElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const ExecutiveGuideModal: React.FC<ExecutiveGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<ElementRect | null>(null);

  // Reset guide stage to 0 whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  const handleClose = () => {
    setCurrentStep(0);
    setTargetRect(null);
    onClose();
  };

  const handleFinish = () => {
    setCurrentStep(0);
    setTargetRect(null);
    onSelectSample();
    onClose();
  };

  const steps: TourStep[] = [
    {
      targetSelector: '[data-tour="preset-scenarios"]',
      title: "1. Select Scenario or Persona",
      description: "Switch between 'Founder' and 'Career' at the top, or click any scenario chip below (e.g., 'Late Investor Wire' or 'Vendor 40% Surge') to load real-world negotiation text.",
      actionHint: "Target highlighted below in glowing spotlight.",
      badge: "Scenario Context",
    },
    {
      targetSelector: '[data-tour="calibration-sliders"]',
      title: "2. Calibrate Firmness & Diplomacy",
      description: "Drag the Firmness and Diplomacy sliders in real time. Notice the tone label and the live Leverage Index gauge update instantly with zero lag.",
      actionHint: "Target highlighted on the calibration ribbon.",
      badge: "Tone Calibration Matrix",
    },
    {
      targetSelector: '[data-tour="redline-canvas"]',
      title: "3. Inspect the Live Redline & Traps",
      description: "Crimson strikethroughs remove unforced concessions and hedging, while sage additions enforce boundaries. Click hazard badges like [Hostile Friction] to view tactical rationale.",
      actionHint: "Target highlighted in the document redline canvas.",
      badge: "Subtext Equalizer",
    },
    {
      targetSelector: '[data-tour="copy-dispatch"]',
      title: "4. Export Clean Dispatch",
      description: "Toggle to 'Clean Dispatch' to preview the send-ready communication, or click 'Copy Dispatch' to instantly copy the hardened message to your clipboard.",
      actionHint: "Target highlighted to the left.",
      badge: "Copy Dispatch",
    },
    {
      targetSelector: '[data-tour="pillar-tabs"]',
      title: "5. Explore Pillars 2 & 3",
      description: "Use the top tabs to switch to Pillar 2 (Objection Simulator for adversarial meeting pushback) and Pillar 3 (Clause Radar for contract gotcha analysis).",
      actionHint: "Target highlighted in the top header navigation.",
      badge: "Meeting & Contract Pillars",
    },
  ];

  // Measure and track target element bounding coordinates
  const updateTargetCoordinates = useCallback(() => {
    if (!isOpen) return;

    const step = steps[currentStep];
    const targetEl = document.querySelector(step.targetSelector) as HTMLElement | null;

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setTargetRect(null);
    }
  }, [isOpen, currentStep]);

  // Scroll target into view & update rect on step change
  useEffect(() => {
    if (!isOpen) {
      setTargetRect(null);
      return;
    }

    const step = steps[currentStep];
    const targetEl = document.querySelector(step.targetSelector) as HTMLElement | null;

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Short delay to allow smooth scrolling to settle
      const timer = setTimeout(updateTargetCoordinates, 150);
      const timer2 = setTimeout(updateTargetCoordinates, 350);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [isOpen, currentStep, updateTargetCoordinates]);

  // Keep target rect synchronized on scroll & window resize
  useEffect(() => {
    if (!isOpen) return;

    updateTargetCoordinates();
    window.addEventListener('resize', updateTargetCoordinates);
    window.addEventListener('scroll', updateTargetCoordinates, true);

    return () => {
      window.removeEventListener('resize', updateTargetCoordinates);
      window.removeEventListener('scroll', updateTargetCoordinates, true);
    };
  }, [isOpen, updateTargetCoordinates]);

  if (!isOpen) return null;

  const current = steps[currentStep];

  return (
    <>
      {/* Dynamic 9999px Box-Shadow Spotlight Frame */}
      {targetRect && (
        <div
          style={{
            position: 'fixed',
            top: `${Math.max(0, targetRect.top - 8)}px`,
            left: `${Math.max(0, targetRect.left - 8)}px`,
            width: `${targetRect.width + 16}px`,
            height: `${targetRect.height + 16}px`,
            boxShadow: '0 0 0 9999px rgba(18, 18, 18, 0.65), 0 0 35px rgba(245, 158, 11, 0.8)',
            borderRadius: '14px',
            border: '3px solid #f59e0b',
            pointerEvents: 'none',
            zIndex: 45,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Animated Target Beacon: Displayed to the right for copy-dispatch where space exists, or cleanly above for larger blocks */}
          {current.targetSelector === '[data-tour="copy-dispatch"]' ||
          (targetRect.height < 70 && targetRect.left + targetRect.width + 240 < window.innerWidth) ? (
            <div
              className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-amber-500 text-ink font-mono font-bold text-[11px] tracking-wide flex items-center gap-1.5 shadow-xl whitespace-nowrap z-50 border border-amber-300 uppercase animate-fadeIn"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>← Target: {current.badge}</span>
            </div>
          ) : (
            <div className="absolute bottom-[calc(100%+8px)] left-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-ink-dark text-[10px] font-mono font-bold tracking-wide flex items-center gap-1.5 shadow-lg uppercase whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Target: {current.badge}</span>
            </div>
          )}
        </div>
      )}

      {/* Fallback full-screen backdrop if element rect not yet available */}
      {!targetRect && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-ink/65 backdrop-blur-[2px] transition-opacity"
        />
      )}

      {/* Click-to-close transparent layer over the dimmed region */}
      <div
        onClick={handleClose}
        className="fixed inset-0 z-44 cursor-pointer"
        title="Click anywhere outside to close tour"
      />

      {/* Floating Guided Tour Card (Docked at bottom-right) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-lg w-[calc(100vw-2rem)] bg-alabaster border-2 border-amber-400 rounded-2xl shadow-briefing p-6 animate-fadeIn"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
              {current.badge} • Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="text-ink-muted hover:text-ink p-1 rounded-md hover:bg-parchment transition-colors"
            title="Close walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <h4 className="font-serif text-lg font-bold text-ink mb-1.5">
          {current.title}
        </h4>
        <p className="text-xs text-ink-light leading-relaxed mb-3">
          {current.description}
        </p>

        {/* Action Hint */}
        <div className="p-2.5 rounded-lg bg-parchment border border-hairline text-[11px] font-mono text-ink-muted flex items-center gap-2 mb-5">
          <Compass className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{current.actionHint}</span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-hairline">
          {/* Step Dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStep ? 'w-5 bg-ink' : 'w-2 bg-hairline hover:bg-hairline-dark'
                }`}
                title={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-ink hover:bg-parchment border border-hairline flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-1.5 rounded-md text-xs font-medium bg-ink text-alabaster hover:bg-ink-light border border-ink flex items-center gap-1.5 shadow-subtle cursor-pointer"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-4 py-1.5 rounded-md text-xs font-medium bg-leverage-green text-alabaster hover:bg-green-700 border border-leverage-green flex items-center gap-1.5 shadow-subtle font-semibold cursor-pointer"
              >
                Done • Try Scenario
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
