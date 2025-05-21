
# Excellence Training Platform

A complete training course management and enrollment platform built with React, TypeScript, and PHP with MySQL backend.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
   - [Prerequisites](#prerequisites)
   - [Frontend Setup](#frontend-setup)
   - [Backend Setup](#backend-setup)
   - [Database Setup](#database-setup)
   - [Environment Configuration](#environment-configuration)
5. [Development Workflow](#development-workflow)
6. [API Documentation](#api-documentation)
7. [Deployment](#deployment)
8. [Contributing](#contributing)

## Features

- Course browsing and filtering by categories and subcategories
- Course details with session information
- Course registration system
- Admin panel for course and content management
- Multi-language support (English & Arabic)
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- Vite as build tool
- TanStack Query for API data fetching
- Tailwind CSS for styling
- Shadcn/UI components
- React Router for navigation

### Backend
- PHP 8.0+ REST API
- MySQL database
- JWT Authentication (for admin features)

## Project Structure

```
/
├── public/            # Static assets
├── src/
│   ├── api/           # PHP API files
│   ├── components/    # React components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API service layers
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── database/          # Database schema and migrations
├── .env.example       # Example environment variables
└── README.md          # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm/yarn
- PHP 8.0+
- MySQL 8.0+
- Web server (Apache/Nginx)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/excellence-training.git
   cd excellence-training
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your API base URL:
   ```
   VITE_API_BASE_URL=http://localhost/excellence-training/src/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend Setup

1. Configure your web server (Apache/Nginx) to serve the PHP files from the `src/api` directory.

2. For Apache, make sure URL rewriting is enabled:
   
   Create or update `.htaccess` in the `src/api` directory:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ index.php [QSA,L]
   ```

3. For Nginx, add the following to your server configuration:
   ```nginx
   location /api/ {
       try_files $uri $uri/ /api/index.php?$query_string;
   }
   ```

### Database Setup

1. Create a new MySQL database:
   ```sql
   CREATE DATABASE excellence_training CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Import the database schema:
   ```bash
   mysql -u username -p excellence_training < database/schema.sql
   ```

3. Create a MySQL user for the application (recommended):
   ```sql
   CREATE USER 'excellence_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON excellence_training.* TO 'excellence_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Environment Configuration

1. Create a `config.php` file in the `src/api` directory:

```php
<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'excellence_training');
define('DB_USER', 'excellence_user');
define('DB_PASS', 'your_secure_password');

// Development Mode (set to false in production)
define('DEVELOPMENT_MODE', true);

// API Configuration
define('API_VERSION', '1.0');
define('UPLOADS_DIR', __DIR__ . '/../uploads');

// Helper functions
function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    return $conn;
}

function sendResponse($data) {
    echo json_encode([
        'data' => $data,
        'success' => true
    ]);
    exit;
}

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode([
        'error' => $message,
        'success' => false,
        'code' => $code
    ]);
    exit;
}

function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// Parse the URL path components
$request_uri = $_SERVER['REQUEST_URI'];
$base_path = '/api/';

// Extract the path from the URI
if (strpos($request_uri, $base_path) === 0) {
    $path = substr($request_uri, strlen($base_path));
} else {
    // Default to empty path if the base path is not found
    $path = '';
}

// Remove query string if present
if (($pos = strpos($path, '?')) !== false) {
    $path = substr($path, 0, $pos);
}

// Split the path into segments for routing
$segments = explode('/', trim($path, '/'));
```

## Development Workflow

1. Start the frontend development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. The application will be available at `http://localhost:5173`

3. During development, you can enable `DEVELOPMENT_MODE` in `config.php` to use mock data without a database.

## API Documentation

Detailed API documentation is available at [src/api/API_DOCUMENTATION.md](src/api/API_DOCUMENTATION.md).

## Deployment

### Frontend

1. Build the production bundle:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the contents of the `dist` directory to your web server.

### Backend

1. Deploy the entire `src/api` directory to your web server.
2. Configure your web server as described in the Backend Setup section.
3. Make sure to set `DEVELOPMENT_MODE` to `false` in `config.php`.
4. Update database credentials in the production environment.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request
