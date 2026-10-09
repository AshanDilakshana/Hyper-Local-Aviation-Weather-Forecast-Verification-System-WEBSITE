import { useCallback, useEffect, useState } from 'react';
import { panelComments } from '../data/panelComments';
import type { CommentStatus, PanelComment } from '../types/panel';

const STORAGE_KEY = 'r26-it-132-panel-comments';

function readLocal(): PanelComment[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as PanelComment[] : [];
  } catch {
    return [];
  }
}

export type NewPanelComment = Omit<PanelComment, 'id' | 'source'>;

export function usePanelComments() {
  const [local, setLocal] = useState<PanelComment[]>(readLocal);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(local));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [local]);

  const add = useCallback((c: NewPanelComment) => {
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now());
    setLocal((l) => [{ ...c, id, source: 'local' }, ...l]);
  }, []);

  const remove = useCallback((id: string) => setLocal((l) => l.filter((c) => c.id !== id)), []);

  const setStatus = useCallback(
    (id: string, status: CommentStatus) => setLocal((l) => l.map((c) => c.id === id ? { ...c, status } : c)),
    []
  );

  return { comments: [...panelComments, ...local], add, remove, setStatus, storageError };
}