
import React from 'react';
import PartnersSlider from '@/components/ui/PartnersSlider';
import { Partner } from '@/utils/mockData';

interface PartnersSectionProps {
  partners: Partner[];
  isVisible: boolean;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ partners, isVisible }) => {
  return (
    <section 
      id="partners" 
      className="animate-on-scroll py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners & Certifications</h2>
          <div className="h-1 w-20 bg-brand-700 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We collaborate with industry leaders to deliver the highest quality training programs.
          </p>
        </div>
        
        <div className={`transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <PartnersSlider partners={partners} />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
