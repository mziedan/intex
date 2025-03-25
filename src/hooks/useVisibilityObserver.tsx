
import { useState, useEffect } from 'react';

interface VisibilityObserverProps {
  sectionIds: string[];
}

const useVisibilityObserver = ({ sectionIds }: VisibilityObserverProps) => {
  const [visibleElements, setVisibleElements] = useState<{[key: string]: boolean}>(() => {
    const initialState: {[key: string]: boolean} = {};
    sectionIds.forEach(id => {
      initialState[id] = false;
    });
    return initialState;
  });

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => ({
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

  return visibleElements;
};

export default useVisibilityObserver;
