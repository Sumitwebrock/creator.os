import React from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp, Clock, Target, Copy, Sparkles, BarChart3, Calendar, Lightbulb, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '../utils/clipboard';

// Trending Topic Details Data
const trendingTopicDetails: Record<string, {
  description: string;
  whyTrending: string;
  contentAngles: string[];
  bestFormats: string[];
  exampleTitles: string[];
  competitionLevel: string;
  projectedEngagement: string;
}> = {
  "AI productivity tools": {
    description: "AI-powered tools that help creators and professionals work smarter and faster.",
    whyTrending: "The explosion of ChatGPT and other AI tools has created massive interest in productivity automation. People want to know which tools actually work.",
    contentAngles: [
      "Tool comparisons and reviews",
      "Workflow demonstrations",
      "Before/after productivity metrics",
      "Hidden features nobody talks about",
      "Free alternatives to paid tools"
    ],
    bestFormats: ["Tutorial videos", "Quick tips (60s)", "Tool comparison charts", "Screen recordings"],
    exampleTitles: [
      "I tested 10 AI tools so you don't have to",
      "This AI tool saves me 10 hours a week",
      "ChatGPT vs Claude vs Gemini - which wins?",
      "5 AI productivity hacks that actually work"
    ],
    competitionLevel: "High",
    projectedEngagement: "+320% above baseline"
  },
  "Workflow optimization": {
    description: "Systems and strategies to streamline creative processes and reduce time waste.",
    whyTrending: "Creators are burning out. There's huge demand for sustainable, efficient workflows that maintain quality while reducing stress.",
    contentAngles: [
      "Personal workflow breakdowns",
      "Time-blocking strategies",
      "Tool stack reveals",
      "Batch production methods",
      "Energy management tips"
    ],
    bestFormats: ["Behind-the-scenes vlogs", "Calendar walk-throughs", "Template shares", "Day-in-the-life"],
    exampleTitles: [
      "How I plan a month of content in one day",
      "My complete creator workflow (2024)",
      "From chaos to system: my workflow glow-up",
      "The batching method that changed everything"
    ],
    competitionLevel: "Medium",
    projectedEngagement: "+185% above baseline"
  },
  "Content batching": {
    description: "Creating multiple pieces of content in dedicated production sessions.",
    whyTrending: "Declining interest as it becomes common knowledge, but still valuable for newcomers.",
    contentAngles: [
      "Batching routines that work",
      "Common batching mistakes",
      "Mental health considerations",
      "Quality vs quantity balance"
    ],
    bestFormats: ["Process videos", "Templates", "Checklists"],
    exampleTitles: [
      "Why batching isn't for everyone",
      "Batching without burning out",
      "My realistic batching schedule"
    ],
    competitionLevel: "Low",
    projectedEngagement: "-12% below baseline"
  }
};

// Posting Time Details Data
const postingTimeDetails: Record<string, {
  reasoning: string;
  audienceBehavior: string;
  contentTypes: string[];
  tips: string[];
  historicalPerformance: {
    avgViews: string;
    avgEngagement: string;
    avgShares: string;
  };
}> = {
  "Monday 2:00 PM": {
    reasoning: "Post-lunch browsing period when people take mental breaks from work. High attention span for educational content.",
    audienceBehavior: "Your audience is looking for inspiration to power through the rest of their workday.",
    contentTypes: ["Educational tutorials", "Productivity tips", "Motivational content", "Quick wins"],
    tips: [
      "Keep it actionable - people want to implement immediately",
      "Use clear thumbnails that promise specific value",
      "Front-load the key takeaway in first 10 seconds",
      "Add timestamps for easy navigation"
    ],
    historicalPerformance: {
      avgViews: "12,500",
      avgEngagement: "8.4%",
      avgShares: "245"
    }
  },
  "Wednesday 6:00 PM": {
    reasoning: "Peak evening relaxation time. Mid-week stress relief period when engagement is highest.",
    audienceBehavior: "Winding down from work, open to longer content, high commenting activity.",
    contentTypes: ["Deep dives", "Entertainment + education", "Story-driven content", "Trend commentary"],
    tips: [
      "This is your BEST slot - use it for premium content",
      "Longer watch times perform well here",
      "Ask questions to drive comments",
      "Use trending audio/topics for maximum reach"
    ],
    historicalPerformance: {
      avgViews: "18,900",
      avgEngagement: "12.7%",
      avgShares: "380"
    }
  },
  "Friday 12:00 PM": {
    reasoning: "Lunch break on Friday - people are distracted and planning their weekend.",
    audienceBehavior: "Lower attention span, looking for light entertainment or weekend planning ideas.",
    contentTypes: ["Quick tips", "Weekend project ideas", "Funny/lighthearted content", "Listicles"],
    tips: [
      "Keep it short and punchy (under 60 seconds ideal)",
      "Weekend-themed content performs better",
      "Lower expectations for deep engagement",
      "Good for resharing older successful content"
    ],
    historicalPerformance: {
      avgViews: "8,200",
      avgEngagement: "5.1%",
      avgShares: "120"
    }
  }
};

