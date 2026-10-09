export type ReviewStage = 'Proposal' | 'Progress Presentation 1' | 'Progress Presentation 2' | 'Final Presentation';

export type CommentStatus = 'open' | 'in-progress' | 'addressed';

export interface PanelComment {
  id: string;
  stage: ReviewStage;
  component: string;
  comment: string;
  response: string;
  status: CommentStatus;
  source: 'published' | 'local';
}