
# Excellence Training Platform

## Database Setup

This application requires a MySQL database connection. Since direct database connections are not supported in browser environments, you need to create a backend API server to handle database operations.

### Setting Up Your Backend

1. Clone this repository for your backend server
2. Create a `.env` file based on the `.env.example` provided
3. Set up your MySQL database using the schema in `src/database/schema.sql`
4. Implement API endpoints that correspond to the fetch requests in `src/services/db.ts`

### Required API Endpoints

Your backend API should implement these endpoints:

- `/api/categories` - Get all categories
- `/api/categories/:slug` - Get category by slug
- `/api/courses` - Get all courses
- `/api/courses/featured` - Get featured courses
- `/api/courses/:slug` - Get course by slug
- `/api/courses/category/:id` - Get courses by category
- `/api/courses/subcategory/:id` - Get courses by subcategory
- `/api/courses/search?q=:query` - Search courses
- `/api/sessions/course/:id/upcoming` - Get upcoming sessions for a course
- `/api/sliders/active` - Get active slider images
- `/api/partners` - Get all partners
- `/api/company-info` - Get company info
- `/api/pages` - Get all custom pages
- `/api/pages/:slug` - Get custom page by slug

## Frontend Configuration

Update the `.env` file with your API server URL:

```
VITE_API_BASE_URL=http://your-api-server.com/api
```

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```
