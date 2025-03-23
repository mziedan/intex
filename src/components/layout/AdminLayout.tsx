
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb?: string;
}

const AdminLayout = ({ children, title, breadcrumb }: AdminLayoutProps) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirect non-admin users
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);
  
  // If not admin or loading, don't render admin content
  if (!isAdmin) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4 text-gray-500">
            <Link to="/" className="hover:text-brand-700 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link to="/admin" className="hover:text-brand-700">
              Admin
            </Link>
            {breadcrumb && (
              <>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-brand-900">{breadcrumb}</span>
              </>
            )}
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-2">{title}</h1>
            <p className="text-gray-600">Welcome back, {user?.name}.</p>
          </div>
          
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;
