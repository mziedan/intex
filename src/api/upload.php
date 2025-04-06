
<?php
/**
 * Image Upload Handler API
 * 
 * This script handles image uploads for the Excellence Training Platform.
 * It saves images to the specified folder and returns the URL.
 */

require_once 'config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Development');

// Define allowed folders
$allowedFolders = ['sliders', 'courses', 'categories', 'subcategories', 'partners', 'instructors'];

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Check if file was submitted
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No image uploaded or upload error']);
    exit;
}

// Check if folder was specified and is allowed
if (!isset($_POST['folder']) || !in_array($_POST['folder'], $allowedFolders)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing folder parameter']);
    exit;
}

// For development: Check the X-Development header
if (isset($_SERVER['HTTP_X_DEVELOPMENT']) && $_SERVER['HTTP_X_DEVELOPMENT'] === 'true' || DEVELOPMENT_MODE) {
    // Return a mock URL for development
    $mockUrl = '/mock-uploads/' . $_POST['folder'] . '/' . uniqid() . '.jpg';
    echo json_encode([
        'success' => true,
        'imageUrl' => $mockUrl
    ]);
    exit;
}

$folder = $_POST['folder'];
$uploadDir = "../uploads/{$folder}/";

// Create directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Get file info
$file = $_FILES['image'];
$fileName = $file['name'];
$fileType = $file['type'];
$fileTmpName = $file['tmp_name'];
$fileError = $file['error'];
$fileSize = $file['size'];

// Validate file type
$allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($fileType, $allowedFileTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.']);
    exit;
}

// Validate file size (max 2MB)
$maxFileSize = 2 * 1024 * 1024; // 2MB
if ($fileSize > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File is too large. Maximum size is 2MB.']);
    exit;
}

// Generate a unique filename
$extension = pathinfo($fileName, PATHINFO_EXTENSION);
$newFileName = uniqid() . '.' . $extension;
$destination = $uploadDir . $newFileName;

// Move the uploaded file to the destination
if (move_uploaded_file($fileTmpName, $destination)) {
    // Return the URL of the uploaded file
    $baseUrl = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $baseUrl .= $_SERVER['HTTP_HOST'];
    $uploadUrl = '/uploads/' . $folder . '/' . $newFileName;
    
    echo json_encode([
        'success' => true,
        'imageUrl' => $uploadUrl
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save the uploaded file']);
}
