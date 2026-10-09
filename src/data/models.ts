import { Thermometer, Wind, CloudFog, Droplets } from 'lucide-react';
import type { MethodPrinciple, ModelFamily } from '../types/research';

export const modelFamilies: ModelFamily[] = [
{
  id: 'temp-pressure',
  title: 'Temperature and Pressure',
  owner: 'Sankadeepa W.D.I.',
  icon: Thermometer,
  models: ['Random Forest', 'LSTM', 'Hybrid RF–LSTM'],
  what: 'Random Forest learns non-linear relationships from engineered lag features. LSTM learns from ordered sequences of past observations. The hybrid combines both, as described in the research paper.',
  why: 'Temperature and pressure follow daily cycles and are physically coupled. Pairing a tabular model with a sequential model captures both feature interactions and temporal order.',
  alternatives: 'Random Forest and LSTM were each evaluated on their own as baselines for the hybrid approach.',
  evaluation: 'MAE (average absolute error) and R² (share of variance explained) on held-out data.',
  details: [
  {
    name: 'Random Forest',
    type: 'Tabular · bagged decision-tree ensemble',
    what: 'Builds many decision trees on resampled data and averages them. Each row is independent, so time enters only through lag features.',
    relevance: 'Robust on engineered features such as recent temperature and pressure values.'
  },
  {
    name: 'LSTM',
    type: 'Sequential · recurrent neural network',
    what: 'Reads a window of past observations in order and uses gated memory cells to keep or forget information.',
    relevance: 'Learns diurnal patterns and trends that depend on the order of observations.'
  },
  {
    name: 'Hybrid RF–LSTM',
    type: 'Hybrid · tabular + sequential',
    what: 'Combines the Random Forest and LSTM components following the approach described in the paper.',
    relevance: 'Its outputs feed the density-altitude calculation, which needs both temperature and pressure.'
  }]

},
{
  id: 'wind',
  title: 'Wind',
  owner: 'Ranasingha R.A.A.D.',
  icon: Wind,
  models: ['XGBoost', 'Temporal Fusion Transformer'],
  what: 'XGBoost builds gradient-boosted decision trees on engineered lag and encoded-direction features. TFT is an attention-based deep learning model designed for multi-horizon time-series forecasting.',
  why: 'Wind is noisy and directional. Boosted trees are efficient on engineered features, while TFT can learn which past hours matter most for upcoming wind.',
  alternatives: 'XGBoost and TFT were compared with each other. The paper also describes a combined XGBoost–TFT approach.',
  evaluation: 'MAE in knots, RMSE and R². Predicted wind is converted into headwind and crosswind components.',
  details: [
  {
    name: 'XGBoost',
    type: 'Tabular · gradient-boosted trees',
    what: 'Adds trees one at a time, each correcting the errors of the previous ones, with regularisation to limit overfitting.',
    relevance: 'Works well with lagged wind speed and sine/cosine-encoded wind direction.',
    formula: 'dir_sin = sin(θ)   dir_cos = cos(θ)'
  },
  {
    name: 'Temporal Fusion Transformer',
    type: 'Sequential · attention-based deep learning',
    what: 'Combines recurrent encoding, variable selection and self-attention over past time steps.',
    relevance: 'Can weight the most informative recent hours when forecasting wind.'
  }]

},
{
  id: 'cloud-visibility',
  title: 'Cloud and Visibility',
  owner: 'Jayawardhana H.M.S.I.',
  icon: CloudFog,
  models: ['Decision Tree', 'Random Forest', 'XGBoost'],
  what: 'Three tree-based classifiers predict cloud and visibility categories: a single interpretable tree, a bagged ensemble and a gradient-boosted ensemble.',
  why: 'Cloud and visibility are reported in categories and can change abruptly, for example with sudden fog. Tree-based models handle thresholds and mixed features naturally.',
  alternatives: 'All three classifiers were compared on the same task. The comparison is shown under Reported Research Results.',
  evaluation: 'Classification accuracy, MAE where a numeric target applies, and threshold checks for visibility warnings.',
  details: [
  {
    name: 'Decision Tree',
    type: 'Tabular · single tree',
    what: 'Splits the data by feature thresholds into readable if-then rules.',
    relevance: 'An interpretable baseline that can be checked against visibility thresholds.'
  },
  {
    name: 'Random Forest',
    type: 'Tabular · bagged ensemble',
    what: 'Combines the votes of many trees trained on resampled data.',
    relevance: 'More stable than a single tree when events like fog are noisy.'
  },
  {
    name: 'XGBoost',
    type: 'Tabular · gradient-boosted trees',
    what: 'Builds trees sequentially, each focusing on cases the previous ones got wrong.',
    relevance: 'Concentrates on hard cases such as rapid drops in visibility.'
  }]

},
{
  id: 'humidity',
  title: 'QNH, Dew Point and Humidity',
  owner: 'Jayathilaka P.K.V.K.',
  icon: Droplets,
  models: ['LightGBM', 'Humidity calculation'],
  what: 'LightGBM predicts QNH and dew point from engineered features. Relative humidity is then calculated from the predicted temperature and dew point.',
  why: 'QNH and dew point change smoothly and respond well to lag and rolling-average features. Calculating humidity physically keeps it consistent with temperature and dew point.',
  alternatives: 'Not documented in the available research material.',
  evaluation: 'MAE (°C for dew point, hPa for QNH), RMSE and R².',
  details: [
  {
    name: 'LightGBM',
    type: 'Tabular · histogram-based gradient boosting',
    what: 'Bins feature values into histograms and grows trees leaf-wise, which makes training fast on large tables.',
    relevance: 'Efficient with lags, rolling averages, temperature–dew-point spread and pressure trend.'
  },
  {
    name: 'Humidity calculation',
    type: 'Derived · physical relationship',
    what: 'Calculates relative humidity from temperature (T) and dew point (Td) using a Magnus-type approximation.',
    relevance: 'Avoids a separate model whose output could contradict the temperature and dew-point forecasts.',
    formula: 'RH = 100 · exp(17.625·Td / (243.04+Td)) / exp(17.625·T / (243.04+T))'
  }]

}];


export const methodPrinciples: MethodPrinciple[] = [
{
  title: 'Tabular vs. sequential models',
  body: 'Decision Tree, Random Forest, XGBoost and LightGBM treat each row independently. Time enters only through engineered features. LSTM and TFT read ordered sequences directly.'
},
{
  title: 'Lag features and rolling averages',
  body: 'A lag feature places a past value, such as temperature 3 hours earlier, in the current row. Rolling averages summarise a recent window and smooth out noise.'
},
{
  title: 'Cyclic encoding',
  body: 'Hour of day and wind direction wrap around (23:00 → 00:00, 359° → 1°). Sine and cosine encoding keeps neighbouring values close together.'
},
{
  title: 'Chronological train/test split',
  body: 'Weather data is autocorrelated. Training on earlier periods and testing on later ones prevents future information from leaking into training.'
},
{
  title: 'Forecast horizon and timestamp alignment',
  body: 'A forecast issued at time t for horizon h is checked against the observation valid at t + h. Time zones and irregular reports must be aligned first.'
}];