import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  ShoppingCart, 
  Bell, 
  User, 
  Menu, 
  X, 
  Search, 
  Store, 
  HeartHandshake, 
  Compass, 
  LayoutDashboard,
  LogOut,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { LOCATIONS_LIST } from '../data/initialData';

export const Navbar = () => {
  const { 
    currentUser, 
    cart, 
    notifications, 
    selectedLocation, 
    setSelectedLocation,
    logout,
    login,
    markAllNotificationsAsRead,
    markNotificationAsRead
  } = useMarketplace();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifs = notifications.filter(n => !n.read);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/marketplace');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Products', path: '/marketplace' },
    { name: 'Nearby Products', path: '/nearby' },
    { name: 'For NGOs', path: '/ngo' },
    { name: 'AI Engine', path: '/ai-insights' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#082B4C] text-white shadow-lg border-b border-[#103B60]">
      {/* Top micro notice */}
      <div className="bg-[#103B60] text-xs text-slate-300 py-1 px-4 flex justify-between items-center border-b border-slate-700/50">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#24D695] animate-pulse"></span>
          <span><strong>Connector Demo Platform:</strong> Simulated surplus intelligence active in Pune (Tathawade & Wakad)</span>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-xs">
          <span>Current Role: <strong className="text-[#24D695] uppercase">{currentUser ? currentUser.role : 'Guest'}</strong></span>
          <span className="text-slate-500">|</span>
          <button 
            onClick={() => login(currentUser?.role === 'seller' ? 'consumer' : 'seller')}
            className="hover:text-white underline text-slate-300 cursor-pointer"
          >
            Switch to {currentUser?.role === 'seller' ? 'Consumer' : 'Seller'} View
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#24D695] to-[#087F5B] flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white flex items-center">
                Connector
                <span className="ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded bg-[#24D695]/20 text-[#24D695] border border-[#24D695]/30">
                  AI
                </span>
              </span>
              <p className="text-[11px] text-slate-300 tracking-wide font-normal -mt-0.5">
                Connecting Surplus to Opportunity
              </p>
            </div>
          </Link>

          {/* Search Bar & Location Selector (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-lg mx-6 space-x-2">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <input
                type="text"
                placeholder="Search surplus tomatoes, bakery, milk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#103B60]/80 border border-slate-600 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#24D695] focus:ring-1 focus:ring-[#24D695] transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <div className="relative">
              <div className="flex items-center bg-[#103B60]/80 border border-slate-600 rounded-lg px-2.5 py-2 text-xs text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-[#24D695] mr-1.5 shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-1"
                >
                  {LOCATIONS_LIST.map((loc) => (
                    <option key={loc.name} value={loc.name} className="bg-[#082B4C] text-white">
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            {/* Cart Button */}
            <Link 
              to="/cart" 
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#103B60] transition-colors"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#24D695] text-[#082B4C] font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#103B60] transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#DC2626] text-white font-bold text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Overlay Menu */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-[#102A43] rounded-xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-sm">Demo Notifications ({unreadNotifs.length} unread)</span>
                    <button 
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-[#087F5B] hover:underline font-medium cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No alerts at present.</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.link) {
                              setNotificationsOpen(false);
                              navigate(n.link);
                            }
                          }}
                          className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors flex space-x-2.5 ${!n.read ? 'bg-emerald-50/50' : ''}`}
                        >
                          <div className="mt-0.5">
                            {!n.read ? (
                              <span className="w-2 h-2 rounded-full bg-[#24D695] block mt-1" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">{n.title}</p>
                            <p className="text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <Link 
                      to="/orders" 
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-semibold text-[#087F5B] hover:underline"
                    >
                      View Live Order Activity &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile or Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 bg-[#103B60] hover:bg-[#103B60]/80 px-3 py-1.5 rounded-lg border border-slate-600 text-xs cursor-pointer"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-full object-cover border border-[#24D695]"
                  />
                  <span className="hidden sm:inline font-medium text-white max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-[#102A43] rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-semibold text-xs text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 capitalize">{currentUser.role} Account</p>
                      <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-[#087F5B] px-1.5 py-0.5 rounded font-medium">
                        {currentUser.location || 'Pune'}
                      </span>
                    </div>

                    <Link 
                      to="/profile" 
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </Link>

                    {currentUser.role === 'seller' && (
                      <Link 
                        to="/seller/dashboard" 
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        <span>Seller Dashboard</span>
                      </Link>
                    )}

                    <Link 
                      to="/orders" 
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <ShoppingCart className="w-4 h-4 text-slate-400" />
                      <span>Order History</span>
                    </Link>

                    <Link 
                      to="/admin" 
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <Store className="w-4 h-4 text-slate-400" />
                      <span>Admin Oversight</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out (Demo)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-[#103B60]"
                >
                  Log In
                </Link>
                <Link
                  to="/login?tab=register"
                  className="bg-[#24D695] text-[#082B4C] hover:bg-[#087F5B] hover:text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#103B60]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 py-2 border-t border-slate-700/60 text-xs font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                isActive(link.path)
                  ? 'bg-[#24D695] text-[#082B4C] font-semibold shadow-sm'
                  : 'text-slate-200 hover:bg-[#103B60] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="ml-auto flex items-center space-x-2">
            <Link
              to="/seller/add"
              className="bg-[#087F5B] hover:bg-[#087F5B]/90 text-white font-medium px-3 py-1.5 rounded-md flex items-center space-x-1 shadow-sm transition-all"
            >
              <Store className="w-3.5 h-3.5 text-[#24D695]" />
              <span>+ List Surplus</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#082B4C] border-t border-slate-700 px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#103B60] border border-slate-600 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  isActive(link.path)
                    ? 'bg-[#24D695] text-[#082B4C] font-semibold'
                    : 'text-slate-200 hover:bg-[#103B60]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/seller/add"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm bg-[#087F5B] text-white font-medium"
            >
              + List Surplus Product
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
