
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCourses } from '@/context/CourseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  slug: z.string().min(2, { message: "Slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" }),
  categoryId: z.string().min(1, { message: "Please select a parent category" }),
});

const SubcategoryForm = () => {
  const { subcategoryId, categoryId } = useParams();
  const isEditMode = !!subcategoryId;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { categories } = useCourses();
  
  // Setup form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      categoryId: categoryId || "",
    },
  });
  
  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-');     // Replace multiple hyphens with a single hyphen
  };
  
  // Auto-generate slug when name changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);
    
    // Only auto-generate slug if it hasn't been manually edited or is empty
    const currentSlug = form.getValues("slug");
    if (!currentSlug || currentSlug === generateSlug(form.getValues("name"))) {
      const newSlug = generateSlug(name);
      form.setValue("slug", newSlug);
    }
  };
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would save to the database
    console.log(values);
    
    toast({
      title: `Subcategory ${isEditMode ? "updated" : "created"} successfully`,
      description: `${values.name} has been ${isEditMode ? "updated" : "created"}.`,
    });
    
    // Navigate back to categories list
    navigate("/admin/categories");
  }
  
  return (
    <AdminLayout 
      title={isEditMode ? "Edit Subcategory" : "Add New Subcategory"} 
      breadcrumb={isEditMode ? "Edit Subcategory" : "Add Subcategory"}
    >
      <Card className="p-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate("/admin/categories")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
        </Button>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The parent category this subcategory belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter subcategory name" 
                      {...field} 
                      onChange={handleNameChange}
                    />
                  </FormControl>
                  <FormDescription>
                    The name of the subcategory as it will appear on the site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    The slug is used in the URL. It should be unique, lowercase, and contain only letters, numbers, and hyphens.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" className="bg-brand-900 hover:bg-brand-700">
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? "Update Subcategory" : "Create Subcategory"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </AdminLayout>
  );
};

export default SubcategoryForm;
