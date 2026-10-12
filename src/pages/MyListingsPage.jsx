import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  PlusCircle, 
  Pause, 
  Play, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const MyListingsPage = () => {
  const { products, updateProductStatus, deleteProduct } = useMarketplace();
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = products.filter(p => {
    if (filterStatus === 'All') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <Link 
          to="/seller/dashboard" 
          className="inline-flex items-center text-xs font-bold text-[#087F5B] hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Seller Dashboard</span>
        </Link>

        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#087F5B]">
              <Package className="w-4 h-4 text-[#24D695]" />
              <span>Surplus Inventory Control</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#102A43] mt-1">
              My Surplus Listings
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your active, paused, reserved, and sold inventory with immediate live session updates.
            </p>
          </div>

          <Link
            to="/seller/add"
            className="px-5 py-2.5 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 self-start md:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Listing</span>
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          {['All', 'Active', 'Reserved', 'Sold', 'Paused'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#082B4C] text-[#24D695]'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {status} {status === 'All' ? `(${products.length})` : ''}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div 
              key={product.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image & Status Badge */}
                <div className="relative h-44 bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow ${
                    product.status === 'Active' ? 'bg-[#087F5B] text-white' :
                    product.status === 'Sold' ? 'bg-slate-800 text-white' :
                    product.status === 'Reserved' ? 'bg-amber-500 text-white' :
                    'bg-slate-400 text-white'
                  }`}>
                    {product.status}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {product.discountPercentage}% OFF
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-[#087F5B]">{product.category}</span>
                    <span>{product.quantity} {product.unit} remaining</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 line-clamp-1">{product.name}</h3>

                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-lg font-extrabold text-[#102A43]">₹{product.discountedPrice}</span>
                    <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
                    <span className="text-[11px] text-slate-500">per {product.unit}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 flex items-center">
                    <Clock className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" />
                    <span>Expires: {product.expiryDate}</span>
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                <div className="flex items-center space-x-1.5">
                  {product.status === 'Active' ? (
                    <button
                      onClick={() => updateProductStatus(product.id, 'Paused')}
                      className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 flex items-center space-x-1 cursor-pointer"
                    >
                      <Pause className="w-3 h-3" />
                      <span>Pause</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => updateProductStatus(product.id, 'Active')}
                      className="px-2.5 py-1.5 bg-emerald-50 border border-emerald-300 rounded-lg text-[#087F5B] font-semibold hover:bg-emerald-100 flex items-center space-x-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3" />
                      <span>Activate</span>
                    </button>
                  )}

                  {product.status !== 'Sold' && (
                    <button
                      onClick={() => updateProductStatus(product.id, 'Sold')}
                      className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 flex items-center space-x-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Mark Sold</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
