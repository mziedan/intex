
# API Documentation

The frontend communicates with a PHP/MySQL backend. Below is a detailed documentation of the REST API endpoints used by this website, their formats, and usage examples.

---
## Base URL

All API endpoints are prefixed by the base URL:

    http://localhost:5000/api

If you deploy elsewhere, update the base URL accordingly in your environment variables.

---

## Authentication

> NOTE: Currently, the API does not require authentication for most endpoints. Future versions may implement authentication for write operations.

---

## Endpoints

### 1. Categories

- **GET `/categories`**  
  Returns all categories.

  **Response:**
  ```json
  [
    {
      "id": "1",
      "name": "Category Name",
      "name_ar": "اسم الفئة",
      "slug": "category-slug",
      "image_url": "https://...",
      "subcategories": [
        {
          "id": "10",
          "name": "Subcategory Name",
          "name_ar": "اسم الفئة الفرعية",
          "slug": "subcategory-slug",
          "image_url": "https://..."
        }
      ]
    }
  ]
  ```

- **GET `/categories/slug/:slug`**  
  Returns category by slug.

  **Response:**  
  Same as above for a single category.

---

### 2. Courses

- **GET `/courses`**  
  List all courses.

- **GET `/courses/slug/:slug`**  
  Get course by slug.

- **GET `/courses/category/:categoryId`**  
  Get all courses by category ID.

- **GET `/courses/subcategory/:subcategoryId`**  
  Get all courses by subcategory ID.

- **GET `/courses/featured`**  
  Get all featured courses.

- **GET `/courses/search?q=...`**  
  Search courses by keyword.

- **Example Course object:**
  ```json
  {
    "id": "12",
    "title": "Course Title",
    "title_ar": "عنوان الدورة",
    "slug": "course-title",
    "short_description": "...",
    "short_description_ar": "...",
    "image_url": "...",
    "price": 299.99,
    "discount_price": 249.99,
    "duration": "4 weeks",
    "level": "beginner",
    "category_id": "1",
    "subcategory_id": "10",
    "category_name": "Category Name",
    "category_name_ar": "اسم الفئة",
    "category_slug": "category-slug",
    "subcategory_name": "Subcategory Name",
    "subcategory_name_ar": "اسم الفئة الفرعية",
    "subcategory_slug": "subcategory-slug",
    "sessions": [
      {
        "id": "s1",
        "start_date": "2024-06-01",
        "end_date": "2024-06-30",
        "location": "Online",
        "location_ar": "عبر الإنترنت",
        "capacity": 30,
        "registration_count": 12
      }
    ]
  }
  ```

---

### 3. Sessions

- **GET `/sessions/upcoming/:courseId`**  
  Returns upcoming session(s) for a course.

  **Response:**  
  List of session objects.

---

### 4. Registrations

- **POST `/registrations`**  
  Register a user for a given course/session.

  **Request Body:**
  ```json
  {
    "session_id": "s1",
    "attendee_name": "John Doe",
    "attendee_email": "john@example.com",
    "company": "Example Company",
    "job_title": "Manager",
    "phone": "+1234567890",
    "notes": "Any additional notes"
  }
  ```

  **Response:**
  ```json
  {
    "id": "r1",
    "session_id": "s1",
    "attendee_name": "John Doe",
    "attendee_email": "john@example.com",
    "payment_status": "pending",
    "payment_amount": 299.99,
    "created_at": "2023-06-15T10:30:00Z"
  }
  ```

---

### 5. Sliders (Banners)

- **GET `/sliders`**  
  Returns all active slider/banner images.

  **Response:**
  ```json
  [
    {
      "id": "sl1",
      "title": "Slide Title",
      "title_ar": "عنوان الشريحة",
      "subtitle": "Slide subtitle",
      "subtitle_ar": "العنوان الفرعي للشريحة",
      "image_url": "...",
      "button_text": "Click Here",
      "button_text_ar": "انقر هنا",
      "button_link": "/courses"
    }
  ]
  ```

---

### 6. Partners

- **GET `/partners`**  
  Returns all active partner organizations.

  **Response:**
  ```json
  [
    {
      "id": "p1",
      "name": "Partner Name",
      "logo_url": "...",
      "website_url": "https://..."
    }
  ]
  ```

---

### 7. Company Info

- **GET `/company-info`**  
  Returns company information.

  **Response:**
  ```json
  {
    "id": "1",
    "name": "Excellence Training",
    "name_ar": "التميز للتدريب",
    "description": "...",
    "description_ar": "...",
    "phone": "+123456789",
    "email": "info@example.com",
    "address": "123 Main St, City",
    "address_ar": "العنوان بالعربية",
    "facebook": "https://facebook.com/...",
    "twitter": "https://twitter.com/...",
    "linkedin": "https://linkedin.com/...",
    "instagram": "https://instagram.com/...",
    "map_location": "12.3456,78.9012"
  }
  ```

---

### 8. Custom Pages

- **GET `/pages/:slug`**  
  Get a custom page by slug.

  **Response:**
  ```json
  {
    "id": "p1",
    "title": "About Us",
    "title_ar": "من نحن",
    "slug": "about-us",
    "content": "Content of the page...",
    "content_ar": "محتوى الصفحة...",
    "image": "..."
  }
  ```

---

### 9. Image Upload

- **POST `/upload`**  
  Uploads an image.

  **Request:** FormData with `file` property.

  **Response:**
  ```json
  {
    "success": true,
    "url": "/uploads/image123.jpg"
  }
  ```

---

## Development Workflow

### Database Setup

1. Create a MySQL database using the schema in `src/database/schema.sql`.
2. Update the database connection parameters in your `.env` file.

### Development Mode

During development, set `DEVELOPMENT_MODE = true` in `config.php` to use mock data without a database connection.

### Production Setup

1. Set `DEVELOPMENT_MODE = false` in `config.php`.
2. Configure your web server to serve the API from the `/api` endpoint.
3. Ensure the database connection parameters are correct.

### Error Handling

Errors from the backend are handled and displayed by the UI. If you see a generic error, check the network response for detailed messages.

## FAQ

- **How do I connect to a different database?**
  - Update the database parameters in your `.env` file and `config.php`.

- **How do I add a new API endpoint?**
  - Add a new case in the routing switch in `index.php` and create the corresponding PHP file in the appropriate directory.

- **How can I secure the API?**
  - Implement authentication middleware in `index.php` and add token verification to protected endpoints.
