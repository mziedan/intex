
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageSlider from '@/components/ui/ImageSlider';
import CategoryCard from '@/components/ui/CategoryCard';
import CourseCard from '@/components/ui/CourseCard';
import StatCounter from '@/components/ui/StatCounter';
import PartnersSlider from '@/components/ui/PartnersSlider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { heroSlides, statistics, partners, companyInfo } from '@/utils/mockData';
import { useCourses } from '@/context/CourseContext';

const Index = () => {
  const { categories, featuredCourses } = useCourses();
  const [visibleElements, setVisibleElements] = useState<{[key: string]: boolean}>({
    about: false,
    categories: false,
    courses: false,
    stats: false,
    partners: false
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
        {/* Hero Section */}
        <section className="relative">
          <ImageSlider slides={heroSlides} autoplaySpeed={5000} />
        </section>
        
        {/* About Section */}
        <section 
          id="about" 
          className="animate-on-scroll py-20 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              visibleElements.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About {companyInfo.name}</h2>
              <p className="text-lg text-gray-700 mb-8">
                {companyInfo.description}
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 rounded-md bg-brand-900 text-white font-medium transition-all hover:bg-brand-800"
              >
                Contact Us <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Course Categories Section */}
        <section 
          id="categories" 
          className="animate-on-scroll py-20"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.categories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Categories</h2>
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
        
        {/* Featured Courses Section */}
        <section 
          id="courses" 
          className="animate-on-scroll py-20 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.courses ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our most popular training programs selected to help you excel in your field.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <div 
                  key={course.id}
                  className={`transition-all duration-700 delay-${index * 100} ${
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
                className="inline-flex items-center px-6 py-3 rounded-md bg-brand-900 text-white font-medium transition-all hover:bg-brand-800"
              >
                View All Courses <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Statistics Section */}
        <section 
          id="stats" 
          className="animate-on-scroll py-20 bg-brand-900 text-white"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                A testament to our commitment to excellence in professional training and development.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {statistics.map((stat, index) => (
                <div 
                  key={stat.id}
                  className={`transition-all duration-700 delay-${index * 100} ${
                    visibleElements.stats 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <StatCounter stat={stat} className="bg-white/10 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section 
          id="partners" 
          className="animate-on-scroll py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.partners ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners & Certifications</h2>
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
