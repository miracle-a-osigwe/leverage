import { HazardItem, RedlineToken, SynthesisResult, ScenarioPreset, BaselinePosture } from '../types';
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

/**
 * Compute the raw baseline posture of any draft BEFORE Leverage transformations are applied.
 * Works dynamically across presets and arbitrary custom user text.
 */
export function computeRawBaseline(
  draft: string,
  detectedHazards: HazardItem[],
  activePreset?: ScenarioPreset | null
): BaselinePosture {
  if (!draft || draft.trim().length === 0) {
    return {
      firmness: 50,
      diplomacy: 50,
      leverageScore: 50,
      riskCategory: 'balanced-viable',
      diagnosisLabel: 'Empty Draft',
      summary: 'Enter or select a draft to analyze linguistic posture.',
    };
  }

  // Count specific hazard categories
  const unforcedConcessions = detectedHazards.filter((h) => h.category === 'unforced-concession').length;
  const defensiveHedges = detectedHazards.filter((h) => h.category === 'defensive-hedging').length;
  const passiveAggressive = detectedHazards.filter((h) => h.category === 'passive-aggressive').length;

  // Linguistic pattern detectors for custom text
  const lower = draft.toLowerCase();
  const apologyMatches = (lower.match(/\b(sorry|apolog|excuse me|hate to bother|bugging you)\b/gi) || []).length;
  const timidMatches = (lower.match(/\b(wondering if|hoping to|kind of|sort of|maybe|just checking|just wanted)\b/gi) || []).length;
  const surrenderMatches = (lower.match(/\b(whenever you|at your convenience|sometime next|let me know what works|no rush)\b/gi) || []).length;
  const concessionMatches = (lower.match(/\b(discount|revisit valuation|can't afford|tight budget|payroll|try my best|whatever works)\b/gi) || []).length;
  const hostileMatches = (lower.match(/\b(shocked|unfair|not cool|dumped on|care about|ridiculous|unacceptable)\b/gi) || []).length;
  const anchorMatches = (lower.match(/\b(confirm|deadline|agreement|executed|schedule|milestone|covenant|terms|by \d{1,2}|close of business)\b/gi) || []).length;
  const diplomaticMatches = (lower.match(/\b(appreciate|thank you|alignment|collaborat|partner|mutually|respect)\b/gi) || []).length;

  // 1. Calculate Baseline Firmness (0-100)
  let rawFirmness = 50;
  rawFirmness -= unforcedConcessions * 14;
  rawFirmness -= defensiveHedges * 11;
  rawFirmness -= concessionMatches * 10;
  rawFirmness -= apologyMatches * 9;
  rawFirmness -= timidMatches * 7;
  rawFirmness -= surrenderMatches * 10;
  rawFirmness += anchorMatches * 10;
  if (passiveAggressive > 0 || hostileMatches > 0) {
    rawFirmness += (passiveAggressive + hostileMatches) * 4;
  }
  const baselineFirmness = Math.max(16, Math.min(88, Math.round(rawFirmness)));

  // 2. Calculate Baseline Diplomacy (0-100)
  let rawDiplomacy = 55;
  rawDiplomacy -= passiveAggressive * 18;
  rawDiplomacy -= hostileMatches * 14;
  rawDiplomacy += diplomaticMatches * 8;
  if (defensiveHedges > 0 || apologyMatches > 0) {
    rawDiplomacy += (defensiveHedges + apologyMatches) * 6;
  }
  const baselineDiplomacy = Math.max(18, Math.min(85, Math.round(rawDiplomacy)));

  // 3. Calculate Baseline Leverage Index (0-100)
  const totalConcessionSignals = unforcedConcessions + concessionMatches;
  const totalHostileSignals = passiveAggressive + hostileMatches;
  const totalHedgingSignals = defensiveHedges + apologyMatches + timidMatches + surrenderMatches;

  let rawLeverage = baselineFirmness * 0.45 + baselineDiplomacy * 0.35;
  rawLeverage -= totalConcessionSignals * 15;
  rawLeverage -= totalHostileSignals * 10;
  rawLeverage -= totalHedgingSignals * 5;

  if (anchorMatches > 0 && totalConcessionSignals === 0) {
    rawLeverage += anchorMatches * 8;
  }

  const baselineLeverage = Math.max(18, Math.min(92, Math.round(rawLeverage)));

  // 4. Determine Risk Category & Diagnostic Label
  let riskCategory: BaselinePosture['riskCategory'] = 'balanced-viable';
  let diagnosisLabel = 'Standard Commercial Baseline';
  let summary = 'Draft contains clear communication with moderate baseline posture.';

  if (totalConcessionSignals > 0 || unforcedConcessions > 0) {
    riskCategory = 'critical-concession';
    diagnosisLabel = 'Severe Concession Leak';
    summary = 'Voluntary concessions and vulnerability disclosures forfeit major deal gravity before negotiations start.';
  } else if (totalHostileSignals > 0 || baselineDiplomacy < 38) {
    riskCategory = 'hostile-friction';
    diagnosisLabel = 'Emotional & Hostile Friction';
    summary = 'Emotional grievance and passive-aggressive friction provoke defensive pushback rather than compliance.';
  } else if (totalHedgingSignals >= 2 || baselineFirmness < 38) {
    riskCategory = 'passive-deference';
    diagnosisLabel = 'Passive Hedging & Deference';
    summary = 'Apologetic phrasing and open-ended scheduling surrender initiative and telegraph low confidence.';
  } else if (baselineLeverage >= 75) {
    riskCategory = 'balanced-viable';
    diagnosisLabel = 'Institutional Command';
    summary = 'Disciplined execution with contractual grounding, clear deadlines, and professional boundary control.';
  }

  // Preset-specific tailored diagnostic summaries for high fidelity
  if (activePreset && draft === activePreset.rawDraft) {
    if (activePreset.id === 'founder-late-wire') {
      summary = 'Voluntary valuation renegotiation and acute payroll distress leaks surrender all deal leverage.';
      diagnosisLabel = 'Severe Concession Leak';
    } else if (activePreset.id === 'founder-vendor-surge') {
      summary = 'Appeals to emotional fairness and budget pleading replace contractual SLA leverage and BATNA.';
      diagnosisLabel = 'Emotional & Hostile Friction';
    } else if (activePreset.id === 'employee-burnout-grievance') {
      summary = 'Opening apologies, peer resentment, and reluctant compliance invite permanent managerial overreach.';
      diagnosisLabel = 'Martyrdom & Passive Deference';
    } else if (activePreset.id === 'employee-promotion-standoff') {
      summary = 'Pre-emptively validating company budget excuses forfeits merit-based leveling and compensation leverage.';
      diagnosisLabel = 'Premature Capitulation';
    }
  }

  return {
    firmness: baselineFirmness,
    diplomacy: baselineDiplomacy,
    leverageScore: baselineLeverage,
    riskCategory,
    diagnosisLabel,
    summary,
  };
}

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

  // 3. Compute raw baseline posture before transformation
  const baselinePosture = computeRawBaseline(draft, detectedHazards, activePreset);

  // 4. Generate tokenized redline diff
  const tokens: RedlineToken[] = [];
  let cursor = 0;

  // Sort hazards by appearance in draft
  const sortedHazards = [...detectedHazards]
    .map((h) => {
      const idx = draft.toLowerCase().indexOf(h.phrase.toLowerCase());
      return { ...h, index: idx };
    })
    .filter((h) => h.index !== -1)
    .sort((a, b) => a.index - b.index);

  if (sortedHazards.length === 0) {
    tokens.push({
      type: 'text',
      value: draft,
    });
  } else {
    sortedHazards.forEach((h) => {
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

  // 5. Synthesize clean dispatch
  let cleanDispatch = '';
  if (activePreset && draft === activePreset.rawDraft && activePreset.synthesizedBase[variantKey]) {
    cleanDispatch = activePreset.synthesizedBase[variantKey];
  } else {
    cleanDispatch = tokens
      .filter((t) => t.type !== 'deletion')
      .map((t) => t.value)
      .join('')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // 6. Compute Transformed Leverage Index (0-100%)
  // Starts from baseline and scales up as firmness and diplomacy remove hazards
  const hazardPenalty = detectedHazards.length * 12;
  const calibrationBonus = Math.round(firmness * 0.3 + diplomacy * 0.28);
  const rawBase = Math.max(20, 100 - hazardPenalty);
  
  // Clean leverage score reflects the transformed output
  const leverageScore = Math.min(99, Math.max(24, Math.round(rawBase * 0.38 + calibrationBonus)));

  return {
    redlineTokens: tokens,
    cleanDispatch,
    detectedHazards,
    baselinePosture,
    leverageScore,
    firmnessScore: firmness,
    diplomacyScore: diplomacy,
  };
}
