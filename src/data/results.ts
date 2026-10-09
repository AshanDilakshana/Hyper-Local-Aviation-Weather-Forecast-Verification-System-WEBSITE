import type { ReportedValue } from '../types/research';

export const cloudVisibilityAccuracy = [
{ model: 'Decision Tree', value: 76.25 },
{ model: 'Random Forest', value: 76.31 },
{ model: 'XGBoost', value: 78.15 }];


export const windResults: ReportedValue[] = [
{ label: 'XGBoost', model: 'XGBoost', metric: 'MAE', value: 1.69, unit: 'kt', qualifier: 'approx' },
{ label: 'Temporal Fusion Transformer', model: 'TFT', metric: 'MAE', value: 1.0, unit: 'kt', qualifier: 'below' }];


export const temperaturePressureResult: ReportedValue = {
  label: 'Hybrid RF–LSTM',
  model: 'Hybrid RF–LSTM',
  metric: 'R²',
  value: 0.84,
  unit: '',
  qualifier: 'approx'
};

export const dewPointQnhResults: ReportedValue[] = [
{ label: 'Dew point', model: 'LightGBM', metric: 'MAE', value: 0.58, unit: '°C', qualifier: 'approx' },
{ label: 'QNH', model: 'LightGBM', metric: 'MAE', value: 1.8, unit: 'hPa', qualifier: 'approx' }];


export const resultsNote = 'Values are reproduced from the research paper and should be confirmed against the final experiment logs.';

export const resultsScopeNote =
'Results are grouped by research component. They are not a single shared benchmark, and identical datasets or test conditions across components are not assumed.';