
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    
    const scroller = scrollerRef.current;
    
    // Clone the content for a seamless infinite loop
    const content = Array.from(scroller.children);
    content.forEach(item => {
      const clone = item.cloneNode(true);
      scroller.appendChild(clone);
    });
    
    // Calculate the animation duration based on the content width and desired speed
    const calculateAnimationDuration = () => {
      const scrollWidth = scroller.scrollWidth / 2;
      // Slower speed means longer duration (more seconds to travel the same distance)
      const duration = scrollWidth / speed;
      return duration;
    };
    
    let animationDuration = calculateAnimationDuration();
    
    // Set the animation parameters
    scroller.style.animationDuration = `${animationDuration}s`;
    scroller.style.animationTimingFunction = 'linear';
    scroller.style.animationIterationCount = 'infinite';
    scroller.style.animationName = 'scroll';
    
    // Create the keyframe animation
    const keyframes = `
      @keyframes scroll {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-50%);
        }
      }
    `;
    
    // Add the keyframe animation to the document
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.id = 'partnerSliderKeyframes';
    styleSheet.appendChild(document.createTextNode(keyframes));
    document.head.appendChild(styleSheet);
    
    // Handle window resize
    const handleResize = () => {
      animationDuration = calculateAnimationDuration();
      scroller.style.animationDuration = `${animationDuration}s`;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Pause animation when user hovers
    const handleMouseEnter = () => {
      scroller.style.animationPlayState = 'paused';
    };
    
    const handleMouseLeave = () => {
      scroller.style.animationPlayState = 'running';
    };
    
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      // Remove the style sheet
      const styleElement = document.getElementById('partnerSliderKeyframes');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [partners, speed]);
  
  return (
    <div 
      className={cn("w-full overflow-hidden", className)}
      ref={containerRef}
    >
      <div 
        ref={scrollerRef}
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
