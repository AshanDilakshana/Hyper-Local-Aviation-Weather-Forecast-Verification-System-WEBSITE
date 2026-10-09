export const project = {
  officialTitle:
  'AI-Based Hyper-Local Aviation Weather Forecast Verification System for Sri Lankan Monsoon Patterns',
  heroLabel: 'SLIIT RESEARCH PROJECT · R26-IT-132',
  heroTitle: 'AI-Based Hyper-Local Aviation Weather Forecasting & Verification',
  heroDescription:
  'An AI-powered research system for airport-level weather prediction, forecast verification, and aviation-relevant weather analysis at Bandaranaike International Airport, Sri Lanka.',
  projectId: 'R26-IT-132',
  specialization: 'Information Technology',
  group: 'Centre of Excellence for AI (CoEAI)',
  institution: 'Sri Lanka Institute of Information Technology',
  institutionShort: 'SLIIT',
  airport: 'Bandaranaike International Airport',
  icao: 'VCBI',
  year: 2026
};

export const heroFacts = ['Airport-focused forecasting', 'AI/ML model evaluation', 'METAR and TAF verification'];

export const researchProblem = {
  title: 'Research problem',
  body: 'Regional weather models give a broad picture, but conditions at a single airport can change quickly. Aviation operations depend on accurate, local information.',
  points: [
  'Wind shifts affect runway choice and crosswind limits',
  'Pressure (QNH) sets the altimeter reference',
  'Temperature and humidity influence aircraft performance and fog',
  'Cloud and visibility determine approach conditions']

};

export const researchObjectives = {
  title: 'Research objectives',
  body: 'Develop short-term, airport-level forecasting models and verify their predictions against observed weather and official aviation forecasts.',
  points: [
  'Build parameter-specific AI/ML models from historical airport observations',
  'Verify predictions against later METAR observations and TAF forecasts',
  'Evaluate models with MAE, RMSE, R² and accuracy',
  'Translate forecasts into aviation-relevant indicators']

};

export const researchSequence = [
{ label: 'Data', caption: 'Airport observations' },
{ label: 'Prediction', caption: 'Specialized AI models' },
{ label: 'Verification', caption: 'Compared with METAR & TAF' },
{ label: 'Aviation insights', caption: 'Useful operational indicators' }];