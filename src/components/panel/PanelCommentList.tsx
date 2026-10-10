import React, { useState } from 'react';
import { MessageSquareTextIcon, Trash2Icon } from 'lucide-react';
import { reviewStages, studentMeta } from '../../data/panelComments';
import type { CommentStatus, PanelComment } from '../../types/panel';
import { focusRing } from '../../utils/styles';

interface PanelCommentListProps {
  comments: PanelComment[];
  onRemove: (id: string) => void;
  onStatusChange: (id: string, status: CommentStatus) => void;
}



const stageBadgeStyle: Record<string, string> = {
  'Proposal':                'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Progress Presentation 1': 'bg-sky-50 text-sky-700 border-sky-200',
  'Progress Presentation 2': 'bg-violet-50 text-violet-700 border-violet-200',
  'Final Presentation':      'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const stageNumber: Record<string, string> = {
  'Proposal':                '01',
  'Progress Presentation 1': '02',
  'Progress Presentation 2': '03',
  'Final Presentation':      '04',
};

export function PanelCommentList({ comments, onRemove, onStatusChange }: PanelCommentListProps) {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const visible = comments.filter((c) => {
    return activeStage === null || c.stage === activeStage;
  });

  return (
    <div>
      {/* ── Stage tabs ─────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-line pb-5">
        <button
          type="button"
          aria-pressed={activeStage === null}
          onClick={() => setActiveStage(null)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out ${focusRing} ${
            activeStage === null
              ? 'border-brand bg-brand text-ink'
              : 'border-line bg-white text-muted hover:text-ink'
          }`}>
          All Stages
        </button>
        {reviewStages.map((stage) => {
          const stageCount = comments.filter((c) => c.stage === stage).length;
          if (stageCount === 0) return null;
          return (
            <button
              key={stage}
              type="button"
              aria-pressed={activeStage === stage}
              onClick={() => setActiveStage(activeStage === stage ? null : stage)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out ${focusRing} ${
                activeStage === stage
                  ? 'border-brand bg-brand text-ink'
                  : 'border-line bg-white text-muted hover:text-ink'
              }`}>
              <span className="mr-1 font-mono text-xs opacity-60">{stageNumber[stage]}</span>
              {stage}
              <span className="ml-1.5 font-mono text-xs opacity-70">{stageCount}</span>
            </button>
          );
        })}
      </div>



      {/* ── Empty state ─────────────────────────────────── */}
      {visible.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-white px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-ink">
            <MessageSquareTextIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-4 text-lg font-semibold text-ink">
            {comments.length === 0 ? 'No panel comments recorded yet' : 'No comments match this filter'}
          </p>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
            {comments.length === 0
              ? 'Record feedback as it is received using the form on the right.'
              : 'Adjust the stage or status filter to see comments.'}
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          {reviewStages.map((stage) => {
            const stageItems = visible.filter((c) => c.stage === stage);
            if (stageItems.length === 0) return null;

            return (
              <section key={stage} aria-label={stage}>
                {/* Stage header */}
                <div className="mb-5 flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-widest ${stageBadgeStyle[stage] ?? 'bg-alt text-muted border-line'}`}>
                    {stageNumber[stage]}
                  </span>
                  <h2 className="text-xl font-bold text-ink">{stage}</h2>
                  <span className="rounded-md bg-alt px-2 py-0.5 font-mono text-xs text-muted">
                    Panel IT-P10 · R26-IT-132
                  </span>
                  <span className="ml-auto font-mono text-sm text-muted">{stageItems.length} comment{stageItems.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Comment cards grouped by student */}
                <ul className="space-y-4">
                  {stageItems.map((c) => {
                    const meta = studentMeta[c.component];
                    return (
                      <li
                        key={c.id}
                        className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow duration-150 hover:shadow-md">
                        {/* Card top bar — student colour stripe */}
                        <div
                          className="flex items-center gap-3 border-b border-line px-5 py-3"
                          style={{ borderLeftWidth: 4, borderLeftColor: meta?.color ?? '#94a3b8' }}>
                          {/* Student ID badge */}
                          {meta && (
                            <span
                              className="rounded-md px-2.5 py-0.5 text-xs font-bold tracking-wider text-white"
                              style={{ backgroundColor: meta.color }}>
                              {meta.studentId}
                            </span>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-ink">{meta?.name ?? c.component}</p>
                            <p className="truncate text-xs text-muted">{meta?.role}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {c.source === 'local' && (
                              <button
                                type="button"
                                onClick={() => onRemove(c.id)}
                                aria-label="Delete comment"
                                className={`flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-alt hover:text-danger ${focusRing}`}>
                                <Trash2Icon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Comment body */}
                        <div className="px-5 py-4">
                          <p className="text-[15px] leading-relaxed text-ink">{c.comment}</p>

                          {/* Team response */}
                          {c.response && (
                            <div className="mt-4 rounded-lg border-l-[3px] border-brand bg-brand-soft px-4 py-3">
                              <p className="text-xs font-bold uppercase tracking-widest text-brand-ink">Team Response</p>
                              <p className="mt-1 text-[14px] leading-relaxed text-ink">{c.response}</p>
                            </div>
                          )}

                          {c.source === 'local' && (
                            <p className="mt-3 text-xs text-muted">Saved in this browser only</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}