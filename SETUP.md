
# Excellence Training Platform - Setup Guide

This document provides step-by-step instructions for setting up the Excellence Training Platform on a shared hosting environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Hosting Requirements](#hosting-requirements)
3. [Database Setup](#database-setup)
4. [File Upload Structure](#file-upload-structure)
5. [Installation Steps](#installation-steps)
6. [Configuration](#configuration)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

## Prerequisites

Before you begin, make sure you have the following:

- Access to your shared hosting control panel (cPanel, Plesk, etc.)
- FTP access credentials
- MySQL database credentials
- Domain name configured to point to your hosting

## Hosting Requirements

The application requires:

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Modern web server (Apache, Nginx)
- PHP extensions: mysqli, json, fileinfo, gd

## Database Setup

1. **Create a database**:
   - Log in to your hosting control panel
   - Navigate to the MySQL Databases section
   - Create a new database (e.g., `excellence_training`)
   - Create a database user and assign it to the database with all privileges

2. **Import the database schema**:
   - Find the `src/database/schema.sql` file in the project
   - Use phpMyAdmin or the MySQL import tool to import this file into your database

3. **Verify the import**:
   - Check that all tables have been created properly
   - Verify that the initial admin user has been created

## File Upload Structure

Create the following directory structure for file uploads:

```
uploads/
├── sliders/
├── courses/
├── categories/
├── subcategories/
├── partners/
└── instructors/
```

Make sure these directories have write permissions (chmod 755 or 775 depending on your hosting).

## Installation Steps

1. **Prepare the build**:
   - On your local machine, run: `npm run build`
   - This will create a `dist` directory with optimized files

2. **Upload files to your hosting**:
   - Connect to your hosting via FTP
   - Upload all files from the `dist` directory to your public_html or www directory
   - Upload the `uploads` directory structure to public_html or www
   - Upload the `src/api` directory to public_html or www

3. **Configure server**:
   
   For Apache, create or modify the `.htaccess` file in your root directory:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteRule ^api/ - [L]
     RewriteRule ^uploads/ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   For Nginx, add this to your server block:

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   
   location /api/ {
     # Pass PHP scripts to PHP-FPM
     include fastcgi_params;
     fastcgi_pass unix:/var/run/php-fpm/www.sock;
     fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
   }
   
   location /uploads/ {
     # Serve static files directly
     try_files $uri =404;
   }
   ```

## Configuration

1. **Database connection**:
   
   Create or modify `api/config.php`:

   ```php
   <?php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'your_db_username');
   define('DB_PASS', 'your_db_password');
   define('DB_NAME', 'your_db_name');
   
   // Create database connection
   function getDBConnection() {
     $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
     if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
     }
     $conn->set_charset("utf8mb4");
     return $conn;
   }
   ?>
   ```

2. **API Base URL**:
   
   Create a `.env.local` file in the root directory with your API URL:

   ```
   VITE_API_BASE_URL=https://yourdomain.com/api
   ```

   Alternatively, you can edit the `index.html` file to include this environment variable:

   ```html
   <script>
     window.ENV = {
       VITE_API_BASE_URL: 'https://yourdomain.com/api'
     };
   </script>
   ```

## Troubleshooting

### Common Issues

1. **API calls returning 404**:
   - Check that the `.htaccess` or Nginx configuration is correct
   - Verify that the API files are in the correct location
   - Check your server's error log

2. **Database connection errors**:
   - Verify the database credentials in `api/config.php`
   - Check that the database user has the correct permissions

3. **Image upload failures**:
   - Check that the upload directories exist and have write permissions
   - Verify that the PHP file upload settings in php.ini are sufficient

4. **Blank white screen**:
   - Check the browser console for JavaScript errors
   - Enable PHP error reporting in your development environment
   - Look at the server error logs

## Maintenance

### Regular Maintenance Tasks

1. **Database Backups**:
   - Set up automated daily backups of your database
   - Store backups in a secure offsite location

2. **File Backups**:
   - Regularly backup the uploaded files
   - Consider using a version control system for code changes

3. **Updates**:
   - Check for updates to the platform periodically
   - Test updates in a staging environment before deploying to production

4. **Security**:
   - Regularly audit user accounts and access
   - Keep your server software and PHP up to date

## Security Considerations

1. **Admin Access**:
   - Change the default admin password immediately after installation
   - Use strong, unique passwords
   - Consider implementing two-factor authentication

2. **File Uploads**:
   - The system validates file types and sizes
   - Regularly check uploaded files for malware
   - Consider implementing virus scanning for uploaded files

3. **API Security**:
   - Implement rate limiting to prevent abuse
   - Use HTTPS for all connections
   - Consider adding API keys for sensitive endpoints

## Support

If you encounter any issues or need assistance, please contact our support team at support@example.com.
