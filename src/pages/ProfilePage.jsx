import React from 'react';
import { 
  User, 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  Building,
  Edit,
  Package
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const ProfilePage = () => {
  const { currentUser, orders, products } = useMarketplace();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F3F7FB] py-16 text-center text-xs text-slate-500">
        Please log in to view your profile details.
      </div>
    );
  }

  const role = currentUser.role || 'consumer';

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-24 h-24 rounded-2xl object-cover border-2 border-[#24D695] shadow-md shrink-0"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h1 className="text-2xl font-extrabold text-[#102A43]">
                {currentUser.businessName || currentUser.name}
              </h1>
              <span className="self-center sm:self-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#087F5B] border border-emerald-200">
                {role} Profile
              </span>
            </div>

            <p className="text-xs text-slate-500">
              {currentUser.bio || 'Active participant in the Pune zero-waste surplus network.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-2">
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 text-[#24D695] mr-1" />
                {currentUser.location}
              </span>
              <span className="flex items-center">
                <Phone className="w-3.5 h-3.5 text-slate-400 mr-1" />
                {currentUser.mobile}
              </span>
              <span className="flex items-center">
                <Mail className="w-3.5 h-3.5 text-slate-400 mr-1" />
                {currentUser.email}
              </span>
            </div>
          </div>
        </div>

        {/* Role-Specific Sections */}
        {role === 'seller' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#102A43]">Business & Operational Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Business Type:</span>
                <span className="font-bold text-slate-800">{currentUser.businessType}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Operating Counter Hours:</span>
                <span className="font-bold text-slate-800">{currentUser.operatingHours || '7:00 AM – 9:00 PM'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl col-span-full">
                <span className="text-slate-400 block text-[11px]">Pickup Location Address:</span>
                <span className="font-bold text-slate-800">{currentUser.address}</span>
              </div>
            </div>
          </div>
        )}

        {role === 'ngo' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#102A43]">Relief & Service Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Service Area Radius:</span>
                <span className="font-bold text-slate-800">{currentUser.serviceArea}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Intake Capacity:</span>
                <span className="font-bold text-slate-800">{currentUser.preferredQuantity}</span>
              </div>
            </div>
          </div>
        )}

        {role === 'hostel' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#102A43]">Hostel Mess & Bulk Sourcing Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Organization Details:</span>
                <span className="font-bold text-slate-800">{currentUser.organizationDetails}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Preferred Pickup Time:</span>
                <span className="font-bold text-slate-800">{currentUser.preferredPickupTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* Recent Session Orders Activity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#102A43]">Recent Activity & Purchases</h3>
          {orders.length === 0 ? (
            <p className="text-xs text-slate-500">No activity recorded yet in current session.</p>
          ) : (
            <div className="space-y-2">
              {orders.slice(0, 3).map(o => (
                <div key={o.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-800">Order #{o.id}</span>
                    <span className="text-slate-500 ml-2">₹{o.totalAmount} • {o.items.length} item(s)</span>
                  </div>
                  <span className="text-emerald-600 font-bold">{o.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
