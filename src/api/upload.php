
<?php
/**
 * File Upload API
 * 
 * Handles POST requests to upload files
 */

require_once 'config.php';

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

// Check if file was uploaded
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $error = isset($_FILES['file']) ? $_FILES['file']['error'] : 'No file uploaded';
    sendError('File upload failed: ' . $error, 400);
}

// Get the path to save the file
$path = isset($_POST['path']) ? sanitizeInput($_POST['path']) : 'general';

// Validate path to prevent directory traversal
if (strpos($path, '..') !== false || strpos($path, '/') === 0) {
    sendError('Invalid upload path', 400);
}

// Valid paths
$validPaths = ['categories', 'courses', 'sliders', 'partners', 'general'];
if (!in_array($path, $validPaths)) {
    $path = 'general'; // Default to general if invalid path
}

// Create directory if it doesn't exist
$uploadDir = UPLOADS_DIR . '/' . $path;
if (!file_exists($uploadDir) && !is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        sendError('Failed to create upload directory', 500);
    }
}

// Get file info
$file = $_FILES['file'];
$fileName = $file['name'];
$fileSize = $file['size'];
$fileTmpName = $file['tmp_name'];
$fileError = $file['error'];
$fileType = $file['type'];

// Validate file type
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
$fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

if (!in_array($fileExtension, $allowedExtensions)) {
    sendError('Invalid file type. Allowed types: ' . implode(', ', $allowedExtensions), 400);
}

// Generate unique filename
$newFileName = generateUuid() . '.' . $fileExtension;
$destination = $uploadDir . '/' . $newFileName;

// Move the uploaded file
if (!move_uploaded_file($fileTmpName, $destination)) {
    sendError('Failed to move uploaded file', 500);
}

// Create public URL
$baseUrl = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
$baseUrl .= $_SERVER['HTTP_HOST'];

// Determine the public path - this may need adjustment based on your server setup
$uploadsDirName = basename(UPLOADS_DIR);
$publicPath = "/uploads/{$path}/{$newFileName}";

// In development mode, return mock URL
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    sendResponse([
        'url' => $publicPath,
        'filename' => $newFileName,
        'originalName' => $fileName
    ]);
}

// In production, save file information to database
try {
    $conn = getDBConnection();
    
    // Insert file info into uploads table (you'd need to create this table)
    $query = "INSERT INTO uploads (filename, original_name, file_path, mime_type, file_size) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssi', $newFileName, $fileName, $publicPath, $fileType, $fileSize);
    $stmt->execute();
    
    $conn->close();
    
    sendResponse([
        'url' => $publicPath,
        'filename' => $newFileName,
        'originalName' => $fileName
    ]);
} catch (Exception $e) {
    // Just log the error but still return the public path
    error_log('Error saving file info to database: ' . $e->getMessage());
    
    sendResponse([
        'url' => $publicPath,
        'filename' => $newFileName,
        'originalName' => $fileName
    ]);
}
