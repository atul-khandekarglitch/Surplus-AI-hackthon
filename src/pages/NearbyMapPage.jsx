import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Sparkles, 
  SlidersHorizontal, 
  Store, 
  Clock, 
  ArrowRight,
  Compass,
  Layers,
  Info
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { LOCATIONS_LIST } from '../data/initialData';
import { ProductModal } from '../components/ProductModal';

// Demonstration coordinates around Pune (Tathawade/Wakad)
export const NearbyMapPage = () => {
  const { products, selectedLocation, setSelectedLocation } = useMarketplace();
  const [maxDistance, setMaxDistance] = useState(5); // in km
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products by distance and category
  const nearbyProducts = products.filter(p => {
    if (p.status !== 'Active') return false;
    if (p.distanceKm > maxDistance) return false;
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-8 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        
        {/* Page Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#087F5B]">
              <Compass className="w-4 h-4 text-[#24D695]" />
              <span>Hyperlocal Proximity Radar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
              Nearby Surplus Products & Map
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Locate edible inventory from merchants within walking and cycling distance in Tathawade, Wakad, & Hinjawadi.
            </p>
          </div>

          {/* Location Selector */}
          <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs">
            <MapPin className="w-4 h-4 text-[#24D695] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Demonstration Focal Hub</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                {LOCATIONS_LIST.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Radar Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Distance Slider */}
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-700">Radius Filter:</span>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="accent-[#087F5B] w-32"
            />
            <span className="font-bold text-[#087F5B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              Within {maxDistance} km
            </span>
          </div>

          {/* Quick Category Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {['All', 'Vegetables', 'Bakery', 'Dairy', 'Prepared Food'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer text-xs ${
                  activeCategory === cat
                    ? 'bg-[#082B4C] text-[#24D695] font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-slate-500 font-medium">
            Found <strong>{nearbyProducts.length}</strong> surplus items nearby
          </span>
        </div>

        {/* Map & List Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[550px]">
          
          {/* Interactive Map Canvas Container (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm relative flex flex-col">
            
            {/* Visual Simulated Map Interface (Leaflet styled OSM canvas) */}
            <div className="relative w-full h-[380px] lg:h-full bg-slate-100 overflow-hidden">
              
              {/* High-resolution Styled Map Tile Background */}
              <iframe 
                title="OpenStreetMap Tathawade Wakad"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.7300%2C18.5800%2C73.7800%2C18.6350&amp;layer=mapnik"
                className="w-full h-full border-0 pointer-events-auto filter saturate-[0.85] contrast-[1.05]"
              />

              {/* Map Floating UI Badges */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-slate-200 flex items-center space-x-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#24D695] animate-ping" />
                <span className="font-bold text-slate-800">Radar Active:</span>
                <span className="text-slate-600">{selectedLocation}</span>
              </div>

              {/* Map Overlay disclaimer */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#082B4C]/90 backdrop-blur-md p-3 rounded-2xl text-white text-[11px] shadow-lg flex items-center justify-between border border-slate-700">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-[#24D695] shrink-0" />
                  <span>
                    Simulated Leaflet/OpenStreetMap Pune coordinate integration. Click any item on the right to inspect.
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Nearby Product Feed (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-3 overflow-y-auto max-h-[620px] pr-1">
            {nearbyProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-xs space-y-3">
                <p className="font-bold text-slate-700">No surplus found in this distance radius.</p>
                <p className="text-slate-500">Try widening your search to 5 km or changing categories.</p>
                <button
                  onClick={() => { setMaxDistance(5); setActiveCategory('All'); }}
                  className="px-4 py-2 bg-[#087F5B] text-white rounded-xl font-bold cursor-pointer"
                >
                  Expand Radius
                </button>
              </div>
            ) : (
              nearbyProducts.map((p) => {
                const isHovered = hoveredProduct?.id === p.id;
                return (
                  <div
                    key={p.id}
                    onMouseEnter={() => setHoveredProduct(p)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onClick={() => setSelectedProduct(p)}
                    className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex space-x-3.5 shadow-sm hover:shadow-md ${
                      isHovered ? 'border-[#087F5B] ring-2 ring-emerald-500/20' : 'border-slate-200'
                    }`}
                  >
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-0.5">
                          <span className="font-bold text-[#087F5B] bg-emerald-50 px-2 py-0.5 rounded">
                            {p.category}
                          </span>
                          <span className="text-slate-400 font-medium flex items-center">
                            <MapPin className="w-3 h-3 text-[#24D695] mr-0.5" />
                            {p.distanceKm} km away
                          </span>
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 truncate mt-1">
                          {p.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">{p.sellerName}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                        <div>
                          <span className="text-sm font-extrabold text-[#102A43]">₹{p.discountedPrice}</span>
                          <span className="text-[11px] text-slate-400 line-through ml-1.5">₹{p.originalPrice}</span>
                          <span className="text-[10px] font-bold text-[#087F5B] ml-1">({p.discountPercentage}% off)</span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#087F5B] flex items-center">
                          Inspect &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
