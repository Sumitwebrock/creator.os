import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Zap,
  Crown,
  Star,
  Brain,
  Wand2,
  Handshake,
  MapPin,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Video,
  TrendingUp,
  Users,
  Calendar,
  Shield,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface PricingPageProps {
  onClose: () => void;
  onSelectPlan?: (plan: string) => void;
}

export function PricingPage({ onClose, onSelectPlan }: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = (planName: string) => {
    toast.success(`${planName} selected! Redirecting to checkout...`);
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
  };

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      badge: null,
      color: 'from-gray-500 to-gray-600',
      glowColor: 'rgba(156, 163, 175, 0.3)',
      features: [
        { text: '100 AI Credits / month', icon: Zap },
        { text: 'Unlimited Sponsor Matching', icon: Handshake, highlight: true },
        { text: 'Unlimited Creator Network', icon: MapPin, highlight: true },
        { text: 'Use credits on scripts, captions, thumbnails', icon: FileText },
        { text: 'Basic analytics', icon: BarChart3 },
        { text: 'AI recommendations', icon: Brain },
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Creator Pro',
      price: { monthly: 499, yearly: 4990 },
      badge: 'Most Popular',
      color: 'from-pink-500 via-purple-500 to-indigo-500',
      glowColor: 'rgba(168, 85, 247, 0.5)',
      features: [
        { text: '5,000 AI Credits / month', icon: Zap },
        { text: 'Full Persona Engine', icon: Wand2 },
        { text: 'Full Growth Strategist', icon: Brain },
        { text: 'Trend forecasting + tone analysis', icon: TrendingUp },
        { text: 'Unlimited content tools', icon: Video },
        { text: 'Sponsor Matching PRO tools', icon: Handshake },
        { text: 'Escrow + Contract Generator', icon: Shield },
      ],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'CreatorOS Premium',
      price: { monthly: 1399, yearly: 13990 },
      badge: 'Best Value',
      color: 'from-violet-500 via-purple-500 to-pink-500',
      glowColor: 'rgba(236, 72, 153, 0.5)',
      features: [
        { text: '20,000 AI Credits / month', icon: Zap },
        { text: 'Persona Engine trained on full content', icon: Wand2 },
        { text: 'Deep audience analytics', icon: BarChart3 },
        { text: 'Auto content calendar', icon: Calendar },
        { text: '2 team seats', icon: Users },
        { text: 'Sponsor Matching Enterprise', icon: Handshake },
        { text: 'Priority support', icon: Crown },
      ],
      cta: 'Unlock Premium',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(236, 72, 153, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(236, 72, 153, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        {/* Animated Neon Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top Bar */}
        <motion.div 
          className="flex items-center justify-between px-6 py-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                CreatorOS
              </span>
            </div>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all text-gray-400 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </motion.button>
          </div>
          <motion.button
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Header */}
        <div className="px-6 py-16 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-purple-500/30 mb-8"
          >
            <Star className="w-4 h-4 text-pink-400" />
            <span className="text-gray-300">Pricing Plans</span>
          </motion.div>

          <motion.h1
            className="mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Choose a Plan That Grows With You
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Scale your creative empire with AI-powered tools designed for every stage of your journey.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="inline-flex items-center gap-4 p-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-green-500 text-xs">
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="px-6 pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative group ${plan.popular ? 'md:-mt-8' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                }}
              >
                {/* Card */}
                <div 
                  className={`relative h-full p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 border-purple-500/30' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  style={{
                    boxShadow: plan.popular 
                      ? `0 0 80px ${plan.glowColor}` 
                      : undefined,
                  }}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${plan.color} text-sm shadow-lg`}>
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Plan Name */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        ₹{billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.yearly / 12)}
                      </span>
                      <span className="text-gray-400">/mo</span>
                    </div>
                    {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        ₹{plan.price.yearly} billed yearly
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 + idx * 0.05 }}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          feature.highlight 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-pink-500 to-purple-500'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={`text-sm ${feature.highlight ? 'text-green-400' : 'text-gray-300'}`}>
                          {feature.text}
                          {feature.highlight && ' (FREE)'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 rounded-xl transition-all duration-300 ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} hover:shadow-[0_0_40px_${plan.glowColor}]`
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectPlan(plan.name)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                {plan.popular && (
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.color} opacity-0 group-hover:opacity-20 blur-2xl -z-10 transition-opacity duration-300`}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="px-6 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-purple-500/20"
            >
              <h3 className="text-2xl mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                All Plans Include
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Handshake, text: 'Unlimited Sponsor Matching' },
                  { icon: MapPin, text: 'Unlimited Creator Network Access' },
                  { icon: Shield, text: 'Secure escrow payments' },
                  { icon: Brain, text: 'AI-powered recommendations' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-6 pb-32">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-4">
              {[
                {
                  q: 'What are AI Credits?',
                  a: 'AI Credits are used to generate content like scripts, captions, thumbnails, and analytics. Each generation costs a certain number of credits based on complexity.',
                },
                {
                  q: 'Can I upgrade or downgrade anytime?',
                  a: 'Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the next billing cycle.',
                },
                {
                  q: 'Is Sponsor Matching really unlimited on all plans?',
                  a: 'Absolutely! We believe every creator should have access to brand deals, regardless of their plan. All sponsor matching features are completely free.',
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-white mb-2">{faq.q}</h4>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}