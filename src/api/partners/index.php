
<?php
/**
 * Partners API
 * 
 * Handles GET requests to fetch all active partners
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
    $mockPartners = [
        [
            'id' => '1',
            'name' => 'Global Innovations',
            'logo_url' => '/images/partners/partner1.jpg',
            'website_url' => 'https://example.com/partner1'
        ],
        [
            'id' => '2',
            'name' => 'Tech Solutions Inc.',
            'logo_url' => '/images/partners/partner2.jpg',
            'website_url' => 'https://example.com/partner2'
        ],
        [
            'id' => '3',
            'name' => 'Future Academy',
            'logo_url' => '/images/partners/partner3.jpg',
            'website_url' => 'https://example.com/partner3'
        ],
        [
            'id' => '4',
            'name' => 'Business Hub',
            'logo_url' => '/images/partners/partner4.jpg',
            'website_url' => 'https://example.com/partner4'
        ],
        [
            'id' => '5',
            'name' => 'Innovation Labs',
            'logo_url' => '/images/partners/partner5.jpg',
            'website_url' => 'https://example.com/partner5'
        ]
    ];
    sendResponse($mockPartners);
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Query to get all active partners
    $query = "
        SELECT 
            id, 
            name, 
            logo_url,
            website_url
        FROM 
            partners
        WHERE 
            is_active = 1
        ORDER BY 
            display_order ASC, name ASC
    ";
    
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Database query error: " . $conn->error);
    }
    
    $partners = [];
    
    while ($partner = $result->fetch_assoc()) {
        $partners[] = $partner;
    }
    
    // Return partners
    sendResponse($partners);
    
} catch (Exception $e) {
    sendError("Error fetching partners: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
