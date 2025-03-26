
<?php
/**
 * Categories API
 * 
 * Handles GET requests to fetch all categories
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

// Get database connection
$conn = getDBConnection();

try {
    // Query to get all categories with their subcategories
    $categoriesQuery = "
        SELECT 
            c.id, 
            c.name, 
            c.name_ar, 
            c.slug
        FROM 
            categories c
        ORDER BY 
            c.name
    ";
    
    $categoriesResult = $conn->query($categoriesQuery);
    
    if (!$categoriesResult) {
        throw new Exception("Database query error: " . $conn->error);
    }
    
    $categories = [];
    
    while ($category = $categoriesResult->fetch_assoc()) {
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
        $categories[] = $category;
    }
    
    // Return categories and subcategories
    sendResponse($categories);
    
} catch (Exception $e) {
    sendError("Error fetching categories: " . $e->getMessage(), 500);
} finally {
    $conn->close();
}
