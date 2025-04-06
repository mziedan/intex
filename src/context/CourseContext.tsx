
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

// Define types
export interface Category {
  id: string;
  name: string;
  name_ar?: string;
  slug: string;
  image?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  name_ar?: string;
  slug: string;
  image?: string;
}

export interface Course {
  id: string;
  title: string;
  title_ar?: string;
  slug: string;
  short_description: string;
  short_description_ar?: string;
  description: string;
  description_ar?: string;
  price: number;
  discount_price?: number;
  duration: string;
  level: string;
  featured: boolean;
  status: string;
  image_url?: string;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  subcategory_id?: string;
  created_at?: string;
  updated_at?: string;
  sessions?: Session[];
}

export interface Session {
  id: string;
  course_id: string;
  start_date: string;
  end_date: string;
  location: string;
  location_ar?: string;
  capacity: number;
  price?: number;
  status: string;
}

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
      // Fetch categories from Supabase
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch subcategories for each category
      const categoriesWithSubcategories = await Promise.all(
        (categoriesData || []).map(async (category) => {
          const { data: subcategories, error: subcategoriesError } = await supabase
            .from('subcategories')
            .select('*')
            .eq('category_id', category.id)
            .order('name');

          if (subcategoriesError) throw subcategoriesError;

          return {
            ...category,
            subcategories: subcategories || []
          };
        })
      );

      // Update state with fetched categories
      setCategories(categoriesWithSubcategories);
      return categoriesWithSubcategories;
    } catch (err) {
      console.error('Error fetching categories:', err);
      throw err;
    }
  };

  // Fetch featured courses
  const fetchFeaturedCourses = async () => {
    try {
      // Fetch featured courses from Supabase
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          categories(name, slug)
        `)
        .eq('featured', true)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // Format courses with category name and slug
      const formattedCourses = (coursesData || []).map(course => ({
        ...course,
        category_name: course.categories?.name,
        category_slug: course.categories?.slug
      }));

      // Update state with fetched courses
      setFeaturedCourses(formattedCourses);
      return formattedCourses;
    } catch (err) {
      console.error('Error fetching featured courses:', err);
      throw err;
    }
  };

  // Get course by slug
  const getCourseBySlug = async (slug: string): Promise<Course> => {
    try {
      // Fetch course from Supabase
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          *,
          categories(name, slug)
        `)
        .eq('slug', slug)
        .single();

      if (courseError) throw courseError;
      if (!courseData) throw new Error(`Course with slug "${slug}" not found`);

      // Fetch sessions for this course
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('sessions')
        .select('*')
        .eq('course_id', courseData.id)
        .gte('end_date', new Date().toISOString())
        .order('start_date');

      if (sessionsError) throw sessionsError;

      // Combine course with sessions and category info
      const course: Course = {
        ...courseData,
        category_name: courseData.categories?.name,
        category_slug: courseData.categories?.slug,
        sessions: sessionsData || []
      };

      return course;
    } catch (err) {
      console.error(`Error fetching course by slug "${slug}":`, err);
      throw err;
    }
  };

  // Get category by slug
  const getCategoryBySlug = async (slug: string): Promise<Category> => {
    try {
      // Fetch category from Supabase
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (categoryError) throw categoryError;
      if (!categoryData) throw new Error(`Category with slug "${slug}" not found`);

      // Fetch subcategories for this category
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryData.id)
        .order('name');

      if (subcategoriesError) throw subcategoriesError;

      // Combine category with subcategories
      const category: Category = {
        ...categoryData,
        subcategories: subcategoriesData || []
      };

      return category;
    } catch (err) {
      console.error(`Error fetching category by slug "${slug}":`, err);
      throw err;
    }
  };

  // Get subcategory by slug
  const getSubcategoryBySlug = async (categorySlug: string, subcategorySlug: string): Promise<Subcategory> => {
    try {
      // First get the category ID
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (categoryError) throw categoryError;
      if (!categoryData) throw new Error(`Category with slug "${categorySlug}" not found`);

      // Now get the subcategory
      const { data: subcategoryData, error: subcategoryError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryData.id)
        .eq('slug', subcategorySlug)
        .single();

      if (subcategoryError) throw subcategoryError;
      if (!subcategoryData) throw new Error(`Subcategory with slug "${subcategorySlug}" not found in category "${categorySlug}"`);

      return subcategoryData;
    } catch (err) {
      console.error(`Error fetching subcategory by slug "${subcategorySlug}" in category "${categorySlug}":`, err);
      throw err;
    }
  };

  // Get courses by category
  const getCoursesByCategory = async (categoryId: string): Promise<Course[]> => {
    try {
      // Fetch courses from Supabase
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          categories(name, slug)
        `)
        .eq('category_id', categoryId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // Format courses with category name and slug
      const formattedCourses = (coursesData || []).map(course => ({
        ...course,
        category_name: course.categories?.name,
        category_slug: course.categories?.slug
      }));

      return formattedCourses;
    } catch (err) {
      console.error(`Error fetching courses by category ID "${categoryId}":`, err);
      throw err;
    }
  };

  // Get courses by subcategory
  const getCoursesBySubcategory = async (subcategoryId: string): Promise<Course[]> => {
    try {
      // Fetch courses from Supabase
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          categories(name, slug)
        `)
        .eq('subcategory_id', subcategoryId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // Format courses with category name and slug
      const formattedCourses = (coursesData || []).map(course => ({
        ...course,
        category_name: course.categories?.name,
        category_slug: course.categories?.slug
      }));

      return formattedCourses;
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

      // Search courses in Supabase
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          categories(name, slug)
        `)
        .or(`title.ilike.%${query}%,short_description.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // Format courses with category name and slug
      const formattedCourses = (coursesData || []).map(course => ({
        ...course,
        category_name: course.categories?.name,
        category_slug: course.categories?.slug
      }));

      return formattedCourses;
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
