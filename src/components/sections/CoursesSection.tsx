
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';
import { Course } from '@/utils/mockData';

interface CoursesSectionProps {
  featuredCourses: Course[];
  isVisible: boolean;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ featuredCourses, isVisible }) => {
  return (
    <section 
      id="courses" 
      className="animate-on-scroll py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
          <div className="h-1 w-20 bg-brand-700 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our most popular training programs selected to help you excel in your field.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.slice(0, 6).map((course, index) => (
            <div 
              key={course.id}
              className={`transition-all duration-700 delay-${Math.min(index % 3, 3) * 100} ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Link 
            to="/courses" 
            className="inline-flex items-center px-6 py-3 rounded-md bg-brand-900 text-white font-medium transition-all hover:bg-brand-800 hover:shadow-md"
          >
            View All Courses <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
