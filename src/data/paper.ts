import type { ResearchDocument } from '../types/research';

/**
 * Single source of truth for document files.
 * PDFs are stored in /docs/ with root aliases.
 */
export const PAPER_PDF_PATH = '/docs/R26-IT-132-Research-Paper.pdf';
export const TAF_PDF_PATH = '/docs/R26-IT-132-TAF-Specification-Doc.pdf';
export const THESIS_PDF_PATH = '/docs/R26-IT-132-Group-Thesis.pdf';

export const THESIS_IT22113986_PATH = '/docs/Thesis-IT22113986-Sankadeepa-Temp-Pressure.pdf';
export const THESIS_IT22269720_PATH = '/docs/Thesis-IT22269720-Ranasingha-Wind-Prediction.pdf';
export const THESIS_IT22619976_PATH = '/docs/Thesis-IT22619976-Jayawardhana-Cloud-Visibility.pdf';
export const THESIS_IT22069504_PATH = '/docs/Thesis-IT22069504-Jayathilaka-Humidity-QNH-DewPoint.pdf';

export const paper = {
  title: 'AI-Based Hyper-Local Aviation Weather Forecast Verification System for Sri Lankan Monsoon Patterns',
  fileName: 'R26-IT-132-Research-Paper.pdf',
  projectId: 'R26-IT-132',
  institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
  group: 'Centre of Excellence for AI (CoEAI)',
  year: 2026,
  abstract:
    'This research presents an AI-based, hyper-local weather forecasting and automated verification system for Bandaranaike International Airport (VCBI), Sri Lanka. Historical airport observations are used to train parameter-specific machine learning models for temperature & pressure, wind vectors, cloud ceiling & visibility, and QNH & dew point. Predictions are continuously verified against METAR ground truth and operational TAF forecasts, then presented via an interactive pilot and dispatcher dashboard.'
};

