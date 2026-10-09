import type { LucideIcon } from 'lucide-react';

export type MetricName = 'R²' | 'MAE' | 'RMSE' | 'Accuracy';
export type Qualifier = 'approx' | 'below' | 'exact';

export interface ReportedValue {
  label: string;
  model: string;
  metric: MetricName;
  value: number;
  unit: string;
  qualifier: Qualifier;
}

export interface MetricComparisonSpec {
  title: string;
  metric: MetricName;
  unit: string;
  higherIsBetter: boolean;
  max: number;
  values: ReportedValue[];
  note?: string;
}

export interface ConceptTerm {
  term: string;
  explanation: string;
}

export interface InvestigatedModel {
  name: string;
  type: string;
  role: string;
}

export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  initials: string;
  shortTitle: string;
  cardTitle: string;
  cardSummary: string;
  area: string;
  responsibilities: string[];
  problem: string;
  dataFeatures: string[];
  models: InvestigatedModel[];
  rationale: string;
  evaluation: string[];
  objectives: string[];
  findings: ReportedValue[];
  findingsNote: string;
  comparison?: MetricComparisonSpec;
  integration: string;
  integrationPoints: string[];
  concepts: ConceptTerm[];
}

export interface ModelDetail {
  name: string;
  type: string;
  what: string;
  relevance: string;
  formula?: string;
}

export interface ModelFamily {
  id: string;
  title: string;
  owner: string;
  icon: LucideIcon;
  models: string[];
  what: string;
  why: string;
  alternatives: string;
  evaluation: string;
  details: ModelDetail[];
}

export interface MethodPrinciple {
  title: string;
  body: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface ArchLayer {
  id: string;
  title: string;
  icon: LucideIcon;
  items: {name: string;role?: string;}[];
}

export interface NavItem {
  label: string;
  to: string;
}

export interface ResearchDocument {
  id: string;
  kind: string;
  title: string;
  path: string;
  fileName: string;
  summaryLabel: string;
  summary: string;
}