import type { ReportedValue } from '../types/research';

export function formatReported(v: ReportedValue): string {
  const decimals = v.metric === 'Accuracy' ? 2 : 2;
  const num = v.value.toFixed(decimals);
  const unit = v.unit === '%' ? '%' : v.unit ? ` ${v.unit}` : '';
  if (v.qualifier === 'below') return `< ${num}${unit}`;
  if (v.qualifier === 'approx') return `≈ ${num}${unit}`;
  return `${num}${unit}`;
}