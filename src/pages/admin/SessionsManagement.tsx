
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { format } from 'date-fns';
import { CalendarIcon, ArrowLeft, Plus, Edit, Trash } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Mock session data
const mockSessions = [
  {
    id: "1",
    startDate: new Date(2023, 11, 15),
    endDate: new Date(2023, 11, 17),
    location: "New York City",
    capacity: 20,
    registrations: 15,
    status: "upcoming"
  },
  {
    id: "2",
    startDate: new Date(2024, 0, 10),
    endDate: new Date(2024, 0, 12),
    location: "Online",
    capacity: 30,
    registrations: 22,
    status: "upcoming"
  },
  {
    id: "3",
    startDate: new Date(2024, 2, 5),
    endDate: new Date(2024, 2, 6),
    location: "Chicago",
    capacity: 25,
    registrations: 0,
    status: "upcoming"
  },
  {
    id: "4",
    startDate: new Date(2023, 9, 10),
    endDate: new Date(2023, 9, 12),
    location: "San Francisco",
    capacity: 15,
    registrations: 15,
    status: "completed"
  }
];

interface SessionFormData {
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  capacity: string;
}

const SessionsManagement = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState(mockSessions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<SessionFormData>({
    startDate: undefined,
    endDate: undefined,
    location: "",
    capacity: ""
  });
  const [editSessionId, setEditSessionId] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddSession = () => {
    if (!formData.startDate || !formData.endDate || !formData.location || !formData.capacity) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    const newSession = {
      id: Date.now().toString(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      registrations: 0,
      status: "upcoming"
    };
    
    setSessions([...sessions, newSession]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "Session Added",
      description: "The session has been added successfully",
    });
  };
  
  const handleEditSession = () => {
    if (!editSessionId || !formData.startDate || !formData.endDate || !formData.location || !formData.capacity) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedSessions = sessions.map(session => {
      if (session.id === editSessionId) {
        return {
          ...session,
          startDate: formData.startDate,
          endDate: formData.endDate,
          location: formData.location,
          capacity: parseInt(formData.capacity)
        };
      }
      return session;
    });
    
    setSessions(updatedSessions);
    setIsEditDialogOpen(false);
    resetForm();
    
    toast({
      title: "Session Updated",
      description: "The session has been updated successfully",
    });
  };
  
  const handleDeleteSession = (id: string) => {
    const updatedSessions = sessions.filter(session => session.id !== id);
    setSessions(updatedSessions);
    
    toast({
      title: "Session Deleted",
      description: "The session has been deleted successfully",
    });
  };
  
  const resetForm = () => {
    setFormData({
      startDate: undefined,
      endDate: undefined,
      location: "",
      capacity: ""
    });
    setEditSessionId(null);
  };
  
  const openEditDialog = (session: any) => {
    setFormData({
      startDate: session.startDate,
      endDate: session.endDate,
      location: session.location,
      capacity: session.capacity.toString()
    });
    setEditSessionId(session.id);
    setIsEditDialogOpen(true);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge>Upcoming</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <AdminLayout title="Manage Course Sessions" breadcrumb="Sessions">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/admin/courses")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-900 hover:bg-brand-700">
                <Plus className="mr-2 h-4 w-4" /> Add Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Session</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">Start Date</Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => setFormData({...formData, startDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">End Date</Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => setFormData({...formData, endDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="New York City or Online"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Max number of participants"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddSession}>Add Session</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Edit session dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Session</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">Start Date</Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => setFormData({...formData, startDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">End Date</Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => setFormData({...formData, endDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleEditSession}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>{format(session.startDate, "MMM d, yyyy")}</TableCell>
                    <TableCell>{format(session.endDate, "MMM d, yyyy")}</TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>{session.capacity}</TableCell>
                    <TableCell>
                      {session.registrations} / {session.capacity}
                      {session.registrations === session.capacity && (
                        <Badge variant="secondary" className="ml-2">Full</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(session.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(session)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:border-red-300" 
                          onClick={() => handleDeleteSession(session.id)}
                          disabled={session.registrations > 0}
                          title={session.registrations > 0 ? "Cannot delete sessions with registrations" : "Delete session"}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-10">
                    No sessions found. Add a new session to get started.
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

export default SessionsManagement;
