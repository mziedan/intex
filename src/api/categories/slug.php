
<?php
/**
 * Category Details API
 * 
 * Handles GET requests to fetch a single category by slug
 */

require_once '../config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

// Get slug from URL
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathSegments = explode('/', trim($requestPath, '/'));
$slug = end($pathSegments);

if (empty($slug)) {
    sendError('Category slug is required', 400);
}

// Get database connection
$conn = getDBConnection();

try {
    // Query to get category details
    $query = "
        SELECT 
            c.id, 
            c.name, 
            c.name_ar, 
            c.slug
        FROM 
            categories c
        WHERE 
            c.slug = ?
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $slug);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Category not found', 404);
    }
    
    $category = $result->fetch_assoc();
    
    // Get subcategories for this category
    $subcategoriesQuery = "
        SELECT 
            id, 
            name, 
            name_ar, 
            slug
        FROM 
            subcategories
        WHERE 
            category_id = ?
        ORDER BY 
            name
    ";
    
    $stmt = $conn->prepare($subcategoriesQuery);
    $stmt->bind_param("s", $category['id']);
    $stmt->execute();
    $subcategoriesResult = $stmt->get_result();
    
    $subcategories = [];
    while ($subcategory = $subcategoriesResult->fetch_assoc()) {
        $subcategories[] = $subcategory;
    }
    
    // Add subcategories to category
    $category['subcategories'] = $subcategories;
    
    // Return category details
    sendResponse($category);
    
} catch (Exception $e) {
    sendError("Error fetching category: " . $e->getMessage(), 500);
} finally {
    $conn->close();
}
