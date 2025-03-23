
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Upload, 
  FileText, 
  Download, 
  Trash, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Mock brochure data
const mockBrochure = {
  id: '1',
  filename: 'Company-Brochure-2023.pdf',
  size: '2.4 MB',
  uploadDate: new Date(2023, 6, 15),
  updatedBy: 'Admin User',
  downloadCount: 145
};

// Mock brochure history
const mockBrochureHistory = [
  {
    id: '2',
    filename: 'Company-Brochure-2022.pdf',
    uploadDate: new Date(2022, 5, 10),
    updatedBy: 'John Doe',
    status: 'archived'
  },
  {
    id: '3',
    filename: 'Company-Brochure-2021.pdf',
    uploadDate: new Date(2021, 4, 20),
    updatedBy: 'Jane Smith',
    status: 'archived'
  }
];

const BrochurePage = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setSelectedFile(null);
      
      toast({
        title: "Brochure Updated",
        description: "The company brochure has been successfully updated.",
      });
    }, 2000);
  };
  
  const handleDownload = () => {
    toast({
      title: "Downloading",
      description: "The brochure is being downloaded.",
    });
  };
  
  const handleDelete = () => {
    toast({
      title: "Coming Soon",
      description: "This functionality will be available soon.",
    });
  };
  
  const handleRestoreVersion = (id: string) => {
    toast({
      title: "Coming Soon",
      description: "This functionality will be available soon.",
    });
  };
  
  return (
    <AdminLayout title="Company Brochure" breadcrumb="Brochure">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Brochure</h2>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="flex items-center">
                <div className="bg-brand-100 p-3 rounded-full mr-4">
                  <FileText className="w-6 h-6 text-brand-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{mockBrochure.filename}</h3>
                  <div className="flex flex-wrap text-sm text-gray-500 gap-x-4">
                    <span>Size: {mockBrochure.size}</span>
                    <span>Uploaded: {format(mockBrochure.uploadDate, 'MMM d, yyyy')}</span>
                    <span>By: {mockBrochure.updatedBy}</span>
                  </div>
                  <p className="text-sm mt-1">
                    <span className="text-brand-700">{mockBrochure.downloadCount}</span> downloads
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:border-red-300" onClick={handleDelete}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Upload New Brochure</h2>
            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="brochure">Brochure PDF</Label>
                <Input 
                  id="brochure" 
                  type="file" 
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && (
                <div className="text-sm bg-gray-50 p-2 rounded">
                  Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </div>
              )}
              <Button 
                onClick={handleUpload} 
                className="bg-brand-900 hover:bg-brand-700"
                disabled={!selectedFile || uploading}
              >
                {uploading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload New Version
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Previous Versions</h2>
            
            <div className="space-y-4">
              {mockBrochureHistory.map((brochure) => (
                <div key={brochure.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center mb-2">
                    <FileText className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="font-medium">{brochure.filename}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    <div>Uploaded: {format(brochure.uploadDate, 'MMM d, yyyy')}</div>
                    <div>By: {brochure.updatedBy}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleRestoreVersion(brochure.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Restore
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {mockBrochureHistory.length === 0 && (
                <div className="text-gray-500 text-center py-4">
                  No previous versions available
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BrochurePage;
