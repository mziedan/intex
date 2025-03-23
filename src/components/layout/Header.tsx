
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Phone, FileText, ChevronDown } from 'lucide-react';
import { useCourses } from '@/context/CourseContext';
import { companyInfo } from '@/utils/mockData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  
  const location = useLocation();
  const { categories, searchCourses } = useCourses();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoryMenuOpen(false);
  }, [location.pathname]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 2) {
      const results = searchCourses(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Could navigate to a search results page here
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold font-heading text-brand-900">
              {companyInfo.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-brand-900' 
                  : 'text-gray-700 hover:text-brand-900'
              }`}
            >
              Home
            </Link>
            
            <div className="relative group">
              <button
                className={`flex items-center text-sm font-medium ${
                  location.pathname.includes('/courses') || location.pathname.includes('/course')
                    ? 'text-brand-900' 
                    : 'text-gray-700 hover:text-brand-900'
                }`}
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                Courses <ChevronDown size={16} className="ml-1" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden p-2">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/courses/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-900 rounded-md"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/contact' 
                  ? 'text-brand-900' 
                  : 'text-gray-700 hover:text-brand-900'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Phone */}
            <a 
              href={`tel:${companyInfo.phone}`} 
              className="flex items-center text-gray-700 hover:text-brand-900 transition-colors"
            >
              <Phone size={18} className="mr-2" />
              <span className="text-sm font-medium">{companyInfo.phone}</span>
            </a>
            
            {/* Download Brochure */}
            <a 
              href="#" 
              className="flex items-center text-sm font-medium text-white bg-brand-900 hover:bg-brand-800 px-4 py-2 rounded-md transition-colors"
            >
              <FileText size={16} className="mr-2" />
              Download Brochure
            </a>
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-brand-900 transition-colors"
              aria-label="Search courses"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-brand-900 transition-colors"
              aria-label="Search courses"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-brand-900 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 space-y-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-base font-medium ${
                location.pathname === '/' ? 'text-brand-900' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            
            <div>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className={`flex items-center justify-between w-full text-base font-medium ${
                  location.pathname.includes('/courses') ? 'text-brand-900' : 'text-gray-700'
                }`}
              >
                <span>Courses</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${
                    isCategoryMenuOpen ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div 
                className={`mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300 ${
                  isCategoryMenuOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                {categories.map(category => (
                  <Link
                    key={category.id}
                    to={`/courses/${category.slug}`}
                    className="block py-1 text-sm text-gray-600 hover:text-brand-900"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className={`text-base font-medium ${
                location.pathname === '/contact' ? 'text-brand-900' : 'text-gray-700'
              }`}
            >
              Contact Us
            </Link>
          </nav>
          
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <a 
              href={`tel:${companyInfo.phone}`} 
              className="flex items-center text-gray-700"
            >
              <Phone size={18} className="mr-2" />
              <span className="text-sm">{companyInfo.phone}</span>
            </a>
            
            <a 
              href="#" 
              className="flex items-center justify-center w-full text-sm font-medium text-white bg-brand-900 px-4 py-2 rounded-md"
            >
              <FileText size={16} className="mr-2" />
              Download Brochure
            </a>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div 
        className={`absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ${
          isSearchOpen ? 'max-h-96 py-6' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for courses..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
              />
            </div>
          </form>
          
          {searchQuery.trim().length > 2 && (
            <div className="mt-4 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map(course => (
                    <Link
                      key={course.id}
                      to={`/course/${course.slug}`}
                      className="block p-3 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <div className="flex items-start">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded mr-3"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">{course.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{course.shortDescription}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No courses found. Try a different search.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
