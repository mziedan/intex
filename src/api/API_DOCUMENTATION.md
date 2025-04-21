
# Excellence Training Platform API Documentation

This file documents the RESTful API endpoints for communicating between the **frontend** and the **backend** services using a MySQL database.

## Table of Contents

- [General Principles](#general-principles)
- [API Base URL](#api-base-url)
- [Authentication](#authentication)
- [Endpoints Overview](#endpoints-overview)
- [Endpoints & Schemas](#endpoints--schemas)
  - [Categories](#categories)
  - [Courses](#courses)
  - [Sessions](#sessions)
  - [Registrations](#registrations)
  - [Sliders](#sliders)
  - [Partners](#partners)
  - [Company Info](#company-info)
  - [Custom Pages](#custom-pages)
  - [Image Upload](#image-upload)
- [Error Handling](#error-handling)
- [Database Schema Reference](#database-schema-reference)
- [Best Practices](#best-practices)
- [Changelog](#changelog)

---

## General Principles

- **All endpoints return JSON.**
- **Authentication:** Currently, most endpoints are public; sensitive operations may require future authentication.
- **Data source:** All endpoints communicate with a centralized MySQL database (see schema [`src/database/schema.sql`](../database/schema.sql)).

---

## API Base URL

```
http://localhost:5000/api
```
*Set this value as `VITE_API_BASE_URL` in your frontend environment file.*

---

## Endpoints Overview

| Entity        | Endpoint                 | Methods | Description                 |
|---------------|--------------------------|---------|-----------------------------|
| Categories    | `/categories`            | GET     | List all categories         |
|               | `/categories/slug/:slug` | GET     | Get a category by slug      |
| Courses       | `/courses`               | GET     | List all courses            |
|               | `/courses/slug/:slug`    | GET     | Get a course by slug        |
|               | `/courses/category/:id`  | GET     | Courses by category         |
|               | `/courses/subcategory/:id` | GET   | Courses by subcategory      |
|               | `/courses/featured`      | GET     | Featured courses            |
|               | `/courses/search?q=...`  | GET     | Search courses (by keyword) |
| Sessions      | `/sessions/upcoming/:id` | GET     | Upcoming sessions by course |
| Registrations | `/registrations`         | POST    | Register a user for session |
| Sliders       | `/sliders`               | GET     | List active sliders         |
| Partners      | `/partners`              | GET     | List all active partners    |
| Company Info  | `/company-info`          | GET     | Company core information    |
| Custom Pages  | `/pages/:slug`           | GET     | Get custom page by slug     |
| Upload        | `/upload`                | POST    | Upload an image             |

---

## Endpoints & Schemas

### Categories

- **GET `/categories`**  
  Returns all available categories.
  **Response:**
  ```json
  [
    {
      "id": "1",
      "name": "Business",
      "name_ar": "الأعمال",
      "slug": "business",
      "image_url": "...",
      "subcategories": [
        {
          "id": "101",
          "name": "Management",
          "name_ar": "الإدارة",
          "slug": "management",
          "image_url": "..."
        }
      ]
    }
  ]
  ```

- **GET `/categories/slug/:slug`**  
  Returns category info by unique slug.
  **Response:**  
  Same as above, for a category.

---

### Courses

- **GET `/courses`**  
  Returns all courses.
  **Response:**  
  ```json
  [
    {
      "id": "12",
      "title": "Course Title",
      "title_ar": "عنوان الدورة",
      "slug": "course-title",
      "short_description": "...",
      "description": "...",
      "description_ar": "...",
      "price": 299.99,
      "discount_price": 249.99,
      "image_url": "...",
      "duration": "4 weeks",
      "level": "beginner",
      "featured": true,
      "category_id": "1",
      "subcategory_id": "10",
      "category_name": "Category Name",
      "category_slug": "category-slug",
      "subcategory_name": "Subcategory Name",
      "subcategory_slug": "subcategory-slug",
      "sessions": [
        // See Sessions
      ]
    }
  ]
  ```

- **GET `/courses/slug/:slug`**  
  Get detailed info about a single course (all fields).
  **Response:** (See above, but only one object.)

- **GET `/courses/category/:id`**  
  All courses belonging to category (by category ID).

- **GET `/courses/subcategory/:id`**  
  All courses for a subcategory.

- **GET `/courses/featured`**  
  Only "featured" courses.

- **GET `/courses/search?q=KEYWORD`**  
  Search by keyword in the title or description.

---

### Sessions

- **GET `/sessions/upcoming/:courseId`**  
  Returns upcoming session(s) for a course.
  **Response:**
  ```json
  [
    {
      "id": "s1",
      "course_id": "12",
      "start_date": "2024-06-01",
      "end_date": "2024-06-30",
      "location": "Online",
      "location_ar": "عبر الإنترنت",
      "capacity": 30,
      "price": 299.99,
      "status": "upcoming"
    }
  ]
  ```

---

### Registrations

- **POST `/registrations`**
  Register a user for a specific course session.
  **Request Body:**
  ```json
  {
    "session_id": "s1",
    "attendee_name": "John Doe",
    "attendee_email": "john@example.com",
    "company": "",
    "job_title": "",
    "phone": "",
    "notes": ""
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
    "created_at": "2024-06-15T10:30:00Z"
  }
  ```

---

### Sliders

- **GET `/sliders`**
  Lists all "active" slider/banner images for hero or marketing sections.
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

### Partners

- **GET `/partners`**
  Lists active partners.
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

### Company Info

- **GET `/company-info`**
  Returns core details for company profile, contact, and social info.
  **Response:**
  ```json
  {
    "id": "1",
    "name": "Excellence Training",
    "name_ar": "التميز للتدريب",
    "description": "...",
    "description_ar": "...",
    "phone": "+1234567890",
    "email": "info@example.com",
    "address": "123 Main St, City",
    "address_ar": "العنوان بالعربية",
    "facebook": "...",
    "twitter": "...",
    "linkedin": "...",
    "instagram": "...",
    "map_location": "12.3456,78.9012"
  }
  ```

---

### Custom Pages

- **GET `/pages/:slug`**
  Loads custom page content by slug.
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

### Image Upload

- **POST `/upload`**
  Upload images (form-data, with 'file' field).
  **Response:**
  ```json
  {
    "success": true,
    "url": "/uploads/image123.jpg"
  }
  ```

---

## Error Handling

- All errors use non-2xx HTTP status and return an error JSON, e.g.:
  ```json
  {
    "error": "Error detail message"
  }
  ```

---

## Database Schema Reference

See [`src/database/schema.sql`](../database/schema.sql) for the up-to-date MySQL database schema including table definitions and sample inserts.

---

## Best Practices

- Always check for non-200 responses and handle errors gracefully in your frontend.
- Use correct HTTP methods (`GET` for fetching, `POST` for creating).
- For POST and PUT/PATCH requests, use `Content-Type: application/json` or `multipart/form-data` (for upload).
- Keep your environment variables up to date with the correct API base URL.

---

## Changelog

**2024-04-21**  
- Aligned API and documentation with custom backend implementation and MySQL
- Deprecated Supabase integration; removed all supabase references

---

