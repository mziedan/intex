
import React from 'react';
import CourseCard from '@/components/ui/CourseCard';
import { Course, Session } from '@/types';

interface CoursesGridViewProps {
  courses: Course[];
}

const CoursesGridView: React.FC<CoursesGridViewProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => {
        // Transform sessions from backend format to CourseCard expected format
        const transformedSessions = course.sessions?.map(session => ({
          id: session.id,
          startDate: session.start_date,
          endDate: session.end_date,
          location: session.location || ''
        })) || [];
        
        return (
          <CourseCard 
            key={course.id} 
            course={{
              ...course,
              image: course.image_url || '/placeholder.svg',
              sessions: transformedSessions
            }}
            showDates={true}
          />
        );
      })}
    </div>
  );
};

export default CoursesGridView;
