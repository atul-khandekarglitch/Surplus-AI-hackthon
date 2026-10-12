import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Store, 
  Package, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { SAMPLE_USERS } from '../data/initialData';

export const AdminPage = () => {
  const { products, orders, updateProductStatus, deleteProduct } = useMarketplace();
  const [activeTab, setActiveTab] = useState('listings'); // listings, users

  const stats = {
    totalUsers: SAMPLE_USERS.length,
    registeredBusinesses: 24,
    activeListings: products.filter(p => p.status === 'Active').length,
    completedOrders: orders.length,
    reportedListings: 1
  };

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-[#082B4C] text-white p-8 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#103B60] border border-[#24D695]/30 px-3 py-1 rounded-full text-xs font-semibold text-[#24D695]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Platform Governance & Moderation</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">
              Connector Admin Dashboard
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Oversight of surplus food safety compliance, listings moderation, and community accounts.
            </p>
          </div>
          <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full self-start md:self-auto font-medium">
            Demo Admin View
          </span>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-400 block">Total Users</span>
            <span className="text-2xl font-extrabold text-[#102A43]">{stats.totalUsers}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-400 block">Registered Sellers</span>
            <span className="text-2xl font-extrabold text-[#087F5B]">{stats.registeredBusinesses}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-400 block">Active Listings</span>
            <span className="text-2xl font-extrabold text-[#24D695]">{stats.activeListings}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-400 block">Orders Processed</span>
            <span className="text-2xl font-extrabold text-slate-800">{stats.completedOrders}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-400 block">Flagged / Reported</span>
            <span className="text-2xl font-extrabold text-red-500">{stats.reportedListings}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'listings'
                ? 'bg-[#082B4C] text-[#24D695]'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Listings Moderation Queue ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-[#082B4C] text-[#24D695]'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Registered Demo Users ({SAMPLE_USERS.length})
          </button>
        </div>

        {/* Tab 1: Listings Moderation */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Review Live Surplus Catalog</span>
              <span className="text-slate-400">Enforce Food Safety Criteria</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-6">Product / Merchant</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price / Discount</th>
                    <th className="py-3 px-4">Expiry Risk</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-6 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center space-x-3">
                          <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-slate-900">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.sellerName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">{p.category}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">₹{p.discountedPrice}</span>
                        <span className="text-[10px] text-emerald-600 ml-1">({p.discountPercentage}% off)</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="flex items-center">
                          {p.expiryHoursRemaining <= 8 ? (
                            <span className="text-red-600 font-bold">Critical ({p.expiryHoursRemaining}h)</span>
                          ) : (
                            <span>Standard ({p.expiryHoursRemaining}h)</span>
                          )}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'Active' ? 'bg-emerald-50 text-[#087F5B]' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right space-x-2">
                        {p.status === 'Active' ? (
                          <button
                            onClick={() => updateProductStatus(p.id, 'Paused')}
                            className="text-amber-600 hover:underline font-semibold cursor-pointer"
                          >
                            Flag / Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => updateProductStatus(p.id, 'Active')}
                            className="text-emerald-600 hover:underline font-semibold cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-600 hover:underline font-semibold cursor-pointer ml-2"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Registered Demo Users */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAMPLE_USERS.map(user => (
              <div key={user.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex space-x-4 items-start">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-2xl object-cover border border-[#24D695]" />
                <div className="flex-1 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-sm">{user.name}</span>
                    <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-slate-500">{user.email} • {user.mobile}</p>
                  <p className="text-slate-600 font-medium">{user.businessName || user.organizationDetails || user.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
