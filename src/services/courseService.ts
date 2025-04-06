
import apiService from './apiService';
import { Course, Category, Subcategory, Session } from '@/lib/supabase';

// Service for courses
export const courseService = {
  // Get all courses
  getAll: async (): Promise<Course[]> => {
    try {
      const data = await apiService.getCourses();
      return data as Course[];
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  },
  
  // Get featured courses
  getFeatured: async (): Promise<Course[]> => {
    try {
      const data = await apiService.getFeaturedCourses();
      return data as Course[];
    } catch (error) {
      console.error('Error fetching featured courses:', error);
      return [];
    }
  },
  
  // Get course by slug
  getBySlug: async (slug: string): Promise<Course | null> => {
    try {
      const data = await apiService.getCourseBySlug(slug);
      return data as Course;
    } catch (error) {
      console.error(`Error fetching course with slug ${slug}:`, error);
      return null;
    }
  },
  
  // Get courses by category
  getByCategory: async (categoryId: string): Promise<Course[]> => {
    try {
      const data = await apiService.getCoursesByCategory(categoryId);
      return data as Course[];
    } catch (error) {
      console.error(`Error fetching courses for category ${categoryId}:`, error);
      return [];
    }
  },
  
  // Get courses by subcategory
  getBySubcategory: async (subcategoryId: string): Promise<Course[]> => {
    try {
      const data = await apiService.getCoursesBySubcategory(subcategoryId);
      return data as Course[];
    } catch (error) {
      console.error(`Error fetching courses for subcategory ${subcategoryId}:`, error);
      return [];
    }
  },
  
  // Search courses
  search: async (query: string): Promise<Course[]> => {
    try {
      const data = await apiService.searchCourses(query);
      return data as Course[];
    } catch (error) {
      console.error(`Error searching courses with query "${query}":`, error);
      return [];
    }
  }
};

// Service for categories
export const categoryService = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    try {
      const data = await apiService.getCategories();
      return data as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
  
  // Get category by slug
  getBySlug: async (slug: string): Promise<Category | null> => {
    try {
      const data = await apiService.getCategoryBySlug(slug);
      return data as Category;
    } catch (error) {
      console.error(`Error fetching category with slug ${slug}:`, error);
      return null;
    }
  }
};

// Service for sessions
export const sessionService = {
  // Get upcoming sessions for a course
  getUpcomingForCourse: async (courseId: string): Promise<Session[]> => {
    try {
      const data = await apiService.getUpcomingSessions(courseId);
      return data as Session[];
    } catch (error) {
      console.error(`Error fetching upcoming sessions for course ${courseId}:`, error);
      return [];
    }
  }
};

// Export all services
export default {
  courses: courseService,
  categories: categoryService,
  sessions: sessionService
};
