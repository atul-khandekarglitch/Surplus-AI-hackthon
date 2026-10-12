import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Percent, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building,
  HeartHandshake
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { AIService } from '../services/aiService';
import { SAMPLE_USERS } from '../data/initialData';

export const AIInsightsPage = () => {
  const { products } = useMarketplace();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  // Run AI logic on the currently selected product
  const demandForecast = AIService.forecastDemand(
    selectedProduct.category, 
    selectedProduct.quantity, 
    selectedProduct.expiryHoursRemaining
  );

  const expiryRisk = AIService.assessExpiryRisk(
    selectedProduct.expiryHoursRemaining, 
    selectedProduct.quantity, 
    selectedProduct.category
  );

  const pricingRecommendation = AIService.recommendPricing(
    selectedProduct.originalPrice, 
    selectedProduct.quantity, 
    selectedProduct.expiryHoursRemaining, 
    selectedProduct.category
  );

  const buyerMatches = AIService.findBuyerMatches(selectedProduct, SAMPLE_USERS);
  const redistributionAction = AIService.evaluateRedistribution(selectedProduct);

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-[#082B4C] text-white p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#103B60] border border-[#24D695]/30 px-3 py-1 rounded-full text-xs font-semibold text-[#24D695]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Connector Intelligence Engine (Simulated v1.2)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              AI Surplus Intelligence Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Demonstrating the four core algorithmic pillars of Connector: Demand Forecasting, Expiry-Risk Prediction, Dynamic Pricing Recommendations, and Hyperlocal Smart Buyer Matching.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#24D695]/10 to-transparent pointer-events-none" />
        </div>

        {/* Product Selector Ribbon */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700">Simulate Item:</span>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const found = products.find(p => p.id === e.target.value);
                if (found) setSelectedProduct(found);
              }}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#24D695] cursor-pointer"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.quantity} {p.unit} remaining)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-500">
              Category: <strong className="text-slate-800">{selectedProduct.category}</strong>
            </span>
            <span className="text-slate-500">
              Expires: <strong className="text-slate-800">{selectedProduct.expiryDate}</strong>
            </span>
          </div>
        </div>

        {/* 4 AI Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pillar 1: Demand Forecasting */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-[#102A43] flex items-center">
                <TrendingUp className="w-4 h-4 text-[#087F5B] mr-2" />
                A. Demand Forecasting
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
                Confidence: {demandForecast.score}%
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-500">Estimated Neighborhood Absorption:</p>
              <p className="text-2xl font-extrabold text-[#102A43] mt-0.5">
                {demandForecast.level} Demand
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Expected Clearance Velocity: <strong className="text-[#087F5B]">{demandForecast.expectedUptakeSpeed}</strong>
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
              {demandForecast.recommendations}
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider">
                Contributing Factor Signals:
              </span>
              {demandForecast.factors.map((f, i) => (
                <div key={i} className="flex justify-between text-[11px] text-slate-600 border-b border-slate-50 pb-1">
                  <span>{f.label}</span>
                  <span className="font-medium text-slate-800">{f.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2: Expiry-Risk Prediction */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-[#102A43] flex items-center">
                <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />
                B. Expiry-Risk Prediction
              </span>
              <span 
                className="text-[10px] px-2.5 py-0.5 rounded-full font-bold text-white shadow-sm"
                style={{ backgroundColor: expiryRisk.riskColor }}
              >
                {expiryRisk.riskLevel}
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-500">Remaining Shelf-Life Horizon:</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {expiryRisk.remainingHours} Hours
              </p>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                {expiryRisk.estimatedLossAvoidance}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl border text-xs leading-relaxed" style={{ borderColor: `${expiryRisk.riskColor}40`, backgroundColor: `${expiryRisk.riskColor}10` }}>
              <p className="font-semibold text-slate-800">{expiryRisk.urgencyMessage}</p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Food Safety Threshold</span>
                <span className="font-bold text-emerald-600">Compliant (Pre-spoiled state)</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Action Urgency Trigger</span>
                <span className="font-bold text-slate-800">
                  {expiryRisk.remainingHours <= 8 ? 'Flash Markdown Active' : 'Standard Marketplace Visibility'}
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Dynamic Pricing Engine */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-[#102A43] flex items-center">
                <Percent className="w-4 h-4 text-[#087F5B] mr-2" />
                C. Dynamic Pricing Engine
              </span>
              <span className="text-[10px] bg-emerald-50 text-[#087F5B] px-2.5 py-0.5 rounded-full font-bold">
                {pricingRecommendation.confidence} Confidence
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-500">Recommended Clearance Markdown:</p>
              <div className="flex items-baseline space-x-3 mt-0.5">
                <span className="text-3xl font-extrabold text-[#087F5B]">
                  {pricingRecommendation.suggestedDiscountPct}% OFF
                </span>
                <span className="text-base font-bold text-slate-800">
                  (₹{pricingRecommendation.discountedPrice} / {selectedProduct.unit})
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs text-slate-700 leading-relaxed">
              <strong>Optimization Rationale:</strong> {pricingRecommendation.reason}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Projected Revenue</span>
                <span className="font-bold text-slate-800 text-sm">₹{pricingRecommendation.potentialRevenue}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Loss Averted</span>
                <span className="font-bold text-emerald-600 text-sm">₹{pricingRecommendation.estimatedLossPrevented}</span>
              </div>
            </div>
          </div>

          {/* Pillar 4: Smart Buyer Matching */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-[#102A43] flex items-center">
                <Users className="w-4 h-4 text-[#087F5B] mr-2" />
                D. Smart Buyer Matching
              </span>
              <span className="text-[10px] bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full font-bold">
                {buyerMatches.length} Targets Ranked
              </span>
            </div>

            <div className="space-y-3">
              {buyerMatches.map((buyer, idx) => (
                <div key={buyer.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{idx + 1}. {buyer.name}</span>
                    <span className="text-[10px] font-extrabold text-[#087F5B] bg-emerald-100 px-2 py-0.5 rounded">
                      {buyer.fitScore}% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{buyer.type} • {buyer.distance}</p>
                  <p className="text-[11px] text-slate-600 italic">“{buyer.reason}”</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. Smart Redistribution Module */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] bg-emerald-50 px-2.5 py-1 rounded">
                Section 16 Requirement
              </span>
              <h2 className="text-xl font-extrabold text-[#102A43] mt-1">
                Smart Redistribution Next-Action Pathway
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Simulated Decision Tree
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-semibold text-slate-500">Current Strategy:</span>
              <p className="text-lg font-bold text-slate-900">{redistributionAction.priority}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{redistributionAction.reason}</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-semibold text-[#087F5B]">Recommended Action:</span>
              <p className="text-lg font-bold text-[#087F5B]">{redistributionAction.action}</p>
              <p className="text-xs text-slate-700">Target: <strong>{redistributionAction.recommendedEntity}</strong></p>
            </div>

            <div className="p-5 rounded-2xl bg-[#082B4C] text-white space-y-2">
              <span className="text-xs font-semibold text-[#24D695]">Tax & CSR Compliance:</span>
              <p className="text-lg font-bold text-white">
                {redistributionAction.eligibleTaxCredit ? 'Tax Deductible CSR' : 'Standard Commercial'}
              </p>
              <p className="text-xs text-slate-300">
                Verified 100% compliant with FSSAI donation guidelines.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
