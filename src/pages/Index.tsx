
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Target, Clock, Users } from 'lucide-react';
import ImageSlider from '@/components/ui/ImageSlider';
import CategoryCard from '@/components/ui/CategoryCard';
import CourseCard from '@/components/ui/CourseCard';
import StatCounter from '@/components/ui/StatCounter';
import PartnersSlider from '@/components/ui/PartnersSlider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { heroSlides, statistics, partners, companyInfo } from '@/utils/mockData';
import { useCourses } from '@/context/CourseContext';
import useAnimatedCounter from '@/hooks/useAnimatedCounter';

const Index = () => {
  const { categories, featuredCourses } = useCourses();
  const [visibleElements, setVisibleElements] = useState<{[key: string]: boolean}>({
    about: false,
    categories: false,
    courses: false,
    stats: false,
    partners: false,
    cta: false
  });

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section - Enhanced with animation and overlay */}
        <section className="relative">
          <ImageSlider slides={heroSlides} autoplaySpeed={5000} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Professional <span className="text-brand-300">Training</span> for Your Career Growth
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/80">
                  Elevate your skills with industry-leading experts and certification
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/courses" 
                    className="bg-brand-700 hover:bg-brand-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg text-center"
                  >
                    Browse Courses
                  </Link>
                  <Link 
                    to="/contact" 
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 border border-white/40 text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section - Enhanced with icons and design */}
        <section 
          id="about" 
          className="animate-on-scroll py-24 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className={`max-w-5xl mx-auto transition-all duration-1000 ${
              visibleElements.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="text-center mb-12">
                <div className="inline-block p-2 bg-brand-100 rounded-lg mb-4">
                  <Sparkles className="h-6 w-6 text-brand-700" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About {companyInfo.name}</h2>
                <div className="h-1 w-20 bg-brand-700 mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {companyInfo.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 text-brand-700 mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Certified Trainers</h3>
                  <p className="text-gray-600">Industry experts with proven track records</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 text-brand-700 mb-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Focused Learning</h3>
                  <p className="text-gray-600">Practical skills that apply to your work</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 text-brand-700 mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
                  <p className="text-gray-600">Multiple dates and locations to choose from</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 text-brand-700 mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Small Groups</h3>
                  <p className="text-gray-600">Personalized attention for better results</p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-6 py-3 rounded-md bg-brand-900 text-white font-medium transition-all hover:bg-brand-800 hover:shadow-md"
                >
                  Contact Us <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Categories Section - Enhanced */}
        <section 
          id="categories" 
          className="animate-on-scroll py-24 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.categories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Categories</h2>
              <div className="h-1 w-20 bg-brand-700 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive range of training programs designed to enhance your skills and advance your career.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div 
                  key={category.id}
                  className={`transition-all duration-700 delay-${index * 100} ${
                    visibleElements.categories 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <CategoryCard item={category} type="category" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Courses Section - Modified to 2 rows, 4 columns */}
        <section 
          id="courses" 
          className="animate-on-scroll py-24 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.courses ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
              <div className="h-1 w-20 bg-brand-700 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our most popular training programs selected to help you excel in your field.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.slice(0, 8).map((course, index) => (
                <div 
                  key={course.id}
                  className={`transition-all duration-700 delay-${Math.min(index % 4, 3) * 100} ${
                    visibleElements.courses 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
            
            <div className={`text-center mt-12 transition-all duration-1000 delay-300 ${
              visibleElements.courses ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Link 
                to="/courses" 
                className="inline-flex items-center px-6 py-3 rounded-md bg-brand-900 text-white font-medium transition-all hover:bg-brand-800 hover:shadow-md"
              >
                View All Courses <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Statistics Section - Enhanced */}
        <section 
          id="stats" 
          className="animate-on-scroll py-24 bg-gradient-to-r from-brand-900 to-brand-800 text-white"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 transition-all duration-1000 ${
              visibleElements.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <div className="h-1 w-20 bg-white mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                A testament to our commitment to excellence in professional training and development.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {statistics.map((stat, index) => (
                <div 
                  key={stat.id}
                  className={`transition-all duration-700 delay-${index * 100} ${
                    visibleElements.stats 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <StatCounter stat={stat} className="bg-white/10 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section - New addition */}
        <section
          id="cta"
          className="animate-on-scroll py-24 bg-gray-50 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-brand-500"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-brand-700"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className={`bg-white rounded-xl shadow-xl p-10 md:p-16 max-w-5xl mx-auto transition-all duration-1000 ${
              visibleElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ready to advance your career?</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Join thousands of professionals who have transformed their careers through our training programs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-brand-700"></div>
                        </div>
                      </div>
                      <p className="ml-3 text-gray-600">Flexible learning options</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-brand-700"></div>
                        </div>
                      </div>
                      <p className="ml-3 text-gray-600">Expert instructors</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-brand-700"></div>
                        </div>
                      </div>
                      <p className="ml-3 text-gray-600">Industry-recognized certifications</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link 
                      to="/courses" 
                      className="bg-brand-900 hover:bg-brand-800 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 inline-block hover:shadow-lg"
                    >
                      Find Your Course
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-100 rounded-full z-0"></div>
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-brand-200 rounded-full z-0"></div>
                  <img 
                    src="/placeholder.svg" 
                    alt="Training session" 
                    className="rounded-lg shadow-lg relative z-10 transform hover:rotate-1 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners Section - Enhanced */}
        <section 
          id="partners" 
          className="animate-on-scroll py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.partners ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners & Certifications</h2>
              <div className="h-1 w-20 bg-brand-700 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We collaborate with industry leaders to deliver the highest quality training programs.
              </p>
            </div>
            
            <div className={`transition-all duration-500 ${
              visibleElements.partners ? 'opacity-100' : 'opacity-0'
            }`}>
              <PartnersSlider partners={partners} />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
