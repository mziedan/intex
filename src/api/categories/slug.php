
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
header('Access-Control-Allow-Headers: Content-Type, X-Development');

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
            'image_url' => '/images/categories/business.jpg',
            'subcategories' => [
                [
                    'id' => '101',
                    'name' => 'Management',
                    'name_ar' => 'الإدارة',
                    'slug' => 'management',
                    'image_url' => '/images/subcategories/management.jpg'
                ],
                [
                    'id' => '102',
                    'name' => 'Leadership',
                    'name_ar' => 'القيادة',
                    'slug' => 'leadership',
                    'image_url' => '/images/subcategories/leadership.jpg'
                ]
            ]
        ],
        'technology' => [
            'id' => '2',
            'name' => 'Technology',
            'name_ar' => 'التكنولوجيا',
            'slug' => 'technology',
            'image_url' => '/images/categories/technology.jpg',
            'subcategories' => [
                [
                    'id' => '201',
                    'name' => 'Programming',
                    'name_ar' => 'البرمجة',
                    'slug' => 'programming',
                    'image_url' => '/images/subcategories/programming.jpg'
                ],
                [
                    'id' => '202',
                    'name' => 'Data Science',
                    'name_ar' => 'علوم البيانات',
                    'slug' => 'data-science',
                    'image_url' => '/images/subcategories/data-science.jpg'
                ]
            ]
        ],
        'marketing' => [
            'id' => '3',
            'name' => 'Marketing',
            'name_ar' => 'التسويق',
            'slug' => 'marketing',
            'image_url' => '/images/categories/marketing.jpg',
            'subcategories' => [
                [
                    'id' => '301',
                    'name' => 'Digital Marketing',
                    'name_ar' => 'التسويق الرقمي',
                    'slug' => 'digital-marketing',
                    'image_url' => '/images/subcategories/digital-marketing.jpg'
                ],
                [
                    'id' => '302',
                    'name' => 'Social Media',
                    'name_ar' => 'وسائل التواصل الاجتماعي',
                    'slug' => 'social-media',
                    'image_url' => '/images/subcategories/social-media.jpg'
                ]
            ]
        ],
        'hr-development' => [
            'id' => '4',
            'name' => 'HR & Development',
            'name_ar' => 'الموارد البشرية والتطوير',
            'slug' => 'hr-development',
            'image_url' => '/images/categories/hr.jpg',
            'subcategories' => [
                [
                    'id' => '401',
                    'name' => 'Talent Management',
                    'name_ar' => 'إدارة المواهب',
                    'slug' => 'talent-management',
                    'image_url' => '/images/subcategories/talent-management.jpg'
                ],
                [
                    'id' => '402',
                    'name' => 'Employee Training',
                    'name_ar' => 'تدريب الموظفين',
                    'slug' => 'employee-training',
                    'image_url' => '/images/subcategories/employee-training.jpg'
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
            c.slug,
            c.image_url
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
            slug,
            image_url
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