export const documents: ResearchDocument[] = [
  {
    id: 'paper',
    category: 'paper',
    kind: 'Research Paper',
    title: paper.title,
    path: PAPER_PDF_PATH,
    fileName: paper.fileName,
    authors: 'Sankadeepa W.D.I., Ranasingha R.A.A.D., Jayawardhana H.M.S.I., Jayathilaka P.K.V.K.',
    role: 'Comprehensive Peer-Reviewed Academic Publication',
    metric: 'Full Project Evaluation (R² 0.84, MAE <1.0kt, 78.15% Acc)',
    summaryLabel: 'Abstract & Research Scope',
    summary: paper.abstract,
    highlights: [
      'Published research findings covering the complete AI verification framework',
      'Comparative evaluation across RF-LSTM, TFT, LightGBM, and XGBoost models',
      'Operational skill scoring against Department of Meteorology ground truth',
      'Translates ML outputs into aviation safety indices (Density Altitude, Crosswind limits)'
    ],
    fileSize: '5.2 KB (Official Sample PDF)'
  },
  {
    id: 'taf',
    category: 'taf',
    kind: 'TAF Document',
    title: 'Aviation Weather Terminal Aerodrome Forecast (TAF) Specification & Verification Baseline',
    path: TAF_PDF_PATH,
    fileName: 'R26-IT-132-TAF-Specification-Doc.pdf',
    authors: 'Research Team R26-IT-132 · Dept. of Meteorology Sri Lanka & SLIIT CoEAI',
    role: 'Aviation Standard & Operational Baseline',
    metric: 'ICAO Annex 3 Thresholds & VCBI Ground Truth',
    summaryLabel: 'About this standard',
    summary:
      'Standard operational technical specification for decoding, formatting, and verifying Terminal Aerodrome Forecasts (TAF) at Bandaranaike International Airport (VCBI). Defines the exact verification threshold criteria, critical hit-rate indices, and false alarm metrics used across the project.',
    highlights: [
      'ICAO Annex 3 meteorological standards and operational safety thresholds',
      'VCBI runway 04/22 specific wind direction (>=30°) & speed change criteria',
      'Precision instrument approach minima: 800m, 1500m, 3000m, and 5000m ceiling limits',
      'Continuous 30-minute METAR vs TAF automated verification logic'
    ],
    fileSize: '4.5 KB (Official Sample PDF)'
  },
  {
    id: 'thesis',
    category: 'group-thesis',
    kind: 'Group Thesis',
    title: 'Comprehensive Hyper-Local Aviation Weather Verification & Multi-Model Forecasting System',
    path: THESIS_PDF_PATH,
    fileName: 'R26-IT-132-Group-Thesis.pdf',
    authors: 'Sankadeepa W.D.I., Ranasingha R.A.A.D., Jayawardhana H.M.S.I., Jayathilaka P.K.V.K.',
    role: 'Integrated End-to-End System Thesis',
    metric: 'Four-Module Unified Pipeline & Web Dashboard',
    summaryLabel: 'Executive Thesis Summary',
    summary:
      'The comprehensive group thesis submitted for project R26-IT-132. Synthesizes the four individual machine learning subsystems into a unified real-time prediction and verification architecture, detailing system design, microservices, data ingest pipelines, and production pilot interfaces.',
    highlights: [
      'End-to-end architecture connecting live Aviation Weather APIs to ML core',
      'Synthesis of temperature/pressure, wind vectors, visibility, and QNH modules',
      'Real-time verification metrics and operational alert generation',
      'Design of interactive pilot briefing portal and dispatcher views'
    ],
    fileSize: '4.2 KB (Official Sample PDF)'
  },
  {
    id: 'thesis-sankadeepa',
    category: 'individual-thesis',
    studentId: 'IT22113986',
    kind: 'Individual Thesis',
    title: 'Coupled Atmospheric Temperature and Pressure Prediction using Hybrid RF-LSTM Architecture',
    path: THESIS_IT22113986_PATH,
    fileName: 'Thesis-IT22113986-Sankadeepa-Temp-Pressure.pdf',
    authors: 'Sankadeepa W.D.I. (IT22113986)',
    role: 'Atmospheric State & Density Altitude Module',
    metric: 'Hybrid RF–LSTM: R² 0.84 · MAE 0.86',
    summaryLabel: 'Individual Research Contribution',
    summary:
      'Focuses on the thermodynamic coupling between ambient surface temperature and barometric pressure (QNH). Develops a two-stage hybrid RF-LSTM model combining tabular lag features with sequential memory, directly deriving aircraft density altitude for safe takeoff and climb performance.',
    highlights: [
      'Physics-guided coupling of diurnal temperature and barometric pressure',
      'Hybrid RF-LSTM achieved R² 0.84, significantly outperforming individual baselines',
      'Calculates real-time density altitude and pressure altitude deviations',
      'Addresses monsoonal heat variations at VCBI runway level'
    ],
    fileSize: '4.2 KB (Official Sample PDF)'
  },
  {
    id: 'thesis-ranasingha',
    category: 'individual-thesis',
    studentId: 'IT22269720',
    kind: 'Individual Thesis',
    title: 'Short-Term Runway Wind Vector Prediction & Component Analysis via XGBoost and TFT',
    path: THESIS_IT22269720_PATH,
    fileName: 'Thesis-IT22269720-Ranasingha-Wind-Prediction.pdf',
    authors: 'Ranasingha R.A.A.D. (IT22269720)',
    role: 'Runway Aerodynamics & Wind Vector Module',
    metric: 'TFT: MAE < 1.0 kt · XGBoost: MAE 1.69 kt',
    summaryLabel: 'Individual Research Contribution',
    summary:
      'Investigates hyper-local surface wind speed and wind direction prediction for runway 04/22. Combines gradient boosted trees with Temporal Fusion Transformers (TFT) utilizing multi-head attention. Decomposes forecasts into headwind and crosswind components for pilot situational awareness.',
    highlights: [
      'Cyclic trigonometric encoding of 360° wind direction vectors',
      'Multi-horizon forecasting using Temporal Fusion Transformer (TFT)',
      'Runway 04/22 crosswind component safety decomposition',
      'Integration into the interactive pilot portal flight-detail view'
    ],
    fileSize: '3.8 KB (Official Sample PDF)'
  },
  {
    id: 'thesis-jayawardhana',
    category: 'individual-thesis',
    studentId: 'IT22619976',
    kind: 'Individual Thesis',
    title: 'Rapid Weather Change Detection, Low Cloud Ceiling and Airport Visibility Classification',
    path: THESIS_IT22619976_PATH,
    fileName: 'Thesis-IT22619976-Jayawardhana-Cloud-Visibility.pdf',
    authors: 'Jayawardhana H.M.S.I. (IT22619976)',
    role: 'Cloud Ceiling & Rapid Visibility Module',
    metric: 'XGBoost Classifier: 78.15% Accuracy',
    summaryLabel: 'Individual Research Contribution',
    summary:
      'Addresses rapid weather change detection, sudden onset morning radiation fog, and low cloud ceiling classification. Benchmarks Decision Trees, Random Forest, and XGBoost against ICAO visibility minima thresholds, generating proactive approach hazard alerts.',
    highlights: [
      'Rapid change detection for sudden fog and cloud base inversions',
      'Comparative evaluation: Decision Tree (76.25%), RF (76.31%), XGBoost (78.15%)',
      'Threshold warnings for precision instrument approach minima (CAT I/II/III)',
      'Flight arrival time window forecasting for landing safety'
    ],
    fileSize: '3.8 KB (Official Sample PDF)'
  },
  {
    id: 'thesis-jayathilaka',
    category: 'individual-thesis',
    studentId: 'IT22069504',
    kind: 'Individual Thesis',
    title: 'Humidity, QNH Altimeter Setting and Dew-Point Prediction using LightGBM Gradient Boosting',
    path: THESIS_IT22069504_PATH,
    fileName: 'Thesis-IT22069504-Jayathilaka-Humidity-QNH-DewPoint.pdf',
    authors: 'Jayathilaka P.K.V.K. (IT22069504)',
    role: 'Thermodynamics, QNH & Stability Module',
    metric: 'LightGBM: Dew Point MAE 0.58°C · QNH MAE 1.8 hPa',
    summaryLabel: 'Individual Research Contribution',
    summary:
      'Investigates the thermodynamic relationship between dew point, barometric pressure (QNH), and atmospheric stability. Employs LightGBM gradient boosting for high-speed tabular prediction and mathematically derives relative humidity to maintain physical consistency.',
    highlights: [
      'Physically consistent derivation of Relative Humidity from predicted T and Td',
      'LightGBM achieved Dew Point R² 0.66, MAE 0.58°C and QNH MAE 1.8 hPa',
      'Barometric pressure tendency monitoring for atmospheric stability assessment',
      'Generates automated structured weather guidance briefings'
    ],
    fileSize: '3.9 KB (Official Sample PDF)'
  }
];