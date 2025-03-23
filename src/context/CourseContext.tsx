
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { courses, categories, Course, Category } from '../utils/mockData';

interface CourseContextProps {
  courses: Course[];
  categories: Category[];
  featuredCourses: Course[];
  getCourseBySlug: (slug: string) => Course | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getSubcategoryBySlug: (categorySlug: string, subcategorySlug: string) => any | undefined;
  getCoursesByCategory: (categoryId: string) => Course[];
  getCoursesBySubcategory: (subcategoryId: string) => Course[];
  searchCourses: (query: string) => Course[];
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courseData] = useState<Course[]>(courses);
  const [categoryData] = useState<Category[]>(categories);

  const featuredCourses = courseData.filter(course => course.featured);

  const getCourseBySlug = (slug: string) => {
    return courseData.find(course => course.slug === slug);
  };

  const getCategoryBySlug = (slug: string) => {
    return categoryData.find(category => category.slug === slug);
  };

  const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string) => {
    const category = getCategoryBySlug(categorySlug);
    if (!category) return undefined;
    return category.subcategories.find(subcategory => subcategory.slug === subcategorySlug);
  };

  const getCoursesByCategory = (categoryId: string) => {
    return courseData.filter(course => course.category === categoryId);
  };

  const getCoursesBySubcategory = (subcategoryId: string) => {
    return courseData.filter(course => course.subcategory === subcategoryId);
  };

  const searchCourses = (query: string) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) return [];
    
    return courseData.filter(course => 
      course.title.toLowerCase().includes(lowerCaseQuery) || 
      course.shortDescription.toLowerCase().includes(lowerCaseQuery)
    );
  };

  return (
    <CourseContext.Provider
      value={{
        courses: courseData,
        categories: categoryData,
        featuredCourses,
        getCourseBySlug,
        getCategoryBySlug,
        getSubcategoryBySlug,
        getCoursesByCategory,
        getCoursesBySubcategory,
        searchCourses
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
