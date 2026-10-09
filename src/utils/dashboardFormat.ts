import type { ParameterConfig } from '../types/dashboard';

export function formatParamValue(param: ParameterConfig, value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  if (param.id === 'visibility') {
    if (value >= 9999) return '≥ 10 km';
    return `${Math.round(value).toLocaleString('en-US')} m`;
  }
  if (param.id === 'windDirection') return `${Math.round(value).toString().padStart(3, '0')}°`;
  return `${value.toFixed(param.decimals)} ${param.unit}`.trim();
}

export function formatError(param: ParameterConfig, value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  if (param.id === 'visibility') return `${Math.round(value).toLocaleString('en-US')} m`;
  if (param.id === 'windDirection') return `${Math.round(value)}°`;
  return `${value.toFixed(param.decimals === 0 ? 0 : param.decimals)} ${param.unit}`.trim();
}