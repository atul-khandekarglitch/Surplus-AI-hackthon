import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ShoppingCart, 
  Sparkles, 
  ShieldCheck, 
  Store, 
  AlertTriangle,
  Info,
  CheckCircle,
  Truck,
  Package
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { AIService } from '../services/aiService';

export const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart, placeOrder, products } = useMarketplace();
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [reservedSuccess, setReservedSuccess] = useState(false);

  if (!isOpen || !product) return null;

  // AI intelligence assessment for this product
  const expiryRisk = AIService.assessExpiryRisk(product.expiryHoursRemaining, product.quantity, product.category);
  const demandForecast = AIService.forecastDemand(product.category, product.quantity, product.expiryHoursRemaining);

  const handleAddToCart = () => {
    addToCart(product, orderQuantity);
    onClose();
  };

  const handleInstantReserve = () => {
    // Quick reservation simulation
    setReservedSuccess(true);
    setTimeout(() => {
      setReservedSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-full shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image & Badges */}
          <div className="relative bg-slate-100 min-h-[300px] md:min-h-full">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              <span className="bg-[#087F5B] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                {product.discountPercentage}% DISCOUNT
              </span>
              <span className="bg-[#082B4C] text-[#24D695] text-xs font-medium px-3 py-1.5 rounded-full shadow border border-[#24D695]/30 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Verified Surplus</span>
              </span>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow text-xs">
              <p className="font-semibold text-slate-800 flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
                Food Safety Guarantee
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Surplus verified 100% edible and compliant with local fresh produce guidelines.
              </p>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header Details */}
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                <span className="bg-emerald-50 text-[#087F5B] font-semibold px-2 py-0.5 rounded">
                  {product.category}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-[#24D695] mr-1" />
                  {product.location} ({product.distanceKm} km away)
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#102A43]">
                {product.name}
              </h2>

              <p className="text-xs text-slate-600 flex items-center mt-1.5">
                <Store className="w-4 h-4 text-slate-400 mr-1.5" />
                Sold by <span className="font-semibold text-slate-800 ml-1">{product.sellerName}</span>
                <span className="text-slate-400 ml-1">({product.sellerType})</span>
              </p>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-3xl font-extrabold text-[#102A43]">
                  ₹{product.discountedPrice}
                </span>
                <span className="text-base text-slate-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs font-bold text-[#087F5B] bg-emerald-100 px-2 py-0.5 rounded-full">
                  Save ₹{product.originalPrice - product.discountedPrice}
                </span>
              </div>

              {/* Description & Condition */}
              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <p className="leading-relaxed">{product.description}</p>
                {product.condition && (
                  <p className="bg-sky-50 text-sky-900 p-2.5 rounded-lg border border-sky-100">
                    <strong>Batch Condition:</strong> {product.condition}
                  </p>
                )}
                {product.storageInstructions && (
                  <p className="text-slate-500">
                    <strong>Storage:</strong> {product.storageInstructions}
                  </p>
                )}
              </div>

              {/* Simulated AI Insight Box */}
              <div className="mt-4 bg-[#082B4C]/5 border border-[#24D695]/30 rounded-xl p-3 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#082B4C] flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#087F5B] mr-1" />
                    AI Pricing & Risk Analysis
                  </span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500">
                    Simulated Engine
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {product.pricingReason || 'Optimized for rapid clearance while preserving merchant cost recovery.'}
                </p>
                <div className="flex items-center space-x-4 pt-1 text-[11px]">
                  <span>Expiry Risk: <strong style={{ color: expiryRisk.riskColor }}>{expiryRisk.riskLevel}</strong></span>
                  <span>Estimated Demand: <strong className="text-slate-800">{demandForecast.level}</strong></span>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {reservedSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center text-emerald-800 text-xs font-semibold flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Item reserved successfully for 20 minutes! Proceed to pickup.</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">
                      Select Quantity ({product.unit}):
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                        disabled={orderQuantity <= 1}
                        className="w-8 h-8 rounded-lg border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-slate-800 text-sm">
                        {orderQuantity}
                      </span>
                      <button
                        onClick={() => setOrderQuantity(Math.min(product.quantity, orderQuantity + 1))}
                        disabled={orderQuantity >= product.quantity}
                        className="w-8 h-8 rounded-lg border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                      >
                        +
                      </button>
                      <span className="text-xs text-slate-400">
                        (Max {product.quantity} {product.unit})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleInstantReserve}
                      className="px-4 py-3 rounded-xl border border-[#087F5B] text-[#087F5B] hover:bg-emerald-50 font-bold text-xs transition-colors cursor-pointer text-center"
                    >
                      Reserve for Pickup
                    </button>
                    <button
                      onClick={handleAddToCart}
                      disabled={product.quantity <= 0}
                      className="px-4 py-3 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Basket (₹{product.discountedPrice * orderQuantity})</span>
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
