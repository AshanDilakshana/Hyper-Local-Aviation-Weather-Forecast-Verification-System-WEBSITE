import React, { useState } from 'react';
import { MessageSquareTextIcon, Trash2Icon } from 'lucide-react';
import { commentComponents, reviewStages, statusLabels } from '../../data/panelComments';
import type { CommentStatus, PanelComment } from '../../types/panel';
import { focusRing } from '../../utils/styles';

interface PanelCommentListProps {
  comments: PanelComment[];
  onRemove: (id: string) => void;
  onStatusChange: (id: string, status: CommentStatus) => void;
}

type Filter = 'all' | CommentStatus;

const statusStyle: Record<CommentStatus, string> = {
  open: 'border-line-strong bg-white text-ink',
  'in-progress': 'border-brand bg-brand-soft text-ink',
  addressed: 'border-success/40 bg-[#EAF6EF] text-success'
};

export function PanelCommentList({ comments, onRemove, onStatusChange }: PanelCommentListProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const filters: Filter[] = ['all', 'open', 'in-progress', 'addressed'];
  const count = (f: Filter) => f === 'all' ? comments.length : comments.filter((c) => c.status === f).length;
  const visible = filter === 'all' ? comments : comments.filter((c) => c.status === filter);
  const componentLabel = (id: string) => commentComponents.find((c) => c.id === id)?.label ?? id;

  return (
    <div>
      <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
        {filters.map((f) =>
        <button
          key={f}
          type="button"
          aria-pressed={filter === f}
          onClick={() => setFilter(f)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out ${focusRing} ${
          filter === f ? 'border-brand bg-brand text-ink' : 'border-line bg-white text-muted hover:text-ink'}`
          }>
          
            {f === 'all' ? 'All' : statusLabels[f]} <span className="ml-1 font-mono">{count(f)}</span>
          </button>
        )}
      </div>

      {visible.length === 0 ?
      <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-white px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-ink">
            <MessageSquareTextIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-4 text-lg font-semibold text-ink">{comments.length === 0 ? 'No panel comments recorded yet' : 'No comments with this status'}</p>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
            {comments.length === 0 ?
          'Record feedback as it is received using the form. To publish comments for every visitor, add them to the project’s panel comments data file.' :
          'Choose another filter to see the remaining comments.'}
          </p>
        </div> :

      <div className="mt-8 space-y-10">
          {reviewStages.map((stage) => {
          const items = visible.filter((c) => c.stage === stage);
          if (items.length === 0) return null;
          return (
            <section key={stage} aria-label={stage}>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
                  <span className="h-2 w-2 rounded-sm bg-brand" aria-hidden="true" />
                  {stage}
                  <span className="font-mono text-sm font-normal text-muted">{items.length}</span>
                </h2>
                <ul className="mt-4 space-y-4">
                  {items.map((c) =>
                <li key={c.id} className="rounded-2xl border border-line bg-white p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-medium text-muted">{componentLabel(c.component)}</p>
                        <div className="flex items-center gap-2">
                          {c.source === 'local' ?
                      <select
                        value={c.status}
                        onChange={(e) => onStatusChange(c.id, e.target.value as CommentStatus)}
                        aria-label="Change status"
                        className={`rounded-md border px-2 py-1 text-sm font-medium ${statusStyle[c.status]} ${focusRing}`}>
                        
                              {(Object.keys(statusLabels) as CommentStatus[]).map((s) =>
                        <option key={s} value={s}>
                                  {statusLabels[s]}
                                </option>
                        )}
                            </select> :

                      <span className={`rounded-md border px-2 py-1 text-sm font-medium ${statusStyle[c.status]}`}>{statusLabels[c.status]}</span>
                      }
                          {c.source === 'local' &&
                      <button
                        type="button"
                        onClick={() => onRemove(c.id)}
                        aria-label="Delete comment"
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-alt hover:text-danger ${focusRing}`}>
                        
                              <Trash2Icon className="h-4 w-4" />
                            </button>
                      }
                        </div>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-ink">{c.comment}</p>
                      {c.response &&
                  <div className="mt-4 border-l-[3px] border-brand pl-4">
                          <p className="text-sm font-semibold text-ink">Team response</p>
                          <p className="mt-1 text-[15px] leading-relaxed text-muted">{c.response}</p>
                        </div>
                  }
                      {c.source === 'local' && <p className="mt-4 text-sm text-muted">Saved in this browser</p>}
                    </li>
                )}
                </ul>
              </section>);

        })}
        </div>
      }
    </div>);

}