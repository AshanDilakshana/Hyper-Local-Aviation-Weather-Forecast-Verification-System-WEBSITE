import type { ParameterConfig, VerificationDataset } from '../types/dashboard';

/**
 * DEMO DATA — NOT LIVE WEATHER.
 * Hand-authored values used only to demonstrate the dashboard frontend.
 * They are not measurements, not model outputs and not experimental results.
 */
export const DEMO_LABEL = 'DEMO DATA — NOT LIVE WEATHER';

export const demoVerificationDataset: VerificationDataset = {
  station: 'VCBI',
  source: 'Demonstration data layer (frontend only)',
  sequenceLabel: 'Demo sequence · 12 hourly steps',
  horizonHours: 1,
  hours: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  numeric: {
    temperature: {
      observed: [26.1, 26.8, 27.9, 29.0, 29.8, 30.4, 30.9, 31.1, 30.6, 29.7, 28.9, 28.2],
      predicted: [26.4, 27.1, 27.6, 28.7, 30.1, 30.9, 30.6, 30.7, 30.9, 29.2, 28.5, 28.6]
    },
    dewPoint: {
      observed: [24.2, 24.4, 24.6, 24.5, 24.3, 24.0, 23.8, 23.9, 24.1, 24.4, 24.6, 24.7],
      predicted: [24.0, 24.5, 24.9, 24.3, 24.6, 24.2, 23.5, 24.3, 24.0, 24.8, 24.3, 24.9]
    },
    qnh: {
      observed: [1010.2, 1010.8, 1011.3, 1011.5, 1011.2, 1010.6, 1009.9, 1009.2, 1008.8, 1008.9, 1009.4, 1009.9],
      predicted: [1010.5, 1010.6, 1011.0, 1011.9, 1011.0, 1010.9, 1010.3, 1009.0, 1009.3, 1008.6, 1009.8, 1010.1]
    },
    windSpeed: {
      observed: [6, 7, 9, 11, 12, 13, 14, 13, 12, 10, 8, 7],
      predicted: [5, 8, 9, 10, 13, 12, 15, 14, 11, 10, 9, 6]
    },
    windDirection: {
      observed: [230, 230, 240, 240, 250, 250, 250, 240, 240, 230, 230, 220],
      predicted: [220, 230, 240, 250, 250, 240, 250, 250, 240, 240, 230, 230]
    },
    visibility: {
      observed: [6000, 8000, 9999, 9999, 9999, 9999, 8000, 5000, 3000, 6000, 8000, 9999],
      predicted: [7000, 8000, 9999, 9999, 9999, 9000, 9999, 6000, 4000, 5000, 9000, 9999]
    }
  },
  cloud: {
    observed: ['SCT', 'SCT', 'FEW', 'FEW', 'SCT', 'SCT', 'BKN', 'BKN', 'BKN', 'SCT', 'SCT', 'FEW'],
    predicted: ['SCT', 'FEW', 'FEW', 'SCT', 'SCT', 'SCT', 'BKN', 'SCT', 'BKN', 'BKN', 'SCT', 'FEW'],
    baseFt: [1800, 2000, 2200, 2200, 2000, 1800, 1600, 1400, 1200, 1600, 1800, 2000]
  },
  taf: {
    windSpeed: [10, 10, 10, 10, 10, 12, 12, 12, 12, 12, 10, 10],
    windDirection: [230, 230, 230, 230, 230, 250, 250, 250, 250, 250, 230, 230],
    visibility: [9999, 9999, 9999, 9999, 9999, 9999, 9999, 6000, 6000, 6000, 9999, 9999],
    groups: [
    '23010KT 9999 SCT018',
    '23010KT 9999 SCT018',
    '23010KT 9999 SCT018',
    '23010KT 9999 SCT018',
    '23010KT 9999 SCT018',
    'BECMG 25012KT',
    'BECMG 25012KT',
    'TEMPO 6000 SHRA BKN014',
    'TEMPO 6000 SHRA BKN014',
    'TEMPO 6000 SHRA BKN014',
    'BECMG 23010KT 9999',
    'BECMG 23010KT 9999']

  }
};

export const demoParameters: ParameterConfig[] = [
{ id: 'temperature', label: 'Temperature', shortLabel: 'Temp', unit: '°C', model: 'Hybrid RF–LSTM', kind: 'regression', decimals: 1, tolerance: 1 },
{ id: 'dewPoint', label: 'Dew point', shortLabel: 'Dew pt', unit: '°C', model: 'LightGBM', kind: 'regression', decimals: 1, tolerance: 1 },
{ id: 'relativeHumidity', label: 'Relative humidity', shortLabel: 'RH', unit: '%', model: 'Derived (T, Td)', kind: 'derived', decimals: 0, tolerance: 5 },
{ id: 'qnh', label: 'Pressure (QNH)', shortLabel: 'QNH', unit: 'hPa', model: 'LightGBM · RF–LSTM', kind: 'regression', decimals: 1, tolerance: 1 },
{ id: 'windSpeed', label: 'Wind speed', shortLabel: 'Wind spd', unit: 'kt', model: 'XGBoost–TFT', kind: 'regression', decimals: 0, tolerance: 3 },
{ id: 'windDirection', label: 'Wind direction', shortLabel: 'Wind dir', unit: '°', model: 'XGBoost–TFT', kind: 'regression', decimals: 0, tolerance: 30, circular: true },
{ id: 'visibility', label: 'Visibility', shortLabel: 'Vis', unit: 'm', model: 'XGBoost', kind: 'regression', decimals: 0, tolerance: 1500 },
{ id: 'cloud', label: 'Cloud cover', shortLabel: 'Cloud', unit: '', model: 'XGBoost', kind: 'classification', decimals: 0, tolerance: 0 }];