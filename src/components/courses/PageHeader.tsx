
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Category, Subcategory } from '@/context/CourseContext';
import ViewToggle from './ViewToggle';

interface PageHeaderProps {
  currentCategory: Category | null;
  currentSubcategory: Subcategory | null;
  viewMode?: 'grid' | 'list' | 'table';
  setViewMode?: (mode: 'grid' | 'list' | 'table') => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  currentCategory, 
  currentSubcategory,
  viewMode,
  setViewMode 
}) => {
  const renderPageTitle = () => {
    if (currentSubcategory) {
      return currentSubcategory.name;
    } else if (currentCategory) {
      return currentCategory.name;
    } else {
      return "All Training Categories";
    }
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold">{renderPageTitle()}</h1>
        
        {(currentCategory || currentSubcategory) && (
          <Link
            to={currentSubcategory ? `/courses/${currentCategory?.slug}` : "/courses"}
            className="inline-flex items-center text-sm font-medium text-brand-900 hover:text-brand-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to {currentSubcategory ? currentCategory?.name : "All Categories"}
          </Link>
        )}
      </div>
      
      {currentSubcategory && setViewMode && viewMode && (
        <div className="flex justify-between items-center">
          <p className="text-gray-600 max-w-3xl">
            Explore our {currentSubcategory.name} training programs designed to enhance your skills and knowledge.
          </p>
          
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
