import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Homepage } from './components/Homepage';
import { Dashboard } from './components/Dashboard';
import { PricingPage } from './components/PricingPage';
import { Modal } from './components/Modal';
import { LoginModal } from './components/LoginModal';
import { TrialModalContent } from './components/TrialModal';
import { DemoModalContent } from './components/DemoModal';
import { WaitlistModalContent } from './components/WaitlistModal';
import { BookDemoModalContent } from './components/BookDemoModal';
import { SettingsModal } from './components/SettingsModal';
import { GradientButton } from './components/GradientButton';
import { GlassCard } from './components/GlassCard';
import { FeatureCard } from './components/FeatureCard';
import { AIRecommendationBubble } from './components/AIRecommendationBubble';
import { ToggleSwitch } from './components/ToggleSwitch';
import { CreatorCard } from './components/CreatorCard';
import { BrandCard } from './components/BrandCard';
import { Footer } from './components/Footer';
import { PageLoader } from './components/LoadingSpinner';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Target,
  FileText,
  Video,
  Image as ImageIcon,
  Send,
  MessageCircle,
  Shield,
  FileCheck,
  CreditCard,
  Users,
  MapPin,
  Camera,
  Mic,
  Music,
  Sparkles,
  Brain,
  Zap,
  BarChart3
} from 'lucide-react';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showHomepage, setShowHomepage] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [initialDashboardTab, setInitialDashboardTab] = useState<'growth' | 'persona' | 'sponsors' | 'network'>('growth');
  
  // Modal states
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isBookDemoModalOpen, setIsBookDemoModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterSite = () => {
    setShowHomepage(false);
  };

  const handleLoginWithTab = (tab: 'growth' | 'persona' | 'sponsors' | 'network') => {
    setInitialDashboardTab(tab);
    setIsLoginModalOpen(true);
  };

  const handleGoHome = () => {
    setShowHomepage(true);
    setShowPricing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPricing = () => {
    setShowPricing(true);
    setShowHomepage(false);
  };

  const handleClosePricing = () => {
    setShowPricing(false);
    setShowHomepage(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Show Pricing Page
  if (showPricing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <PricingPage 
          onClose={handleClosePricing}
          onSelectPlan={(plan) => {
            setIsLoginModalOpen(true);
            setShowPricing(false);
            setShowHomepage(false);
          }}
        />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(17, 17, 27, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#fff',
            },
          }}
        />
      </motion.div>
    );
  }

  if (showHomepage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Homepage 
          onEnter={() => setIsLoginModalOpen(true)}
          onWatchDemo={() => setIsDemoModalOpen(true)}
          onLogin={() => setIsLoginModalOpen(true)}
          onFeatureClick={handleLoginWithTab}
          onOpenPricing={handleOpenPricing}
        />
        <Modal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          title="Watch CreatorOS Demo"
        >
          <DemoModalContent onClose={() => setIsDemoModalOpen(false)} />
        </Modal>
        
        {/* Login Modal on Homepage */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={() => {
            setIsLoginModalOpen(false);
            setShowHomepage(false);
          }}
        />
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(17, 17, 27, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#fff',
            },
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Dashboard 
        onLogout={handleGoHome} 
        initialTab={initialDashboardTab}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />
      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
      />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(17, 17, 27, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#fff',
          },
        }}
      />
    </motion.div>
  );
}