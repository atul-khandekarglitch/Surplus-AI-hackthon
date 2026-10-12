import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Store, 
  CheckCircle,
  Truck,
  Sparkles,
  Info
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, placeOrder, currentUser } = useMarketplace();
  const navigate = useNavigate();

  const [fulfillmentType, setFulfillmentType] = useState('Pickup'); // 'Pickup' or 'Delivery'
  const [pickupTime, setPickupTime] = useState('Today, 7:00 PM – 8:00 PM');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.address || 'Flat 402, Green Meadows, Wakad, Pune');
  const [contactPhone, setContactPhone] = useState(currentUser?.mobile || '+91 97654 44321');
  const [contactName, setContactName] = useState(currentUser?.name || 'Sneha Deshmukh');

  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Financial calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
  const originalTotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const totalSavings = originalTotal - subtotal;
  const platformFee = 0; // Free for surplus initiative
  const finalTotal = subtotal;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = placeOrder({
      fulfillmentType,
      pickupTime,
      deliveryAddress: fulfillmentType === 'Delivery' ? deliveryAddress : 'In-store counter pickup',
      customerName: contactName,
      customerPhone: contactPhone
    });

    setOrderConfirmed(newOrder);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#F3F7FB] py-16 flex items-center justify-center">
        <div className="max-w-lg w-full mx-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-[#087F5B] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] bg-emerald-50 px-2.5 py-1 rounded">
              Demo Order Placed
            </span>
            <h1 className="text-2xl font-extrabold text-[#102A43] mt-2">
              Order Confirmed!
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Order Reference: <strong className="text-slate-800">#{orderConfirmed.id}</strong>
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Pickup Location:</span>
              <span className="font-semibold text-slate-800">{orderConfirmed.sellerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Method:</span>
              <span className="font-semibold text-slate-800">{orderConfirmed.fulfillmentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount to Pay at Pickup:</span>
              <span className="font-bold text-[#087F5B] text-sm">₹{orderConfirmed.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">You Saved:</span>
              <span className="font-semibold text-emerald-600">₹{orderConfirmed.savings}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start space-x-2 text-left">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Simulated Demo Notice:</strong> No real payment processed. Your order is registered in local session state and visible in the Orders tab and Seller Dashboard.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/orders"
              className="flex-1 py-3 bg-[#082B4C] hover:bg-[#103B60] text-white rounded-xl text-xs font-bold text-center transition-all"
            >
              Track in Orders
            </Link>
            <Link
              to="/marketplace"
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold text-center transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
            Surplus Basket & Demo Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your rescued products and confirm local pickup or delivery arrangements.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Your basket is empty</h2>
            <p className="text-xs text-slate-500">
              Explore freshly listed surplus groceries, bakery, and farm goods at steep discounts before they expire.
            </p>
            <Link
              to="/marketplace"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#24D695] text-[#082B4C] font-bold text-xs hover:bg-[#087F5B] hover:text-white transition-all shadow-md"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="font-bold text-sm text-slate-800">
                    Selected Items ({cart.length})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-500 hover:underline font-semibold cursor-pointer"
                  >
                    Clear Basket
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex items-center space-x-4">
                      {/* Image */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 flex items-center mt-0.5">
                          <Store className="w-3 h-3 text-slate-400 mr-1 shrink-0" />
                          <span className="truncate">{item.sellerName}</span>
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-extrabold text-[#087F5B]">₹{item.discountedPrice}</span>
                          <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                          <span className="text-[10px] bg-emerald-50 text-[#087F5B] px-1.5 py-0.5 rounded font-bold">
                            {item.discountPercentage}% OFF
                          </span>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-100 text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-100 text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <Link to="/marketplace" className="text-[#087F5B] hover:underline font-semibold flex items-center">
                    &larr; Add more surplus items
                  </Link>
                  <span className="text-slate-500 font-medium">
                    All items subject to local food safety check
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout & Summary Panel */}
            <div className="lg:col-span-5 space-y-6">
              <form onSubmit={handleCheckout} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                
                <h3 className="font-bold text-base text-[#102A43]">
                  Order Fulfillment Details
                </h3>

                {/* Fulfillment Tabs */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-2">
                    Select Collection Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('Pickup')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        fulfillmentType === 'Pickup'
                          ? 'border-[#087F5B] bg-emerald-50 text-[#087F5B]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Store className="w-4 h-4 mb-1" />
                      <span>Counter Pickup (Free)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillmentType('Delivery')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        fulfillmentType === 'Delivery'
                          ? 'border-[#087F5B] bg-emerald-50 text-[#087F5B]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Truck className="w-4 h-4 mb-1" />
                      <span>Nearby Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Mobile Number (For OTP / Pickup)</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                    />
                  </div>

                  {fulfillmentType === 'Pickup' ? (
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Preferred Pickup Slot</label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                      >
                        <option>Today, 6:00 PM – 7:30 PM</option>
                        <option>Today, 7:30 PM – 9:00 PM</option>
                        <option>Tomorrow Morning, 8:00 AM – 10:00 AM</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Local Delivery Address</label>
                      <textarea
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                      />
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Retail Value:</span>
                    <span className="line-through">₹{originalTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#087F5B] font-semibold">
                    <span>Surplus Markdown Savings:</span>
                    <span>-₹{totalSavings}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform Service Charge:</span>
                    <span className="text-emerald-600 font-medium">FREE (Surplus Rescue)</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-base text-[#102A43]">
                    <span>Total Amount Due:</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Checkout simulation disclaimer */}
                <p className="text-[11px] text-slate-500 italic text-center">
                  * Simulated demo checkout. Pay cash or UPI directly to the merchant upon collection.
                </p>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-extrabold text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Confirm Demo Order (₹{finalTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
