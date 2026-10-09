import React from 'react';
import type { ParameterConfig } from '../../types/dashboard';
import { formatError, formatParamValue } from '../../utils/dashboardFormat';
import { formatNumber } from '../../utils/metrics';
import type { SelectedForecast, VerificationMetrics } from './useVerificationDashboard';

interface ForecastReadoutProps {
  param: ParameterConfig;
  selected: SelectedForecast;
  metrics: VerificationMetrics;
  target: string;
  issued: string;
  horizonHours: number;
}

function show(param: ParameterConfig, v: number | string) {
  return typeof v === 'number' ? formatParamValue(param, v) : v;
}

export function ForecastReadout({ param, selected, metrics, target, issued, horizonHours }: ForecastReadoutProps) {
  const isClass = metrics.kind === 'classification';
  return (
    <div className="flex h-full flex-col">
      <p className="text-sm text-muted">Forecast target</p>
      <p className="mt-0.5 font-mono text-2xl font-medium text-ink">{target}</p>
      <p className="text-sm text-muted">
        Issued {issued} · horizon +{horizonHours} h · {param.model}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
        <div className="bg-white p-4">
          <dt className="text-sm text-muted">Observed</dt>
          <dd className="mt-1 font-mono text-xl text-ink">{show(param, selected.observed)}</dd>
        </div>
        <div className="bg-brand-soft p-4">
          <dt className="text-sm text-ink">Predicted</dt>
          <dd className="mt-1 font-mono text-xl font-medium text-ink">{show(param, selected.predicted)}</dd>
        </div>
        <div className="col-span-2 flex items-center justify-between bg-white p-4">
          <dt className="text-sm text-muted">{isClass ? 'Category match' : 'Absolute error'}</dt>
          <dd className={`font-mono text-lg font-medium ${selected.ok ? 'text-success' : 'text-danger'}`}>
            {isClass ? selected.ok ? 'Match' : 'Mismatch' : formatError(param, selected.error)}
          </dd>
        </div>
      </dl>

      <h3 className="mt-7 text-base font-semibold text-ink">Metrics so far</h3>
      <p className="text-sm text-muted">
        {metrics.n} verified forecasts · demo data
      </p>
      {isClass ?
      <dl className="mt-3">
          <dt className="text-sm text-muted">Accuracy</dt>
          <dd className="font-mono text-3xl font-medium text-ink">{formatNumber(metrics.accuracy, 1)}%</dd>
        </dl> :

      <dl className="mt-3 grid grid-cols-3 gap-3">
          {[
        { k: 'MAE', v: formatError(param, metrics.mae) },
        { k: 'RMSE', v: formatError(param, metrics.rmse) },
        { k: 'R²', v: formatNumber(metrics.r2, 2) }].
        map((m) =>
        <div key={m.k}>
              <dt className="text-sm text-muted">{m.k}</dt>
              <dd className="font-mono text-lg font-medium text-ink">{m.v}</dd>
            </div>
        )}
        </dl>
      }
      {param.circular && <p className="mt-3 text-sm text-muted">Direction error uses the shortest angle; R² does not apply to circular data.</p>}
      {param.kind === 'derived' && <p className="mt-3 text-sm text-muted">Calculated from predicted temperature and dew point.</p>}
    </div>);

}