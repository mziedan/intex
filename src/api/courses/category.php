
<?php
/**
 * Courses by Category API
 * 
 * Handles GET requests to fetch courses by category ID
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

// Get category ID from URL
$categoryId = isset($segments[2]) ? $segments[2] : null;

if (empty($categoryId)) {
    sendError('Category ID is required', 400);
}

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    // Generate mock data for the category courses
    $mockCourses = [
        [
            'id' => '1',
            'title' => 'Leadership Essentials',
            'title_ar' => 'أساسيات القيادة',
            'slug' => 'leadership-essentials',
            'short_description' => 'Learn the core principles of effective leadership',
            'short_description_ar' => 'تعلم المبادئ الأساسية للقيادة الفعالة',
            'price' => 299.99,
            'discount_price' => 249.99,
            'duration' => '4 weeks',
            'level' => 'Intermediate',
            'featured' => true,
            'image_url' => '/images/courses/leadership.jpg',
            'category_id' => $categoryId,
            'subcategory_id' => '102',
            'category_name' => 'Business',
            'category_name_ar' => 'الأعمال',
            'category_slug' => 'business',
            'subcategory_name' => 'Leadership',
            'subcategory_name_ar' => 'القيادة',
            'subcategory_slug' => 'leadership',
            'sessions' => [
                [
                    'id' => '101',
                    'start_date' => '2023-07-15',
                    'end_date' => '2023-08-12',
                    'location' => 'Online',
                    'location_ar' => 'عبر الإنترنت',
                    'capacity' => 30,
                    'registration_count' => 12
                ]
            ]
        ],
        [
            'id' => '4',
            'title' => 'Project Management Professional',
            'title_ar' => 'محترف إدارة المشاريع',
            'slug' => 'project-management-professional',
            'short_description' => 'Prepare for the PMP certification with our comprehensive course',
            'short_description_ar' => 'استعد لشهادة PMP مع دورتنا الشاملة',
            'price' => 499.99,
            'discount_price' => 449.99,
            'duration' => '8 weeks',
            'level' => 'Advanced',
            'featured' => false,
            'image_url' => '/images/courses/project-management.jpg',
            'category_id' => $categoryId,
            'subcategory_id' => '101',
            'category_name' => 'Business',
            'category_name_ar' => 'الأعمال',
            'category_slug' => 'business',
            'subcategory_name' => 'Management',
            'subcategory_name_ar' => 'الإدارة',
            'subcategory_slug' => 'management',
            'sessions' => [
                [
                    'id' => '401',
                    'start_date' => '2023-09-01',
                    'end_date' => '2023-10-31',
                    'location' => 'Online',
                    'location_ar' => 'عبر الإنترنت',
                    'capacity' => 20,
                    'registration_count' => 5
                ]
            ]
        ]
    ];
    sendResponse($mockCourses);
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Query to get courses by category ID
    $query = "
        SELECT 
            c.id, 
            c.title, 
            c.title_ar, 
            c.slug, 
            c.short_description, 
            c.short_description_ar,
            c.price,
            c.discount_price,
            c.duration,
            c.level,
            c.featured,
            c.image_url,
            c.category_id,
            c.subcategory_id,
            cat.name as category_name,
            cat.name_ar as category_name_ar,
            cat.slug as category_slug,
            subcat.name as subcategory_name,
            subcat.name_ar as subcategory_name_ar,
            subcat.slug as subcategory_slug
        FROM 
            courses c
        JOIN 
            categories cat ON c.category_id = cat.id
        LEFT JOIN 
            subcategories subcat ON c.subcategory_id = subcat.id
        WHERE 
            c.category_id = ? AND
            c.status = 'active'
        ORDER BY 
            c.featured DESC, c.title ASC
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $categoryId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $courses = [];
    
    while ($course = $result->fetch_assoc()) {
        // Get upcoming sessions for this course
        $sessionsQuery = "
            SELECT 
                s.id, 
                s.start_date, 
                s.end_date, 
                s.location,
                s.location_ar,
                s.capacity,
                (SELECT COUNT(*) FROM registrations r WHERE r.session_id = s.id) as registration_count
            FROM 
                sessions s
            WHERE 
                s.course_id = ? AND
                s.status = 'upcoming' AND
                s.start_date >= CURDATE()
            ORDER BY 
                s.start_date ASC
            LIMIT 3
        ";
        
        $stmtSessions = $conn->prepare($sessionsQuery);
        $stmtSessions->bind_param("s", $course['id']);
        $stmtSessions->execute();
        $sessionsResult = $stmtSessions->get_result();
        
        $sessions = [];
        while ($session = $sessionsResult->fetch_assoc()) {
            $sessions[] = $session;
        }
        
        // Add sessions to course
        $course['sessions'] = $sessions;
        $courses[] = $course;
    }
    
    // Return courses for the category
    sendResponse($courses);
    
} catch (Exception $e) {
    sendError("Error fetching courses by category: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
