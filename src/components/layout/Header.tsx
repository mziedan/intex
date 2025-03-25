import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import NavigationMenu from './NavigationMenu';
import SearchBar from '@/components/ui/SearchBar';
import useMobile from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="Excellence Training" 
              className="h-10 mr-2"
            />
            <span className={`font-bold text-xl ${
              isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'
            }`}>
              Excellence Training
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-6">
              <NavigationMenu isScrolled={isScrolled} isHomePage={location.pathname === '/'} />
              <SearchBar placeholder={t('search')} />
              <LanguageSwitcher />
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-brand-100 text-brand-800">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="link" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">{t('login')}</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">{t('register')}</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center">
              <LanguageSwitcher />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="ml-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="py-4">
            <NavigationMenu 
              isScrolled={true} 
              isHomePage={false} 
              isMobile={true}
              onItemClick={() => setMobileMenuOpen(false)}
            />
            <div className="mt-4">
              <SearchBar placeholder={t('search')} />
            </div>
            <div className="mt-4 flex flex-col space-y-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-brand-100 text-brand-800">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      {t('login')}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      {t('register')}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
