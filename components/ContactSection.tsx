'use client';

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ContactInfo } from '@/types/resume';
import { EditableField } from './EditableField';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  onUpdate: (updates: Partial<ContactInfo>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  onUpdate
}) => {
  return (
    <div className="gradient-bg-primary text-white p-8 rounded-2xl shadow-enhanced relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-300/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <EditableField
            value={contactInfo.name}
            onSave={(value) => onUpdate({ name: value })}
            placeholder="Full Name"
            className="text-4xl font-bold mb-3 text-white bg-transparent border-white/30 gradient-text"
          />
          <EditableField
            value={contactInfo.title}
            onSave={(value) => onUpdate({ title: value })}
            placeholder="Job Title"
            className="text-xl text-white/90 bg-transparent border-white/30 font-medium"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Mail size={16} className="text-white" />
            </div>
            <EditableField
              value={contactInfo.email}
              onSave={(value) => onUpdate({ email: value })}
              placeholder="email@example.com"
              className="text-white bg-transparent border-white/30"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Phone size={16} className="text-white" />
            </div>
            <EditableField
              value={contactInfo.phone}
              onSave={(value) => onUpdate({ phone: value })}
              placeholder="Phone number"
              className="text-white bg-transparent border-white/30"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <MapPin size={16} className="text-white" />
            </div>
            <EditableField
              value={contactInfo.location}
              onSave={(value) => onUpdate({ location: value })}
              placeholder="Location"
              className="text-white bg-transparent border-white/30"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Globe size={16} className="text-white" />
            </div>
            <EditableField
              value={contactInfo.website}
              onSave={(value) => onUpdate({ website: value })}
              placeholder="Website URL"
              className="text-white bg-transparent border-white/30"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Linkedin size={16} className="text-white" />
            </div>
            <EditableField
              value={contactInfo.linkedin}
              onSave={(value) => onUpdate({ linkedin: value })}
              placeholder="LinkedIn URL"
              className="text-white bg-transparent border-white/30"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Github size={16} className="text-white" />
            </div>
            <EditableField
              value={contactInfo.github}
              onSave={(value) => onUpdate({ github: value })}
              placeholder="GitHub URL"
              className="text-white bg-transparent border-white/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};