import { ObjectionScenario } from '../types';

export const OBJECTION_PRESETS: ObjectionScenario[] = [
  // FOUNDER PERSONA
  {
    id: 'founder-valuation-pushback',
    title: 'Valuation Pushback',
    persona: 'founder',
    adversaryRole: 'General Partner, Venture Capital Syndicate',
    objectionText: 'We love the product and team, but at an $18M pre-money valuation your terms are too rich for the current market. If you reset to $12M, we can issue a term sheet by Friday.',
    counterFrames: {
      directAnswer: 'We respect your discipline on entry pricing. However, $12M pre-money does not align with our 3.4x year-over-year ARR growth or capital efficiency profile.',
      pivotFrame: 'Our customer acquisition economics allow this round to finance 24 months through cash-flow neutrality, eliminating the need for a bridge round. That capital durability represents significantly higher risk-adjusted returns at $18M than cheaper, cash-hungry competitors.',
      highGroundQuestion: 'If we maintain the $18M pre-money structure, what specific milestone cadence would give your investment committee complete conviction to lead the round?'
    }
  },
  {
    id: 'founder-burn-rate',
    title: 'Burn Rate & Runway Pushback',
    persona: 'founder',
    adversaryRole: 'Investment Committee Lead',
    objectionText: 'Your net burn has doubled over the last two quarters. Given the macro climate, how do we know this capital won’t just get incinerated on unproven go-to-market channels?',
    counterFrames: {
      directAnswer: 'The increase in burn was deliberate, budgeted, and strictly front-loaded. 70% was allocated to hiring our core platform engineering team, which is now fully staffed.',
      pivotFrame: 'Every dollar invested in infrastructure has compressed customer deployment time from six weeks to four days, expanding enterprise net revenue retention to 138%.',
      highGroundQuestion: 'What specific customer acquisition payback threshold does your committee look for before authorizing expansion capital?'
    }
  },
  {
    id: 'founder-unpaid-pilot',
    title: 'Unpaid Enterprise Pilot Request',
    persona: 'founder',
    adversaryRole: 'VP of Global Procurement, Enterprise Prospect',
    objectionText: 'Our standard policy for venture-backed software vendors is a mandatory 90-day unpaid proof-of-concept before routing any commercial agreement through procurement.',
    counterFrames: {
      directAnswer: 'We understand procurement policies are designed to de-risk vendor integration. However, our dedicated engineering support cannot be deployed for unsponsored trials.',
      pivotFrame: 'To ensure executive alignment and guaranteed measurable ROI, we execute a 45-day Paid Deployment with pre-defined success metrics. Upon completion, 100% of the pilot fee is credited against the annual enterprise license.',
      highGroundQuestion: 'Who on your executive committee owns the quarterly efficiency target that this deployment is engineered to solve?'
    }
  },

  // PROFESSIONAL PERSONA
  {
    id: 'career-salary-band-cap',
    title: 'Rigid Base Salary Band',
    persona: 'professional',
    adversaryRole: 'Head of Talent Acquisition & Executive Compensation',
    objectionText: 'Our base salary band for this L6 Staff Architect role tops out strictly at $210,000. It is an internal equity ceiling across engineering and is strictly non-negotiable.',
    counterFrames: {
      directAnswer: 'I appreciate the transparency around internal salary banding and respect the need to maintain peer equity across the department.',
      pivotFrame: 'Because my primary focus is delivering high-impact architecture that drives platform reliability, we can maintain the base salary at $210,000 and bridge the compensation gap through an accelerated performance bonus and upfront sign-on equity.',
      highGroundQuestion: 'What metric of operational impact in the first 6 months would warrant an executive off-cycle equity adjustment?'
    }
  },
  {
    id: 'career-promotion-delay',
    title: 'Deferred Promotion Review',
    persona: 'professional',
    adversaryRole: 'VP of Engineering / Direct Manager',
    objectionText: 'You have done exceptional work leading the cloud migration, but senior title calibrations are frozen this half. Let’s revisit your Staff title during the Q4 review cycle.',
    counterFrames: {
      directAnswer: 'Thank you for recognizing the migration delivery and leadership across the team.',
      pivotFrame: 'Because I have been executing at the Staff scope for nine months—mentoring senior engineers and owning departmental uptime—revisiting this in Q4 without concrete criteria creates uncertainty about career trajectory.',
      highGroundQuestion: 'Can we establish a written memorandum today specifying the two critical milestones required to formalize the Staff title by the end of next month?'
    }
  },
  {
    id: 'career-equity-refresh',
    title: 'Equity Refresh Denial',
    persona: 'professional',
    adversaryRole: 'Compensation Committee Lead',
    objectionText: 'You are already in the 75th percentile of unvested equity value from your initial grant, so company guidelines do not permit a refresh allocation this year.',
    counterFrames: {
      directAnswer: 'I understand that guidelines are established to benchmark standard retention schedules.',
      pivotFrame: 'My original grant reflected the company’s risk profile three years ago; my current responsibility directly drives our enterprise flagship product which accounts for 40% of ARR. Ongoing retention should reflect current strategic criticality, not historical cost basis.',
      highGroundQuestion: 'How do you evaluate key-person retention risk when an executive contributor’s external replacement cost significantly exceeds standard bracket parameters?'
    }
  }
];
