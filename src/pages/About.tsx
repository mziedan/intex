
import React, { useEffect, useState } from 'react';
import { ArrowRight, Users, Award, FileCheck, Globe, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { companyInfo } from '@/utils/mockData';

const About = () => {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({
    hero: false,
    mission: false,
    values: false,
    team: false
  });

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
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
        <section 
          id="hero" 
          className="animate-on-scroll py-24 bg-gradient-to-b from-brand-50 to-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute right-0 w-1/3 h-full bg-brand-200 rounded-l-full"></div>
            <div className="absolute left-20 top-20 w-40 h-40 rounded-full bg-brand-300 opacity-20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About {companyInfo.name}</h1>
              <div className="h-1 w-20 bg-brand-700 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                {companyInfo.name} is a leading provider of professional training and development programs, 
                dedicated to helping individuals and organizations achieve their full potential through 
                high-quality educational experiences.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/courses" 
                  className="bg-brand-900 hover:bg-brand-800 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 hover:shadow-lg"
                >
                  Explore Our Courses
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-white border border-brand-200 hover:border-brand-300 text-brand-900 font-medium py-3 px-6 rounded-md transition-all duration-300 hover:shadow-lg"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision Section */}
        <section 
          id="mission" 
          className="animate-on-scroll py-24 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className={`transition-all duration-1000 ${
              visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
                  <div className="h-1 w-16 bg-brand-700 mb-8 rounded-full"></div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <span className="bg-brand-100 text-brand-700 p-2 rounded-full mr-3">
                          <BookOpen className="h-5 w-5" />
                        </span>
                        Our Mission
                      </h3>
                      <p className="text-gray-700">
                        To provide exceptional training experiences that empower individuals and 
                        organizations to achieve their goals through practical, relevant, and 
                        impactful learning solutions.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <span className="bg-brand-100 text-brand-700 p-2 rounded-full mr-3">
                          <Globe className="h-5 w-5" />
                        </span>
                        Our Vision
                      </h3>
                      <p className="text-gray-700">
                        To be the premier provider of professional training, recognized globally 
                        for excellence, innovation, and the measurable impact of our programs on 
                        individual and organizational success.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-100 rounded-full z-0"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-50 rounded-full z-0"></div>
                  <img 
                    src="/placeholder.svg" 
                    alt="Our Mission & Vision" 
                    className="rounded-lg shadow-lg relative z-10 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Values Section */}
        <section 
          id="values" 
          className="animate-on-scroll py-24 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <div className="h-1 w-20 bg-brand-700 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our values guide every aspect of our operations and interactions, 
                ensuring we deliver the highest quality training experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <CheckCircle className="h-6 w-6" />,
                  title: "Excellence",
                  description: "We are committed to the highest standards of quality and continuous improvement in everything we do."
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Collaboration",
                  description: "We believe in the power of teamwork and partnership to achieve outstanding results."
                },
                {
                  icon: <Award className="h-6 w-6" />,
                  title: "Integrity",
                  description: "We uphold the highest ethical standards and are honest, transparent, and accountable in all our actions."
                },
                {
                  icon: <FileCheck className="h-6 w-6" />,
                  title: "Innovation",
                  description: "We continuously seek new and better ways to meet the evolving needs of our clients and the marketplace."
                },
                {
                  icon: <Globe className="h-6 w-6" />,
                  title: "Inclusivity",
                  description: "We embrace diversity and create an environment where everyone feels valued, respected, and empowered."
                },
                {
                  icon: <BookOpen className="h-6 w-6" />,
                  title: "Impact",
                  description: "We measure our success by the positive difference we make in the lives and performance of those we serve."
                }
              ].map((value, index) => (
                <div 
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-700 delay-${index * 100} ${
                    visibleSections.values 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  } hover:shadow-md hover:border-brand-100`}
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 text-brand-700 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-brand-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Discover how our training programs can help you or your organization achieve your goals.
            </p>
            <Link 
              to="/courses" 
              className="inline-flex items-center bg-white text-brand-900 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              Browse Our Courses <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
