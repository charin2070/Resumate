'use client';

import { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';

const defaultResumeData: ResumeData = {
  contactInfo: {
    name: 'Alex Thompson',
    title: 'Senior Full Stack Developer',
    email: 'alex.thompson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://alexthompson.dev',
    linkedin: 'https://linkedin.com/in/alexthompson',
    github: 'https://github.com/alexthompson'
  },
  summary: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Led multiple successful projects from conception to deployment, with a focus on user experience and performance optimization.',
  skills: [
    {
      category: 'Frontend',
      skills: [
        { name: 'React/Next.js', level: 'Expert' },
        { name: 'TypeScript', level: 'Expert' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'Vue.js', level: 'Advanced' }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 'Expert' },
        { name: 'Python', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'MongoDB', level: 'Intermediate' }
      ]
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'AWS', level: 'Advanced' },
        { name: 'Docker', level: 'Advanced' },
        { name: 'Git', level: 'Expert' },
        { name: 'Vercel', level: 'Advanced' }
      ]
    }
  ],
  employment: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Full Stack Developer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      responsibilities: [
        'Led development of a microservices architecture serving 100K+ users',
        'Mentored junior developers and conducted code reviews',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Collaborated with product team to define technical requirements'
      ]
    },
    {
      id: '2',
      company: 'StartupVenture',
      position: 'Full Stack Developer',
      startDate: '2019-03',
      endDate: '2021-12',
      current: false,
      responsibilities: [
        'Built responsive web applications using React and Node.js',
        'Designed and implemented RESTful APIs and database schemas',
        'Optimized application performance improving load times by 40%',
        'Participated in agile development processes and sprint planning'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/alexthompson/ecommerce'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, file attachments, and team communication features.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
      liveUrl: 'https://taskapp-demo.com',
      githubUrl: 'https://github.com/alexthompson/taskapp'
    }
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'Native' },
    { id: '2', name: 'Spanish', proficiency: 'Conversational' },
    { id: '3', name: 'French', proficiency: 'Basic' }
  ]
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        setResumeData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading resume data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveData = (data: ResumeData) => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(data));
      setResumeData(data);
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  };

  const updateContactInfo = (updates: Partial<ResumeData['contactInfo']>) => {
    const newData = {
      ...resumeData,
      contactInfo: { ...resumeData.contactInfo, ...updates }
    };
    saveData(newData);
  };

  const updateSummary = (summary: string) => {
    const newData = { ...resumeData, summary };
    saveData(newData);
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    const newData = { ...resumeData, skills };
    saveData(newData);
  };

  const updateEmployment = (employment: ResumeData['employment']) => {
    const newData = { ...resumeData, employment };
    saveData(newData);
  };

  const updateProjects = (projects: ResumeData['projects']) => {
    const newData = { ...resumeData, projects };
    saveData(newData);
  };

  const updateLanguages = (languages: ResumeData['languages']) => {
    const newData = { ...resumeData, languages };
    saveData(newData);
  };

  return {
    resumeData,
    isLoading,
    updateContactInfo,
    updateSummary,
    updateSkills,
    updateEmployment,
    updateProjects,
    updateLanguages
  };
};