import type { CommentStatus, PanelComment, ReviewStage } from '../types/panel';

export const reviewStages: ReviewStage[] = ['Proposal', 'Progress Presentation 1', 'Progress Presentation 2', 'Final Presentation'];

export const commentComponents = [
  { id: 'overall', label: 'Overall project' },
  { id: 'sankadeepa', label: 'IT22113986 · Sankadeepa W.D.I.' },
  { id: 'ranasingha', label: 'IT22269720 · Ranasingha R.A.A.D.' },
  { id: 'jayawardhana', label: 'IT22619976 · Jayawardhana H.M.S.I.' },
  { id: 'jayathilaka', label: 'IT22069504 · Jayathilaka P.K.V.K.' },
];

export const statusLabels: Record<CommentStatus, string> = {
  open: 'Open',
  'in-progress': 'In progress',
  addressed: 'Addressed',
};

// Student meta used by the list view
export const studentMeta: Record<string, { studentId: string; name: string; role: string; color: string }> = {
  sankadeepa:   { studentId: 'IT22113986', name: 'Sankadeepa W.D.I.',   role: 'Temperature & Pressure · RF–LSTM',           color: '#3b82f6' },
  ranasingha:   { studentId: 'IT22269720', name: 'Ranasingha R.A.A.D.', role: 'Wind · XGBoost–TFT',                         color: '#22c55e' },
  jayawardhana: { studentId: 'IT22619976', name: 'Jayawardhana H.M.S.I.', role: 'Cloud & Visibility · XGBoost / DecTree',   color: '#f59e0b' },
  jayathilaka:  { studentId: 'IT22069504', name: 'Jayathilaka P.K.V.K.', role: 'Humidity, QNH & Dew Point · LightGBM',      color: '#a855f7' },
};

/**
 * Official panel feedback — Panel: IT-P10 · Project: R26-IT-132
 * Topic: Aviation weather forecast verification system for SL monsoon patterns
 */
