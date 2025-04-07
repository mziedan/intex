
<?php
/**
 * Custom Page API
 * 
 * Handles GET requests to fetch a custom page by slug
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

// Get slug from URL
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathSegments = explode('/', trim($requestPath, '/'));
$slug = end($pathSegments);

if (empty($slug)) {
    sendError('Page slug is required', 400);
}

// In development mode, return mock data
if (defined('DEVELOPMENT_MODE') && DEVELOPMENT_MODE) {
    // Mock data for some common page slugs
    $mockPages = [
        'about-us' => [
            'id' => '1',
            'title' => 'About Us',
            'title_ar' => 'من نحن',
            'slug' => 'about-us',
            'content' => '<h2>Our Mission</h2><p>To provide high-quality professional training that empowers individuals and organizations to achieve their full potential.</p><h2>Our Vision</h2><p>To be the leading training provider in the region, recognized for excellence, innovation, and positive impact.</p>',
            'content_ar' => '<h2>مهمتنا</h2><p>توفير تدريب مهني عالي الجودة يمكّن الأفراد والمؤسسات من تحقيق إمكاناتهم الكاملة.</p><h2>رؤيتنا</h2><p>أن نكون مزود التدريب الرائد في المنطقة، معروفين بالتميز والابتكار والتأثير الإيجابي.</p>',
            'image' => '/images/pages/about.jpg'
        ],
        'privacy-policy' => [
            'id' => '2',
            'title' => 'Privacy Policy',
            'title_ar' => 'سياسة الخصوصية',
            'slug' => 'privacy-policy',
            'content' => '<h2>Privacy Policy</h2><p>This Privacy Policy describes how we collect, use, and handle your personal information when you use our services.</p><h3>Information We Collect</h3><p>We collect information to provide better services to our users.</p>',
            'content_ar' => '<h2>سياسة الخصوصية</h2><p>تصف سياسة الخصوصية هذه كيفية جمع واستخدام والتعامل مع معلوماتك الشخصية عند استخدام خدماتنا.</p><h3>المعلومات التي نجمعها</h3><p>نجمع المعلومات لتقديم خدمات أفضل لمستخدمينا.</p>',
            'image' => null
        ],
        'terms-conditions' => [
            'id' => '3',
            'title' => 'Terms & Conditions',
            'title_ar' => 'الشروط والأحكام',
            'slug' => 'terms-conditions',
            'content' => '<h2>Terms and Conditions</h2><p>These Terms and Conditions outline the rules and regulations for the use of our Website and services.</p><h3>License</h3><p>Unless otherwise stated, we own the intellectual property rights for all material on this website.</p>',
            'content_ar' => '<h2>الشروط والأحكام</h2><p>توضح هذه الشروط والأحكام القواعد واللوائح لاستخدام موقعنا الإلكتروني وخدماتنا.</p><h3>الترخيص</h3><p>ما لم يُذكر خلاف ذلك، فإننا نمتلك حقوق الملكية الفكرية لجميع المواد الموجودة على هذا الموقع.</p>',
            'image' => null
        ]
    ];
    
    if (isset($mockPages[$slug])) {
        sendResponse($mockPages[$slug]);
    } else {
        sendError('Page not found', 404);
    }
    exit;
}

// Get database connection
$conn = getDBConnection();

try {
    // Query to get custom page by slug
    $query = "
        SELECT 
            id, 
            title, 
            title_ar, 
            slug, 
            content,
            content_ar,
            image
        FROM 
            custom_pages
        WHERE 
            slug = ? AND
            published = 1
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $slug);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Page not found', 404);
    }
    
    $page = $result->fetch_assoc();
    
    // Return page details
    sendResponse($page);
    
} catch (Exception $e) {
    sendError("Error fetching page: " . $e->getMessage(), 500);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