// Trending Topic Modal
export function TrendingTopicModal({ 
  topic, 
  growth,
  onClose 
}: { 
  topic: string;
  growth: string;
  onClose: () => void;
}) {
  const details = trendingTopicDetails[topic];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div
        className="relative w-full max-w-3xl max-h-[80vh] bg-gradient-to-br from-green-500/20 via-purple-500/20 to-transparent backdrop-blur-2xl border border-green-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(34,197,94,0.4)]"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-green-500/20 to-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                  {topic}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{growth} growth this week</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)] custom-scrollbar space-y-6">
          {/* Overview */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <p className="text-yellow-400 text-sm">What is this?</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-200">{details?.description}</p>
            </div>
          </div>

          {/* Why Trending */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpRight className="w-4 h-4 text-green-400" />
              <p className="text-green-400 text-sm">Why It's Trending</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-purple-500/10 border border-green-500/20">
              <p className="text-gray-200">{details?.whyTrending}</p>
            </div>
          </div>

          {/* Content Angles */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-purple-400" />
              <p className="text-purple-400 text-sm">Content Angles to Try</p>
            </div>
            <div className="space-y-2">
              {details?.contentAngles.map((angle, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs text-purple-400">
                    {idx + 1}
                  </span>
                  <p className="text-gray-300">{angle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Example Titles */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <p className="text-pink-400 text-sm">Example Titles</p>
            </div>
            <div className="space-y-2">
              {details?.exampleTitles.map((title, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    copyToClipboard(title);
                    toast.success('📋 Title copied!');
                  }}
                  className="p-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all cursor-pointer group"
                >
                  <p className="text-gray-200 italic">"{title}"</p>
                  <p className="text-xs text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                    Click to copy
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">Competition Level</p>
              <p className={`text-lg ${
                details?.competitionLevel === 'High' ? 'text-red-400' :
                details?.competitionLevel === 'Medium' ? 'text-yellow-400' :
                'text-green-400'
              }`}>{details?.competitionLevel}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">Projected Engagement</p>
              <p className="text-lg text-green-400">{details?.projectedEngagement}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/10 bg-gradient-to-r from-green-500/10 to-purple-500/10 flex gap-3">
          <button
            onClick={() => {
              const content = `${topic}\n\n${details?.description}\n\nContent Angles:\n${details?.contentAngles.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\nExample Titles:\n${details?.exampleTitles.map((t, i) => `${i + 1}. ${t}`).join('\n')}`;
              copyToClipboard(content);
              toast.success('📋 Topic research copied!');
            }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-purple-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Research
          </button>
          <button
            onClick={() => {
              toast.success('💾 Added to content calendar!');
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Add to Calendar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Posting Time Modal
export function PostingTimeModal({ 
  day,
  time,
  engagement,
  onClose 
}: { 
  day: string;
  time: string;
  engagement: string;
  onClose: () => void;
}) {
  const key = `${day} ${time}`;
  const details = postingTimeDetails[key];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div
        className="relative w-full max-w-2xl max-h-[80vh] bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-transparent backdrop-blur-2xl border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.4)]"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-indigo-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                  {day} at {time}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{engagement} engagement window</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)] custom-scrollbar space-y-6">
          {/* Reasoning */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <p className="text-yellow-400 text-sm">Why This Time Works</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <p className="text-gray-200">{details?.reasoning}</p>
            </div>
          </div>

          {/* Audience Behavior */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-purple-400" />
              <p className="text-purple-400 text-sm">Audience Mindset</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-200">{details?.audienceBehavior}</p>
            </div>
          </div>

          {/* Best Content Types */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <p className="text-pink-400 text-sm">Best Content Types</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {details?.contentTypes.map((type, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-sm text-pink-300"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-green-400" />
              <p className="text-green-400 text-sm">Pro Tips</p>
            </div>
            <div className="space-y-2">
              {details?.tips.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <span className="text-green-400">•</span>
                  <p className="text-gray-300 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Performance */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <p className="text-indigo-400 text-sm">Your Historical Performance</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-2xl text-indigo-400 mb-1">{details?.historicalPerformance.avgViews}</p>
                <p className="text-xs text-gray-400">Avg Views</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-2xl text-purple-400 mb-1">{details?.historicalPerformance.avgEngagement}</p>
                <p className="text-xs text-gray-400">Engagement</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-2xl text-pink-400 mb-1">{details?.historicalPerformance.avgShares}</p>
                <p className="text-xs text-gray-400">Avg Shares</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/10 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 flex gap-3">
          <button
            onClick={() => {
              toast.success('📅 Added to posting schedule!');
              onClose();
            }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Schedule Post
          </button>
          <button
            onClick={() => {
              toast.success('🔔 Reminder set!');
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Set Reminder
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
