
<?php
/**
 * Database Configuration
 * 
 * This file contains the database connection configuration
 * and helper functions for database operations.
 */

// Define if we're in development mode
// This will return mock data instead of hitting the database
// Change to false when deploying to production
define('DEVELOPMENT_MODE', true);

// Database connection details - update these with your real database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root'); // Your database username
define('DB_PASS', ''); // Your database password 
define('DB_NAME', 'excellence_training');

// Create a database connection
function getDBConnection() {
    // If in development mode and mock data is being used, return null
    if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
        // Return a mock connection or null when in development
        return null;
    }
    
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset to utf8mb4
    $conn->set_charset("utf8mb4");
    
    return $conn;
}

// Helper function to generate UUID v4
function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

// Helper function to sanitize input
function sanitizeInput($input) {
    $input = trim($input);
    $input = htmlspecialchars($input);
    return $input;
}

// Helper function to generate slugs
function generateSlug($text) {
    // Replace non letter or digits by -
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    // Transliterate
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    // Remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);
    // Trim
    $text = trim($text, '-');
    // Remove duplicate -
    $text = preg_replace('~-+~', '-', $text);
    // Lowercase
    $text = strtolower($text);
    
    if (empty($text)) {
        return 'n-a';
    }
    
    return $text;
}

// Helper function to create API response
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Helper function to handle errors
function sendError($message, $statusCode = 400) {
    sendResponse(['error' => $message], $statusCode);
}
