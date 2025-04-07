
<?php
/**
 * Upcoming Sessions API
 * 
 * Handles GET requests to fetch upcoming sessions for a course
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

// Get course ID from URL
$courseId = isset($segments[2]) ? $segments[2] : null;

if (empty($courseId)) {
    sendError('Course ID is required', 400);
}

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    $mockSessions = [
        [
            'id' => '101',
            'start_date' => '2023-07-15',
            'end_date' => '2023-08-12',
            'location' => 'Online',
            'location_ar' => 'عبر الإنترنت',
            'capacity' => 30,
            'price' => null, // Uses course price by default
            'registration_count' => 12
        ],
        [
            'id' => '102',
            'start_date' => '2023-08-20',
            'end_date' => '2023-09-17',
            'location' => 'Dubai, UAE',
            'location_ar' => 'دبي، الإمارات العربية المتحدة',
            'capacity' => 15,
            'price' => 299.99, // Session-specific price
            'registration_count' => 3
        ]
    ];
    sendResponse($mockSessions);
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Query to get upcoming sessions for a course
    $query = "
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
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $courseId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $sessions = [];
    while ($session = $result->fetch_assoc()) {
        $sessions[] = $session;
    }
    
    // Return upcoming sessions
    sendResponse($sessions);
    
} catch (Exception $e) {
    sendError("Error fetching upcoming sessions: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
