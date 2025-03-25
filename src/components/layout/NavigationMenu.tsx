
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
  
  // Use explicit white text when on homepage and not scrolled
  const textColor = (!isScrolled && isHomePage) ? 'text-white' : 'text-gray-800';
  const hoverColor = (!isScrolled && isHomePage) ? 'hover:text-gray-200' : 'hover:text-brand-700';
  
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
