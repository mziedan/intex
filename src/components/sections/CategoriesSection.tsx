
import React from 'react';
import CategoryCard from '@/components/ui/CategoryCard';
import { Category } from '@/context/CourseContext'; 

interface CategoriesSectionProps {
  categories: Category[];
  isVisible: boolean;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, isVisible }) => {
  return (
    <section 
      id="categories" 
      className="animate-on-scroll py-24 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Categories</h2>
          <div className="h-1 w-20 bg-brand-700 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of training programs designed to enhance your skills and advance your career.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className={`transition-all duration-700 delay-${index * 100} ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <CategoryCard 
                item={{
                  id: category.id,
                  name: category.name,
                  slug: category.slug,
                  image: category.image
                }} 
                type="category" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
