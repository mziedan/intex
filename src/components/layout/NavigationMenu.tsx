
import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '@/context/CourseContext';
import { useLanguage } from '@/context/LanguageContext';

interface NavigationMenuProps {
  isScrolled: boolean;
  isHomePage: boolean;
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  isScrolled, 
  isHomePage,
  isMobile = false,
  onItemClick = () => {} 
}) => {
  const { categories } = useCourses();
  const { t } = useLanguage();
  
  // Use brand colors for better visibility in all scenarios
  // When on homepage and not scrolled, use a dark color for visibility against white background
  const textColor = (!isScrolled && isHomePage) ? 'text-brand-800' : 'text-brand-800';
  const hoverColor = (!isScrolled && isHomePage) ? 'hover:text-brand-600' : 'hover:text-brand-600';
  
  const navItems = [
    { text: t('nav.home'), link: '/' },
    { text: t('nav.courses'), link: '/courses' },
    { text: t('nav.about'), link: '/about' },
    { text: t('nav.contact'), link: '/contact' },
  ];

  return (
    <nav>
      <ul className={`${isMobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-8'}`}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link 
              to={item.link}
              className={`font-medium transition-colors ${textColor} ${hoverColor}`}
              onClick={onItemClick}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
