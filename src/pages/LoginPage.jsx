import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Store, 
  HeartHandshake, 
  Sparkles, 
  Eye, 
  EyeOff,
  Building,
  Info
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { SAMPLE_USERS } from '../data/initialData';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('consumer'); // consumer, seller, ngo, hostel
  const [regOrgName, setRegOrgName] = useState('');

  const { login, registerUser } = useMarketplace();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login('seller'); // Default demo log in
    navigate('/marketplace');
  };

  const handleQuickDemoRole = (role) => {
    login(role);
    if (role === 'seller') navigate('/seller/dashboard');
    else if (role === 'ngo') navigate('/ngo');
    else navigate('/marketplace');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    registerUser({
      name: regName || 'Demo User',
      email: regEmail,
      mobile: regMobile,
      role: regRole,
      businessName: regOrgName || `${regName}'s Organization`,
      location: 'Tathawade, Pune'
    });

    if (regRole === 'seller') navigate('/seller/dashboard');
    else if (regRole === 'ngo') navigate('/ngo');
    else navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-[#082B4C] py-14 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#24D695] to-[#087F5B] rounded-2xl flex items-center justify-center text-slate-900 mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#102A43]">
            {activeTab === 'login' ? 'Welcome to Connector' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-500">
            “Connecting Surplus to Opportunity”
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-[#082B4C] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-[#082B4C] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Quick Demo Role Switcher */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-2xl text-xs space-y-2">
          <p className="font-bold text-[#087F5B] flex items-center text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            1-Click Demo Profile Sign In:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => handleQuickDemoRole('consumer')}
              className="py-1.5 px-2 bg-white rounded-lg border border-slate-200 text-slate-700 font-semibold hover:border-[#087F5B] cursor-pointer"
            >
              Consumer (Sneha)
            </button>
            <button
              onClick={() => handleQuickDemoRole('seller')}
              className="py-1.5 px-2 bg-white rounded-lg border border-slate-200 text-slate-700 font-semibold hover:border-[#087F5B] cursor-pointer"
            >
              Seller (Rajesh Patil)
            </button>
            <button
              onClick={() => handleQuickDemoRole('ngo')}
              className="py-1.5 px-2 bg-white rounded-lg border border-slate-200 text-slate-700 font-semibold hover:border-[#087F5B] cursor-pointer"
            >
              NGO (Anandi Trust)
            </button>
            <button
              onClick={() => handleQuickDemoRole('hostel')}
              className="py-1.5 px-2 bg-white rounded-lg border border-slate-200 text-slate-700 font-semibold hover:border-[#087F5B] cursor-pointer"
            >
              Hostel (YouthNest)
            </button>
          </div>
        </div>

        {/* Login Form */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email or Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="patil.farms@connector.demo"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-800"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-10 py-2.5 text-slate-800"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              Log In (Demo)
            </button>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Rohit Sharma"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="rohit@mail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mobile</label>
                <input
                  type="text"
                  placeholder="+91 98000 00000"
                  value={regMobile}
                  onChange={(e) => setRegMobile(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Account Type *</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-medium"
              >
                <option value="consumer">Consumer (Individual Buyer)</option>
                <option value="seller">Business / Seller (Farm, Bakery, Grocery)</option>
                <option value="ngo">NGO / Food Rescue Charity</option>
                <option value="hostel">Hostel / Canteen / Bulk Retailer</option>
              </select>
            </div>

            {regRole !== 'consumer' && (
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Organization / Store Name</label>
                <input
                  type="text"
                  placeholder="Fresh Daily Supermart"
                  value={regOrgName}
                  onChange={(e) => setRegOrgName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                />
              </div>
            )}

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#24D695] hover:bg-[#087F5B] text-[#082B4C] hover:text-white font-extrabold text-xs shadow-md transition-all cursor-pointer mt-2"
            >
              Create Account
            </button>
          </form>
        )}

        <div className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1.5 pt-2 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Demo frontend auth: No real credentials stored.</span>
        </div>

      </div>
    </div>
  );
};
