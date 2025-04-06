
import React from 'react';
import CourseCard from '@/components/ui/CourseCard';
import { Course } from '@/context/CourseContext';

interface CoursesGridViewProps {
  courses: Course[];
}

const CoursesGridView: React.FC<CoursesGridViewProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => {
        // Map sessions from context format to CourseCard format
        const formattedSessions = course.sessions?.map(session => ({
          id: session.id,
          startDate: session.start_date,
          endDate: session.end_date,
          location: session.location
        })) || [];

        return (
          <CourseCard 
            key={course.id} 
            course={{
              ...course,
              image: course.image_url || '/placeholder.svg',
              sessions: formattedSessions
            }}
            showDates={true}
          />
        );
      })}
    </div>
  );
};

export default CoursesGridView;
