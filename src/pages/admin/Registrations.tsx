
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Search, 
  Check, 
  X, 
  Mail,
  Calendar,
  User
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for registrations
const mockRegistrations = [
  { 
    id: '1',
    courseTitle: 'Advanced Leadership Skills',
    sessionDate: new Date(2023, 8, 15),
    location: 'New York',
    user: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corp'
    },
    registrationDate: new Date(2023, 7, 10),
    status: 'pending'
  },
  { 
    id: '2',
    courseTitle: 'Project Management Fundamentals',
    sessionDate: new Date(2023, 9, 10),
    location: 'Chicago',
    user: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+1 (555) 987-6543',
      company: 'Globex Inc'
    },
    registrationDate: new Date(2023, 8, 5),
    status: 'confirmed'
  },
  { 
    id: '3',
    courseTitle: 'GDPR Compliance Training',
    sessionDate: new Date(2023, 7, 5),
    location: 'Online',
    user: {
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      phone: '+1 (555) 456-7890',
      company: 'Initech'
    },
    registrationDate: new Date(2023, 6, 20),
    status: 'completed'
  },
  { 
    id: '4',
    courseTitle: 'Cloud Architecture Design',
    sessionDate: new Date(2023, 10, 20),
    location: 'San Francisco',
    user: {
      name: 'Emily Williams',
      email: 'emily.w@example.com',
      phone: '+1 (555) 234-5678',
      company: 'Tech Solutions'
    },
    registrationDate: new Date(2023, 9, 15),
    status: 'canceled'
  },
];

const RegistrationsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredRegistrations = mockRegistrations.filter(reg => {
    const matchesSearch = 
      reg.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleConfirm = (id: string) => {
    toast({
      title: "Registration Confirmed",
      description: "The registration has been confirmed and the user has been notified.",
    });
  };
  
  const handleReject = (id: string) => {
    toast({
      title: "Registration Rejected",
      description: "The registration has been rejected and the user has been notified.",
    });
  };
  
  const handleEmail = (id: string) => {
    toast({
      title: "Email Sent",
      description: "An email has been sent to the user.",
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'canceled':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  return (
    <AdminLayout title="Course Registrations" breadcrumb="Registrations">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search registrations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Session Date</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">{registration.user.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{registration.user.email}</span>
                        <span className="text-xs text-gray-400">{registration.user.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{registration.courseTitle}</span>
                        <span className="text-sm text-gray-500">{registration.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{format(registration.sessionDate, 'MMM d, yyyy')}</span>
                      </div>
                    </TableCell>
                    <TableCell>{format(registration.registrationDate, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(registration.status)}>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {registration.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-green-500 hover:text-green-700 hover:border-green-300"
                              onClick={() => handleConfirm(registration.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:border-red-300"
                              onClick={() => handleReject(registration.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEmail(registration.id)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-10">
                    No registrations found. Try a different search or filter.
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

export default RegistrationsPage;
