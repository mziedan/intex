
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCourses } from '@/context/CourseContext';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/utils/mockData';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const { searchCourses } = useCourses();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Update suggestions as user types
    if (searchQuery.trim().length > 2) {
      const results = searchCourses(searchQuery);
      setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, searchCourses]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (courseSlug: string) => {
    navigate(`/course/${courseSlug}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10 pr-10 focus-visible:ring-brand-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim().length > 2 && setShowSuggestions(true)}
          />
          {searchQuery && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button type="submit" variant="ghost" size="icon" className="ml-1">
          <Search className="h-5 w-5" />
        </Button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 py-1 max-h-[400px] overflow-y-auto">
          {suggestions.map((course) => (
            <div 
              key={course.id}
              onClick={() => handleSuggestionClick(course.slug)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-start"
            >
              <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <div className="font-medium text-sm truncate">{course.title}</div>
                <div className="text-xs text-gray-500 truncate">{course.shortDescription}</div>
              </div>
            </div>
          ))}
          <div 
            className="px-4 py-2 border-t border-gray-100 text-center text-sm text-brand-700 hover:bg-gray-50 cursor-pointer"
            onClick={handleSearchSubmit}
          >
            View all results for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
