
import { supabase, Category, Subcategory, Course, Session, Registration, Slider, Partner, CompanyInfo, CustomPage } from '@/lib/supabase';

// Helper function to check if we're in development mode
const isDevelopment = () => {
  return import.meta.env.DEV || window.location.hostname === 'localhost';
};

// Service functions for different entities
export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
    
    // Fetch subcategories for each category
    const categoriesWithSubcategories = await Promise.all(
      categories.map(async (category) => {
        const { data: subcategories, error: subError } = await supabase
          .from('subcategories')
          .select('*')
          .eq('category_id', category.id)
          .order('name');
        
        if (subError) {
          console.error('Error fetching subcategories:', subError);
          return { ...category, subcategories: [] };
        }
        
        return { ...category, subcategories: subcategories || [] };
      })
    );
    
    return categoriesWithSubcategories;
  },
  
  getBySlug: async (slug: string) => {
    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching category by slug:', error);
      throw error;
    }
    
    // Fetch subcategories for this category
    const { data: subcategories, error: subError } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', category.id)
      .order('name');
    
    if (subError) {
      console.error('Error fetching subcategories:', subError);
      return { ...category, subcategories: [] };
    }
    
    return { ...category, subcategories: subcategories || [] };
  }
};

export const coursesService = {
  getAll: async (): Promise<Course[]> => {
    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories:category_id (name, name_ar, slug),
        subcategories:subcategory_id (name, name_ar, slug)
      `)
      .eq('status', 'active')
      .order('featured', { ascending: false })
      .order('title');
    
    if (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
    
    // Format the courses to match the expected structure in the app
    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        // Fetch upcoming sessions for this course
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select(`
            *,
            registrations:registrations (count)
          `)
          .eq('course_id', course.id)
          .eq('status', 'upcoming')
          .gte('start_date', new Date().toISOString().split('T')[0])
          .order('start_date')
          .limit(3);
        
        if (sessionsError) {
          console.error('Error fetching sessions:', sessionsError);
          return {
            ...course,
            category_name: course.categories?.name || '',
            category_name_ar: course.categories?.name_ar || '',
            category_slug: course.categories?.slug || '',
            subcategory_name: course.subcategories?.name || '',
            subcategory_name_ar: course.subcategories?.name_ar || '',
            subcategory_slug: course.subcategories?.slug || '',
            sessions: []
          };
        }
        
        return {
          ...course,
          category_name: course.categories?.name || '',
          category_name_ar: course.categories?.name_ar || '',
          category_slug: course.categories?.slug || '',
          subcategory_name: course.subcategories?.name || '',
          subcategory_name_ar: course.subcategories?.name_ar || '',
          subcategory_slug: course.subcategories?.slug || '',
          sessions: sessions || []
        };
      })
    );
    
    return formattedCourses;
  },
  
  getFeatured: async (): Promise<Course[]> => {
    const { data: courses, error } = await supabase
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
    
    if (error) {
      console.error('Error fetching featured courses:', error);
      throw error;
    }
    
    // Format the courses to match the expected structure in the app
    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        // Fetch upcoming sessions for this course
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select(`
            *,
            registrations:registrations (count)
          `)
          .eq('course_id', course.id)
          .eq('status', 'upcoming')
          .gte('start_date', new Date().toISOString().split('T')[0])
          .order('start_date')
          .limit(1);
        
        if (sessionsError) {
          console.error('Error fetching sessions:', sessionsError);
          return {
            ...course,
            category_name: course.categories?.name || '',
            category_name_ar: course.categories?.name_ar || '',
            category_slug: course.categories?.slug || '',
            subcategory_name: course.subcategories?.name || '',
            subcategory_name_ar: course.subcategories?.name_ar || '',
            subcategory_slug: course.subcategories?.slug || '',
            sessions: []
          };
        }
        
        return {
          ...course,
          category_name: course.categories?.name || '',
          category_name_ar: course.categories?.name_ar || '',
          category_slug: course.categories?.slug || '',
          subcategory_name: course.subcategories?.name || '',
          subcategory_name_ar: course.subcategories?.name_ar || '',
          subcategory_slug: course.subcategories?.slug || '',
          sessions: sessions || []
        };
      })
    );
    
    return formattedCourses;
  },
  
  getBySlug: async (slug: string): Promise<Course> => {
    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories:category_id (name, name_ar, slug),
        subcategories:subcategory_id (name, name_ar, slug)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching course by slug:', error);
      throw error;
    }
    
    // Fetch upcoming sessions for this course
    const { data: sessions, error: sessionsError } = await supabase
      .from('sessions')
      .select(`
        *,
        registrations:registrations (count)
      `)
      .eq('course_id', course.id)
      .eq('status', 'upcoming')
      .gte('start_date', new Date().toISOString().split('T')[0])
      .order('start_date');
    
    if (sessionsError) {
      console.error('Error fetching sessions:', sessionsError);
      return {
        ...course,
        category_name: course.categories?.name || '',
        category_name_ar: course.categories?.name_ar || '',
        category_slug: course.categories?.slug || '',
        subcategory_name: course.subcategories?.name || '',
        subcategory_name_ar: course.subcategories?.name_ar || '',
        subcategory_slug: course.subcategories?.slug || '',
        sessions: []
      };
    }
    
    return {
      ...course,
      category_name: course.categories?.name || '',
      category_name_ar: course.categories?.name_ar || '',
      category_slug: course.categories?.slug || '',
      subcategory_name: course.subcategories?.name || '',
      subcategory_name_ar: course.subcategories?.name_ar || '',
      subcategory_slug: course.subcategories?.slug || '',
      sessions: sessions || []
    };
  },
  
  getByCategory: async (categoryId: string): Promise<Course[]> => {
    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories:category_id (name, name_ar, slug),
        subcategories:subcategory_id (name, name_ar, slug)
      `)
      .eq('category_id', categoryId)
      .eq('status', 'active')
      .order('title');
    
    if (error) {
      console.error('Error fetching courses by category:', error);
      throw error;
    }
    
    // Format the courses to match the expected structure in the app
    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        // Fetch upcoming sessions for this course
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select(`
            *,
            registrations:registrations (count)
          `)
          .eq('course_id', course.id)
          .eq('status', 'upcoming')
          .gte('start_date', new Date().toISOString().split('T')[0])
          .order('start_date')
          .limit(3);
        
        if (sessionsError) {
          console.error('Error fetching sessions:', sessionsError);
          return {
            ...course,
            category_name: course.categories?.name || '',
            category_name_ar: course.categories?.name_ar || '',
            category_slug: course.categories?.slug || '',
            subcategory_name: course.subcategories?.name || '',
            subcategory_name_ar: course.subcategories?.name_ar || '',
            subcategory_slug: course.subcategories?.slug || '',
            sessions: []
          };
        }
        
        return {
          ...course,
          category_name: course.categories?.name || '',
          category_name_ar: course.categories?.name_ar || '',
          category_slug: course.categories?.slug || '',
          subcategory_name: course.subcategories?.name || '',
          subcategory_name_ar: course.subcategories?.name_ar || '',
          subcategory_slug: course.subcategories?.slug || '',
          sessions: sessions || []
        };
      })
    );
    
    return formattedCourses;
  },
  
  getBySubcategory: async (subcategoryId: string): Promise<Course[]> => {
    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories:category_id (name, name_ar, slug),
        subcategories:subcategory_id (name, name_ar, slug)
      `)
      .eq('subcategory_id', subcategoryId)
      .eq('status', 'active')
      .order('title');
    
    if (error) {
      console.error('Error fetching courses by subcategory:', error);
      throw error;
    }
    
    // Format the courses to match the expected structure in the app
    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        // Fetch upcoming sessions for this course
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select(`
            *,
            registrations:registrations (count)
          `)
          .eq('course_id', course.id)
          .eq('status', 'upcoming')
          .gte('start_date', new Date().toISOString().split('T')[0])
          .order('start_date')
          .limit(3);
        
        if (sessionsError) {
          console.error('Error fetching sessions:', sessionsError);
          return {
            ...course,
            category_name: course.categories?.name || '',
            category_name_ar: course.categories?.name_ar || '',
            category_slug: course.categories?.slug || '',
            subcategory_name: course.subcategories?.name || '',
            subcategory_name_ar: course.subcategories?.name_ar || '',
            subcategory_slug: course.subcategories?.slug || '',
            sessions: []
          };
        }
        
        return {
          ...course,
          category_name: course.categories?.name || '',
          category_name_ar: course.categories?.name_ar || '',
          category_slug: course.categories?.slug || '',
          subcategory_name: course.subcategories?.name || '',
          subcategory_name_ar: course.subcategories?.name_ar || '',
          subcategory_slug: course.subcategories?.slug || '',
          sessions: sessions || []
        };
      })
    );
    
    return formattedCourses;
  },
  
  search: async (query: string): Promise<Course[]> => {
    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        *,
        categories:category_id (name, name_ar, slug),
        subcategories:subcategory_id (name, name_ar, slug)
      `)
      .eq('status', 'active')
      .or(`title.ilike.%${query}%,short_description.ilike.%${query}%,description.ilike.%${query}%`)
      .order('title');
    
    if (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
    
    // Format the courses to match the expected structure in the app
    const formattedCourses = await Promise.all(
      courses.map(async (course) => {
        // Fetch upcoming sessions for this course
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select(`
            *,
            registrations:registrations (count)
          `)
          .eq('course_id', course.id)
          .eq('status', 'upcoming')
          .gte('start_date', new Date().toISOString().split('T')[0])
          .order('start_date')
          .limit(3);
        
        if (sessionsError) {
          console.error('Error fetching sessions:', sessionsError);
          return {
            ...course,
            category_name: course.categories?.name || '',
            category_name_ar: course.categories?.name_ar || '',
            category_slug: course.categories?.slug || '',
            subcategory_name: course.subcategories?.name || '',
            subcategory_name_ar: course.subcategories?.name_ar || '',
            subcategory_slug: course.subcategories?.slug || '',
            sessions: []
          };
        }
        
        return {
          ...course,
          category_name: course.categories?.name || '',
          category_name_ar: course.categories?.name_ar || '',
          category_slug: course.categories?.slug || '',
          subcategory_name: course.subcategories?.name || '',
          subcategory_name_ar: course.subcategories?.name_ar || '',
          subcategory_slug: course.subcategories?.slug || '',
          sessions: sessions || []
        };
      })
    );
    
    return formattedCourses;
  }
};

