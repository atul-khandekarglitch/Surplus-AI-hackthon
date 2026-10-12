import React, { useState } from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  Truck, 
  Sparkles, 
  ArrowRight,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { SAMPLE_USERS } from '../data/initialData';

export const NGOPage = () => {
  const { products, addNotification } = useMarketplace();
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // NGO profile
  const ngo = SAMPLE_USERS.find(u => u.role === 'ngo') || SAMPLE_USERS[2];

  // Products eligible for donation (urgent expiry or large batches)
  const donationCandidates = products.filter(p => {
    if (p.status !== 'Active') return false;
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  });

  const handleRequestDonation = (product) => {
    setRequestSubmitted(true);
    addNotification({
      title: 'NGO Pickup Request Dispatched',
      message: `Anandi Seva Trust volunteers notified for pickup of ${product.name} at ${product.sellerName}.`,
      type: 'donation'
    });
    setTimeout(() => setRequestSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* NGO Mission Banner */}
        <div className="bg-[#082B4C] text-white p-8 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#24D695] bg-[#103B60] px-3 py-1 rounded-full border border-slate-700">
              Zero Waste Charity Distribution
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              For NGOs & Relief Partners
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connector pairs food banks and shelter kitchens with local stores and farms that have unsold edible products before shelf life expires.
            </p>
          </div>

          <div className="bg-[#103B60] p-5 rounded-2xl border border-slate-700 text-xs space-y-2 min-w-[280px]">
            <p className="font-bold text-white flex items-center">
              <ShieldCheck className="w-4 h-4 text-[#24D695] mr-1.5" />
              Verified Charity Logistics
            </p>
            <p className="text-slate-300 text-[11px]">
              Inspected transport, cold bags, and direct shelter delivery network across Pune.
            </p>
            <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-semibold">100% Tax Deductible 80G</span>
              <span className="text-slate-400">FSSAI Certified</span>
            </div>
          </div>
        </div>

        {requestSubmitted && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Donation Pickup Request Sent to Seller! Local volunteer dispatched.</span>
          </div>
        )}

        {/* NGO Profile Highlight & Urgent Surplus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* NGO Organization Card */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <img src={ngo.avatar} alt={ngo.name} className="w-12 h-12 rounded-xl object-cover border border-[#24D695]" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">{ngo.businessName}</h3>
                <p className="text-xs text-slate-500">{ngo.organizationType}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Coverage Zone:</span>
                <span className="font-semibold text-slate-800">{ngo.serviceArea}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Required Product Categories:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {ngo.requiredCategories.map((c, i) => (
                    <span key={i} className="bg-emerald-50 text-[#087F5B] px-2 py-0.5 rounded text-[11px] font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Contact Dispatcher:</span>
                <span className="font-semibold text-slate-800">{ngo.contactPerson} ({ngo.mobile})</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              {ngo.bio}
            </div>
          </div>

          {/* Available Surplus for NGO Claim */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800">
                Surplus Eligible for Redistribution / Bulk Rescue
              </span>
              <span className="text-xs text-slate-500">
                {donationCandidates.length} potential matches
              </span>
            </div>

            <div className="space-y-3">
              {donationCandidates.map(p => (
                <div 
                  key={p.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="bg-emerald-50 text-[#087F5B] font-bold px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                        <span className="text-slate-400">• {p.distanceKm} km away</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-0.5">{p.name}</h4>
                      <p className="text-xs text-slate-500">
                        {p.quantity} {p.unit} from {p.sellerName}
                      </p>
                      <p className="text-[11px] text-amber-600 font-medium mt-0.5">
                        Expires: {p.expiryDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end w-full sm:w-auto">
                    <span className="text-xs text-slate-500">Commercial Price: ₹{p.discountedPrice}</span>
                    <button
                      onClick={() => handleRequestDonation(p)}
                      className="mt-2 px-4 py-2 bg-[#087F5B] hover:bg-[#087F5B]/90 text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer flex items-center space-x-1.5"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Request NGO Rescue Pickup</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
