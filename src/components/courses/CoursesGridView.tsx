
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
        // Map sessions from context format to CourseCard format if needed
        // Making sure to maintain the correct Session type
        return (
          <CourseCard 
            key={course.id} 
            course={{
              ...course,
              image: course.image_url || '/placeholder.svg',
              sessions: course.sessions || []
            }}
            showDates={true}
          />
        );
      })}
    </div>
  );
};

export default CoursesGridView;
