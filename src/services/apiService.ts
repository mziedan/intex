
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; // Use the Firebase backend default if not specified

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  From https://github.com/mziedan/intex-firebase/tree/main/backend/routes we infer the following endpoint conventions:
  - Courses:    GET    /courses                 -> list all
                POST   /courses                 -> create
                GET    /courses/:id             -> get by id
                PUT    /courses/:id             -> update
                DELETE /courses/:id             -> delete

  - Categories: GET    /categories
                POST   /categories
                etc.

  - Sessions:   GET    /sessions
                etc.

  - Registration: POST /registrations

  - Sliders (Banners): GET /sliders

  - Partners:   GET /partners

  - Company Info: GET /company-info

  - Pages:      GET /pages/:slug

  * Adjust endpoints as necessary if spelling/casing differs on your backend!
*/

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
    // Assuming slug endpoint exists
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
    // Assuming featured endpoint exists
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
    // Check if your backend supports file/image uploading
    const res = await apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
};

export default apiService;
