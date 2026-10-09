import { useCallback, useEffect, useState } from 'react';

export type PdfStatus = 'checking' | 'available' | 'missing';

const cache = new Map<string, Promise<boolean>>();

async function checkPdf(path: string): Promise<boolean> {
  const isPdf = (res: Response) => res.ok && (res.headers.get('content-type') ?? '').toLowerCase().includes('pdf');
  try {
    const head = await fetch(path, { method: 'HEAD', cache: 'no-store' });
    if (isPdf(head)) return true;
    if (head.status === 405) {
      const get = await fetch(path, { cache: 'no-store' });
      return isPdf(get);
    }
    return false;
  } catch {
    return false;
  }
}

export function usePdfAvailability(path: string) {
  const [status, setStatus] = useState<PdfStatus>('checking');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    if (!cache.has(path)) cache.set(path, checkPdf(path));
    cache.get(path)?.then((ok) => {
      if (active) setStatus(ok ? 'available' : 'missing');
    });
    return () => {
      active = false;
    };
  }, [path, attempt]);

  const recheck = useCallback(() => {
    cache.delete(path);
    setStatus('checking');
    setAttempt((a) => a + 1);
  }, [path]);

  return { status, recheck };
}