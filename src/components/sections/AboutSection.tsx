
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Target, Clock, Users } from 'lucide-react';
import { CompanyInfo } from '@/utils/mockData';

interface AboutSectionProps {
  companyInfo: CompanyInfo;
  isVisible: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ companyInfo, isVisible }) => {
  return (
    <section 
      id="about" 
      className="animate-on-scroll py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
  );
};

export default AboutSection;
