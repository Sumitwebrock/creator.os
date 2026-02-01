import React from 'react';
import { motion } from 'motion/react';
import { X, FileText, MessageSquare, Copy, Hash, Clock, BarChart3, Zap, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '../utils/clipboard';

// Script Details Data
const scriptDetails: Record<string, {hook: string, body: string[], cta: string}> = {
  "My honest thoughts on AI tools (hot take alert)": {
    hook: "Yo what's up! So I've been testing like 15 different AI tools over the past month and honestly? I need to rant about this...",
    body: [
      "First off, let's talk about the hype. Everyone's acting like AI is gonna replace everything overnight, but here's the thing - it's not. It's a tool, just like Photoshop or Premiere Pro.",
      "The ones that actually work? They're the ones that understand YOUR workflow. Not some generic 'do everything' tool that ends up doing nothing well.",
      "I've been using [AI Tool] for my scripts and captions, and it's scary accurate because it learned MY voice. Not some corporate tone, not some influencer persona - ME.",
      "But here's where it gets interesting. I realized I was spending 12 hours a week just on captions and thumbnails. That's literally a full workday. Now? 2 hours max.",
      "The best part? It's not replacing creativity. It's replacing the boring stuff so I can focus on what actually matters - creating content that resonates."
    ],
    cta: "So yeah, that's my honest take. Let me know in the comments if you want me to do a full breakdown of my AI workflow. Hit subscribe if you're into this kinda content! ✨"
  },
  "Why I switched to this editing workflow": {
    hook: "Alright so I completely changed my editing workflow and it cut my editing time in HALF. Let me explain...",
    body: [
      "I used to edit everything chronologically. Film, import, rough cut, fine cut, color grade, export. Sounds logical right? Wrong.",
      "The problem? I was making creative decisions when I was already exhausted from 6 hours of editing. My best ideas were getting wasted.",
      "So I flipped it. Now I start with the ending - the payoff, the punchline, the big reveal. Then I work backwards to figure out how to get there.",
      "This completely changed how I think about content. Instead of 'what do I want to say?' it's 'what do I want them to FEEL at the end?'",
      "I also batch similar tasks now. All rough cuts on Monday, all color grading on Tuesday. Your brain works way more efficiently when it's not constantly context-switching.",
      "The results? Videos that hit harder, editing sessions that don't feel like torture, and honestly? I'm enjoying creating again."
    ],
    cta: "If you want the full workflow breakdown with timestamps and everything, drop a comment. And subscribe if you're not already - tons more content like this coming! 🎨"
  },
  "Behind the scenes: how I plan content": {
    hook: "Ever wonder how creators plan content without burning out? Let me show you my exact system...",
    body: [
      "First things first - I don't plan day by day. That's a recipe for stress and inconsistent content. I plan in monthly themes.",
      "Each month has ONE main topic. This month? AI tools for creators. Next month? Building sustainable creator businesses. Everything revolves around that theme.",
      "Then I break it down: 4 main videos, 12 short-form pieces, and 8 community posts. All connected to the theme, but different angles.",
      "Here's the game-changer: I batch-film everything in ONE week. Yeah, an entire month of content in 5 days. Sounds crazy but it works.",
      "The secret? Having a content bank. Every time I have an idea - doesn't matter when - it goes into Notion. By planning time, I have 50+ ideas ready to go.",
      "I use AI to help with scripting the repetitive stuff, but the creative direction? That's all me. The AI just speeds up execution."
    ],
    cta: "Want me to share my full content planning template? Let me know below! And hit that subscribe button - we're building something cool here! 🚀"
  }
};

// Caption Details Data
const captionDetails: Record<string, {fullCaption: string, hashtags: string[], bestTime: string}> = {
  "Spent 12hrs on this... worth it? 🎨✨": {
    fullCaption: "Spent 12hrs on this... worth it? 🎨✨\n\nHonestly had no idea it would take this long but when you're in the zone, you're in the zone. \n\nEvery detail matters. Every transition, every color grade, every frame. That's the difference between content and ART.\n\nBeen getting so many DMs asking about my process - might do a full BTS breakdown soon. Would you watch that?\n\nAlso shoutout to everyone who's been supporting - y'all are the reason I can keep creating 💜",
    hashtags: ["#ContentCreator", "#CreativeProcess", "#BehindTheScenes", "#VideoEditing", "#CreatorLife", "#MadeWithLove"],
    bestTime: "7:00 PM - 9:00 PM (Your audience is most active)"
  },
  "POV: You finally crack the algorithm": {
    fullCaption: "POV: You finally crack the algorithm 😮‍💨\n\nNo literally though - something clicked this week and the views are CRAZY.\n\nIt's not about gaming the system or clickbait. It's about understanding what your audience actually wants to see and giving it to them consistently.\n\nThree things that changed:\n1. Started posting at the same time every day\n2. Focused on ONE niche instead of everything\n3. Actually engaged with my community (wild concept, I know)\n\nThe algorithm isn't your enemy - consistency and value are the real cheat codes 📈",
    hashtags: ["#AlgorithmHack", "#ContentStrategy", "#CreatorTips", "#GrowthMindset", "#SocialMediaTips", "#ConsistencyIsKey"],
    bestTime: "6:00 PM - 8:00 PM (Peak engagement time)"
  },
  "This changed everything for me ngl": {
    fullCaption: "This changed everything for me ngl 🤯\n\nRemember when I was posting every day and getting burnt out? Yeah, that.\n\nSwitched to quality over quantity and guess what? Better results, less stress, actually enjoying creation again.\n\nNow I post 3x a week but each piece is something I'm genuinely proud of. The engagement is up 300% and I actually have time to live my life.\n\nStop treating content creation like a chore. Make stuff you'd want to watch. Your audience can tell the difference.\n\nThat's the tweet (well, caption) 💯",
    hashtags: ["#CreatorBurnout", "#QualityOverQuantity", "#ContentCreation", "#MentalHealth", "#CreatorWellness", "#RealTalk"],
    bestTime: "8:00 AM - 10:00 AM (Morning scroll)"
  }
};

// Script Detail Modal Component
export function ScriptDetailModal({ 
  script, 
  onClose 
}: { 
  script: string;
  onClose: () => void;
}) {
  const details = scriptDetails[script];

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      <motion.div
        className="relative w-full max-w-3xl max-h-[80vh] bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent backdrop-blur-2xl border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.4)]"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                  Complete Script
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">AI Generated • 95% style match</p>
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
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)] custom-scrollbar">
          <div className="space-y-6">
            {/* Title */}
            <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/30">
              <p className="text-purple-400 text-sm mb-1">Video Title:</p>
              <p className="text-gray-200">{script}</p>
            </div>

            {/* Hook */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-yellow-400" />
                <p className="text-yellow-400 text-sm">Hook (First 3 seconds)</p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <p className="text-gray-200 italic">"{details?.hook}"</p>
              </div>
            </div>

            {/* Body */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-purple-400" />
                <p className="text-purple-400 text-sm">Main Content</p>
              </div>
              <div className="space-y-3">
                {details?.body.map((paragraph, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs text-purple-400">
                        {idx + 1}
                      </span>
                      <p className="text-gray-300 leading-relaxed">{paragraph}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <p className="text-pink-400 text-sm">Call to Action</p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                <p className="text-gray-200">{details?.cta}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex gap-3">
          <button
            onClick={() => {
              const fullScript = `${details?.hook}\n\n${details?.body.join('\n\n')}\n\n${details?.cta}`;
              copyToClipboard(fullScript);
              toast.success('📋 Full script copied to clipboard!');
            }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Full Script
          </button>
          <button
            onClick={() => {
              toast.success('💾 Script saved to your library!');
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Save to Library
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Caption Detail Modal Component
export function CaptionDetailModal({ 
  caption, 
  onClose 
}: { 
  caption: {text: string, match: number};
  onClose: () => void;
}) {
  const details = captionDetails[caption.text];

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      <motion.div
        className="relative w-full max-w-2xl max-h-[80vh] bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-transparent backdrop-blur-2xl border border-pink-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(236,72,153,0.4)]"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                  Complete Caption
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">AI Generated • {caption.match}% tone match</p>
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
          {/* Caption */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-pink-400" />
              <p className="text-pink-400 text-sm">Full Caption</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-pink-500/20">
              <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                {details?.fullCaption ?? caption.text}
              </p>
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-purple-400" />
              <p className="text-purple-400 text-sm">Recommended Hashtags</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {details?.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Best Time */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-indigo-400" />
              <p className="text-indigo-400 text-sm">Best Time to Post</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
              <p className="text-gray-200">{details?.bestTime}</p>
            </div>
          </div>

          {/* Analytics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-green-400" />
              <p className="text-green-400 text-sm">Predicted Performance</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-2xl text-green-400 mb-1">+45%</p>
                <p className="text-xs text-gray-400">Engagement</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-2xl text-blue-400 mb-1">+32%</p>
                <p className="text-xs text-gray-400">Reach</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-2xl text-purple-400 mb-1">+28%</p>
                <p className="text-xs text-gray-400">Shares</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/10 bg-gradient-to-r from-pink-500/10 to-purple-500/10 flex gap-3">
          <button
            onClick={() => {
              const fullText = `${details?.fullCaption}\n\n${details?.hashtags.join(' ')}`;
              copyToClipboard(fullText);
              toast.success('📋 Caption & hashtags copied!');
            }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Full Caption
          </button>
          <button
            onClick={() => {
              toast.success('💾 Caption saved to your library!');
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Save to Library
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}