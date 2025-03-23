
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Calendar,
  MapPin,
  Users
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
import { format } from 'date-fns';

// Mock data for sessions
const mockSessions = [
  { 
    id: '1', 
    courseTitle: 'Advanced Leadership Skills',
    startDate: new Date(2023, 8, 15),
    endDate: new Date(2023, 8, 17),
    location: 'New York',
    capacity: 20,
    registrations: 12,
    status: 'upcoming'
  },
  { 
    id: '2', 
    courseTitle: 'Project Management Fundamentals',
    startDate: new Date(2023, 9, 10),
    endDate: new Date(2023, 9, 11),
    location: 'Chicago',
    capacity: 15,
    registrations: 8,
    status: 'upcoming'
  },
  { 
    id: '3', 
    courseTitle: 'GDPR Compliance Training',
    startDate: new Date(2023, 7, 5),
    endDate: new Date(2023, 7, 5),
    location: 'Online',
    capacity: 30,
    registrations: 25,
    status: 'completed'
  },
  { 
    id: '4', 
    courseTitle: 'Cloud Architecture Design',
    startDate: new Date(2023, 10, 20),
    endDate: new Date(2023, 10, 23),
    location: 'San Francisco',
    capacity: 12,
    registrations: 6,
    status: 'upcoming'
  },
];

const SessionsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSessions = mockSessions.filter(session => 
    session.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddSession = () => {
    toast({
      title: "Coming Soon",
      description: "This functionality will be available soon.",
    });
  };
  
  const handleEdit = (id: string) => {
    toast({
      title: "Coming Soon",
      description: "This functionality will be available soon.",
    });
  };
  
  const handleDelete = (id: string) => {
    toast({
      title: "Coming Soon",
      description: "This functionality will be available soon.",
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'default';
      case 'completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  return (
    <AdminLayout title="Training Sessions" breadcrumb="Sessions">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search sessions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={handleAddSession} className="bg-brand-900 hover:bg-brand-700">
            <Plus className="mr-2 h-4 w-4" /> Add Session
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.courseTitle}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {format(session.startDate, 'MMM d, yyyy')} - {format(session.endDate, 'MMM d, yyyy')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{session.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{session.registrations} / {session.capacity}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(session.status)}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(session.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:border-red-300" onClick={() => handleDelete(session.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-10">
                    No sessions found. Try a different search or add a new session.
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

export default SessionsPage;
