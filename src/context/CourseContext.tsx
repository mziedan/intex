import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import db from '../services/db';
import { useToast } from '@/hooks/use-toast';
import { Course as CourseType, Category as CategoryType, Subcategory as SubcategoryType } from '@/lib/supabase';

export interface Course extends CourseType {
  category_name?: string;
  category_slug?: string;
  subcategory_name?: string;
  subcategory_slug?: string;
  sessions?: any[];
}

export interface Subcategory extends SubcategoryType {
  image?: string;
}

export interface Category extends CategoryType {
  subcategories: Subcategory[];
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
        
        const categoriesResult = await db.categories.getAll();
        setCategoryData(categoriesResult);
        
        const featuredResult = await db.courses.getFeatured();
        setFeaturedCourses(featuredResult);
        
        const coursesResult = await db.courses.getAll();
        setCourseData(coursesResult);
        
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
