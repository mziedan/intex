
-- Create database
CREATE DATABASE IF NOT EXISTS excellence_training
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE excellence_training;

-- Users table
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'editor', 'manager', 'admin') NOT NULL DEFAULT 'user',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL
);

-- Categories table
CREATE TABLE categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  image_url VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Subcategories table
CREATE TABLE subcategories (
  id VARCHAR(36) PRIMARY KEY,
  category_id VARCHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  image_url VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(category_id, slug),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Courses table
CREATE TABLE courses (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  short_description_ar TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2) NULL,
  duration VARCHAR(50) NOT NULL,
  level ENUM('beginner', 'intermediate', 'advanced', 'all') NOT NULL,
  category_id VARCHAR(36) NOT NULL,
  subcategory_id VARCHAR(36) NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  image_url VARCHAR(255) NULL,
  status ENUM('draft', 'active', 'archived') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(36) NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Sessions table
CREATE TABLE sessions (
  id VARCHAR(36) PRIMARY KEY,
  course_id VARCHAR(36) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  location_ar VARCHAR(255) NOT NULL,
  capacity INT NOT NULL,
  price DECIMAL(10, 2) NULL,
  status ENUM('upcoming', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Registrations table
CREATE TABLE registrations (
  id VARCHAR(36) PRIMARY KEY,
  session_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NULL,
  attendee_name VARCHAR(100) NOT NULL,
  attendee_email VARCHAR(255) NOT NULL,
  company VARCHAR(100) NULL,
  job_title VARCHAR(100) NULL,
  phone VARCHAR(50) NULL,
  payment_status ENUM('pending', 'paid', 'refunded', 'cancelled') NOT NULL DEFAULT 'pending',
  payment_amount DECIMAL(10, 2) NOT NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Slider Images table
CREATE TABLE slider_images (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NULL,
  subtitle VARCHAR(255) NULL,
  subtitle_ar VARCHAR(255) NULL,
  image_url VARCHAR(255) NOT NULL,
  button_text VARCHAR(50) NULL,
  button_text_ar VARCHAR(50) NULL,
  button_link VARCHAR(255) NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Partners table
CREATE TABLE partners (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255) NOT NULL,
  website_url VARCHAR(255) NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Company Info table
CREATE TABLE company_info (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  phone VARCHAR(50) NULL,
  email VARCHAR(255) NULL,
  address TEXT NULL,
  address_ar TEXT NULL,
  facebook VARCHAR(255) NULL,
  twitter VARCHAR(255) NULL,
  linkedin VARCHAR(255) NULL,
  instagram VARCHAR(255) NULL,
  map_location VARCHAR(255) NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Custom Pages table
CREATE TABLE custom_pages (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  image VARCHAR(255) NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- File Uploads table
CREATE TABLE uploads (
  id VARCHAR(36) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size INT NOT NULL,
  uploaded_by VARCHAR(36) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_subcategory ON courses(subcategory_id);
CREATE INDEX idx_subcategories_category ON subcategories(category_id);
CREATE INDEX idx_sessions_course ON sessions(course_id);
CREATE INDEX idx_sessions_dates ON sessions(start_date, end_date);
CREATE INDEX idx_registrations_session ON registrations(session_id);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_course_featured ON courses(featured);
CREATE INDEX idx_course_status ON courses(status);
CREATE INDEX idx_slider_active ON slider_images(is_active, display_order);
CREATE INDEX idx_partners_active ON partners(is_active, display_order);
CREATE INDEX idx_uploads_filename ON uploads(filename);

-- Insert initial admin user (password: admin123)
INSERT INTO users (id, name, email, password_hash, role)
VALUES (UUID(), 'Admin User', 'admin@example.com', '$2a$10$B8Vvtgy5M3XfJkPe2y8S1.2KfLQ7vWoMwUvSQ1uB13c0imZkwQHx6', 'admin');

-- Insert company info
INSERT INTO company_info (id, name, name_ar, description, description_ar)
VALUES (
  UUID(),
  'Excellence Training',
  'التميز للتدريب',
  'We provide professional training courses led by industry experts. Our programs are designed to enhance skills and advance careers.',
  'نقدم دورات تدريبية احترافية بقيادة خبراء في المجال. برامجنا مصممة لتعزيز المهارات وتطوير المسارات المهنية.'
);

-- Insert sample categories
INSERT INTO categories (id, name, name_ar, slug, image_url)
VALUES
  (UUID(), 'Business', 'الأعمال', 'business', '/images/categories/business.jpg'),
  (UUID(), 'Technology', 'التكنولوجيا', 'technology', '/images/categories/technology.jpg'),
  (UUID(), 'Marketing', 'التسويق', 'marketing', '/images/categories/marketing.jpg');

-- Get the IDs of the inserted categories
SET @business_id = (SELECT id FROM categories WHERE slug = 'business' LIMIT 1);
SET @technology_id = (SELECT id FROM categories WHERE slug = 'technology' LIMIT 1);
SET @marketing_id = (SELECT id FROM categories WHERE slug = 'marketing' LIMIT 1);

-- Insert sample subcategories
INSERT INTO subcategories (id, category_id, name, name_ar, slug)
VALUES
  (UUID(), @business_id, 'Management', 'الإدارة', 'management'),
  (UUID(), @business_id, 'Leadership', 'القيادة', 'leadership'),
  (UUID(), @technology_id, 'Web Development', 'تطوير الويب', 'web-development'),
  (UUID(), @technology_id, 'Data Science', 'علوم البيانات', 'data-science'),
  (UUID(), @marketing_id, 'Digital Marketing', 'التسويق الرقمي', 'digital-marketing'),
  (UUID(), @marketing_id, 'Social Media', 'وسائل التواصل الاجتماعي', 'social-media');

-- Get the IDs of the inserted subcategories
SET @management_id = (SELECT id FROM subcategories WHERE slug = 'management' AND category_id = @business_id LIMIT 1);
SET @leadership_id = (SELECT id FROM subcategories WHERE slug = 'leadership' AND category_id = @business_id LIMIT 1);
SET @webdev_id = (SELECT id FROM subcategories WHERE slug = 'web-development' AND category_id = @technology_id LIMIT 1);
SET @datascience_id = (SELECT id FROM subcategories WHERE slug = 'data-science' AND category_id = @technology_id LIMIT 1);
SET @digitalmarketing_id = (SELECT id FROM subcategories WHERE slug = 'digital-marketing' AND category_id = @marketing_id LIMIT 1);
SET @socialmedia_id = (SELECT id FROM subcategories WHERE slug = 'social-media' AND category_id = @marketing_id LIMIT 1);

-- Insert sample courses
INSERT INTO courses (id, title, title_ar, slug, short_description, short_description_ar, description, description_ar, price, discount_price, duration, level, category_id, subcategory_id, featured, image_url, status)
VALUES
  (
    UUID(), 
    'Leadership Essentials', 
    'أساسيات القيادة',
    'leadership-essentials',
    'Learn the core principles of effective leadership',
    'تعلم المبادئ الأساسية للقيادة الفعالة',
    'This comprehensive leadership course will teach you the skills needed to lead teams effectively in today\'s dynamic business environment.',
    'ستعلمك دورة القيادة الشاملة هذه المهارات اللازمة لقيادة الفرق بفعالية في بيئة الأعمال الديناميكية اليوم.',
    299.99,
    249.99,
    '4 weeks',
    'intermediate',
    @business_id,
    @leadership_id,
    TRUE,
    '/images/courses/leadership.jpg',
    'active'
  ),
  (
    UUID(), 
    'Python for Data Science', 
    'بايثون لعلوم البيانات',
    'python-data-science',
    'Master Python programming for data analysis',
    'إتقان برمجة بايثون لتحليل البيانات',
    'This course covers Python programming with a focus on data science applications.',
    'تغطي هذه الدورة برمجة Python مع التركيز على تطبيقات علوم البيانات.',
    349.99,
    299.99,
    '6 weeks',
    'beginner',
    @technology_id,
    @datascience_id,
    TRUE,
    '/images/courses/python.jpg',
    'active'
  );

-- Get the IDs of the inserted courses
SET @leadership_course_id = (SELECT id FROM courses WHERE slug = 'leadership-essentials' LIMIT 1);
SET @python_course_id = (SELECT id FROM courses WHERE slug = 'python-data-science' LIMIT 1);

-- Insert sample sessions
INSERT INTO sessions (id, course_id, start_date, end_date, location, location_ar, capacity, status)
VALUES
  (
    UUID(),
    @leadership_course_id,
    DATE_ADD(CURDATE(), INTERVAL 5 DAY),
    DATE_ADD(CURDATE(), INTERVAL 33 DAY),
    'Online',
    'عبر الإنترنت',
    30,
    'upcoming'
  ),
  (
    UUID(),
    @leadership_course_id,
    DATE_ADD(CURDATE(), INTERVAL 40 DAY),
    DATE_ADD(CURDATE(), INTERVAL 68 DAY),
    'Dubai, UAE',
    'دبي، الإمارات العربية المتحدة',
    15,
    'upcoming'
  ),
  (
    UUID(),
    @python_course_id,
    DATE_ADD(CURDATE(), INTERVAL 15 DAY),
    DATE_ADD(CURDATE(), INTERVAL 57 DAY),
    'Online',
    'عبر الإنترنت',
    25,
    'upcoming'
  );

-- Insert sample slider images
INSERT INTO slider_images (id, title, title_ar, subtitle, subtitle_ar, image_url, button_text, button_text_ar, button_link, display_order, is_active)
VALUES
  (
    UUID(),
    'Enhance Your Skills',
    'طور مهاراتك',
    'Join our world-class training programs to advance your career',
    'انضم إلى برامج التدريب العالمية لتطوير حياتك المهنية',
    '/images/slider/slide1.jpg',
    'Explore Courses',
    'استكشف الدورات',
    '/courses',
    1,
    TRUE
  ),
  (
    UUID(),
    'Learn from Experts',
    'تعلم من الخبراء',
    'Our instructors bring years of industry experience',
    'يجلب مدرسونا سنوات من الخبرة في المجال',
    '/images/slider/slide2.jpg',
    'Meet Our Team',
    'تعرف على فريقنا',
    '/about',
    2,
    TRUE
  );

-- Insert sample partners
INSERT INTO partners (id, name, logo_url, website_url, display_order, is_active)
VALUES
  (
    UUID(),
    'TechCorp',
    '/images/partners/techcorp.png',
    'https://example.com/techcorp',
    1,
    TRUE
  ),
  (
    UUID(),
    'Global Solutions',
    '/images/partners/globalsolutions.png',
    'https://example.com/globalsolutions',
    2,
    TRUE
  );
