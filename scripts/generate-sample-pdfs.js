import fs from 'fs';
import path from 'path';

function escapePdf(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function generateDocPdf({ title, category, projectId, authors, abstract, sections }) {
  // Page size 595 x 842 (A4)
  const streamCommands = [];

  // Background header band
  streamCommands.push('0.06 0.16 0.32 rg'); // Deep Navy
  streamCommands.push('0 770 595 72 re f');

  // Decorative accent line
  streamCommands.push('0.22 0.74 0.97 rg'); // Cyan / Accent
  streamCommands.push('0 766 595 4 re f');

  // Header text
  streamCommands.push('BT /F2 10 Tf 1 1 1 rg 40 812 Td (' + escapePdf('SRI LANKA INSTITUTE OF INFORMATION TECHNOLOGY (SLIIT) — FACULTY OF COMPUTING') + ') Tj ET');
  streamCommands.push('BT /F1 9 Tf 0.8 0.9 1 rg 40 798 Td (' + escapePdf('Project ID: ' + projectId + ' | Centre of Excellence for AI (CoEAI) | Year: 2026') + ') Tj ET');
  streamCommands.push('BT /F2 9 Tf 0.22 0.74 0.97 rg 40 782 Td (' + escapePdf('[' + category.toUpperCase() + ' DOCUMENTATION]') + ') Tj ET');

  // Document Title
  let currentY = 720;
  streamCommands.push('0 0 0 rg');
  streamCommands.push('BT /F2 15 Tf 40 ' + currentY + ' Td (' + escapePdf(title) + ') Tj ET');
  currentY -= 24;

  // Authors
  streamCommands.push('BT /F2 9.5 Tf 0.1 0.2 0.4 rg 40 ' + currentY + ' Td (' + escapePdf('Authors / Researchers:') + ') Tj ET');
  currentY -= 14;
  streamCommands.push('BT /F1 9 Tf 0.2 0.2 0.2 rg 40 ' + currentY + ' Td (' + escapePdf(authors) + ') Tj ET');
  currentY -= 20;

  // Horizontal Rule
  streamCommands.push('0.85 0.88 0.92 RG 1 w');
  streamCommands.push('40 ' + currentY + ' m 555 ' + currentY + ' l S');
  currentY -= 22;

  // Abstract Box
  streamCommands.push('0.96 0.97 0.99 rg');
  streamCommands.push('40 ' + (currentY - 60) + ' 515 70 re f');
  streamCommands.push('0.8 0.85 0.9 RG 0.8 w');
  streamCommands.push('40 ' + (currentY - 60) + ' 515 70 re S');

  streamCommands.push('BT /F2 10 Tf 0.06 0.16 0.32 rg 50 ' + (currentY - 5) + ' Td (' + escapePdf('EXECUTIVE ABSTRACT & SYSTEM SCOPE') + ') Tj ET');
  
  // Wrap abstract text roughly
  const abstractWords = abstract.split(' ');
  let line = '';
  let lineY = currentY - 22;
  for (const word of abstractWords) {
    if ((line + ' ' + word).length > 85) {
      streamCommands.push('BT /F1 8.5 Tf 0.2 0.25 0.3 rg 50 ' + lineY + ' Td (' + escapePdf(line.trim()) + ') Tj ET');
      line = word;
      lineY -= 12;
    } else {
      line += ' ' + word;
    }
  }
  if (line) {
    streamCommands.push('BT /F1 8.5 Tf 0.2 0.25 0.3 rg 50 ' + lineY + ' Td (' + escapePdf(line.trim()) + ') Tj ET');
  }

  currentY -= 80;

  // Sections
  for (const sec of sections) {
    currentY -= 12;
    if (currentY < 100) break;

    // Section title
    streamCommands.push('BT /F2 11 Tf 0.08 0.22 0.44 rg 40 ' + currentY + ' Td (' + escapePdf(sec.heading) + ') Tj ET');
    currentY -= 14;

    for (const p of sec.paragraphs) {
      if (currentY < 70) break;
      const words = p.split(' ');
      let pLine = '';
      for (const w of words) {
        if ((pLine + ' ' + w).length > 92) {
          streamCommands.push('BT /F1 8.5 Tf 0.22 0.24 0.28 rg 40 ' + currentY + ' Td (' + escapePdf(pLine.trim()) + ') Tj ET');
          pLine = w;
          currentY -= 12;
        } else {
          pLine += ' ' + w;
        }
      }
      if (pLine) {
        streamCommands.push('BT /F1 8.5 Tf 0.22 0.24 0.28 rg 40 ' + currentY + ' Td (' + escapePdf(pLine.trim()) + ') Tj ET');
        currentY -= 12;
      }
      currentY -= 4;
    }
  }

  // Footer
  streamCommands.push('0.85 0.88 0.92 RG 0.5 w');
  streamCommands.push('40 45 m 555 45 l S');
  streamCommands.push('BT /F1 8 Tf 0.5 0.55 0.6 rg 40 32 Td (' + escapePdf('Hyper-Local Aviation Weather Forecast Verification System — Bandaranaike International Airport (VCBI)') + ') Tj ET');
  streamCommands.push('BT /F2 8 Tf 0.06 0.16 0.32 rg 475 32 Td (' + escapePdf('Official Research Doc') + ') Tj ET');

  const contentStream = streamCommands.join('\n');
  const streamLen = Buffer.byteLength(contentStream, 'latin1');

  const objects = [
    '%PDF-1.4\n',
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    '6 0 obj\n<< /Length ' + streamLen + ' >>\nstream\n' + contentStream + '\nendstream\nendobj\n'
  ];

  let offset = objects[0].length;
  const offsets = [0];
  for (let i = 1; i < objects.length; i++) {
    offsets.push(offset);
    offset += objects[i].length;
  }
  let xref = 'xref\n0 ' + objects.length + '\n0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  const trailer = 'trailer\n<< /Size ' + objects.length + ' /Root 1 0 R >>\nstartxref\n' + offset + '\n%%EOF\n';

  return objects.join('') + xref + trailer;
}

const docsToGenerate = [
  {
    fileName: 'R26-IT-132-Research-Paper.pdf',
    aliases: ['research-paper.pdf'],
    title: 'AI-Based Hyper-Local Aviation Weather Forecast Verification System for SL Monsoon Patterns',
    category: 'Research Paper',
    projectId: 'R26-IT-132',
    authors: 'Sankadeepa W.D.I. (IT22113986), Ranasingha R.A.A.D. (IT22269720), Jayawardhana H.M.S.I. (IT22619976), Jayathilaka P.K.V.K. (IT22069504)',
    abstract: 'This research presents an AI-based hyper-local weather forecasting and automated verification system tailored for Bandaranaike International Airport (VCBI), Sri Lanka. Historical meteorological observations and operational METAR/TAF records are utilized to engineer parameter-specific machine learning models. Predictions are rigorously validated and exposed via an operational verification dashboard.',
    sections: [
      {
        heading: '1. Introduction and Operational Challenge',
        paragraphs: [
          'Aviation weather forecasts in tropical equatorial zones like Sri Lanka encounter abrupt monsoonal shifts, localized squalls, and severe wind shears. Conventional global weather models lack the spatial resolution required for pinpoint aerodrome operations.',
          'Project R26-IT-132 closes this gap by implementing an integrated multi-model architecture capable of continuously comparing terminal area predictions against actual METAR ground-truth records.'
        ]
      },
      {
        heading: '2. Multi-Model Architecture & Individual Contributions',
        paragraphs: [
          '• IT22113986: Coupled Temperature and Pressure prediction using Hybrid Random Forest - LSTM achieving R2 of 0.84 and MAE of 0.86, translating directly to density altitude calculations.',
          '• IT22269720: Wind vector and runway component prediction using XGBoost and Temporal Fusion Transformers (TFT), achieving MAE under 1.0 knot for runway 04/22 crosswind safety.',
          '• IT22619976: Cloud ceiling and rapid visibility change classification using tree ensembles, reaching 78.15% classification accuracy for low-visibility approach warnings.',
          '• IT22069504: Humidity, QNH altimeter setting and dew-point modeling via LightGBM (MAE 0.58 deg C for dew point, 1.8 hPa for QNH) with physical relative humidity derivation.'
        ]
      },
      {
        heading: '3. Empirical Verification Results & Conclusion',
        paragraphs: [
          'The proposed system demonstrably outperforms standard baseline numerical models across all critical flight parameters. The verification engine provides quantitative skill scores (MAE, RMSE, R2, Threat Score), offering air traffic managers and pilots real-time operational situational awareness.'
        ]
      }
    ]
  },
  {
    fileName: 'R26-IT-132-TAF-Specification-Doc.pdf',
    aliases: ['taf-document.pdf'],
    title: 'Aviation Weather Terminal Aerodrome Forecast (TAF) Specification & Verification Baseline',
    category: 'TAF Standard & Verification Guide',
    projectId: 'R26-IT-132',
    authors: 'Research Team R26-IT-132 | Department of Meteorology Sri Lanka & SLIIT CoEAI',
    abstract: 'Standard operational guideline and technical specification for Terminal Aerodrome Forecast (TAF) decoding, verification criteria, and ICAO Annex 3 compliance. Provides the meteorological benchmark and threshold values utilized by the automated forecast verification engine.',
    sections: [
      {
        heading: '1. Purpose and Scope of TAF Verification',
        paragraphs: [
          'Terminal Aerodrome Forecasts (TAF) represent concise statements of expected meteorological conditions at an airport for a specified period (typically 24 to 30 hours).',
          'Automated verification compares issued TAF reports against valid METAR ground observations at 30-minute intervals to evaluate operational forecast fidelity and identify systematic model biases.'
        ]
      },
      {
        heading: '2. ICAO Annex 3 Operational Thresholds for VCBI',
        paragraphs: [
          '• Wind Direction & Speed: Significant change defined as direction variation >= 30 deg when mean speed before or after change is >= 20 kt, or speed change >= 10 kt.',
          '• Visibility Thresholds: Verified against category milestones: 800m, 1500m, 3000m, and 5000m for precision instrument approaches.',
          '• Cloud Base Height: Significant changes monitored at 100ft, 200ft, 500ft, 1000ft, and 1500ft ceiling minima.',
          '• Significant Weather: Onset and cessation of convective storms, heavy tropical rain (RA), and mist/fog (FG/BR).'
        ]
      },
      {
        heading: '3. Verification Metrics & Scoring Algorithms',
        paragraphs: [
          'The verification pipeline employs categorical scoring (Hit Rate, False Alarm Ratio, Critical Success Index) combined with continuous error metrics (MAE, RMSE) across each forecast validity window.'
        ]
      }
    ]
  },
  {
    fileName: 'R26-IT-132-Group-Thesis.pdf',
    aliases: ['thesis.pdf'],
    title: 'Comprehensive Hyper-Local Aviation Weather Verification & Multi-Model Forecasting System',
    category: 'Group Research Thesis',
    projectId: 'R26-IT-132',
    authors: 'Sankadeepa W.D.I., Ranasingha R.A.A.D., Jayawardhana H.M.S.I., Jayathilaka P.K.V.K. | Supervised by SLIIT CoEAI Faculty',
    abstract: 'Final comprehensive group thesis presenting the end-to-end design, data integration pipeline, machine learning architectures, and cloud-native verification platform for Bandaranaike International Airport (VCBI). Synthesizes individual contributions into an operational aviation support system.',
    sections: [
      {
        heading: '1. Executive Project Summary',
        paragraphs: [
          'This thesis addresses the critical challenge of aviation safety under volatile Sri Lankan monsoon regimes. Integrating official observational archives from the Department of Meteorology with state-of-the-art AI, the project delivers a unified verification dashboard.'
        ]
      },
      {
        heading: '2. System Architecture & End-to-End Pipeline',
        paragraphs: [
          'The system connects live Aviation Weather API endpoints with four dedicated ML microservices:',
          '1. Atmospheric State Engine (Temperature, QNH & Density Altitude)',
          '2. Runway Aerodynamics Module (Wind speed/direction, Runway 04/22 crosswind vectors)',
          '3. Visibility & Ceiling Classification Module (Fog, mist, low cloud threshold warnings)',
          '4. Humidity & Pressure Trend Pipeline (Dew point, relative humidity derivation, barometric tendency)'
        ]
      },
      {
        heading: '3. Deployment, Security & Operational Verification',
        paragraphs: [
          'Implemented with a high-performance React/Vite front-end and a Python predictive core, the system features sub-second response times, automated METAR/TAF parity checks, and interactive visual analytics for pilots and dispatchers.'
        ]
      }
    ]
  },
  {
    fileName: 'Thesis-IT22113986-Sankadeepa-Temp-Pressure.pdf',
    aliases: ['thesis-it22113986.pdf'],
    title: 'Coupled Atmospheric Temperature and Pressure Prediction using Hybrid RF-LSTM Architecture',
    category: 'Individual Research Thesis',
    projectId: 'R26-IT-132',
    authors: 'Sankadeepa W.D.I. (Student ID: IT22113986) | Specialization: Information Technology',
    abstract: 'Individual thesis investigating the physical coupling of ambient temperature and barometric pressure (QNH) at VCBI. Demonstrates that a hybrid Random Forest - LSTM pipeline outperforms isolated single-variable forecasting models, directly improving density altitude safety calculations.',
    sections: [
      {
        heading: '1. Research Problem and Motivation',
        paragraphs: [
          'Temperature and atmospheric pressure directly dictate air density, which governs aircraft lift, engine thrust, and takeoff run distance.',
          'Predicting temperature and pressure in isolation neglects the thermodynamic interdependence governed by daily solar irradiance and diurnal heating cycles.'
        ]
      },
      {
        heading: '2. Methodology: Hybrid RF-LSTM Architecture',
        paragraphs: [
          'The research implements a two-stage hybrid framework: Random Forest captures non-linear tabular feature interactions and lag attributes, while LSTM recurrent units learn multi-hour temporal dependencies and diurnal shifts.',
          'Evaluated on historical VCBI records from the Department of Meteorology across both Northeast and Southwest monsoon seasons.'
        ]
      },
      {
        heading: '3. Experimental Findings & Contribution',
        paragraphs: [
          '• Baseline LSTM: R2 = 0.25 (limited sequence history generalization)',
          '• Baseline Random Forest: R2 = 0.68, MAE = 1.14',
          '• Proposed Hybrid RF-LSTM: R2 = 0.84, MAE = 0.86 (superior explained variance)',
          '• Validated density altitude output accurately identifies high-risk midday takeoff conditions.'
        ]
      }
    ]
  },
  {
    fileName: 'Thesis-IT22269720-Ranasingha-Wind-Prediction.pdf',
    aliases: ['thesis-it22269720.pdf'],
    title: 'Short-Term Runway Wind Vector Prediction & Component Analysis via XGBoost and TFT',
    category: 'Individual Research Thesis',
    projectId: 'R26-IT-132',
    authors: 'Ranasingha R.A.A.D. (Student ID: IT22269720) | Specialization: Information Technology',
    abstract: 'Individual thesis focused on hyper-local surface wind speed and direction forecasting for runway 04/22 at Bandaranaike International Airport. Combines gradient boosted trees and Temporal Fusion Transformers to generate operational headwind and crosswind components.',
    sections: [
      {
        heading: '1. Operational Significance of Runway Wind Analysis',
        paragraphs: [
          'Crosswind limits are decisive safety thresholds for commercial airliner landing operations. Sudden gusts during monsoon transitions cause unstable approaches and go-arounds at VCBI.'
        ]
      },
      {
        heading: '2. Feature Engineering & Multi-Horizon Modeling',
        paragraphs: [
          'Continuous wind direction is encoded using sine and cosine cyclical transformations to overcome the 0/360 degree discontinuity.',
          'Models tested: XGBoost regression on lag features vs Temporal Fusion Transformer (TFT) utilizing multi-head self-attention mechanisms for multi-horizon forecasts.'
        ]
      },
      {
        heading: '3. Results and Runway Component Integration',
        paragraphs: [
          '• XGBoost Baseline MAE: 1.69 knots',
          '• Temporal Fusion Transformer (TFT) MAE: < 1.0 knot (superior temporal attention)',
          '• Automated headwind and crosswind decomposition provides real-time runway occupancy and safety advisories within the interactive pilot portal.'
        ]
      }
    ]
  },
  {
    fileName: 'Thesis-IT22619976-Jayawardhana-Cloud-Visibility.pdf',
    aliases: ['thesis-it22619976.pdf'],
    title: 'Rapid Weather Change Detection, Low Cloud Ceiling and Airport Visibility Classification',
    category: 'Individual Research Thesis',
    projectId: 'R26-IT-132',
    authors: 'Jayawardhana H.M.S.I. (Student ID: IT22619976) | Specialization: Information Technology',
    abstract: 'Individual thesis addressing rapid onset fog, low stratus cloud ceilings, and visibility degradation at VCBI. Compares tree-based classifiers and gradient boosting to forecast instrument meteorological condition (IMC) threshold breaches.',
    sections: [
      {
        heading: '1. Challenge of Rapid Weather Inversion',
        paragraphs: [
          'Tropical coastal airports experience rapid morning radiation fog and dense convection clouds that degrade visibility faster than standard 6-hour forecast cycles update.',
          'Early warning systems are critical for diverting inbound flights before terminal airspace congestion occurs.'
        ]
      },
      {
        heading: '2. Classification Framework and Thresholds',
        paragraphs: [
          'Constructed multi-class targets based on ICAO visibility bands (CAT I, II, III minima and VFR/IFR delineations).',
          'Evaluated Decision Tree (76.25%), Random Forest (76.31%), and optimized XGBoost classifier (78.15% overall accuracy).'
        ]
      },
      {
        heading: '3. Alert Integration & Flight-Time Windows',
        paragraphs: [
          'Integrated alert rules notify air traffic personnel when probability of visibility dropping below 3000m exceeds critical decision thresholds within the active 3-hour flight arrival window.'
        ]
      }
    ]
  },
  {
    fileName: 'Thesis-IT22069504-Jayathilaka-Humidity-QNH-DewPoint.pdf',
    aliases: ['thesis-it22069504.pdf'],
    title: 'Humidity, QNH Altimeter Setting and Dew-Point Prediction using LightGBM Gradient Boosting',
    category: 'Individual Research Thesis',
    projectId: 'R26-IT-132',
    authors: 'Jayathilaka P.K.V.K. (Student ID: IT22069504) | Specialization: Information Technology',
    abstract: 'Individual thesis investigating atmospheric moisture parameters, barometric QNH pressure tendencies, and dew point prediction using LightGBM. Derives physically consistent relative humidity and assesses atmospheric stability indices.',
    sections: [
      {
        heading: '1. Thermodynamic Coupling of Dew Point and Pressure',
        paragraphs: [
          'Dew point depression (T - Td spread) is the primary physical indicator of impending saturation and cloud formation.',
          'Directly predicting relative humidity often causes physical contradictions; this study predicts dew point and barometric pressure first, then derives relative humidity mathematically.'
        ]
      },
      {
        heading: '2. LightGBM Architecture & Feature Dynamics',
        paragraphs: [
          'LightGBM was selected for its leaf-wise tree growth and speed on continuous meteorological time series.',
          'Rolling statistics, pressure gradients, and diurnal solar radiation proxies were engineered to capture thermodynamic shifts.'
        ]
      },
      {
        heading: '3. Quantitative Evaluation and Guidance Output',
        paragraphs: [
          '• Dew Point R2: 0.66, MAE: 0.58 deg C',
          '• QNH Altimeter Setting MAE: 1.8 hPa',
          '• Successfully powers automated weather briefing and stability forecast documents for flight planning.'
        ]
      }
    ]
  }
];

// Ensure public directories exist
fs.mkdirSync('public', { recursive: true });
fs.mkdirSync('public/docs', { recursive: true });

console.log('Generating official sample PDFs for research documents...');

for (const doc of docsToGenerate) {
  const pdfBytes = generateDocPdf(doc);
  const primaryPath = path.join('public', 'docs', doc.fileName);
  fs.writeFileSync(primaryPath, pdfBytes, 'latin1');
  console.log(`✓ Generated ${primaryPath} (${fs.statSync(primaryPath).size} bytes)`);

  // Also write aliases in public/ root if specified
  if (doc.aliases) {
    for (const alias of doc.aliases) {
      const aliasPath = path.join('public', alias);
      fs.writeFileSync(aliasPath, pdfBytes, 'latin1');
      console.log(`  ↳ Alias written to ${aliasPath}`);
    }
  }
}

console.log('All sample PDFs successfully generated!');
