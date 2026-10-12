import React, { useState } from 'react';
import { 
  Package, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  X, 
  Eye, 
  Tag, 
  Gift, 
  Check, 
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const SellerDashboardPage = () => {
  const { products, addProduct, updateProduct, updateProductStatus, deleteProduct, currentUser } = useMarketplace();

  // Active view tab: 'add' (Add Product form) or 'listings' (Manage Surplus Products)
  const [activeTab, setActiveTab] = useState('add');

  // Filter listings by status
  const [filterStatus, setFilterStatus] = useState('All');

  // Form states
  const initialFormState = {
    name: '',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    description: '',
    quantity: '',
    unit: 'kg',
    listingType: 'Sell', // 'Sell' or 'Donate'
    price: '',
    originalPrice: '',
    expiryDate: '',
    pickupLocation: currentUser?.location || 'Tathawade, Pune',
    pickupTime: 'Today, 5:00 PM – 8:00 PM',
    contactDetails: currentUser?.mobile || '+91 98220 12345'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const categories = [
    'Fruits',
    'Vegetables',
    'Bakery',
    'Groceries',
    'Dairy',
    'Packaged Food',
    'Other'
  ];

  const units = ['kg', 'pieces', 'packets', 'litres', 'boxes', 'bundles'];

  const sellerListings = products.filter(p => p.sellerId === 'biz-1' || p.sellerName.includes('Patil') || p.sellerName === currentUser?.name);

  const filteredListings = sellerListings.filter(p => {
    if (filterStatus === 'All') return true;
    return p.status === filterStatus;
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter a valid product name.';
    if (!formData.quantity || Number(formData.quantity) <= 0) return 'Please specify an available quantity greater than 0.';
    if (formData.listingType === 'Sell') {
      if (!formData.price || Number(formData.price) <= 0) {
        return 'Please enter a valid price per unit for items being sold.';
      }
    }
    if (!formData.pickupLocation.trim()) return 'Please provide a pickup location.';
    if (!formData.contactDetails.trim()) return 'Please provide seller contact details.';
    return null;
  };

  const handleOpenPreview = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError('');
    setShowPreviewModal(true);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    const priceNum = formData.listingType === 'Donate' ? 0 : Number(formData.price);
    const origPriceNum = formData.originalPrice ? Number(formData.originalPrice) : (priceNum ? priceNum * 1.5 : 0);
    const discountPct = (origPriceNum > priceNum && priceNum > 0) 
      ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)
      : (formData.listingType === 'Donate' ? 100 : 0);

    const productPayload = {
      name: formData.name.trim(),
      category: formData.category,
      image: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      description: formData.description.trim() || `${formData.listingType === 'Donate' ? 'Free surplus donation' : 'Surplus for sale'}: ${formData.name}. Fresh, safe and wholesome.`,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      listingType: formData.listingType,
      discountedPrice: priceNum,
      originalPrice: Math.round(origPriceNum),
      discountPercentage: discountPct,
      expiryDate: formData.expiryDate ? formData.expiryDate : 'Within 24 hours',
      expiryHoursRemaining: 24,
      location: formData.pickupLocation.trim(),
      pickupTime: formData.pickupTime.trim(),
      contactDetails: formData.contactDetails.trim(),
      status: formData.listingType === 'Donate' ? 'Donated' : 'Available',
      pickupAvailable: true,
      deliveryAvailable: false
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
      setSuccessMessage(`Product "${formData.name}" successfully updated!`);
      setEditingProductId(null);
    } else {
      addProduct(productPayload);
      setSuccessMessage(`Surplus product "${formData.name}" has been published to the marketplace!`);
    }

    setFormData(initialFormState);
    setShowPreviewModal(false);
    setActiveTab('listings');

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      category: categories.includes(product.category) ? product.category : 'Other',
      imageUrl: product.image || '',
      description: product.description || '',
      quantity: product.quantity,
      unit: product.unit || 'kg',
      listingType: product.listingType || (product.discountedPrice === 0 ? 'Donate' : 'Sell'),
      price: product.discountedPrice > 0 ? product.discountedPrice : '',
      originalPrice: product.originalPrice || '',
      expiryDate: product.expiryDate || '',
      pickupLocation: product.location || '',
      pickupTime: product.pickupTime || 'Today, 5:00 PM – 8:00 PM',
      contactDetails: product.contactDetails || currentUser?.mobile || '+91 98220 12345'
    });
    setActiveTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setFormData(initialFormState);
    setFormError('');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Available':
      case 'Active':
        return 'bg-emerald-50 text-[#087F5B] border-emerald-200';
      case 'Sold':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Donated':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Expired':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F7FB] py-8 text-[#102A43]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Dashboard Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#087F5B]">
              <Package className="w-4 h-4 text-[#24D695]" />
              <span>Seller Surplus Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
              Seller Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Easily add surplus products to sell at a discount or donate to nearby consumers and charity partners.
            </p>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => { setActiveTab('add'); handleCancelEdit(); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'add'
                  ? 'bg-[#082B4C] text-[#24D695] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{editingProductId ? 'Edit Product' : 'Add Surplus Product'}</span>
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'listings'
                  ? 'bg-[#082B4C] text-[#24D695] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>My Listings ({sellerListings.length})</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-[#087F5B] text-xs font-bold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* TAB 1: ADD / EDIT PRODUCT FORM */}
        {activeTab === 'add' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-[#102A43]">
                  {editingProductId ? 'Edit Surplus Product' : 'Add Product to Sell or Donate'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Provide product details so nearby buyers or donation centers can quickly arrange pickup.
                </p>
              </div>

              {editingProductId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {formError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleOpenPreview} className="space-y-6">
              
              {/* Listing Type (Sell or Donate) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Listing Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('listingType', 'Sell')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      formData.listingType === 'Sell'
                        ? 'border-[#087F5B] bg-emerald-50 text-[#087F5B] shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Tag className="w-4 h-4" />
                    <span>Sell at Discounted Price</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleInputChange('listingType', 'Donate');
                      handleInputChange('price', '0');
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      formData.listingType === 'Donate'
                        ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Gift className="w-4 h-4" />
                    <span>Donate for Free</span>
                  </button>
                </div>
              </div>

              {/* Product Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Fresh Ripe Tomatoes"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Product Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity and Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Available Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="10"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Unit of Measurement *
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                  >
                    {units.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price per Unit (conditional when Sell is chosen) */}
              {formData.listingType === 'Sell' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Discounted Price per {formData.unit} (₹) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      placeholder="40"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Original Retail Price (₹, optional)
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="80"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Image Upload URL */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Product Image URL
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                  />
                  {formData.imageUrl && (
                    <img 
                      src={formData.imageUrl} 
                      alt="Thumbnail preview" 
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Paste a link to any high-quality image of your surplus stock.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention product condition, preparation freshness, storage guidance, or packaging..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#24D695]"
                />
              </div>

              {/* Expiry Date & Pickup Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Expiry Date / Best Before Date
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Today, 8:00 PM or Within 2 days"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Available Until / Pickup Window
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Today, 5:00 PM – 8:00 PM"
                    value={formData.pickupTime}
                    onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Product Pickup Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Tathawade, Pune"
                    value={formData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Seller Contact Details (Phone / WhatsApp) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98220 12345"
                    value={formData.contactDetails}
                    onChange={(e) => handleInputChange('contactDetails', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span>Preview Listing</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="flex-1 py-3.5 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{editingProductId ? 'Update & Save Changes' : 'Publish Product to Marketplace'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 2: MY LISTINGS / MANAGE SURPLUS */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            
            {/* Filter buttons */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center space-x-2 overflow-x-auto text-xs">
                {['All', 'Available', 'Sold', 'Donated', 'Expired'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      filterStatus === st
                        ? 'bg-[#082B4C] text-[#24D695]'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setActiveTab('add'); handleCancelEdit(); }}
                className="text-xs font-bold text-[#087F5B] hover:underline flex items-center shrink-0 ml-2"
              >
                + Add Another Item
              </button>
            </div>

            {/* Listings Grid */}
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-xs text-slate-500 space-y-3">
                <Package className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700">No surplus listings found with status "{filterStatus}".</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-4 py-2 bg-[#087F5B] text-white rounded-xl font-bold text-xs cursor-pointer"
                >
                  Create a New Surplus Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image + Status Badges */}
                      <div className="relative h-44 bg-slate-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border shadow-sm ${getStatusBadgeClass(item.status)}`}>
                          {item.status || 'Available'}
                        </span>

                        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">
                          {item.listingType === 'Donate' || item.discountedPrice === 0 ? (
                            <span className="text-purple-700 font-extrabold">FREE DONATION</span>
                          ) : (
                            <span>{item.discountPercentage}% OFF</span>
                          )}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span className="font-bold text-[#087F5B]">{item.category}</span>
                          <span>{item.quantity} {item.unit} available</span>
                        </div>

                        <h3 className="font-bold text-base text-slate-900 line-clamp-1">
                          {item.name}
                        </h3>

                        {/* Price or Donate tag */}
                        <div className="flex items-baseline space-x-2 pt-1">
                          {item.listingType === 'Donate' || item.discountedPrice === 0 ? (
                            <span className="text-sm font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                              Donation Item (₹0)
                            </span>
                          ) : (
                            <>
                              <span className="text-lg font-extrabold text-[#102A43]">₹{item.discountedPrice}</span>
                              {item.originalPrice > item.discountedPrice && (
                                <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                              )}
                              <span className="text-[11px] text-slate-500">per {item.unit}</span>
                            </>
                          )}
                        </div>

                        {/* Expiry & Pickup Details */}
                        <div className="space-y-1 pt-2 text-[11px] text-slate-600 border-t border-slate-100">
                          <p className="flex items-center">
                            <Clock className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" />
                            <span>Expiry: <strong>{item.expiryDate || 'Within 24h'}</strong></span>
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-3.5 h-3.5 text-[#24D695] mr-1 shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </p>
                          {item.contactDetails && (
                            <p className="flex items-center text-slate-500">
                              <Phone className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
                              <span>{item.contactDetails}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Toggle & Action Controls */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Set Status:</span>
                        <select
                          value={item.status || 'Available'}
                          onChange={(e) => updateProductStatus(item.id, e.target.value)}
                          className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-800 text-[11px] font-semibold cursor-pointer"
                        >
                          <option value="Available">Available</option>
                          <option value="Sold">Sold</option>
                          <option value="Donated">Donated</option>
                          <option value="Expired">Expired</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#087F5B]" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* PRODUCT PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-[#102A43]">Product Preview</span>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100">
              <img 
                src={formData.imageUrl} 
                alt={formData.name} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-3 left-3 bg-[#087F5B] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                {formData.listingType === 'Donate' ? 'DONATION' : 'SURPLUS SALE'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#087F5B] bg-emerald-50 px-2 py-0.5 rounded">
                  {formData.category}
                </span>
                <span className="font-semibold text-slate-500">
                  {formData.quantity} {formData.unit}
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-slate-900">{formData.name}</h3>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <p className="text-slate-600">
                  <strong>Type:</strong> {formData.listingType === 'Donate' ? 'Free Donation (₹0)' : `Price: ₹${formData.price} per ${formData.unit}`}
                </p>
                <p className="text-slate-600">
                  <strong>Pickup Location:</strong> {formData.pickupLocation}
                </p>
                <p className="text-slate-600">
                  <strong>Pickup Window:</strong> {formData.pickupTime}
                </p>
                <p className="text-slate-600">
                  <strong>Expiry / Best Before:</strong> {formData.expiryDate || 'N/A'}
                </p>
                <p className="text-slate-600">
                  <strong>Seller Contact:</strong> {formData.contactDetails}
                </p>
              </div>

              {formData.description && (
                <p className="text-slate-600 leading-relaxed italic">
                  "{formData.description}"
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="flex-1 py-2.5 bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white rounded-xl text-xs font-bold shadow-md transition-all"
              >
                Confirm & Publish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
