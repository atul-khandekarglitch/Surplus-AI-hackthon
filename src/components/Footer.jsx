import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#082B4C] text-slate-300 border-t border-[#103B60] mt-auto">
      {/* Upper Footer: Value Proposition Banner */}
      <div className="bg-[#103B60]/50 border-b border-slate-700/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#24D695]/10 border border-[#24D695]/30 flex items-center justify-center text-[#24D695]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Connector: AI-Powered Dynamic Surplus Marketplace</p>
              <p className="text-xs text-slate-300">Helping small businesses recover revenue while eliminating avoidable food waste.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="bg-[#082B4C] px-3 py-1.5 rounded-full border border-slate-600 text-emerald-400 font-medium">
              🌿 100% Edible Surplus Only
            </span>
            <span className="bg-[#082B4C] px-3 py-1.5 rounded-full border border-slate-600 text-sky-400 font-medium">
              📍 Pune Hyperlocal Network
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#24D695] to-[#087F5B] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Connector</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Connecting Surplus to Opportunity. Our algorithmic platform assists small grocery shops, bakeries, cafes, and local farms in predicting surplus, pricing items dynamically, and routing unsold goods to nearby consumers and NGO shelters.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-[#24D695] shrink-0" />
              <span>Pilot Zone: Tathawade & Wakad, Pimpri-Chinchwad, Pune, Maharashtra</span>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/marketplace" className="hover:text-[#24D695] transition-colors">Browse All Surplus</Link></li>
              <li><Link to="/marketplace?category=Vegetables" className="hover:text-[#24D695] transition-colors">Fresh Vegetables</Link></li>
              <li><Link to="/marketplace?category=Bakery" className="hover:text-[#24D695] transition-colors">Daily Bakery Surplus</Link></li>
              <li><Link to="/marketplace?category=Dairy" className="hover:text-[#24D695] transition-colors">Dairy & Milk Packs</Link></li>
              <li><Link to="/nearby" className="hover:text-[#24D695] transition-colors">Nearby Map Radar</Link></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/seller/dashboard" className="hover:text-[#24D695] transition-colors">For Small Businesses</Link></li>
              <li><Link to="/ngo" className="hover:text-[#24D695] transition-colors">For NGOs & Charities</Link></li>
              <li><Link to="/ai-insights" className="hover:text-[#24D695] transition-colors">AI Dynamic Pricing</Link></li>
              <li><Link to="/redistribution" className="hover:text-[#24D695] transition-colors">Smart Redistribution</Link></li>
              <li><Link to="/admin" className="hover:text-[#24D695] transition-colors">Admin Moderation</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform & Mission */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Company & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-[#24D695] transition-colors">About Connector</Link></li>
              <li><Link to="/about#mission" className="hover:text-[#24D695] transition-colors">Sustainability Mission</Link></li>
              <li><Link to="/about#safety" className="hover:text-[#24D695] transition-colors">Food Safety Protocol</Link></li>
              <li><Link to="/about#faq" className="hover:text-[#24D695] transition-colors">Frequently Asked Questions</Link></li>
              <li><span className="text-emerald-400 font-medium">Demo Version 1.0 (Frontend)</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Connector. All rights reserved. “Connecting Surplus to Opportunity.”</p>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
              ⚡ Simulated AI Demonstration Mode
            </span>
            <Link to="/about" className="hover:text-white">Terms of Service</Link>
            <Link to="/about" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
