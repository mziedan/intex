
<?php
/**
 * Course Details API
 * 
 * Handles GET requests to fetch a single course by slug
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
    sendError('Course slug is required', 400);
}

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    // Mock data for some common course slugs
    $mockCourses = [
        'leadership-essentials' => [
            'id' => '1',
            'title' => 'Leadership Essentials',
            'title_ar' => 'أساسيات القيادة',
            'slug' => 'leadership-essentials',
            'short_description' => 'Learn the core principles of effective leadership',
            'short_description_ar' => 'تعلم المبادئ الأساسية للقيادة الفعالة',
            'description' => 'This comprehensive leadership course will teach you the skills needed to lead teams effectively in today\'s dynamic business environment. You\'ll learn communication strategies, conflict resolution, and how to inspire your team to achieve their best performance.',
            'description_ar' => 'ستعلمك دورة القيادة الشاملة هذه المهارات اللازمة لقيادة الفرق بفعالية في بيئة الأعمال الديناميكية اليوم. ستتعلم استراتيجيات الاتصال وحل النزاعات وكيفية إلهام فريقك لتحقيق أفضل أداء لهم.',
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
                ],
                [
                    'id' => '102',
                    'start_date' => '2023-08-20',
                    'end_date' => '2023-09-17',
                    'location' => 'Dubai, UAE',
                    'location_ar' => 'دبي، الإمارات العربية المتحدة',
                    'capacity' => 15,
                    'registration_count' => 3
                ]
            ]
        ],
        'python-data-science' => [
            'id' => '2',
            'title' => 'Python for Data Science',
            'title_ar' => 'بايثون لعلوم البيانات',
            'slug' => 'python-data-science',
            'short_description' => 'Master Python programming for data analysis',
            'short_description_ar' => 'إتقان برمجة بايثون لتحليل البيانات',
            'description' => 'This course covers Python programming with a focus on data science applications. You\'ll learn libraries like NumPy, Pandas, and Matplotlib to analyze data, create visualizations, and build machine learning models using scikit-learn.',
            'description_ar' => 'تغطي هذه الدورة برمجة Python مع التركيز على تطبيقات علوم البيانات. ستتعلم مكتبات مثل NumPy و Pandas و Matplotlib لتحليل البيانات وإنشاء التصورات وبناء نماذج التعلم الآلي باستخدام scikit-learn.',
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
        ]
    ];
    
    if (isset($mockCourses[$slug])) {
        sendResponse($mockCourses[$slug]);
    } else {
        sendError('Course not found', 404);
    }
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Query to get course details by slug
    $query = "
        SELECT 
            c.id, 
            c.title, 
            c.title_ar, 
            c.slug, 
            c.short_description, 
            c.short_description_ar,
            c.description,
            c.description_ar,
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
            c.slug = ? AND
            c.status = 'active'
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $slug);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Course not found', 404);
    }
    
    $course = $result->fetch_assoc();
    
    // Get upcoming sessions for this course
    $sessionsQuery = "
        SELECT 
            s.id, 
            s.start_date, 
            s.end_date, 
            s.location,
            s.location_ar,
            s.capacity,
            s.price,
            (SELECT COUNT(*) FROM registrations r WHERE r.session_id = s.id) as registration_count
        FROM 
            sessions s
        WHERE 
            s.course_id = ? AND
            s.status = 'upcoming' AND
            s.start_date >= CURDATE()
        ORDER BY 
            s.start_date ASC
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
    
    // Return course details
    sendResponse($course);
    
} catch (Exception $e) {
    sendError("Error fetching course: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
