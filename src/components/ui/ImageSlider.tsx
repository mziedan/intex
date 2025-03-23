
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slide } from '@/utils/mockData';

interface ImageSliderProps {
  slides: Slide[];
  autoplaySpeed?: number;
  className?: string;
}

const ImageSlider = ({ slides, autoplaySpeed = 5000, className }: ImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700); // Match this with the CSS transition duration
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700); // Match this with the CSS transition duration
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700); // Match this with the CSS transition duration
  };

  // Set up autoplay
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplaySpeed > 0 && !isPaused) {
        clearInterval(autoplayTimerRef.current as NodeJS.Timeout);
        autoplayTimerRef.current = setInterval(nextSlide, autoplaySpeed);
      }
    };
    
    startAutoplay();
    
    // Cleanup function
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplaySpeed, isPaused, currentSlide]);

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    setIsPaused(true);
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };

  const resumeAutoplay = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div className="relative w-full h-[70vh] md:h-[80vh]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-700",
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 md:px-12">
              <div className={cn(
                "transition-all duration-700 transform",
                currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors p-2 rounded-full text-white/90 hover:text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors p-2 rounded-full text-white/90 hover:text-white"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
