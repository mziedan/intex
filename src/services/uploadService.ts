
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import apiService from './apiService';
import { supabase } from '@/lib/supabase';

/**
 * Upload a file to the server
 * @param file The file to upload
 * @param path The path to save the file to (e.g., 'categories', 'courses')
 * @returns The URL of the uploaded file
 */
export const uploadFile = async (
  file: File, 
  path: string = 'uploads'
): Promise<string> => {
  try {
    // In production, we'd use a form data approach with our PHP backend
    // For now, we'll just mock the response
    
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    // In production, we would upload to our PHP backend endpoint
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('path', path);
    // const response = await fetch('/api/upload.php', {
    //   method: 'POST',
    //   body: formData
    // });
    
    // Mock a successful upload
    console.log(`Mock uploading file ${file.name} to ${filePath}`);
    
    // Return mock public URL
    return `https://your-domain.com/uploads/${filePath}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Delete a file from the server
 * @param url The URL of the file to delete
 */
export const deleteFile = async (url: string): Promise<void> => {
  try {
    // Extract the path from the URL
    const path = url.split('/uploads/')[1];
    
    if (!path) {
      throw new Error('Invalid file URL');
    }
    
    // In production, we would delete from our PHP backend endpoint
    // await fetch(`/api/delete.php?path=${encodeURIComponent(path)}`, {
    //   method: 'DELETE'
    // });
    
    // Mock a successful deletion
    console.log(`Mock deleting file at ${path}`);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Custom hook for image upload with toast notification
 */
export const useImageUpload = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageWithToast = async (file: File, directory: string = 'general') => {
    if (!file) return null;
    
    setIsUploading(true);
    try {
      // Upload file using the service
      const imageUrl = await uploadFile(file, directory);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      });
      
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImageWithToast,
    isUploading
  };
};

// Export the hook as a named export and as a default
export default {
  uploadFile,
  deleteFile,
  useImageUpload
};
