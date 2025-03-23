
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CourseProvider } from "./context/CourseContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Import Admin Pages
import AdminCategories from "./pages/admin/Categories";
import AdminCourses from "./pages/admin/Courses";
import AdminSessions from "./pages/admin/Sessions";
import AdminRegistrations from "./pages/admin/Registrations";
import AdminUsers from "./pages/admin/Users";
import AdminBrochure from "./pages/admin/Brochure";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CourseProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:categorySlug" element={<Courses />} />
              <Route path="/courses/:categorySlug/:subcategorySlug" element={<Courses />} />
              <Route path="/course/:courseSlug" element={<CourseDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* Admin Panel Routes */}
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/sessions" element={<AdminSessions />} />
              <Route path="/admin/registrations" element={<AdminRegistrations />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/brochure" element={<AdminBrochure />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CourseProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
