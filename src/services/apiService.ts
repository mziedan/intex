
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; // Use the default if not specified

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// =========== API Service ================
const apiService = {
  // --- Categories ---
  getCategories: async () => {
    const res = await apiClient.get('/categories');
    return res.data || [];
  },
  getCategoryBySlug: async (slug: string) => {
    const res = await apiClient.get(`/categories/slug/${slug}`);
    return res.data || null;
  },

  // --- Courses ---
  getCourses: async () => {
    const res = await apiClient.get('/courses');
    return res.data || [];
  },
  getCourseBySlug: async (slug: string) => {
    const res = await apiClient.get(`/courses/slug/${slug}`);
    return res.data || null;
  },
  getCoursesByCategory: async (categoryId: string) => {
    const res = await apiClient.get(`/courses/category/${categoryId}`);
    return res.data || [];
  },
  getCoursesBySubcategory: async (subcategoryId: string) => {
    const res = await apiClient.get(`/courses/subcategory/${subcategoryId}`);
    return res.data || [];
  },
  getFeaturedCourses: async () => {
    const res = await apiClient.get('/courses/featured');
    return res.data || [];
  },
  searchCourses: async (query: string) => {
    const res = await apiClient.get(`/courses/search?q=${encodeURIComponent(query)}`);
    return res.data || [];
  },

  // --- Sessions ---
  getUpcomingSessions: async (courseId: string) => {
    const res = await apiClient.get(`/sessions/upcoming/${courseId}`);
    return res.data || [];
  },

  // --- Registration ---
  createRegistration: async (data: any) => {
    const res = await apiClient.post('/registrations', data);
    return res.data;
  },

  // --- Sliders ---
  getActiveSliders: async () => {
    const res = await apiClient.get('/sliders');
    return res.data || [];
  },

  // --- Partners ---
  getPartners: async () => {
    const res = await apiClient.get('/partners');
    return res.data || [];
  },

  // --- Company Info ---
  getCompanyInfo: async () => {
    const res = await apiClient.get('/company-info');
    return res.data || null;
  },

  // --- Custom Pages ---
  getCustomPage: async (slug: string) => {
    const res = await apiClient.get(`/pages/${slug}`);
    return res.data || null;
  },

  // --- Image Upload (if supported) ---
  uploadImage: async (formData: FormData) => {
    const res = await apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
};

export default apiService;
