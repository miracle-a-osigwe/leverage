export type Persona = 'founder' | 'professional';
export type PillarTab = 'equalizer' | 'objections' | 'clauseRadar';
export type ViewMode = 'redline' | 'clean' | 'raw';

export type HazardCategory = 'passive-aggressive' | 'defensive-hedging' | 'unforced-concession';

export interface HazardItem {
  id: string;
  phrase: string;
  category: HazardCategory;
  explanation: string;
  replacement: {
    balanced: string;
    firm: string;
    diplomatic: string;
    firmAndDiplomatic: string;
  };
}

export interface RedlineToken {
  type: 'text' | 'deletion' | 'insertion';
  value: string;
  hazard?: HazardItem;
}

export interface ScenarioPreset {
  id: string;
  title: string;
  persona: Persona;
  rawDraft: string;
  hazards: HazardItem[];
  synthesizedBase: {
    balanced: string;
    firm: string;
    diplomatic: string;
    firmAndDiplomatic: string;
  };
  tacticalNotes: string[];
}

export interface ObjectionScenario {
  id: string;
  title: string;
  persona: Persona;
  adversaryRole: string;
  objectionText: string;
  counterFrames: {
    directAnswer: string;
    pivotFrame: string;
    highGroundQuestion: string;
  };
}

export interface ClauseScenario {
  id: string;
  title: string;
  persona: Persona;
  clauseType: string;
  originalClause: string;
  riskLevel: 'high' | 'medium' | 'standard';
  riskExplanation: string;
  equitableCounterClause: string;
}

export interface SynthesisResult {
  redlineTokens: RedlineToken[];
  cleanDispatch: string;
  detectedHazards: HazardItem[];
  leverageScore: number; // 0-100
  firmnessScore: number;
  diplomacyScore: number;
}
