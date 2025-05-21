
<?php
/**
 * Excellence Training API - Configuration File
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'excellence_training');
define('DB_USER', 'excellence_user');
define('DB_PASS', 'your_secure_password');

// Development Mode (set to true for mock data, false for database connections)
define('DEVELOPMENT_MODE', true);

// API Configuration
define('API_VERSION', '1.0');
define('UPLOADS_DIR', __DIR__ . '/../uploads');

// Enable error reporting in development mode
if (DEVELOPMENT_MODE) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

// Helper functions

/**
 * Get a database connection
 * @return mysqli Database connection object
 * @throws Exception if connection fails
 */
function getDBConnection() {
    if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
        throw new Exception("Database connection attempted in development mode");
    }
    
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    return $conn;
}

/**
 * Send a successful JSON response
 * @param mixed $data The data to send
 */
function sendResponse($data) {
    header('Content-Type: application/json');
    echo json_encode([
        'data' => $data,
        'success' => true
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Send an error JSON response
 * @param string $message The error message
 * @param int $code The HTTP status code
 */
function sendError($message, $code = 400) {
    header('Content-Type: application/json');
    http_response_code($code);
    echo json_encode([
        'error' => $message,
        'success' => false,
        'code' => $code
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Sanitize user input
 * @param string $input The input to sanitize
 * @return string The sanitized input
 */
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate a UUID v4
 * @return string UUID
 */
function generateUuid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

/**
 * Check if the API request has a development header
 * @return bool True if development mode is requested
 */
function isDevRequest() {
    return isset($_SERVER['HTTP_X_DEVELOPMENT']) && $_SERVER['HTTP_X_DEVELOPMENT'] === 'true';
}

// Ensure the uploads directory exists
if (!file_exists(UPLOADS_DIR) && !is_dir(UPLOADS_DIR)) {
    mkdir(UPLOADS_DIR, 0755, true);
}

// Create subdirectories if they don't exist
$uploadSubdirs = ['categories', 'courses', 'sliders', 'partners', 'pages'];
foreach ($uploadSubdirs as $dir) {
    $path = UPLOADS_DIR . '/' . $dir;
    if (!file_exists($path) && !is_dir($path)) {
        mkdir($path, 0755, true);
    }
}
