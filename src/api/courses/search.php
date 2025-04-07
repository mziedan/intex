
<?php
/**
 * Course Search API
 * 
 * Handles GET requests to search for courses by query string
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

// Get search query from URL
$query = isset($_GET['q']) ? sanitizeInput($_GET['q']) : '';

if (empty($query)) {
    sendError('Search query is required', 400);
}

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    // Generate mock data for search results
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
            'category_id' => '1',
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
        ]
    ];
    sendResponse($mockCourses);
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Prepare search term for LIKE query
    $searchTerm = '%' . $query . '%';
    
    // Query to search courses by title or description
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
            (c.title LIKE ? OR 
             c.title_ar LIKE ? OR 
             c.short_description LIKE ? OR 
             c.short_description_ar LIKE ? OR 
             c.description LIKE ? OR 
             c.description_ar LIKE ?) AND
            c.status = 'active'
        ORDER BY 
            c.featured DESC, c.title ASC
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssss", $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm);
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
    
    // Return search results
    sendResponse($courses);
    
} catch (Exception $e) {
    sendError("Error searching courses: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
