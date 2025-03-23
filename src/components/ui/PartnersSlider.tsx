
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PartnersSliderProps {
  partners: Array<{
    id: string;
    name: string;
    logo: string;
  }>;
  speed?: number;
  className?: string;
}

const PartnersSlider = ({ partners, speed = 30, className }: PartnersSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const originalContent = container.innerHTML;
    
    // Duplicate content for seamless looping
    container.innerHTML = originalContent + originalContent;
    
    const scrollWidth = container.scrollWidth / 2;
    let currentPosition = 0;
    
    const animate = () => {
      currentPosition -= 0.5; // Adjust speed here (higher = faster)
      
      // Reset position once we've scrolled through half the content
      if (currentPosition <= -scrollWidth) {
        currentPosition = 0;
      }
      
      if (container) {
        container.style.transform = `translateX(${currentPosition}px)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [partners]);
  
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div 
        ref={containerRef}
        className="flex items-center"
        style={{ willChange: 'transform' }}
      >
        {partners.map((partner) => (
          <div 
            key={partner.id} 
            className="flex-shrink-0 mx-8 py-4"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSlider;
