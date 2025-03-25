
import React from 'react';
import { Category } from '@/context/CourseContext';
import CategoryCard from '@/components/ui/CategoryCard';

interface SubcategoriesGridProps {
  category: Category;
}

const SubcategoriesGrid: React.FC<SubcategoriesGridProps> = ({ category }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.subcategories.map((subcategory) => (
        <CategoryCard 
          key={subcategory.id} 
          item={{
            ...subcategory,
            image: subcategory.image || '/placeholder.svg'
          }}
          type="subcategory"
          parentSlug={category.slug}
        />
      ))}
    </div>
  );
};

export default SubcategoriesGrid;
