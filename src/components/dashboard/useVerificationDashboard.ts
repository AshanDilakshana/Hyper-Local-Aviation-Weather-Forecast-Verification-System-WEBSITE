import { useMemo, useState } from 'react';
import { demoParameters } from '../../data/demoVerification';
import { useVerificationData } from '../../hooks/useVerificationData';
import type { NumericParamId, ParamId, ParameterConfig, SeriesPair } from '../../types/dashboard';
import { relativeHumidity } from '../../utils/aviation';
import { useScreenInit } from '../../useScreenInit.js';
import {
  absoluteErrors,
  angularDifference,
  classificationAccuracy,
  meanAbsoluteError,
  rootMeanSquareError,
  rSquared } from
'../../utils/metrics';

export interface ChartRow {
  time: string;
  observed: number | null;
  predicted: number;
  error: number | null;
}

export interface VerificationMetrics {
  kind: 'regression' | 'classification';
  n: number;
  mae: number;
  rmse: number;
  r2: number;
  accuracy: number;
}

export interface SelectedForecast {
  observed: number | string;
  predicted: number | string;
  error: number | null;
  ok: boolean;
}

function errorFor(param: ParameterConfig, obs: number, pred: number) {
  return param.circular ? angularDifference(obs, pred) : Math.abs(obs - pred);
}

export function useVerificationDashboard() {
  const screenInit = useScreenInit() as {dashboardParam?: ParamId;};
  const { status, data, reload } = useVerificationData();
  const [paramId, setParamId] = useState<ParamId>(screenInit.dashboardParam ?? 'temperature');
  const [hourIndex, setHourIndex] = useState(7);

  const param = demoParameters.find((p) => p.id === paramId) ?? demoParameters[0];

  const series = useMemo<Record<NumericParamId, SeriesPair> | null>(() => {
    if (!data) return null;
    const t = data.numeric.temperature;
    const td = data.numeric.dewPoint;
    return {
      ...data.numeric,
      relativeHumidity: {
        observed: t.observed.map((v, i) => relativeHumidity(v, td.observed[i])),
        predicted: t.predicted.map((v, i) => relativeHumidity(v, td.predicted[i]))
      }
    };
  }, [data]);

  const chartRows = useMemo<ChartRow[]>(() => {
    if (!data || !series || param.id === 'cloud') return [];
    const s = series[param.id];
    return data.hours.map((time, i) => {
      const verified = i <= hourIndex;
      return {
        time,
        observed: verified ? s.observed[i] : null,
        predicted: s.predicted[i],
        error: verified ? errorFor(param, s.observed[i], s.predicted[i]) : null
      };
    });
  }, [data, series, param, hourIndex]);

  const metrics = useMemo<VerificationMetrics | null>(() => {
    if (!data || !series) return null;
    const n = hourIndex + 1;
    if (param.id === 'cloud') {
      return {
        kind: 'classification',
        n,
        mae: NaN,
        rmse: NaN,
        r2: NaN,
        accuracy: classificationAccuracy(data.cloud.observed.slice(0, n), data.cloud.predicted.slice(0, n))
      };
    }
    const s = series[param.id];
    const obs = s.observed.slice(0, n);
    const pred = s.predicted.slice(0, n);
    const errs = absoluteErrors(obs, pred, param.circular);
    return {
      kind: 'regression',
      n,
      mae: meanAbsoluteError(errs),
      rmse: rootMeanSquareError(errs),
      r2: param.circular ? NaN : rSquared(obs, pred),
      accuracy: NaN
    };
  }, [data, series, param, hourIndex]);

  const selected = useMemo<SelectedForecast | null>(() => {
    if (!data || !series) return null;
    const i = hourIndex;
    if (param.id === 'cloud') {
      const o = data.cloud.observed[i];
      const p = data.cloud.predicted[i];
      return { observed: o, predicted: p, error: null, ok: o === p };
    }
    const s = series[param.id];
    const err = errorFor(param, s.observed[i], s.predicted[i]);
    return { observed: s.observed[i], predicted: s.predicted[i], error: err, ok: err <= param.tolerance };
  }, [data, series, param, hourIndex]);

  return { status, data, reload, param, setParamId, hourIndex, setHourIndex, chartRows, metrics, selected };
}