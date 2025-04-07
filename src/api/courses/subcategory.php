
<?php
/**
 * Courses by Subcategory API
 * 
 * Handles GET requests to fetch courses by subcategory ID
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

// Get subcategory ID from URL
$subcategoryId = isset($segments[2]) ? $segments[2] : null;

if (empty($subcategoryId)) {
    sendError('Subcategory ID is required', 400);
}

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    // Generate mock data for the subcategory courses
    $mockCourses = [
        [
            'id' => '2',
            'title' => 'Python for Data Science',
            'title_ar' => 'بايثون لعلوم البيانات',
            'slug' => 'python-data-science',
            'short_description' => 'Master Python programming for data analysis',
            'short_description_ar' => 'إتقان برمجة بايثون لتحليل البيانات',
            'price' => 349.99,
            'discount_price' => 299.99,
            'duration' => '6 weeks',
            'level' => 'Beginner',
            'featured' => true,
            'image_url' => '/images/courses/python.jpg',
            'category_id' => '2',
            'subcategory_id' => $subcategoryId,
            'category_name' => 'Technology',
            'category_name_ar' => 'التكنولوجيا',
            'category_slug' => 'technology',
            'subcategory_name' => 'Data Science',
            'subcategory_name_ar' => 'علوم البيانات',
            'subcategory_slug' => 'data-science',
            'sessions' => [
                [
                    'id' => '201',
                    'start_date' => '2023-08-01',
                    'end_date' => '2023-09-15',
                    'location' => 'Online',
                    'location_ar' => 'عبر الإنترنت',
                    'capacity' => 25,
                    'registration_count' => 18
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
    // Query to get courses by subcategory ID
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
            c.subcategory_id = ? AND
            c.status = 'active'
        ORDER BY 
            c.featured DESC, c.title ASC
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $subcategoryId);
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
    
    // Return courses for the subcategory
    sendResponse($courses);
    
} catch (Exception $e) {
    sendError("Error fetching courses by subcategory: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
