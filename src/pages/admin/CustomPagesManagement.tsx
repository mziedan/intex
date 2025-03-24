
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { Link } from 'react-router-dom';

interface CustomPage {
  id: string;
  title: string;
  slug: string;
  image?: string;
  content: string;
  created: string;
  published: boolean;
}

const CustomPagesManagement = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<CustomPage[]>([
    {
      id: '1',
      title: 'Our Methodology',
      slug: 'our-methodology',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      content: '<h2>Our Unique Training Methodology</h2><p>Our training programs are designed to maximize learning and practical application...</p>',
      created: '2023-06-15',
      published: true
    }
  ]);
  
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const handleAddNew = () => {
    setEditingPage({
      id: '',
      title: '',
      slug: '',
      image: '',
      content: '',
      created: new Date().toISOString().split('T')[0],
      published: false
    });
    setShowForm(true);
  };
  
  const handleEdit = (page: CustomPage) => {
    setEditingPage({ ...page });
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
    toast({
      title: "Success",
      description: "Page deleted successfully.",
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingPage) return;
    
    if (editingPage.id) {
      // Update existing page
      setPages(pages.map(page => 
        page.id === editingPage.id ? editingPage : page
      ));
      toast({
        title: "Success",
        description: "Page updated successfully.",
      });
    } else {
      // Add new page
      const newPage = {
        ...editingPage,
        id: Date.now().toString(),
        slug: editingPage.slug || editingPage.title.toLowerCase().replace(/\s+/g, '-')
      };
      setPages([...pages, newPage]);
      toast({
        title: "Success",
        description: "New page added successfully.",
      });
    }
    
    setEditingPage(null);
    setShowForm(false);
  };
  
  const handleContentChange = (value: string) => {
    if (editingPage) {
      setEditingPage({
        ...editingPage,
        content: value
      });
    }
  };
  
  const handleTogglePublish = (page: CustomPage) => {
    setPages(pages.map(p => 
      p.id === page.id ? { ...p, published: !p.published } : p
    ));
    
    toast({
      title: page.published ? "Page Unpublished" : "Page Published",
      description: `${page.title} is now ${page.published ? 'unpublished' : 'published'}.`,
    });
  };
  
  return (
    <AdminLayout title="Custom Pages Management" breadcrumb="Custom Pages">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Custom Pages</h2>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" /> Add New Page
          </Button>
        </div>
        
        {showForm ? (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">
              {editingPage?.id ? `Edit Page: ${editingPage.title}` : 'Create New Page'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input 
                    id="title"
                    value={editingPage?.title || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage!,
                      title: e.target.value
                    })}
                    placeholder="Page Title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Page URL Slug</Label>
                  <Input 
                    id="slug"
                    value={editingPage?.slug || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage!,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })}
                    placeholder="page-url-slug"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="image">Featured Image URL</Label>
                <Input 
                  id="image"
                  value={editingPage?.image || ''}
                  onChange={(e) => setEditingPage({
                    ...editingPage!,
                    image: e.target.value
                  })}
                  placeholder="https://example.com/image.jpg"
                />
                {editingPage?.image && (
                  <div className="mt-2 h-32 w-full md:w-1/3 overflow-hidden rounded border border-gray-200">
                    <img 
                      src={editingPage.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="content" className="mb-2 block">Page Content</Label>
                <RichTextEditor 
                  value={editingPage?.content || ''} 
                  onChange={handleContentChange}
                  placeholder="Enter page content here..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPage(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPage?.id ? 'Update Page' : 'Create Page'}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">URL Slug</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500 border-b border-gray-100">
                      No custom pages created yet.
                    </td>
                  </tr>
                ) : (
                  pages.map((page) => (
                    <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {page.image && (
                            <div className="h-10 w-10 rounded overflow-hidden mr-3">
                              <img 
                                src={page.image} 
                                alt={page.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <span className="font-medium">{page.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{page.slug}</td>
                      <td className="px-4 py-4 text-gray-600">{page.created}</td>
                      <td className="px-4 py-4">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            page.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {page.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/page/${page.slug}`}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            variant={page.published ? "outline" : "secondary"}
                            onClick={() => handleTogglePublish(page)}
                          >
                            {page.published ? 'Unpublish' : 'Publish'}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(page)}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(page.id)}>
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CustomPagesManagement;
