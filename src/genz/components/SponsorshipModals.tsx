import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Handshake, Shield, FileText, DollarSign, Copy, CheckCircle, Clock, Target, BarChart3, Users, Zap, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '../utils/clipboard';
import { appendMessage } from '../utils/messageLibrary';

// Brand Deal Details Data
const brandDealDetails: Record<string, {
  fullDescription: string;
  campaignGoals: string[];
  deliverables: {item: string, deadline: string}[];
  paymentTerms: {
    upfront: string;
    onDelivery: string;
    bonus: string;
  };
  brandValues: string[];
  audienceFit: {
    ageMatch: number;
    interestMatch: number;
    locationMatch: number;
  };
  contractHighlights: string[];
  estimatedROI: string;
  similarDeals: string[];
}> = {
  "TechGear Pro": {
    fullDescription: "TechGear Pro is a premium technology accessories brand focusing on content creators and professionals. They're launching their new 2024 product line and want authentic creator partnerships to showcase real-world usage.",
    campaignGoals: [
      "Generate 50K+ impressions on launch content",
      "Drive traffic to their new product page",
      "Create authentic testimonial content",
      "Build long-term brand ambassadorship"
    ],
    deliverables: [
      { item: "1x Main review video (8-12 min)", deadline: "15 days from acceptance" },
      { item: "3x Short-form clips (30-60s each)", deadline: "20 days from acceptance" },
      { item: "2x Instagram Stories", deadline: "Throughout campaign" },
      { item: "1x Written review (blog/newsletter)", deadline: "25 days from acceptance" }
    ],
    paymentTerms: {
      upfront: "₹2,000 (40%)",
      onDelivery: "₹3,000 (60%)",
      bonus: "₹1,500 if exceeds 100K views"
    },
    brandValues: ["Innovation", "Quality", "Creator-first", "Sustainability"],
    audienceFit: {
      ageMatch: 96,
      interestMatch: 94,
      locationMatch: 92
    },
    contractHighlights: [
      "✅ Full creative control - review process only",
      "✅ Product gifted + payment (total value ₹12,000)",
      "✅ Escrow-protected payment",
      "✅ Performance bonus potential",
      "✅ Affiliate link with 10% commission",
      "✅ Possibility of long-term partnership"
    ],
    estimatedROI: "₹25,000 - ₹45,000",
    similarDeals: [
      "You earned ₹6,800 from StreamTech (similar deal)",
      "Your tech content averages 85K views",
      "95% of your sponsored tech content meets brand KPIs"
    ]
  },
  "CreativeSoft Inc": {
    fullDescription: "CreativeSoft develops AI-powered creative software for video editors, designers, and content creators. They're looking for creators who can authentically demonstrate their workflow improvements.",
    campaignGoals: [
      "Showcase real workflow transformations",
      "Target creative professionals 25-40",
      "Drive trial sign-ups (goal: 500+)",
      "Create educational content library"
    ],
    deliverables: [
      { item: "1x Tutorial video (10-15 min)", deadline: "12 days from acceptance" },
      { item: "1x Before/After comparison", deadline: "12 days from acceptance" },
      { item: "5x Tips carousel (Instagram)", deadline: "18 days from acceptance" },
      { item: "1x Live demo/Q&A session", deadline: "20 days from acceptance" }
    ],
    paymentTerms: {
      upfront: "₹1,500 (30%)",
      onDelivery: "₹3,500 (70%)",
      bonus: "₹1,000 per 100 trial sign-ups"
    },
    brandValues: ["Education", "Transparency", "Creator empowerment", "Continuous improvement"],
    audienceFit: {
      ageMatch: 89,
      interestMatch: 87,
      locationMatch: 85
    },
    contractHighlights: [
      "✅ 1-year pro license included (₹8,400 value)",
      "✅ Early access to beta features",
      "✅ Flexible posting schedule",
      "✅ Bonus structure based on performance",
      "✅ Smart contract with milestone payments",
      "✅ Option to become brand ambassador"
    ],
    estimatedROI: "₹18,000 - ₹35,000",
    similarDeals: [
      "Software tutorial content averages 62K views",
      "High engagement rate on educational content (11.2%)",
      "Strong conversion history with tool recommendations"
    ]
  },
  "StreamPro": {
    fullDescription: "StreamPro offers streaming equipment and software solutions for content creators. They're expanding into the Indian creator market and want authentic partnerships with growing creators.",
    campaignGoals: [
      "Establish brand presence in Indian market",
      "Target streaming/gaming creators",
      "Create equipment setup guides",
      "Drive sales through authentic recommendations"
    ],
    deliverables: [
      { item: "1x Setup guide video (6-10 min)", deadline: "14 days from acceptance" },
      { item: "1x Equipment comparison", deadline: "14 days from acceptance" },
      { item: "3x Quick tips videos (60s)", deadline: "21 days from acceptance" },
      { item: "2x Behind-the-scenes Stories", deadline: "Throughout campaign" }
    ],
    paymentTerms: {
      upfront: "₹2,100 (50%)",
      onDelivery: "₹2,100 (50%)",
      bonus: "₹800 if hits 75K views"
    },
    brandValues: ["Quality", "Reliability", "Community", "Value for money"],
    audienceFit: {
      ageMatch: 84,
      interestMatch: 82,
      locationMatch: 88
    },
    contractHighlights: [
      "✅ Equipment kit included (₹15,000 value)",
      "✅ Fast approval process (48 hours)",
      "✅ Escrow protection",
      "✅ Flexible content format",
      "✅ 15% affiliate commission ongoing",
      "✅ Featured on brand's creator page"
    ],
    estimatedROI: "₹20,000 - ₹38,000",
    similarDeals: [
      "Equipment review content performs well (avg 71K views)",
      "Strong trust with your audience on gear recommendations",
      "Previous gear sponsors reported 3.2x ROI from your content"
    ]
  }
};

