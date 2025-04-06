
import React from 'react';
import { Category } from '@/context/CourseContext';
import CategoryCard from '@/components/ui/CategoryCard';

interface CategoriesGridProps {
  categories: Category[];
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryCard 
          key={category.id} 
          item={{
            id: category.id,
            name: category.name,
            slug: category.slug,
            image: category.image || `/categories/${category.slug}.jpg`
          }}
          type="category"
        />
      ))}
    </div>
  );
};

export default CategoriesGrid;
