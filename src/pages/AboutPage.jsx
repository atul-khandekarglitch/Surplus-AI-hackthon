import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Users, 
  Store, 
  HeartHandshake, 
  Leaf, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F7FB] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Mission */}
        <div className="bg-[#082B4C] text-white p-8 sm:p-12 rounded-3xl border border-slate-700 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#103B60] border border-[#24D695]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#24D695]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connecting Surplus to Opportunity</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            Our Mission: Make Surplus Valuable, Affordable, and Accessible
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connector helps small local businesses reduce avoidable waste and recover revenue, while supplying fresh groceries and meals to neighborhood buyers and relief shelters.
          </p>
        </div>

        {/* The Problem vs Solution (Requirement #19) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              !
            </div>
            <h3 className="text-lg font-bold text-slate-900">The Problem</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Small businesses—neighborhood vegetable vendors, family bakeries, and cafes—face unpredictable daily demand fluctuations. Overstocking and unsold perishable products often result in 100% loss write-offs, while nearby hostels, budget consumers, and donation centers struggle to find affordable supplies.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#087F5B] flex items-center justify-center font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold text-slate-900">The Connector Solution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connector provides a single intelligent marketplace that predicts inventory shelf-life risk, recommends dynamic markdown discounts that stimulate immediate local demand, and automates redistribution handoffs to verified NGOs before spoilage occurs.
            </p>
          </div>

        </div>

        {/* Tailored How It Works Breakdown for 3 Stakeholders */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] bg-emerald-50 px-2.5 py-1 rounded">
              Tailored Workflows
            </span>
            <h2 className="text-2xl font-extrabold text-[#102A43] mt-2">
              How Connector Serves Each Community Stakeholder
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            {/* For Sellers */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <Store className="w-6 h-6 text-[#087F5B]" />
              <h4 className="font-bold text-sm text-slate-900">For Small Sellers</h4>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li>List surplus in under 60 seconds with AI pricing advice.</li>
                <li>Clear 70-90% of unsold stock before end of business.</li>
                <li>Turn total waste write-offs into cash flow.</li>
              </ul>
            </div>

            {/* For Consumers */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <Users className="w-6 h-6 text-[#24D695]" />
              <h4 className="font-bold text-sm text-slate-900">For Consumers & Hostels</h4>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li>Access 30% to 65% discounted food items daily.</li>
                <li>Pickup from nearby neighborhood spots within 2 km.</li>
                <li>Contribute directly to lowering city waste footprint.</li>
              </ul>
            </div>

            {/* For NGOs */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <HeartHandshake className="w-6 h-6 text-[#082B4C]" />
              <h4 className="font-bold text-sm text-slate-900">For Donation Partners</h4>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li>Automated notifications for bulk surplus before expiry.</li>
                <li>Verified food safety guidelines with clear transport notes.</li>
                <li>Direct logistical bridge between store and community kitchen.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Food Safety Commitment */}
        <div id="safety" className="p-6 bg-emerald-50 rounded-3xl border border-emerald-200 text-xs text-slate-700 space-y-3">
          <div className="flex items-center space-x-2 text-[#087F5B] font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Strict Food Safety & Freshness Guidelines</span>
          </div>
          <p className="leading-relaxed">
            Connector strictly prohibits the listing or distribution of spoiled, unhygienic, or expired items unfit for human consumption. All food products listed on Connector are wholesome, surplus, safe-to-eat items discounted solely due to short commercial shelf-lives or batch over-production.
          </p>
        </div>

      </div>
    </div>
  );
};
