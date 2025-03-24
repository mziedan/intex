
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// This would eventually come from an API or context
const getPageBySlug = (slug: string) => {
  const pages = [
    {
      id: '1',
      title: 'Our Methodology',
      slug: 'our-methodology',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      content: '<h2>Our Unique Training Methodology</h2><p>Our training programs are designed to maximize learning and practical application...</p>',
      created: '2023-06-15',
      published: true
    }
  ];
  
  return pages.find(page => page.slug === slug && page.published);
};

const CustomPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/not-found" />;
  }
  
  const page = getPageBySlug(slug);
  
  if (!page) {
    return <Navigate to="/not-found" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">{page.title}</h1>
          
          {page.image && (
            <div className="w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <img 
                src={page.image} 
                alt={page.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomPage;
