
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';
import { useImageUpload } from '@/services/uploadService';

interface SliderImage {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link?: string;
}

const SliderManagement = () => {
  const { toast } = useToast();
  const { uploadImageWithToast } = useImageUpload();
  const [sliders, setSliders] = useState<SliderImage[]>([
    {
      id: '1',
      title: 'Enhance Your Skills',
      subtitle: 'Join our world-class training programs to advance your career',
      imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
    },
    {
      id: '2',
      title: 'Learn from Experts',
      subtitle: 'Our instructors bring years of industry experience',
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
    }
  ]);
  
  const [editingSlider, setEditingSlider] = useState<SliderImage | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const handleAddNew = () => {
    setEditingSlider({
      id: '',
      title: '',
      subtitle: '',
      imageUrl: '',
      link: ''
    });
    setShowForm(true);
  };
  
  const handleEdit = (slider: SliderImage) => {
    setEditingSlider({ ...slider });
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    setSliders(sliders.filter(slider => slider.id !== id));
    toast({
      title: "Success",
      description: "Slider image deleted successfully.",
    });
  };
  
  const handleImageUpload = async (file: File) => {
    if (!editingSlider) return;
    
    const imageUrl = await uploadImageWithToast(file, 'sliders');
    if (imageUrl) {
      setEditingSlider({
        ...editingSlider,
        imageUrl: imageUrl
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingSlider) return;
    
    if (editingSlider.id) {
      // Update existing slider
      setSliders(sliders.map(slider => 
        slider.id === editingSlider.id ? editingSlider : slider
      ));
      toast({
        title: "Success",
        description: "Slider image updated successfully.",
      });
    } else {
      // Add new slider
      const newSlider = {
        ...editingSlider,
        id: Date.now().toString()
      };
      setSliders([...sliders, newSlider]);
      toast({
        title: "Success",
        description: "New slider image added successfully.",
      });
    }
    
    setEditingSlider(null);
    setShowForm(false);
  };
  
  return (
    <AdminLayout title="Slider Management" breadcrumb="Slider Management">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Slider Images</h2>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" /> Add New Slider
          </Button>
        </div>
        
        {showForm && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">
              {editingSlider?.id ? 'Edit Slider' : 'Add New Slider'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title"
                  value={editingSlider?.title || ''}
                  onChange={(e) => setEditingSlider({
                    ...editingSlider!,
                    title: e.target.value
                  })}
                  placeholder="Slider Title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="subtitle">Subtitle/Caption</Label>
                <Textarea 
                  id="subtitle"
                  value={editingSlider?.subtitle || ''}
                  onChange={(e) => setEditingSlider({
                    ...editingSlider!,
                    subtitle: e.target.value
                  })}
                  placeholder="Slider Caption"
                  required
                />
              </div>
              
              <div>
                <Label>Image</Label>
                <ImageUpload 
                  currentImage={editingSlider?.imageUrl}
                  onImageUpload={handleImageUpload}
                  onImageRemove={() => setEditingSlider({
                    ...editingSlider!,
                    imageUrl: ''
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="link">Link (Optional)</Label>
                <Input 
                  id="link"
                  value={editingSlider?.link || ''}
                  onChange={(e) => setEditingSlider({
                    ...editingSlider!,
                    link: e.target.value
                  })}
                  placeholder="https://example.com/page"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSlider(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSlider?.id ? 'Update Slider' : 'Add Slider'}
                </Button>
              </div>
            </form>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sliders.map((slider) => (
            <div 
              key={slider.id}
              className="border border-gray-200 rounded-md overflow-hidden bg-white"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={slider.imageUrl} 
                  alt={slider.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{slider.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{slider.subtitle}</p>
                {slider.link && (
                  <p className="text-xs text-gray-500 truncate">Link: {slider.link}</p>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(slider)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(slider.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SliderManagement;
