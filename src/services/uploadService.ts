
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper function to check if we're in development mode
const isDevelopment = () => {
  return import.meta.env.DEV || window.location.hostname === 'localhost';
};

export async function uploadImage(file: File, folder: string): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    // Add development header when in development mode
    const headers: Record<string, string> = {};
    if (isDevelopment()) {
      headers['X-Development'] = 'true';
    }

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    const data = await response.json();
    return data.imageUrl; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export const useImageUpload = () => {
  const { toast } = useToast();

  const uploadImageWithToast = async (file: File, folder: string): Promise<string | null> => {
    try {
      toast({
        title: 'Uploading...',
        description: 'Your image is being uploaded'
      });
      
      const imageUrl = await uploadImage(file, folder);
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully'
      });
      
      return imageUrl;
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive'
      });
      return null;
    }
  };

  return { uploadImageWithToast };
};
