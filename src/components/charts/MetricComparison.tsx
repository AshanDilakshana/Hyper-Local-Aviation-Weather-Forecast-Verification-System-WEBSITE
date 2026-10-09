import React from 'react';
import type { MetricComparisonSpec } from '../../types/research';
import { formatReported } from '../../utils/format';

interface MetricComparisonProps {
  spec: MetricComparisonSpec;
}

export function MetricComparison({ spec }: MetricComparisonProps) {
  const best = spec.values.reduce((a, b) => spec.higherIsBetter ? b.value > a.value ? b : a : b.value < a.value ? b : a);
  return (
    <figure>
      <figcaption className="text-[15px] font-semibold text-ink">{spec.title}</figcaption>
      <ul className="mt-4 space-y-3">
        {spec.values.map((v) => {
          const pct = Math.min(100, v.value / spec.max * 100);
          const bound = v.qualifier === 'below';
          return (
            <li key={v.label} className="grid grid-cols-[6.5rem_1fr_4.5rem] items-center gap-2 sm:grid-cols-[9.5rem_1fr_6rem] sm:gap-3">
              <span className="truncate text-xs sm:text-sm text-ink">{v.label}</span>
              <span className="relative h-7 overflow-hidden rounded-md bg-alt ring-1 ring-inset ring-line">
                <span
                  className={`absolute inset-y-0 left-0 rounded-md ${
                  bound ? 'border-2 border-dashed border-brand bg-brand-soft' : v === best ? 'bg-brand' : 'bg-line-strong'}`
                  }
                  style={{ width: `${pct}%` }} />
                
              </span>
              <span className="text-right font-mono text-sm text-ink">{formatReported(v)}</span>
            </li>);

        })}
      </ul>
      <p className="mt-3 text-sm text-muted">
        {spec.higherIsBetter ? 'Higher is better.' : 'Lower is better.'} {spec.note ?? ''}
      </p>
    </figure>);

}