
<?php
/**
 * Active Sliders API
 * 
 * Handles GET requests to fetch active slider images
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

// In development environment or when database is not yet set up
// return mock data to ensure the UI works correctly
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    $mockSliders = [
        [
            'id' => '1',
            'title' => 'Enhance Your Skills',
            'title_ar' => 'تعزيز مهاراتك',
            'subtitle' => 'Join our world-class training programs to advance your career',
            'subtitle_ar' => 'انضم إلى برامجنا التدريبية ذات المستوى العالمي لتطوير حياتك المهنية',
            'image_url' => '/images/slider/slide1.jpg',
            'button_text' => 'Explore Courses',
            'button_text_ar' => 'استكشف الدورات',
            'button_link' => '/courses'
        ],
        [
            'id' => '2',
            'title' => 'Learn from Experts',
            'title_ar' => 'تعلم من الخبراء',
            'subtitle' => 'Our instructors bring years of industry experience to the classroom',
            'subtitle_ar' => 'يجلب مدرسونا سنوات من الخبرة في الصناعة إلى الفصل الدراسي',
            'image_url' => '/images/slider/slide2.jpg',
            'button_text' => 'Meet Our Team',
            'button_text_ar' => 'قابل فريقنا',
            'button_link' => '/about'
        ]
    ];
    sendResponse($mockSliders);
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Query to get active slider images
    $query = "
        SELECT 
            id, 
            title, 
            title_ar, 
            subtitle, 
            subtitle_ar,
            image_url,
            button_text,
            button_text_ar,
            button_link
        FROM 
            slider_images
        WHERE 
            is_active = 1
        ORDER BY 
            display_order ASC
    ";
    
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Database query error: " . $conn->error);
    }
    
    $sliders = [];
    
    while ($slider = $result->fetch_assoc()) {
        $sliders[] = $slider;
    }
    
    // Return active sliders
    sendResponse($sliders);
    
} catch (Exception $e) {
    sendError("Error fetching sliders: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
