
import React from 'react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  isVisible: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ isVisible }) => {
  return (
    <section
      id="cta"
      className="animate-on-scroll py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-brand-500"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-brand-700"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className={`bg-white rounded-xl shadow-xl p-10 md:p-16 max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
  );
};

export default CTASection;
