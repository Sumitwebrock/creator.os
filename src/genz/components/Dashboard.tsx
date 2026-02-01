import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Target,
  Brain,
  Wand2,
  Handshake,
  MapPin,
  FileText,
  Video,
  Image as ImageIcon,
  Sparkles,
  BarChart3,
  Users,
  DollarSign,
  Camera,
  Mic,
  Zap,
  Send,
  CheckCircle,
  Clock,
  Settings,
  LogOut,
  Play,
  X,
  MessageCircle,
  ThumbsUp,
  Shield,
  TrendingDown,
  ArrowUpRight,
  Percent,
  Copy,
  Hash
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { LoadingSpinner } from './LoadingSpinner';
import { ScriptDetailModal, CaptionDetailModal } from './PersonaEngineModals';
import { TrendingTopicModal, PostingTimeModal } from './GrowthStrategistModals';
import { BrandDealModal } from './SponsorshipModals';
import { CreatorProfileModal } from './CreatorNetworkModals';
import { appendMessage } from '../utils/messageLibrary';

interface DashboardProps {
  onLogout: () => void;
  initialTab?: 'growth' | 'persona' | 'sponsors' | 'network' | null;
  onOpenSettings?: () => void;
}

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function Dashboard({ onLogout, initialTab = null, onOpenSettings }: DashboardProps) {
  const [activeFeature, setActiveFeature] = useState<'persona' | 'growth' | 'sponsors' | 'network' | null>(initialTab ?? null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [isLoadingFeature, setIsLoadingFeature] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm your AI assistant. I can help you generate content ideas, analyze your audience, find brand deals, and connect with creators.",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Keep active feature in sync with the tab specified in the URL (e.g. /dashboard?tab=persona).
  React.useEffect(() => {
    setActiveFeature(initialTab ?? null);
  }, [initialTab]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Animated Grid Background */}
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
      
      {/* Top Bar */}
      <motion.div 
        className="relative z-10 flex items-center justify-between px-6 py-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            CreatorOS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            onClick={onOpenSettings}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </motion.button>
          <motion.button
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Dashboard Content */}
      <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto space-y-8">
        {/* 1. Welcome Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.3)]"
        >
          <div className="relative z-10">
            <motion.h1
              className="mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, Creator Pro
            </motion.h1>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Here's your AI action plan for today.
            </motion.p>
          </div>
          {/* Animated shapes background */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>

        {/* 2. AI Actions for You Today (Growth Strategist Panel) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-pink-400" />
            <h2 className="text-gray-300">AI Actions for You Today</h2>
            <span className="text-xs text-gray-500 ml-2">Powered by Growth Strategist</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { 
                icon: Video, 
                action: "Post a 45-sec reel today at 2 PM", 
                detail: "Peak audience activity detected",
                color: "from-pink-500 to-rose-500"
              },
              { 
                icon: MessageSquare, 
                action: "Your audience prefers witty opinions today", 
                detail: "Sentiment analysis shows 78% positive response",
                color: "from-purple-500 to-violet-500"
              },
              { 
                icon: TrendingUp, 
                action: "Short tech POV videos trending", 
                detail: "320% increase in engagement this week",
                color: "from-indigo-500 to-blue-500"
              },
              { 
                icon: Users, 
                action: "Collaborate with a nearby music creator", 
                detail: "3 matches within 5 miles",
                color: "from-violet-500 to-purple-500"
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)"
                }}
                onClick={() => toast.success(`Action started: ${card.action}`)}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <p className="text-white mb-2">{card.action}</p>
                  <p className="text-sm text-gray-400">{card.detail}</p>
                </div>

                {/* Animated border glow */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-30 blur-xl`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3. Feature Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-gray-300 mb-6">Your AI Features</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { 
                title: 'Persona Engine', 
                icon: Wand2, 
                color: 'from-purple-500 to-pink-500',
                description: 'AI trained on your voice',
                tab: 'persona' as const
              },
              { 
                title: 'Growth Strategist', 
                icon: Brain, 
                color: 'from-pink-500 to-rose-500',
                description: 'Predict trends & optimize',
                tab: 'growth' as const
              },
              { 
                title: 'Sponsor Matching', 
                icon: Handshake, 
                color: 'from-indigo-500 to-purple-500',
                description: 'AI-powered brand deals',
                tab: 'sponsors' as const
              },
              { 
                title: 'Creator Network', 
                icon: Users, 
                color: 'from-violet-500 to-purple-500',
                description: 'Connect & collaborate',
                tab: 'network' as const
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden"
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 0 60px rgba(168, 85, 247, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveFeature(feature.tab)}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="mb-3 text-gray-200">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>

                {/* Animated corner accent */}
                <motion.div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-20 blur-2xl`}
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* 5. AI Assistant Bubble */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          className="relative group"
          onClick={() => setShowAIChat(!showAIChat)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Animated glow rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Main button */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.6)]">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 rounded-xl bg-black/90 backdrop-blur-xl border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm">Ask CreatorOS anything</p>
          </div>
        </motion.button>
      </motion.div>

      {/* AI Chat Panel */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            className="fixed bottom-28 right-8 w-96 h-[500px] rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.4)] z-50 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-pink-500/10 to-purple-500/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm">CreatorOS AI</p>
                  <p className="text-xs text-green-400">● Online</p>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.role === 'assistant' ? '' : 'justify-end'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                  <div
                    className={`bg-white/5 rounded-2xl px-4 py-2 max-w-[80%] text-sm whitespace-pre-wrap ${
                      message.role === 'assistant' ? 'rounded-tl-none' : 'rounded-tr-none bg-purple-500/20'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}

              {isSendingChat && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] text-xs text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    CreatorOS AI is thinking...
                  </div>
                </div>
              )}

              {chatError && (
                <p className="text-xs text-rose-400 mt-2">
                  {chatError}
                </p>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything about growth, sponsors, or content..."
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-sm"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (!chatInput.trim() || isSendingChat) return;

                      const userMessage: ChatMessage = {
                        id: `user-${Date.now()}`,
                        role: 'user',
                        content: chatInput.trim(),
                      };

                      const messagesToSend = [...chatMessages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                      }));

                      setChatMessages((prev) => [...prev, userMessage]);
                      setChatInput('');
                      setChatError(null);
                      setIsSendingChat(true);

                      try {
                        const res = await fetch('/api/chat', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ messages: messagesToSend }),
                        });

                        if (!res.ok) {
                          const data = await res.json().catch(() => ({}));
                          const base = (data as any).error ?? 'Failed to reach CreatorOS AI.';
                          const details = (data as any).details ? ` ${
                            (data as any).details
                          }` : '';
                          throw new Error(base + details);
                        }

                        const data = (await res.json()) as { reply?: string };
                        const reply = data.reply?.trim() ||
                          "I'm here, but I couldn't generate a proper response. Try asking in a different way.";

                        setChatMessages((prev) => [
                          ...prev,
                          {
                            id: `assistant-${Date.now()}`,
                            role: 'assistant',
                            content: reply,
                          },
                        ]);
                      } catch (err) {
                        const message = err instanceof Error ? err.message : 'Something went wrong.';
                        setChatError(message);
                      } finally {
                        setIsSendingChat(false);
                      }
                    }
                  }}
                />
                <button
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={!chatInput.trim() || isSendingChat}
                  onClick={async () => {
                    if (!chatInput.trim() || isSendingChat) return;

                    const userMessage: ChatMessage = {
                      id: `user-${Date.now()}`,
                      role: 'user',
                      content: chatInput.trim(),
                    };

                    const messagesToSend = [...chatMessages, userMessage].map((m) => ({
                      role: m.role,
                      content: m.content,
                    }));

                    setChatMessages((prev) => [...prev, userMessage]);
                    setChatInput('');
                    setChatError(null);
                    setIsSendingChat(true);

                    try {
                      const res = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ messages: messagesToSend }),
                      });

                      if (!res.ok) {
                        const data = await res.json().catch(() => ({}));
                        const base = (data as any).error ?? 'Failed to reach CreatorOS AI.';
                        const details = (data as any).details ? ` ${
                          (data as any).details
                        }` : '';
                        throw new Error(base + details);
                      }

                      const data = (await res.json()) as { reply?: string };
                      const reply = data.reply?.trim() ||
                        "I'm here, but I couldn't generate a proper response. Try asking in a different way.";

                      setChatMessages((prev) => [
                        ...prev,
                        {
                          id: `assistant-${Date.now()}`,
                          role: 'assistant',
                          content: reply,
                        },
                      ]);
                    } catch (err) {
                      const message = err instanceof Error ? err.message : 'Something went wrong.';
                      setChatError(message);
                    } finally {
                      setIsSendingChat(false);
                    }
                  }}
                >
                  {isSendingChat ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Detail Modals */}
      <AnimatePresence>
        {activeFeature === 'persona' && (
          <FeatureDetailModal
            title="Persona Engine"
            icon={Wand2}
            gradient="from-purple-500 to-violet-500"
            onClose={() => setActiveFeature(null)}
          >
            <PersonaEngineContent />
          </FeatureDetailModal>
        )}
        {activeFeature === 'growth' && (
          <FeatureDetailModal
            title="Growth Strategist"
            icon={Brain}
            gradient="from-pink-500 to-rose-500"
            onClose={() => setActiveFeature(null)}
          >
            <GrowthStrategistContent />
          </FeatureDetailModal>
        )}
        {activeFeature === 'sponsors' && (
          <FeatureDetailModal
            title="Sponsor Matching"
            icon={Handshake}
            gradient="from-indigo-500 to-blue-500"
            onClose={() => setActiveFeature(null)}
          >
            <SponsorMatchingContent />
          </FeatureDetailModal>
        )}
        {activeFeature === 'network' && (
          <FeatureDetailModal
            title="Creator Network"
            icon={MapPin}
            gradient="from-violet-500 to-purple-500"
            onClose={() => setActiveFeature(null)}
          >
            <CreatorNetworkContent />
          </FeatureDetailModal>
        )}
      </AnimatePresence>
    </div>
  );
}

// Feature Tile Component
function FeatureTile({ 
  icon: Icon, 
  title, 
  gradient, 
  onClick,
  badges 
}: { 
  icon: any; 
  title: string; 
  gradient: string; 
  onClick: () => void;
  badges: string[];
}) {
  return (
    <motion.div
      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden"
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        boxShadow: "0 0 60px rgba(168, 85, 247, 0.5)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="mb-3 text-gray-200">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Animated corner accent */}
      <motion.div
        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-20 blur-2xl`}
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Feature Detail Modal Component
function FeatureDetailModal({ 
  title, 
  icon: Icon, 
  gradient, 
  onClose, 
  children 
}: { 
  title: string; 
  icon: any; 
  gradient: string; 
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-pink-500/30 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(168,85,247,0.4)]"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl opacity-50 pointer-events-none" />

        {/* Header */}
        <div className={`relative p-8 border-b border-white/20 bg-gradient-to-r ${gradient} bg-opacity-10`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)]`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                  {title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">Powered by AI</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-8 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Persona Engine Content
function PersonaEngineContent() {
  const [selectedScript, setSelectedScript] = React.useState<string | null>(null);
  const [selectedCaption, setSelectedCaption] = React.useState<{text: string, match: number} | null>(null);

  const [videoUrl, setVideoUrl] = React.useState("");
  const [personaInputMode, setPersonaInputMode] = React.useState<'video' | 'text'>("video");
  const [personaTextInput, setPersonaTextInput] = React.useState("");
  const [personaLoading, setPersonaLoading] = React.useState(false);
  const [personaError, setPersonaError] = React.useState<string | null>(null);
  const [persona, setPersona] = React.useState<any | null>(null);

  const [recentPersonas, setRecentPersonas] = React.useState<any[]>([]);
  const [recentPersonaError, setRecentPersonaError] = React.useState<string | null>(null);

  const handleScriptClick = (script: string) => {
    setSelectedScript(script);
  };

  const handleCaptionClick = (caption: {text: string, match: number}) => {
    setSelectedCaption(caption);
  };

  const handleThumbnailClick = (text: string) => {
    toast.success(`🖼️ Thumbnail idea saved: "${text}"`);
  };

  const handleGenerateMore = async (type: 'scripts' | 'captions') => {
    setPersonaError(null);

    // Require some input context (video URL or text)
    if (personaInputMode === 'video') {
      if (!videoUrl.trim()) {
        setPersonaError('Paste a video URL first.');
        return;
      }
    } else {
      if (!personaTextInput.trim()) {
        setPersonaError('Paste some text or describe your style first.');
        return;
      }
    }

    try {
      setPersonaLoading(true);
      const res = await fetch('/api/persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          personaInputMode === 'video'
            ? { videoUrl }
            : { textInput: personaTextInput }
        ),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const base = (data as any).error ?? 'Failed to generate more ideas';
        const details = (data as any).details ? `: ${(data as any).details}` : '';
        throw new Error(base + details);
      }

      const data = await res.json();

      // Merge new ideas into existing persona, replacing only the relevant lists
      setPersona((prev: any) => {
        const next: any = { ...(prev ?? {}) };

        if (type === 'scripts' && Array.isArray(data.scriptIdeas)) {
          next.scriptIdeas = data.scriptIdeas;
        }
        if (type === 'captions' && Array.isArray(data.captionSuggestions)) {
          next.captionSuggestions = data.captionSuggestions;
        }

        // Also keep the core persona fields in sync if the model returned them
        if (data.text !== undefined) next.text = data.text;
        if (data.tone !== undefined) next.tone = data.tone;
        if (data.style !== undefined) next.style = data.style;
        if (data.titleSuggestion !== undefined) next.titleSuggestion = data.titleSuggestion;
        if (data.thumbnailIdea !== undefined) next.thumbnailIdea = data.thumbnailIdea;
        if (data.scriptHook !== undefined) next.scriptHook = data.scriptHook;
        if (data.improvementTips !== undefined) next.improvementTips = data.improvementTips;

        return next;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setPersonaError(message);
      toast.error(message);
    } finally {
      setPersonaLoading(false);
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const loadRecent = async () => {
      if (!supabase) {
        setRecentPersonaError('Supabase is not configured.');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('persona_analyses')
          .select('id, created_at, video_url, result')
          .order('created_at', { ascending: false })
          .limit(3);

        if (!isMounted) return;

        if (error) {
          console.error('Failed to load recent persona analyses', error);
          setRecentPersonaError('Unable to load recent analyses.');
          return;
        }

        setRecentPersonas(data ?? []);
      } catch (err) {
        if (!isMounted) return;
        console.error('Unexpected error loading recent persona analyses', err);
        setRecentPersonaError('Unable to load recent analyses.');
      }
    };

    loadRecent();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAnalyzePersona = async () => {
    setPersonaError(null);
    setPersona(null);

    if (personaInputMode === "video") {
      if (!videoUrl.trim()) {
        setPersonaError("Paste a video URL first.");
        return;
      }
    } else {
      if (!personaTextInput.trim()) {
        setPersonaError("Paste some text or describe your style first.");
        return;
      }
    }

    try {
      setPersonaLoading(true);
      const res = await fetch("/api/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          personaInputMode === "video"
            ? { videoUrl }
            : { textInput: personaTextInput }
        ),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const base = (data as any).error ?? "Failed to analyze persona";
        const details = (data as any).details ? `: ${(data as any).details}` : "";
        throw new Error(base + details);
      }

      const data = await res.json();
      setPersona(data);
      toast.success("Persona analyzed for this video.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setPersonaError(message);
      toast.error(message);
    } finally {
      setPersonaLoading(false);
    }
  };

  const scriptIdeas: string[] =
    Array.isArray(persona?.scriptIdeas) && persona.scriptIdeas.length > 0
      ? (persona.scriptIdeas as string[])
      : [
          "My honest thoughts on AI tools (hot take alert)",
          "Why I switched to this editing workflow",
          "Behind the scenes: how I plan content",
        ];

  const captionSuggestions: { text: string; match: number }[] =
    Array.isArray(persona?.captionSuggestions) && persona.captionSuggestions.length > 0
      ? (persona.captionSuggestions as any[]).map((c) => {
          if (typeof c === "string") {
            return { text: c, match: 95 };
          }
          return {
            text: typeof c.text === "string" ? c.text : "",
            match:
              typeof c.match === "number"
                ? c.match
                : typeof c.score === "number"
                ? c.score
                : 95,
          };
        })
      : [
          { text: "Spent 12hrs on this... worth it? 🎨✨", match: 98 },
          { text: "POV: You finally crack the algorithm", match: 96 },
          { text: "This changed everything for me ngl", match: 94 },
        ];

  return (
    <div className="space-y-6">
      {/* Modals */}
      <AnimatePresence>
        {selectedScript && (
          <ScriptDetailModal script={selectedScript} onClose={() => setSelectedScript(null)} />
        )}
        {selectedCaption && (
          <CaptionDetailModal caption={selectedCaption} onClose={() => setSelectedCaption(null)} />
        )}
      </AnimatePresence>

      {/* Analyze a specific video via Persona API */}
      <motion.div
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" />
            <h3 className="text-gray-300">Persona Input</h3>
          </div>
          <div className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setPersonaInputMode("video")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                personaInputMode === "video"
                  ? "bg-purple-500/40 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              From Video URL
            </button>
            <button
              type="button"
              onClick={() => setPersonaInputMode("text")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                personaInputMode === "text"
                  ? "bg-purple-500/40 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              From Text
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {personaInputMode === "video" ? (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Video URL</label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors text-sm"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Paste a sample script, caption, or describe your style
              </label>
              <textarea
                value={personaTextInput}
                onChange={(e) => setPersonaTextInput(e.target.value)}
                placeholder="Example: My videos are fast, chaotic tech rants with honest takes and meme cuts..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors text-sm min-h-[96px] resize-vertical"
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAnalyzePersona}
              disabled={personaLoading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-70 disabled:cursor-not-allowed transition-all text-sm flex items-center gap-2"
            >
              {personaLoading && <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />}
              Analyze Persona
            </button>
            {personaError && (
              <p className="text-xs text-rose-300">{personaError}</p>
            )}
          </div>

          {persona && (
            <div className="mt-4 space-y-3 text-sm text-gray-200">
              {persona.text && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Summary</p>
                  <p className="text-sm text-gray-200 whitespace-pre-wrap">{persona.text}</p>
                </div>
              )}
              {persona.tone && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Tone</p>
                  <p className="text-sm text-gray-200 whitespace-pre-wrap">{persona.tone}</p>
                </div>
              )}
              {persona.style && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Style</p>
                  <p className="text-sm text-gray-200 whitespace-pre-wrap">{persona.style}</p>
                </div>
              )}
              {(persona.titleSuggestion || persona.thumbnailIdea || persona.scriptHook) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {persona.titleSuggestion && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 mb-1">Title idea</p>
                      <p className="text-gray-200">{persona.titleSuggestion}</p>
                    </div>
                  )}
                  {persona.thumbnailIdea && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 mb-1">Thumbnail</p>
                      <p className="text-gray-200 whitespace-pre-wrap">{persona.thumbnailIdea}</p>
                    </div>
                  )}
                  {persona.scriptHook && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 mb-1">Hook</p>
                      <p className="text-gray-200 whitespace-pre-wrap">{persona.scriptHook}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Recent persona analyses from Supabase */}
      {recentPersonas.length > 0 && (
        <motion.div
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-gray-300 text-sm">Recent Persona Analyses</h3>
            </div>
          </div>
          <div className="space-y-2 text-xs text-gray-300">
            {recentPersonas.map((row) => (
              <div
                key={row.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1"
              >
                <p className="text-[11px] text-gray-400 truncate">{row.video_url}</p>
                {row.result?.text && (
                  <p className="line-clamp-2 whitespace-pre-wrap">{row.result.text}</p>
                )}
              </div>
            ))}
          </div>
          {recentPersonaError && (
            <p className="mt-2 text-[11px] text-rose-300">{recentPersonaError}</p>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Script Ideas */}
        <motion.div
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <h3 className="text-gray-300">Script Ideas</h3>
            </div>
            <button
              onClick={() => handleGenerateMore('scripts')}
              className="px-3 py-1 text-xs rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-all"
            >
              Generate More
            </button>
          </div>
          <div className="space-y-3">
            {scriptIdeas.map((script, idx) => (
              <div 
                key={idx} 
                onClick={() => handleScriptClick(script)}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <p className="text-sm text-gray-300">{script}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-green-400">95% style match</span>
                  </div>
                  <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click for full script
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Caption Suggestions */}
        <motion.div
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-pink-400" />
              <h3 className="text-gray-300">Caption Suggestions</h3>
            </div>
            <button
              onClick={() => handleGenerateMore('captions')}
              className="px-3 py-1 text-xs rounded-lg bg-pink-500/20 border border-pink-500/30 text-pink-400 hover:bg-pink-500/30 transition-all"
            >
              Generate More
            </button>
          </div>
          <div className="space-y-3">
            {captionSuggestions.map((caption, idx) => (
              <div 
                key={idx} 
                onClick={() => handleCaptionClick(caption)}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <p className="text-sm text-gray-300 italic">"{caption.text}"</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-green-400">{caption.match}% tone match</span>
                  </div>
                  <span className="text-xs text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click for full caption
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

    </div>
  );
}

// Growth Strategist Content
function GrowthStrategistContent() {
  const [channelUrl, setChannelUrl] = React.useState("");
  const [strategy, setStrategy] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [recentStrategies, setRecentStrategies] = React.useState<any[]>([]);
  const [recentStrategyError, setRecentStrategyError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadRecent = async () => {
      if (!supabase) {
        setRecentStrategyError('Supabase is not configured.');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('growth_strategies')
          .select('id, created_at, channel_url, result')
          .order('created_at', { ascending: false })
          .limit(3);

        if (!isMounted) return;

        if (error) {
          console.error('Failed to load recent growth strategies', error);
          setRecentStrategyError('Unable to load recent strategies.');
          return;
        }

        setRecentStrategies(data ?? []);
      } catch (err) {
        if (!isMounted) return;
        console.error('Unexpected error loading recent growth strategies', err);
        setRecentStrategyError('Unable to load recent strategies.');
      }
    };

    loadRecent();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGenerateStrategy = async () => {
    setError(null);
    setStrategy(null);

    if (!channelUrl.trim()) {
      setError("Paste a channel link to generate a strategy.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/growth-strategist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const base = (data as any).error ?? "Failed to generate strategy";
        const details = (data as any).details ? `: ${(data as any).details}` : "";
        throw new Error(base + details);
      }

      const data = await res.json();
      setStrategy(data);
      toast.success("Growth strategy generated.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Growth Strategist API card */}
      <motion.div
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-pink-400" />
            <h3 className="text-gray-300">Generate Growth Strategy</h3>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Channel link</label>
            <input
              type="url"
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
              placeholder="https://youtube.com/@yourchannel or https://instagram.com/handle"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-pink-500 focus:outline-none transition-colors text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateStrategy}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-[0_0_30px_rgba(244,114,182,0.5)] disabled:opacity-70 disabled:cursor-not-allowed transition-all text-sm flex items-center gap-2"
            >
              {loading && <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />}
              Generate strategy
            </button>
            {error && <p className="text-xs text-rose-300">{error}</p>}
          </div>

          {strategy && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-200">
              {strategy.whatToPost && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 mb-1">What to post</p>
                  <p className="whitespace-pre-wrap">{strategy.whatToPost}</p>
                </div>
              )}
              {strategy.duration && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 mb-1">Optimal duration</p>
                  <p className="whitespace-pre-wrap">{strategy.duration}</p>
                </div>
              )}
              {strategy.postingTime && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 mb-1">Best posting time</p>
                  <p className="whitespace-pre-wrap">{strategy.postingTime}</p>
                </div>
              )}
              {strategy.emotionalTone && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 mb-1">Emotional tone</p>
                  <p className="whitespace-pre-wrap">{strategy.emotionalTone}</p>
                </div>
              )}
              {strategy.collabSuggestion && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 md:col-span-2">
                  <p className="text-gray-400 mb-1">Collaboration suggestion</p>
                  <p className="whitespace-pre-wrap">{strategy.collabSuggestion}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Recent strategies from Supabase */}
      {recentStrategies.length > 0 && (
        <motion.div
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <h3 className="text-gray-300 text-sm">Recent Growth Strategies</h3>
            </div>
          </div>
          <div className="space-y-2 text-xs text-gray-300">
            {recentStrategies.map((row) => (
              <div
                key={row.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1"
              >
                <p className="text-[11px] text-gray-400 truncate">{row.channel_url}</p>
                {row.result?.whatToPost && (
                  <p className="line-clamp-2 whitespace-pre-wrap">{row.result.whatToPost}</p>
                )}
              </div>
            ))}
          </div>
          {recentStrategyError && (
            <p className="mt-2 text-[11px] text-rose-300">{recentStrategyError}</p>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trend Graphs */}
        <motion.div
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-gray-300">Trending Topics</h3>
          </div>
          <div className="space-y-3">
            {(Array.isArray(strategy?.trendingTopics) && strategy.trendingTopics.length
              ? strategy.trendingTopics
              : [
                  { topic: 'AI productivity tools', growth: '+320% this week', trend: 'up' },
                  { topic: 'Workflow optimization', growth: '+185% this week', trend: 'up' },
                  { topic: 'Content batching', growth: '-12% this week', trend: 'down' },
                ]
            ).map((item: any, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-300">{item.topic}</p>
                  {item.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <p className={`text-xs ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.growth}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Best Posting Times */}
        <motion.div
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="text-gray-300">Best Times to Post</h3>
          </div>
          <div className="space-y-3">
            {(Array.isArray(strategy?.bestTimes) && strategy.bestTimes.length
              ? strategy.bestTimes
              : [
                  { day: 'Monday', time: '2:00 PM', engagement: 'High' },
                  { day: 'Wednesday', time: '6:00 PM', engagement: 'Very High' },
                  { day: 'Friday', time: '12:00 PM', engagement: 'Medium' },
                ]
            ).map((slot: any, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-white">{slot.day}</p>
                    <p className="text-xs text-gray-400">{slot.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    slot.engagement === 'Very High' ? 'bg-green-500/20 text-green-400' :
                    slot.engagement === 'High' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {slot.engagement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Audience Sentiment */}
        <motion.div
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-pink-400" />
            <h3 className="text-gray-300">Audience Sentiment</h3>
          </div>
          {(() => {
            const sentiment = strategy?.audienceSentiment as any | undefined;
            const overall =
              typeof sentiment?.positivePercent === 'number' ? sentiment.positivePercent : 78;
            const breakdown: any[] =
              Array.isArray(sentiment?.breakdown) && sentiment.breakdown.length
                ? sentiment.breakdown
                : [
                    { emoji: '😍', label: 'Love it', percent: 45 },
                    { emoji: '👍', label: 'Like it', percent: 33 },
                    { emoji: '🤔', label: 'Curious', percent: 22 },
                  ];
            return (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-2">
                    <span className="text-3xl">{overall}%</span>
                  </div>
                  <p className="text-sm text-gray-400">Positive engagement</p>
                </div>
                <div className="space-y-2">
                  {breakdown.map((sentimentItem, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-lg">{sentimentItem.emoji}</span>
                      <div className="flex-1">
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${sentimentItem.percent}%` }}
                            transition={{ delay: idx * 0.1 }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{sentimentItem.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      </div>

      {/* Growth Score */}
      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {(() => {
          const score = strategy?.growthScore as any | undefined;
          const overall = typeof score?.overall === 'number' ? score.overall : 8.7;
          const delta = typeof score?.delta === 'string' ? score.delta : '+2.3';
          const metrics: any[] =
            Array.isArray(score?.metrics) && score.metrics.length
              ? score.metrics
              : [
                  { label: 'Engagement', value: 9.2 },
                  { label: 'Consistency', value: 8.5 },
                  { label: 'Reach', value: 8.9 },
                  { label: 'Quality', value: 8.2 },
                ];
          return (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-gray-300 mb-1">Overall Growth Score</h3>
                  <p className="text-sm text-gray-400">Based on last 30 days</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {overall}
                  </p>
                  <p className="text-sm text-green-400">{delta} this month</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {metrics.map((metric, idx: number) => (
                  <div key={idx} className="text-center">
                    <p className="text-2xl text-purple-400">{metric.value}</p>
                    <p className="text-xs text-gray-400">{metric.label}</p>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
      </motion.div>
    </div>
  );
}

// Sponsor Matching Content
function SponsorMatchingContent() {
  const [selectedDeal, setSelectedDeal] = React.useState<{
    brand: string;
    match: number;
    budget: string;
    category: string;
    status: string;
  } | null>(null);

  const [brand, setBrand] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [niche, setNiche] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [apiMatches, setApiMatches] = React.useState<any | null>(null);

  const [recentMatches, setRecentMatches] = React.useState<any[]>([]);
  const [recentMatchesError, setRecentMatchesError] = React.useState<string | null>(null);

  const deals = [
    { 
      brand: 'TechGear Pro', 
      match: 94, 
      budget: '₹5,000 - ₹8,000',
      category: 'Tech & Gadgets',
      status: 'Active',
      escrow: true
    },
    { 
      brand: 'CreativeSoft Inc', 
      match: 87, 
      budget: '₹3,500 - ₹5,000',
      category: 'Software',
      status: 'Pending Review',
      escrow: true
    },
    { 
      brand: 'StreamPro', 
      match: 82, 
      budget: '₹4,200 - ₹6,500',
      category: 'Streaming Tools',
      status: 'New Match',
      escrow: true
    },
  ];

  React.useEffect(() => {
    let isMounted = true;

    const loadRecent = async () => {
      if (!supabase) {
        setRecentMatchesError('Supabase is not configured.');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('sponsor_matches')
          .select('id, created_at, brand, budget, niche, region, result')
          .order('created_at', { ascending: false })
          .limit(3);

        if (!isMounted) return;

        if (error) {
          console.error('Failed to load recent sponsor matches', error);
          setRecentMatchesError('Unable to load recent sponsor matches.');
          return;
        }

        setRecentMatches(data ?? []);
      } catch (err) {
        if (!isMounted) return;
        console.error('Unexpected error loading recent sponsor matches', err);
        setRecentMatchesError('Unable to load recent sponsor matches.');
      }
    };

    loadRecent();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGenerateMatches = async () => {
    setError(null);
    setApiMatches(null);

    if (!brand || !budget || !niche || !region) {
      setError("Fill all sponsor fields to generate matches.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/sponsor-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, budget, niche, region }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const base = (data as any).error ?? "Failed to generate sponsor matches";
        const details = (data as any).details ? `: ${(data as any).details}` : "";
        throw new Error(base + details);
      }

      const data = await res.json();
      setApiMatches(data);
      toast.success("Sponsor matches generated.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Modal */}
      <AnimatePresence>
        {selectedDeal && (
          <BrandDealModal 
            brand={selectedDeal.brand}
            match={selectedDeal.match}
            budget={selectedDeal.budget}
            category={selectedDeal.category}
            status={selectedDeal.status}
            onClose={() => setSelectedDeal(null)} 
          />
        )}
      </AnimatePresence>

      {/* Live sponsor match API form */}
      <motion.div
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Handshake className="w-5 h-5 text-indigo-400" />
            <h3 className="text-gray-300">Generate Sponsor Matches</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Brand name</label>
            <input
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="NovaTech Studio"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Budget (per campaign)</label>
            <input
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="$10,000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Niche</label>
            <input
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Creator tools, productivity, filmmaking"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Target region</label>
            <input
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="North America, UK, DACH"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={handleGenerateMatches}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-70 disabled:cursor-not-allowed transition-all text-sm flex items-center gap-2"
          >
            {loading && <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />}
            Find creator matches
          </button>
          {error && <p className="text-xs text-rose-300">{error}</p>}
        </div>

        {apiMatches?.creators && apiMatches.creators.length > 0 && (
          <div className="mt-3 space-y-2 text-sm text-gray-200">
            {apiMatches.creators.map((creator: any) => (
              <div
                key={creator.handle}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <p className="font-semibold text-gray-100">{creator.handle}</p>
                  <p className="text-xs text-gray-400 whitespace-pre-wrap">
                    {creator.niche}  {creator.region}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400">
                  Match {creator.matchScore}
                </span>
              </div>
            ))}
            {apiMatches.contractPreview && (
              <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 whitespace-pre-wrap">
                {apiMatches.contractPreview}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Recent sponsor matches from Supabase */}
      {recentMatches.length > 0 && (
        <motion.div
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h3 className="text-gray-300 text-sm">Recent Sponsor Matches</h3>
            </div>
          </div>
          <div className="space-y-2 text-xs text-gray-300">
            {recentMatches.map((row) => (
              <div
                key={row.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1"
              >
                <p className="text-[11px] text-gray-400 truncate">
                  {row.brand} • {row.niche}
                </p>
                {row.result?.creators && Array.isArray(row.result.creators) && row.result.creators[0] && (
                  <p className="line-clamp-2 whitespace-pre-wrap">
                    Top match: {row.result.creators[0].handle} ({row.result.creators[0].matchScore})
                  </p>
                )}
              </div>
            ))}
          </div>
          {recentMatchesError && (
            <p className="mt-2 text-[11px] text-rose-300">{recentMatchesError}</p>
          )}
        </motion.div>
      )}

      {/* Brand Match Cards */}
      <div className="space-y-4">
        {deals.map((deal, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            onClick={() => setSelectedDeal(deal)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
                  {deal.brand.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white mb-1">{deal.brand}</h3>
                  <p className="text-sm text-gray-400">{deal.category}</p>
                  <p className="text-xs text-gray-500 mt-1">{deal.budget}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-400">{deal.match}%</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  deal.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  deal.status === 'Pending Review' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {deal.status}
                </span>
              </div>
            </div>

            {/* Match breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Audience Fit', value: deal.match + 2 },
                { label: 'Budget Align', value: deal.match - 3 },
                { label: 'Brand Values', value: deal.match + 5 },
              ].map((metric, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-white/5">
                  <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="flex items-center gap-4">
              {deal.escrow && (
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <Shield className="w-3 h-3" />
                  <span>Escrow Protected</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-purple-400">
                <CheckCircle className="w-3 h-3" />
                <span>Smart Contract</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contract Preview */}
      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-gray-300 mb-4">Smart Contract Features</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Shield, label: 'Secure Escrow', desc: 'Payment held until delivery' },
            { icon: FileText, label: 'Auto Terms', desc: 'AI-generated contracts' },
            { icon: CheckCircle, label: 'Milestone Tracking', desc: 'Progress-based payments' },
            { icon: DollarSign, label: 'Fair Pricing', desc: 'Market rate analysis' },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-white mb-1">{feature.label}</p>
                <p className="text-xs text-gray-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Creator Network Content
function CreatorNetworkContent() {
  const [showMessageModal, setShowMessageModal] = React.useState(false);
  const [selectedCreator, setSelectedCreator] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed || !selectedCreator) {
      toast.error('Please type a message first');
      return;
    }

    const recipient = selectedCreator;

    // Store in shared Library so it shows up under the Library section as history.
    try {
      appendMessage({
        participantName: recipient,
        participantRole: 'creator',
        content: trimmed,
        direction: 'sent',
        source: 'creator-network',
      });

      // Simulated reply so the Library shows a two-sided conversation.
      const autoReply =
        "Thanks for reaching out! This is a prototype reply from the Creator Network. We'll get back to you soon.";
      setTimeout(() => {
        try {
          appendMessage({
            participantName: recipient,
            participantRole: 'creator',
            content: autoReply,
            direction: 'received',
            source: 'creator-network',
          });
        } catch {
          // ignore
        }
      }, 400);
    } catch {
      // Non‑fatal: still show success toast even if local persistence fails.
    }

    toast.success(`📧 Message sent to ${recipient}! They typically respond within 24 hours.`);
    setMessage('');
    setShowMessageModal(false);
    setSelectedCreator(null);
  };

  const creators = [
    { 
      name: 'Sarah Chen', 
      skill: 'Videographer', 
      followers: '125K',
      rating: 4.9,
      skills: ['Sony A7IV', 'DaVinci Resolve', 'Color Grading'],
      available: true
    },
    { 
      name: 'Mike Johnson', 
      skill: 'Audio Engineer', 
      followers: '89K',
      rating: 4.8,
      skills: ['Shure SM7B', 'Pro Tools', 'Mixing'],
      available: true
    },
    { 
      name: 'Alex Rivera', 
      skill: 'Video Editor', 
      followers: '210K',
      rating: 5.0,
      skills: ['Final Cut Pro', 'After Effects', 'Motion Graphics'],
      available: false
    },
  ];

  return (
    <div className="space-y-6">
      {/* Creator Network Header */}
      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl">Creator Network</h3>
            <p className="text-sm text-gray-400">Connect with verified creators and find collaboration opportunities</p>
          </div>
        </div>
      </motion.div>

      {/* Creators List */}
      <div className="space-y-3">
        {creators.map((creator, idx) => (
          <motion.div
            key={idx}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            onClick={() => toast.success(`Viewing ${creator.name}'s profile...`)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-lg">
                  {creator.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white">{creator.name}</h3>
                  <p className="text-sm text-gray-400">{creator.skill}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  <span className="text-sm">★ {creator.rating}</span>
                </div>
                <p className="text-xs text-gray-500">{creator.followers} followers</p>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {creator.skills.map((skill, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-400">
                  {skill}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button 
                className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-sm hover:shadow-lg transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCreator(creator.name);
                  setShowMessageModal(true);
                }}
              >
                <MessageCircle className="w-4 h-4 inline mr-1" />
                Message
              </button>
              <button 
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 text-sm transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  try {
                    appendMessage({
                      participantName: creator.name,
                      participantRole: 'creator',
                      content: `Hire request sent via Creator Network. I'd love to hire you as a ${creator.skill}.`,
                      direction: 'sent',
                      source: 'creator-network',
                    });
                  } catch {
                    // ignore
                  }
                  toast.success(`Hire request sent!`);
                }}
                disabled={!creator.available}
              >
                Hire
              </button>
              <button 
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 text-sm transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  try {
                    appendMessage({
                      participantName: creator.name,
                      participantRole: 'creator',
                      content: `Collaboration request sent via Creator Network. I'd love to collab with you as a ${creator.skill}.`,
                      direction: 'sent',
                      source: 'creator-network',
                    });
                  } catch {
                    // ignore
                  }
                  toast.success(`Collaboration request sent!`);
                }}
              >
                Collab
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              onClick={() => setShowMessageModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-20 left-20 w-96 h-96 bg-pink-500/30 rounded-full blur-[120px]"
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"
                animate={{
                  x: [0, -50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md bg-gradient-to-br from-gray-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border-2 border-indigo-500/50 rounded-2xl p-6 shadow-[0_0_60px_rgba(99,102,241,0.6)]"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-400" />
                  <p className="text-white" style={{ fontWeight: 600 }}>Message to {selectedCreator}</p>
                </div>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message Input */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 p-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder:text-gray-400 resize-none focus:outline-none focus:border-indigo-500/50 transition-all"
                placeholder="Type your message here... e.g., Hey! I'd love to collaborate on a project together. Are you available this week?"
                autoFocus
              />

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}