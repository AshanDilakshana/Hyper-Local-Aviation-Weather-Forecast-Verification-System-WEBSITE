import React from 'react';
import { AlertCircleIcon, DatabaseZapIcon, RadioIcon, RefreshCwIcon } from 'lucide-react';
import { demoParameters } from '../../data/demoVerification';
import { buttonStyles, focusRing } from '../../utils/styles';
import { Section } from '../layout/Section';
import { SectionHeading } from '../SectionHeading';
import { ForecastReadout } from './ForecastReadout';
import { ParameterChart } from './ParameterChart';
import { useVerificationDashboard } from './useVerificationDashboard';

function DashboardBody() {
  const d = useVerificationDashboard();

  if (d.status === 'loading') {
    return (
      <div className="grid gap-6 lg:grid-cols-12" aria-busy="true">
        <div className="h-96 animate-pulse rounded-xl bg-alt lg:col-span-8" />
        <div className="h-96 animate-pulse rounded-xl bg-alt lg:col-span-4" />
        <span className="sr-only">Loading live weather data from Aviation Weather API…</span>
      </div>);
  }

  if (d.status === 'error') {
    return (
      <div className="flex flex-col items-center py-14 text-center" role="alert">
        <AlertCircleIcon className="h-7 w-7 text-danger" aria-hidden="true" />
        <p className="mt-3 text-lg font-semibold text-ink">Verification data could not be loaded</p>
        <p className="mt-1 text-[15px] text-muted">The Aviation Weather API did not respond. Check your connection and try again.</p>
        <button type="button" onClick={d.reload} className={`${buttonStyles.secondary} mt-5`}>
          <RefreshCwIcon className="h-4 w-4" aria-hidden="true" /> Try again
        </button>
      </div>);
  }

  if (d.status === 'empty' || !d.data || !d.metrics || !d.selected) {
    return (
      <div className="flex flex-col items-center py-14 text-center">
        <DatabaseZapIcon className="h-7 w-7 text-muted" aria-hidden="true" />
        <p className="mt-3 text-lg font-semibold text-ink">No verification records yet</p>
        <p className="mt-1 text-[15px] text-muted">Forecasts appear once predictions and matching observations exist.</p>
      </div>);
  }

  const { data, param, hourIndex } = d;
  const issued = hourIndex > 0
    ? data.hours[hourIndex - 1]
    : `${String(Number(data.hours[0].slice(0, 2)) - data.horizonHours).padStart(2, '0')}:00`;

  return (
    <>
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p id="param-label" className="text-sm font-medium text-ink">
            Parameter
          </p>
          <div role="group" aria-labelledby="param-label" className="mt-2 flex flex-wrap gap-2">
            {demoParameters.map((p) => {
              const active = p.id === param.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => d.setParamId(p.id)}
                  className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out ${focusRing} ${
                    active
                      ? 'border-brand bg-brand text-ink'
                      : 'border-line bg-white text-muted hover:border-line-strong hover:text-ink'
                  }`}>
                  {p.label}
                </button>);
            })}
          </div>
        </div>
        <div className="lg:w-72">
          <label htmlFor="target-time" className="flex items-baseline justify-between text-sm font-medium text-ink">
            Observation time
            <span className="font-mono text-base">{data.hours[hourIndex]}</span>
          </label>
          <input
            id="target-time"
            type="range"
            min={0}
            max={data.hours.length - 1}
            value={hourIndex}
            onChange={(e) => d.setHourIndex(Number(e.target.value))}
            aria-valuetext={data.hours[hourIndex]}
            className="mt-3 w-full accent-[#F5C542]" />
          <div className="mt-1 flex justify-between font-mono text-xs text-muted">
            <span>{data.hours[0]}</span>
            <span>{data.hours[data.hours.length - 1]}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h3 className="text-base font-semibold text-ink">Observation history · {param.label}</h3>
          <div className="mt-4">
            <ParameterChart param={param} rows={d.chartRows} hours={data.hours} hourIndex={hourIndex} cloud={data.cloud} />
          </div>
        </div>
        <div className="border-t border-line pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <ForecastReadout
            param={param}
            selected={d.selected}
            metrics={d.metrics}
            target={data.hours[hourIndex]}
            issued={issued}
            horizonHours={data.horizonHours} />
        </div>
      </div>
    </>);
}

export function VerificationDashboard() {
  return (
    <Section id="dashboard" labelledBy="dashboard-heading" tone="alt">
      <SectionHeading
        id="dashboard-heading"
        label="Dashboard"
        title="Forecast Verification Dashboard"
        intro="Live METAR observations from Bandaranaike International Airport (VCBI) fetched directly from aviationweather.gov. Choose a parameter and move the slider to explore the past 12 hours." />

      <div className="mt-10 rounded-2xl border border-line bg-white p-5 sm:p-8">
        {/* Live data badge */}
        <p
          className="mb-6 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold tracking-wide text-emerald-800"
          role="note">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <RadioIcon className="h-3.5 w-3.5" aria-hidden="true" />
          LIVE DATA · VCBI
          <span className="font-normal tracking-normal text-emerald-600">
            · aviationweather.gov · Past 12 h METAR
          </span>
        </p>
        <DashboardBody />
      </div>
    </Section>);
}