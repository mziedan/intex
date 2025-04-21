
# Excellence Training API Documentation

## Overview

This document provides a comprehensive guide to the Excellence Training API. The API allows clients to interact with the training platform's core functionalities, including browsing courses, categories, sessions, and managing registrations.

## Base URL

All API endpoints are relative to the base URL:

```
http://localhost:5000/api
```

For production, update the VITE_API_BASE_URL in your .env file.

## Response Format

All responses are in JSON format. Successful responses return the requested data, while error responses follow this structure:

```json
{
  "error": "Error message"
}
```

## Authentication

Currently, the API is open for read operations. Future versions may implement authentication for write operations.

## Development Mode

The API supports a development mode that returns mock data without requiring a database connection. This is controlled by the `DEVELOPMENT_MODE` constant in `config.php`.

## API Endpoints

### 1. Categories

#### Get All Categories

Retrieves all categories with their subcategories.

**Endpoint:** `GET /categories`

**Response:**
```json
[
  {
    "id": "1",
    "name": "Business",
    "name_ar": "الأعمال",
    "slug": "business",
    "image_url": "/images/categories/business.jpg",
    "subcategories": [
      {
        "id": "101",
        "name": "Management",
        "name_ar": "الإدارة",
        "slug": "management",
        "image_url": "/images/subcategories/management.jpg"
      }
    ]
  }
]
```

#### Get Category by Slug

Retrieves a single category by its slug.

**Endpoint:** `GET /categories/slug/{slug}`

**Parameters:**
- `slug`: The unique slug identifier for the category

**Response:** Same format as a single category object from the categories list.

### 2. Courses

#### Get All Courses

Retrieves all active courses.

**Endpoint:** `GET /courses`

**Response:**
```json
[
  {
    "id": "1",
    "title": "Leadership Essentials",
    "title_ar": "أساسيات القيادة",
    "slug": "leadership-essentials",
    "short_description": "Learn core leadership principles",
    "short_description_ar": "تعلم مبادئ القيادة الأساسية",
    "price": 299.99,
    "discount_price": 249.99,
    "duration": "4 weeks",
    "level": "intermediate",
    "featured": true,
    "image_url": "/images/courses/leadership.jpg",
    "category_id": "1",
    "subcategory_id": "102",
    "category_name": "Business",
    "category_name_ar": "الأعمال",
    "category_slug": "business",
    "subcategory_name": "Leadership",
    "subcategory_name_ar": "القيادة",
    "subcategory_slug": "leadership",
    "sessions": [
      {
        "id": "101",
        "start_date": "2023-07-15",
        "end_date": "2023-08-12",
        "location": "Online",
        "location_ar": "عبر الإنترنت",
        "capacity": 30,
        "registration_count": 12
      }
    ]
  }
]
```

#### Get Featured Courses

Retrieves featured courses.

**Endpoint:** `GET /courses/featured`

**Response:** Same format as courses list, filtered to featured courses.

#### Get Course by Slug

Retrieves a single course by its slug, including full details.

**Endpoint:** `GET /courses/slug/{slug}`

**Parameters:**
- `slug`: The unique slug identifier for the course

**Response:**
```json
{
  "id": "1",
  "title": "Leadership Essentials",
  "title_ar": "أساسيات القيادة",
  "slug": "leadership-essentials",
  "short_description": "Learn core leadership principles",
  "short_description_ar": "تعلم مبادئ القيادة الأساسية",
  "description": "Detailed description of the course...",
  "description_ar": "وصف تفصيلي للدورة...",
  "price": 299.99,
  "discount_price": 249.99,
  "duration": "4 weeks",
  "level": "intermediate",
  "featured": true,
  "image_url": "/images/courses/leadership.jpg",
  "category_id": "1",
  "subcategory_id": "102",
  "category_name": "Business",
  "category_name_ar": "الأعمال",
  "category_slug": "business",
  "subcategory_name": "Leadership",
  "subcategory_name_ar": "القيادة",
  "subcategory_slug": "leadership",
  "sessions": [
    {
      "id": "101",
      "start_date": "2023-07-15",
      "end_date": "2023-08-12",
      "location": "Online",
      "location_ar": "عبر الإنترنت",
      "capacity": 30,
      "registration_count": 12
    }
  ]
}
```

#### Get Courses by Category

Retrieves courses belonging to a specific category.

**Endpoint:** `GET /courses/category/{categoryId}`

**Parameters:**
- `categoryId`: The ID of the category

**Response:** Same format as courses list, filtered by category.

#### Get Courses by Subcategory

Retrieves courses belonging to a specific subcategory.

**Endpoint:** `GET /courses/subcategory/{subcategoryId}`

**Parameters:**
- `subcategoryId`: The ID of the subcategory

