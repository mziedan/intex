
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Helper function to check if we're in development mode
const isDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost';
};

export async function uploadImage(file: File, folder: string): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file);
    
    if (error) {
      throw error;
    }
    
    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    
    return publicUrl;
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
