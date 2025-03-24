import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { MainNavigationMenu } from './NavigationMenu';
import { useCourses } from '@/context/CourseContext';
import SearchBar from '@/components/ui/SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { categories } = useCourses();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo with Icon */}
          <Link to="/" className="text-2xl font-bold text-brand-900 flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            TrainingPro
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-grow justify-center">
            <MainNavigationMenu />
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block max-w-xs ml-4">
            <SearchBar />
          </div>
          
          {/* Authentication Links */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          {/* Mobile Search */}
          <div className="mb-4">
            <SearchBar />
          </div>
          
          <nav className="flex flex-col space-y-3">
            <div className="py-2">
              <Link 
                to="/courses" 
                className="text-gray-700 hover:text-brand-900 font-medium" 
                onClick={toggleMenu}
              >
                Courses
              </Link>
              <div className="pl-4 mt-1 border-l border-gray-200 space-y-1">
                {categories.map((category) => (
                  <div key={category.id} className="py-1">
                    <Link
                      to={`/courses/${category.slug}`}
                      className="text-gray-700 hover:text-brand-900"
                      onClick={toggleMenu}
                    >
                      {category.name}
                    </Link>
                    <div className="pl-4 mt-1 border-l border-gray-200 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/courses/${category.slug}/${subcategory.slug}`}
                          className="block py-1 text-sm text-gray-600 hover:text-brand-900"
                          onClick={toggleMenu}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Link to="/about" className="py-2 text-gray-700 hover:text-brand-900" onClick={toggleMenu}>
              About
            </Link>
            
            <Link to="/contact" className="py-2 text-gray-700 hover:text-brand-900" onClick={toggleMenu}>
              Contact
            </Link>
            
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="py-2 text-gray-700 hover:text-brand-900" onClick={toggleMenu}>
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }} 
                  className="py-2 text-gray-700 hover:text-brand-900 text-left flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/login" className="py-2" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
