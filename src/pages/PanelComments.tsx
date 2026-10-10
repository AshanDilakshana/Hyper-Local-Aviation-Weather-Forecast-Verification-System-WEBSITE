import React from 'react';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/SectionHeading';
import { PanelCommentList } from '../components/panel/PanelCommentList';
import { usePanelComments } from '../hooks/usePanelComments';

export function PanelComments() {
  const { comments, remove, setStatus } = usePanelComments();

  return (
    <Section id="panel-comments" labelledBy="panel-heading" tone="alt" asPage>
      <SectionHeading
        as="h1"
        id="panel-heading"
        label="Panel Comments"
        title="Review Panel Feedback"
        intro="Official feedback from each review stage, grouped by presentation and student ID."
      />

      <div className="mt-10 max-w-5xl">
        <PanelCommentList comments={comments} onRemove={remove} onStatusChange={setStatus} />
      </div>
    </Section>
  );
}