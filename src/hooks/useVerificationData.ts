import { useCallback, useEffect, useState } from 'react';
import { demoVerificationDataset } from '../data/demoVerification';
import type { VerificationDataset } from '../types/dashboard';
import { fetchLiveVerificationData } from '../utils/liveData';

export type LoadStatus = 'loading' | 'ready' | 'empty' | 'error';

async function loadVerificationDataset(): Promise<VerificationDataset> {
  return fetchLiveVerificationData('VCBI');
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
    catch((err) => {
      console.error('Verification data load failed:', err);
      setStatus('error');
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { status, data, reload: load };
}