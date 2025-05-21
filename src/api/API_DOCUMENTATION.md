
# Excellence Training API Documentation

This document provides detailed information about the Excellence Training API, including endpoints, request methods, parameters, and response formats.

## Table of Contents

1. [Introduction](#introduction)
2. [API Base URL](#api-base-url)
3. [Authentication](#authentication)
4. [Common Response Format](#common-response-format)
5. [Error Handling](#error-handling)
6. [API Endpoints](#api-endpoints)
   - [Categories](#categories)
   - [Courses](#courses)
   - [Sessions](#sessions)
   - [Registrations](#registrations)
   - [Sliders](#sliders)
   - [Partners](#partners)
   - [Company Info](#company-info)
   - [Custom Pages](#custom-pages)
   - [File Upload](#file-upload)
7. [Database Schema](#database-schema)
8. [Development Mode](#development-mode)

## Introduction

The Excellence Training API is a RESTful API that provides access to training courses, categories, sessions, and other resources for the Excellence Training website. The API is designed to be simple, consistent, and easy to use.

## API Base URL

The base URL for all API requests is:

```
http://your-domain.com/api
```

During development, you can use:

```
http://localhost:5000/api
```

## Authentication

Currently, the API does not require authentication for most endpoints. However, administrative endpoints will require authentication in future versions.

## Common Response Format

All API responses follow a consistent JSON format:

Successful response:
```json
{
  "data": [
    // Response data here
  ],
  "success": true
}
```

Error response:
```json
{
  "error": "Error message here",
  "success": false,
  "code": 404 // HTTP status code
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request:

- `200 OK`: The request was successful
- `400 Bad Request`: The request was invalid or missing required parameters
- `404 Not Found`: The requested resource was not found
- `405 Method Not Allowed`: The HTTP method is not supported for this endpoint
- `500 Internal Server Error`: An error occurred on the server

## API Endpoints

### Categories

#### Get All Categories

```
GET /api/categories
```

Returns a list of all categories with their subcategories.

**Response Example:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Business",
      "name_ar": "الأعمال",
      "slug": "business",
      "image_url": "/images/categories/business.jpg",
      "subcategories": [
        {
          "id": "101",
          "category_id": "1",
          "name": "Management",
          "name_ar": "الإدارة",
          "slug": "management",
          "image_url": null
        },
        {
          "id": "102",
          "category_id": "1",
          "name": "Leadership",
          "name_ar": "القيادة",
          "slug": "leadership",
          "image_url": null
        }
      ]
    }
  ],
  "success": true
}
```

#### Get Category by Slug

```
GET /api/categories/slug/{slug}
```

Returns a specific category and its subcategories by slug.

**Parameters:**

- `slug` (string, required): The slug of the category

**Response Example:**

```json
{
  "data": {
    "id": "1",
    "name": "Business",
    "name_ar": "الأعمال",
    "slug": "business",
    "image_url": "/images/categories/business.jpg",
    "subcategories": [
      {
        "id": "101",
        "category_id": "1",
        "name": "Management",
        "name_ar": "الإدارة",
        "slug": "management",
        "image_url": null
      }
    ]
  },
  "success": true
}
```

### Courses

#### Get All Courses

```
GET /api/courses
```

Returns a list of all active courses with their categories, subcategories, and upcoming sessions.

**Response Example:**

```json
{
  "data": [
    {
      "id": "1",
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
          "price": null,
          "registration_count": 12
        }
      ]
    }
  ],
  "success": true
}
```

#### Get Featured Courses

```
GET /api/courses/featured
```

Returns a list of featured courses with their upcoming sessions.

#### Get Course by Slug

```
GET /api/courses/slug/{slug}
```

Returns a specific course by slug, including all upcoming sessions.

**Parameters:**

- `slug` (string, required): The slug of the course

#### Get Courses by Category

```
GET /api/courses/category/{categoryId}
```

Returns all courses in a specific category.

**Parameters:**

- `categoryId` (string, required): The ID of the category

#### Get Courses by Subcategory

```
GET /api/courses/subcategory/{subcategoryId}
```

Returns all courses in a specific subcategory.

**Parameters:**

- `subcategoryId` (string, required): The ID of the subcategory

#### Search Courses

```
GET /api/courses/search?q={query}
```

Searches for courses by title, description, or other relevant fields.

**Parameters:**

- `q` (string, required): The search query

### Sessions

#### Get Upcoming Sessions for Course

```
GET /api/sessions/upcoming/{courseId}
```

Returns all upcoming sessions for a specific course.

**Parameters:**

- `courseId` (string, required): The ID of the course

### Registrations

#### Create Registration

```
POST /api/registrations
```

Creates a new registration for a session.

**Request Body Example:**

```json
{
  "session_id": "101",
  "attendee_name": "John Doe",
  "attendee_email": "john@example.com",
  "company": "ACME Inc",
  "job_title": "Manager",
  "phone": "+1234567890",
  "notes": "Special dietary requirements"
}
```

**Response Example:**

```json
{
  "data": {
    "id": "reg123",
    "session_id": "101",
    "attendee_name": "John Doe",
    "attendee_email": "john@example.com",
    "payment_status": "pending",
    "created_at": "2023-06-15T12:30:45Z"
  },
  "success": true
}
```

### Sliders

#### Get Active Sliders

```
GET /api/sliders
```

Returns all active sliders for the homepage.

### Partners

#### Get All Partners

```
GET /api/partners
```

Returns a list of all active partners.

### Company Info

#### Get Company Information

```
GET /api/company-info
```

Returns the company information used on the website.

### Custom Pages

#### Get Custom Page by Slug

```
GET /api/pages/{slug}
```

Returns a specific custom page by slug.

**Parameters:**

- `slug` (string, required): The slug of the page

### File Upload

#### Upload Image

```
POST /api/upload
```

Uploads an image file and returns the URL.

**Request Body:**

Form data with:
- `file` (file, required): The image file to upload
- `path` (string, optional): The directory to save the file in (default: 'uploads')

**Response Example:**

```json
{
  "data": {
    "url": "https://your-domain.com/uploads/categories/image123.jpg"
  },
  "success": true
}
```

## Database Schema

The API is backed by a MySQL database with the following main tables:

- `users`: Website administrators and users
- `categories`: Course categories
- `subcategories`: Course subcategories
- `courses`: Training courses
- `sessions`: Scheduled sessions for courses
- `registrations`: User registrations for sessions
- `slider_images`: Homepage slider images
- `partners`: Partner organizations
- `company_info`: Company information
- `custom_pages`: Custom website pages

For the complete database schema, see the `database/schema.sql` file in the project repository.

## Development Mode

For development purposes, the API can be run in development mode by setting the `DEVELOPMENT_MODE` constant to `true` in the `config.php` file. In development mode, the API will return mock data instead of querying the database.

This is useful for frontend development when the backend database is not yet set up or available.

