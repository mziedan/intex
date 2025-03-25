
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  user: import.meta.env.VITE_DB_USER || 'root',
  password: import.meta.env.VITE_DB_PASSWORD || '',
  database: import.meta.env.VITE_DB_NAME || 'excellence_training',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute queries
export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Service functions for different entities
export const categoriesService = {
  getAll: async () => {
    return query<any[]>(`
      SELECT c.*, 
        (SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', s.id, 
            'name', s.name, 
            'slug', s.slug
          )
        ) FROM subcategories s WHERE s.category_id = c.id) AS subcategories
      FROM categories c
      ORDER BY c.name ASC
    `);
  },
  
  getBySlug: async (slug: string) => {
    const categories = await query<any[]>(
      `SELECT c.*, 
        (SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', s.id, 
            'name', s.name, 
            'slug', s.slug
          )
        ) FROM subcategories s WHERE s.category_id = c.id) AS subcategories
      FROM categories c
      WHERE c.slug = ?`,
      [slug]
    );
    return categories[0];
  }
};

export const coursesService = {
  getAll: async () => {
    return query<any[]>(`
      SELECT c.*, cat.name as category_name, cat.slug as category_slug,
        sub.name as subcategory_name, sub.slug as subcategory_slug
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN subcategories sub ON c.subcategory_id = sub.id
      WHERE c.status = 'active'
      ORDER BY c.featured DESC, c.title ASC
    `);
  },
  
  getFeatured: async () => {
    return query<any[]>(`
      SELECT c.*, cat.name as category_name, cat.slug as category_slug
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.featured = true AND c.status = 'active'
      ORDER BY c.title ASC
      LIMIT 6
    `);
  },
  
  getBySlug: async (slug: string) => {
    const courses = await query<any[]>(
      `SELECT c.*, cat.name as category_name, cat.slug as category_slug,
        sub.name as subcategory_name, sub.slug as subcategory_slug
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN subcategories sub ON c.subcategory_id = sub.id
      WHERE c.slug = ? AND c.status = 'active'`,
      [slug]
    );
    return courses[0];
  },
  
  getByCategory: async (categoryId: string) => {
    return query<any[]>(
      `SELECT c.*, cat.name as category_name, cat.slug as category_slug
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.category_id = ? AND c.status = 'active'
      ORDER BY c.featured DESC, c.title ASC`,
      [categoryId]
    );
  },
  
  getBySubcategory: async (subcategoryId: string) => {
    return query<any[]>(
      `SELECT c.*, cat.name as category_name, cat.slug as category_slug,
        sub.name as subcategory_name, sub.slug as subcategory_slug
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN subcategories sub ON c.subcategory_id = sub.id
      WHERE c.subcategory_id = ? AND c.status = 'active'
      ORDER BY c.featured DESC, c.title ASC`,
      [subcategoryId]
    );
  },
  
  search: async (query: string) => {
    const searchQuery = `%${query}%`;
    return await query<any[]>(
      `SELECT c.*, cat.name as category_name, cat.slug as category_slug
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE (c.title LIKE ? OR c.short_description LIKE ? OR c.description LIKE ?)
        AND c.status = 'active'
      ORDER BY c.featured DESC, c.title ASC`,
      [searchQuery, searchQuery, searchQuery]
    );
  }
};

export const sessionsService = {
  getUpcomingByCourse: async (courseId: string) => {
    return query<any[]>(
      `SELECT s.*, 
        (SELECT COUNT(*) FROM registrations r WHERE r.session_id = s.id) as registration_count
      FROM sessions s
      WHERE s.course_id = ? AND s.status = 'upcoming' AND s.start_date > CURRENT_DATE
      ORDER BY s.start_date ASC`,
      [courseId]
    );
  }
};

export const slidersService = {
  getActive: async () => {
    return query<any[]>(`
      SELECT * FROM slider_images
      WHERE is_active = true
      ORDER BY display_order ASC
    `);
  }
};

export const partnersService = {
  getAll: async () => {
    return query<any[]>(`
      SELECT * FROM partners
      WHERE is_active = true
      ORDER BY display_order ASC
    `);
  }
};

export const companyInfoService = {
  get: async () => {
    const info = await query<any[]>(`SELECT * FROM company_info LIMIT 1`);
    return info[0] || {};
  }
};

export const customPagesService = {
  getBySlug: async (slug: string) => {
    const pages = await query<any[]>(
      `SELECT * FROM custom_pages WHERE slug = ? AND published = true`,
      [slug]
    );
    return pages[0];
  },
  
  getAll: async () => {
    return query<any[]>(`
      SELECT id, title, slug, image, created, published 
      FROM custom_pages
      ORDER BY title ASC
    `);
  }
};

export default {
  query,
  categories: categoriesService,
  courses: coursesService,
  sessions: sessionsService,
  sliders: slidersService,
  partners: partnersService,
  companyInfo: companyInfoService,
  customPages: customPagesService
};
