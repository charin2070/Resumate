'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { SkillCategory, Skill } from '@/types/resume';
import { EditableField } from './EditableField';

interface SkillsSectionProps {
  skills: SkillCategory[];
  onUpdate: (skills: SkillCategory[]) => void;
}

const skillLevels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const getSkillColor = (level: Skill['level']) => {
  switch (level) {
    case 'Expert': return 'bg-gradient-to-r from-green-400 to-green-600';
    case 'Advanced': return 'bg-gradient-to-r from-blue-400 to-blue-600';
    case 'Intermediate': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    case 'Beginner': return 'bg-gradient-to-r from-gray-400 to-gray-600';
    default: return 'bg-gradient-to-r from-gray-400 to-gray-600';
  }
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onUpdate
}) => {
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory.trim()) {
      onUpdate([...skills, { category: newCategory.trim(), skills: [] }]);
      setNewCategory('');
    }
  };

  const updateCategory = (index: number, category: string) => {
    const updated = [...skills];
    updated[index].category = category;
    onUpdate(updated);
  };

  const deleteCategory = (index: number) => {
    onUpdate(skills.filter((_, i) => i !== index));
  };

  const addSkill = (categoryIndex: number) => {
    const updated = [...skills];
    updated[categoryIndex].skills.push({ name: 'New Skill', level: 'Intermediate' });
    onUpdate(updated);
  };

  const updateSkill = (categoryIndex: number, skillIndex: number, skill: Skill) => {
    const updated = [...skills];
    updated[categoryIndex].skills[skillIndex] = skill;
    onUpdate(updated);
  };

  const deleteSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...skills];
    updated[categoryIndex].skills = updated[categoryIndex].skills.filter((_, i) => i !== skillIndex);
    onUpdate(updated);
  };

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold gradient-text mb-6 pb-3 border-b-2 border-gradient-primary relative">
        Technical Skills
        <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-primary rounded-full"></div>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category, categoryIndex) => (
          <div key={categoryIndex} className="enhanced-card p-6 rounded-2xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <EditableField
                value={category.category}
                onSave={(value) => updateCategory(categoryIndex, value)}
                placeholder="Category Name"
                className="font-bold text-lg gradient-text"
              />
              <button
                onClick={() => deleteCategory(categoryIndex)}
                className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center justify-between group">
                  <div className="flex-1 mr-3">
                    <EditableField
                      value={skill.name}
                      onSave={(value) => updateSkill(categoryIndex, skillIndex, { ...skill, name: value })}
                      placeholder="Skill name"
                      className="text-sm"
                    />
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(categoryIndex, skillIndex, { ...skill, level: e.target.value as Skill['level'] })}
                      className="mt-1 text-xs border border-purple-200 rounded-lg px-2 py-1 w-full focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    >
                      {skillLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${getSkillColor(skill.level)} shadow-sm`}></div>
                    <button
                      onClick={() => deleteSkill(categoryIndex, skillIndex)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-1 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => addSkill(categoryIndex)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
              >
                <Plus size={16} />
                Add Skill
              </button>
            </div>
          </div>
        ))}
        
        <div className="glass-card p-6 rounded-2xl border-2 border-dashed border-purple-300 flex flex-col items-center justify-center hover:border-purple-400 transition-colors">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="mb-3 p-3 border border-purple-200 rounded-lg text-center focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
          />
          <button
            onClick={addCategory}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors font-medium"
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>
      </div>
    </section>
  );
};