
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PartnersSection from '@/components/sections/PartnersSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import CoursesSection from '@/components/sections/CoursesSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import CTASection from '@/components/sections/CTASection';
import useVisibilityObserver from '@/hooks/useVisibilityObserver';
import { heroSlides, statistics, partners, companyInfo } from '@/utils/mockData';
import { useCourses, Category, Course } from '@/context/CourseContext';

const Index = () => {
  const { categories, featuredCourses, loading } = useCourses();
  const [mockCategories, setMockCategories] = useState<any[]>([]);
  const [mockFeatured, setMockFeatured] = useState<any[]>([]);
  
  const visibleElements = useVisibilityObserver({
    sectionIds: ['about', 'partners', 'categories', 'courses', 'stats', 'cta']
  });
  
  // Convert Course context data to format expected by components
  useEffect(() => {
    if (categories && categories.length > 0) {
      const formattedCategories = categories.map(cat => ({
        ...cat,
        image: cat.image || `/categories/${cat.slug}.jpg` // Use existing image or fallback
      }));
      setMockCategories(formattedCategories);
    }
    
    if (featuredCourses && featuredCourses.length > 0) {
      const formattedCourses = featuredCourses.map(course => ({
        ...course,
        image: course.image_url || '/placeholder.svg',
        shortDescription: course.short_description,
        category: course.category_name || '',
        duration: course.duration || '4 weeks',
        level: course.level || 'Beginner',
        sessions: course.sessions || []
      }));
      setMockFeatured(formattedCourses);
    }
  }, [categories, featuredCourses]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <HeroSection slides={heroSlides} />
        
        {/* About Section */}
        <AboutSection 
          companyInfo={companyInfo} 
          isVisible={visibleElements.about} 
        />
        
        {/* Partners Section */}
        <PartnersSection 
          partners={partners} 
          isVisible={visibleElements.partners} 
        />
        
        {/* Course Categories Section */}
        <CategoriesSection 
          categories={mockCategories} 
          isVisible={visibleElements.categories} 
        />
        
        {/* Featured Courses Section */}
        <CoursesSection 
          featuredCourses={mockFeatured} 
          isVisible={visibleElements.courses} 
        />
        
        {/* Statistics Section */}
        <StatisticsSection 
          statistics={statistics} 
          isVisible={visibleElements.stats} 
        />
        
        {/* CTA Section */}
        <CTASection isVisible={visibleElements.cta} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
