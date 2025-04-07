
<?php
/**
 * Create Registration API
 * 
 * Handles POST requests to create a new registration
 */

require_once '../config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Development');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

// Get request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate request data
if (empty($data) || !isset($data['session_id']) || !isset($data['attendee_name']) || !isset($data['attendee_email'])) {
    sendError('Missing required fields: session_id, attendee_name, and attendee_email are required', 400);
}

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    $mockRegistration = [
        'id' => generateUUID(),
        'session_id' => $data['session_id'],
        'attendee_name' => $data['attendee_name'],
        'attendee_email' => $data['attendee_email'],
        'company' => $data['company'] ?? null,
        'job_title' => $data['job_title'] ?? null,
        'phone' => $data['phone'] ?? null,
        'payment_status' => 'pending',
        'payment_amount' => 299.99, // Mock amount
        'created_at' => date('Y-m-d H:i:s')
    ];
    sendResponse($mockRegistration);
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Sanitize input data
    $sessionId = sanitizeInput($data['session_id']);
    $attendeeName = sanitizeInput($data['attendee_name']);
    $attendeeEmail = sanitizeInput($data['attendee_email']);
    $company = isset($data['company']) ? sanitizeInput($data['company']) : null;
    $jobTitle = isset($data['job_title']) ? sanitizeInput($data['job_title']) : null;
    $phone = isset($data['phone']) ? sanitizeInput($data['phone']) : null;
    $notes = isset($data['notes']) ? sanitizeInput($data['notes']) : null;
    $userId = isset($data['user_id']) ? sanitizeInput($data['user_id']) : null;
    
    // Get session and course details to determine payment amount
    $query = "
        SELECT 
            s.price as session_price,
            c.price as course_price,
            c.discount_price as course_discount_price
        FROM 
            sessions s
        JOIN 
            courses c ON s.course_id = c.id
        WHERE 
            s.id = ?
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $sessionId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Session not found', 404);
    }
    
    $priceData = $result->fetch_assoc();
    
    // Determine payment amount
    if ($priceData['session_price'] !== null) {
        // Use session-specific price if available
        $paymentAmount = $priceData['session_price'];
    } else if ($priceData['course_discount_price'] !== null) {
        // Use course discount price if available
        $paymentAmount = $priceData['course_discount_price'];
    } else {
        // Use regular course price
        $paymentAmount = $priceData['course_price'];
    }
    
    // Generate a unique ID for the registration
    $registrationId = generateUUID();
    
    // Insert registration into database
    $insertQuery = "
        INSERT INTO registrations (
            id, 
            session_id, 
            user_id,
            attendee_name, 
            attendee_email, 
            company, 
            job_title, 
            phone, 
            payment_status, 
            payment_amount,
            notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    ";
    
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param(
        "ssssssssds", 
        $registrationId, 
        $sessionId, 
        $userId,
        $attendeeName, 
        $attendeeEmail, 
        $company, 
        $jobTitle, 
        $phone, 
        $paymentAmount,
        $notes
    );
    $stmt->execute();
    
    if ($stmt->affected_rows === 0) {
        throw new Exception("Failed to create registration");
    }
    
    // Return the created registration
    $response = [
        'id' => $registrationId,
        'session_id' => $sessionId,
        'attendee_name' => $attendeeName,
        'attendee_email' => $attendeeEmail,
        'company' => $company,
        'job_title' => $jobTitle,
        'phone' => $phone,
        'payment_status' => 'pending',
        'payment_amount' => $paymentAmount,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    sendResponse($response);
    
} catch (Exception $e) {
    sendError("Error creating registration: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
