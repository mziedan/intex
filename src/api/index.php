
<?php
/**
 * Excellence Training API - Main Entry Point
 * 
 * This script routes API requests to the appropriate handler.
 */

// Set CORS headers to allow requests from any origin during development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Development');

// If this is a preflight OPTIONS request, return early with 200
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include configuration
require_once 'config.php';

// Parse the request URI to determine which API endpoint is being accessed
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

// Remove trailing slash if present
$path = rtrim($path, '/');

// Split the path into segments
$segments = explode('/', $path);

// Route the request to the appropriate handler
if (empty($path)) {
    // API root - return documentation link or basic info
    sendResponse([
        'message' => 'Welcome to the Excellence Training API',
        'version' => '1.0',
        'documentation' => '/api/docs',
    ]);
} else {
    // Route based on the first segment
    $resource = $segments[0] ?? '';
    
    switch ($resource) {
        case 'categories':
            if (isset($segments[1])) {
                // Category by slug
                include 'categories/slug.php';
            } else {
                // All categories
                include 'categories/index.php';
            }
            break;
            
        case 'courses':
            if (isset($segments[1])) {
                if ($segments[1] === 'featured') {
                    // Featured courses
                    include 'courses/featured.php';
                } elseif ($segments[1] === 'category' && isset($segments[2])) {
                    // Courses by category
                    include 'courses/category.php';
                } elseif ($segments[1] === 'subcategory' && isset($segments[2])) {
                    // Courses by subcategory
                    include 'courses/subcategory.php';
                } elseif ($segments[1] === 'search') {
                    // Search courses
                    include 'courses/search.php';
                } else {
                    // Course by slug
                    include 'courses/slug.php';
                }
            } else {
                // All courses
                include 'courses/index.php';
            }
            break;
            
        case 'sessions':
            if (isset($segments[1]) && $segments[1] === 'upcoming' && isset($segments[2])) {
                // Upcoming sessions for a course
                include 'sessions/upcoming.php';
            } else {
                sendError('Invalid sessions endpoint', 404);
            }
            break;
            
        case 'registrations':
            // Create registration
            include 'registrations/create.php';
            break;
            
        case 'sliders':
            if (isset($segments[1]) && $segments[1] === 'active') {
                // Active sliders
                include 'sliders/active.php';
            } else {
                sendError('Invalid sliders endpoint', 404);
            }
            break;
            
        case 'partners':
            // All partners
            include 'partners/index.php';
            break;
            
        case 'company-info':
            // Company info
            include 'company-info/index.php';
            break;
            
        case 'pages':
            if (isset($segments[1])) {
                // Custom page by slug
                include 'pages/slug.php';
            } else {
                sendError('Page slug is required', 400);
            }
            break;
            
        case 'upload':
            // Image upload
            include 'upload.php';
            break;
            
        case 'docs':
            // API documentation
            header('Content-Type: text/markdown');
            readfile('../API_DOCUMENTATION.md');
            exit;
            
        default:
            sendError('Unknown resource: ' . $resource, 404);
    }
}

// If we get here, the route handler didn't send a response
sendError('Endpoint not implemented', 501);
