export type ObservedParamId =
'temperature' |
'dewPoint' |
'qnh' |
'windSpeed' |
'windDirection' |
'visibility';

export type NumericParamId = ObservedParamId | 'relativeHumidity';
export type ParamId = NumericParamId | 'cloud';

export type CloudCover = 'FEW' | 'SCT' | 'BKN' | 'OVC';

export interface ParameterConfig {
  id: ParamId;
  label: string;
  shortLabel: string;
  unit: string;
  model: string;
  kind: 'regression' | 'classification' | 'derived';
  decimals: number;
  tolerance: number;
  circular?: boolean;
}

export interface SeriesPair {
  observed: number[];
  predicted: number[];
}

export interface VerificationDataset {
  station: string;
  source: string;
  sequenceLabel: string;
  horizonHours: number;
  hours: string[];
  numeric: Record<ObservedParamId, SeriesPair>;
  cloud: {
    observed: CloudCover[];
    predicted: CloudCover[];
    baseFt: number[];
  };
  taf: {
    windSpeed: number[];
    windDirection: number[];
    visibility: number[];
    groups: string[];
  };
}

export interface Runway {
  id: string;
  heading: number;
}