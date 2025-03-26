
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
    $conn->close();
}
