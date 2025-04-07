
import axios from 'axios';
import { Category, Course, Session, Slider, Partner, CompanyInfo, CustomPage } from '@/lib/supabase';

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for handling common request tasks
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling common response tasks
apiClient.interceptors.response.use(
  (response) => {
    // Return the data property of the response
    return response.data || []; // Ensure we always return at least an empty array
  },
  (error) => {
    // Handle common errors here (like 401 unauthorized)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      
      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access');
      } else if (error.response.status === 404) {
        // Handle not found
        console.error('Resource not found');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Export the API service with specific endpoints
const apiService = {
  // Categories
  getCategories: (): Promise<Category[]> => apiClient.get('/categories'),
  getCategoryBySlug: (slug: string): Promise<Category | null> => apiClient.get(`/categories/${slug}`),
  
  // Courses
  getCourses: (): Promise<Course[]> => apiClient.get('/courses'),
  getFeaturedCourses: (): Promise<Course[]> => apiClient.get('/courses/featured'),
  getCourseBySlug: (slug: string): Promise<Course | null> => apiClient.get(`/courses/${slug}`),
  getCoursesByCategory: (categoryId: string): Promise<Course[]> => apiClient.get(`/courses/category/${categoryId}`),
  getCoursesBySubcategory: (subcategoryId: string): Promise<Course[]> => apiClient.get(`/courses/subcategory/${subcategoryId}`),
  searchCourses: (query: string): Promise<Course[]> => apiClient.get(`/courses/search?q=${query}`),
  
  // Sessions
  getUpcomingSessions: (courseId: string): Promise<Session[]> => apiClient.get(`/sessions/upcoming/${courseId}`),
  
  // Registrations
  createRegistration: (data: any): Promise<any> => apiClient.post('/registrations', data),
  
  // Sliders
  getActiveSliders: (): Promise<Slider[]> => apiClient.get('/sliders/active'),
  
  // Partners
  getPartners: (): Promise<Partner[]> => apiClient.get('/partners'),
  
  // Company Info
  getCompanyInfo: (): Promise<CompanyInfo | null> => apiClient.get('/company-info'),
  
  // Custom Pages
  getCustomPage: (slug: string): Promise<CustomPage | null> => apiClient.get(`/pages/${slug}`),
  
  // Image Upload
  uploadImage: (formData: FormData): Promise<{success: boolean; imageUrl: string}> => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return apiClient.post('/upload', formData, config);
  }
};

export default apiService;
