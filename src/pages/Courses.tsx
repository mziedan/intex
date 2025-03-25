
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Grid3X3, List, Calendar, MapPin, Table, Clock, FileCode } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryCard from '@/components/ui/CategoryCard';
import CourseCard from '@/components/ui/CourseCard';
import { useCourses, Category, Subcategory, Course } from '@/context/CourseContext';
import { 
  Table as UITable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const Courses = () => {
  const { categorySlug, subcategorySlug } = useParams<{ categorySlug?: string; subcategorySlug?: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    categories, 
    courses,
    getCategoryBySlug, 
    getSubcategoryBySlug, 
    getCoursesByCategory,
    getCoursesBySubcategory
  } = useCourses();

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<Subcategory | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        if (categorySlug && subcategorySlug) {
          // Display courses for a specific subcategory
          const category = await getCategoryBySlug(categorySlug);
          const subcategory = await getSubcategoryBySlug(categorySlug, subcategorySlug);
          
          if (category && subcategory) {
            setCurrentCategory(category);
            setCurrentSubcategory(subcategory);
            const subcategoryCourses = await getCoursesBySubcategory(subcategory.id);
            setFilteredCourses(subcategoryCourses);
          }
        } else if (categorySlug) {
          // Display subcategories for a specific category
          const category = await getCategoryBySlug(categorySlug);
          
          if (category) {
            setCurrentCategory(category);
            setCurrentSubcategory(null);
            const categoryCourses = await getCoursesByCategory(category.id);
            setFilteredCourses(categoryCourses);
          }
        } else {
          // Display all categories
          setCurrentCategory(null);
          setCurrentSubcategory(null);
          setFilteredCourses([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [categorySlug, subcategorySlug, getCategoryBySlug, getSubcategoryBySlug, getCoursesByCategory, getCoursesBySubcategory]);

  const renderPageTitle = () => {
    if (currentSubcategory) {
      return currentSubcategory.name;
    } else if (currentCategory) {
      return currentCategory.name;
    } else {
      return "All Training Categories";
    }
  };

  const renderBreadcrumbs = () => {
    return (
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brand-900 transition-colors">Home</Link>
        <span className="mx-2">•</span>
        <Link to="/courses" className="hover:text-brand-900 transition-colors">Courses</Link>
        
        {currentCategory && (
          <>
            <span className="mx-2">•</span>
            <Link 
              to={`/courses/${currentCategory.slug}`}
              className={`hover:text-brand-900 transition-colors ${currentSubcategory ? '' : 'font-medium text-brand-900'}`}
            >
              {currentCategory.name}
            </Link>
          </>
        )}
        
        {currentSubcategory && (
          <>
            <span className="mx-2">•</span>
            <span className="font-medium text-brand-900">{currentSubcategory.name}</span>
          </>
        )}
      </div>
    );
  };

  const renderTableView = () => {
    return (
      <UITable>
        <TableCaption>Available {currentSubcategory?.name} Courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Session Dates</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses.map((course) => {
            // If course has multiple sessions, create a row for each session
            if (course.sessions && course.sessions.length > 0) {
              return course.sessions.map((session, sessionIndex) => (
                <TableRow key={`${course.id}-${sessionIndex}`}>
                  {sessionIndex === 0 && (
                    <>
                      <TableCell className="font-medium" rowSpan={course.sessions.length}>
                        <div className="flex items-center">
                          <FileCode className="h-4 w-4 mr-2 text-brand-700" />
                          {course.id.substring(0, 8)}
                        </div>
                      </TableCell>
                      <TableCell rowSpan={course.sessions.length}>
                        <Link to={`/course/${course.slug}`} className="hover:text-brand-900 transition-colors font-medium">
                          {course.title}
                        </Link>
                      </TableCell>
                      <TableCell rowSpan={course.sessions.length}>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-brand-700" />
                          {course.duration || '4 weeks'}
                        </div>
                      </TableCell>
                    </>
                  )}
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-brand-700" />
                      <span>
                        {new Date(session.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(session.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-brand-700" />
                      {session.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" asChild>
                      <Link to={`/course/${course.slug}?session=${session.id}`}>
                        Register
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ));
            } else {
              // Fallback for courses without sessions
              return (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileCode className="h-4 w-4 mr-2 text-brand-700" />
                      {course.id.substring(0, 8)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link to={`/course/${course.slug}`} className="hover:text-brand-900 transition-colors font-medium">
                      {course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-brand-700" />
                      {course.duration || '4 weeks'}
                    </div>
                  </TableCell>
                  <TableCell colSpan={2} className="text-center text-gray-500">
                    No scheduled sessions
                  </TableCell>
                  <TableCell>
                    <Button size="sm" asChild>
                      <Link to={`/course/${course.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </UITable>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          {renderBreadcrumbs()}
          
          {/* Page Title */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">{renderPageTitle()}</h1>
              
              {(currentCategory || currentSubcategory) && (
                <Link
                  to={currentSubcategory ? `/courses/${currentCategory?.slug}` : "/courses"}
                  className="inline-flex items-center text-sm font-medium text-brand-900 hover:text-brand-800 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to {currentSubcategory ? currentCategory?.name : "All Categories"}
                </Link>
              )}
            </div>
            
            {currentSubcategory && (
              <div className="flex justify-between items-center">
                <p className="text-gray-600 max-w-3xl">
                  Explore our {currentSubcategory.name} training programs designed to enhance your skills and knowledge.
                </p>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${
                      viewMode === 'grid' 
                        ? 'bg-brand-100 text-brand-900' 
                        : 'text-gray-500 hover:text-brand-900 hover:bg-gray-100'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${
                      viewMode === 'list' 
                        ? 'bg-brand-100 text-brand-900' 
                        : 'text-gray-500 hover:text-brand-900 hover:bg-gray-100'
                    }`}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-md ${
                      viewMode === 'table' 
                        ? 'bg-brand-100 text-brand-900' 
                        : 'text-gray-500 hover:text-brand-900 hover:bg-gray-100'
                    }`}
                    aria-label="Table view"
                  >
                    <Table size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          {isLoading ? (
            // Loading state
            <div className="py-20 text-center">
              <div className="inline-block w-10 h-10 border-4 border-gray-200 border-t-brand-900 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          ) : (
            <>
              {!currentCategory && (
                // Show all categories
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.map((category) => (
                    <CategoryCard 
                      key={category.id} 
                      item={{
                        ...category,
                        image: category.image || `/categories/${category.slug}.jpg`
                      }}
                      type="category"
                    />
                  ))}
                </div>
              )}
              
              {currentCategory && !currentSubcategory && (
                // Show subcategories for a specific category
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCategory.subcategories.map((subcategory) => (
                    <CategoryCard 
                      key={subcategory.id} 
                      item={{
                        ...subcategory,
                        image: subcategory.image || '/placeholder.svg'
                      }}
                      type="subcategory"
                      parentSlug={currentCategory.slug}
                    />
                  ))}
                </div>
              )}
              
              {currentSubcategory && (
                // Show courses for a specific subcategory
                <>
                  {filteredCourses.length > 0 ? (
                    viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                          <CourseCard 
                            key={course.id} 
                            course={{
                              ...course,
                              image: course.image_url || '/placeholder.svg',
                              sessions: course.sessions || []
                            }}
                            showDates={true}
                          />
                        ))}
                      </div>
                    ) : viewMode === 'list' ? (
                      <div className="space-y-6">
                        {filteredCourses.map((course) => (
                          <div 
                            key={course.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/3 lg:w-1/4">
                                <img 
                                  src={course.image_url || '/placeholder.svg'} 
                                  alt={course.title} 
                                  className="w-full h-48 md:h-full object-cover"
                                />
                              </div>
                              <div className="p-6 md:w-2/3 lg:w-3/4">
                                <h3 className="text-xl font-bold mb-3 text-gray-800">
                                  {course.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  {course.short_description}
                                </p>
                                
                                {course.sessions && course.sessions.length > 0 && (
                                  <div className="mb-5 space-y-2">
                                    {course.sessions.slice(0, 2).map((session: any) => (
                                      <div key={session.id} className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 p-2 bg-gray-50 rounded-md">
                                        <div className="flex items-center sm:w-1/2 mb-1 sm:mb-0">
                                          <Calendar size={16} className="mr-2 text-brand-700" />
                                          <span>
                                            {new Date(session.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(session.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                          </span>
                                        </div>
                                        <div className="flex items-center sm:w-1/2">
                                          <MapPin size={16} className="mr-2 text-brand-700" />
                                          <span>{session.location}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                <Link 
                                  to={`/course/${course.slug}`}
                                  className="inline-block bg-brand-900 hover:bg-brand-800 text-white py-2 px-4 rounded-md transition-colors duration-300"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Table view
                      <div className="overflow-x-auto">
                        {renderTableView()}
                      </div>
                    )
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-gray-600">No courses found in this category.</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
