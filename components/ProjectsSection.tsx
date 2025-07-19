'use client';

import { useState } from 'react';
import { Plus, Trash2, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/resume';
import { EditableField } from './EditableField';

interface ProjectsSectionProps {
  projects: Project[];
  onUpdate: (projects: Project[]) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onUpdate
}) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Project Title',
      description: 'Project description highlighting key features and impact...',
      technologies: ['React', 'Node.js'],
      liveUrl: '',
      githubUrl: ''
    };
    onUpdate([newProject, ...projects]);
  };

  const updateProject = (index: number, updates: Partial<Project>) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], ...updates };
    onUpdate(updated);
  };

  const deleteProject = (index: number) => {
    onUpdate(projects.filter((_, i) => i !== index));
  };

  const addTechnology = (projectIndex: number) => {
    const updated = [...projects];
    updated[projectIndex].technologies.push('New Tech');
    onUpdate(updated);
  };

  const updateTechnology = (projectIndex: number, techIndex: number, value: string) => {
    const updated = [...projects];
    updated[projectIndex].technologies[techIndex] = value;
    onUpdate(updated);
  };

  const deleteTechnology = (projectIndex: number, techIndex: number) => {
    const updated = [...projects];
    updated[projectIndex].technologies = updated[projectIndex].technologies.filter((_, i) => i !== techIndex);
    onUpdate(updated);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">
          Portfolio Projects
        </h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <EditableField
                value={project.title}
                onSave={(value) => updateProject(index, { title: value })}
                placeholder="Project Title"
                className="text-xl font-semibold text-gray-800"
              />
              <button
                onClick={() => deleteProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mb-4">
              <EditableField
                value={project.description}
                onSave={(value) => updateProject(index, { description: value })}
                placeholder="Describe the project, its purpose, key features, and impact..."
                multiline
                className="text-gray-700 leading-relaxed"
              />
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="group relative">
                    <EditableField
                      value={tech}
                      onSave={(value) => updateTechnology(index, techIndex, value)}
                      placeholder="Technology"
                      className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    />
                    <button
                      onClick={() => deleteTechnology(index, techIndex)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addTechnology(index)}
                  className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 text-sm">
              <div className="flex-1">
                <label className="block text-gray-600 mb-1">Live URL:</label>
                <EditableField
                  value={project.liveUrl || ''}
                  onSave={(value) => updateProject(index, { liveUrl: value })}
                  placeholder="https://project-demo.com"
                  className="text-blue-600 w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 mb-1">GitHub URL:</label>
                <EditableField
                  value={project.githubUrl || ''}
                  onSave={(value) => updateProject(index, { githubUrl: value })}
                  placeholder="https://github.com/user/repo"
                  className="text-blue-600 w-full"
                />
              </div>
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="flex gap-3 mt-4 pt-4 border-t">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};