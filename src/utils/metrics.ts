export function angularDifference(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

export function absoluteErrors(observed: number[], predicted: number[], circular = false): number[] {
  const n = Math.min(observed.length, predicted.length);
  const out: number[] = [];
  for (let i = 0; i < n; i += 1) {
    out.push(circular ? angularDifference(observed[i], predicted[i]) : Math.abs(observed[i] - predicted[i]));
  }
  return out;
}

export function meanAbsoluteError(errors: number[]): number {
  if (errors.length === 0) return NaN;
  return errors.reduce((s, e) => s + e, 0) / errors.length;
}

export function rootMeanSquareError(errors: number[]): number {
  if (errors.length === 0) return NaN;
  return Math.sqrt(errors.reduce((s, e) => s + e * e, 0) / errors.length);
}

export function rSquared(observed: number[], predicted: number[]): number {
  const n = Math.min(observed.length, predicted.length);
  if (n < 2) return NaN;
  const mean = observed.slice(0, n).reduce((s, v) => s + v, 0) / n;
  let ssTot = 0;
  let ssRes = 0;
  for (let i = 0; i < n; i += 1) {
    ssTot += (observed[i] - mean) ** 2;
    ssRes += (observed[i] - predicted[i]) ** 2;
  }
  return ssTot === 0 ? NaN : 1 - ssRes / ssTot;
}

export function classificationAccuracy<T>(observed: T[], predicted: T[]): number {
  const n = Math.min(observed.length, predicted.length);
  if (n === 0) return NaN;
  let hits = 0;
  for (let i = 0; i < n; i += 1) if (observed[i] === predicted[i]) hits += 1;
  return hits / n * 100;
}

export function formatNumber(value: number, decimals: number): string {
  if (!Number.isFinite(value)) return '—';
  return value.toFixed(decimals);
}