
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Category, Subcategory } from '@/utils/mockData';

interface CategoryCardProps {
  item: Category | Subcategory;
  type: 'category' | 'subcategory';
  parentSlug?: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  item, 
  type, 
  parentSlug, 
  className 
}) => {
  const linkPath = type === 'category' 
    ? `/courses/${item.slug}` 
    : `/courses/${parentSlug}/${item.slug}`;

  return (
    <Link
      to={linkPath}
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 h-64",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-end p-6 z-20">
        <h3 className="text-xl md:text-2xl font-bold text-white">
          {item.name}
        </h3>
      </div>
      <div className="absolute inset-0 bg-brand-900/0 transition-colors duration-300 group-hover:bg-brand-900/10 z-5" />
    </Link>
  );
};

export default CategoryCard;
