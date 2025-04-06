
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

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    // Mock data for some common category slugs
    $mockCategories = [
        'business' => [
            'id' => '1',
            'name' => 'Business',
            'name_ar' => 'الأعمال',
            'slug' => 'business',
            'subcategories' => [
                [
                    'id' => '101',
                    'name' => 'Management',
                    'name_ar' => 'الإدارة',
                    'slug' => 'management'
                ],
                [
                    'id' => '102',
                    'name' => 'Leadership',
                    'name_ar' => 'القيادة',
                    'slug' => 'leadership'
                ]
            ]
        ],
        'technology' => [
            'id' => '2',
            'name' => 'Technology',
            'name_ar' => 'التكنولوجيا',
            'slug' => 'technology',
            'subcategories' => [
                [
                    'id' => '201',
                    'name' => 'Programming',
                    'name_ar' => 'البرمجة',
                    'slug' => 'programming'
                ],
                [
                    'id' => '202',
                    'name' => 'Data Science',
                    'name_ar' => 'علوم البيانات',
                    'slug' => 'data-science'
                ]
            ]
        ],
        'marketing' => [
            'id' => '3',
            'name' => 'Marketing',
            'name_ar' => 'التسويق',
            'slug' => 'marketing',
            'subcategories' => [
                [
                    'id' => '301',
                    'name' => 'Digital Marketing',
                    'name_ar' => 'التسويق الرقمي',
                    'slug' => 'digital-marketing'
                ],
                [
                    'id' => '302',
                    'name' => 'Social Media',
                    'name_ar' => 'وسائل التواصل الاجتماعي',
                    'slug' => 'social-media'
                ]
            ]
        ]
    ];
    
    if (isset($mockCategories[$slug])) {
        sendResponse($mockCategories[$slug]);
    } else {
        sendError('Category not found', 404);
    }
    exit;
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
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
