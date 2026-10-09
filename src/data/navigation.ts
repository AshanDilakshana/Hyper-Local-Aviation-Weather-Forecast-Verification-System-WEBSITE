import type { NavItem } from '../types/research';

export const navItems: NavItem[] = [
{ label: 'Home', to: '/' },
{ label: 'Methodology', to: '/methodology' },
{ label: 'Architecture', to: '/architecture' },
{ label: 'Results', to: '/results' },
{ label: 'Team', to: '/team' },
{ label: 'Documents', to: '/documents' },
{ label: 'Panel Comments', to: '/panel-comments' }];


export const exploreLinks = [
{ to: '/methodology', label: 'Methodology', description: 'Why each weather parameter uses a different AI model.' },
{ to: '/architecture', label: 'Architecture', description: 'The five layers from weather data to verified forecasts.' },
{ to: '/results', label: 'Results', description: 'Reported accuracy and error for every model group.' },
{ to: '/team', label: 'Team', description: 'Four individual research contributions in detail.' },
{ to: '/documents', label: 'Documents', description: 'Read or download the research paper and thesis.' },
{ to: '/panel-comments', label: 'Panel Comments', description: 'Review panel feedback and the team’s responses.' }];