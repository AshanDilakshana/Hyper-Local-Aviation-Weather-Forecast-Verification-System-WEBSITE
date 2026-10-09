import type { TeamMember } from '../types/research';

export const teamMembers: TeamMember[] = [
{
  id: 'sankadeepa',
  name: 'Sankadeepa W.D.I.',
  studentId: 'IT22113986',
  initials: 'SW',
  shortTitle: 'Coupled temperature & pressure prediction',
  cardTitle: 'Temperature and Pressure Prediction',
  cardSummary: 'RF–LSTM, atmospheric prediction, and density altitude.',
  area: 'Coupled atmospheric prediction involving temperature, pressure (QNH) and humidity-related variables.',
  responsibilities: [
  'Historical meteorological data collection and preprocessing',
  'Development and evaluation of coupled temperature and pressure prediction methods',
  'Investigation of Random Forest, LSTM and their hybrid combination',
  'Derivation of density altitude from predicted temperature and pressure',
  'Weather visualization and presentation of validated information'],

  problem:
  'Temperature and pressure (QNH) are physically coupled and both follow strong daily cycles. Predicting them in isolation ignores that coupling — and both are required to derive density altitude, a performance-critical value for take-off and climb.',
  dataFeatures: [
  'Historical airport-level temperature, QNH and humidity-related observations',
  'Lag features carrying recent values of each variable into the current row',
  'Ordered windows of past observations for sequential learning',
  'Time-of-day information to capture diurnal patterns'],

  models: [
  { name: 'Random Forest', type: 'Tabular ensemble', role: 'Baseline on engineered lag features' },
  { name: 'LSTM', type: 'Sequential neural network', role: 'Baseline learning temporal dependencies' },
  { name: 'Hybrid RF–LSTM', type: 'Hybrid', role: 'Combined approach described in the paper' }],

  rationale:
  'Random Forest handles engineered tabular features robustly but has no built-in notion of order. LSTM models sequences directly but needs more data to generalise. The hybrid combines the strengths of both and, in the paper, outperformed both baselines on R².',
  evaluation: [
  'MAE — average absolute deviation between predicted and observed values',
  'R² — share of observed variance explained by the predictions',
  'Hybrid compared against Random Forest and LSTM baselines'],

  objectives: [
  'Collect and preprocess historical meteorological data',
  'Model temperature and pressure as coupled variables',
  'Compare RF, LSTM and a hybrid combination',
  'Derive density altitude from predicted values',
  'Visualize validated weather information'],

  findings: [
  { label: 'Hybrid RF–LSTM R²', model: 'Hybrid RF–LSTM', metric: 'R²', value: 0.84, unit: '', qualifier: 'approx' },
  { label: 'Hybrid RF–LSTM MAE', model: 'Hybrid RF–LSTM', metric: 'MAE', value: 0.86, unit: '', qualifier: 'approx' },
  { label: 'Random Forest R²', model: 'Random Forest', metric: 'R²', value: 0.68, unit: '', qualifier: 'approx' },
  { label: 'LSTM R²', model: 'LSTM', metric: 'R²', value: 0.25, unit: '', qualifier: 'approx' }],

  findingsNote:
  'Values as reported in the research paper. The MAE unit follows the paper’s reporting for this target and is not restated here.',
  comparison: {
    title: 'Reported R² — temperature & pressure models',
    metric: 'R²',
    unit: '',
    higherIsBetter: true,
    max: 1,
    values: [
    { label: 'Random Forest', model: 'Random Forest', metric: 'R²', value: 0.68, unit: '', qualifier: 'approx' },
    { label: 'LSTM', model: 'LSTM', metric: 'R²', value: 0.25, unit: '', qualifier: 'approx' },
    { label: 'Hybrid RF–LSTM', model: 'Hybrid RF–LSTM', metric: 'R²', value: 0.84, unit: '', qualifier: 'approx' }]

  },
  integration:
  'Predicted temperature and QNH feed the density-altitude calculation and the dashboard’s temperature and pressure views.',
  integrationPoints: ['Density altitude', 'Temperature & QNH panels', 'Relative humidity (temperature input)'],
  concepts: [
  { term: 'Random Forest', explanation: 'An ensemble of decision trees trained on bootstrapped samples; predictions are averaged. Treats each row independently.' },
  { term: 'LSTM', explanation: 'A recurrent neural network with gated memory cells that learns from ordered sequences of observations.' },
  { term: 'Hybrid prediction', explanation: 'Combining a tabular model and a sequential model so each contributes what it captures best.' },
  { term: 'Lag features', explanation: 'Past values (e.g. temperature 1 h ago) placed in the current row so tabular models see recent history.' },
  { term: 'Sequential dependencies', explanation: 'The influence of earlier time steps on later ones — e.g. the morning warm-up shaping afternoon temperature.' },
  { term: 'MAE', explanation: 'Mean absolute error — average size of the error, in the units of the target.' },
  { term: 'R²', explanation: 'Coefficient of determination — 1 is perfect, 0 means no better than predicting the mean.' },
  { term: 'Pressure altitude', explanation: 'Altitude in the standard atmosphere for the current pressure; approximated from elevation and QNH.' },
  { term: 'ISA temperature', explanation: 'International Standard Atmosphere temperature: 15 °C at sea level, decreasing about 2 °C per 1,000 ft.' },
  { term: 'Density altitude', explanation: 'Pressure altitude corrected for temperature deviation from ISA; higher values mean reduced aircraft performance.' }]

},
{
  id: 'ranasingha',
  name: 'Ranasingha R.A.A.D.',
  studentId: 'IT22269720',
  initials: 'RR',
  shortTitle: 'Wind prediction & runway wind analysis',
  cardTitle: 'Wind Prediction',
  cardSummary: 'XGBoost, TFT, and runway-oriented wind calculations.',
  area: 'Wind pattern prediction and runway-oriented aviation wind analysis.',
  responsibilities: [
  'Analysis of historical wind speed and wind direction',
  'Feature engineering and short-term wind prediction',
  'Investigation of XGBoost and Temporal Fusion Transformer (TFT) models',
  'Comparison of predictions using forecast evaluation metrics',
  'Conversion of wind into headwind and crosswind components',
  'Pilot portal and flight-detail interaction functionality'],

  problem:
  'Wind speed and direction govern runway selection and crosswind limits. Raw wind values must be predicted reliably and then converted into runway-relative components before they are operationally useful.',
  dataFeatures: [
  'Historical wind speed and wind direction observations',
  'Lag features of recent wind values',
  'Sine/cosine encoding of wind direction to remove the 0°/360° discontinuity',
  'Cyclic time-of-day features'],

  models: [
  { name: 'XGBoost', type: 'Tabular gradient boosting', role: 'Fast baseline on engineered features' },
  { name: 'Temporal Fusion Transformer', type: 'Sequential attention model', role: 'Multi-horizon time-series forecaster' },
  { name: 'XGBoost–TFT', type: 'Hybrid', role: 'Combined approach described in the paper' }],

  rationale:
  'XGBoost is a strong, efficient model for engineered tabular features. TFT is purpose-built for multi-horizon time-series forecasting and uses attention to weight relevant past time steps. Comparing them tests whether sequence modelling adds value for wind.',
  evaluation: [
  'MAE in knots — average absolute wind-speed error',
  'RMSE — penalises larger errors more heavily',
  'R² — variance explained by predictions',
  'Side-by-side comparison of XGBoost, TFT and the hybrid'],

  objectives: [
  'Analyse historical wind behaviour at VCBI',
  'Engineer lag and encoded-direction features',
  'Compare XGBoost and TFT for short-term wind',
  'Convert predictions to headwind/crosswind components',
  'Deliver pilot portal flight-detail interaction'],

  findings: [
  { label: 'XGBoost MAE', model: 'XGBoost', metric: 'MAE', value: 1.69, unit: 'kt', qualifier: 'approx' },
  { label: 'TFT MAE', model: 'TFT', metric: 'MAE', value: 1.0, unit: 'kt', qualifier: 'below' },
  { label: 'Hybrid XGBoost–TFT MAE', model: 'XGBoost–TFT', metric: 'MAE', value: 2.5, unit: 'kt', qualifier: 'below' }],

  findingsNote:
  'TFT and hybrid values are reported as upper bounds (“below”), not exact figures. The available material does not confirm that all three were evaluated on an identical test split.',
  comparison: {
    title: 'Reported wind-speed MAE (knots, lower is better)',
    metric: 'MAE',
    unit: 'kt',
    higherIsBetter: false,
    max: 3,
    values: [
    { label: 'XGBoost', model: 'XGBoost', metric: 'MAE', value: 1.69, unit: 'kt', qualifier: 'approx' },
    { label: 'TFT', model: 'TFT', metric: 'MAE', value: 1.0, unit: 'kt', qualifier: 'below' },
    { label: 'XGBoost–TFT', model: 'XGBoost–TFT', metric: 'MAE', value: 2.5, unit: 'kt', qualifier: 'below' }],

    note: 'Hatched bars mark reported upper bounds; the true value lies somewhere below the bar end.'
  },
  integration:
  'Predicted wind feeds the headwind/crosswind calculation for runway 04/22 and the pilot portal’s flight-detail views.',
  integrationPoints: ['Headwind / crosswind', 'Pilot portal', 'Wind panels in dashboard'],
  concepts: [
  { term: 'XGBoost', explanation: 'Gradient-boosted decision trees: each new tree corrects the residual errors of the ensemble, with regularisation.' },
  { term: 'Temporal Fusion Transformer', explanation: 'A deep time-series architecture combining recurrent encoding, variable selection and self-attention over past steps.' },
  { term: 'Time-series forecasting', explanation: 'Predicting future values of a variable from its ordered history and related inputs.' },
  { term: 'Lag features', explanation: 'Recent wind values placed in the current row so a tabular model can use them.' },
  { term: 'Wind direction encoding', explanation: 'Representing direction θ as sin θ and cos θ so 359° and 1° are numerically close.' },
  { term: 'MAE', explanation: 'Mean absolute error in knots.' },
  { term: 'RMSE', explanation: 'Root mean square error; larger misses weigh more.' },
  { term: 'R²', explanation: 'Share of observed variance explained by the predictions.' },
  { term: 'Headwind', explanation: 'Wind component along the runway heading: speed × cos(wind direction − runway heading).' },
  { term: 'Crosswind', explanation: 'Wind component perpendicular to the runway: speed × sin(wind direction − runway heading).' }]

},
{
  id: 'jayawardhana',
  name: 'Jayawardhana H.M.S.I.',
  studentId: 'IT22619976',
  initials: 'JH',
  shortTitle: 'Rapid change detection, cloud & visibility',
  cardTitle: 'Cloud and Visibility Prediction',
  cardSummary: 'Decision Tree, Random Forest, XGBoost, and visibility analysis.',
  area: 'Rapid weather change detection, cloud conditions and visibility prediction.',
  responsibilities: [
  'Analysis of cloud-ceiling and visibility patterns',
  'Investigation of sudden fog and low-visibility conditions',
  'Comparison of Decision Tree, Random Forest and XGBoost',
  'Integration of cloud and visibility predictions into the system',
  'Flight-time processing and preparation of the forecast time window',
  'Investigation of threshold-based visibility warnings'],

  problem:
  'Fog, mist and low cloud can reduce visibility and ceiling quickly — sometimes faster than scheduled forecasts update. Detecting these rapid changes matters for approach planning and operational decisions.',
  dataFeatures: [
  'Historical visibility and cloud observations (cover and base height)',
  'Supporting atmospheric variables where available',
  'Lag features for detecting rapid change',
  'Flight-time windows defining the forecast period of interest'],

  models: [
  { name: 'Decision Tree', type: 'Tabular, single tree', role: 'Interpretable baseline' },
  { name: 'Random Forest', type: 'Tabular ensemble', role: 'Variance-reducing ensemble' },
  { name: 'XGBoost', type: 'Tabular gradient boosting', role: 'Highest reported accuracy' }],

  rationale:
  'A Decision Tree gives readable rules against visibility and ceiling thresholds. Random Forest averages many trees to reduce variance. XGBoost boosts trees sequentially on residual errors and reported the highest accuracy of the three.',
  evaluation: [
  'Accuracy for classification of cloud and visibility categories',
  'MAE where a numeric (regression) target applies',
  'Threshold checks for visibility-related warnings'],

  objectives: [
  'Analyse cloud-ceiling and visibility behaviour',
  'Investigate sudden fog and low-visibility events',
  'Compare tree-based classifiers',
  'Prepare flight-time forecast windows',
  'Explore threshold-based visibility warnings'],

  findings: [
  { label: 'Decision Tree accuracy', model: 'Decision Tree', metric: 'Accuracy', value: 76.25, unit: '%', qualifier: 'exact' },
  { label: 'Random Forest accuracy', model: 'Random Forest', metric: 'Accuracy', value: 76.31, unit: '%', qualifier: 'exact' },
  { label: 'XGBoost accuracy', model: 'XGBoost', metric: 'Accuracy', value: 78.15, unit: '%', qualifier: 'exact' }],

  findingsNote:
  'Differences between the three models are under two percentage points; they should be read alongside class balance and the test split described in the paper.',
  comparison: {
    title: 'Reported accuracy — cloud & visibility (%)',
    metric: 'Accuracy',
    unit: '%',
    higherIsBetter: true,
    max: 100,
    values: [
    { label: 'Decision Tree', model: 'Decision Tree', metric: 'Accuracy', value: 76.25, unit: '%', qualifier: 'exact' },
    { label: 'Random Forest', model: 'Random Forest', metric: 'Accuracy', value: 76.31, unit: '%', qualifier: 'exact' },
    { label: 'XGBoost', model: 'XGBoost', metric: 'Accuracy', value: 78.15, unit: '%', qualifier: 'exact' }]

  },
  integration:
  'Cloud and visibility predictions drive risk indicators in the dashboard. The paper also describes a separate Streamlit interface for cloud and visibility information.',
  integrationPoints: ['Visibility risk indicators', 'Cloud condition panel', 'Streamlit interface', 'Flight-time windows'],
  concepts: [
  { term: 'Classification', explanation: 'Predicting a category (e.g. cloud cover class or visibility band) rather than a number.' },
  { term: 'Regression', explanation: 'Predicting a continuous value such as visibility in metres, where applicable.' },
  { term: 'Decision Tree', explanation: 'A single tree of if-then splits on feature thresholds; easy to interpret, prone to overfitting.' },
  { term: 'Random Forest', explanation: 'Many trees on resampled data, votes combined — more stable than one tree.' },
  { term: 'XGBoost', explanation: 'Trees added sequentially, each correcting previous errors, with regularisation.' },
  { term: 'Visibility thresholds', explanation: 'Fixed visibility values used to trigger informational warnings about reduced or low visibility.' },
  { term: 'Cloud conditions', explanation: 'Cloud cover amount (FEW, SCT, BKN, OVC) and base height as reported in METAR.' },
  { term: 'Accuracy', explanation: 'Share of predictions whose category matches the observed category.' },
  { term: 'MAE', explanation: 'Mean absolute error for numeric targets, in their own units.' }]

},
{
  id: 'jayathilaka',
  name: 'Jayathilaka P.K.V.K.',
  studentId: 'IT22069504',
  initials: 'JP',
  shortTitle: 'Humidity, QNH, dew point & stability',
  cardTitle: 'Humidity, QNH and Dew Point',
  cardSummary: 'LightGBM, atmospheric relationships, and humidity estimation.',
  area: 'Relative humidity, QNH, dew point and atmospheric stability.',
  responsibilities: [
  'Analysis of historical humidity, pressure and dew-point relationships',
  'Development and evaluation of QNH and dew-point prediction',
  'Investigation of LightGBM for short-term forecasting',
  'Calculation of relative humidity from predicted temperature and dew point',
  'Forecast reliability analysis and pressure-trend monitoring',
  'Generation of structured weather guidance documents'],

  problem:
  'Dew point and QNH determine humidity, fog potential and altimeter settings. Relative humidity is not independent — it follows from temperature and dew point — so predicting dew point and deriving RH keeps outputs physically consistent.',
  dataFeatures: [
  'Historical humidity, QNH and dew-point observations',
  'Temperature–dew-point spread',
  'Lag features and rolling averages',
  'Pressure trend over recent hours'],

  models: [
  { name: 'LightGBM', type: 'Tabular gradient boosting', role: 'QNH and dew-point prediction' },
  { name: 'RH derivation', type: 'Physical relationship', role: 'Relative humidity from T and Td' }],

  rationale:
  'LightGBM trains efficiently on engineered tabular features and captures non-linear interactions. Deriving relative humidity from predicted temperature and dew point avoids a separate model whose output could contradict them.',
  evaluation: [
  'MAE — °C for dew point, hPa for QNH',
  'RMSE — sensitivity to larger misses',
  'R² — variance explained for dew point',
  'Reliability assessment of forecasts over time'],

  objectives: [
  'Analyse humidity–pressure–dew-point relationships',
  'Predict QNH and dew point with LightGBM',
  'Derive relative humidity physically',
  'Monitor pressure trends and forecast reliability',
  'Generate structured weather guidance documents'],

  findings: [
  { label: 'Dew point R²', model: 'LightGBM', metric: 'R²', value: 0.66, unit: '', qualifier: 'approx' },
  { label: 'Dew point MAE', model: 'LightGBM', metric: 'MAE', value: 0.58, unit: '°C', qualifier: 'approx' },
  { label: 'QNH MAE', model: 'LightGBM', metric: 'MAE', value: 1.8, unit: 'hPa', qualifier: 'approx' }],

  findingsNote:
  'Dew-point and QNH errors are in different physical units and are not comparable to each other. Alternative models for this component are not documented in the available material.',
  integration:
  'Dew point and QNH feed the relative-humidity derivation, pressure-trend monitoring and the structured weather guidance documents.',
  integrationPoints: ['Relative humidity', 'Pressure trend', 'Weather guidance documents'],
  concepts: [
  { term: 'LightGBM', explanation: 'Gradient boosting with histogram-based splits and leaf-wise tree growth; fast on large tabular data.' },
  { term: 'QNH', explanation: 'Altimeter setting that makes an altimeter read aerodrome elevation on the ground, in hPa.' },
  { term: 'Dew point', explanation: 'Temperature to which air must cool to become saturated.' },
  { term: 'Relative humidity', explanation: 'Actual vapour pressure as a percentage of saturation vapour pressure at the current temperature.' },
  { term: 'T–Td relationship', explanation: 'A small temperature–dew-point spread indicates near-saturated air and possible fog or low cloud.' },
  { term: 'Feature engineering', explanation: 'Constructing inputs such as lags, rolling means and spreads from raw observations.' },
  { term: 'MAE', explanation: 'Average absolute error in the target’s units.' },
  { term: 'RMSE', explanation: 'Root mean square error; emphasises larger misses.' },
  { term: 'R²', explanation: 'Share of observed variance explained.' },
  { term: 'Reliability assessment', explanation: 'Checking whether forecast error stays consistent over time and conditions.' }]

}];