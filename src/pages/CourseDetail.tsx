
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/ui/ContactForm';
import { useCourses } from '@/context/CourseContext';
import { format } from 'date-fns';

const CourseDetail = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { getCourseBySlug, getCategoryBySlug } = useCourses();
  
  const [course, setCourse] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    description: true,
    sessions: true,
    registration: false
  });

  useEffect(() => {
    if (!courseSlug) return;
    
    setIsLoading(true);
    setSelectedSession(null);
    
    // Simulate loading delay
    setTimeout(() => {
      const foundCourse = getCourseBySlug(courseSlug);
      setCourse(foundCourse);
      
      if (foundCourse) {
        const foundCategory = getCategoryBySlug(foundCourse.category);
        setCategory(foundCategory);
      }
      
      setIsLoading(false);
    }, 500);
  }, [courseSlug]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSession(sessionId);
    setExpandedSections(prev => ({
      ...prev,
      registration: true
    }));
    
    // Scroll to registration form
    setTimeout(() => {
      document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-4 border-gray-200 border-t-brand-900 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading course details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/courses" 
              className="inline-block bg-brand-900 hover:bg-brand-800 text-white py-2 px-6 rounded-md transition-colors"
            >
              Browse All Courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedSessionData = course.sessions.find((s: any) => s.id === selectedSession);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        {/* Course Banner */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="text-sm text-white/80 mb-2">
                  <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
                  <span className="mx-2">•</span>
                  {category && (
                    <>
                      <Link 
                        to={`/courses/${category.slug}`} 
                        className="hover:text-white transition-colors"
                      >
                        {category.name}
                      </Link>
                      <span className="mx-2">•</span>
                    </>
                  )}
                  <span>{course.title}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {course.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div 
                  className="flex justify-between items-center p-6 border-b cursor-pointer"
                  onClick={() => toggleSection('description')}
                >
                  <h2 className="text-2xl font-bold">Course Description</h2>
                  <button className="text-gray-500">
                    {expandedSections.description ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                
                {expandedSections.description && (
                  <div className="p-6">
                    <p className="text-gray-700 whitespace-pre-line">
                      {course.fullDescription}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Sessions Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div 
                  className="flex justify-between items-center p-6 border-b cursor-pointer"
                  onClick={() => toggleSection('sessions')}
                >
                  <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
                  <button className="text-gray-500">
                    {expandedSections.sessions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                
                {expandedSections.sessions && (
                  <div className="p-6">
                    {course.sessions.length > 0 ? (
                      <div className="space-y-4">
                        {course.sessions.map((session: any) => {
                          const startDate = new Date(session.startDate);
                          const endDate = new Date(session.endDate);
                          const isSelected = session.id === selectedSession;
                          
                          return (
                            <div 
                              key={session.id}
                              className={`p-4 border rounded-lg transition-all ${
                                isSelected 
                                  ? 'border-brand-900 bg-brand-50' 
                                  : 'border-gray-200 hover:border-brand-300'
                              }`}
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Dates</p>
                                  <div className="flex items-center">
                                    <Calendar size={18} className="mr-2 text-brand-700" />
                                    <span className="font-medium">
                                      {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Location</p>
                                  <div className="flex items-center">
                                    <MapPin size={18} className="mr-2 text-brand-700" />
                                    <span className="font-medium">{session.location}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-end">
                                  <button
                                    onClick={() => handleSessionSelect(session.id)}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                      isSelected
                                        ? 'bg-brand-900 text-white'
                                        : 'bg-white text-brand-900 border border-brand-900 hover:bg-brand-50'
                                    }`}
                                  >
                                    {isSelected ? 'Selected' : 'Register'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-600">No upcoming sessions are scheduled for this course at the moment.</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Registration Form */}
              <div id="registration-form" className="bg-white rounded-lg shadow-md overflow-hidden">
                <div 
                  className="flex justify-between items-center p-6 border-b cursor-pointer"
                  onClick={() => toggleSection('registration')}
                >
                  <h2 className="text-2xl font-bold">Course Registration</h2>
                  <button className="text-gray-500">
                    {expandedSections.registration ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                
                {expandedSections.registration && (
                  <div className="p-6">
                    {selectedSession ? (
                      <>
                        <div className="mb-6 p-4 bg-gray-50 rounded-md">
                          <h3 className="font-bold mb-2">Selected Session</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <Calendar size={18} className="mr-2 text-brand-700" />
                              <span>
                                {format(new Date(selectedSessionData.startDate), 'MMM d')} - {format(new Date(selectedSessionData.endDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin size={18} className="mr-2 text-brand-700" />
                              <span>{selectedSessionData.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <ContactForm 
                          type="registration"
                          courseTitle={course.title}
                          sessionDate={`${format(new Date(selectedSessionData.startDate), 'MMM d')} - ${format(new Date(selectedSessionData.endDate), 'MMM d, yyyy')}`}
                          sessionLocation={selectedSessionData.location}
                        />
                      </>
                    ) : (
                      <div className="text-center py-10">
                        <Users size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Select a Session to Register</h3>
                        <p className="text-gray-600 mb-4">Please select one of the available sessions above to proceed with registration.</p>
                        <button
                          onClick={() => {
                            toggleSection('sessions');
                            setTimeout(() => {
                              document.querySelector('[data-section="sessions"]')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="inline-block bg-brand-900 hover:bg-brand-800 text-white py-2 px-6 rounded-md transition-colors"
                        >
                          View Sessions
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Course Info Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-bold mb-1">Course Information</h3>
                  <p className="text-gray-600">{course.shortDescription}</p>
                </div>
                
                <div className="p-6 space-y-4">
                  {category && (
                    <div className="flex items-center text-sm">
                      <span className="w-1/3 text-gray-500">Category:</span>
                      <Link 
                        to={`/courses/${category.slug}`}
                        className="text-brand-900 hover:underline"
                      >
                        {category.name}
                      </Link>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <span className="w-1/3 text-gray-500">Next session:</span>
                    <span className="font-medium">
                      {course.sessions.length > 0 
                        ? format(new Date(course.sessions[0].startDate), 'MMMM d, yyyy')
                        : 'Not scheduled'
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-start text-sm">
                    <span className="w-1/3 text-gray-500">Locations:</span>
                    <div>
                      {course.sessions.length > 0 
                        ? [...new Set(course.sessions.map((s: any) => s.location))].join(', ')
                        : 'TBD'
                      }
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t">
                    {course.sessions.length > 0 ? (
                      <button
                        onClick={() => {
                          handleSessionSelect(course.sessions[0].id);
                        }}
                        className="w-full bg-brand-900 hover:bg-brand-800 text-white py-3 rounded-md transition-colors font-medium"
                      >
                        Register Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-600 py-3 rounded-md font-medium cursor-not-allowed"
                      >
                        No Sessions Available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
