import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import type { TeamMember } from '../../types/research';
import { focusRing } from '../../utils/styles';

interface MemberCardProps {
  member: TeamMember;
  onExplore: (id: string) => void;
}

export function MemberCard({ member, onExplore }: MemberCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
      <span className="h-1 w-10 rounded-full bg-brand" aria-hidden="true" />
      <p className="mt-6 font-mono text-sm text-muted">{member.studentId}</p>
      <h3 className="mt-1 text-xl font-semibold text-ink">{member.name}</h3>
      <p className="mt-5 text-base font-semibold text-ink">{member.cardTitle}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{member.cardSummary}</p>
      <div className="mt-auto pt-7">
        <button
          type="button"
          onClick={() => onExplore(member.id)}
          className={`inline-flex w-full items-center justify-between gap-2 rounded-lg border border-line-strong px-4 py-3 text-[15px] font-semibold text-ink transition-colors duration-150 ease-out hover:border-brand hover:bg-brand-soft ${focusRing}`}>
          
          Explore Contribution
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>);

}