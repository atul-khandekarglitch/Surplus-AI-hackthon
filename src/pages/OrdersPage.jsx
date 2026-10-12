import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Clock, 
  MapPin, 
  Store, 
  CheckCircle, 
  Truck, 
  AlertCircle,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const OrdersPage = () => {
  const { orders, updateOrderStatus, currentUser } = useMarketplace();
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'All') return true;
    return o.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-[#087F5B]';
      case 'Ready for Pickup':
        return 'bg-blue-100 text-blue-700';
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-700';
      case 'Confirmed':
        return 'bg-amber-100 text-amber-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] bg-emerald-50 px-2.5 py-1 rounded">
              Lifecycle Tracking
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
              Order Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track your reservations, fulfillment statuses, and demo timeline updates.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            Total Orders Logged: <strong className="text-slate-800">{orders.length}</strong>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          {['All', 'Pending', 'Confirmed', 'Ready for Pickup', 'Out for Delivery', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#082B4C] text-[#24D695]'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders Stack */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-xs text-slate-500 space-y-2">
              <ShoppingCart className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">No orders found in this category.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div 
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <span className="font-extrabold text-sm text-[#102A43]">Order #{order.id}</span>
                    <span className="text-xs text-slate-400 ml-2">Placed: {order.date}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Items and Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-slate-500 block mb-2">Purchased Items:</span>
                    <div className="space-y-1.5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="font-bold text-slate-800">{item.name} ({item.quantity} {item.unit})</span>
                          <span className="font-extrabold text-[#087F5B]">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Merchant:</span>
                      <span className="font-semibold text-slate-800">{order.sellerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fulfillment Method:</span>
                      <span className="font-semibold text-slate-800">{order.fulfillmentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Paid / Due:</span>
                      <span className="font-extrabold text-[#102A43] text-sm">₹{order.totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Total Surplus Saved:</span>
                      <span>₹{order.savings}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">Order Activity Timeline:</span>
                  <div className="space-y-2">
                    {order.timeline.map((event, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-[#24D695] mt-1.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-800 mr-2">{event.time}</span>
                          <span className="font-medium text-[#087F5B] mr-2">[{event.status}]</span>
                          <span>{event.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seller demo controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 italic text-[11px]">
                    Simulate Seller Action:
                  </span>
                  <div className="flex items-center space-x-2">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Confirmed', 'Store confirmed item availability')}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-bold hover:bg-blue-100 cursor-pointer"
                      >
                        Confirm Order
                      </button>
                    )}
                    {order.status === 'Confirmed' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Ready for Pickup', 'Order packaged at front desk')}
                        className="px-3 py-1.5 bg-emerald-50 text-[#087F5B] rounded-lg font-bold hover:bg-emerald-100 cursor-pointer"
                      >
                        Mark Ready for Pickup
                      </button>
                    )}
                    {order.status === 'Ready for Pickup' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Completed', 'Customer collected order and completed payment')}
                        className="px-3 py-1.5 bg-[#082B4C] text-[#24D695] rounded-lg font-bold hover:bg-[#103B60] cursor-pointer"
                      >
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
