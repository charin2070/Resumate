'use client';

import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { EditableFieldProps } from '@/types/resume';
import { cn } from '@/lib/utils';

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  multiline = false,
  placeholder = 'Enter text...',
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className={cn(
              'w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none backdrop-blur-sm bg-white/90',
              className
            )}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className={cn(
              'w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm bg-white/90',
              className
            )}
            autoFocus
          />
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Check size={14} />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <X size={14} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group cursor-pointer relative hover:bg-purple-50 rounded-xl p-3 -m-3 transition-all duration-200 hover:shadow-sm',
        className
      )}
      onClick={() => setIsEditing(true)}
    >
      <span className={cn(value ? '' : 'text-gray-400 italic')}>
        {value || placeholder}
      </span>
      <Edit2 
        size={14} 
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-purple-600 bg-white rounded-full p-1 shadow-sm" 
      />
    </div>
  );
};