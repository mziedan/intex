
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { companyInfo } from '@/utils/mockData';
import ContactForm from '../ui/ContactForm';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{companyInfo.name}</h3>
            <p className="text-gray-400 mb-6 pr-4">
              Elevating professionals and organizations through expert-led training solutions.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-1 text-brand-200" />
                <a href={`tel:${companyInfo.phone}`} className="text-gray-300 hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-1 text-brand-200" />
                <a href={`mailto:${companyInfo.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-brand-200" />
                <span className="text-gray-300">
                  {companyInfo.address}
                </span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Download Brochure
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Map */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Find Us</h3>
            <div className="rounded-lg overflow-hidden h-64">
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
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href={companyInfo.socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={companyInfo.socialMedia.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href={companyInfo.socialMedia.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={companyInfo.socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