export const sessionsService = {
  getUpcomingByCourse: async (courseId: string) => {
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select(`
        *,
        registrations:registrations (count)
      `)
      .eq('course_id', courseId)
      .eq('status', 'upcoming')
      .gte('start_date', new Date().toISOString().split('T')[0])
      .order('start_date');
    
    if (error) {
      console.error('Error fetching upcoming sessions:', error);
      throw error;
    }
    
    return sessions || [];
  }
};

export const slidersService = {
  getActive: async () => {
    const { data: sliders, error } = await supabase
      .from('sliders')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) {
      console.error('Error fetching active sliders:', error);
      throw error;
    }
    
    return sliders || [];
  }
};

export const partnersService = {
  getAll: async () => {
    const { data: partners, error } = await supabase
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
    
    return partners || [];
  }
};

export const companyInfoService = {
  get: async () => {
    const { data: companyInfo, error } = await supabase
      .from('company_info')
      .select('*')
      .single();
    
    if (error) {
      console.error('Error fetching company info:', error);
      throw error;
    }
    
    return companyInfo;
  }
};

export const customPagesService = {
  getBySlug: async (slug: string) => {
    const { data: page, error } = await supabase
      .from('custom_pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    
    if (error) {
      console.error('Error fetching custom page by slug:', error);
      throw error;
    }
    
    return page;
  },
  
  getAll: async () => {
    const { data: pages, error } = await supabase
      .from('custom_pages')
      .select('*')
      .eq('is_active', true)
      .order('title');
    
    if (error) {
      console.error('Error fetching custom pages:', error);
      throw error;
    }
    
    return pages || [];
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
