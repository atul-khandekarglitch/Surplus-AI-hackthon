import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Sparkles, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check,
  AlertCircle
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { CATEGORIES_LIST } from '../data/initialData';

export const MarketplacePage = () => {
  const { products, selectedLocation } = useMarketplace();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameter sync
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || 'All Categories';

  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [maxPrice, setMaxPrice] = useState(300);
  const [minDiscount, setMinDiscount] = useState(0);
  const [maxDistance, setMaxDistance] = useState(10); // in km
  const [urgencyFilter, setUrgencyFilter] = useState('all'); // all, urgent (<8h), today (<24h)
  const [sellerTypeFilter, setSellerTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('nearest'); // nearest, price_asc, discount_desc, newest

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Must be active status for general browse
      if (item.status !== 'Active') return false;

      // Search match
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(term);
        const matchesSeller = item.sellerName.toLowerCase().includes(term);
        const matchesCategory = item.category.toLowerCase().includes(term);
        if (!matchesName && !matchesSeller && !matchesCategory) return false;
      }

      // Category filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (item.discountedPrice > maxPrice) return false;

      // Discount filter
      if (item.discountPercentage < minDiscount) return false;

      // Distance filter
      if (item.distanceKm > maxDistance) return false;

      // Expiry urgency filter
      if (urgencyFilter === 'urgent' && item.expiryHoursRemaining > 8) return false;
      if (urgencyFilter === 'today' && item.expiryHoursRemaining > 24) return false;

      // Seller type filter
      if (sellerTypeFilter !== 'all') {
        if (!item.sellerType.toLowerCase().includes(sellerTypeFilter.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.discountedPrice - b.discountedPrice;
      if (sortBy === 'price_desc') return b.discountedPrice - a.discountedPrice;
      if (sortBy === 'discount_desc') return b.discountPercentage - a.discountPercentage;
      if (sortBy === 'urgency') return a.expiryHoursRemaining - b.expiryHoursRemaining;
      // Default: nearest
      return a.distanceKm - b.distanceKm;
    });
  }, [products, searchTerm, selectedCategory, maxPrice, minDiscount, maxDistance, urgencyFilter, sellerTypeFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setMaxPrice(300);
    setMinDiscount(0);
    setMaxDistance(10);
    setUrgencyFilter('all');
    setSellerTypeFilter('all');
    setSortBy('nearest');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketplace Header */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#087F5B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Hyperlocal Surplus Inventory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
              Browse Surplus Products
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Currently searching around <strong className="text-slate-800">{selectedLocation}</strong> with dynamic AI discount recommendations.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl">
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Available Listings</span>
              <span className="text-base font-bold text-[#087F5B]">{filteredProducts.length} items</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Filters Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-[#102A43] flex items-center">
                  <Filter className="w-4 h-4 text-[#087F5B] mr-2" />
                  Filter Listings
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#087F5B] hover:underline font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Search text input */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Product / Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="E.g. Tomatoes, Bread..."
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-slate-800 focus:outline-none focus:border-[#24D695]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Category Radio Buttons */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Category
                </label>
                <div className="space-y-1.5">
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left text-xs px-3 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#082B4C] text-[#24D695] font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#24D695]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Max Price:</span>
                  <span className="text-[#087F5B]">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#087F5B]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>₹30</span>
                  <span>₹300</span>
                </div>
              </div>

              {/* Minimum Discount Range */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Min Discount:</span>
                  <span className="text-[#087F5B]">{minDiscount}% OFF</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={minDiscount}
                  onChange={(e) => setMinDiscount(Number(e.target.value))}
                  className="w-full accent-[#24D695]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0%</span>
                  <span>60%</span>
                </div>
              </div>

              {/* Max Distance Filter */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Max Distance:</span>
                  <span className="text-[#087F5B]">{maxDistance} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full accent-[#082B4C]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 km</span>
                  <span>10 km</span>
                </div>
              </div>

              {/* Expiry Urgency Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Shelf-Life Urgency
                </label>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {[
                    { id: 'all', label: 'All Lifespans' },
                    { id: 'urgent', label: 'Flash Sale (<8 Hours)' },
                    { id: 'today', label: 'Expiring Today (<24 Hours)' }
                  ].map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setUrgencyFilter(u.id)}
                      className={`text-left px-2.5 py-1.5 rounded-lg border text-[11px] cursor-pointer transition-colors ${
                        urgencyFilter === u.id
                          ? 'border-[#087F5B] bg-emerald-50 text-[#087F5B] font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Product Listing Grid Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sort & Mobile Filter Toggle Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center space-x-1.5 bg-slate-100 px-3 py-2 rounded-xl text-slate-700 font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#24D695] cursor-pointer font-semibold"
                >
                  <option value="nearest">Nearest First</option>
                  <option value="discount_desc">Highest Discount</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="urgency">Ending Soonest</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
              <div className="lg:hidden bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-4 text-xs">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-bold text-sm">Refine Results</span>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Category</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-50 p-2 rounded-lg border border-slate-300"
                  >
                    {CATEGORIES_LIST.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Max Distance: {maxDistance} km</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Products Card Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No surplus items match your criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting the maximum distance, clearing your search query, or lowering the minimum discount threshold.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#087F5B] text-white font-bold text-xs shadow-md hover:bg-[#087F5B]/90 transition-all cursor-pointer"
                >
                  Reset Filters & Show All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
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
