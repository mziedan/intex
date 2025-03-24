
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCourses } from '@/context/CourseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  shortDescription: z.string().min(10, { message: "Short description must be at least 10 characters" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  subcategory: z.string().min(1, { message: "Please select a subcategory" }),
  price: z.string().min(1, { message: "Please enter a price" }),
  duration: z.string().min(1, { message: "Please enter duration" }),
  level: z.string().min(1, { message: "Please select a level" }),
  status: z.string().min(1, { message: "Please select a status" })
});

const CourseForm = () => {
  const { courseId } = useParams();
  const isEditMode = !!courseId;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { categories, getCourseBySlug } = useCourses();
  
  const [selectedCategory, setSelectedCategory] = React.useState("");
  
  // Get course if in edit mode
  const course = isEditMode ? getCourseBySlug(courseId) : null;
  
  // Setup form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course?.title || "",
      shortDescription: course?.shortDescription || "",
      description: course?.fullDescription || "", // Changed from description to fullDescription
      category: course?.category || "",
      subcategory: course?.subcategory || "",
      price: course?.price?.toString() || "",
      duration: course?.duration || "",
      level: course?.level || "",
      status: "active" // Default status for new courses
    },
  });
  
  // On category change, reset subcategory
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue("subcategory", "");
  };
  
  // Get current category's subcategories
  const subcategories = React.useMemo(() => {
    if (!selectedCategory) return [];
    const category = categories.find(c => c.id === selectedCategory);
    return category ? category.subcategories : [];
  }, [selectedCategory, categories]);
  
  // Initialize selected category from form values or course
  React.useEffect(() => {
    if (course?.category) {
      setSelectedCategory(course.category);
    }
  }, [course]);
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would save to the database
    console.log(values);
    
    toast({
      title: `Course ${isEditMode ? "updated" : "created"} successfully`,
      description: `${values.title} has been ${isEditMode ? "updated" : "created"}.`,
    });
    
    // Navigate back to courses list
    navigate("/admin/courses");
  }
  
  return (
    <AdminLayout 
      title={isEditMode ? "Edit Course" : "Add New Course"} 
      breadcrumb={isEditMode ? "Edit Course" : "Add Course"}
    >
      <Card className="p-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate("/admin/courses")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="all">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCategoryChange(value);
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger disabled={!selectedCategory}>
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subcategories.map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Please select a category first
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2 days, 16 hours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter a brief description (shown in course cards)" 
                      {...field} 
                      rows={2}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed in course cards and search results
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter a detailed course description" 
                      {...field} 
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" className="bg-brand-900 hover:bg-brand-700">
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? "Update Course" : "Create Course"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </AdminLayout>
  );
};

export default CourseForm;
