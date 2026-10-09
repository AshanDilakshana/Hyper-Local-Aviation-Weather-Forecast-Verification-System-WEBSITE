import React from 'react';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/SectionHeading';
import { PanelCommentForm } from '../components/panel/PanelCommentForm';
import { PanelCommentList } from '../components/panel/PanelCommentList';
import { usePanelComments } from '../hooks/usePanelComments';

export function PanelComments() {
  const { comments, add, remove, setStatus, storageError } = usePanelComments();

  return (
    <Section id="panel-comments" labelledBy="panel-heading" tone="alt" asPage>
      <SectionHeading
        as="h1"
        id="panel-heading"
        label="Panel Comments"
        title="Review Panel Feedback"
        intro="Comments from each review stage and how the team responded, grouped by stage." />
      

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <PanelCommentList comments={comments} onRemove={remove} onStatusChange={setStatus} />
        </div>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <PanelCommentForm onAdd={add} storageError={storageError} />
          </div>
        </div>
      </div>
    </Section>);

}