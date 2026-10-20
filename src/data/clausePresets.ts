import { ClauseScenario } from '../types';

export const CLAUSE_PRESETS: ClauseScenario[] = [
  // FOUNDER PERSONA
  {
    id: 'founder-vesting-clawback',
    title: 'Bad Leaver Equity Clawback',
    persona: 'founder',
    clauseType: 'Equity Vesting & Repurchase',
    riskLevel: 'high',
    originalClause: 'In the event of Founder’s departure for any reason, whether voluntary or involuntary, the Company retains the unilateral option to repurchase all unvested shares and up to 50% of already-vested Common Shares at par value ($0.0001 per share).',
    riskExplanation: 'Predatory "Bad Leaver" forfeiture trap. Permits an investor-controlled board to terminate a founder without cause and expropriate half of their earned, sweat-equity vested stock for negligible par value.',
    equitableCounterClause: 'The Company’s repurchase option shall apply exclusively to unvested shares, and only upon a final, non-appealable judicial finding of Cause (strictly limited to felony conviction or willful gross fraud causing material financial harm). All vested Common Shares shall remain the indefeasible property of the Founder, with customary double-trigger acceleration upon a change of control.'
  },
  {
    id: 'founder-retroactive-ip',
    title: 'Pre-Existing IP Expropriation',
    persona: 'founder',
    clauseType: 'Invention Assignment Agreement',
    riskLevel: 'high',
    originalClause: 'Founder assigns to the Company all rights, title, and interest in and to all inventions, software repositories, domain names, patents, and algorithms conceived, developed, or reduced to practice at any time prior to or during the term of association.',
    riskExplanation: 'Sweeping retroactive IP forfeiture. Unconditionally forces you to assign prior side projects, open-source repositories, and private domains created years before the company was incorporated.',
    equitableCounterClause: 'Assignment of intellectual property shall be strictly prospective and limited to inventions created after the Effective Date that directly incorporate or derive from the Company’s proprietary commercial codebase, expressly excluding prior inventions, personal open-source libraries, and general industry knowledge enumerated in Exhibit A.'
  },
  {
    id: 'founder-liquidation-overhang',
    title: '2.0x Participating Liquidation Overhang',
    persona: 'founder',
    clauseType: 'Term Sheet Liquidation Preference',
    riskLevel: 'high',
    originalClause: 'Series Seed Preferred Stock shall carry a 2.0x Participating Liquidation Preference with no ceiling, sharing pro-rata in all remaining liquidation proceeds alongside Common Stock.',
    riskExplanation: 'Aggressive "double-dipping" overhang. In a modest exit ($15M–$40M), preferred holders extract 200% of their principal before common equity receives a single dollar, frequently leaving founding teams with zero payout despite years of sweat equity.',
    equitableCounterClause: 'Series Seed Preferred Stock shall carry a standard 1.0x Non-Participating Liquidation Preference, converting into Common Stock on a 1:1 basis if and only if common conversion yields a greater financial distribution, ensuring mutual alignment between founders and syndicate investors.'
  },

  // PROFESSIONAL PERSONA
  {
    id: 'career-draconian-noncompete',
    title: 'Perpetual Nationwide Non-Compete',
    persona: 'professional',
    clauseType: 'Restrictive Covenants',
    riskLevel: 'high',
    originalClause: 'Employee agrees that for twenty-four (24) months following termination of employment for any reason, Employee shall not directly or indirectly consult, advise, or perform services for any entity operating within the software, technology, or digital cloud sector worldwide.',
    riskExplanation: 'Career suppression covenant. Bars you from working in modern tech anywhere in the world for two years, weaponizing legal threats to restrict employment mobility.',
    equitableCounterClause: 'Employee agrees for a period of six (6) months following voluntary resignation not to solicit direct proprietary clients with whom Employee had personal material engagement during the preceding ninety (90) days. No geographical non-competition restriction shall apply to subsequent employment or independent consulting.'
  },
  {
    id: 'career-moonlighting-ip',
    title: 'Moonlighting & Personal IP Confiscation',
    persona: 'professional',
    clauseType: 'Proprietary Inventions & Work Product',
    riskLevel: 'medium',
    originalClause: 'All inventions, applications, code repositories, and publications authored by Employee during the entire duration of employment—whether produced during working hours or on personal devices—shall belong exclusively to Employer.',
    riskExplanation: 'Sweeping personal IP seizure. Claims ownership of personal weekend hackathon projects, open-source contributions, and indie tools created on personal laptops with zero company assets.',
    equitableCounterClause: 'Inventions developed entirely on Employee’s own time, without utilizing Employer’s equipment, supplies, facilities, or proprietary trade secrets, and which do not directly relate to Employer’s existing commercial product line, shall remain the sole intellectual property of Employee (conforming to Cal. Lab. Code § 2870).'
  },
  {
    id: 'career-severance-discretionary',
    title: 'Discretionary Severance & Reputational Gag',
    persona: 'professional',
    clauseType: 'Separation & Severance Agreement',
    riskLevel: 'medium',
    originalClause: 'Severance payments may be revoked, terminated, or clawed back at the sole discretion of Employer if Employee engages in any communication deemed disparaging to Employer’s corporate reputation.',
    riskExplanation: 'Subjective forfeiture trap. Grants the employer unilateral authority to revoke agreed transition compensation based on arbitrary accusations without objective evidence or arbitration.',
    equitableCounterClause: 'Severance disbursements shall be unconditional and non-revocable upon mutual execution of the standard release of claims, subject exclusively to material breach of confidentiality verified through binding neutral arbitration with a mandatory fifteen (15) day notice and cure period.'
  }
];
