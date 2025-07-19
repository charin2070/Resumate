'use client';

import { EditableField } from './EditableField';

interface SummarySectionProps {
  summary: string;
  onUpdate: (summary: string) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  onUpdate
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold gradient-text mb-6 pb-3 border-b-2 border-gradient-primary relative">
        Professional Summary
        <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-primary rounded-full"></div>
      </h2>
      <EditableField
        value={summary}
        onSave={onUpdate}
        multiline
        placeholder="Write a compelling professional summary that highlights your experience, skills, and career objectives..."
        className="text-gray-700 leading-relaxed text-lg"
      />
    </section>
  );
};