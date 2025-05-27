
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed w-full z-20 top-0 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gradient bg-gradient-to-r from-neon-purple to-neon-blue">
              KOL Leaderboard
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 items-center">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t('Home')}
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t('Leaderboard')}
                </Link>
              </li>
              <li>
                <Link to="/crypto-news" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {language === 'en' ? 'Crypto News Hub' : 'Новости Крипто'}
                </Link>
              </li>
              <li>
                <Link to="/copy-trading" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {language === 'en' ? 'Copy Trading' : 'Копитрейдинг'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t('About')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t('FAQ')}
                </Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      {t('Dashboard')}
                    </Link>
                  </li>
                  <li>
                    <Button 
                      variant="ghost"
                      onClick={logout}
                      className="text-gray-300 hover:text-white"
                    >
                      {t('Logout')}
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <Button variant="ghost" className="text-gray-300 hover:text-white">
                        {t('Login')}
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <Button variant="default" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                        {t('Register')}
                      </Button>
                    </Link>
                  </li>
                </>
              )}
              
              {/* Language switcher */}
              <li>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-9 h-9 border border-white/20 bg-transparent hover:bg-white/10"
                  onClick={toggleLanguage}
                >
                  <span className="font-medium">{language === 'en' ? 'RU' : 'EN'}</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 rounded-lg">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                {t('Home')}
              </Link>
              <Link to="/leaderboard" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                {t('Leaderboard')}
              </Link>
              <Link to="/crypto-news" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                {language === 'en' ? 'Crypto News Hub' : 'Новости Крипто'}
              </Link>
              <Link to="/copy-trading" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                {language === 'en' ? 'Copy Trading' : 'Копитрейдинг'}
              </Link>
              <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                {t('About')}
              </Link>
              <Link to="/faq" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                {t('FAQ')}
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                    {t('Dashboard')}
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >
                    {t('Logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                    {t('Login')}
                  </Link>
                  <Link to="/register" className="text-white bg-gradient-to-r from-neon-purple to-neon-blue block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>
                    {t('Register')}
                  </Link>
                </>
              )}
              
              <button
                onClick={() => {
                  toggleLanguage();
                  toggleMobileMenu();
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                {language === 'en' ? 'Switch to Russian' : 'Переключить на английский'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
