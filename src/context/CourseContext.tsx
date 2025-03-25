
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import db from '../services/db';
import { useToast } from '@/hooks/use-toast';

export interface Course {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  discount_price?: number;
  duration: string;
  level: string;
  category_id: string;
  subcategory_id?: string;
  category_name?: string;
  category_slug?: string;
  subcategory_name?: string;
  subcategory_slug?: string;
  featured: boolean;
  image_url?: string;
  status: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

interface CourseContextProps {
  courses: Course[];
  categories: Category[];
  featuredCourses: Course[];
  loading: boolean;
  getCourseBySlug: (slug: string) => Promise<Course | undefined>;
  getCategoryBySlug: (slug: string) => Promise<Category | undefined>;
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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResult = await db.categories.getAll();
        setCategoryData(categoriesResult);
        
        // Fetch featured courses
        const featuredResult = await db.courses.getFeatured();
        setFeaturedCourses(featuredResult);
        
        // Fetch all courses
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

  const getCourseBySlug = async (slug: string) => {
    try {
      return await db.courses.getBySlug(slug);
    } catch (error) {
      console.error('Error fetching course by slug:', error);
      toast({
        title: "Error",
        description: "Failed to load course details. Please try again later.",
        variant: "destructive",
      });
      return undefined;
    }
  };

  const getCategoryBySlug = async (slug: string) => {
    try {
      return await db.categories.getBySlug(slug);
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      return undefined;
    }
  };

  const getSubcategoryBySlug = async (categorySlug: string, subcategorySlug: string) => {
    try {
      const category = await getCategoryBySlug(categorySlug);
      if (!category) return undefined;
      return category.subcategories.find(sub => sub.slug === subcategorySlug);
    } catch (error) {
      console.error('Error fetching subcategory by slug:', error);
      return undefined;
    }
  };

  const getCoursesByCategory = async (categoryId: string) => {
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

  const getCoursesBySubcategory = async (subcategoryId: string) => {
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

  const searchCourses = async (query: string) => {
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