// Brand Deal Detail Modal
export function BrandDealModal({ 
  brand,
  match,
  budget,
  category,
  status,
  onClose 
}: { 
  brand: string;
  match: number;
  budget: string;
  category: string;
  status: string;
  onClose: () => void;
}) {
  const details = brandDealDetails[brand];
  const [showMessageBox, setShowMessageBox] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) {
      toast.error('Please type a message first');
      return;
    }

    try {
      // Store question to this sponsor in the shared Library.
      appendMessage({
        participantName: brand,
        participantRole: 'sponsor',
        content: trimmed,
        direction: 'sent',
        source: 'sponsor-match',
      });
    } catch {
      // ignore persistence errors – toast still confirms for the demo.
    }

    toast.success(`📧 Message sent to ${brand}! They typically respond within 24 hours.`);
    setMessage('');
    setShowMessageBox(false);
  };

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
        className="relative w-full max-w-4xl max-h-[85vh] bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-transparent backdrop-blur-2xl border border-indigo-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.4)]"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                {brand.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                  {brand}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-gray-400">{category}</p>
                  <span className="text-gray-500">•</span>
                  <p className="text-sm text-indigo-400">{match}% match</p>
                  <span className="text-gray-500">•</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    status === 'Pending Review' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {status}
                  </span>
                </div>
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
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-220px)] custom-scrollbar space-y-6">
          {/* Budget Highlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Campaign Budget</p>
                <p className="text-2xl text-green-400" style={{ fontWeight: 700 }}>{budget}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Estimated Total ROI</p>
                <p className="text-xl text-purple-400">{details?.estimatedROI}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Handshake className="w-4 h-4 text-indigo-400" />
              <p className="text-indigo-400 text-sm">About This Partnership</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-200 leading-relaxed">{details?.fullDescription}</p>
            </div>
          </div>

          {/* Campaign Goals */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-purple-400" />
              <p className="text-purple-400 text-sm">Campaign Goals</p>
            </div>
            <div className="space-y-2">
              {details?.campaignGoals.map((goal, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">{goal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-pink-400" />
              <p className="text-pink-400 text-sm">Deliverables & Timeline</p>
            </div>
            <div className="space-y-2">
              {details?.deliverables.map((deliverable, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-gray-200 text-sm">{deliverable.item}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {deliverable.deadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Terms */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-green-400" />
              <p className="text-green-400 text-sm">Payment Structure</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-gray-400 mb-2">Upfront</p>
                <p className="text-lg text-green-400">{details?.paymentTerms.upfront}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-gray-400 mb-2">On Delivery</p>
                <p className="text-lg text-green-400">{details?.paymentTerms.onDelivery}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-center">
                <p className="text-xs text-gray-400 mb-2">Bonus</p>
                <p className="text-lg text-yellow-400">{details?.paymentTerms.bonus}</p>
              </div>
            </div>
          </div>

          {/* Audience Fit */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-blue-400" />
              <p className="text-blue-400 text-sm">Audience Match Analysis</p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Age Demographics', value: details?.audienceFit.ageMatch },
                { label: 'Interest Alignment', value: details?.audienceFit.interestMatch },
                { label: 'Geographic Match', value: details?.audienceFit.locationMatch }
              ].map((metric, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">{metric.label}</span>
                    <span className="text-sm text-blue-400">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contract Highlights */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              <p className="text-emerald-400 text-sm">Contract Highlights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {details?.contractHighlights.map((highlight, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 text-sm">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Deals Performance */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <p className="text-purple-400 text-sm">Your Track Record</p>
            </div>
            <div className="space-y-2">
              {details?.similarDeals.map((deal, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{deal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Values */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Handshake className="w-4 h-4 text-pink-400" />
              <p className="text-pink-400 text-sm">Brand Values</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {details?.brandValues.map((value, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-sm text-pink-300"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex gap-3">
          <button
            onClick={() => {
              const dealInfo = `${brand} Partnership\n\nBudget: ${budget}\nMatch: ${match}%\n\nGoals:\n${details?.campaignGoals.map(g => `• ${g}`).join('\n')}\n\nDeliverables:\n${details?.deliverables.map(d => `• ${d.item} - ${d.deadline}`).join('\n')}`;
              copyToClipboard(dealInfo);
              toast.success('📋 Deal details copied!');
            }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Details
          </button>
          <button
            onClick={() => setShowMessageBox(true)}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Ask Questions
          </button>
          <button
            onClick={() => {
              try {
                // Log an application message to this sponsor in the Library.
                appendMessage({
                  participantName: brand,
                  participantRole: 'sponsor',
                  content: `Applied to ${brand} sponsorship. Match: ${match}%, Budget: ${budget}.`,
                  direction: 'sent',
                  source: 'sponsor-match',
                });
              } catch {
                // ignore persistence errors
              }

              toast.success('🎉 Application submitted! Brand will review within 48 hours.');
              onClose();
            }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <Handshake className="w-4 h-4" />
            Apply Now
          </button>
        </div>

        {/* Message Box */}
        {showMessageBox && (
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowMessageBox(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/95 via-indigo-900/90 to-purple-900/90 backdrop-blur-xl border-2 border-indigo-500/50 rounded-2xl p-6 w-full max-w-md shadow-[0_0_60px_rgba(99,102,241,0.6)]"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-400" />
                  <p className="text-white" style={{ fontWeight: 600 }}>Message to {brand}</p>
                </div>
                <button
                  onClick={() => setShowMessageBox(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 p-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder:text-gray-400 resize-none focus:outline-none focus:border-indigo-500/50 transition-all"
                placeholder="Type your questions here... e.g., Can we adjust the timeline? What's included in the product package?"
                autoFocus
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowMessageBox(false)}
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
      </motion.div>
    </motion.div>
  );
}