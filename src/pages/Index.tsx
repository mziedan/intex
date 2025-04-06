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
import { statistics, partners, companyInfo } from '@/utils/mockData';
import { useCourses, Category, Course } from '@/context/CourseContext';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  const { categories, featuredCourses, loading } = useCourses();
  const [mockCategories, setMockCategories] = useState<any[]>([]);
  const [mockFeatured, setMockFeatured] = useState<any[]>([]);
  
  // Fetch slider data
  const { data: heroSlides = [], isLoading: slidersLoading } = useQuery({
    queryKey: ['sliders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sliders')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const visibleElements = useVisibilityObserver({
    sectionIds: ['about', 'partners', 'categories', 'courses', 'stats', 'cta']
  });
  
  // Convert Course context data to format expected by components
  useEffect(() => {
    if (categories && categories.length > 0) {
      const formattedCategories = categories.map(cat => ({
        ...cat,
        image: cat.image || `/images/categories/${cat.slug}.jpg` // Use existing image or fallback
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

  // Format slider data for the component
  const formattedSlides = heroSlides.map((slide: any) => ({
    ...slide,
    title: slide.title || 'Welcome to Excellence Training',
    subtitle: slide.subtitle || 'Empowering professionals through world-class training programs',
    image: slide.image_url || '/images/slider/default.jpg',
    buttonText: slide.button_text || 'Explore Courses',
    buttonLink: slide.button_link || '/courses'
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <HeroSection slides={formattedSlides.length > 0 ? formattedSlides : [
          {
            id: '1',
            title: 'Enhance Your Skills',
            subtitle: 'Join our world-class training programs to advance your career',
            image: '/images/slider/slide1.jpg',
            buttonText: 'Explore Courses',
            buttonLink: '/courses'
          },
          {
            id: '2',
            title: 'Learn from Experts',
            subtitle: 'Our instructors bring years of industry experience',
            image: '/images/slider/slide2.jpg',
            buttonText: 'Meet Our Team',
            buttonLink: '/about'
          }
        ]} />
        
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
