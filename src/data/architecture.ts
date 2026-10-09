import { Database, Cog, BrainCircuit, Server, MonitorSmartphone } from 'lucide-react';
import type { ArchLayer } from '../types/research';

export const architectureLayers: ArchLayer[] = [
{
  id: 'sources',
  title: 'Data Sources',
  icon: Database,
  items: [{ name: 'Historical weather data' }, { name: 'METAR observations' }, { name: 'TAF forecasts' }]
},
{
  id: 'processing',
  title: 'Data Processing',
  icon: Cog,
  items: [{ name: 'Parsing' }, { name: 'Cleaning' }, { name: 'Feature engineering' }, { name: 'Timestamp alignment' }]
},
{
  id: 'models',
  title: 'Prediction Models',
  icon: BrainCircuit,
  items: [
  { name: 'RF–LSTM', role: 'Temperature & pressure' },
  { name: 'XGBoost · TFT', role: 'Wind' },
  { name: 'Decision Tree · Random Forest · XGBoost', role: 'Cloud & visibility' },
  { name: 'LightGBM', role: 'QNH & dew point' }]

},
{
  id: 'backend',
  title: 'Backend & Storage',
  icon: Server,
  items: [
  { name: 'Prediction services', role: 'FastAPI' },
  { name: 'Database storage' },
  { name: 'Forecast verification' },
  { name: 'Model maintenance', role: 'Where implemented' }]

},
{
  id: 'ui',
  title: 'User Interface',
  icon: MonitorSmartphone,
  items: [{ name: 'Research dashboard' }, { name: 'Forecast comparisons' }, { name: 'Model evaluation' }, { name: 'Aviation insights' }]
}];


export const architectureConnectors = ['Raw data', 'Features', 'Predictions', 'Verified results'];