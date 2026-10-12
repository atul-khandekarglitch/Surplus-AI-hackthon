import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Store, 
  Trash2, 
  Tag, 
  Users, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  BarChart3,
  Quote
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';

export const HomePage = () => {
  const { products, platformStats } = useMarketplace();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Pick top 4 featured surplus items
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F3F7FB] flex flex-col">
      
      {/* 1. HERO SECTION (Dark Navy with high-contrast text and action green) */}
      <section className="relative bg-[#082B4C] text-white overflow-hidden py-16 lg:py-24 border-b border-[#103B60]">
        
        {/* Subtle geometric background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#24D695]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#103B60]/40 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 bg-[#103B60] border border-[#24D695]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#24D695] shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Dynamic Surplus Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                From Surplus to <span className="text-[#24D695]">Second Chance</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Discover affordable surplus products, help local businesses recover revenue, connect with nearby buyers, and reduce avoidable waste through intelligent pricing and smart matching.
              </p>

              <div className="p-3.5 bg-[#103B60]/70 border-l-4 border-[#24D695] rounded-r-xl max-w-xl text-left">
                <p className="text-sm font-semibold text-white">
                  “Good Products Deserve a Second Chance.”
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  Every crate of fresh produce, sourdough loaf, or dairy batch rescued strengthens our neighborhood economy.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/marketplace"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <span>Explore Surplus Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/seller/add"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#103B60] hover:bg-[#103B60]/80 text-white border border-slate-600 font-semibold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-[#24D695]" />
                  <span>List Your Surplus</span>
                </Link>
              </div>

              {/* Micro-metrics below buttons */}
              <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-400">
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#24D695] mr-1.5" />
                  Dynamic AI Pricing
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#24D695] mr-1.5" />
                  Hyperlocal Pickup
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#24D695] mr-1.5" />
                  Verified Safe Produce
                </span>
              </div>
            </div>

            {/* Right Column: Hero Graphic / Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Image: Fresh vegetables, fruits, bread arranged in crate */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/60 aspect-4/3 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh vegetables, fruits, and bread arranged in a wooden crate"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C]/90 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 text-[#102A43] shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B] bg-emerald-50 px-2 py-0.5 rounded">
                        Live Simulation
                      </span>
                      <p className="text-xs font-bold text-[#102A43] mt-1">
                        Patil Organics • Wakad-Tathawade
                      </p>
                      <p className="text-[11px] text-slate-500">
                        15kg Fresh Tomatoes rescued • Saved 50%
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-[#087F5B]">₹30/kg</span>
                      <span className="text-[10px] text-slate-400 block line-through">₹60</span>
                    </div>
                  </div>
                </div>

                {/* Floating AI Notification Card */}
                <div className="absolute -top-6 -left-6 hidden sm:flex items-center space-x-3 bg-white text-[#102A43] p-3 rounded-2xl shadow-xl border border-slate-100 max-w-xs animate-bounce duration-1000">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-[#087F5B] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">AI Suggested 50% Off</p>
                    <p className="text-[11px] text-slate-500">Optimal clearance within 4 hours</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FOUR BENEFIT CARDS */}
      <section className="py-16 bg-[#F3F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
              Why Choose Connector?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Transforming perishable surplus into social and commercial value through intelligent redistribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#082B4C] text-[#24D695] flex items-center justify-center mb-4">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#102A43]">1. Support Local Businesses</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Small groceries, bakeries, and farmers recover revenue from unsold stock instead of absorbing painful 100% loss write-offs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#087F5B] text-white flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#102A43]">2. Reduce Product Waste</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Prevent edible food and consumer goods from needlessly entering landfills, lowering municipal waste burdens and carbon footprint.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#24D695] text-[#082B4C] flex items-center justify-center mb-4">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#102A43]">3. Make Products Affordable</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Neighborhood consumers, students, and hostel canteens access top-quality edible essentials at 30% to 65% off retail rates.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#103B60] text-emerald-300 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#102A43]">4. Strengthen Communities</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Direct bridges with verified local NGOs (such as Anandi Seva Trust) ensure critical food reaches vulnerable community shelters.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded">
                Today’s Fresh Deals
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-2">
                Featured Surplus Listings in Pune
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Hand-picked high discount items ready for instant pickup or delivery in Tathawade and Wakad.
              </p>
            </div>

            <Link
              to="/marketplace"
              className="inline-flex items-center text-xs font-bold text-[#087F5B] hover:text-[#082B4C] transition-colors"
            >
              <span>View all available listings ({products.length})</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="py-16 bg-[#F3F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded">
              Simple 3-Step Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-2">
              How Connector Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              From shelf overstock to happy neighborhood tables in three frictionless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 relative text-center flex flex-col items-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#082B4C] text-[#24D695] font-extrabold flex items-center justify-center text-lg mb-4 shadow">
                1
              </div>
              <h3 className="font-bold text-[#102A43] text-base">List Unsold Surplus</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Small business owners enter remaining items, photos, and expiry hours. Our simulated AI recommends the optimal discount percentage.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 relative text-center flex flex-col items-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#087F5B] text-white font-extrabold flex items-center justify-center text-lg mb-4 shadow">
                2
              </div>
              <h3 className="font-bold text-[#102A43] text-base">Smart Local Matching</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connector broadcasts alerts to nearby residents, hostel mess managers, and verified charity kitchens located within a 3-5 km radius.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 relative text-center flex flex-col items-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#24D695] text-[#082B4C] font-extrabold flex items-center justify-center text-lg mb-4 shadow">
                3
              </div>
              <h3 className="font-bold text-[#102A43] text-base">Pickup & Zero Waste</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Buyers collect their bargains with a simple reservation code, sellers recover revenue, and edible food is 100% saved from garbage bins.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PLATFORM STATISTICS (Clearly labeled demo figures) */}
      <section className="py-14 bg-[#082B4C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold text-[#24D695] bg-[#103B60] px-3 py-1 rounded-full border border-slate-700">
              ⚡ Demonstration Pilot Metrics (Pune Pilot Cohort)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 bg-[#103B60]/40 rounded-2xl border border-slate-700/60">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#24D695]">
                {platformStats.totalListings}
              </p>
              <p className="text-xs text-slate-300 mt-1">Total Active Listings</p>
            </div>

            <div className="p-4 bg-[#103B60]/40 rounded-2xl border border-slate-700/60">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">
                {platformStats.ordersCompleted}
              </p>
              <p className="text-xs text-slate-300 mt-1">Orders Fulfilled</p>
            </div>

            <div className="p-4 bg-[#103B60]/40 rounded-2xl border border-slate-700/60">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#24D695]">
                {Math.round(platformStats.totalWastePreventedKg)} kg
              </p>
              <p className="text-xs text-slate-300 mt-1">Food Waste Prevented</p>
            </div>

            <div className="p-4 bg-[#103B60]/40 rounded-2xl border border-slate-700/60">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">
                ₹{platformStats.totalRevenueRecovered.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-slate-300 mt-1">Revenue Recovered</p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (Clearly identified as fictional demo content) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-[#102A43]">
              Community Stories (Demonstration)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Fictional persona feedback illustrating platform utility for diverse stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
              <Quote className="w-6 h-6 text-slate-300 mb-2" />
              <p className="text-xs text-slate-700 italic leading-relaxed">
                “Before Connector, unsold sourdough baguettes went into the bin after 7 PM. Now we discount them 50% and local students pick up every single loaf before close.”
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" 
                  alt="Baker"
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">Radhika Apte</p>
                  <p className="text-[10px] text-slate-500">Golden Crust Artisan Bakery, Wakad</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
              <Quote className="w-6 h-6 text-slate-300 mb-2" />
              <p className="text-xs text-slate-700 italic leading-relaxed">
                “Managing dinner for 300 engineering hostel students on a tight budget is tough. Buying evening crate surplus of fresh tomatoes and greens cuts 30% off our daily food bill.”
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" 
                  alt="Hostel Supervisor"
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">Suresh Rao</p>
                  <p className="text-[10px] text-slate-500">Mess Supervisor, YouthNest Hostel</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
              <Quote className="w-6 h-6 text-slate-300 mb-2" />
              <p className="text-xs text-slate-700 italic leading-relaxed">
                “Connector’s smart redistribution alerts notify our shelter volunteers whenever edible produce has 4-6 hours left. It ensures zero waste and warm meals for families.”
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
                  alt="NGO Lead"
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">Anandi Joshi</p>
                  <p className="text-[10px] text-slate-500">Food Rescue Volunteer, Pimpri</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FINAL REGISTRATION CALL TO ACTION */}
      <section className="py-16 bg-[#082B4C] text-white text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold text-[#24D695] bg-[#103B60] px-3 py-1 rounded-full border border-slate-700">
            Join the Zero-Waste Movement
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Connect Surplus with Opportunity?
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you are a neighborhood vendor with perishable inventory, a budget-conscious consumer, or an NGO feeding communities, Connector has a place for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/login?tab=register"
              className="px-8 py-3.5 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-bold text-sm shadow-lg transition-all"
            >
              Register Free Demo Account
            </Link>
            <Link
              to="/nearby"
              className="px-8 py-3.5 rounded-xl bg-[#103B60] hover:bg-[#103B60]/80 text-white border border-slate-600 font-semibold text-sm transition-all"
            >
              Open Hyperlocal Radar Map
            </Link>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
