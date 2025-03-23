
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  FolderPlus, 
  FileEdit
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

// Mock data for categories and subcategories
const mockCategories = [
  { id: '1', name: 'Leadership', subcategories: ['Executive Leadership', 'Team Management'] },
  { id: '2', name: 'Technical', subcategories: ['Software Development', 'Network Security', 'Cloud Computing'] },
  { id: '3', name: 'Professional Development', subcategories: ['Communication Skills', 'Project Management'] },
  { id: '4', name: 'Compliance', subcategories: ['Data Protection', 'Industry Regulations'] },
];

const CategoriesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCategories = mockCategories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddCategory = () => {
    toast({
      title: "Coming Soon",
      description: "This functionality will be available soon.",
    });
  };
  
  const handleAddSubcategory = (categoryId: string) => {
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
  
  return (
    <AdminLayout title="Categories & Subcategories" breadcrumb="Categories">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={handleAddCategory} className="bg-brand-900 hover:bg-brand-700">
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead className="w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.map((subcat, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-2"
                          >
                            {subcat}
                          </span>
                        ))}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7"
                          onClick={() => handleAddSubcategory(category.id)}
                        >
                          <FolderPlus className="h-3.5 w-3.5 mr-1" /> Add
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(category.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:border-red-300" onClick={() => handleDelete(category.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500 py-10">
                    No categories found. Try a different search or add a new category.
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

export default CategoriesPage;
