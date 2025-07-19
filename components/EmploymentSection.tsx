'use client';

import { useState } from 'react';
import { Plus, Trash2, Calendar, Building } from 'lucide-react';
import { Employment } from '@/types/resume';
import { EditableField } from './EditableField';

interface EmploymentSectionProps {
  employment: Employment[];
  onUpdate: (employment: Employment[]) => void;
}

export const EmploymentSection: React.FC<EmploymentSectionProps> = ({
  employment,
  onUpdate
}) => {
  const addEmployment = () => {
    const newEmployment: Employment = {
      id: Date.now().toString(),
      company: 'Company Name',
      position: 'Job Title',
      startDate: '2023-01',
      endDate: '',
      current: true,
      responsibilities: ['Key responsibility or achievement']
    };
    onUpdate([newEmployment, ...employment]);
  };

  const updateEmployment = (index: number, updates: Partial<Employment>) => {
    const updated = [...employment];
    updated[index] = { ...updated[index], ...updates };
    onUpdate(updated);
  };

  const deleteEmployment = (index: number) => {
    onUpdate(employment.filter((_, i) => i !== index));
  };

  const addResponsibility = (employmentIndex: number) => {
    const updated = [...employment];
    updated[employmentIndex].responsibilities.push('New responsibility');
    onUpdate(updated);
  };

  const updateResponsibility = (employmentIndex: number, respIndex: number, value: string) => {
    const updated = [...employment];
    updated[employmentIndex].responsibilities[respIndex] = value;
    onUpdate(updated);
  };

  const deleteResponsibility = (employmentIndex: number, respIndex: number) => {
    const updated = [...employment];
    updated[employmentIndex].responsibilities = updated[employmentIndex].responsibilities.filter((_, i) => i !== respIndex);
    onUpdate(updated);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">
          Employment History
        </h2>
        <button
          onClick={addEmployment}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Position
        </button>
      </div>

      <div className="space-y-6">
        {employment.map((job, index) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Building size={20} className="text-blue-600" />
                  <EditableField
                    value={job.company}
                    onSave={(value) => updateEmployment(index, { company: value })}
                    placeholder="Company Name"
                    className="text-xl font-semibold text-gray-800"
                  />
                </div>
                <EditableField
                  value={job.position}
                  onSave={(value) => updateEmployment(index, { position: value })}
                  placeholder="Job Title"
                  className="text-lg text-blue-600 font-medium"
                />
              </div>
              <button
                onClick={() => deleteEmployment(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <Calendar size={16} />
              <div className="flex items-center gap-2">
                <input
                  type="month"
                  value={job.startDate}
                  onChange={(e) => updateEmployment(index, { startDate: e.target.value })}
                  className="border rounded px-2 py-1"
                />
                <span>to</span>
                {job.current ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Present</span>
                ) : (
                  <input
                    type="month"
                    value={job.endDate}
                    onChange={(e) => updateEmployment(index, { endDate: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                )}
                <label className="flex items-center gap-1 ml-2">
                  <input
                    type="checkbox"
                    checked={job.current}
                    onChange={(e) => updateEmployment(index, { current: e.target.checked, endDate: e.target.checked ? '' : job.endDate })}
                  />
                  <span className="text-xs">Current</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3">Key Responsibilities & Achievements:</h4>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex} className="flex items-start gap-2 group">
                    <span className="text-blue-600 mt-2">•</span>
                    <div className="flex-1">
                      <EditableField
                        value={resp}
                        onSave={(value) => updateResponsibility(index, respIndex, value)}
                        placeholder="Describe a key responsibility or achievement"
                        multiline
                        className="text-gray-700"
                      />
                    </div>
                    <button
                      onClick={() => deleteResponsibility(index, respIndex)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all mt-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => addResponsibility(index)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm mt-3"
              >
                <Plus size={16} />
                Add Responsibility
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};