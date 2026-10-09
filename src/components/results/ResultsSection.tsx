import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FileTextIcon } from 'lucide-react';
import {
  cloudVisibilityAccuracy,
  dewPointQnhResults,
  resultsNote,
  resultsScopeNote,
  temperaturePressureResult,
  windResults } from
'../../data/results';
import type { ReportedValue } from '../../types/research';
import { formatReported } from '../../utils/format';
import { Section } from '../layout/Section';
import { SectionHeading } from '../SectionHeading';

const axisTick = { fill: '#626262', fontSize: 13 };

function Group({ title, subtitle, className = '', children }: {title: string;subtitle: string;className?: string;children: React.ReactNode;}) {
  return (
    <article className={`flex flex-col rounded-2xl border border-line bg-white p-7 lg:p-8 ${className}`}>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-[15px] text-muted">{subtitle}</p>
      <div className="mt-6 flex-1">{children}</div>
    </article>);

}

function MetricFigure({ value, caption }: {value: ReportedValue;caption: string;}) {
  return (
    <div className="border-l-[3px] border-brand pl-5">
      <p className="text-[15px] font-medium text-ink">{value.label}</p>
      <p className="mt-2 font-mono text-4xl font-medium tracking-tight text-ink">{formatReported(value)}</p>
      <p className="mt-2 text-sm text-muted">
        {value.metric} · {caption}
      </p>
    </div>);

}

export function ResultsSection({ asPage = false }: {asPage?: boolean;}) {
  return (
    <Section id="results" labelledBy="results-heading" tone="alt" asPage={asPage}>
      <SectionHeading
        as={asPage ? 'h1' : 'h2'}
        id="results-heading"
        label="Results"
        title="Reported Research Results"
        intro="Results are shown by parameter group, each with its own metric and unit, so values are never compared across different scales." />
      

      <div className="mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-line bg-brand-soft px-5 py-4" role="note">
        <FileTextIcon className="mt-0.5 h-5 w-5 flex-none text-brand-ink" aria-hidden="true" />
        <p className="text-[15px] leading-relaxed text-ink">
          {resultsNote} <span className="text-muted">{resultsScopeNote}</span>
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <Group title="Cloud and Visibility" subtitle="Classification accuracy (%) · higher is better" className="lg:col-span-7">
          <div className="h-56" role="img" aria-label="Horizontal bar chart: Decision Tree 76.25%, Random Forest 76.31%, XGBoost 78.15% accuracy">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cloudVisibilityAccuracy} layout="vertical" margin={{ top: 4, right: 64, left: 4, bottom: 4 }}>
                <CartesianGrid stroke="#F1ECDD" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={axisTick} axisLine={false} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="model" width={112} tick={{ ...axisTick, fill: '#202124' }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#FFF5CC' }}
                  contentStyle={{ border: '1px solid #E8E3D5', borderRadius: 8, fontSize: 13 }}
                  formatter={(v: number) => [`${v.toFixed(2)}%`, 'Accuracy']} />
                
                <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={30}>
                  {cloudVisibilityAccuracy.map((d) =>
                  <Cell key={d.model} fill={d.model === 'XGBoost' ? '#F5C542' : '#D6CFBC'} />
                  )}
                  <LabelList dataKey="value" position="right" fill="#202124" fontSize={14} fontWeight={600} formatter={(v: number) => `${v.toFixed(2)}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-muted">The axis starts at 0%, so the small gap between models (under 2 percentage points) is shown to scale.</p>
        </Group>

        <Group title="Temperature and Pressure" subtitle="Coefficient of determination · higher is better" className="lg:col-span-5">
          <MetricFigure value={temperaturePressureResult} caption="variance explained (max 1.0)" />
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            An R² of about 0.84 means the hybrid model’s predictions explain roughly 84% of the variation in the observed values.
          </p>
        </Group>

        <Group title="Wind" subtitle="Mean absolute error in knots · lower is better" className="lg:col-span-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {windResults.map((v) =>
            <MetricFigure key={v.label} value={v} caption={v.qualifier === 'below' ? 'knots, reported as an upper bound' : 'knots'} />
            )}
          </div>
        </Group>

        <Group title="Dew Point and QNH" subtitle="Mean absolute error · lower is better" className="lg:col-span-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {dewPointQnhResults.map((v) =>
            <MetricFigure key={v.label} value={v} caption={v.unit === '°C' ? 'degrees Celsius' : 'hectopascals'} />
            )}
          </div>
          <p className="mt-6 text-sm text-muted">Different units — these two values measure different quantities and are not comparable.</p>
        </Group>
      </div>
    </Section>);

}