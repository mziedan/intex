
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormProps {
  className?: string;
  type?: 'contact' | 'registration';
  courseTitle?: string;
  sessionDate?: string;
  sessionLocation?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  className, 
  type = 'contact',
  courseTitle,
  sessionDate,
  sessionLocation
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    course: courseTitle || '',
    session: sessionDate || '',
    location: sessionLocation || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        course: courseTitle || '',
        session: sessionDate || '',
        location: sessionLocation || ''
      });
      
      // Show success message
      if (type === 'contact') {
        toast.success('Your message has been sent successfully. We will contact you soon.');
      } else {
        toast.success('Your registration request has been sent successfully. We will contact you with further details.');
      }
    }, 1500);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company / Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        {type === 'registration' && (
          <div className="space-y-5">
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                readOnly={!!courseTitle}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none transition-all"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="session" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Dates
                </label>
                <input
                  type="text"
                  id="session"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  readOnly={!!sessionDate}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  readOnly={!!sessionLocation}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'contact' ? 'Message *' : 'Additional Information'}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required={type === 'contact'}
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition-all"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-3 rounded-md bg-brand-900 text-white font-medium transition-all hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              {type === 'contact' ? 'Send Message' : 'Submit Registration'}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
