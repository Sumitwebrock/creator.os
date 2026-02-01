import { motion } from 'motion/react';
import { GradientButton } from './GradientButton';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign,
  ChevronDown,
  Play,
  Brain,
  Wand2,
  Handshake,
  MapPin,
  BarChart3,
  FileText,
  Video,
  Image as ImageIcon,
  Calendar,
  Target,
  Shield,
  Camera,
  Mic
} from 'lucide-react';

interface HomepageProps {
  onEnter: () => void;
  onWatchDemo: () => void;
  onLogin: () => void;
  onFeatureClick: (tab: 'growth' | 'persona' | 'sponsors' | 'network') => void;
  onOpenPricing?: () => void;
}

export function Homepage({ onEnter, onWatchDemo, onLogin, onFeatureClick, onOpenPricing }: HomepageProps) {
  const scrollToFeatures = () => {
    const element = document.getElementById('homepage-features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFeatureClick = () => {
    console.log('Feature button clicked!');
    onEnter();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(236, 72, 153, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(236, 72, 153, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Top Bar */}
        <motion.div 
          className="flex items-center justify-between px-6 py-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                  '0 0 40px rgba(236, 72, 153, 0.5)',
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                ],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent text-base md:text-lg">
              CreatorOS
            </span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.button
              className="relative text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg overflow-hidden group text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogin}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative">Login</span>
            </motion.button>
            
            <motion.button
              className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all overflow-hidden group"
              style={{ fontWeight: 600 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-2">
                Start for Free
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-purple-500/30 mb-8 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
              </motion.div>
              <span className="text-gray-300">The AI Suite Built for Creators</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ 
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', 
                lineHeight: 1.1,
              }}
            >
              <motion.span 
                className="bg-gradient-to-r from-pink-400 via-purple-380 to-indigo-400 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                One dashboard. Infinite power.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              AI that predicts trends, creates content in your style, lands sponsorships, 
              and connects you with creators nearby. Your channel never stops growing.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { icon: Brain, label: 'AI Growth Strategist', color: 'from-pink-500 to-rose-500', tab: 'growth' as const },
                { icon: Wand2, label: 'Persona Engine', color: 'from-purple-500 to-violet-500', tab: 'persona' as const },
                { icon: Handshake, label: 'Brand Sponsorships', color: 'from-indigo-500 to-blue-500', tab: 'sponsors' as const },
                { icon: Users, label: 'Creator Network', color: 'from-violet-500 to-purple-500', tab: 'network' as const },
              ].map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => onFeatureClick(item.tab)}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-2`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <p className="text-gray-300 text-sm">{item.label}</p>
                </motion.button>
              ))}
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={onEnter}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center gap-2"
                style={{ fontWeight: 600 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              {onOpenPricing && (
                <motion.button
                  onClick={onOpenPricing}
                  className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-purple-400/60 text-white hover:bg-white/20 hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300"
                  style={{ fontWeight: 600 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Plans
                </motion.button>
              )}
            </div>

            {/* Scroll Indicator */}
            <motion.button
              onClick={scrollToFeatures}
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-sm">Discover all features</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* ALL FEATURES SECTION */}
        <div id="homepage-features" className="px-6 py-20 space-y-32">
          <div className="max-w-7xl mx-auto">
            
            {/* Feature 1: AI Growth Strategist */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 mb-4">
                  <Brain className="w-4 h-4 text-pink-400" />
                  <span className="text-pink-400 text-sm">AI Growth Strategist</span>
                </div>
                <h2 className="mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Your AI Growth Brain
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Stop guessing what to post. Our AI analyzes trends, predicts virality, and gives you a personalized content calendar optimized for maximum growth.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    { icon: BarChart3, text: 'Real-time trend predictions' },
                    { icon: Calendar, text: 'AI-generated content calendar' },
                    { icon: Target, text: 'Engagement optimization' },
                    { icon: Sparkles, text: 'Personalized growth strategies' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-pink-400" />
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  onClick={() => onFeatureClick('growth')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Growth AI
                </motion.button>
              </div>
              
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent backdrop-blur-xl border border-pink-500/20 shadow-[0_0_80px_rgba(236,72,153,0.2)]">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-green-400">Trending Up 🔥</span>
                      </div>
                      <p className="text-gray-400 text-sm">Post about "AI productivity tools" - 89% viral potential</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-400">Scheduled for Monday</span>
                      </div>
                      <p className="text-gray-400 text-sm">Best time to post: 2:00 PM EST</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-pink-400" />
                        <span className="text-pink-400">Growth Target</span>
                      </div>
                      <p className="text-gray-400 text-sm">+15K followers projected this month</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Feature 2: Persona Engine */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                className="relative order-2 md:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-transparent backdrop-blur-xl border border-purple-500/20 shadow-[0_0_80px_rgba(168,85,247,0.2)]">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-400">Generated Caption</span>
                      </div>
                      <p className="text-gray-300 text-sm italic">"Just spent 12 hours editing and honestly? Worth it. Here's what I learned... 🎨✨"</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-400">98% style match</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Video className="w-5 h-5 text-pink-400" />
                        <span className="text-pink-400">Video Script</span>
                      </div>
                      <p className="text-gray-300 text-sm italic">"Yo what's up! So I was scrolling at 2am and realized something crazy..."</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-400">95% tone match</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <ImageIcon className="w-5 h-5 text-rose-400" />
                        <span className="text-rose-400">Thumbnail Idea</span>
                      </div>
                      <p className="text-gray-300 text-sm">Bold text: "THIS CHANGED EVERYTHING"</p>
                      <p className="text-gray-400 text-xs mt-1">Neon pink/purple gradient • High contrast</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
                  <Wand2 className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm">Persona Engine</span>
                </div>
                <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI That Sounds Like You
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Train your personal AI to write captions, scripts, and create thumbnails in your unique voice and style. It learns from your past content and generates new ideas that sound authentically you.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    { icon: FileText, text: 'Voice-matched captions & scripts' },
                    { icon: ImageIcon, text: 'Brand-consistent thumbnails' },
                    { icon: Brain, text: 'Learns your unique style' },
                    { icon: Sparkles, text: 'Generates authentic content' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  onClick={() => onFeatureClick('persona')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Train Your AI
                </motion.button>
              </div>
            </motion.div>

            {/* Feature 3: Sponsorship Marketplace */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-4">
                  <Handshake className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-400 text-sm">Sponsorship Marketplace</span>
                </div>
                <h2 className="mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                  Smart Brand Deals
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  AI matches you with perfect brand partnerships. Automated contracts, secure escrow payments, and deals that actually align with your audience.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    { icon: Target, text: 'AI-powered brand matching' },
                    { icon: Shield, text: 'Secure escrow payments' },
                    { icon: FileText, text: 'Smart contract automation' },
                    { icon: DollarSign, text: 'Fair pricing analytics' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-pink-500/20 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  onClick={() => onFeatureClick('sponsors')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Find Brand Deals
                </motion.button>
              </div>
              
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-pink-500/10 to-transparent backdrop-blur-xl border border-indigo-500/20 shadow-[0_0_80px_rgba(99,102,241,0.2)]">
                  <div className="space-y-4">
                    {[
                      { brand: 'TechGear Co.', match: '94%', budget: '₹5,000', status: 'Active' },
                      { brand: 'CreativeSoft', match: '87%', budget: '₹3,500', status: 'Pending' },
                      { brand: 'StreamPro', match: '82%', budget: '₹4,200', status: 'New' },
                    ].map((deal, idx) => (
                      <motion.div
                        key={deal.brand}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-sm">
                              {deal.brand.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white">{deal.brand}</p>
                              <p className="text-sm text-gray-400">{deal.budget}</p>
                            </div>
                          </div>
                          <div className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm">
                            {deal.match} Match
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Feature 4: Creator Network */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                className="relative order-2 md:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-transparent backdrop-blur-xl border border-violet-500/20 shadow-[0_0_80px_rgba(139,92,246,0.2)]">
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Chen', skill: 'Videographer', followers: '125K', rating: 4.9 },
                      { name: 'Mike Johnson', skill: 'Audio Engineer', followers: '89K', rating: 4.8 },
                      { name: 'Alex Rivera', skill: 'Video Editor', followers: '210K', rating: 5.0 },
                    ].map((creator, idx) => (
                      <motion.div
                        key={creator.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-violet-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                            {creator.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white">{creator.name}</p>
                            <p className="text-sm text-gray-400">{creator.skill} • {creator.followers}</p>
                          </div>
                        </div>
                        <div className="text-yellow-400 text-sm">★ {creator.rating}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 mb-4">
                  <Users className="w-4 h-4 text-violet-400" />
                  <span className="text-violet-400 text-sm">Creator Network</span>
                </div>
                <h2 className="mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Connect & Collaborate
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Network with other creators, find collaboration partners, and grow together. Build meaningful partnerships and expand your creative community.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    { icon: Users, text: 'Connect with verified creators' },
                    { icon: Sparkles, text: 'Find collaboration opportunities' },
                    { icon: Target, text: 'Match by niche & audience' },
                    { icon: BarChart3, text: 'Grow your network' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-violet-400" />
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  onClick={() => onFeatureClick('network')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Creator Network
                </motion.button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-6 py-32"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-purple-500/30 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-gray-300">Ready to Transform Your Creative Journey?</span>
            </motion.div>

            <h2 className="mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Start Creating Smarter Today
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of creators who've automated their growth and scaled their creative empire with AI.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={onEnter}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center gap-2"
                style={{ fontWeight: 600 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              {onOpenPricing && (
                <motion.button
                  onClick={onOpenPricing}
                  className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-purple-400/60 text-white hover:bg-white/20 hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300"
                  style={{ fontWeight: 600 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Plans
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-60 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>
    </div>
  );
}