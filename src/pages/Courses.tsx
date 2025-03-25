
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCourses, Category, Subcategory, Course } from '@/context/CourseContext';
import Breadcrumbs from '@/components/courses/Breadcrumbs';
import PageHeader from '@/components/courses/PageHeader';
import CategoriesGrid from '@/components/courses/CategoriesGrid';
import SubcategoriesGrid from '@/components/courses/SubcategoriesGrid';
import CoursesGridView from '@/components/courses/CoursesGridView';
import CourseListView from '@/components/courses/CourseListView';
import CoursesTableView from '@/components/courses/CoursesTableView';
import LoadingState from '@/components/courses/LoadingState';

const Courses = () => {
  const { categorySlug, subcategorySlug } = useParams<{ categorySlug?: string; subcategorySlug?: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    categories, 
    getCategoryBySlug, 
    getSubcategoryBySlug, 
    getCoursesByCategory,
    getCoursesBySubcategory
  } = useCourses();

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<Subcategory | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        if (categorySlug && subcategorySlug) {
          // Display courses for a specific subcategory
          const category = await getCategoryBySlug(categorySlug);
          const subcategory = await getSubcategoryBySlug(categorySlug, subcategorySlug);
          
          if (category && subcategory) {
            setCurrentCategory(category);
            setCurrentSubcategory(subcategory);
            const subcategoryCourses = await getCoursesBySubcategory(subcategory.id);
            setFilteredCourses(subcategoryCourses);
          }
        } else if (categorySlug) {
          // Display subcategories for a specific category
          const category = await getCategoryBySlug(categorySlug);
          
          if (category) {
            setCurrentCategory(category);
            setCurrentSubcategory(null);
            const categoryCourses = await getCoursesByCategory(category.id);
            setFilteredCourses(categoryCourses);
          }
        } else {
          // Display all categories
          setCurrentCategory(null);
          setCurrentSubcategory(null);
          setFilteredCourses([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [categorySlug, subcategorySlug, getCategoryBySlug, getSubcategoryBySlug, getCoursesByCategory, getCoursesBySubcategory]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (!currentCategory) {
      return <CategoriesGrid categories={categories} />;
    }

    if (currentCategory && !currentSubcategory) {
      return <SubcategoriesGrid category={currentCategory} />;
    }

    if (currentSubcategory) {
      if (filteredCourses.length === 0) {
        return (
          <div className="py-20 text-center">
            <p className="text-gray-600">No courses found in this category.</p>
          </div>
        );
      }

      switch (viewMode) {
        case 'grid':
          return <CoursesGridView courses={filteredCourses} />;
        case 'list':
          return <CourseListView courses={filteredCourses} />;
        case 'table':
          return <CoursesTableView 
                   courses={filteredCourses} 
                   subcategoryName={currentSubcategory.name} 
                 />;
        default:
          return <CoursesGridView courses={filteredCourses} />;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            currentCategory={currentCategory} 
            currentSubcategory={currentSubcategory} 
          />
          
          <PageHeader 
            currentCategory={currentCategory} 
            currentSubcategory={currentSubcategory}
            viewMode={viewMode}
            setViewMode={currentSubcategory ? setViewMode : undefined}
          />
          
          {renderContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
