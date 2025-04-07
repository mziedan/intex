
<?php
/**
 * Company Info API
 * 
 * Handles GET requests to fetch company information
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
    $mockCompanyInfo = [
        'id' => '1',
        'name' => 'Excellence Training',
        'name_ar' => 'التميز للتدريب',
        'description' => 'We provide professional training courses led by industry experts. Our programs are designed to enhance skills and advance careers.',
        'description_ar' => 'نقدم دورات تدريبية احترافية بقيادة خبراء في المجال. برامجنا مصممة لتعزيز المهارات وتطوير المسارات المهنية.',
        'phone' => '+971 4 123 4567',
        'email' => 'info@excellencetraining.com',
        'address' => 'Dubai Silicon Oasis, Dubai, UAE',
        'address_ar' => 'واحة دبي للسيليكون، دبي، الإمارات العربية المتحدة',
        'facebook' => 'https://facebook.com/excellencetraining',
        'twitter' => 'https://twitter.com/excellencetraining',
        'linkedin' => 'https://linkedin.com/company/excellencetraining',
        'instagram' => 'https://instagram.com/excellencetraining',
        'map_location' => '25.1207,55.3773'
    ];
    sendResponse($mockCompanyInfo);
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Query to get company info
    $query = "
        SELECT 
            id, 
            name, 
            name_ar, 
            description, 
            description_ar,
            phone,
            email,
            address,
            address_ar,
            facebook,
            twitter,
            linkedin,
            instagram,
            map_location
        FROM 
            company_info
        LIMIT 1
    ";
    
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Database query error: " . $conn->error);
    }
    
    if ($result->num_rows === 0) {
        sendError('Company info not found', 404);
    }
    
    $companyInfo = $result->fetch_assoc();
    
    // Return company info
    sendResponse($companyInfo);
    
} catch (Exception $e) {
    sendError("Error fetching company info: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
