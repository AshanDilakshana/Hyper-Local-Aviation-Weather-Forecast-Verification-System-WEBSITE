import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { teamMembers } from '../../data/team';
import { Section } from '../layout/Section';
import { SectionHeading } from '../SectionHeading';
import { MemberCard } from './MemberCard';
import { MemberDetailModal } from './MemberDetailModal';
import { useScreenInit } from '../../useScreenInit.js';

export function TeamSection({ asPage = false }: {asPage?: boolean;}) {
  const screenInit = useScreenInit() as {memberId?: string;};
  const [openId, setOpenId] = useState<string | null>(screenInit.memberId ?? null);
  const openMember = teamMembers.find((m) => m.id === openId) ?? null;

  return (
    <Section id="team" labelledBy="team-heading" tone="alt" asPage={asPage}>
      <SectionHeading
        as={asPage ? 'h1' : 'h2'}
        id="team-heading"
        label="Team"
        title="Four Research Contributions. One Integrated System."
        intro="Explore how each researcher contributes to a different technical component of the overall aviation weather forecasting system." />
      

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((m) =>
        <li key={m.id}>
            <MemberCard member={m} onExplore={setOpenId} />
          </li>
        )}
      </ul>

      <AnimatePresence>
        {openMember && <MemberDetailModal key={openMember.id} member={openMember} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </Section>);

}