**Response:** Same format as courses list, filtered by subcategory.

#### Search Courses

Searches for courses based on a query string.

**Endpoint:** `GET /courses/search?q={query}`

**Parameters:**
- `q`: The search query

**Response:** Same format as courses list, filtered by search results.

### 3. Sessions

#### Get Upcoming Sessions for Course

Retrieves upcoming sessions for a specific course.

**Endpoint:** `GET /sessions/upcoming/{courseId}`

**Parameters:**
- `courseId`: The ID of the course

**Response:**
```json
[
  {
    "id": "101",
    "start_date": "2023-07-15",
    "end_date": "2023-08-12",
    "location": "Online",
    "location_ar": "عبر الإنترنت",
    "capacity": 30,
    "price": null,
    "registration_count": 12
  }
]
```

### 4. Registrations

#### Create Registration

Creates a new registration for a session.

**Endpoint:** `POST /registrations`

**Request Body:**
```json
{
  "session_id": "101",
  "attendee_name": "John Doe",
  "attendee_email": "john@example.com",
  "company": "Example Corp",
  "job_title": "Manager",
  "phone": "+1234567890",
  "notes": "Any special requirements"
}
```

**Response:**
```json
{
  "id": "r1",
  "session_id": "101",
  "attendee_name": "John Doe",
  "attendee_email": "john@example.com",
  "payment_status": "pending",
  "payment_amount": 299.99,
  "created_at": "2023-06-15T10:30:00Z"
}
```

### 5. Sliders

#### Get Active Sliders

Retrieves all active slider/banner images.

**Endpoint:** `GET /sliders`

**Response:**
```json
[
  {
    "id": "1",
    "title": "Enhance Your Skills",
    "title_ar": "تعزيز مهاراتك",
    "subtitle": "Join our world-class training programs",
    "subtitle_ar": "انضم إلى برامجنا التدريبية ذات المستوى العالمي",
    "image_url": "/images/sliders/slide1.jpg",
    "button_text": "Explore Courses",
    "button_text_ar": "استكشف الدورات",
    "button_link": "/courses"
  }
]
```

### 6. Partners

#### Get Partners

Retrieves all active partners.

**Endpoint:** `GET /partners`

**Response:**
```json
[
  {
    "id": "1",
    "name": "Partner Company",
    "logo_url": "/images/partners/partner1.jpg",
    "website_url": "https://example.com"
  }
]
```

### 7. Company Info

#### Get Company Info

Retrieves company information.

**Endpoint:** `GET /company-info`

**Response:**
```json
{
  "id": "1",
  "name": "Excellence Training",
  "name_ar": "التميز للتدريب",
  "description": "Company description...",
  "description_ar": "وصف الشركة...",
  "phone": "+1234567890",
  "email": "info@example.com",
  "address": "123 Main St, City, Country",
  "address_ar": "العنوان بالعربية",
  "facebook": "https://facebook.com/example",
  "twitter": "https://twitter.com/example",
  "linkedin": "https://linkedin.com/company/example",
  "instagram": "https://instagram.com/example",
  "map_location": "12.3456,78.9012"
}
```

### 8. Custom Pages

#### Get Custom Page by Slug

Retrieves a custom page by its slug.

**Endpoint:** `GET /pages/{slug}`

**Parameters:**
- `slug`: The slug of the page to retrieve

**Response:**
```json
{
  "id": "1",
  "title": "About Us",
  "title_ar": "من نحن",
  "slug": "about-us",
  "content": "Content of the about us page...",
  "content_ar": "محتوى صفحة من نحن...",
  "image": "/images/pages/about.jpg",
  "published": true
}
```

### 9. Image Upload

#### Upload Image

Uploads an image to the server.

**Endpoint:** `POST /upload`

**Request:** FormData with `file` property and optional `folder` property.

**Response:**
```json
{
  "success": true,
  "url": "/uploads/courses/image123.jpg"
}
```

## Error Codes

The API uses standard HTTP status codes:

- 200: Success
- 400: Bad Request (invalid input)
- 404: Not Found
- 405: Method Not Allowed
- 500: Server Error

## Implementation Notes

### Database Structure

The API works with a MySQL database with tables for categories, subcategories, courses, sessions, registrations, and more. Refer to the `schema.sql` file for the complete database schema.

### Development vs Production

In development mode (`DEVELOPMENT_MODE = true`), the API returns mock data instead of querying the database. This is useful for frontend development without a database.

In production mode (`DEVELOPMENT_MODE = false`), the API connects to the MySQL database defined in the configuration.

### Localization

Many API responses include both English and Arabic translations (suffixed with `_ar`). The frontend application should use the appropriate fields based on the user's language preference.
