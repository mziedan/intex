
// API service for database interactions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  
  // Make sure we're getting JSON back
  if (!contentType || !contentType.includes('application/json')) {
    console.error('Non-JSON response received:', contentType);
    throw new Error('API returned non-JSON response');
  }
  
  return response.json();
}

// Helper function to check if we're in development mode
const isDevelopment = () => {
  return import.meta.env.DEV || window.location.hostname === 'localhost';
};

// Helper function to make API requests
async function apiRequest<T>(
  endpoint: string, 
  method: string = 'GET', 
  data?: any
): Promise<T> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    // Add development header when in development mode
    if (isDevelopment()) {
      options.headers = {
        ...options.headers,
        'X-Development': 'true'
      };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return handleResponse(response);
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Service functions for different entities
export const categoriesService = {
  getAll: async () => {
    return apiRequest<any[]>('/categories');
  },
  
  getBySlug: async (slug: string) => {
    return apiRequest<any>(`/categories/${slug}`);
  }
};

export const coursesService = {
  getAll: async () => {
    return apiRequest<any[]>('/courses');
  },
  
  getFeatured: async () => {
    return apiRequest<any[]>('/courses/featured');
  },
  
  getBySlug: async (slug: string) => {
    return apiRequest<any>(`/courses/${slug}`);
  },
  
  getByCategory: async (categoryId: string) => {
    return apiRequest<any[]>(`/courses/category/${categoryId}`);
  },
  
  getBySubcategory: async (subcategoryId: string) => {
    return apiRequest<any[]>(`/courses/subcategory/${subcategoryId}`);
  },
  
  search: async (query: string) => {
    return apiRequest<any[]>(`/courses/search?q=${encodeURIComponent(query)}`);
  }
};

export const sessionsService = {
  getUpcomingByCourse: async (courseId: string) => {
    return apiRequest<any[]>(`/sessions/course/${courseId}/upcoming`);
  }
};

export const slidersService = {
  getActive: async () => {
    return apiRequest<any[]>('/sliders/active');
  }
};

export const partnersService = {
  getAll: async () => {
    return apiRequest<any[]>('/partners');
  }
};

export const companyInfoService = {
  get: async () => {
    return apiRequest<any>('/company-info');
  }
};

export const customPagesService = {
  getBySlug: async (slug: string) => {
    return apiRequest<any>(`/pages/${slug}`);
  },
  
  getAll: async () => {
    return apiRequest<any[]>('/pages');
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
