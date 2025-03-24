
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">Terms and Conditions</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>These terms and conditions outline the rules and regulations for the use of TrainingPro's Website. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use TrainingPro's website if you do not accept all of the terms and conditions stated on this page.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. License</h2>
            <p>Unless otherwise stated, TrainingPro and/or its licensors own the intellectual property rights for all material on TrainingPro. All intellectual property rights are reserved. You may view and/or print pages from our website for your own personal use subject to restrictions set in these terms and conditions.</p>
            
            <p>You must not:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Republish material from this website</li>
              <li>Sell, rent or sub-license material from this website</li>
              <li>Reproduce, duplicate or copy material from this website</li>
              <li>Redistribute content from TrainingPro (unless content is specifically made for redistribution)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Content</h2>
            <p>In these terms and conditions, "Your Content" shall mean any audio, video, text, images or other material you choose to display on this website. With respect to Your Content, by displaying it, you grant TrainingPro a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any media.</p>
            
            <p>Your Content must be your own and must not be infringing on any third party's rights. TrainingPro reserves the right to remove any of Your Content from this website at any time without notice.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. No warranties</h2>
            <p>This website is provided "as is," with all faults, and TrainingPro makes no express or implied representations or warranties, of any kind related to this website or the materials contained on this website.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of liability</h2>
            <p>In no event shall TrainingPro, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of your country and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsConditions;
