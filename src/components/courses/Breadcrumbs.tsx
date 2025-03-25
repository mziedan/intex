
import React from 'react';
import { Link } from 'react-router-dom';
import { Category, Subcategory } from '@/context/CourseContext';

interface BreadcrumbsProps {
  currentCategory: Category | null;
  currentSubcategory: Subcategory | null;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentCategory, currentSubcategory }) => {
  return (
    <div className="flex items-center text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-brand-900 transition-colors">Home</Link>
      <span className="mx-2">•</span>
      <Link to="/courses" className="hover:text-brand-900 transition-colors">Courses</Link>
      
      {currentCategory && (
        <>
          <span className="mx-2">•</span>
          <Link 
            to={`/courses/${currentCategory.slug}`}
            className={`hover:text-brand-900 transition-colors ${currentSubcategory ? '' : 'font-medium text-brand-900'}`}
          >
            {currentCategory.name}
          </Link>
        </>
      )}
      
      {currentSubcategory && (
        <>
          <span className="mx-2">•</span>
          <span className="font-medium text-brand-900">{currentSubcategory.name}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
