
<?php
/**
 * Featured Courses API
 * 
 * Handles GET requests to fetch featured courses
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

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
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
        ],
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
            'subcategory_id' => '202',
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
        ],
        [
            'id' => '3',
            'title' => 'Digital Marketing Fundamentals',
            'title_ar' => 'أساسيات التسويق الرقمي',
            'slug' => 'digital-marketing-fundamentals',
            'short_description' => 'Learn the essential strategies for digital marketing',
            'short_description_ar' => 'تعلم الاستراتيجيات الأساسية للتسويق الرقمي',
            'price' => 249.99,
            'discount_price' => 199.99,
            'duration' => '3 weeks',
            'level' => 'Beginner',
            'featured' => true,
            'image_url' => '/images/courses/digital-marketing.jpg',
            'category_id' => '3',
            'subcategory_id' => '301',
            'category_name' => 'Marketing',
            'category_name_ar' => 'التسويق',
            'category_slug' => 'marketing',
            'subcategory_name' => 'Digital Marketing',
            'subcategory_name_ar' => 'التسويق الرقمي',
            'subcategory_slug' => 'digital-marketing',
            'sessions' => [
                [
                    'id' => '301',
                    'start_date' => '2023-07-20',
                    'end_date' => '2023-08-10',
                    'location' => 'Online',
                    'location_ar' => 'عبر الإنترنت',
                    'capacity' => 35,
                    'registration_count' => 20
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
    // Query to get featured courses
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
            c.featured = 1 AND c.status = 'active'
        ORDER BY 
            c.title
        LIMIT 6
    ";
    
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Database query error: " . $conn->error);
    }
    
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
            LIMIT 1
        ";
        
        $stmt = $conn->prepare($sessionsQuery);
        $stmt->bind_param("s", $course['id']);
        $stmt->execute();
        $sessionsResult = $stmt->get_result();
        
        $sessions = [];
        while ($session = $sessionsResult->fetch_assoc()) {
            $sessions[] = $session;
        }
        
        // Add sessions to course
        $course['sessions'] = $sessions;
        $courses[] = $course;
    }
    
    // Return featured courses
    sendResponse($courses);
    
} catch (Exception $e) {
    sendError("Error fetching featured courses: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
