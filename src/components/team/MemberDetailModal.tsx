import React from 'react';
import type { TeamMember } from '../../types/research';
import { formatReported } from '../../utils/format';
import { MetricComparison } from '../charts/MetricComparison';
import { Modal } from '../Modal';

interface MemberDetailModalProps {
  member: TeamMember;
  onClose: () => void;
}

function Block({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <section>
      <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
        <span className="h-2 w-2 rounded-sm bg-brand" aria-hidden="true" />
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>);

}

function List({ items }: {items: string[];}) {
  return (
    <ul className="space-y-2">
      {items.map((i) =>
      <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted">
          <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-ink/50" aria-hidden="true" />
          {i}
        </li>
      )}
    </ul>);

}

export function MemberDetailModal({ member, onClose }: MemberDetailModalProps) {
  return (
    <Modal eyebrow={member.studentId} title={member.name} subtitle={member.cardTitle} onClose={onClose}>
      <div className="space-y-10">
        <Block title="Research objective">
          <p className="text-base leading-relaxed text-ink">{member.area}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{member.problem}</p>
        </Block>

        <div className="grid gap-10 sm:grid-cols-2">
          <Block title="Specific tasks">
            <List items={member.responsibilities} />
          </Block>
          <Block title="Features and data used">
            <List items={member.dataFeatures} />
          </Block>
        </div>

        <Block title="Models investigated">
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[480px] text-left text-[15px]">
              <thead className="bg-alt text-sm text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Model</th>
                  <th scope="col" className="px-4 py-3 font-medium">Type</th>
                  <th scope="col" className="px-4 py-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {member.models.map((m) =>
                <tr key={m.name}>
                    <td className="px-4 py-3 font-semibold text-ink">{m.name}</td>
                    <td className="px-4 py-3 text-muted">{m.type}</td>
                    <td className="px-4 py-3 text-muted">{m.role}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Block>

        <Block title="Alternative models and selection rationale">
          <p className="text-[15px] leading-relaxed text-muted">{member.rationale}</p>
        </Block>

        <div className="grid gap-10 sm:grid-cols-2">
          <Block title="Evaluation metrics">
            <List items={member.evaluation} />
          </Block>
          <Block title="Reported results">
            <dl className="divide-y divide-line rounded-xl border border-line">
              {member.findings.map((f) =>
              <div key={f.label} className="flex items-baseline justify-between gap-3 px-4 py-3">
                  <dt className="text-[15px] text-muted">{f.label}</dt>
                  <dd className="font-mono text-[15px] font-medium text-ink">{formatReported(f)}</dd>
                </div>
              )}
            </dl>
            <p className="mt-2 text-sm leading-relaxed text-muted">From the research paper. {member.findingsNote}</p>
          </Block>
        </div>

        {member.comparison &&
        <div className="rounded-xl border border-line bg-alt p-6">
            <MetricComparison spec={member.comparison} />
          </div>
        }

        <Block title="Contribution to the overall system">
          <p className="text-[15px] leading-relaxed text-muted">{member.integration}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {member.integrationPoints.map((p) =>
            <li key={p} className="rounded-md bg-brand-soft px-2.5 py-1 text-sm font-medium text-ink">
                {p}
              </li>
            )}
          </ul>
        </Block>
      </div>
    </Modal>);

}