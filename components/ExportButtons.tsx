'use client';

import { useState } from 'react';
import { Download, FileText, FileDown, Sparkles } from 'lucide-react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, HeadingLevel, TextRun, Table, TableCell, TableRow } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '@/types/resume';

interface ExportButtonsProps {
  resumeData: ResumeData;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ resumeData }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF();
      const margin = 20;
      let yPosition = margin;

      // Helper function to add text with word wrapping
      const addText = (text: string, fontSize = 10, isBold = false) => {
        pdf.setFontSize(fontSize);
        if (isBold) {
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        
        const lines = pdf.splitTextToSize(text, 170);
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * (fontSize * 0.6) + 5;
        
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = margin;
        }
      };

      // Header
      addText(resumeData.contactInfo.name, 20, true);
      addText(resumeData.contactInfo.title, 14, true);
      addText(`${resumeData.contactInfo.email} | ${resumeData.contactInfo.phone}`, 10);
      addText(`${resumeData.contactInfo.location}`, 10);
      yPosition += 10;

      // Summary
      addText('PROFESSIONAL SUMMARY', 14, true);
      addText(resumeData.summary, 10);
      yPosition += 10;

      // Skills
      addText('TECHNICAL SKILLS', 14, true);
      resumeData.skills.forEach(category => {
        addText(`${category.category}:`, 11, true);
        const skillsText = category.skills.map(skill => `${skill.name} (${skill.level})`).join(', ');
        addText(skillsText, 10);
      });
      yPosition += 10;

      // Employment
      addText('EMPLOYMENT HISTORY', 14, true);
      resumeData.employment.forEach(job => {
        addText(`${job.position} at ${job.company}`, 11, true);
        const dateRange = job.current ? `${job.startDate} - Present` : `${job.startDate} - ${job.endDate}`;
        addText(dateRange, 10);
        job.responsibilities.forEach(resp => {
          addText(`• ${resp}`, 10);
        });
        yPosition += 5;
      });

      // Projects
      if (resumeData.projects.length > 0) {
        addText('PORTFOLIO PROJECTS', 14, true);
        resumeData.projects.forEach(project => {
          addText(project.title, 11, true);
          addText(project.description, 10);
          addText(`Technologies: ${project.technologies.join(', ')}`, 10);
          if (project.liveUrl) addText(`Live: ${project.liveUrl}`, 9);
          if (project.githubUrl) addText(`GitHub: ${project.githubUrl}`, 9);
          yPosition += 5;
        });
      }

      // Languages
      if (resumeData.languages.length > 0) {
        addText('LANGUAGES', 14, true);
        const languagesText = resumeData.languages.map(lang => `${lang.name} (${lang.proficiency})`).join(', ');
        addText(languagesText, 10);
      }

      pdf.save(`${resumeData.contactInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToWord = async () => {
    setIsExporting(true);
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Header
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.contactInfo.name,
                  bold: true,
                  size: 32,
                }),
              ],
              heading: HeadingLevel.TITLE,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.contactInfo.title,
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${resumeData.contactInfo.email} | ${resumeData.contactInfo.phone}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.contactInfo.location,
                }),
              ],
            }),
            new Paragraph({ text: '' }),

            // Summary
            new Paragraph({
              children: [
                new TextRun({
                  text: 'PROFESSIONAL SUMMARY',
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.summary,
                }),
              ],
            }),
            new Paragraph({ text: '' }),

            // Skills
            new Paragraph({
              children: [
                new TextRun({
                  text: 'TECHNICAL SKILLS',
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            ...resumeData.skills.flatMap(category => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${category.category}: `,
                    bold: true,
                  }),
                  new TextRun({
                    text: category.skills.map(skill => `${skill.name} (${skill.level})`).join(', '),
                  }),
                ],
              }),
            ]),
            new Paragraph({ text: '' }),

            // Employment
            new Paragraph({
              children: [
                new TextRun({
                  text: 'EMPLOYMENT HISTORY',
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            ...resumeData.employment.flatMap(job => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${job.position} at ${job.company}`,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: job.current ? `${job.startDate} - Present` : `${job.startDate} - ${job.endDate}`,
                  }),
                ],
              }),
              ...job.responsibilities.map(resp => 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `• ${resp}`,
                    }),
                  ],
                })
              ),
              new Paragraph({ text: '' }),
            ]),

            // Projects
            ...(resumeData.projects.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'PORTFOLIO PROJECTS',
                    bold: true,
                    size: 24,
                  }),
                ],
                heading: HeadingLevel.HEADING_1,
              }),
              ...resumeData.projects.flatMap(project => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: project.title,
                      bold: true,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: project.description,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Technologies: ${project.technologies.join(', ')}`,
                    }),
                  ],
                }),
                ...(project.liveUrl ? [new Paragraph({
                  children: [
                    new TextRun({
                      text: `Live: ${project.liveUrl}`,
                    }),
                  ],
                })] : []),
                ...(project.githubUrl ? [new Paragraph({
                  children: [
                    new TextRun({
                      text: `GitHub: ${project.githubUrl}`,
                    }),
                  ],
                })] : []),
                new Paragraph({ text: '' }),
              ]),
            ] : []),

            // Languages
            ...(resumeData.languages.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'LANGUAGES',
                    bold: true,
                    size: 24,
                  }),
                ],
                heading: HeadingLevel.HEADING_1,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: resumeData.languages.map(lang => `${lang.name} (${lang.proficiency})`).join(', '),
                  }),
                ],
              }),
            ] : []),
          ],
        }],
      });

      const buffer = await Packer.toBuffer(doc);
      saveAs(new Blob([buffer]), `${resumeData.contactInfo.name.replace(/\s+/g, '_')}_Resume.docx`);
    } catch (error) {
      console.error('Error generating Word document:', error);
      alert('Error generating Word document. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-secondary text-white rounded-2xl hover:shadow-enhanced-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 font-medium"
      >
        <div className="p-1 bg-white/20 rounded-lg">
          <FileText size={20} />
        </div>
        {isExporting ? 'Generating...' : 'Export PDF'}
        {!isExporting && <Sparkles size={16} className="opacity-70" />}
      </button>
      
      <button
        onClick={exportToWord}
        disabled={isExporting}
        className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-accent text-white rounded-2xl hover:shadow-enhanced-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 font-medium"
      >
        <div className="p-1 bg-white/20 rounded-lg">
          <FileDown size={20} />
        </div>
        {isExporting ? 'Generating...' : 'Export Word'}
        {!isExporting && <Sparkles size={16} className="opacity-70" />}
      </button>
    </div>
  );
};