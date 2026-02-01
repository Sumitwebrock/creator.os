import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Sparkles, Home } from 'lucide-react';
import { GradientButton } from './GradientButton';

interface NavbarProps {
  onHomeClick?: () => void;
  onGetStarted?: () => void;
  onLogin?: () => void;
}

export function Navbar({ onHomeClick, onGetStarted, onLogin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Growth', section: 'hero' },
    { label: 'Sponsors', section: 'sponsors' },
    { label: 'Local Network', section: 'local-network' },
    { label: 'Pricing', section: 'cta' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Clickable to go home */}
          <motion.button
            onClick={onHomeClick}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              CreatorOS
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Home Button */}
            <motion.button
              onClick={onHomeClick}
              className="text-gray-300 hover:text-white transition-colors relative group flex items-center gap-2"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Home className="w-4 h-4" />
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </motion.button>

            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={`#${item.section}`}
                className="text-gray-300 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.section)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#login"
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              onClick={onLogin}
            >
              Login
            </motion.a>
            <GradientButton size="sm" onClick={onGetStarted}>Get Started</GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col gap-4">
              {/* Home Button in Mobile */}
              <button
                onClick={() => {
                  onHomeClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors py-2 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.section}`}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => scrollToSection(item.section)}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2">
                <a
                  href="#login"
                  className="text-gray-300 hover:text-white transition-colors block py-2"
                  onClick={onLogin}
                >
                  Login
                </a>
                <GradientButton className="w-full mt-2" onClick={onGetStarted}>Get Started</GradientButton>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}