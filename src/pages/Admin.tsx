
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  BookOpen, 
  Users, 
  ListTodo, 
  FolderTree, 
  CalendarClock,
  Upload,
  UserCog
} from 'lucide-react';

const AdminPage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect non-admin users
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);
  
  // If not admin or loading, don't render admin content
  if (!isAdmin) {
    return null;
  }
  
  const adminModules = [
    {
      id: 'categories',
      title: 'Categories & Subcategories',
      description: 'Manage course categories and subcategories',
      icon: FolderTree,
      link: '/admin/categories'
    },
    {
      id: 'courses',
      title: 'Courses',
      description: 'Add, edit and delete training courses',
      icon: BookOpen,
      link: '/admin/courses'
    },
    {
      id: 'sessions',
      title: 'Training Sessions',
      description: 'Manage course sessions and schedules',
      icon: CalendarClock,
      link: '/admin/sessions'
    },
    {
      id: 'registrations',
      title: 'Registrations',
      description: 'View and manage course registrations',
      icon: ListTodo,
      link: '/admin/registrations'
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage admin users and permissions',
      icon: UserCog,
      link: '/admin/users'
    },
    {
      id: 'brochure',
      title: 'Company Brochure',
      description: 'Upload or replace company brochure',
      icon: Upload,
      link: '/admin/brochure'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map(module => (
              <Link
                key={module.id}
                to={module.link}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 hover:border-brand-200"
              >
                <div className="flex items-start">
                  <div className="bg-brand-100 p-3 rounded-full mr-4">
                    <module.icon className="w-7 h-7 text-brand-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Stats Overview */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Total Courses</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Active Sessions</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">New Registrations</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Total Categories</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
