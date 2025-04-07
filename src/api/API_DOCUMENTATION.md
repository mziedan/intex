# Excellence Training Platform API Documentation

This document provides a comprehensive guide to using the Excellence Training API. The API allows you to access and manipulate data related to courses, categories, sessions, registrations, and more.

## Base URL

All API endpoints are relative to the base URL:

```
/api
```

## Authentication

Currently, the API does not require authentication for most endpoints. However, certain operations like creating registrations may require authentication in future versions.

## Response Format

All responses are returned in JSON format. Successful responses typically have the following structure:

```json
[
  {
    "id": "uuid",
    "name": "Example Name",
    "slug": "example-slug",
    // Other properties specific to the resource
  }
]
```

Error responses have the following structure:

```json
{
  "error": "Error message"
}
```

## HTTP Status Codes

- `200 OK`: The request was successful
- `400 Bad Request`: The request was invalid
- `404 Not Found`: The requested resource was not found
- `405 Method Not Allowed`: The HTTP method is not supported for this endpoint
- `500 Internal Server Error`: An error occurred on the server

## Categories

### Get All Categories

Retrieves a list of all categories with their subcategories.

**Endpoint**: `GET /categories`

**Response**:
```json
[
  {
    "id": "uuid",
    "name": "Business",
    "name_ar": "الأعمال",
    "slug": "business",
    "image_url": "/images/categories/business.jpg",
    "subcategories": [
      {
        "id": "uuid",
        "name": "Management",
        "name_ar": "الإدارة",
        "slug": "management",
        "image_url": "/images/subcategories/management.jpg"
      }
    ]
  }
]
```

### Get Category by Slug

Retrieves a single category by its slug, including its subcategories.

**Endpoint**: `GET /categories/{slug}`

**URL Parameters**:
- `slug`: The slug of the category to retrieve

**Response**:
```json
{
  "id": "uuid",
  "name": "Business",
  "name_ar": "الأعمال",
  "slug": "business",
  "image_url": "/images/categories/business.jpg",
  "subcategories": [
    {
      "id": "uuid",
      "name": "Management",
      "name_ar": "الإدارة",
      "slug": "management",
      "image_url": "/images/subcategories/management.jpg"
    }
  ]
}
```

## Courses

### Get All Courses

Retrieves a list of all active courses with their categories and upcoming sessions.

**Endpoint**: `GET /courses`

**Response**:
```json
[
  {
    "id": "uuid",
    "title": "Leadership Essentials",
    "title_ar": "أساسيات القيادة",
    "slug": "leadership-essentials",
    "short_description": "Learn the core principles of effective leadership",
    "short_description_ar": "تعلم المبادئ الأساسية للقيادة الفعالة",
    "price": 299.99,
    "discount_price": 249.99,
    "duration": "4 weeks",
    "level": "Intermediate",
    "featured": true,
    "status": "active",
    "image_url": "/images/courses/leadership.jpg",
    "category_id": "uuid",
    "subcategory_id": "uuid",
    "category_name": "Business",
    "category_name_ar": "الأعمال",
    "category_slug": "business",
    "subcategory_name": "Leadership",
    "subcategory_name_ar": "القيادة",
    "subcategory_slug": "leadership",
    "sessions": [
      {
        "id": "uuid",
        "start_date": "2023-07-15",
        "end_date": "2023-08-12",
        "location": "Online",
        "location_ar": "عبر الإنترنت",
        "capacity": 30,
        "price": null,
        "registration_count": 12
      }
    ]
  }
]
```

### Get Featured Courses

Retrieves a list of featured courses with their categories and upcoming sessions.

**Endpoint**: `GET /courses/featured`

**Response**: Same structure as Get All Courses, but only includes courses where `featured` is `true`.

### Get Course by Slug

Retrieves a single course by its slug, including its category, subcategory, and upcoming sessions.

**Endpoint**: `GET /courses/{slug}`

**URL Parameters**:
- `slug`: The slug of the course to retrieve

**Response**:
```json
{
  "id": "uuid",
  "title": "Leadership Essentials",
  "title_ar": "أساسيات القيادة",
  "slug": "leadership-essentials",
  "short_description": "Learn the core principles of effective leadership",
  "short_description_ar": "تعلم المبادئ الأساسية للقيادة الفعالة",
  "description": "Detailed course description here...",
  "description_ar": "وصف مفصل للدورة هنا...",
  "price": 299.99,
  "discount_price": 249.99,
  "duration": "4 weeks",
  "level": "Intermediate",
  "featured": true,
  "image_url": "/images/courses/leadership.jpg",
  "category_id": "uuid",
  "subcategory_id": "uuid",
  "category_name": "Business",
  "category_name_ar": "الأعمال",
  "category_slug": "business",
  "subcategory_name": "Leadership",
  "subcategory_name_ar": "القيادة", 
  "subcategory_slug": "leadership",
  "sessions": [
    {
      "id": "uuid",
      "start_date": "2023-07-15",
      "end_date": "2023-08-12",
      "location": "Online",
      "location_ar": "عبر الإنترنت",
      "capacity": 30,
      "price": null,
      "registration_count": 12
    }
  ]
}
```

### Get Courses by Category

Retrieves courses belonging to a specific category.

