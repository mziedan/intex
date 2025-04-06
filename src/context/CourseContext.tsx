
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, Course as SupabaseCourse, Category as SupabaseCategory, Subcategory as SupabaseSubcategory } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface Subcategory extends SupabaseSubcategory {
  image?: string;
}

export interface Category extends SupabaseCategory {
  subcategories: Subcategory[];
}

export interface Course extends SupabaseCourse {
  category_name?: string;
  category_slug?: string;
  subcategory_name?: string;
  subcategory_slug?: string;
  sessions?: any[];
}

interface CourseContextProps {
  courses: Course[];
  categories: Category[];
  featuredCourses: Course[];
  loading: boolean;
  getCourseBySlug: (slug: string) => Promise<Course>;
  getCategoryBySlug: (slug: string) => Promise<Category>;
  getSubcategoryBySlug: (categorySlug: string, subcategorySlug: string) => Promise<Subcategory | undefined>;
  getCoursesByCategory: (categoryId: string) => Promise<Course[]>;
  getCoursesBySubcategory: (subcategoryId: string) => Promise<Course[]>;
  searchCourses: (query: string) => Promise<Course[]>;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories from Supabase
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (categoriesError) throw categoriesError;
        
        // Fetch subcategories for each category
        const categoriesWithSubcategories = await Promise.all(
          categoriesData.map(async (category) => {
            const { data: subcategories, error: subError } = await supabase
              .from('subcategories')
              .select('*')
              .eq('category_id', category.id)
              .order('name');
            
            if (subError) {
              console.error('Error fetching subcategories:', subError);
              return { ...category, subcategories: [] };
            }
            
            return { ...category, subcategories: subcategories || [] } as Category;
          })
        );
        
        setCategoryData(categoriesWithSubcategories);
        
        // Fetch featured courses
        const { data: featuredData, error: featuredError } = await supabase
          .from('courses')
          .select(`
            *,
            categories:category_id (name, name_ar, slug),
            subcategories:subcategory_id (name, name_ar, slug)
          `)
          .eq('status', 'active')
          .eq('featured', true)
          .order('title')
          .limit(6);
        
        if (featuredError) throw featuredError;
        
        // Format courses to include sessions
        const formattedFeatured = await Promise.all(
          featuredData.map(async (course) => {
            const { data: sessions, error: sessionsError } = await supabase
              .from('sessions')
              .select('*')
              .eq('course_id', course.id)
              .eq('status', 'upcoming')
              .gte('start_date', new Date().toISOString().split('T')[0])
              .order('start_date')
              .limit(1);
            
            return {
              ...course,
              category_name: course.categories?.name || '',
              category_slug: course.categories?.slug || '',
              subcategory_name: course.subcategories?.name || '',
              subcategory_slug: course.subcategories?.slug || '',
              sessions: sessions || []
            } as Course;
          })
        );
        
        setFeaturedCourses(formattedFeatured);
        
        // Fetch all courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select(`
            *,
            categories:category_id (name, name_ar, slug),
            subcategories:subcategory_id (name, name_ar, slug)
          `)
          .eq('status', 'active')
          .order('featured', { ascending: false })
          .order('title');
        
        if (coursesError) throw coursesError;
        
        // Format courses to include sessions
        const formattedCourses = await Promise.all(
          coursesData.map(async (course) => {
            const { data: sessions, error: sessionsError } = await supabase
              .from('sessions')
              .select('*')
              .eq('course_id', course.id)
              .eq('status', 'upcoming')
              .gte('start_date', new Date().toISOString().split('T')[0])
              .order('start_date')
              .limit(3);
            
            return {
              ...course,
              category_name: course.categories?.name || '',
              category_slug: course.categories?.slug || '',
              subcategory_name: course.subcategories?.name || '',
              subcategory_slug: course.subcategories?.slug || '',
              sessions: sessions || []
            } as Course;
          })
        );
        
        setCourseData(formattedCourses);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        toast({
          title: "Error",
          description: "Failed to load course data. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const getCourseBySlug = async (slug: string): Promise<Course> => {
    try {
      return await db.courses.getBySlug(slug);
    } catch (error) {
      console.error('Error fetching course by slug:', error);
      toast({
        title: "Error",
        description: "Failed to load course details. Please try again later.",
        variant: "destructive",
      });
      return {
        id: '',
        title: 'Error loading course',
        slug: '',
        short_description: '',
        description: '',
        price: 0,
        duration: '',
        level: '',
        category_id: '',
        featured: false,
        status: 'draft',
        sessions: []
      };
    }
  };

  const getCategoryBySlug = async (slug: string): Promise<Category> => {
    try {
      return await db.categories.getBySlug(slug);
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      return {
        id: '',
        name: 'Error loading category',
        slug: '',
        subcategories: [],
        image: '/placeholder.svg'
      };
    }
  };

  const getSubcategoryBySlug = async (categorySlug: string, subcategorySlug: string): Promise<Subcategory | undefined> => {
    try {
      const category = await getCategoryBySlug(categorySlug);
      return category.subcategories.find(sub => sub.slug === subcategorySlug);
    } catch (error) {
      console.error('Error fetching subcategory by slug:', error);
      return undefined;
    }
  };

  const getCoursesByCategory = async (categoryId: string): Promise<Course[]> => {
    try {
      return await db.courses.getByCategory(categoryId);
    } catch (error) {
      console.error('Error fetching courses by category:', error);
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again later.",
        variant: "destructive",
      });
      return [];
    }
  };

  const getCoursesBySubcategory = async (subcategoryId: string): Promise<Course[]> => {
    try {
      return await db.courses.getBySubcategory(subcategoryId);
    } catch (error) {
      console.error('Error fetching courses by subcategory:', error);
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again later.",
        variant: "destructive",
      });
      return [];
    }
  };

  const searchCourses = async (query: string): Promise<Course[]> => {
    try {
      const lowerCaseQuery = query.toLowerCase().trim();
      if (!lowerCaseQuery) return [];
      
      return await db.courses.search(query);
    } catch (error) {
      console.error('Error searching courses:', error);
      toast({
        title: "Error",
        description: "Search failed. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses: courseData,
        categories: categoryData,
        featuredCourses,
        loading,
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
