
<?php
/**
 * Image Upload Handler API
 * 
 * This script handles image uploads for the Excellence Training Platform.
 * It saves images to the specified folder and returns the URL.
 */

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Define allowed folders
$allowedFolders = ['sliders', 'courses', 'categories', 'partners', 'instructors', 'subcategories'];

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
    $baseUrl .= '/uploads/' . $folder . '/' . $newFileName;
    
    echo json_encode([
        'success' => true,
        'imageUrl' => $baseUrl
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save the uploaded file']);
}
