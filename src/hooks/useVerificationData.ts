import { useCallback, useEffect, useState } from 'react';
import { demoVerificationDataset } from '../data/demoVerification';
import type { VerificationDataset } from '../types/dashboard';

export type LoadStatus = 'loading' | 'ready' | 'empty' | 'error';

/**
 * Data-source adapter. Currently resolves the isolated demo dataset.
 * Replace the body with a call to the FastAPI verification endpoint when available.
 */
async function loadVerificationDataset(): Promise<VerificationDataset> {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return demoVerificationDataset;
}

export function useVerificationData() {
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [data, setData] = useState<VerificationDataset | null>(null);

  const load = useCallback(() => {
    setStatus('loading');
    loadVerificationDataset().
    then((d) => {
      setData(d);
      setStatus(d.hours.length === 0 ? 'empty' : 'ready');
    }).
    catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { status, data, reload: load };
}