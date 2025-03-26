
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';
import { useImageUpload } from '@/services/uploadService';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

const PartnersManagement = () => {
  const { toast } = useToast();
  const { uploadImageWithToast } = useImageUpload();
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'Tech Corp',
      logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      website: 'https://example.com'
    },
    {
      id: '2',
      name: 'Digital Innovations',
      logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      website: 'https://example.com/partner2'
    }
  ]);
  
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const handleAddNew = () => {
    setEditingPartner({
      id: '',
      name: '',
      logo: '',
      website: ''
    });
    setShowForm(true);
  };
  
  const handleEdit = (partner: Partner) => {
    setEditingPartner({ ...partner });
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    setPartners(partners.filter(partner => partner.id !== id));
    toast({
      title: "Success",
      description: "Partner deleted successfully.",
    });
  };
  
  const handleImageUpload = async (file: File) => {
    if (!editingPartner) return;
    
    const imageUrl = await uploadImageWithToast(file, 'partners');
    if (imageUrl) {
      setEditingPartner({
        ...editingPartner,
        logo: imageUrl
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingPartner) return;
    
    if (editingPartner.id) {
      // Update existing partner
      setPartners(partners.map(partner => 
        partner.id === editingPartner.id ? editingPartner : partner
      ));
      toast({
        title: "Success",
        description: "Partner updated successfully.",
      });
    } else {
      // Add new partner
      const newPartner = {
        ...editingPartner,
        id: Date.now().toString()
      };
      setPartners([...partners, newPartner]);
      toast({
        title: "Success",
        description: "New partner added successfully.",
      });
    }
    
    setEditingPartner(null);
    setShowForm(false);
  };
  
  return (
    <AdminLayout title="Partners Management" breadcrumb="Partners Management">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Partners</h2>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" /> Add New Partner
          </Button>
        </div>
        
        {showForm && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">
              {editingPartner?.id ? 'Edit Partner' : 'Add New Partner'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Partner Name</Label>
                <Input 
                  id="name"
                  value={editingPartner?.name || ''}
                  onChange={(e) => setEditingPartner({
                    ...editingPartner!,
                    name: e.target.value
                  })}
                  placeholder="Company Name"
                  required
                />
              </div>
              
              <div>
                <Label>Logo</Label>
                <ImageUpload 
                  currentImage={editingPartner?.logo}
                  onImageUpload={handleImageUpload}
                  onImageRemove={() => setEditingPartner({
                    ...editingPartner!,
                    logo: ''
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input 
                  id="website"
                  value={editingPartner?.website || ''}
                  onChange={(e) => setEditingPartner({
                    ...editingPartner!,
                    website: e.target.value
                  })}
                  placeholder="https://partnerwebsite.com"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPartner(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPartner?.id ? 'Update Partner' : 'Add Partner'}
                </Button>
              </div>
            </form>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="border border-gray-200 rounded-md overflow-hidden bg-white p-4 flex flex-col"
            >
              <div className="h-24 flex items-center justify-center mb-3">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-center mb-2">{partner.name}</h3>
              {partner.website && (
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-brand-700 flex items-center justify-center mb-3"
                >
                  Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
              <div className="flex justify-center space-x-2 mt-auto">
                <Button variant="outline" size="sm" onClick={() => handleEdit(partner)}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(partner.id)}>
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PartnersManagement;
