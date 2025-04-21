
# API Documentation

The frontend communicates with a custom Node.js (Express & Firebase) backend you provided at https://github.com/mziedan/intex-firebase/tree/main/backend. Below is a detailed documentation of the REST API endpoints used by this website, their formats, and usage examples.

---
## Base URL

All API endpoints are prefixed by the base URL:

    http://localhost:5000/api

If you deploy elsewhere, update the base URL accordingly in your environment variables.

---

## Authentication

> NOTE: If your backend adds authentication, add relevant headers/tokens as documented in your backend.

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
      "slug": "category-slug",
      "image": "https://...",
      "subcategories": [
        {
          "id": "10",
          "name": "Subcategory Name",
          "slug": "subcategory-slug"
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
    "slug": "course-title",
    "short_description": "...",
    "image_url": "...",
    "category_id": "1",
    "subcategory_id": "10",
    "category_name": "Category Name",
    "duration": "4 weeks",
    "level": "Beginner",
    "sessions": [
      {
        "id": "s1",
        "start_date": "2024-06-01T00:00:00Z",
        "end_date": "2024-06-05T00:00:00Z",
        "location": "Online"
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
    "userId": "abc123",
    "courseId": "12",
    "sessionId": "s1",
    "info": { ... }
  }
  ```

  **Response:**
  ```json
  { "success": true, "message": "Registration successful!" }
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
      "subtitle": "",
      "image_url": "...",
      "button_text": "",
      "button_link": ""
    }
  ]
  ```

---

### 6. Partners

- **GET `/partners`**  
  Returns all partner organizations.

---

### 7. Company Info

- **GET `/company-info`**  
  Returns company information.

---

### 8. Custom Pages

- **GET `/pages/:slug`**  
  Get a custom page by slug.

---

### 9. File or Image Upload

- **POST `/upload`** (if supported by backend)  
  Uploads images.  
  **Request:** FormData with `file` property.

---

## Usage

The frontend uses the above endpoints via `apiService.ts`.  
Update the `VITE_API_BASE_URL` in your `.env` file to point to your deployed backend.

All API errors are returned as:
```json
{ "error": "Message about the error" }
```

## Development Workflow

If you add or change endpoints in your backend, update the corresponding calls in `apiService.ts`.

---
## Data Model Example

- **Category:**
    - id, name, slug, image, subcategories
- **Course:**
    - id, title, slug, description, image_url, category_id, subcategory_id, sessions
- **Session:**
    - id, start_date, end_date, location
- **Registration:**
    - userId, courseId, sessionId, info

Refer to the [backend repo README](https://github.com/mziedan/intex-firebase/tree/main/backend) for more details or special endpoints.

---

## Error Handling

Errors from the backend are handled and displayed by the UI.  
If you see a generic error, check the network response for useful messages.

## FAQ

- **How do I connect frontend to a different backend?**
  - Set `VITE_API_BASE_URL` in your environment.

- **How do I add a new backend feature?**
  - Update your backend, then update `apiService.ts` and this documentation.

---