**Endpoint**: `GET /courses/category/{categoryId}`

**URL Parameters**:
- `categoryId`: The ID of the category

**Response**: Same structure as Get All Courses, but filtered by category.

### Get Courses by Subcategory

Retrieves courses belonging to a specific subcategory.

**Endpoint**: `GET /courses/subcategory/{subcategoryId}`

**URL Parameters**:
- `subcategoryId`: The ID of the subcategory

**Response**: Same structure as Get All Courses, but filtered by subcategory.

### Search Courses

Searches for courses based on a query string.

**Endpoint**: `GET /courses/search?q={query}`

**Query Parameters**:
- `q`: The search query

**Response**: Same structure as Get All Courses, but filtered by search results.

## Sessions

### Get Upcoming Sessions for Course

Retrieves upcoming sessions for a specific course.

**Endpoint**: `GET /sessions/upcoming/{courseId}`

**URL Parameters**:
- `courseId`: The ID of the course

**Response**:
```json
[
  {
    "id": "uuid",
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

## Registrations

### Create Registration

Creates a new registration for a session.

**Endpoint**: `POST /registrations`

**Request Body**:
```json
{
  "session_id": "uuid",
  "attendee_name": "John Doe",
  "attendee_email": "john@example.com",
  "company": "Example Company",
  "job_title": "Manager",
  "phone": "+1234567890",
  "notes": "Any additional notes"
}
```

**Response**:
```json
{
  "id": "uuid",
  "session_id": "uuid",
  "attendee_name": "John Doe",
  "attendee_email": "john@example.com",
  "payment_status": "pending",
  "payment_amount": 299.99,
  "created_at": "2023-06-15T10:30:00Z"
}
```

## Sliders

### Get Active Sliders

Retrieves all active slider images for the homepage.

**Endpoint**: `GET /sliders/active`

**Response**:
```json
[
  {
    "id": "uuid",
    "title": "Enhance Your Skills",
    "title_ar": "تعزيز مهاراتك",
    "subtitle": "Join our world-class training programs",
    "subtitle_ar": "انضم إلى برامجنا التدريبية ذات المستوى العالمي",
    "image_url": "/images/slider/slide1.jpg",
    "button_text": "Explore Courses",
    "button_text_ar": "استكشف الدورات",
    "button_link": "/courses"
  }
]
```

## Partners

### Get Partners

Retrieves all active partners.

**Endpoint**: `GET /partners`

**Response**:
```json
[
  {
    "id": "uuid",
    "name": "Partner Company",
    "logo_url": "/images/partners/partner1.jpg",
    "website_url": "https://example.com"
  }
]
```

## Company Info

### Get Company Info

Retrieves company information.

**Endpoint**: `GET /company-info`

**Response**:
```json
{
  "id": "uuid",
  "name": "Excellence Training",
  "name_ar": "التميز للتدريب",
  "description": "We provide professional training courses led by industry experts.",
  "description_ar": "نقدم دورات تدريبية احترافية بقيادة خبراء في المجال.",
  "phone": "+1234567890",
  "email": "info@excellencetraining.com",
  "address": "123 Main St, City, Country",
  "address_ar": "١٢٣ الشارع الرئيسي، المدينة، البلد",
  "facebook": "https://facebook.com/excellencetraining",
  "twitter": "https://twitter.com/excellencetraining",
  "linkedin": "https://linkedin.com/company/excellencetraining",
  "instagram": "https://instagram.com/excellencetraining"
}
```

## Custom Pages

### Get Custom Page by Slug

Retrieves a custom page by its slug.

**Endpoint**: `GET /pages/{slug}`

**URL Parameters**:
- `slug`: The slug of the page to retrieve

**Response**:
```json
{
  "id": "uuid",
  "title": "About Us",
  "title_ar": "من نحن",
  "slug": "about-us",
  "content": "Content of the about us page...",
  "content_ar": "محتوى صفحة من نحن...",
  "image": "/images/pages/about.jpg"
}
```

## Image Upload

### Upload Image

Uploads an image to the server.

**Endpoint**: `POST /upload`

**Form Data**:
- `image`: The image file to upload
- `folder`: The folder to save the image in (`sliders`, `courses`, `categories`, `subcategories`, `partners`, `instructors`)

**Response**:
```json
{
  "success": true,
  "imageUrl": "/uploads/courses/image123.jpg"
}
```

## Error Handling

When an error occurs, the API will return an appropriate HTTP status code and an error message:

```json
{
  "error": "Error message"
}
```

Common error messages include:
- "Method not allowed"
- "Resource not found"
- "Invalid or missing parameters"
- "Database error"

## Development Mode

In development mode, the API returns mock data instead of hitting the database. This behavior is controlled by the `DEVELOPMENT_MODE` constant in the API configuration.

To enable or disable development mode, modify the `config.php` file:

```php
define('DEVELOPMENT_MODE', true); // Set to false for production
```

## API Implementation Notes

This API is implemented using PHP and MySQL. The API endpoints follow RESTful principles where possible, and all responses are in JSON format.

The API is designed to work with the database schema defined in `schema.sql`, which includes tables for categories, subcategories, courses, sessions, registrations, and more.

For security reasons, sensitive operations like creating, updating, or deleting resources may require authentication in future versions.
