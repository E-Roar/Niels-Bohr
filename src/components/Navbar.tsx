import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, Languages, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToSection: smoothScroll } = useSmoothScroll();
  const { t, language, toggleLanguage, direction } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: '#accueil' },
    { label: t.nav.about, href: '#apropos' },
    { label: t.nav.programs, href: '#programmes' },
    { label: t.nav.gallery, href: '#galerie' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    smoothScroll(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-2 glass-mid backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'py-2 glass-mid backdrop-blur-md border-transparent'
          }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between relative">
          <motion.a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#accueil');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-2 left-4 z-50 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full glass-mid border border-white/20 shadow-lg p-2"
          >
            <img src={logo} alt="Groupe Scolaire Niels Bohr" className="w-full h-full object-contain" />
          </motion.a>

          {/* Spacer to push nav items right since logo is absolute */}
          <div className="w-24 md:w-28" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-background/50 transition-all duration-300 font-medium font-quicksand rtl:font-tajawal"
              >
                {item.label}
              </motion.button>
            ))}

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleLanguage}
              className="ml-2 w-10 h-10 rounded-full"
              title={language === 'fr' ? 'Switch to Arabic' : 'Passer en Français'}
            >
              <span className="font-tajawal text-lg font-bold">
                {language === 'fr' ? 'ع' : 'Fr'}
              </span>
            </Button>

            {/* Admin Login */}
            <Link to="/admin/login">
              <Button
                variant="outline"
                size="icon"
                className="ml-2 w-10 h-10 rounded-full text-melrose-purple hover:text-melrose-purple/80"
                title={t.nav.admin}
              >
                <Lock size={18} />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Left aligned in RTL, Right in LTR */}
          <div className="flex gap-2 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-full"
            >
              <span className="font-tajawal text-lg font-bold">
                {language === 'fr' ? 'ع' : 'Fr'}
              </span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 pt-20 glass-high border-b border-white/20 lg:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2 h-full overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className="p-4 min-h-[44px] rounded-2xl glass-mid border border-white/10 text-lg font-semibold text-foreground active:scale-95 transition-all font-quicksand rtl:font-tajawal touch-manipulation shadow-lg"
                >
                  {item.label}
                </motion.button>
              ))}

              <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full mt-4 flex items-center gap-2 min-h-[44px] touch-manipulation"
                >
                  <Lock size={18} />
                  {t.nav.admin}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
