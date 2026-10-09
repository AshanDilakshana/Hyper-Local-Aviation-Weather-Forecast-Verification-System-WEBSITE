import React, { useState } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { commentComponents, reviewStages, statusLabels } from '../../data/panelComments';
import type { NewPanelComment } from '../../hooks/usePanelComments';
import type { CommentStatus, ReviewStage } from '../../types/panel';
import { buttonStyles } from '../../utils/styles';

interface PanelCommentFormProps {
  onAdd: (c: NewPanelComment) => void;
  storageError: boolean;
}

const fieldClass =
'mt-1.5 w-full min-w-0 rounded-lg border border-line-strong bg-white px-3 py-2.5 text-[15px] text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand';

export function PanelCommentForm({ onAdd, storageError }: PanelCommentFormProps) {
  const [stage, setStage] = useState<ReviewStage>(reviewStages[0]);
  const [component, setComponent] = useState(commentComponents[0].id);
  const [comment, setComment] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<CommentStatus>('open');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim().length < 10) {
      setError('Enter the panel comment (at least 10 characters).');
      setSaved(false);
      return;
    }
    onAdd({ stage, component, comment: comment.trim(), response: response.trim(), status });
    setComment('');
    setResponse('');
    setStatus('open');
    setError('');
    setSaved(true);
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-line bg-white p-6 sm:p-7" aria-labelledby="form-heading">
      <span className="block h-1 w-10 rounded-full bg-brand" aria-hidden="true" />
      <h2 id="form-heading" className="mt-5 text-xl font-semibold text-ink">
        Record a comment
      </h2>
      <p className="mt-1 text-[15px] text-muted">Saved in this browser only.</p>

      <div className="mt-6 space-y-5">
        <label className="block text-sm font-medium text-ink">
          Review stage
          <select value={stage} onChange={(e) => setStage(e.target.value as ReviewStage)} className={fieldClass}>
            {reviewStages.map((s) =>
            <option key={s}>{s}</option>
            )}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Related component
          <select value={component} onChange={(e) => setComponent(e.target.value)} className={fieldClass}>
            {commentComponents.map((c) =>
            <option key={c.id} value={c.id}>
                {c.label}
              </option>
            )}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Panel comment
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setSaved(false);
            }}
            rows={4}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'comment-error' : undefined}
            className={`${fieldClass} ${error ? 'border-danger' : ''}`}
            placeholder="What did the panel say?" />
          
        </label>
        {error &&
        <p id="comment-error" className="-mt-3 text-sm text-danger">
            {error}
          </p>
        }
        <label className="block text-sm font-medium text-ink">
          Team response <span className="font-normal text-muted">(optional)</span>
          <textarea value={response} onChange={(e) => setResponse(e.target.value)} rows={3} className={fieldClass} placeholder="How the team addressed it" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value as CommentStatus)} className={fieldClass}>
            {(Object.keys(statusLabels) as CommentStatus[]).map((s) =>
            <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            )}
          </select>
        </label>
      </div>

      <button type="submit" className={`${buttonStyles.primary} mt-7 w-full`}>
        Add comment
      </button>
      <div aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
        {saved && !storageError &&
        <p className="flex items-center gap-1.5 text-success">
            <CheckCircle2Icon className="h-4 w-4" aria-hidden="true" /> Comment saved in this browser.
          </p>
        }
        {storageError && <p className="text-danger">This browser blocked local storage — the comment will be lost on reload.</p>}
      </div>
    </form>);

}