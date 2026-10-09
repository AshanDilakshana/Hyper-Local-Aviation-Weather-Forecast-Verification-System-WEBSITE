import React from 'react';
import { Bar, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CheckIcon, XIcon } from 'lucide-react';
import type { CloudCover, ParameterConfig } from '../../types/dashboard';
import { formatError, formatParamValue } from '../../utils/dashboardFormat';
import type { ChartRow } from './useVerificationDashboard';

interface ParameterChartProps {
  param: ParameterConfig;
  rows: ChartRow[];
  hours: string[];
  hourIndex: number;
  cloud: {observed: CloudCover[];predicted: CloudCover[];};
}

const axisTick = { fill: '#626262', fontSize: 12 };

function ChartTooltip({ active, payload, param }: {active?: boolean;payload?: {payload: ChartRow;}[];param: ParameterConfig;}) {
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm shadow-md">
      <p className="font-mono text-muted">{row.time} · demo</p>
      <dl className="mt-1.5 space-y-1">
        <div className="flex justify-between gap-6">
          <dt className="text-muted">Observed</dt>
          <dd className="font-mono text-ink">{row.observed === null ? 'Pending' : formatParamValue(param, row.observed)}</dd>
        </div>
        <div className="flex justify-between gap-6">
          <dt className="text-muted">Predicted</dt>
          <dd className="font-mono text-ink">{formatParamValue(param, row.predicted)}</dd>
        </div>
        <div className="flex justify-between gap-6 border-t border-line pt-1">
          <dt className="text-muted">Abs. error</dt>
          <dd className="font-mono text-ink">{formatError(param, row.error)}</dd>
        </div>
      </dl>
    </div>);

}

export function ParameterChart({ param, rows, hours, hourIndex, cloud }: ParameterChartProps) {
  if (param.id === 'cloud') {
    return (
      <div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12">
          {hours.map((h, i) => {
            const verified = i <= hourIndex;
            const match = cloud.observed[i] === cloud.predicted[i];
            const selected = i === hourIndex;
            return (
              <div
                key={h}
                className={`rounded-lg border p-2.5 text-center ${selected ? 'border-brand bg-brand-soft' : verified ? 'border-line bg-white' : 'border-dashed border-line bg-alt'}`}>
                
                <p className="font-mono text-xs text-muted">{h}</p>
                <p className="mt-1.5 font-mono text-sm font-medium text-ink">{cloud.predicted[i]}</p>
                <p className="font-mono text-sm text-muted">{verified ? cloud.observed[i] : '···'}</p>
                <span className="mt-1 flex h-4 justify-center">
                  {verified && (
                  match ?
                  <CheckIcon className="h-4 w-4 text-success" aria-label="Match" /> :

                  <XIcon className="h-4 w-4 text-danger" aria-label="Mismatch" />)
                  }
                </span>
              </div>);

          })}
        </div>
        <p className="mt-3 text-sm text-muted">Top: predicted category · Bottom: observed category. Verified as an exact match.</p>
      </div>);

  }

  const domain: [number | string, number | string] =
  param.id === 'visibility' ? [0, 10000] : param.id === 'windDirection' ? [180, 280] : param.id === 'relativeHumidity' ? [50, 100] : ['auto', 'auto'];

  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted" aria-label="Chart legend">
        <li className="flex items-center gap-2">
          <span className="h-0.5 w-5 bg-ink" aria-hidden="true" />
          Observed
        </li>
        <li className="flex items-center gap-2">
          <span className="h-0 w-5 border-t-[3px] border-dashed border-[#D9A514]" aria-hidden="true" />
          Predicted
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-line-strong" aria-hidden="true" />
          Absolute error
        </li>
      </ul>
      <div className="h-72" role="img" aria-label={`${param.label}: predicted versus observed over the demo sequence`}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={rows} margin={{ top: 8, right: 4, left: -4, bottom: 0 }}>
            <CartesianGrid stroke="#F1ECDD" vertical={false} />
            <XAxis dataKey="time" tick={axisTick} axisLine={{ stroke: '#E8E3D5' }} tickLine={false} />
            <YAxis yAxisId="v" domain={domain} tick={axisTick} axisLine={false} tickLine={false} width={52} />
            <YAxis yAxisId="e" orientation="right" hide domain={[0, (max: number) => Math.max(max * 3, 1)]} />
            <Tooltip content={<ChartTooltip param={param} />} cursor={{ stroke: '#E8E3D5' }} />
            <Bar yAxisId="e" dataKey="error" fill="#D6CFBC" maxBarSize={14} radius={[2, 2, 0, 0]} isAnimationActive={false} />
            <ReferenceLine yAxisId="v" x={hours[hourIndex]} stroke="#F5C542" strokeWidth={2} />
            <Line yAxisId="v" type="monotone" dataKey="predicted" stroke="#D9A514" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3, fill: '#F5C542', stroke: '#D9A514' }} isAnimationActive={false} />
            <Line yAxisId="v" type="monotone" dataKey="observed" stroke="#202124" strokeWidth={2} dot={{ r: 3, fill: '#202124' }} connectNulls={false} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-sm text-muted">Observations after the selected target time have not arrived yet, so those forecasts are unverified.</p>
    </div>);

}