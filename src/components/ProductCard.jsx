import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ShoppingCart, Sparkles, Store, ShieldCheck } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useMarketplace();

  // Expiry badge color calculation
  const isUrgent = product.expiryHoursRemaining <= 8;
  const isModerate = product.expiryHoursRemaining <= 24 && !isUrgent;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 overflow-hidden flex flex-col group relative">
      
      {/* Image Container with Badges */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-[#087F5B] text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
          <span>{product.discountPercentage}% OFF</span>
        </div>

        {/* AI Optimized Badge */}
        <div className="absolute top-3 right-3 bg-[#082B4C]/85 backdrop-blur-md text-[#24D695] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#24D695]/30 flex items-center space-x-1 shadow">
          <Sparkles className="w-3 h-3" />
          <span>AI Priced</span>
        </div>

        {/* Expiry Urgency Pill */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded-md shadow flex items-center space-x-1">
          <Clock className={`w-3 h-3 ${isUrgent ? 'text-red-500 animate-pulse' : isModerate ? 'text-amber-500' : 'text-emerald-500'}`} />
          <span>{product.expiryDate}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Seller */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium text-[#087F5B] bg-emerald-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <span className="flex items-center text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#24D695] mr-0.5" />
              {product.distanceKm} km away
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onViewDetails && onViewDetails(product)}
            className="text-base font-bold text-[#102A43] group-hover:text-[#087F5B] transition-colors cursor-pointer line-clamp-1 mt-1"
          >
            {product.name}
          </h3>

          {/* Business / Seller Name */}
          <p className="text-xs text-slate-500 flex items-center mt-1">
            <Store className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            <span className="truncate">{product.sellerName}</span>
          </p>

          {/* Quantity & Location */}
          <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100 flex items-center justify-between">
            <span>Available: <strong>{product.quantity} {product.unit}</strong></span>
            <span className="text-slate-400 truncate max-w-[120px]">{product.location.split(',')[0]}</span>
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xl font-extrabold text-[#102A43]">
                ₹{product.discountedPrice}
              </span>
              <span className="text-xs text-slate-400 line-through ml-2">
                ₹{product.originalPrice}
              </span>
            </div>
            <span className="text-[11px] text-[#087F5B] font-semibold">
              Save ₹{product.originalPrice - product.discountedPrice}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails && onViewDetails(product)}
              className="px-3 py-2 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold text-center transition-colors cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              disabled={product.quantity <= 0}
              className={`px-3 py-2 rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                product.quantity > 0
                  ? 'bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{product.quantity > 0 ? 'Add to Cart' : 'Sold Out'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
