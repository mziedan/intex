
import React from 'react';
import { Link } from 'react-router-dom';
import { FileCode, Clock, Calendar, MapPin } from 'lucide-react';
import { Course } from '@/context/CourseContext';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface CoursesTableViewProps {
  courses: Course[];
  subcategoryName?: string;
}

const CoursesTableView: React.FC<CoursesTableViewProps> = ({ courses, subcategoryName }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Available {subcategoryName} Courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Session Dates</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => {
            // If course has multiple sessions, create a row for each session
            if (course.sessions && course.sessions.length > 0) {
              return course.sessions.map((session, sessionIndex) => (
                <TableRow key={`${course.id}-${sessionIndex}`}>
                  {sessionIndex === 0 && (
                    <>
                      <TableCell className="font-medium" rowSpan={course.sessions.length}>
                        <div className="flex items-center">
                          <FileCode className="h-4 w-4 mr-2 text-brand-700" />
                          {course.id.substring(0, 8)}
                        </div>
                      </TableCell>
                      <TableCell rowSpan={course.sessions.length}>
                        <Link to={`/course/${course.slug}`} className="hover:text-brand-900 transition-colors font-medium">
                          {course.title}
                        </Link>
                      </TableCell>
                      <TableCell rowSpan={course.sessions.length}>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-brand-700" />
                          {course.duration || '4 weeks'}
                        </div>
                      </TableCell>
                    </>
                  )}
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-brand-700" />
                      <span>
                        {new Date(session.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(session.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-brand-700" />
                      {session.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" asChild>
                      <Link to={`/course/${course.slug}?session=${session.id}`}>
                        Register
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ));
            } else {
              // Fallback for courses without sessions
              return (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileCode className="h-4 w-4 mr-2 text-brand-700" />
                      {course.id.substring(0, 8)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link to={`/course/${course.slug}`} className="hover:text-brand-900 transition-colors font-medium">
                      {course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-brand-700" />
                      {course.duration || '4 weeks'}
                    </div>
                  </TableCell>
                  <TableCell colSpan={2} className="text-center text-gray-500">
                    No scheduled sessions
                  </TableCell>
                  <TableCell>
                    <Button size="sm" asChild>
                      <Link to={`/course/${course.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesTableView;
