
// Instead of using Supabase directly, we'll use our apiService
import apiService from './apiService';
import { Category, Subcategory, Course, Session, Registration, Slider, Partner, CompanyInfo, CustomPage } from '@/lib/supabase';

// Helper function to check if we're in development mode
const isDevelopment = () => {
  return import.meta.env.DEV || window.location.hostname === 'localhost';
};

// Service functions for different entities
export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    try {
      const categories = await apiService.getCategories();
      return Array.isArray(categories) ? categories as Category[] : [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  
  getBySlug: async (slug: string): Promise<Category> => {
    try {
      const category = await apiService.getCategoryBySlug(slug);
      if (!category) {
        throw new Error(`Category with slug ${slug} not found`);
      }
      return category as Category;
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      throw error;
    }
  }
};

export const coursesService = {
  getAll: async (): Promise<Course[]> => {
    try {
      const courses = await apiService.getCourses();
      return Array.isArray(courses) ? courses as Course[] : [];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },
  
  getFeatured: async (): Promise<Course[]> => {
    try {
      const courses = await apiService.getFeaturedCourses();
      return Array.isArray(courses) ? courses as Course[] : [];
    } catch (error) {
      console.error('Error fetching featured courses:', error);
      throw error;
    }
  },
  
  getBySlug: async (slug: string): Promise<Course> => {
    try {
      const course = await apiService.getCourseBySlug(slug);
      if (!course) {
        throw new Error(`Course with slug ${slug} not found`);
      }
      
      // Fetch sessions for this course
      const courseObj = course as any;
      const sessions = await apiService.getUpcomingSessions(courseObj.id);
      const sessionArray = Array.isArray(sessions) ? sessions : [];
      
      return {
        ...course as Course,
        sessions: sessionArray as Session[]
      };
    } catch (error) {
      console.error('Error fetching course by slug:', error);
      throw error;
    }
  },
  
  getByCategory: async (categoryId: string): Promise<Course[]> => {
    try {
      const courses = await apiService.getCoursesByCategory(categoryId);
      return Array.isArray(courses) ? courses as Course[] : [];
    } catch (error) {
      console.error('Error fetching courses by category:', error);
      throw error;
    }
  },
  
  getBySubcategory: async (subcategoryId: string): Promise<Course[]> => {
    try {
      const courses = await apiService.getCoursesBySubcategory(subcategoryId);
      return Array.isArray(courses) ? courses as Course[] : [];
    } catch (error) {
      console.error('Error fetching courses by subcategory:', error);
      throw error;
    }
  },
  
  search: async (query: string): Promise<Course[]> => {
    try {
      const courses = await apiService.searchCourses(query);
      return Array.isArray(courses) ? courses as Course[] : [];
    } catch (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
  }
};

export const sessionsService = {
  getUpcomingByCourse: async (courseId: string): Promise<Session[]> => {
    try {
      const sessions = await apiService.getUpcomingSessions(courseId);
      return Array.isArray(sessions) ? sessions as Session[] : [];
    } catch (error) {
      console.error('Error fetching upcoming sessions:', error);
      throw error;
    }
  }
};

export const slidersService = {
  getActive: async (): Promise<Slider[]> => {
    try {
      const sliders = await apiService.getActiveSliders();
      return Array.isArray(sliders) ? sliders as Slider[] : [];
    } catch (error) {
      console.error('Error fetching active sliders:', error);
      throw error;
    }
  }
};

export const partnersService = {
  getAll: async (): Promise<Partner[]> => {
    try {
      const partners = await apiService.getPartners();
      return Array.isArray(partners) ? partners as Partner[] : [];
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  }
};

export const companyInfoService = {
  get: async (): Promise<CompanyInfo> => {
    try {
      const companyInfo = await apiService.getCompanyInfo();
      if (!companyInfo) {
        throw new Error('Company info not found');
      }
      return companyInfo as CompanyInfo;
    } catch (error) {
      console.error('Error fetching company info:', error);
      throw error;
    }
  }
};

export const customPagesService = {
  getBySlug: async (slug: string): Promise<CustomPage> => {
    try {
      const page = await apiService.getCustomPage(slug);
      if (!page) {
        throw new Error(`Page with slug ${slug} not found`);
      }
      return page as CustomPage;
    } catch (error) {
      console.error('Error fetching custom page by slug:', error);
      throw error;
    }
  }
};

export default {
  categories: categoriesService,
  courses: coursesService,
  sessions: sessionsService,
  sliders: slidersService,
  partners: partnersService,
  companyInfo: companyInfoService,
  customPages: customPagesService
};
