import type { CommentStatus, PanelComment, ReviewStage } from '../types/panel';

export const reviewStages: ReviewStage[] = ['Proposal', 'Progress Presentation 1', 'Progress Presentation 2', 'Final Presentation'];

export const commentComponents = [
{ id: 'overall', label: 'Overall project' },
{ id: 'sankadeepa', label: 'Temperature & Pressure · Sankadeepa W.D.I.' },
{ id: 'ranasingha', label: 'Wind · Ranasingha R.A.A.D.' },
{ id: 'jayawardhana', label: 'Cloud & Visibility · Jayawardhana H.M.S.I.' },
{ id: 'jayathilaka', label: 'Humidity, QNH & Dew Point · Jayathilaka P.K.V.K.' }];


export const statusLabels: Record<CommentStatus, string> = {
  open: 'Open',
  'in-progress': 'In progress',
  addressed: 'Addressed'
};

/**
 * Official panel feedback, visible to everyone.
 * Add entries here as { id, stage, component, comment, response, status, source: 'published' }.
 */
export const panelComments: PanelComment[] = [];