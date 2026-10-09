import { Database, Wrench, BrainCircuit, ScanSearch, Plane, LayoutDashboard } from 'lucide-react';
import type { WorkflowStep } from '../types/research';

export const workflowSteps: WorkflowStep[] = [
{
  id: 'collection',
  title: 'Data Collection',
  body: 'Historical meteorological data and current METAR observations from the airport.',
  icon: Database
},
{
  id: 'preparation',
  title: 'Data Preparation',
  body: 'Cleaning, timestamp alignment and missing-value handling. Feature engineering creates model-ready inputs.',
  icon: Wrench
},
{
  id: 'forecasting',
  title: 'AI Forecasting',
  body: 'Specialized models predict each weather parameter for a short-term target time.',
  icon: BrainCircuit
},
{
  id: 'verification',
  title: 'Forecast Verification',
  body: 'Predictions are compared with the matching observations. Available TAF forecasts provide an official reference.',
  icon: ScanSearch
},
{
  id: 'aviation',
  title: 'Aviation Calculations',
  body: 'Derive indicators such as headwind, crosswind and density altitude where supported.',
  icon: Plane
},
{
  id: 'dashboard',
  title: 'Dashboard & Evaluation',
  body: 'Forecasts, evaluation metrics and weather information are presented clearly.',
  icon: LayoutDashboard
}];