
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Course } from '@/context/CourseContext';

interface CourseListViewProps {
  courses: Course[];
}

const CourseListView: React.FC<CourseListViewProps> = ({ courses }) => {
  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <div 
          key={course.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 lg:w-1/4">
              <img 
                src={course.image_url || '/placeholder.svg'} 
                alt={course.title} 
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3 lg:w-3/4">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {course.short_description}
              </p>
              
              {course.sessions && course.sessions.length > 0 && (
                <div className="mb-5 space-y-2">
                  {course.sessions.slice(0, 2).map((session: any) => (
                    <div key={session.id} className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center sm:w-1/2 mb-1 sm:mb-0">
                        <Calendar size={16} className="mr-2 text-brand-700" />
                        <span>
                          {new Date(session.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(session.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center sm:w-1/2">
                        <MapPin size={16} className="mr-2 text-brand-700" />
                        <span>{session.location}</span>
                      </div>
                    </div>
                  ))}
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
        </div>
      ))}
    </div>
  );
};

export default CourseListView;
