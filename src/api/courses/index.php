
<?php
/**
 * Courses API
 * 
 * Handles GET requests to fetch all courses
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
    // Query to get all active courses with their categories
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
            c.status,
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
            c.status = 'active'
        ORDER BY 
            c.featured DESC, c.title ASC
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
            LIMIT 3
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
    
    // Return courses
    sendResponse($courses);
    
} catch (Exception $e) {
    sendError("Error fetching courses: " . $e->getMessage(), 500);
} finally {
    $conn->close();
}
