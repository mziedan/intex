
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  CalendarClock,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock data for courses
const mockCourses = [
  { 
    id: '1', 
    title: 'Advanced Leadership Skills', 
    category: 'Leadership',
    subcategory: 'Executive Leadership',
    sessions: 3,
    registrations: 12,
    status: 'active'
  },
  { 
    id: '2', 
    title: 'Project Management Fundamentals', 
    category: 'Professional Development',
    subcategory: 'Project Management',
    sessions: 2,
    registrations: 8,
    status: 'active'
  },
  { 
    id: '3', 
    title: 'GDPR Compliance Training', 
    category: 'Compliance',
    subcategory: 'Data Protection',
    sessions: 1,
    registrations: 25,
    status: 'active'
  },
  { 
    id: '4', 
    title: 'Cloud Architecture Design', 
    category: 'Technical',
    subcategory: 'Cloud Computing',
    sessions: 4,
    registrations: 6,
    status: 'draft'
  },
];

const CoursesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate();
  
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const handleDelete = (id: string) => {
    toast({
      title: "Course Deleted",
      description: "The course has been deleted successfully.",
    });
  };
  
  return (
    <AdminLayout title="Courses Management" breadcrumb="Courses">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Professional Development">Professional Development</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={() => navigate("/admin/courses/add")} 
            className="bg-brand-900 hover:bg-brand-700 w-full md:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Course
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[220px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{course.category}</span>
                        <span className="text-sm text-gray-500">{course.subcategory}</span>
                      </div>
                    </TableCell>
                    <TableCell>{course.sessions}</TableCell>
                    <TableCell>{course.registrations}</TableCell>
                    <TableCell>
                      <Badge variant={course.status === 'active' ? 'default' : 'outline'}>
                        {course.status === 'active' ? 'Active' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/admin/courses/${course.id}/sessions`)}
                          title="Manage Sessions"
                        >
                          <CalendarClock className="h-4 w-4" />
                        </Button>
                        
                        <Link to={`/course/${course.id}`} target="_blank">
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="View Course"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                          title="Edit Course"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:border-red-300"
                              title="Delete Course"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the course and all associated sessions. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-500 hover:bg-red-700"
                                onClick={() => handleDelete(course.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-10">
                    No courses found. Try a different search or add a new course.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default CoursesPage;
