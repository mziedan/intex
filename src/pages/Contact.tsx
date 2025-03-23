
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/ui/ContactForm';
import { companyInfo } from '@/utils/mockData';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        {/* Page Header */}
        <div className="bg-brand-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Have questions about our training programs? We're here to help. Reach out to our team for more information.
            </p>
          </div>
        </div>
        
        {/* Contact Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-gray-700 mb-8">
                  Whether you have questions about our training programs, want to discuss custom training solutions for your organization, or need assistance with registration, our team is ready to help.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-brand-50 p-3 rounded-full mr-4">
                      <Phone size={20} className="text-brand-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600">{companyInfo.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">Monday - Friday, 9AM - 5PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-50 p-3 rounded-full mr-4">
                      <Mail size={20} className="text-brand-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">{companyInfo.email}</p>
                      <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-50 p-3 rounded-full mr-4">
                      <MapPin size={20} className="text-brand-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                      <p className="text-gray-600">{companyInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="rounded-lg overflow-hidden h-80 shadow-md">
                <iframe 
                  src={companyInfo.mapLocation}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
