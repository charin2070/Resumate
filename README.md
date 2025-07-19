# Resumate

A professional, interactive resume builder web application built with Next.js, TypeScript, and Tailwind CSS. Features inline editing, data persistence, and export functionality to PDF and Word formats.

## 🚀 Features

### Core Functionality
- **Interactive Resume Display**: Clean, professional layout with all essential resume sections
- **Inline Editing**: Click-to-edit functionality for all content with save/cancel options
- **Data Persistence**: Automatic saving to localStorage with data recovery on page refresh
- **Export Options**: Generate professional PDF and Word documents
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Resume Sections
- **Contact Information**: Name, title, email, phone, location, and social links
- **Professional Summary**: Editable summary with rich text support
- **Technical Skills**: Categorized skills with proficiency levels and visual indicators
- **Employment History**: Detailed work experience with responsibilities and achievements
- **Portfolio Projects**: Project showcase with technologies, descriptions, and links
- **Languages**: Language proficiency with visual level indicators

### Technical Features
- **TypeScript**: Strict typing throughout the application
- **Modern React**: Functional components with custom hooks
- **Tailwind CSS**: Professional styling with responsive design
- **Error Handling**: Graceful handling of localStorage and export errors
- **Performance**: Optimized re-renders and efficient state management

## 🛠️ Technology Stack

- **Framework**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks with custom hooks
- **Data Storage**: localStorage
- **PDF Export**: jsPDF
- **Word Export**: docx.js
- **Icons**: Lucide React
- **File Handling**: FileSaver.js

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd developer-resume
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Build and Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

The application is optimized for Vercel deployment with static export configuration.

## 🏗️ Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main resume page
├── components/
│   ├── ContactSection.tsx   # Contact information component
│   ├── EditableField.tsx    # Reusable inline editing component
│   ├── EmploymentSection.tsx # Work experience component
│   ├── ExportButtons.tsx    # PDF/Word export functionality
│   ├── LanguagesSection.tsx # Languages component
│   ├── ProjectsSection.tsx  # Portfolio projects component
│   ├── SkillsSection.tsx    # Technical skills component
│   └── SummarySection.tsx   # Professional summary component
├── hooks/
│   └── useResumeData.ts     # Custom hook for data management
├── types/
│   └── resume.ts            # TypeScript interfaces
└── lib/
    └── utils.ts             # Utility functions
```

## 🎨 Design Features

- **Professional Color Scheme**: Blue and gray palette with gradient backgrounds
- **Typography Hierarchy**: Clear visual hierarchy with proper font sizing
- **Responsive Layout**: Mobile-first design with breakpoint optimization
- **Micro-interactions**: Smooth hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual Feedback**: Loading states and success indicators

## 💾 Data Management

- **Local Storage**: All resume data is stored in browser localStorage
- **Auto-save**: Changes are automatically saved when editing
- **Default Data**: Sample resume data provided for new users
- **Data Recovery**: Resume data persists across browser sessions
- **Error Handling**: Graceful fallbacks for storage errors

## 📄 Export Functionality

### PDF Export
- Professional layout with proper formatting
- Maintains resume styling and structure
- Automatic page breaks for long content
- Uses jsPDF for client-side generation

### Word Export
- Compatible with Microsoft Word and similar applications
- Preserves formatting and structure
- Includes all resume sections and data
- Uses docx.js for document generation

## 🔧 Customization

### Adding New Sections
1. Define TypeScript interfaces in `types/resume.ts`
2. Update the `ResumeData` interface
3. Create a new component in `components/`
4. Add the section to the main page
5. Update the export functions to include the new data

### Styling Customization
- Modify `tailwind.config.ts` for theme changes
- Update component styles in individual component files
- Customize global styles in `app/globals.css`

## 🧪 Code Quality

- **TypeScript Strict Mode**: Enabled for type safety
- **ESLint**: Next.js default configuration
- **Component Architecture**: Modular, reusable components
- **Custom Hooks**: Separation of logic and presentation
- **Error Boundaries**: Proper error handling throughout the app

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- localStorage support required for data persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all TypeScript checks pass
5. Test the application thoroughly
6. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- Cloud storage integration
- Multiple resume templates
- Real-time collaboration
- Advanced export options
- Integration with job boards
- Resume analytics and tips

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS