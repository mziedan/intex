
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import apiService from '@/services/apiService';
import { Category, Course, Session, Subcategory } from '@/lib/supabase';

// Re-export types
export type { Category, Course, Session, Subcategory };

// Context interface
interface CourseContextProps {
  categories: Category[];
  featuredCourses: Course[];
  loading: boolean;
  error: Error | null;
  getCourseBySlug: (slug: string) => Promise<Course>;
  getCategoryBySlug: (slug: string) => Promise<Category>;
  getSubcategoryBySlug: (categorySlug: string, subcategorySlug: string) => Promise<Subcategory>;
  getCoursesByCategory: (categoryId: string) => Promise<Course[]>;
  getCoursesBySubcategory: (subcategoryId: string) => Promise<Course[]>;
  searchCourses: (query: string) => Promise<Course[]>;
}

// Create context with default values
const CourseContext = createContext<CourseContextProps>({
  categories: [],
  featuredCourses: [],
  loading: true,
  error: null,
  getCourseBySlug: async () => ({} as Course),
  getCategoryBySlug: async () => ({} as Category),
  getSubcategoryBySlug: async () => ({} as Subcategory),
  getCoursesByCategory: async () => [],
  getCoursesBySubcategory: async () => [],
  searchCourses: async () => [],
});

// Provider component
export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        await fetchCategories();
        
        // Fetch featured courses
        await fetchFeaturedCourses();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching course data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      // Fetch categories using API service
      const categoriesData = await apiService.getCategories();
      
      // Ensure we always return an array
      const categoriesArray = Array.isArray(categoriesData) ? categoriesData : [];
      
      // Update state with fetched categories
      setCategories(categoriesArray as Category[]);
      return categoriesArray as Category[];
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
      throw err;
    }
  };

  // Fetch featured courses
  const fetchFeaturedCourses = async () => {
    try {
      // Fetch featured courses using API service
      const coursesData = await apiService.getFeaturedCourses();
      
      // Ensure we always return an array
      const coursesArray = Array.isArray(coursesData) ? coursesData : [];
      
      // Update state with fetched courses
      setFeaturedCourses(coursesArray as Course[]);
      return coursesArray as Course[];
    } catch (err) {
      console.error('Error fetching featured courses:', err);
      setFeaturedCourses([]);
      throw err;
    }
  };

  // Get course by slug
  const getCourseBySlug = async (slug: string): Promise<Course> => {
    try {
      // Fetch course using API service
      const courseData = await apiService.getCourseBySlug(slug);
      
      if (!courseData) {
        throw new Error(`Course with slug "${slug}" not found`);
      }
      
      // Also fetch sessions for this course if needed
      const courseDataObj = courseData as any;
      const sessionsData = await apiService.getUpcomingSessions(courseDataObj.id);
      
      // Combine course with sessions and category info
      const sessionArray = Array.isArray(sessionsData) ? sessionsData : [];
      
      const course = {
        ...courseDataObj,
        sessions: sessionArray
      } as Course;

      return course;
    } catch (err) {
      console.error(`Error fetching course by slug "${slug}":`, err);
      throw err;
    }
  };

  // Get category by slug
  const getCategoryBySlug = async (slug: string): Promise<Category> => {
    try {
      // Fetch category using API service
      const categoryData = await apiService.getCategoryBySlug(slug);
      
      if (!categoryData) {
        throw new Error(`Category with slug "${slug}" not found`);
      }
      
      // Cast to Category type with proper type assertion
      return categoryData as Category;
    } catch (err) {
      console.error(`Error fetching category by slug "${slug}":`, err);
      throw err;
    }
  };

  // Get subcategory by slug
  const getSubcategoryBySlug = async (categorySlug: string, subcategorySlug: string): Promise<Subcategory> => {
    try {
      // This is a placeholder - you would need to implement an API endpoint for this
      // or use a combination of existing endpoints
      
      // First get the category ID
      const categoryData = await apiService.getCategoryBySlug(categorySlug);
      
      if (!categoryData) {
        throw new Error(`Category with slug "${categorySlug}" not found`);
      }
      
      const categoryDataObj = categoryData as any;
      
      // Now we would need to get the subcategory
      // This is just a placeholder until you implement the API
      const mockSubcategory: Subcategory = {
        id: "subcategory-1",
        category_id: categoryDataObj.id,
        name: "Subcategory Name",
        slug: subcategorySlug,
      };
      
      return mockSubcategory;
    } catch (err) {
      console.error(`Error fetching subcategory by slug "${subcategorySlug}" in category "${categorySlug}":`, err);
      throw err;
    }
  };

  // Get courses by category
  const getCoursesByCategory = async (categoryId: string): Promise<Course[]> => {
    try {
      // Fetch courses by category using API service
      const coursesData = await apiService.getCoursesByCategory(categoryId);
      
      // Ensure we always return an array
      const coursesArray = Array.isArray(coursesData) ? coursesData : [];
      return coursesArray as Course[];
    } catch (err) {
      console.error(`Error fetching courses by category ID "${categoryId}":`, err);
      throw err;
    }
  };

  // Get courses by subcategory
  const getCoursesBySubcategory = async (subcategoryId: string): Promise<Course[]> => {
    try {
      // Fetch courses by subcategory using API service
      const coursesData = await apiService.getCoursesBySubcategory(subcategoryId);
      
      // Ensure we always return an array
      const coursesArray = Array.isArray(coursesData) ? coursesData : [];
      return coursesArray as Course[];
    } catch (err) {
      console.error(`Error fetching courses by subcategory ID "${subcategoryId}":`, err);
      throw err;
    }
  };

  // Search courses
  const searchCourses = async (query: string): Promise<Course[]> => {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      
      // Search courses using API service
      const coursesData = await apiService.searchCourses(query);
      
      // Ensure we always return an array
      const coursesArray = Array.isArray(coursesData) ? coursesData : [];
      return coursesArray as Course[];
    } catch (err) {
      console.error(`Error searching courses with query "${query}":`, err);
      throw err;
    }
  };

  // Create the context value object
  const contextValue = {
    categories,
    featuredCourses,
    loading,
    error,
    getCourseBySlug,
    getCategoryBySlug,
    getSubcategoryBySlug,
    getCoursesByCategory,
    getCoursesBySubcategory,
    searchCourses,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to use the course context
export const useCourses = () => useContext(CourseContext);
