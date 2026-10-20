import { HazardItem, RedlineToken, SynthesisResult, ScenarioPreset } from '../types';
import { SCENARIO_PRESETS } from '../data/scenarioPresets';

// Common subtext hazard heuristics for custom user input
const COMMON_HAZARDS: Array<Omit<HazardItem, 'id'> & { regex: RegExp }> = [
  {
    regex: /sorry to bother you|hate to bother you|sorry for bugging you/i,
    phrase: 'sorry to bother you',
    category: 'defensive-hedging',
    explanation: 'Apologizing for basic business communication diminishes your professional authority.',
    replacement: {
      balanced: 'following up on our scheduled timeline',
      firm: 'following up to enforce our project milestones',
      diplomatic: 'reaching out to align on our next steps',
      firmAndDiplomatic: 'checking in to ensure our agreed schedule remains on track',
    },
  },
  {
    regex: /as per my last email|per my previous email/i,
    phrase: 'as per my last email',
    category: 'passive-aggressive',
    explanation: 'Passive-aggressive friction that provokes defensive reactions without providing leverage.',
    replacement: {
      balanced: 'as agreed in our previous correspondence',
      firm: 'per our executed terms',
      diplomatic: 'in accordance with our earlier notes',
      firmAndDiplomatic: 'in alignment with our agreed milestones',
    },
  },
  {
    regex: /i was wondering if|i was kind of hoping/i,
    phrase: 'I was wondering if',
    category: 'defensive-hedging',
    explanation: 'Hedging tone makes legitimate demands sound like timid requests.',
    replacement: {
      balanced: 'please confirm',
      firm: 'we require confirmation',
      diplomatic: 'let us confirm',
      firmAndDiplomatic: 'please advise on the timeline to confirm',
    },
  },
  {
    regex: /we kind of really need|kind of really/i,
    phrase: 'kind of really need',
    category: 'unforced-concession',
    explanation: 'Casual distress language signals severe vulnerability or lack of planning.',
    replacement: {
      balanced: 'our schedule requires',
      firm: 'our operational requirements necessitate',
      diplomatic: 'our planning is structured around',
      firmAndDiplomatic: 'our operational timeline is contingent on',
    },
  },
  {
    regex: /if the valuation is an issue|if that's too expensive/i,
    phrase: 'if the valuation is an issue now, we can always revisit it',
    category: 'unforced-concession',
    explanation: 'Voluntary capitulation offers a discount before any counterparty objection was made.',
    replacement: {
      balanced: 'the executed terms remain in effect',
      firm: 'our commercial terms are final and approved',
      diplomatic: 'the terms reflect our mutual understanding',
      firmAndDiplomatic: 'the valuation reflects our agreed subscription covenants',
    },
  },
  {
    regex: /let me know what works for you|whenever you're not super busy/i,
    phrase: 'let me know what works for you',
    category: 'defensive-hedging',
    explanation: 'Surrendering meeting scheduling allows the counterpart to delay indefinitely.',
    replacement: {
      balanced: 'please confirm by 3:00 PM EST',
      firm: 'please provide confirmation by end of day today',
      diplomatic: 'I am available between 2:00 and 4:00 PM to finalize this',
      firmAndDiplomatic: 'please confirm your availability for 3:00 PM EST today',
    },
  },
];

export function synthesizeDraft(
  draft: string,
  firmness: number, // 0-100
  diplomacy: number, // 0-100
  activePreset?: ScenarioPreset | null
): SynthesisResult {
  // 1. Determine tone variant
  let variantKey: 'balanced' | 'firm' | 'diplomatic' | 'firmAndDiplomatic' = 'balanced';
  if (firmness >= 60 && diplomacy >= 60) {
    variantKey = 'firmAndDiplomatic';
  } else if (firmness >= 60) {
    variantKey = 'firm';
  } else if (diplomacy >= 60) {
    variantKey = 'diplomatic';
  } else {
    variantKey = 'balanced';
  }

  // 2. Identify hazards
  let detectedHazards: HazardItem[] = [];

  if (activePreset && draft === activePreset.rawDraft) {
    detectedHazards = activePreset.hazards;
  } else {
    // Free-form heuristic scan
    detectedHazards = [];
    COMMON_HAZARDS.forEach((hazardRule, idx) => {
      const match = draft.match(hazardRule.regex);
      if (match && match.index !== undefined) {
        detectedHazards.push({
          id: `custom-h-${idx}`,
          phrase: match[0],
          category: hazardRule.category,
          explanation: hazardRule.explanation,
          replacement: hazardRule.replacement,
        });
      }
    });
  }

  // 3. Generate tokenized redline diff
  const tokens: RedlineToken[] = [];
  let remainingText = draft;
  let cursor = 0;

  // Sort hazards by appearance in draft
  const sortedHazards = [...detectedHazards].map(h => {
    const idx = draft.toLowerCase().indexOf(h.phrase.toLowerCase());
    return { ...h, index: idx };
  }).filter(h => h.index !== -1).sort((a, b) => a.index - b.index);

  if (sortedHazards.length === 0) {
    tokens.push({
      type: 'text',
      value: draft,
    });
  } else {
    sortedHazards.forEach(h => {
      const phraseIdx = draft.toLowerCase().indexOf(h.phrase.toLowerCase(), cursor);
      if (phraseIdx > cursor) {
        tokens.push({
          type: 'text',
          value: draft.slice(cursor, phraseIdx),
        });
      }

      if (phraseIdx !== -1) {
        tokens.push({
          type: 'deletion',
          value: draft.slice(phraseIdx, phraseIdx + h.phrase.length),
          hazard: h,
        });

        const replacement = h.replacement[variantKey];
        tokens.push({
          type: 'insertion',
          value: replacement,
        });

        cursor = phraseIdx + h.phrase.length;
      }
    });

    if (cursor < draft.length) {
      tokens.push({
        type: 'text',
        value: draft.slice(cursor),
      });
    }
  }

  // 4. Synthesize clean dispatch
  let cleanDispatch = '';
  if (activePreset && draft === activePreset.rawDraft && activePreset.synthesizedBase[variantKey]) {
    cleanDispatch = activePreset.synthesizedBase[variantKey];
  } else {
    cleanDispatch = tokens
      .filter(t => t.type !== 'deletion')
      .map(t => t.value)
      .join('')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // 5. Compute Leverage Index (0-100%)
  // Baseline is around 25-30% if unedited hazards exist.
  // With firmness and diplomacy calibrated, leverage reaches 90-98%.
  const hazardPenalty = detectedHazards.length * 14;
  const calibrationBonus = Math.round((firmness * 0.28) + (diplomacy * 0.26));
  const rawBase = Math.max(20, 100 - hazardPenalty);
  
  // Clean leverage score reflects the transformed output
  const leverageScore = Math.min(99, Math.max(24, Math.round(rawBase * 0.4 + calibrationBonus)));

  return {
    redlineTokens: tokens,
    cleanDispatch,
    detectedHazards,
    leverageScore,
    firmnessScore: firmness,
    diplomacyScore: diplomacy,
  };
}