export const panelComments: PanelComment[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // PROPOSAL PRESENTATION
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'proposal-sankadeepa',
    stage: 'Proposal',
    component: 'sankadeepa',
    comment:
      'Since all group members are working on prediction models, it is essential for each student to clearly demonstrate their individual research contribution. Each member should be able to explain the specific model they implemented, including the type of model used, the parameters or hyperparameters considered, and the accuracy or evaluation metrics obtained from the model. In addition, students should also be able to discuss alternative models that could be applied to the same problem and justify why a particular model was selected over others. This type of comparison and justification is important to demonstrate the research depth of the work. No lit review.',
    response: '',
    status: 'addressed',
    source: 'published',
  },
  {
    id: 'proposal-ranasingha',
    stage: 'Proposal',
    component: 'ranasingha',
    comment:
      'Since all group members are working on prediction models, it is essential for each student to clearly demonstrate their individual research contribution. Each member should be able to explain the specific model they implemented, including the type of model used, the parameters or hyperparameters considered, and the accuracy or evaluation metrics obtained from the model. In addition, students should also be able to discuss alternative models that could be applied to the same problem and justify why a particular model was selected over others. This type of comparison and justification is important to demonstrate the research depth of the work. No lit review.',
    response: '',
    status: 'addressed',
    source: 'published',
  },
  {
    id: 'proposal-jayawardhana',
    stage: 'Proposal',
    component: 'jayawardhana',
    comment:
      'Since all group members are working on prediction models, it is essential for each student to clearly demonstrate their individual research contribution. Each member should be able to explain the specific model they implemented, including the type of model used, the parameters or hyperparameters considered, and the accuracy or evaluation metrics obtained from the model. In addition, students should also be able to discuss alternative models that could be applied to the same problem and justify why a particular model was selected over others. This type of comparison and justification is important to demonstrate the research depth of the work. No lit review.',
    response: '',
    status: 'in-progress',
    source: 'published',
  },
  {
    id: 'proposal-jayathilaka',
    stage: 'Proposal',
    component: 'jayathilaka',
    comment:
      'Since all group members are working on prediction models, it is essential for each student to clearly demonstrate their individual research contribution. Each member should be able to explain the specific model they implemented, including the type of model used, the parameters or hyperparameters considered, and the accuracy or evaluation metrics obtained from the model. In addition, students should also be able to discuss alternative models that could be applied to the same problem and justify why a particular model was selected over others. This type of comparison and justification is important to demonstrate the research depth of the work. No lit review.',
    response: '',
    status: 'in-progress',
    source: 'published',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROGRESS PRESENTATION 1
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'pp1-sankadeepa',
    stage: 'Progress Presentation 1',
    component: 'sankadeepa',
    comment:
      'He has demonstrated a very good effort by acquiring and utilizing a rich real-world dataset collected from the Meteorology Department, which significantly strengthens the practical and research value of the project. The use of actual domain-specific data is highly appreciated and provides a strong foundation for meaningful machine learning analysis and experimentation.',
    response: '',
    status: 'addressed',
    source: 'published',
  },
  {
    id: 'pp1-ranasingha',
    stage: 'Progress Presentation 1',
    component: 'ranasingha',
    comment:
      'He has demonstrated a very good effort by acquiring and utilizing a rich real-world dataset collected from the Meteorology Department, which significantly strengthens the practical and research value of the project. The use of actual domain-specific data is highly appreciated and provides a strong foundation for meaningful machine learning analysis and experimentation.',
    response: '',
    status: 'addressed',
    source: 'published',
  },
  {
    id: 'pp1-jayawardhana',
    stage: 'Progress Presentation 1',
    component: 'jayawardhana',
    comment:
      'Although some implementation progress is visible, she demonstrated very limited understanding of the underlying ML concepts, model behavior, training process, evaluation methods, and overall technical background of the work. In several instances, the responses indicated a lack of even basic background knowledge related to the domain and the technologies being used.',
    response: '',
    status: 'in-progress',
    source: 'published',
  },
  {
    id: 'pp1-jayathilaka',
    stage: 'Progress Presentation 1',
    component: 'jayathilaka',
    comment:
      'Although some implementation progress is visible, she demonstrated very limited understanding of the underlying ML concepts, model behavior, training process, evaluation methods, and overall technical background of the work. In several instances, the responses indicated a lack of even basic background knowledge related to the domain and the technologies being used.',
    response: '',
    status: 'in-progress',
    source: 'published',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROGRESS PRESENTATION 2
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'pp2-sankadeepa',
    stage: 'Progress Presentation 2',
    component: 'sankadeepa',
    comment:
      'Presented well with a sound understanding about what he has done.',
    response: '',
    status: 'addressed',
    source: 'published',
  },
  {
    id: 'pp2-ranasingha',
    stage: 'Progress Presentation 2',
    component: 'ranasingha',
    comment:
      'Presented well with a sound understanding about what he has done.',
    response: '',
    status: 'addressed',
    source: 'published',
  },
  {
    id: 'pp2-jayawardhana',
    stage: 'Progress Presentation 2',
    component: 'jayawardhana',
    comment:
      'A major concern observed by the panel was the students\' inability to explain even the fundamental connection between the Python-based backend and the frontend application. Students should understand how the frontend communicates with the backend, how requests and responses are handled, how data flows between the different layers, and how their implemented components are integrated into the complete system.',
    response: '',
    status: 'open',
    source: 'published',
  },
  {
    id: 'pp2-jayathilaka',
    stage: 'Progress Presentation 2',
    component: 'jayathilaka',
    comment:
      'A major concern observed by the panel was the students\' inability to explain even the fundamental connection between the Python-based backend and the frontend application. Students should understand how the frontend communicates with the backend, how requests and responses are handled, how data flows between the different layers, and how their implemented components are integrated into the complete system.',
    response: '',
    status: 'open',
    source: 'published',
  },
];