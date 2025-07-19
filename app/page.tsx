'use client';

import { useResumeData } from '@/hooks/useResumeData';
import { ContactSection } from '@/components/ContactSection';
import { SummarySection } from '@/components/SummarySection';
import { SkillsSection } from '@/components/SkillsSection';
import { EmploymentSection } from '@/components/EmploymentSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { LanguagesSection } from '@/components/LanguagesSection';
import { ExportButtons } from '@/components/ExportButtons';
import { Edit3, Save, Sparkles, Star } from 'lucide-react';

export default function ResumePage() {
  const {
    resumeData,
    isLoading,
    updateContactInfo,
    updateSummary,
    updateSkills,
    updateEmployment,
    updateProjects,
    updateLanguages
  } = useResumeData();

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mx-auto mb-6"></div>
          <p className="text-white/90 text-lg font-medium">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg-primary relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl floating"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300/20 rounded-full blur-lg floating" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-300/15 rounded-full blur-2xl floating" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-300/20 rounded-full blur-xl floating" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with editing info */}
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Interactive Resume Builder</h1>
                <p className="text-sm text-white/80">Click on any section to edit. Changes are saved automatically.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80 bg-white/10 px-3 py-2 rounded-full">
              <Save size={16} className="text-green-400" />
              <span>Auto-saved</span>
            </div>
          </div>
        </div>

        {/* Export buttons */}
        <div className="mb-8 animate-slide-up">
          <ExportButtons resumeData={resumeData} />
        </div>

        {/* Resume content */}
        <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <ContactSection 
            contactInfo={resumeData.contactInfo}
            onUpdate={updateContactInfo}
          />

          <div className="enhanced-card rounded-2xl p-8">
            <SummarySection 
              summary={resumeData.summary}
              onUpdate={updateSummary}
            />

            <SkillsSection 
              skills={resumeData.skills}
              onUpdate={updateSkills}
            />

            <EmploymentSection 
              employment={resumeData.employment}
              onUpdate={updateEmployment}
            />

            <ProjectsSection 
              projects={resumeData.projects}
              onUpdate={updateProjects}
            />

            <LanguagesSection 
              languages={resumeData.languages}
              onUpdate={updateLanguages}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 glass-card rounded-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="text-yellow-400" size={16} />
            <span className="text-white/90 font-medium">Built with Modern Tech</span>
            <Star className="text-yellow-400" size={16} />
          </div>
          <p className="text-white/70 text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS. 
            <span className="mx-2">•</span>
            All data is saved locally in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}