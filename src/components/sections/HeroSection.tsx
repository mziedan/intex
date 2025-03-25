
import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '@/components/ui/ImageSlider';
import { Slide } from '@/utils/mockData';

interface HeroSectionProps {
  slides: Slide[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => {
  return (
    <section className="relative">
      <ImageSlider slides={slides} autoplaySpeed={5000} />
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
  );
};

export default HeroSection;
