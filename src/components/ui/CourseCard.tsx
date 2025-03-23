
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Course } from '@/utils/mockData';
import { format } from 'date-fns';

interface CourseCardProps {
  course: Course;
  className?: string;
  showDates?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  className,
  showDates = true
}) => {
  // Format the dates if we have sessions
  const upcomingSessions = course.sessions.length > 0 
    ? course.sessions.slice(0, 1).map(session => ({
        ...session,
        formattedStartDate: format(new Date(session.startDate), 'MMM d, yyyy'),
        formattedEndDate: format(new Date(session.endDate), 'MMM d, yyyy')
      }))
    : [];

  return (
    <div 
      className={cn(
        "group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.shortDescription}
        </p>
        
        {showDates && upcomingSessions.length > 0 && (
          <div className="mb-4 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2 text-brand-700" />
              <span>
                {upcomingSessions[0].formattedStartDate} - {upcomingSessions[0].formattedEndDate}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-2 text-brand-700" />
              <span>{upcomingSessions[0].location}</span>
            </div>
          </div>
        )}
        
        <Link 
          to={`/course/${course.slug}`}
          className="inline-block bg-brand-900 hover:bg-brand-800 text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
