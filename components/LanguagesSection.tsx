'use client';

import { useState } from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';
import { Language } from '@/types/resume';
import { EditableField } from './EditableField';

interface LanguagesSectionProps {
  languages: Language[];
  onUpdate: (languages: Language[]) => void;
}

const proficiencyLevels: Language['proficiency'][] = ['Basic', 'Conversational', 'Fluent', 'Native'];

const getProficiencyColor = (level: Language['proficiency']) => {
  switch (level) {
    case 'Native': return 'bg-green-500';
    case 'Fluent': return 'bg-blue-500';
    case 'Conversational': return 'bg-yellow-500';
    case 'Basic': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  onUpdate
}) => {
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: 'New Language',
      proficiency: 'Conversational'
    };
    onUpdate([...languages, newLanguage]);
  };

  const updateLanguage = (index: number, updates: Partial<Language>) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], ...updates };
    onUpdate(updated);
  };

  const deleteLanguage = (index: number) => {
    onUpdate(languages.filter((_, i) => i !== index));
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">
          Languages
        </h2>
        <button
          onClick={addLanguage}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Language
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((language, index) => (
          <div key={language.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-blue-600" />
                <EditableField
                  value={language.name}
                  onSave={(value) => updateLanguage(index, { name: value })}
                  placeholder="Language name"
                  className="font-medium text-gray-800"
                />
              </div>
              <button
                onClick={() => deleteLanguage(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <select
                value={language.proficiency}
                onChange={(e) => updateLanguage(index, { proficiency: e.target.value as Language['proficiency'] })}
                className="text-sm border rounded px-2 py-1 flex-1 mr-2"
              >
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className={`w-4 h-4 rounded-full ${getProficiencyColor(language.proficiency)}`}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};