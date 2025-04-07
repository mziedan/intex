
# Excellence Training API

This folder contains the PHP API for the Excellence Training platform. The API provides endpoints for accessing and manipulating data related to courses, categories, sessions, registrations, and more.

## Structure

- `config.php`: Configuration file with database settings and helper functions
- `index.php`: Main entry point that routes requests to the appropriate handlers
- `upload.php`: Handles image uploads

### Folders

- **categories/**: Endpoints for accessing categories and subcategories
  - `index.php`: Get all categories
  - `slug.php`: Get category by slug

- **courses/**: Endpoints for accessing courses
  - `index.php`: Get all courses
  - `featured.php`: Get featured courses
  - `slug.php`: Get course by slug
  - `category.php`: Get courses by category
  - `subcategory.php`: Get courses by subcategory
  - `search.php`: Search for courses

- **sessions/**: Endpoints for accessing sessions
  - `upcoming.php`: Get upcoming sessions for a course

- **registrations/**: Endpoints for managing registrations
  - `create.php`: Create a new registration

- **sliders/**: Endpoints for accessing slider images
  - `active.php`: Get active slider images

- **partners/**: Endpoints for accessing partners
  - `index.php`: Get all partners

- **company-info/**: Endpoints for accessing company information
  - `index.php`: Get company info

- **pages/**: Endpoints for accessing custom pages
  - `slug.php`: Get custom page by slug

## Development Mode

The API includes a development mode that returns mock data instead of hitting the database. This is controlled by the `DEVELOPMENT_MODE` constant in `config.php`.

When development mode is enabled, the API will return realistic mock data for all endpoints, making it possible to develop the frontend without a working database.

## API Documentation

For detailed API documentation, refer to the `API_DOCUMENTATION.md` file in the root of the project.

## Error Handling

All API endpoints use consistent error handling that returns appropriate HTTP status codes and error messages in JSON format:

```json
{
  "error": "Error message"
}
```

## Security Considerations

- All input is sanitized using the `sanitizeInput()` function defined in `config.php`
- SQL queries use prepared statements to prevent SQL injection
- CORS headers are set to allow cross-origin requests during development
