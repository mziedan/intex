
import React from 'react';
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
import { useCourses } from '@/context/CourseContext';

const Index = () => {
  const { categories, featuredCourses } = useCourses();
  const visibleElements = useVisibilityObserver({
    sectionIds: ['about', 'partners', 'categories', 'courses', 'stats', 'cta']
  });

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
        
        {/* Partners Section - MOVED to appear after About section */}
        <PartnersSection 
          partners={partners} 
          isVisible={visibleElements.partners} 
        />
        
        {/* Course Categories Section */}
        <CategoriesSection 
          categories={categories} 
          isVisible={visibleElements.categories} 
        />
        
        {/* Featured Courses Section */}
        <CoursesSection 
          featuredCourses={featuredCourses} 
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
