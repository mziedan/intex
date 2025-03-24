
# Training Management System - Database Schema

This document outlines the proposed database schema for the Training Management System. The schema is designed to support all the functionality seen in the application's UI.

## Tables

### Users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user', -- 'user', 'editor', 'manager', 'admin'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);
```

### Categories

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Subcategories

```sql
CREATE TABLE subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_id, slug)
);
```

### Courses

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  duration VARCHAR(50) NOT NULL,
  level VARCHAR(20) NOT NULL, -- 'beginner', 'intermediate', 'advanced', 'all'
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  image_url VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- 'draft', 'active', 'archived'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);
```

### Sessions

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  capacity INTEGER NOT NULL,
  price DECIMAL(10, 2), -- Optional override of course price
  status VARCHAR(20) NOT NULL DEFAULT 'upcoming', -- 'upcoming', 'in_progress', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Registrations

```sql
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  attendee_name VARCHAR(100) NOT NULL,
  attendee_email VARCHAR(255) NOT NULL,
  company VARCHAR(100),
  job_title VARCHAR(100),
  phone VARCHAR(50),
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'refunded', 'cancelled'
  payment_amount DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Brochures

```sql
CREATE TABLE brochures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL, -- in bytes
  is_active BOOLEAN NOT NULL DEFAULT true,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by UUID REFERENCES users(id)
);
```

### Instructors

```sql
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  bio TEXT,
  photo_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Course Instructors (Junction Table)

```sql
CREATE TABLE course_instructors (
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, instructor_id)
);
```

### Session Instructors (Junction Table)

```sql
CREATE TABLE session_instructors (
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  PRIMARY KEY (session_id, instructor_id)
);
```

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_subcategory ON courses(subcategory_id);
CREATE INDEX idx_subcategories_category ON subcategories(category_id);
CREATE INDEX idx_sessions_course ON sessions(course_id);
CREATE INDEX idx_sessions_dates ON sessions(start_date, end_date);
CREATE INDEX idx_registrations_session ON registrations(session_id);
CREATE INDEX idx_registrations_user ON registrations(user_id);
```

## Usage Examples

### Retrieving all courses with their categories and subcategories

```sql
SELECT 
  c.id, c.title, c.slug, c.short_description, c.price, c.level,
  cat.name as category_name, cat.slug as category_slug,
  subcat.name as subcategory_name, subcat.slug as subcategory_slug
FROM courses c
JOIN categories cat ON c.category_id = cat.id
LEFT JOIN subcategories subcat ON c.subcategory_id = subcat.id
WHERE c.status = 'active'
ORDER BY c.featured DESC, c.title ASC;
```

### Retrieving all upcoming sessions for a course

```sql
SELECT 
  s.id, s.start_date, s.end_date, s.location, s.capacity,
  (SELECT COUNT(*) FROM registrations r WHERE r.session_id = s.id) as registration_count
FROM sessions s
WHERE s.course_id = [course_id]
  AND s.status = 'upcoming'
  AND s.start_date > CURRENT_DATE
ORDER BY s.start_date ASC;
```

### Retrieving courses by category or subcategory

```sql
-- By category
SELECT * FROM courses
WHERE category_id = [category_id]
  AND status = 'active';

-- By subcategory
SELECT * FROM courses
WHERE subcategory_id = [subcategory_id]
  AND status = 'active';
```

## Integration Notes

1. **Authentication**: Implement authentication using JWT tokens stored in HttpOnly cookies.

2. **Permissions**: 
   - Admin: Full access to all functions
   - Manager: Access to registrations, courses, and sessions management
   - Editor: Access to courses, categories, and brochure management
   - User: Registration for courses only

3. **File Storage**: Store user uploaded files (images, brochures) in a separate storage service and save their URLs/paths in the database.

4. **Search**: Implement full text search on course titles and descriptions.

5. **Security**: Implement appropriate data validation and sanitization to prevent SQL injection.

6. **Backups**: Set up regular database backups.

7. **Migrations**: Use a migration tool to manage database schema changes over time.
