import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Sparkles, 
  ArrowLeft, 
  Upload, 
  Info, 
  CheckCircle,
  Eye,
  Save,
  HelpCircle
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { AIService } from '../services/aiService';
import { CATEGORIES_LIST } from '../data/initialData';

export const AddProductPage = () => {
  const { addProduct, currentUser } = useMarketplace();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [expiryHoursRemaining, setExpiryHoursRemaining] = useState(12);
  const [location, setLocation] = useState(currentUser?.location || 'Tathawade, Pune');
  const [condition, setCondition] = useState('Fresh harvested surplus, crisp and clean.');
  const [storageInstructions, setStorageInstructions] = useState('Keep in cool ventilated space.');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80');
  const [pickupAvailable, setPickupAvailable] = useState(true);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);

  // Status message
  const [formError, setFormError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  // Dynamic AI Pricing Recommendation Calculation
  const parsedPrice = Number(originalPrice) || 100;
  const parsedQty = Number(quantity) || 10;
  const aiPricing = AIService.recommendPricing(parsedPrice, parsedQty, Number(expiryHoursRemaining), category);
  const aiRisk = AIService.assessExpiryRisk(Number(expiryHoursRemaining), parsedQty, category);

  // Apply AI Suggested Price
  const handleApplyAiPrice = () => {
    setDiscountedPrice(aiPricing.discountedPrice);
  };

  const calculateDiscount = () => {
    if (!originalPrice || !discountedPrice || Number(originalPrice) <= 0) return 0;
    const disc = Math.round(((Number(originalPrice) - Number(discountedPrice)) / Number(originalPrice)) * 100);
    return Math.max(0, Math.min(disc, 95));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter a valid product title.');
      return;
    }
    if (!quantity || Number(quantity) <= 0) {
      setFormError('Available quantity must be greater than zero.');
      return;
    }
    if (!originalPrice || Number(originalPrice) <= 0) {
      setFormError('Original price must be greater than zero.');
      return;
    }
    if (!discountedPrice || Number(discountedPrice) <= 0) {
      setFormError('Discounted surplus price must be specified.');
      return;
    }
    if (Number(discountedPrice) >= Number(originalPrice)) {
      setFormError('Surplus price must be lower than original price to provide a true discount.');
      return;
    }

    const calculatedPct = calculateDiscount();

    const newProduct = addProduct({
      name,
      category,
      quantity: Number(quantity),
      unit,
      originalPrice: Number(originalPrice),
      discountedPrice: Number(discountedPrice),
      discountPercentage: calculatedPct,
      expiryDate: `Within ${expiryHoursRemaining} hours`,
      expiryHoursRemaining: Number(expiryHoursRemaining),
      shelfLifeDays: +(Number(expiryHoursRemaining) / 24).toFixed(1),
      location,
      condition,
      storageInstructions,
      description: description || `Fresh surplus ${name} from ${currentUser?.businessName || 'local retailer'}. Safe and ready for immediate consumption.`,
      image: imageUrl,
      pickupAvailable,
      deliveryAvailable,
      recommendedPrice: aiPricing.discountedPrice,
      pricingReason: aiPricing.reason
    });

    // Navigate to listings
    navigate('/seller/listings');
  };

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          to="/seller/dashboard" 
          className="inline-flex items-center text-xs font-bold text-[#087F5B] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Seller Dashboard</span>
        </Link>

        {/* Title */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#087F5B]">
              <PlusCircle className="w-4 h-4 text-[#24D695]" />
              <span>Surplus Ingestion Form</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
              Add Surplus Product Listing
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter excess perishable or seasonal stock to receive simulated AI pricing and smart buyer matches.
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-[#087F5B] font-bold px-3 py-1.5 rounded-full border border-emerald-200">
            Seller: {currentUser?.businessName || currentUser?.name}
          </span>
        </div>

        {formError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-semibold">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form (8 Cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#082B4C] border-b pb-2">
                1. Product Identification
              </h2>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="E.g. Fresh Greenhouse Vine Tomatoes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                  >
                    {CATEGORIES_LIST.filter(c => c !== 'All Categories').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Demo Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Available Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="10"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Unit of Measurement *
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800"
                  >
                    <option value="kg">kg (Kilograms)</option>
                    <option value="loaves">loaves (Bread / Bakery)</option>
                    <option value="packs">packs / boxes</option>
                    <option value="liters">liters (Dairy / Liquid)</option>
                    <option value="units">units / items</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#082B4C] border-b pb-2">
                2. Pricing & Clearance Rate
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Original Price (₹ per unit) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="80"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Surplus Discount Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="40"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800"
                  />
                </div>
              </div>

              {originalPrice && discountedPrice && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-[#087F5B] flex justify-between items-center font-bold">
                  <span>Computed Discount: {calculateDiscount()}% OFF</span>
                  <span>Save ₹{Number(originalPrice) - Number(discountedPrice)} per unit</span>
                </div>
              )}
            </div>

            {/* Expiry & Quality */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#082B4C] border-b pb-2">
                3. Remaining Freshness & Logistics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Remaining Shelf Life (Hours) *
                  </label>
                  <select
                    value={expiryHoursRemaining}
                    onChange={(e) => setExpiryHoursRemaining(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800"
                  >
                    <option value={4}>Critical (Within 4 Hours - Flash)</option>
                    <option value={8}>Urgent (Within 8 Hours - Evening)</option>
                    <option value={12}>Today (Within 12 Hours)</option>
                    <option value={24}>Tomorrow (Within 24 Hours)</option>
                    <option value={48}>2 Days Remaining</option>
                    <option value={72}>3 Days Remaining</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Store / Pickup Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Product Description & Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Detail condition, harvest time, batch number, or packaging notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              {/* Fulfilment check */}
              <div className="flex items-center space-x-6 text-xs text-slate-700 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pickupAvailable}
                    onChange={(e) => setPickupAvailable(e.target.checked)}
                    className="rounded accent-[#087F5B]"
                  />
                  <span>Counter Pickup Available</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                    className="rounded accent-[#087F5B]"
                  />
                  <span>Local Delivery Available</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Surplus Listing</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/seller/dashboard')}
                className="py-3.5 px-6 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>

          </form>

          {/* AI Intelligence Assistant Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* AI Dynamic Pricing Card */}
            <div className="bg-[#082B4C] text-white p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <span className="font-bold text-xs flex items-center text-[#24D695]">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  AI Dynamic Pricing Engine
                </span>
                <span className="text-[10px] bg-[#103B60] text-slate-300 px-2 py-0.5 rounded">
                  Simulated v1.2
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-300">Suggested Markdown:</p>
                <p className="text-2xl font-extrabold text-[#24D695] mt-0.5">
                  {aiPricing.suggestedDiscountPct}% OFF (₹{aiPricing.discountedPrice})
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Original: ₹{parsedPrice} • Potential Revenue: ₹{aiPricing.potentialRevenue}
                </p>
              </div>

              <div className="bg-[#103B60]/70 p-3 rounded-xl border border-slate-700 text-[11px] text-slate-300 leading-relaxed">
                <strong>Algorithm Rationale:</strong> {aiPricing.reason}
              </div>

              <button
                type="button"
                onClick={handleApplyAiPrice}
                className="w-full py-2.5 rounded-xl bg-[#24D695] hover:bg-white text-[#082B4C] text-xs font-bold transition-colors cursor-pointer shadow"
              >
                Apply AI Suggested Price (₹{aiPricing.discountedPrice})
              </button>
            </div>

            {/* Expiry Risk & Safety Check */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
              <span className="font-bold text-slate-800 flex items-center">
                <CheckCircle className="w-4 h-4 text-[#087F5B] mr-1.5" />
                Freshness & Food Safety Metric
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {aiRisk.urgencyMessage}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Risk Assessment:</span>
                  <span className="font-bold" style={{ color: aiRisk.riskColor }}>{aiRisk.riskLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Waste Prevented:</span>
                  <span className="font-bold text-slate-800">{parsedQty} {unit} (~₹{parsedPrice * parsedQty})</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
