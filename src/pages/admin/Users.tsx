
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Mail,
  ShieldCheck,
  Shield
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

// Mock data for admin users
const mockUsers = [
  { 
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    lastActive: new Date(2023, 9, 15),
    status: 'active'
  },
  { 
    id: '2',
    name: 'Content Manager',
    email: 'content@example.com',
    role: 'editor',
    lastActive: new Date(2023, 9, 10),
    status: 'active'
  },
  { 
    id: '3',
    name: 'Registration Manager',
    email: 'registrations@example.com',
    role: 'manager',
    lastActive: new Date(2023, 9, 5),
    status: 'active'
  },
  { 
    id: '4',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    lastActive: new Date(2023, 8, 20),
    status: 'inactive'
  },
];

const UsersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddUser = () => {
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
  
  const handleEmail = (id: string) => {
    toast({
      title: "Email Sent",
      description: "An email has been sent to the user.",
    });
  };
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <Badge className="bg-brand-900 hover:bg-brand-800">
            <ShieldCheck className="h-3 w-3 mr-1" /> Admin
          </Badge>
        );
      case 'editor':
        return (
          <Badge variant="secondary">
            <Shield className="h-3 w-3 mr-1" /> Editor
          </Badge>
        );
      case 'manager':
        return (
          <Badge variant="outline">
            <Shield className="h-3 w-3 mr-1" /> Manager
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  return (
    <AdminLayout title="User Management" breadcrumb="Users">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={handleAddUser} className="bg-brand-900 hover:bg-brand-700">
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{format(user.lastActive, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEmail(user.id)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:border-red-300" onClick={() => handleDelete(user.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-10">
                    No users found. Try a different search or add a new user.
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

export default UsersPage;
